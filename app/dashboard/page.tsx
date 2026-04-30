import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { BookOpen, Brain, Clock, TrendingUp, ChevronRight, Crown, Mail, MessageCircle, Shield, Target, AlertCircle, Zap, Share2 } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { DashboardNotifications } from "@/components/DashboardNotifications";
import { ALL_PATTERN_NAMES, PATTERNS } from "@/lib/patterns";

async function getUserSolves(userId: string, plan: string = "free") {
  try {
    const sb = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    
    // Free: no history (return empty), Basic: 30 days, Pro: full history
    let query = sb
      .from("solves")
      .select("id, problem_summary, pattern_name, difficulty, created_at, confidence")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (plan === "free") {
      // Free users see no history
      return []
    } else if (plan === "basic") {
      // Basic users see last 30 days
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      query = query.gte("created_at", thirtyDaysAgo.toISOString())
    }
    // Pro users see everything (no filter needed)

    const { data, error } = await query.limit(100)

    if (error) return []
    return data || []
  } catch {
    return []
  }
}

async function getUserPlan(userId: string): Promise<{ plan: string; expiresAt: string | null }> {
  try {
    const sb = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const { data } = await sb
      .from("subscriptions")
      .select("plan, status, expires_at")
      .eq("user_id", userId)
      .eq("status", "active")
      .order("started_at", { ascending: false })
      .limit(1)
      .single()

    if (!data) return { plan: "free", expiresAt: null }
    const expired = data.expires_at && new Date(data.expires_at) < new Date()
    if (expired) return { plan: "free", expiresAt: null }
    return { plan: data.plan as string, expiresAt: data.expires_at || null }
  } catch {
    return { plan: "free", expiresAt: null }
  }
}

// Lightweight stats query — works for ALL plans (used for streak, patterns, readiness score)
async function getUserStats(userId: string) {
  try {
    const sb = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const { data, error } = await sb
      .from("solves")
      .select("pattern_name, difficulty, created_at, confidence")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(500)

    if (error) return []
    return data || []
  } catch {
    return []
  }
}

function getStreak(solves: { created_at: string }[]) {
  if (!solves.length) return 0
  const dates = [...new Set(solves.map(s => new Date(s.created_at).toDateString()))]
  let streak = 0
  const today = new Date()
  for (let i = 0; i < 30; i++) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    if (dates.includes(d.toDateString())) {
      streak++
    } else if (i > 0) {
      break
    }
  }
  return streak
}

function getDiffColor(difficulty: string) {
  if (difficulty === "Easy") return "text-green-600"
  if (difficulty === "Hard") return "text-red-500"
  return "text-amber-600"
}

function timeAgo(dateStr: string) {
  const now = new Date()
  const date = new Date(dateStr)
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000)
  if (diff < 60) return "just now"
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

export default async function Dashboard({
  searchParams,
}: {
  searchParams?: { payment?: string }
}) {
  const { userId } = await auth()
  if (!userId) redirect("/")

  const { plan, expiresAt } = await getUserPlan(userId)
  const solves = await getUserSolves(userId, plan) // History (plan-filtered)
  const allStats = await getUserStats(userId) // Stats (all solves, all plans)

  const totalSolves = allStats.length
  const uniquePatterns = new Set(allStats.map(s => s.pattern_name).filter(Boolean)).size
  const streak = getStreak(allStats)
  const isPaid = plan === "basic" || plan === "pro"

  // Calculate days until expiry for notifications
  let daysUntilExpiry: number | null = null
  if (expiresAt && isPaid) {
    const diff = new Date(expiresAt).getTime() - Date.now()
    daysUntilExpiry = Math.ceil(diff / (1000 * 60 * 60 * 24))
  }

  // Pattern analysis — build weakness map (using allStats for all users)
  const patternStats = new Map<string, { count: number; totalConfidence: number; lastPracticed: string }>()
  for (const s of allStats) {
    if (!s.pattern_name) continue
    const existing = patternStats.get(s.pattern_name)
    if (existing) {
      existing.count++
      existing.totalConfidence += (s.confidence || 0)
      if (s.created_at > existing.lastPracticed) existing.lastPracticed = s.created_at
    } else {
      patternStats.set(s.pattern_name, {
        count: 1,
        totalConfidence: s.confidence || 0,
        lastPracticed: s.created_at,
      })
    }
  }

  // Compute mastery levels
  type PatternAnalysis = {
    name: string
    count: number
    avgConfidence: number
    mastery: "Not started" | "Seen" | "Familiar" | "Confident" | "Mastered"
    lastPracticed: string | null
  }

  const patternAnalysis: PatternAnalysis[] = ALL_PATTERN_NAMES.map((name) => {
    const stats = patternStats.get(name)
    if (!stats) {
      return { name, count: 0, avgConfidence: 0, mastery: "Not started" as const, lastPracticed: null }
    }
    const avg = stats.totalConfidence > 0 ? stats.totalConfidence / stats.count : 0
    let mastery: PatternAnalysis["mastery"] = "Seen"
    if (stats.count >= 10 && avg >= 3.5) mastery = "Mastered"
    else if (stats.count >= 6 && avg >= 3) mastery = "Confident"
    else if (stats.count >= 3 && avg >= 2) mastery = "Familiar"
    else mastery = "Seen"
    return { name, count: stats.count, avgConfidence: avg, mastery, lastPracticed: stats.lastPracticed }
  })

  // Sort: weak patterns first, then not started, then strong
  const masteryOrder = { "Not started": 0, "Seen": 1, "Familiar": 2, "Confident": 3, "Mastered": 4 }
  const sortedPatterns = [...patternAnalysis].sort((a, b) => masteryOrder[a.mastery] - masteryOrder[b.mastery])

  // Recommendations: patterns that need attention
  const weakPatterns = patternAnalysis.filter(p => p.mastery === "Seen" || p.mastery === "Not started")
  const recommendations = weakPatterns.slice(0, 3)

  // ── DSA Readiness Score (0-100) ──
  const totalPatterns = ALL_PATTERN_NAMES.length
  const patternsAttempted = patternAnalysis.filter(p => p.count > 0).length
  const patternsMastered = patternAnalysis.filter(p => p.mastery === "Mastered" || p.mastery === "Confident").length
  const patternsFamiliar = patternAnalysis.filter(p => p.mastery === "Familiar").length

  // Score breakdown: coverage (40%) + mastery depth (40%) + consistency (20%)
  const coverageScore = (patternsAttempted / totalPatterns) * 40
  const masteryScore = ((patternsMastered * 4 + patternsFamiliar * 2) / (totalPatterns * 4)) * 40
  const consistencyScore = Math.min(20, (streak * 2) + Math.min(10, totalSolves / 5))
  const readinessScore = Math.round(Math.min(100, coverageScore + masteryScore + consistencyScore))

  const readinessLabel =
    readinessScore >= 80 ? "Interview Ready" :
    readinessScore >= 60 ? "Getting Strong" :
    readinessScore >= 40 ? "Building Up" :
    readinessScore >= 20 ? "Getting Started" : "Just Beginning"

  const readinessColor =
    readinessScore >= 80 ? "text-green-600" :
    readinessScore >= 60 ? "text-green-500" :
    readinessScore >= 40 ? "text-amber-500" :
    readinessScore >= 20 ? "text-amber-400" : "text-[#a89f96]"

  // ── Daily Challenge ──
  // Pick a problem from the weakest pattern, deterministic per day+user
  const today = new Date().toDateString()
  const daySeed = today.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0)

  let dailyChallenge: { patternName: string; problem: { name: string; platform: string; difficulty: string } } | null = null
  // Prioritize: weakest practiced patterns first, then not started
  const challengeCandidates = [...patternAnalysis]
    .filter(p => p.mastery !== "Mastered")
    .sort((a, b) => {
      // Prioritize "Seen" > "Not started" > "Familiar" > "Confident"
      const order = { "Seen": 0, "Not started": 1, "Familiar": 2, "Confident": 3, "Mastered": 4 }
      return (order[a.mastery] || 4) - (order[b.mastery] || 4)
    })

  if (challengeCandidates.length > 0) {
    // Pick pattern based on day seed
    const selectedPattern = challengeCandidates[daySeed % Math.min(3, challengeCandidates.length)]
    const patternData = PATTERNS.find(p => p.name === selectedPattern.name)
    if (patternData && patternData.practiceProblems.length > 0) {
      const problemIndex = daySeed % patternData.practiceProblems.length
      dailyChallenge = {
        patternName: selectedPattern.name,
        problem: patternData.practiceProblems[problemIndex],
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#faf8f3]">
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-12">

        {/* Client-side toast notifications */}
        <DashboardNotifications
          plan={plan}
          daysUntilExpiry={daysUntilExpiry}
          paymentSuccess={searchParams?.payment === "success"}
        />

        {/* Payment success banner */}
        {searchParams?.payment === "success" && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4">
            <p className="text-sm font-medium text-green-800">
              ✓ Payment successful! Your {plan} plan is now active.
            </p>
          </div>
        )}

        {/* Plan expiry warning banner */}
        {daysUntilExpiry !== null && daysUntilExpiry <= 7 && daysUntilExpiry > 0 && (
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-amber-800">
                ⏳ Your {plan} plan expires in {daysUntilExpiry} day{daysUntilExpiry !== 1 ? "s" : ""}
              </p>
              <p className="text-xs text-amber-600 mt-0.5">
                Renew to keep your features and solve history
              </p>
            </div>
            <Link
              href="/#pricing"
              className="flex items-center gap-1 rounded-lg bg-amber-600 px-3 py-2 font-mono text-xs text-white hover:bg-amber-700 transition-colors"
            >
              Renew <ChevronRight size={12} />
            </Link>
          </div>
        )}

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="mb-1 font-mono text-sm text-[#a89f96]">{"// dashboard"}</p>
            <h1 className="text-3xl font-bold text-[#1a1814]">Your workspace</h1>
          </div>

          {/* Plan badge */}
          <div className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-mono
            ${plan === "pro"
              ? "bg-[#1a1814] text-[#faf8f3]"
              : plan === "basic"
              ? "border border-[#1a1814] text-[#1a1814]"
              : "border border-[#e8e2d9] text-[#a89f96]"
            }`}
          >
            {isPaid && <Crown size={12} />}
            {plan.charAt(0).toUpperCase() + plan.slice(1)} Plan
          </div>
        </div>

        {/* Upgrade banner for free users */}
        {plan === "free" && (
          <div className="mb-6 flex items-center justify-between rounded-xl border border-[#e8e2d9] bg-white p-4">
            <div>
              <p className="text-sm font-medium text-[#1a1814]">Unlock full features</p>
              <p className="text-xs text-[#a89f96] mt-0.5">
                Get solve history, missing concepts, and more
              </p>
            </div>
            <Link
              href="/#pricing"
              className="flex items-center gap-1 rounded-lg bg-[#1a1814] px-3 py-2 font-mono text-xs text-[#faf8f3] hover:bg-[#2d2926] transition-colors"
            >
              Upgrade <ChevronRight size={12} />
            </Link>
          </div>
        )}

        {/* Stats */}
        <div className="mb-8 grid grid-cols-4 gap-4">
          <div className="rounded-xl border border-[#e8e2d9] bg-white p-5">
            <BookOpen size={18} className="mb-3 text-[#a89f96]" />
            <p className="font-mono text-2xl font-bold text-[#1a1814]">{totalSolves}</p>
            <p className="mt-1 text-xs text-[#a89f96]">Problems solved</p>
          </div>
          <div className="rounded-xl border border-[#e8e2d9] bg-white p-5">
            <Brain size={18} className="mb-3 text-[#a89f96]" />
            <p className="font-mono text-2xl font-bold text-[#1a1814]">{uniquePatterns}</p>
            <p className="mt-1 text-xs text-[#a89f96]">Patterns seen</p>
          </div>
          <div className="rounded-xl border border-[#e8e2d9] bg-white p-5">
            <TrendingUp size={18} className="mb-3 text-[#a89f96]" />
            <p className="font-mono text-2xl font-bold text-[#1a1814]">{streak}</p>
            <p className="mt-1 text-xs text-[#a89f96]">Day streak 🔥</p>
          </div>
          <div className="rounded-xl border border-[#e8e2d9] bg-white p-5">
            <Target size={18} className="mb-3 text-[#a89f96]" />
            <p className="font-mono text-2xl font-bold text-[#1a1814]">
              {patternAnalysis.filter(p => p.mastery === "Mastered" || p.mastery === "Confident").length}
            </p>
            <p className="mt-1 text-xs text-[#a89f96]">Patterns mastered</p>
          </div>
        </div>

        {/* DSA Readiness Score + Daily Challenge Row */}
        {isPaid && (
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">

            {/* DSA Readiness Score */}
            <div className="rounded-xl border border-[#e8e2d9] bg-white p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="font-mono text-sm text-[#a89f96]">{"// readiness score"}</p>
                <Share2 size={14} className="text-[#a89f96] cursor-pointer hover:text-[#1a1814] transition-colors" />
              </div>
              <div className="flex items-center gap-6">
                {/* Score Circle */}
                <div className="relative flex-shrink-0">
                  <svg width="100" height="100" viewBox="0 0 100 100" className="-rotate-90">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#f0ede6" strokeWidth="8" />
                    <circle
                      cx="50" cy="50" r="42" fill="none"
                      stroke={readinessScore >= 60 ? "#22c55e" : readinessScore >= 30 ? "#f59e0b" : "#e8e2d9"}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${(readinessScore / 100) * 264} 264`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`font-mono text-2xl font-bold ${readinessColor}`}>{readinessScore}</span>
                    <span className="font-mono text-[8px] text-[#a89f96]">/100</span>
                  </div>
                </div>
                {/* Score Breakdown */}
                <div className="flex-1 space-y-2">
                  <p className={`font-mono text-sm font-bold ${readinessColor}`}>{readinessLabel}</p>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-[#a89f96]">Coverage</span>
                      <span className="font-mono text-[10px] text-[#1a1814]">{patternsAttempted}/{totalPatterns}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-[#a89f96]">Mastered</span>
                      <span className="font-mono text-[10px] text-[#1a1814]">{patternsMastered} patterns</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-[#a89f96]">Streak</span>
                      <span className="font-mono text-[10px] text-[#1a1814]">{streak} days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Daily Challenge */}
            {dailyChallenge && (
              <div className="rounded-xl border-2 border-[#1a1814] bg-[#1a1814] p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Zap size={16} className="text-amber-400" />
                    <span className="font-mono text-xs text-[#a89f96]">{"// today's challenge"}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#faf8f3] mb-1">{dailyChallenge.problem.name}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="rounded bg-[#faf8f3]/10 px-2 py-0.5 font-mono text-[10px] text-[#faf8f3]">
                      {dailyChallenge.patternName}
                    </span>
                    <span className={`font-mono text-[10px] ${
                      dailyChallenge.problem.difficulty === "Easy" ? "text-green-400" :
                      dailyChallenge.problem.difficulty === "Hard" ? "text-red-400" : "text-amber-400"
                    }`}>
                      {dailyChallenge.problem.difficulty}
                    </span>
                    <span className="font-mono text-[10px] text-[#a89f96]">{dailyChallenge.problem.platform}</span>
                  </div>
                  <p className="text-xs text-[#a89f96] leading-relaxed">
                    Picked from your weakest pattern. Solve it to improve your readiness score.
                  </p>
                </div>
                <Link
                  href="/solve"
                  className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-[#faf8f3] px-4 py-2.5 font-mono text-xs font-bold text-[#1a1814] hover:bg-[#f0ede6] transition-colors"
                >
                  <Zap size={14} />
                  Start Challenge
                </Link>
              </div>
            )}
          </div>
        )}

        {/* What to practice — Recommendations */}
        {isPaid && recommendations.length > 0 && (
          <div className="mb-8 rounded-xl border-2 border-[#1a1814] bg-[#1a1814] p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle size={16} className="text-[#faf8f3]" />
              <span className="font-mono text-xs text-[#a89f96]">// what to practice next</span>
            </div>
            <h3 className="text-base font-bold text-[#faf8f3] mb-3">Focus on these patterns</h3>
            <div className="space-y-2">
              {recommendations.map((p) => (
                <Link
                  key={p.name}
                  href="/patterns"
                  className="flex items-center justify-between rounded-lg bg-[#faf8f3]/10 p-3 hover:bg-[#faf8f3]/15 transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-[#faf8f3]">{p.name}</p>
                    <p className="font-mono text-[10px] text-[#a89f96]">
                      {p.count === 0
                        ? "Never attempted — start learning"
                        : `${p.count} solve${p.count !== 1 ? "s" : ""} · needs more practice`}
                    </p>
                  </div>
                  <ChevronRight size={14} className="text-[#a89f96]" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Pattern Weakness Map */}
        {isPaid && totalSolves > 0 && (
          <div className="mb-8 rounded-xl border border-[#e8e2d9] bg-white p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-mono text-sm text-[#a89f96]">// pattern mastery</p>
                <p className="text-xs text-[#6b6560] mt-0.5">Based on solve count + confidence ratings</p>
              </div>
              <Link
                href="/patterns"
                className="font-mono text-xs text-[#1a1814] underline hover:opacity-70"
              >
                Learn patterns →
              </Link>
            </div>
            <div className="space-y-2.5">
              {sortedPatterns.map((p) => {
                const barWidth = p.count === 0 ? 0 : Math.min(100, (p.count / 10) * 100)
                const masteryColor = {
                  "Not started": "bg-[#e8e2d9]",
                  "Seen": "bg-amber-300",
                  "Familiar": "bg-amber-400",
                  "Confident": "bg-green-400",
                  "Mastered": "bg-green-500",
                }[p.mastery]
                const masteryText = {
                  "Not started": "text-[#a89f96]",
                  "Seen": "text-amber-600",
                  "Familiar": "text-amber-600",
                  "Confident": "text-green-600",
                  "Mastered": "text-green-700",
                }[p.mastery]
                return (
                  <div key={p.name} className="flex items-center gap-3">
                    <span className="w-[140px] truncate font-mono text-xs text-[#1a1814]">
                      {p.name}
                    </span>
                    <div className="flex-1 h-2 rounded-full bg-[#f0ede6] overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${masteryColor}`}
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                    <span className={`w-[80px] text-right font-mono text-[10px] ${masteryText}`}>
                      {p.mastery}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Pattern breakdown */}
        {totalSolves > 0 && (
          <div className="mb-8 rounded-xl border border-[#e8e2d9] bg-white p-6">
            <p className="mb-4 font-mono text-sm text-[#a89f96]">{"// patterns practiced"}</p>
            <div className="flex flex-wrap gap-2">
              {Array.from(
                allStats.reduce((acc, s) => {
                  if (s.pattern_name) {
                    acc.set(s.pattern_name, (acc.get(s.pattern_name) || 0) + 1)
                  }
                  return acc
                }, new Map<string, number>())
              ).map(([pattern, count]) => (
                <div
                  key={pattern}
                  className="flex items-center gap-1.5 rounded-full border border-[#e8e2d9] bg-[#f5f2eb] px-3 py-1"
                >
                  <span className="font-mono text-xs text-[#1a1814]">{pattern}</span>
                  <span className="font-mono text-xs text-[#a89f96]">×{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent solves */}
        <div className="rounded-xl border border-[#e8e2d9] bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="font-mono text-sm text-[#a89f96]">{"// recent solves"}</p>
            <Link
              href="/solve"
              className="flex items-center gap-1 font-mono text-xs text-[#1a1814] underline hover:opacity-70"
            >
              New solve <ChevronRight size={12} />
            </Link>
          </div>

          {solves.length === 0 ? (
            <div className="py-12 text-center">
              <BookOpen size={32} className="mx-auto mb-3 text-[#e8e2d9]" />
              {plan === "free" ? (
                <>
                  <p className="text-sm text-[#a89f96]">🔒 Solve history locked for free users.</p>
                  <Link href="/#pricing" className="mt-2 block text-sm text-[#1a1814] underline">
                    Upgrade to Basic to see history →
                  </Link>
                </>
              ) : (
                <>
                  <p className="text-sm text-[#a89f96]">No solves yet.</p>
                  <Link href="/solve" className="mt-2 block text-sm text-[#1a1814] underline">
                    Solve your first problem →
                  </Link>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              {solves.map((solve) => (
                <div
                  key={solve.id}
                  className="flex items-start justify-between rounded-lg border border-[#e8e2d9] bg-[#faf8f3] p-3 transition-colors hover:border-[#d4cdc4]"
                >
                  <div className="mr-4 min-w-0 flex-1">
                    <p className="truncate text-sm leading-relaxed text-[#1a1814]">
                      {solve.problem_summary || "Problem solved"}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      {solve.pattern_name && (
                        <span className="rounded bg-[#f0ede6] px-2 py-0.5 font-mono text-xs text-[#a89f96]">
                          {solve.pattern_name}
                        </span>
                      )}
                      {solve.difficulty && (
                        <span className={`font-mono text-xs ${getDiffColor(solve.difficulty)}`}>
                          {solve.difficulty}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-shrink-0 items-center gap-1">
                    <Clock size={11} className="text-[#a89f96]" />
                    <span className="font-mono text-xs text-[#a89f96]">
                      {timeAgo(solve.created_at)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Priority Support — Pro only */}
        {plan === "pro" && (
          <div className="mt-8 rounded-xl border-2 border-[#1a1814] bg-[#1a1814] p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield size={16} className="text-[#faf8f3]" />
              <span className="font-mono text-xs text-[#a89f96]">// priority support</span>
            </div>
            <h3 className="text-lg font-bold text-[#faf8f3] mb-2">You have Priority Support</h3>
            <p className="text-sm text-[#a89f96] mb-5 leading-relaxed">
              As a Pro member, you get faster responses and dedicated help. Reach out anytime.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:support@patternflow.in?subject=Pro Support Request"
                className="flex items-center gap-2 rounded-lg bg-[#faf8f3] px-4 py-2.5 font-mono text-xs font-bold text-[#1a1814] hover:bg-[#f0ede6] transition-colors"
              >
                <Mail size={14} />
                Email Support
              </a>
              <a
                href="https://twitter.com/Dev_code_04"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-[#faf8f3]/30 px-4 py-2.5 font-mono text-xs text-[#faf8f3] hover:border-[#faf8f3]/60 transition-colors"
              >
                <MessageCircle size={14} />
                DM on Twitter
              </a>
            </div>
            <p className="mt-4 font-mono text-[10px] text-[#a89f96]">
              Avg response time: &lt;12 hours · Available Mon–Sat
            </p>
          </div>
        )}

      </main>
    </div>
  )
}
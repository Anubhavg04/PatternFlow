import { createClient } from "@supabase/supabase-js"

function getSb() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export type AdminStats = {
  totalUsers: number
  activeUsers: number
  totalSolves: number
  paidUsers: number
  conversionRate: number
  revenue: number
  growthChart: { date: string; count: number }[]
  featureUsage: { hints: number; patternUnlocks: number }
  recentActivity: { email: string; action: string; timestamp: string }[]
  funnelData: {
    totalUsers: number
    solveClicked: number
    paidUsers: number
  }
}

export async function fetchAdminStats(days: number): Promise<AdminStats> {
  const sb = getSb()

  // Run all queries in parallel
  const [
    usersResult,
    solvesCountResult,
    paidResult,
    revenueResult,
    growthResult,
    hintsResult,
    recentSolvesResult,
  ] = await Promise.all([
    // Total users
    sb.from("users").select("id", { count: "exact", head: true }),

    // Problems solved in range
    sb
      .from("solves")
      .select("id", { count: "exact", head: true })
      .gte("created_at", daysAgo(days)),

    // Paid users (active subscriptions)
    sb
      .from("subscriptions")
      .select("user_id", { count: "exact", head: true })
      .eq("status", "active"),

    // Total revenue
    sb.from("payments").select("amount"),

    // Growth chart: solves per day in range
    sb
      .from("solves")
      .select("created_at")
      .gte("created_at", daysAgo(days))
      .order("created_at", { ascending: true }),

    // Hints used in range (from solves table — hints are tracked via solve metadata)
    sb
      .from("solves")
      .select("id", { count: "exact", head: true })
      .gte("created_at", daysAgo(days)),

    // Recent activity: last 10 solves with user info
    sb
      .from("solves")
      .select("user_id, pattern_name, created_at")
      .order("created_at", { ascending: false })
      .limit(10),
  ])

  // Active users: distinct solvers in the range
  const { data: activeData } = await sb
    .from("solves")
    .select("user_id")
    .gte("created_at", daysAgo(days))
  const activeUsers = new Set((activeData || []).map((r) => r.user_id)).size

  // Compute values
  const totalUsers = usersResult.count ?? 0
  const totalSolves = solvesCountResult.count ?? 0
  const paidUsers = paidResult.count ?? 0
  const conversionRate =
    totalUsers > 0 ? Math.round((paidUsers / totalUsers) * 100) : 0

  const payments = revenueResult.data ?? []
  const revenue = payments.reduce(
    (sum, p) => sum + (typeof p.amount === "number" ? p.amount : 0),
    0
  )

  // Group growth by date
  const grouped: Record<string, number> = {}
  for (const s of growthResult.data ?? []) {
    const d = new Date(s.created_at).toISOString().split("T")[0]
    grouped[d] = (grouped[d] ?? 0) + 1
  }
  const growthChart = Object.entries(grouped).map(([date, count]) => ({
    date,
    count,
  }))

  // Recent activity
  const recentActivity = (recentSolvesResult.data ?? []).map((r) => ({
    email: r.user_id
      ? `${r.user_id.slice(0, 8)}…`
      : "anonymous",
    action: r.pattern_name ? `Solved: ${r.pattern_name}` : "Problem solved",
    timestamp: r.created_at,
  }))

  return {
    totalUsers,
    activeUsers,
    totalSolves,
    paidUsers,
    conversionRate,
    revenue,
    growthChart,
    featureUsage: {
      hints: hintsResult.count ?? 0,
      patternUnlocks: paidUsers,
    },
    recentActivity,
    funnelData: {
      totalUsers,
      solveClicked: totalSolves,
      paidUsers,
    },
  }
}

function daysAgo(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() - days)
  return d.toISOString()
}

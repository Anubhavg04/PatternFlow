import { createClient } from "@supabase/supabase-js"

function normalizeProblem(problem: string) {
  return problem
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ")
}
function simpleHash(str: string) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return hash.toString()
}

export async function POST(request: Request) {
  const { problem } = await request.json()   // user problem will be come here 
  if (!problem || problem.trim().length < 20) {
    return Response.json({ error: "Problem too short" }, { status: 400 })
  }

  const authHeader = request.headers.get("authorization")
  const userId = authHeader ? authHeader.replace("Bearer ", "") : null
  let userPlan = "free"

  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  if (!userId) {
    return Response.json(
      { error: "Please login to use this feature" },
      { status: 401 }
    )
  } 

  // ── Cache check ──
  const normalized = normalizeProblem(problem)
  const problemHash = simpleHash(normalized)


  let cacheHit = false;
  const { data: cached } = await sb
    .from("problem_cache")
    .select("result")
    .eq("problem_hash", problemHash)
    .single()

  if (cached?.result) {
    cacheHit = true;
    return Response.json({
      ...cached.result,
      _meta: { cacheHit: true }
    })
  }

  
  // ── Server-side Rate Limiting (authenticated users) ──
  if (userId) {
    // Look up plan
    try {
      const { data } = await sb
        .from("subscriptions")
        .select("plan, expires_at")
        .eq("user_id", userId)
        .eq("status", "active")
        .single()

      if (data) {
        const expired = data.expires_at && new Date(data.expires_at) < new Date()
        if (!expired) userPlan = data.plan as string
        
      }
    } catch {}
    // ── Per-minute rate limit (anti-spam for ALL users) ──
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000)
    const { count: recentCount } = await sb
      .from("solves")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .gte("created_at", oneMinuteAgo.toISOString())

    const perMinLimit =
      userPlan === "pro" ? 10 :
      userPlan === "basic" ? 5 : 3

    if ((recentCount || 0) >= perMinLimit) {
      return Response.json(
        { error: "Too many requests. Please wait a moment." },
        { status: 429 }
      )
    }

    // Enforce limits (Pro = unlimited, skip check)
    if (userPlan !== "pro") {
      const limit = userPlan === "basic" ? 100 : 5
      const startDate = new Date()

      // time window logic
      if (userPlan === "basic") {
        startDate.setDate(1)
        startDate.setHours(0, 0, 0, 0)
      } else {
        startDate.setHours(0, 0, 0, 0)
      }

      const { count } = await sb
        .from("solves")
        .select("id", { count: "exact", head: true })
        .eq("user_id", userId)
        .gte("created_at", startDate.toISOString())

      // Limit hit  
      if ((count || 0) >= limit) {
        const msg = userPlan === "basic"
          ? "Monthly solve limit reached (100/month). Upgrade to Pro for unlimited solves."
          : "Daily solve limit reached (5/day). Upgrade to Basic for 100 solves/month."
        return Response.json({ error: msg }, { status: 429 })
      }
    }
  }
  // ── Token usage check for Pro users ──
  if (userId && userPlan === "pro") {
    const start = new Date()
    start.setDate(1)
    start.setHours(0, 0, 0, 0)

    const { data: usage } = await sb
      .from("usage_logs")
      .select("tokens_used")
      .eq("user_id", userId)
      .gte("created_at", start.toISOString())

    const totalTokens =
      usage?.reduce((sum, u) => sum + u.tokens_used, 0) || 0

    // Safe cap (adjust later)
    if (totalTokens > 1000000) {
      return Response.json(
        { error: "Fair usage limit reached. Contact support if needed." },
        { status: 429 }
      )
    }
  }

  // ── AI Call ──
  const systemPrompt = `You are a DSA interview coach. Your goal is NOT to give solutions — your goal is to help students THINK and develop problem-solving intuition.

The user pastes a raw DSA problem. Extract the core problem ignoring noise.

Respond ONLY with valid JSON, no markdown fences:
{
  "problem_summary": "One sentence: what does this problem actually ask?",
  "difficulty": "Easy | Medium | Hard",
  "pattern_name": "Pattern name only — do not explain yet",
  "thinking_prompt": "One powerful question that makes the student think in the right direction WITHOUT revealing the pattern. Like a Socratic question. Example: 'If you had to check whether a number exists in a collection millions of times, what property would you want that collection to have?'",
  "hints": [
    "Hint 1 — very vague, just a nudge. Mention a property or constraint in the problem they should notice.",
    "Hint 2 — slightly more specific. Point toward the data structure or technique category.",
    "Hint 3 — almost there. Describe the core operation needed without naming the algorithm."
  ],
  "pattern_reveal": {
    "name": "Pattern name",
    "why": "Now explain why this pattern fits — 2 sentences connecting problem structure to pattern.",
    "intuition": "The key insight in one sentence — the 'aha moment' a student needs to have."
  },
  "thinking_steps": [
    "Step 1: What to observe in the problem (not what to code)",
    "Step 2: What question to ask yourself",
    "Step 3: How to arrive at the approach",
    "Step 4: How to verify your thinking is correct"
  ],
  "missing_concepts": [
    {
      "concept": "Concept name they need to know",
      "why_needed": "One sentence why this concept is prerequisite",
      "learn_query": "Search query to learn this — e.g. 'HashMap time complexity explained'"
    }
  ],
  "memory_hook": "A vivid analogy that makes this pattern stick forever. Something they will remember in a stressful interview.",
  "interview_recognition": "Exact phrases or constraints in problem statements that signal this pattern. Start with: Look for...",
  "similar_problems": [
    {"name": "Problem Name", "difficulty": "Easy", "platform": "LC", "why_similar": "One line — same pattern, different surface"},
    {"name": "Problem Name", "difficulty": "Medium", "platform": "LC", "why_similar": "One line"},
    {"name": "Problem Name", "difficulty": "Hard", "platform": "LC", "why_similar": "One line"}
  ],
  "solve_time": "Easy: 10 min | Medium: 20 min | Hard: 35 min"
}`

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "PatternFlow"
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-001",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Analyze this DSA problem and help the student think:\n\n${problem}` }
        ],
        max_tokens: userPlan === "free" ? 800 : 1500,
        temperature: 0.7
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("OpenRouter error:", data)
      return Response.json({ error: "AI API error" }, { status: 500 })
    }
    const tokens = data?.usage?.total_tokens || 0

    const rawText = data.choices?.[0]?.message?.content || ""
    const clean = rawText.replace(/```json|```/g, "").trim()
    // const result = JSON.parse(clean)
    let result
    try {
      result = JSON.parse(clean)
    } catch (err) {
      console.error("JSON parse error:", clean)
      return Response.json({ error: "Invalid AI response" }, { status: 500 })
    }


    // Save to Supabase if user is logged in
    // Save to Supabase if user is logged in
  if (userId && !cacheHit) {
    try {
      await Promise.all([
        // 1. Save solve data
        sb.from("solves").insert({
          user_id: userId,
          problem_summary: result.problem_summary,
          pattern_name: result.pattern_reveal?.name || result.pattern_name,
          difficulty: result.difficulty,
          full_result: result,
        }),

        // 2. Save token usage (only if exists)
        tokens > 0
          ? sb.from("usage_logs").insert({
              user_id: userId,
              tokens_used: tokens,
            })
          : Promise.resolve()
      ])
    } catch (saveErr) {
      console.error("Save error:", saveErr)
    }
  }

  // ── Save to cache ──
  try {
    await sb.from("problem_cache").insert({
      problem_hash: problemHash,
      normalized_problem: normalized,
      result: result,
    })
  } catch (err) {
    // ignore duplicate key errors
  }
    
  return Response.json({
    ...result,
    _meta : {cacheHit : false}
  })
  } catch (err) {
    console.error("Solve error:", err)
    return Response.json({ error: "Failed to analyze. Try again." }, { status: 500 })
  }
}
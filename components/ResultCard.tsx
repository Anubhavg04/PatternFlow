"use client"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ConfidenceRating } from "@/components/ConfidenceRating"
import {
  Brain, Lightbulb, Eye, BookOpen, Clock,
  Target, Layers, GraduationCap, ChevronDown, HelpCircle, X
} from "lucide-react"

export type SolveResult = {
  problem_summary: string
  difficulty: string
  pattern_name: string
  thinking_prompt: string
  hints: string[]
  pattern_reveal: {
    name: string
    why: string
    intuition: string
  }
  thinking_steps: string[]
  missing_concepts: {
    concept: string
    why_needed: string
    learn_query: string
  }[]
  memory_hook: string
  interview_recognition: string
  similar_problems: {
    name: string
    difficulty: string
    platform: string
    why_similar: string
  }[]
  solve_time: string
}

type ResultCardProps = {
  result: SolveResult
  plan?: "free" | "basic" | "pro"
  userId?: string | null
}

const headerClass = "mb-3 flex items-center gap-2"
const labelClass = "text-xs font-mono text-[#a89f96]"

export function ResultCard({ result, plan = "free", userId }: ResultCardProps) {
  const isPaid = plan === "basic" || plan === "pro"
  const [hintsUnlocked, setHintsUnlocked] = useState(0)
  const [showApproach, setShowApproach] = useState(false)
  const [showPattern, setShowPattern] = useState(false)
  const [showConcepts, setShowConcepts] = useState(false)
  const [userAnswer, setUserAnswer] = useState("")
  const [answerFeedback, setAnswerFeedback] = useState<"correct" | "wrong" | null>(null)
  const [showQuickCheck, setShowQuickCheck] = useState(false)
  const [currentFlashcard, setCurrentFlashcard] = useState(0)
  const [showFlashcards, setShowFlashcards] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  const [timerActive, setTimerActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const diffColor =
    result.difficulty === "Easy" ? "text-green-600" :
    result.difficulty === "Hard" ? "text-red-500" :
    "text-amber-600"

  const flashcardQuestions = [
    {
      q: `When would you use ${result.pattern_reveal?.name || result.pattern_name}?`,
      a: result.pattern_reveal?.why || ""
    },
    {
      q: `What is the time complexity?`,
      a: result.solve_time || ""
    },
    {
      q: `What is the key insight for this problem?`,
      a: result.pattern_reveal?.intuition || ""
    },
    {
      q: `What signals in a problem suggest ${result.pattern_reveal?.name || result.pattern_name}?`,
      a: result.interview_recognition || "Look for patterns that require efficient lookups or traversals."
    },
    {
      q: `How would you remember this pattern in an interview?`,
      a: result.memory_hook || ""
    },
  ]

  const timeLimit = result.difficulty === "Easy" ? 10 : result.difficulty === "Hard" ? 35 : 20

  function startTimer() {
    setTimeLeft(timeLimit * 60)
    setTimerActive(true)
  }

  function stopTimer() {
    setTimerActive(false)
    setTimeLeft(0)
    if (timerRef.current) clearTimeout(timerRef.current)
  }

  useEffect(() => {
    if (!timerActive || timeLeft <= 0) {
      if (timeLeft === 0 && timerActive) setTimerActive(false)
      return
    }
    timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [timerActive, timeLeft])

  function formatTime(s: number) {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${sec.toString().padStart(2, "0")}`
  }

  function checkAnswer() {
    const ans = userAnswer.toLowerCase()
    const goodSignals = [
      "because", "since", "allows", "faster", "efficient",
      "store", "check", "find", "track", "avoid", "reduce",
      "o(1)", "o(n)", "o(log", "constant", "linear", "lookup",
      "search", "access", "insert", "space", "time", "complexity"
    ]
    const hasGoodReasoning = goodSignals.some(w => ans.includes(w))
    const hasLength = userAnswer.trim().split(" ").length >= 8
    setAnswerFeedback(hasGoodReasoning && hasLength ? "correct" : "wrong")
  }

  const timerColor = timeLeft < 60 ? "text-red-500" : timeLeft < 180 ? "text-amber-600" : "text-[#1a1814]"
  const timerBorder = timeLeft < 60 ? "border-red-200 bg-red-50" : timeLeft < 180 ? "border-amber-200 bg-amber-50" : "border-[#e8e2d9] bg-white"

  return (
    <>
      {/* Floating Sticky Timer */}
      {timerActive && (
        <div className={`fixed top-16 right-3 sm:right-6 z-50 border rounded-xl shadow-md p-3 flex items-center gap-2 sm:gap-3 transition-all ${timerBorder}`}
          style={{ minWidth: 0 }}
        >
          <Clock size={13} className={`flex-shrink-0 ${timerColor}`} />
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-mono text-[#a89f96] leading-none mb-0.5 hidden sm:block">
              interview mode
            </span>
            <span className={`font-mono font-bold leading-none ${timerColor} text-base sm:text-xl`}>
              {formatTime(timeLeft)}
            </span>
          </div>
          <button
            onClick={stopTimer}
            className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full hover:bg-[#f0ede6] text-[#a89f96] hover:text-[#1a1814] transition-colors"
            aria-label="Stop timer"
          >
            <X size={12} />
          </button>
        </div>
      )}

      <section className="mt-10 space-y-5">

        {/* Problem Summary */}
        <div className="rounded-xl border border-[#e8e2d9] bg-white p-6">
          <div className={headerClass}>
            <HelpCircle size={16} className="text-[#a89f96]" />
            <span className={labelClass}>// problem understood</span>
            <span className={`ml-auto text-xs font-mono font-bold ${diffColor}`}>
              {result.difficulty}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-[#1a1814]">{result.problem_summary}</p>
        </div>

        {/* Think First */}
        <div className="rounded-xl border-2 border-[#1a1814] bg-[#faf8f3] p-6">
          <div className={headerClass}>
            <Brain size={16} className="text-[#1a1814]" />
            <span className="text-xs font-mono text-[#1a1814] font-bold">// think first</span>
          </div>
          <p className="text-[#1a1814] text-sm leading-relaxed font-medium mb-2">
            Before looking at hints — ask yourself:
          </p>
          <p className="text-[#1a1814] text-base leading-relaxed italic border-l-2 border-[#1a1814] pl-4">
            {result.thinking_prompt}
          </p>
          <p className="text-xs text-[#a89f96] font-mono mt-4">
            Try to think for 5-10 minutes. Then use hints below if stuck.
          </p>
        </div>

        {/* Progressive Hints */}
        <div className="rounded-xl border border-[#e8e2d9] bg-white p-6">
          <div className={headerClass}>
            <Lightbulb size={16} className="text-[#a89f96]" />
            <span className={labelClass}>// hints (reveal one at a time)</span>
          </div>

          <div className="space-y-3">
            {result.hints.map((hint, i) => {
              const isLocked = !isPaid && i>=2
              if (isLocked && i <= hintsUnlocked) {
                return (
                  <div key={i} className="rounded-lg bg-[#f0ede6] p-3 text-center">
                    <p className="text-xs text-[#6b6560] mb-2">🔒 Hint {i + 1} locked</p>
                    <a href="/#pricing" className="text-xs font-mono text-[#1a1814] underline">
                      Unlock next insight →
                    </a>
                  </div>
                )
              }
              return(
                <div key={i}>
                  {i < hintsUnlocked ? (
                    <div className="rounded-lg bg-[#f0ede6] p-3 border-l-2 border-[#1a1814]">
                      <span className="text-xs font-mono text-[#a89f96] block mb-1">
                        hint {i + 1}
                      </span>
                      <p className="text-sm text-[#1a1814] leading-relaxed">{hint}</p>
                    </div>
                  ) : i === hintsUnlocked ? (
                    <Button
                      variant="outline"
                      className="w-full border-dashed border-[#d4cdc4] text-[#6b6560] hover:border-[#1a1814] hover:text-[#1a1814] text-sm"
                      onClick={() => setHintsUnlocked(i + 1)}
                    >
                      <Lightbulb size={14} className="mr-2" />
                      {i === 0 ? "Show hint" : "Show next hint"}
                    </Button>
                  ) : null}
                </div>
            )})} 
          </div>

          {/* Free Paywall — after hint 2 */}
          {!isPaid && hintsUnlocked >= 2 && (
            <div className="mt-4 rounded-xl border-2 border-[#1a1814] bg-[#faf8f3] p-5 text-center">
              <p className="text-xs font-mono text-[#a89f96] mb-2">
                2 hints used • You're close
              </p>
              <div className="w-8 h-8 rounded-full bg-[#1a1814] flex items-center justify-center mx-auto mb-3">
                <Lightbulb size={16} className="text-[#faf8f3]" />
              </div>
              <p className="font-mono text-sm font-bold text-[#1a1814] mb-1">
                  You’re one insight away from solving this.
              </p>
              <p className="text-xs text-[#6b6560] mb-4 leading-relaxed">
                Unlock how top candidates recognize this pattern instantly.
              </p>
              {/* Feature bullets (more scannable) */}
              <div className="text-xs text-[#6b6560] mb-4 space-y-1">
                <p>• Final hint to unblock you</p>
                <p>• Pattern breakdown + intuition</p>
                <p>• Memory trick for interviews</p>
                <p>• Similar problems to practice</p>
              </div>
              <a
                href="/#pricing"
                className="inline-block bg-[#1a1814] text-[#faf8f3] font-mono text-sm px-5 py-2 rounded-lg hover:bg-[#2d2926] transition-colors"
              >
                Unlockk pattern →
              </a>
            </div>
          )}

          {isPaid && hintsUnlocked >= 3 && !showApproach && (
            <div className="mt-4 space-y-3">
              {!showQuickCheck ? (
                <Button
                  variant="outline"
                  className="w-full border-[#1a1814] text-[#1a1814] hover:bg-[#f0ede6] text-sm font-mono"
                  onClick={() => setShowQuickCheck(true)}
                >
                  ✦ Test your understanding before the answer
                </Button>
              ) : (
                <div className="rounded-xl border-2 border-[#1a1814] bg-[#faf8f3] p-4">
                  <p className="text-xs font-mono text-[#a89f96] mb-1">// quick check</p>
                  <p className="text-sm font-medium text-[#1a1814] mb-3">
                    Explain in your own words — why does this problem need an efficient lookup? What happens if you don't have one?
                  </p>
                  {answerFeedback === null && (
                    <>
                      <textarea
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="Write your answer here... (2-3 sentences is enough)"
                        className="w-full min-h-[80px] bg-white border border-[#e8e2d9] rounded-lg p-3 text-sm font-mono text-[#1a1814] placeholder:text-[#a89f96] outline-none focus:border-[#1a1814] resize-none mb-3"
                      />
                      <Button
                        className="w-full bg-[#1a1814] text-[#faf8f3] hover:bg-[#2d2926] text-sm"
                        disabled={userAnswer.trim().split(" ").length < 4}
                        onClick={checkAnswer}
                      >
                        Check my answer
                      </Button>
                    </>
                  )}
                  {answerFeedback === "correct" && (
                    <div className="space-y-3">
                      <div className="rounded-lg bg-green-50 border border-green-200 p-3">
                        <p className="text-sm font-medium text-green-800 mb-1">✓ Good thinking!</p>
                        <p className="text-xs text-green-700 leading-relaxed">
                          You explained your reasoning clearly. That's exactly the skill interviewers look for.
                        </p>
                      </div>
                      <Button
                        className="w-full bg-[#1a1814] text-[#faf8f3] hover:bg-[#2d2926] text-sm"
                        onClick={() => { setShowApproach(true); setShowPattern(true) }}
                      >
                        <Eye size={14} className="mr-2" />
                        See the full approach
                      </Button>
                    </div>
                  )}
                  {answerFeedback === "wrong" && (
                    <div className="space-y-3">
                      <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
                        <p className="text-sm font-medium text-amber-800 mb-1">Almost — think deeper</p>
                        <p className="text-xs text-amber-700 leading-relaxed">
                          Think about time complexity — what happens without an efficient lookup?
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full border-[#e8e2d9] text-[#6b6560] text-sm"
                        onClick={() => { setUserAnswer(""); setAnswerFeedback(null) }}
                      >
                        Try again
                      </Button>
                      <Button
                        className="w-full bg-[#1a1814] text-[#faf8f3] hover:bg-[#2d2926] text-sm"
                        onClick={() => { setShowApproach(true); setShowPattern(true) }}
                      >
                        <Eye size={14} className="mr-2" />
                        Show me anyway
                      </Button>
                    </div>
                  )}
                </div>
              )}
              {!showQuickCheck && (
                <Button
                  variant="outline"
                  className="w-full border-dashed border-[#d4cdc4] text-[#a89f96] hover:border-[#1a1814] hover:text-[#6b6560] text-sm"
                  onClick={() => { setShowApproach(true); setShowPattern(true) }}
                >
                  I give up — just show me
                </Button>
              )}
            </div>
          )}

          {hintsUnlocked === 0 && (
            <p className="text-xs text-[#a89f96] font-mono mt-3 text-center">
              Try solving first — hints are here when you need them
            </p>
          )}
        </div>

        {/* Pattern Reveal */}
        {showPattern && (
          <div className="rounded-xl border border-[#e8e2d9] bg-white p-6">
            <div className={headerClass}>
              <Brain size={16} className="text-[#a89f96]" />
              <span className={labelClass}>// pattern</span>
            </div>
            <div className="flex items-start gap-4 mb-4">
              <div className="min-w-[140px] rounded-lg bg-[#f0ede6] px-4 py-3 text-center">
                <p className="font-mono text-lg font-bold text-[#1a1814]">
                  { isPaid ? result.pattern_reveal.name : "🔒 Hidden Pattern"}
                </p>
              </div>
              {isPaid ? (
                <div>
                    <p className="text-sm leading-relaxed text-[#6b6560] mb-2">
                      {result.pattern_reveal.why}
                    </p>
                    <div className="bg-[#f0ede6] rounded-lg p-3">
                      <p className="text-xs font-mono text-[#a89f96] mb-1">the aha moment</p>
                      <p className="text-sm font-medium text-[#1a1814]">
                        {result.pattern_reveal.intuition}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1">
                    <p className="text-xs text-[#a89f96] font-mono mb-2">why this pattern fits</p>
                    <div className="rounded-lg bg-[#f0ede6] p-3 text-center">
                      <p className="text-xs text-[#6b6560] mb-2">🔒 Full explanation locked</p>
                      <a href="/#pricing" className="text-xs font-mono text-[#1a1814] underline">
                        Upgrade to Basic →
                      </a>
                    </div>
                  </div>
                )}
              </div>
          </div>
        )}

        {/* Thinking Steps */}
        {showApproach && (
          <div className="rounded-xl border border-[#e8e2d9] bg-white p-6">
            <div className={headerClass}>
              <BookOpen size={16} className="text-[#a89f96]" />
              <span className={labelClass}>// how to think through this</span>
            </div>
            <p className="text-xs text-[#a89f96] font-mono mb-4">
              No code — just the thinking process
            </p>
            <ol className="space-y-4">
              {result.thinking_steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#1a1814] text-[#faf8f3] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-[#1a1814]">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Memory Hook */}
        <div className="rounded-xl border border-[#e8e2d9] bg-white p-6">
          <div className={headerClass}>
            <Target size={16} className="text-[#a89f96]" />
            <span className={labelClass}>// memory hook</span>
          </div>
          {!isPaid ? (
            <div className="relative">
              <p className="text-sm font-medium italic leading-relaxed text-[#1a1814] blur-sm select-none">
                "{result.memory_hook}"
              </p>
              <div className="absolute inset-0 flex items-center justify-center">
                <a href="/#pricing" className="text-xs font-mono text-[#1a1814] bg-[#f0ede6] px-3 py-1.5 rounded-lg border border-[#e8e2d9] hover:border-[#1a1814]">
                  🔒 Upgrade to read →
                </a>
              </div>
            </div>
          ) : (
            <div className="border-l-2 border-[#1a1814] pl-4">
              <p className="text-sm font-medium italic leading-relaxed text-[#1a1814]">
                "{result.memory_hook}"
              </p>
            </div>
          )}
        </div>

        {/* Interview Recognition */}
        <div className="rounded-xl border border-[#e8e2d9] bg-white p-6">
          <div className={headerClass}>
            <GraduationCap size={16} className="text-[#a89f96]" />
            <span className={labelClass}>// spot this in interviews</span>
          </div>
          {plan === "free" ? (
            <div className="rounded-lg bg-[#f0ede6] p-4 text-center">
              <p className="text-sm text-[#6b6560] mb-2">
                🔒 Learn how to spot this pattern during interviews
              </p>
              <a href="/#pricing" className="text-xs font-mono text-[#1a1814] underline">
                Upgrade to Basic to unlock →
              </a>
            </div>
          ) : (
            <div className="bg-[#f0ede6] rounded-lg p-3">
              <p className="text-sm leading-relaxed text-[#1a1814]">
                {result.interview_recognition}
              </p>
            </div>
          )}
          <div className="flex items-center gap-3 mt-4">
            <p className="text-xs font-mono text-[#a89f96]">time to solve</p>
            <span className="text-xs font-mono bg-[#f0ede6] text-[#1a1814] px-2 py-1 rounded">
              {result.solve_time}
            </span>
          </div>
        </div>

        {/* Missing Concepts */}
        <div className="rounded-xl border border-[#e8e2d9] bg-white p-6">
          <div className={headerClass}>
            <HelpCircle size={16} className="text-[#a89f96]" />
            <span className={labelClass}>// concepts you need to know first</span>
          </div>
          {!isPaid ? (
            <div className="rounded-lg bg-[#f0ede6] p-4 text-center">
              <p className="text-sm text-[#6b6560] mb-2">
                🔒 See what prerequisite concepts you're missing
              </p>
              <a href="/#pricing" className="text-xs font-mono text-[#1a1814] underline">
                Upgrade to Basic to unlock →
              </a>
            </div>
          ) : !showConcepts ? (
            <Button
              variant="outline"
              className="w-full border-[#e8e2d9] text-[#6b6560] hover:border-[#1a1814] hover:text-[#1a1814]"
              onClick={() => setShowConcepts(true)}
            >
              <ChevronDown size={14} className="mr-2" />
              What concepts am I missing?
            </Button>
          ) : (
            <div className="space-y-3">
              {(result.missing_concepts || []).map((c, i) => (
                <div key={i} className="rounded-lg border border-[#e8e2d9] p-3">
                  <p className="text-sm font-medium text-[#1a1814] mb-1">{c.concept}</p>
                  <p className="text-xs text-[#6b6560] mb-2">{c.why_needed}</p>
                  <a
                    href={`https://www.google.com/search?q=${encodeURIComponent(c.learn_query)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-[#1a1814] underline hover:opacity-70"
                  >
                    Search: "{c.learn_query}" →
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Similar Problems */}
        <div className="rounded-xl border border-[#e8e2d9] bg-white p-6">
          <div className={headerClass}>
            <Layers size={16} className="text-[#a89f96]" />
            <span className={labelClass}>// practice these next</span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {(result.similar_problems || []).map((p, i) => (
              <button
                key={i}
                onClick={() => {
                  if (!isPaid) return
                  window.scrollTo({ top: 0, behavior: "smooth" })
                  window.dispatchEvent(
                    new CustomEvent("patternflow:send-to-solver", { detail: p.name })
                  )
                }}
                className={`group rounded-lg border border-[#e8e2d9] bg-[#faf8f3] p-3 text-left transition-all
                  ${isPaid ? "hover:border-[#1a1814] hover:bg-white cursor-pointer" : "cursor-default opacity-70"}`}
              >
                <p className="text-sm font-medium text-[#1a1814]">{p.name}</p>
                <div className="mt-1 flex items-center gap-2 mb-2">
                  <span className={`text-xs font-mono ${
                    p.difficulty === "Easy" ? "text-green-600" :
                    p.difficulty === "Hard" ? "text-red-500" : "text-amber-600"
                  }`}>{p.difficulty}</span>
                  <span className="text-xs text-[#a89f96]">{p.platform}</span>
                </div>
                {isPaid ? (
                  <p className="text-xs text-[#a89f96] leading-relaxed">{p.why_similar}</p>
                ) : (
                  <p className="text-xs text-[#a89f96]">🔒 Upgrade to see why</p>
                )}
              </button>
            ))}
          </div>
          {!isPaid && (
            <div className="mt-3 rounded-lg bg-[#f0ede6] p-3 text-center">
              <p className="text-xs text-[#6b6560] font-mono">
                Full details + click-to-solve locked for free users
              </p>
              <a href="/#pricing" className="text-xs text-[#1a1814] underline font-mono">
                Upgrade to Basic →
              </a>
            </div>
          )}
        </div>

        {/* Pattern Flashcards — Pro only */}
        <div className="rounded-xl border border-[#e8e2d9] bg-white p-6">
          <div className={headerClass}>
            <Lightbulb size={16} className="text-[#a89f96]" />
            <span className={labelClass}>// memorize this pattern</span>
          </div>
          {plan !== "pro" ? (
            <div className="rounded-lg bg-[#f0ede6] p-4 text-center">
              <p className="text-sm text-[#6b6560] mb-2">
                🔒 Interactive flashcards to master this pattern
              </p>
              <a href="/#pricing" className="text-xs font-mono text-[#1a1814] underline">
                Upgrade to Pro to unlock →
              </a>
            </div>
          ) : !showFlashcards ? (
            <Button
              variant="outline"
              className="w-full border-[#e8e2d9] text-[#6b6560] hover:border-[#1a1814] hover:text-[#1a1814]"
              onClick={() => { setShowFlashcards(true); setCurrentFlashcard(0); setShowAnswer(false) }}
            >
              <ChevronDown size={14} className="mr-2" />
              Start flashcard drill
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="bg-[#f0ede6] rounded-lg p-5 min-h-[140px]">
                <p className="text-xs font-mono text-[#a89f96] mb-3">
                  Card {currentFlashcard + 1} of {flashcardQuestions.length}
                </p>
                <p className="text-sm font-medium text-[#1a1814] mb-4">
                  Q: {flashcardQuestions[currentFlashcard].q}
                </p>
                {!showAnswer ? (
                  <Button
                    size="sm"
                    className="bg-[#1a1814] text-[#faf8f3] hover:bg-[#2d2926]"
                    onClick={() => setShowAnswer(true)}
                  >
                    See answer
                  </Button>
                ) : (
                  <div className="border-t border-[#d4cdc4] pt-3 mt-2">
                    <p className="text-xs font-mono text-[#a89f96] mb-1">Answer:</p>
                    <p className="text-sm text-[#1a1814] leading-relaxed">
                      {flashcardQuestions[currentFlashcard].a}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex gap-2 justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentFlashcard === 0}
                  onClick={() => { setCurrentFlashcard(c => c - 1); setShowAnswer(false) }}
                >
                  ← Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentFlashcard === flashcardQuestions.length - 1}
                  onClick={() => { setCurrentFlashcard(c => c + 1); setShowAnswer(false) }}
                >
                  Next →
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => { setShowFlashcards(false); setCurrentFlashcard(0); setShowAnswer(false) }}
                >
                  Done
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Interview Mode — Basic+ */}
        <div className="rounded-xl border border-[#e8e2d9] bg-white p-6">
          <div className={headerClass}>
            <Eye size={16} className="text-[#a89f96]" />
            <span className={labelClass}>// practice under pressure</span>
          </div>
          {plan === "free" ? (
            <div className="rounded-lg bg-[#f0ede6] p-4 text-center">
              <p className="text-sm text-[#6b6560] mb-2">
                🔒 Timed practice mode with real interview conditions
              </p>
              <a href="/#pricing" className="text-xs font-mono text-[#1a1814] underline">
                Upgrade to Basic to unlock →
              </a>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-[#6b6560]">
                Practice solving this problem under interview conditions — limited time, no hints.
              </p>
              <div className="rounded-lg border border-[#e8e2d9] p-4 bg-[#faf8f3]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-mono text-[#6b6560]">
                    Time limit: {timeLimit} minutes
                  </span>
                  <span className="text-xs font-mono bg-[#1a1814] text-[#faf8f3] px-2 py-1 rounded">
                    Interview Mode
                  </span>
                </div>
                {!timerActive ? (
                  <Button
                    className="w-full bg-[#1a1814] text-[#faf8f3] hover:bg-[#2d2926]"
                    onClick={startTimer}
                  >
                    <Clock size={14} className="mr-2" />
                    Start Timed Challenge
                  </Button>
                ) : (
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-[#a89f96] font-mono">
                      ⏱ Timer running in top-right corner
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#e8e2d9] text-[#6b6560] text-xs"
                      onClick={stopTimer}
                    >
                      Stop
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Confidence Self-Rating */}
        <ConfidenceRating
          patternName={result.pattern_reveal?.name || result.pattern_name}
          onRate={async (confidence) => {
            if (!userId) return
            const res = await fetch("/api/update-confidence", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                confidence,
                userId,
                patternName: result.pattern_reveal?.name || result.pattern_name,
              }),
            })
            if (!res.ok) throw new Error("Failed to save confidence")
          }}
        />

      </section>
    </>
  )
}
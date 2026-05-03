"use client"

import { useState, useMemo, memo } from "react"
import { Navbar } from "@/components/Navbar"
import { PATTERNS, type Pattern } from "@/lib/patterns"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  ChevronDown,
  AlertTriangle,
  Lightbulb,
  Search,
  Target,
  Brain,
  Sparkles,
} from "lucide-react"

const DIFF_COLOR = {
  Beginner: "bg-green-100 text-green-700",
  Intermediate: "bg-amber-100 text-amber-700",
  Advanced: "bg-red-100 text-red-700",
}

const CATEGORIES = ["All", ...Array.from(new Set(PATTERNS.map((p) => p.category)))]

export default function PatternsPage() {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null)
  const [filter, setFilter] = useState("All")
  const [search, setSearch] = useState("")

  // Memoize the filtered list to prevent expensive recalculations on every keystroke
  const filtered = useMemo(() => {
    const searchLower = search.toLowerCase()
    return PATTERNS.filter((p) => {
      const matchesCategory = filter === "All" || p.category === filter
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(searchLower) ||
        p.keySignals.some((s) => s.toLowerCase().includes(searchLower))
      return matchesCategory && matchesSearch
    })
  }, [filter, search])

  return (
    <div className="min-h-screen bg-[#faf8f3] text-[#1a1814]">
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-8">
          <p className="mb-1 font-mono text-sm text-[#a89f96]">{"// pattern library"}</p>
          <h1 className="text-3xl font-bold text-[#1a1814]">Learn the Patterns</h1>
          <p className="mt-2 text-sm text-[#6b6560] leading-relaxed max-w-lg">
            Master these core algorithm patterns. Each one has signals to recognize it,
            step-by-step thinking, common mistakes, and practice problems.
          </p>
        </div>

        {/* Search + Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a89f96]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search patterns or keywords..."
              className="w-full rounded-xl border border-[#e8e2d9] bg-white px-4 py-3 pl-11 font-mono text-sm text-[#1a1814] outline-none placeholder:text-[#a89f96] focus:border-[#1a1814] focus:ring-1 focus:ring-[#1a1814]"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`rounded-full border px-3 py-1.5 font-mono text-xs transition-all ${
                  filter === cat
                    ? "border-[#1a1814] bg-[#1a1814] text-[#faf8f3]"
                    : "border-[#e8e2d9] bg-white text-[#6b6560] hover:border-[#1a1814]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Pattern count */}
        <p className="mb-4 font-mono text-xs text-[#a89f96]">
          {filtered.length} pattern{filtered.length !== 1 ? "s" : ""}
        </p>

        {/* Pattern Cards */}
        <div className="space-y-3">
          {filtered.map((pattern) => (
            <PatternCard
              key={pattern.slug}
              pattern={pattern}
              isExpanded={expandedSlug === pattern.slug}
              onToggle={() =>
                setExpandedSlug(expandedSlug === pattern.slug ? null : pattern.slug)
              }
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <Search size={32} className="mx-auto mb-3 text-[#e8e2d9]" />
            <p className="text-sm text-[#a89f96]">No patterns found. Try a different search.</p>
          </div>
        )}
      </main>
    </div>
  )
}

// Memoized Card component to prevent re-rendering 25+ cards on every keystroke
const PatternCard = memo(({
  pattern,
  isExpanded,
  onToggle,
}: {
  pattern: Pattern
  isExpanded: boolean
  onToggle: () => void
}) => {
  return (
    <div className="rounded-xl border border-[#e8e2d9] bg-white transition-all hover:border-[#d4cdc4]">
      {/* Header — always visible */}
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between p-5 text-left"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex-shrink-0 rounded-lg bg-[#1a1814] p-2">
            <Brain size={16} className="text-[#faf8f3]" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-mono text-sm font-bold text-[#1a1814]">{pattern.name}</h3>
              <Badge
                className={`text-[10px] font-mono px-2 py-0 ${
                  DIFF_COLOR[pattern.difficulty]
                }`}
              >
                {pattern.difficulty}
              </Badge>
              <span className="font-mono text-[10px] text-[#a89f96]">{pattern.category}</span>
            </div>
            <p className="mt-1 text-xs text-[#6b6560] line-clamp-1">{pattern.description}</p>
          </div>
        </div>
        <ChevronDown
          size={16}
          className={`flex-shrink-0 text-[#a89f96] transition-transform duration-200 ml-4 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Expanded Content — Optimized with grid and conditional mounting */}
      <div
        className={`grid transition-all duration-200 ease-in-out ${
          isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          {isExpanded && (
            <div className="border-t border-[#e8e2d9] px-5 pb-5 pt-4 space-y-5">
              {/* When to use */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Target size={14} className="text-[#1a1814]" />
                  <span className="font-mono text-xs font-bold text-[#1a1814]">When to use</span>
                </div>
                <p className="text-sm text-[#6b6560] leading-relaxed">{pattern.whenToUse}</p>
              </div>

              {/* Key Signals */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={14} className="text-[#1a1814]" />
                  <span className="font-mono text-xs font-bold text-[#1a1814]">
                    Spot it in problems
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {pattern.keySignals.map((signal) => (
                    <span
                      key={signal}
                      className="rounded-full bg-[#f0ede6] px-3 py-1 font-mono text-xs text-[#1a1814]"
                    >
                      {signal}
                    </span>
                  ))}
                </div>
              </div>

              {/* How to Think */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb size={14} className="text-[#1a1814]" />
                  <span className="font-mono text-xs font-bold text-[#1a1814]">How to think</span>
                </div>
                <ol className="space-y-2">
                  {pattern.howToThink.map((step, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#1a1814] text-[10px] font-bold text-[#faf8f3]">
                        {i + 1}
                      </span>
                      <span className="text-sm text-[#6b6560] leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Common Mistakes */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle size={14} className="text-amber-500" />
                  <span className="font-mono text-xs font-bold text-[#1a1814]">
                    Common mistakes
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {pattern.commonMistakes.map((mistake, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#6b6560]">
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-400" />
                      {mistake}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Practice Problems */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen size={14} className="text-[#1a1814]" />
                  <span className="font-mono text-xs font-bold text-[#1a1814]">Practice these</span>
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {pattern.practiceProblems.map((prob) => (
                    <div
                      key={prob.name}
                      className="flex items-center justify-between rounded-lg border border-[#e8e2d9] bg-[#faf8f3] px-3 py-2"
                    >
                      <div>
                        <p className="text-xs font-medium text-[#1a1814]">{prob.name}</p>
                        <p className="font-mono text-[10px] text-[#a89f96]">{prob.platform}</p>
                      </div>
                      <span
                        className={`font-mono text-[10px] ${
                          prob.difficulty === "Easy"
                            ? "text-green-600"
                            : prob.difficulty === "Hard"
                            ? "text-red-500"
                            : "text-amber-600"
                        }`}
                      >
                        {prob.difficulty}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
})

PatternCard.displayName = "PatternCard"

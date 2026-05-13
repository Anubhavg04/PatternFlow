"use client"

export type Range = "7D" | "30D" | "90D" | "1Y"

export const RANGE_DAYS: Record<Range, number> = {
  "7D": 7,
  "30D": 30,
  "90D": 90,
  "1Y": 365,
}

type RangeSelectorProps = {
  selected: Range
  onChange: (r: Range) => void
}

const RANGES: Range[] = ["7D", "30D", "90D", "1Y"]

export function RangeSelector({ selected, onChange }: RangeSelectorProps) {
  return (
    <div className="flex gap-1 rounded-lg border border-[#e8e2d9] bg-[#f5f2eb] p-1">
      {RANGES.map((r) => (
        <button
          key={r}
          onClick={() => onChange(r)}
          className={`rounded-md px-3 py-1.5 font-mono text-xs transition-all ${
            selected === r
              ? "bg-[#1a1814] text-[#faf8f3] shadow-sm"
              : "text-[#6b6560] hover:text-[#1a1814]"
          }`}
        >
          {r}
        </button>
      ))}
    </div>
  )
}

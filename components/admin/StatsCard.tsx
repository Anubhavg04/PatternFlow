import { LucideIcon } from "lucide-react"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

export type Trend = {
  label: string
  direction: "up" | "down" | "neutral"
}

type StatsCardProps = {
  icon: LucideIcon
  value: string | number
  label: string
  trend?: Trend
}

export function StatsCard({ icon: Icon, value, label, trend }: StatsCardProps) {
  const trendColor = {
    up: "text-green-600",
    down: "text-amber-500",
    neutral: "text-[#a89f96]",
  }

  const TrendIcon =
    trend?.direction === "up"
      ? TrendingUp
      : trend?.direction === "down"
      ? TrendingDown
      : Minus

  return (
    <div className="rounded-xl border border-[#e8e2d9] bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      {/* Icon chip */}
      <div className="mb-4 inline-flex rounded-lg bg-[#f5f2eb] p-2">
        <Icon size={15} className="text-[#6b6560]" />
      </div>

      {/* Label */}
      <p className="text-xs text-[#a89f96]">{label}</p>

      {/* Value */}
      <p className="mt-1 font-mono text-3xl font-bold tracking-tight text-[#1a1814]">
        {value}
      </p>

      {/* Trend */}
      {trend && (
        <div
          className={`mt-2.5 flex items-center gap-1 ${trendColor[trend.direction]}`}
        >
          <TrendIcon size={11} />
          <span className="font-mono text-[10px]">{trend.label}</span>
        </div>
      )}
    </div>
  )
}

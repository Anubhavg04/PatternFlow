function timeAgo(dateStr: string) {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (diff < 60) return "just now"
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

type ActivityRow = {
  email: string
  action: string
  timestamp: string
}

type ActivityTableProps = {
  rows: ActivityRow[]
}

export function ActivityTable({ rows }: ActivityTableProps) {
  if (rows.length === 0) {
    return (
      <p className="py-8 text-center font-mono text-xs text-[#a89f96]">
        No recent activity
      </p>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-[#e8e2d9]">
            <th className="pb-2 font-mono text-[10px] text-[#a89f96] font-normal">User</th>
            <th className="pb-2 font-mono text-[10px] text-[#a89f96] font-normal">Action</th>
            <th className="pb-2 text-right font-mono text-[10px] text-[#a89f96] font-normal">When</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-[#f5f2eb] last:border-0"
            >
              <td className="py-2.5 font-mono text-xs text-[#1a1814]">
                {row.email}
              </td>
              <td className="py-2.5 text-xs text-[#6b6560]">{row.action}</td>
              <td className="py-2.5 text-right font-mono text-[10px] text-[#a89f96]">
                {timeAgo(row.timestamp)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

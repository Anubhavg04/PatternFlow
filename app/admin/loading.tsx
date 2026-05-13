export default function AdminLoading() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center lg:pl-56">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="relative h-10 w-10">
          <div className="absolute inset-0 rounded-full border-2 border-[#e8e2d9]" />
          <div className="absolute inset-0 animate-spin rounded-full border-t-2 border-[#1a1814]" />
        </div>
        <p className="font-mono text-xs uppercase tracking-widest text-[#a89f96]">
          Loading
        </p>
      </div>
    </div>
  )
}

"use client"
import Link from "next/link"
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/nextjs"
import { Code2, LayoutDashboard, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { usePathname } from "next/navigation"

export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? ""
  const clerkEnabled = clerkKey.startsWith("pk_") && !clerkKey.includes("placeholder")

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-4 px-4 pointer-events-none">
      <nav className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between pointer-events-auto">
        <Link href="/" className="flex items-center gap-2 rounded-full bg-white/50 px-3 py-2 backdrop-blur-sm transition-colors hover:bg-white/80">
          <Code2 className="h-5 w-5 text-[#1a1814]" />
          <span className="text-[17px] font-bold text-[#1a1814] tracking-tight">PatternFlow</span>
        </Link>

        {/* Desktop Links (Floating Pill) */}
        <div className="hidden items-center gap-1 rounded-full border border-[#e8e2d9]/60 bg-white/80 p-1 shadow-sm backdrop-blur-md md:flex">
          <a
            href="/#how-it-works"
            className="rounded-full px-4 py-1.5 font-mono text-sm font-medium text-[#6b6560] transition hover:bg-[#f0ede6] hover:text-[#1a1814]"
          >
            How it works
          </a>
          <Link
            href="/patterns"
            className={`rounded-full px-4 py-1.5 font-mono text-sm font-medium transition ${pathname === "/patterns"
              ? "bg-[#1a1814] text-white shadow-sm"
              : "text-[#6b6560] hover:bg-[#f0ede6] hover:text-[#1a1814]"
              }`}
          >
            Patterns
          </Link>
          <a
            href="/#pricing"
            className="rounded-full px-4 py-1.5 font-mono text-sm font-medium text-[#6b6560] transition hover:bg-[#f0ede6] hover:text-[#1a1814]"
          >
            Pricing
          </a>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            {clerkEnabled ? <ClerkAuthButtons /> : <FallbackAuthButtons />}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-[#1a1814] shadow-sm backdrop-blur-md hover:bg-white md:hidden"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto mt-2 mx-4 rounded-2xl border border-[#e8e2d9] bg-[#faf8f3]/95 p-6 shadow-xl backdrop-blur-md animate-in slide-in-from-top-2 md:hidden">
          <div className="flex flex-col gap-5">
            <a
              href="/#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl px-3 py-2 font-mono text-sm font-medium text-[#6b6560] hover:bg-[#f0ede6] hover:text-[#1a1814]"
            >
              How it works
            </a>
            <Link
              href="/patterns"
              onClick={() => setMobileMenuOpen(false)}
              className={`rounded-xl px-3 py-2 font-mono text-sm font-medium transition ${pathname === "/patterns"
                ? "bg-[#1a1814]/5 text-[#1a1814]"
                : "text-[#6b6560] hover:bg-[#f0ede6] hover:text-[#1a1814]"
                }`}
            >
              Patterns
            </Link>
            <a
              href="/#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl px-3 py-2 font-mono text-sm font-medium text-[#6b6560] hover:bg-[#f0ede6] hover:text-[#1a1814]"
            >
              Pricing
            </a>
            <Separator className="bg-[#e8e2d9]" />
            <div className="flex flex-col gap-3">
              {clerkEnabled ? (
                <ClerkAuthButtons mobile onAction={() => setMobileMenuOpen(false)} />
              ) : (
                <FallbackAuthButtons />
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

function ClerkAuthButtons({ mobile, onAction }: { mobile?: boolean; onAction?: () => void }) {
  const { isSignedIn } = useAuth()
  const pathname = usePathname()

  if (isSignedIn) {
    return (
      <div className={`flex items-center gap-3 ${mobile ? "flex-col items-start" : ""}`}>
        <Link
          href="/dashboard"
          onClick={onAction}
          className={`flex items-center gap-1.5 rounded-full px-4 py-2 font-mono text-sm font-medium transition ${pathname === "/dashboard"
            ? "bg-[#1a1814] text-white shadow-sm"
            : "bg-white/80 text-[#6b6560] shadow-sm backdrop-blur-md hover:bg-white hover:text-[#1a1814]"
            } ${!mobile && "hidden md:flex"}`}
        >
          <LayoutDashboard size={14} />
          Dashboard
        </Link>
        <Link
          href="/solve"
          onClick={onAction}
          className={`flex items-center gap-1.5 rounded-full px-4 py-2 font-mono text-sm font-medium transition ${pathname === "/solve"
            ? "bg-[#1a1814] text-white shadow-sm"
            : "bg-white/80 text-[#6b6560] shadow-sm backdrop-blur-md hover:bg-white hover:text-[#1a1814]"
            } ${!mobile && "hidden md:inline-flex"}`}
        >
          Solve
        </Link>
        {!mobile && (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-sm backdrop-blur-md hover:bg-white">
            <UserButton afterSignOutUrl="/" />
          </div>
        )}
        {mobile && <UserButton afterSignOutUrl="/" />}
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-2 ${mobile ? "flex-col items-stretch" : ""}`}>
      <SignInButton mode="modal">
        <Button variant="ghost" size="sm" className="rounded-full px-4 text-sm font-medium text-[#6b6560] hover:bg-white hover:text-[#1a1814]">
          Sign in
        </Button>
      </SignInButton>
      <SignUpButton mode="modal">
        <Button size="sm" className="rounded-full bg-[#1a1814] px-5 text-sm font-medium text-[#faf8f3] shadow-md hover:bg-[#2d2926]">
          Launch App
        </Button>
      </SignUpButton>
    </div>
  )
}

function FallbackAuthButtons() {
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" className="rounded-full px-4 text-sm font-medium text-[#6b6560] hover:bg-white hover:text-[#1a1814]">
        Sign in
      </Button>
      <Button size="sm" className="rounded-full bg-[#1a1814] px-5 text-sm font-medium text-[#faf8f3] shadow-md hover:bg-[#2d2926]">
        Launch App
      </Button>
    </div>
  )
}

export default Navbar
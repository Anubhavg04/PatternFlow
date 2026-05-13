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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#e8e2d9] bg-[#faf8f3]/90 backdrop-blur">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <Code2 className="h-5 w-5 text-[#1a1814]" />
          <span className="text-[18px] font-bold text-[#1a1814]">PatternFlow</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-2 md:flex">
          <a
            href="/#how-it-works"
            className="rounded-lg px-3 py-1.5 font-mono text-sm text-[#6b6560] transition hover:bg-[#f0ede6] hover:text-[#1a1814]"
          >
            How it works
          </a>
          <Link
            href="/patterns"
            className={`rounded-lg px-3 py-1.5 font-mono text-sm transition ${pathname === "/patterns"
              ? "bg-[#1a1814]/5 text-[#1a1814] font-bold"
              : "text-[#6b6560] hover:bg-[#f0ede6] hover:text-[#1a1814]"
              }`}
          >
            Patterns
          </Link>
          <a
            href="/#pricing"
            className="rounded-lg px-3 py-1.5 font-mono text-sm text-[#6b6560] transition hover:bg-[#f0ede6] hover:text-[#1a1814]"
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
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#1a1814] hover:bg-[#f0ede6] md:hidden"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-[#e8e2d9] bg-[#faf8f3] p-6 animate-in slide-in-from-top-2 md:hidden">
          <div className="flex flex-col gap-5">
            <a
              href="/#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 font-mono text-sm font-medium text-[#6b6560] hover:bg-[#f0ede6] hover:text-[#1a1814]"
            >
              How it works
            </a>
            <Link
              href="/patterns"
              onClick={() => setMobileMenuOpen(false)}
              className={`rounded-lg px-3 py-2 font-mono text-sm font-medium transition ${pathname === "/patterns"
                ? "bg-[#1a1814]/5 text-[#1a1814]"
                : "text-[#6b6560] hover:bg-[#f0ede6] hover:text-[#1a1814]"
                }`}
            >
              Patterns
            </Link>
            <a
              href="/#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 font-mono text-sm font-medium text-[#6b6560] hover:bg-[#f0ede6] hover:text-[#1a1814]"
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
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-sm transition ${pathname === "/dashboard"
            ? "bg-[#1a1814]/5 text-[#1a1814] font-bold"
            : "text-[#6b6560] hover:bg-[#f0ede6] hover:text-[#1a1814]"
            } ${!mobile && "hidden md:flex"}`}
        >
          <LayoutDashboard size={14} />
          Dashboard
        </Link>
        <Link
          href="/solve"
          onClick={onAction}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-sm transition ${pathname === "/solve"
            ? "bg-[#1a1814]/5 text-[#1a1814] font-bold"
            : "text-[#6b6560] hover:bg-[#f0ede6] hover:text-[#1a1814]"
            } ${!mobile && "hidden md:inline-flex"}`}
        >
          Solve
        </Link>
        {!mobile && (
          <Separator orientation="vertical" className="mx-1 hidden h-5 bg-[#e8e2d9] md:block" />
        )}
        <UserButton afterSignOutUrl="/" />
      </div>
    )
  }

  return (
    <>
      <SignInButton mode="modal">
        <Button variant="ghost" size="sm" className="text-sm text-[#6b6560] hover:text-[#1a1814]">
          Sign in
        </Button>
      </SignInButton>
      <SignUpButton mode="modal">
        <Button size="sm" className="bg-[#1a1814] text-sm text-[#faf8f3] hover:bg-[#2d2926]">
          Try Free
        </Button>
      </SignUpButton>
    </>
  )
}

function FallbackAuthButtons() {
  return (
    <>
      <Button variant="ghost" size="sm" className="text-sm text-[#6b6560] hover:text-[#1a1814]">
        Sign in
      </Button>
      <Button size="sm" className="bg-[#1a1814] text-sm text-[#faf8f3] hover:bg-[#2d2926]">
        Try Free
      </Button>
    </>
  )
}

export default Navbar
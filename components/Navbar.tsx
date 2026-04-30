"use client"
import Link from "next/link"
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/nextjs"
import { Code2, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function Navbar() {
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? ""
  const clerkEnabled = clerkKey.startsWith("pk_") && !clerkKey.includes("placeholder")

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#e8e2d9] bg-[#faf8f3]/90 backdrop-blur">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <Code2 className="h-5 w-5 text-[#1a1814]" />
          <span className="text-[18px] font-bold text-[#1a1814]">PatternFlow</span>
        </Link>

        <div className="flex items-center gap-3">
          <a
            href="/#how-it-works"
            className="hidden font-mono text-sm text-[#6b6560] transition hover:text-[#1a1814] md:inline-flex"
          >
            How it works
          </a>
          <a
            href="/patterns"
            className="hidden font-mono text-sm text-[#6b6560] transition hover:text-[#1a1814] md:inline-flex"
          >
            Patterns
          </a>
          <a
            href="/#pricing"
            className="hidden font-mono text-sm text-[#6b6560] transition hover:text-[#1a1814] md:inline-flex"
          >
            Pricing
          </a>
          <Separator orientation="vertical" className="mx-1 hidden h-5 bg-[#e8e2d9] md:block" />
          {clerkEnabled ? <ClerkAuthButtons /> : <FallbackAuthButtons />}
        </div>
      </nav>
    </header>
  )
}

function ClerkAuthButtons() {
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="hidden items-center gap-1.5 font-mono text-sm text-[#6b6560] transition hover:text-[#1a1814] md:flex"
        >
          <LayoutDashboard size={14} />
          Dashboard
        </Link>
        <Link
          href="/solve"
          className="hidden font-mono text-sm text-[#6b6560] transition hover:text-[#1a1814] md:inline-flex"
        >
          Solve
        </Link>
        <Separator orientation="vertical" className="mx-1 hidden h-5 bg-[#e8e2d9] md:block" />
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
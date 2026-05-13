"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "@/components/Navbar";
import StickyQuotes from "@/components/StickyQuotes";
import { PaymentButton } from "@/components/PaymentButton";
import { useRouter } from "next/navigation";
import {
  Brain,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardPaste,
  Clock,
  Code2,
  Fingerprint,
  HelpCircle,
  Layers,
  Lightbulb,
  Sparkles,
  Target,
  Timer,
  X,
  Zap,
} from "lucide-react";

export default function Home() {
  const router = useRouter();

  return (
    <div className="bg-[#faf8f3] text-[#1a1814]">
      <Navbar />

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#faf8f3] px-4 pt-24 sm:px-6">
        <div className="relative z-10 mx-auto max-w-[680px] text-center">
          <Badge
            variant="outline"
            className="gap-1.5 border-[#e8e2d9] bg-[#f0ede6] px-3 py-1 font-mono text-[11px] text-[#6b6560]"
          >
            <Sparkles size={12} className="text-[#1a1814]" />
            AI-Powered Pattern Recognition
          </Badge>
          <h1 className="mt-6 font-mono text-[32px] leading-[1.1] tracking-[-1px] text-[#1a1814] md:text-[52px]">
            Understand DSA.
            <br />
            <span className="font-black text-[#1a1814]">Not memorize it.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-[480px] text-[18px] text-[#6b6560]">
            Paste any problem. Get pattern detection, memory hooks, and similar problems — instantly.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button
              onClick={() => router.push("/solve")}
              className="h-auto gap-2 bg-[#1a1814] px-6 py-3 font-mono text-sm font-bold text-[#faf8f3] hover:bg-[#2d2926]"
            >
              <Zap className="h-4 w-4" />
              Solve a Problem Free
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })
              }
              className="h-auto border-[#e8e2d9] bg-transparent px-6 py-3 font-mono text-sm text-[#6b6560] hover:border-[#1a1814] hover:text-[#1a1814]"
            >
              See how it works
            </Button>
          </div>
          <p className="mt-4 font-mono text-xs text-[#a89f96]">
            No signup needed · 5 free solves daily · No credit card
          </p>
        </div>
      </section>

      {/* Sticky Quotes */}
      <section id="quotes" className="bg-[#faf8f3] py-24">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-3 text-center font-mono text-sm text-[#a89f96]">{"// daily dose"}</p>
          <h2 className="mb-2 text-center text-3xl font-bold text-[#1a1814]">
            A little motivation goes a long way
          </h2>
          <p className="mb-16 text-center font-mono text-sm text-[#a89f96]">
            quotes change every day · come back tomorrow
          </p>
          <StickyQuotes />
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-[#f5f2eb] py-24">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-mono text-xs text-[#6b6560]">{"// the process"}</p>
          <h2 className="mt-2 font-mono text-3xl text-[#1a1814] md:text-[32px]">Three steps to clarity</h2>
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            <article className="rounded-lg border border-[#e8e2d9] bg-[#ffffff] p-6 transition hover:border-[#d4cdc4]">
              <p className="font-mono text-[32px] text-[#a89f96]">01</p>
              <div className="mt-2 inline-flex rounded-md bg-[#f0ede6] p-2">
                <ClipboardPaste className="h-6 w-6 text-[#1a1814]" />
              </div>
              <h3 className="mt-3 font-mono text-base text-[#1a1814]">Paste anything</h3>
              <p className="mt-2 text-sm text-[#6b6560]">
                Full LeetCode page, GFG problem, random question — paste it raw. We extract what matters.
              </p>
            </article>
            <article className="rounded-lg border border-[#e8e2d9] bg-[#ffffff] p-6 transition hover:border-[#d4cdc4]">
              <p className="font-mono text-[32px] text-[#a89f96]">02</p>
              <div className="mt-2 inline-flex rounded-md bg-[#f0ede6] p-2">
                <Brain className="h-6 w-6 text-[#1a1814]" />
              </div>
              <h3 className="mt-3 font-mono text-base text-[#1a1814]">Think, don&apos;t memorize</h3>
              <p className="mt-2 text-sm text-[#6b6560]">
                AI guides you to think — hints, Socratic questions, pattern reveal only when you&apos;re ready.
              </p>
            </article>
            <article className="rounded-lg border border-[#e8e2d9] bg-[#ffffff] p-6 transition hover:border-[#d4cdc4]">
              <p className="font-mono text-[32px] text-[#a89f96]">03</p>
              <div className="mt-2 inline-flex rounded-md bg-[#f0ede6] p-2">
                <Target className="h-6 w-6 text-[#1a1814]" />
              </div>
              <h3 className="mt-3 font-mono text-base text-[#1a1814]">Remember it</h3>
              <p className="mt-2 text-sm text-[#6b6560]">
                Memory hook, interview recognition tips, similar problems — everything to make it stick.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* What You Get — Feature Showcase */}
      <section className="bg-[#faf8f3] py-24">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-mono text-xs text-[#6b6560]">{"// what you get"}</p>
          <h2 className="mt-2 font-mono text-3xl text-[#1a1814] md:text-[32px]">Every solve gives you this</h2>
          <p className="mt-2 text-base text-[#6b6560]">Not just an answer — a full learning breakdown.</p>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

            <div className="group rounded-xl border border-[#e8e2d9] bg-white p-6 transition-all hover:border-[#1a1814] hover:shadow-sm">
              <div className="mb-4 inline-flex rounded-lg bg-[#1a1814] p-2.5">
                <Brain className="h-5 w-5 text-[#faf8f3]" />
              </div>
              <h3 className="font-mono text-sm font-bold text-[#1a1814]">Think First Prompts</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6b6560]">
                Before any hints, you get a Socratic question designed to push you toward the right thinking direction.
              </p>
            </div>

            <div className="group rounded-xl border border-[#e8e2d9] bg-white p-6 transition-all hover:border-[#1a1814] hover:shadow-sm">
              <div className="mb-4 inline-flex rounded-lg bg-[#1a1814] p-2.5">
                <Fingerprint className="h-5 w-5 text-[#faf8f3]" />
              </div>
              <h3 className="font-mono text-sm font-bold text-[#1a1814]">Pattern Detection</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6b6560]">
                AI identifies the core algorithm pattern — Sliding Window, Two Pointers, BFS, DP, and 15+ more.
              </p>
            </div>

            <div className="group rounded-xl border border-[#e8e2d9] bg-white p-6 transition-all hover:border-[#1a1814] hover:shadow-sm">
              <div className="mb-4 inline-flex rounded-lg bg-[#1a1814] p-2.5">
                <Lightbulb className="h-5 w-5 text-[#faf8f3]" />
              </div>
              <h3 className="font-mono text-sm font-bold text-[#1a1814]">Progressive Hints</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6b6560]">
                Three-level hint system. Reveal one at a time — only when you&apos;re truly stuck. No spoilers.
              </p>
            </div>

            <div className="group rounded-xl border border-[#e8e2d9] bg-white p-6 transition-all hover:border-[#1a1814] hover:shadow-sm">
              <div className="mb-4 inline-flex rounded-lg bg-[#1a1814] p-2.5">
                <Target className="h-5 w-5 text-[#faf8f3]" />
              </div>
              <h3 className="font-mono text-sm font-bold text-[#1a1814]">Memory Hooks</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6b6560]">
                A memorable one-liner that anchors the pattern in your brain. Recall it during interviews instantly.
              </p>
            </div>

            <div className="group rounded-xl border border-[#e8e2d9] bg-white p-6 transition-all hover:border-[#1a1814] hover:shadow-sm">
              <div className="mb-4 inline-flex rounded-lg bg-[#1a1814] p-2.5">
                <Layers className="h-5 w-5 text-[#faf8f3]" />
              </div>
              <h3 className="font-mono text-sm font-bold text-[#1a1814]">Similar Problems</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6b6560]">
                Get 3 related problems to reinforce the pattern. Click-to-solve for paid users — instant practice.
              </p>
            </div>

            <div className="group rounded-xl border border-[#e8e2d9] bg-white p-6 transition-all hover:border-[#1a1814] hover:shadow-sm">
              <div className="mb-4 inline-flex rounded-lg bg-[#1a1814] p-2.5">
                <HelpCircle className="h-5 w-5 text-[#faf8f3]" />
              </div>
              <h3 className="font-mono text-sm font-bold text-[#1a1814]">Quick Check Quiz</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6b6560]">
                Test your understanding before seeing the full approach. Explains your reasoning like an interviewer.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-[#e8e2d9] bg-[#faf8f3] py-8">
        <div className="mx-auto flex max-w-4xl flex-wrap justify-around gap-8 px-6">
          <div className="text-center">
            <p className="font-mono text-4xl text-[#1a1814]">25+</p>
            <p className="font-mono text-xs text-[#6b6560]">algorithm patterns</p>
          </div>
          <div className="text-center">
            <p className="font-mono text-4xl text-[#1a1814]">5 sec</p>
            <p className="font-mono text-xs text-[#6b6560]">average solve time</p>
          </div>
          <div className="text-center">
            <p className="font-mono text-4xl text-[#1a1814]">100%</p>
            <p className="font-mono text-xs text-[#6b6560]">free to start</p>
          </div>
        </div>
      </section>

      {/* Interview Mode Showcase */}
      <section className="bg-[#f5f2eb] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-col items-center gap-10 md:flex-row md:gap-16">
            {/* Visual */}
            <div className="flex-shrink-0">
              <div className="relative w-full max-w-[220px] rounded-2xl border-2 border-[#1a1814] bg-[#1a1814] p-6 shadow-lg">
                <p className="font-mono text-[10px] text-[#a89f96] mb-1">interview mode</p>
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-5 w-5 text-[#faf8f3]" />
                  <span className="font-mono text-[32px] font-bold leading-none text-[#faf8f3]">18:42</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-[#faf8f3]/10 overflow-hidden">
                  <div className="h-full w-[62%] rounded-full bg-[#faf8f3]/60 transition-all" />
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-mono text-[11px] text-[#a89f96]">timer active</span>
                </div>
                {/* Decorative glow */}
                <div className="absolute -inset-1 -z-10 rounded-2xl bg-[#1a1814]/20 blur-lg" />
              </div>
            </div>
            {/* Text */}
            <div className="max-w-md text-center md:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#e8e2d9] bg-white px-3 py-1 mb-4">
                <Timer className="h-3.5 w-3.5 text-[#1a1814]" />
                <span className="font-mono text-[11px] text-[#6b6560]">Available on Basic & Pro</span>
              </div>
              <h2 className="font-mono text-2xl text-[#1a1814] md:text-[28px] leading-tight">
                Practice under real
                <br />
                <span className="font-bold">interview pressure</span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#6b6560]">
                Real interviews have time limits — so does Interview Mode. Get a timed challenge based on problem difficulty (Easy: 10 min, Medium: 20 min, Hard: 35 min) with a floating countdown timer. Build speed and confidence before the real thing.
              </p>
              <div className="mt-5 flex flex-wrap gap-3 justify-center md:justify-start">
                <div className="flex items-center gap-1.5 rounded-lg bg-white border border-[#e8e2d9] px-3 py-1.5">
                  <span className="font-mono text-xs text-[#1a1814] font-bold">10m</span>
                  <span className="font-mono text-[10px] text-[#a89f96]">Easy</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-lg bg-white border border-[#e8e2d9] px-3 py-1.5">
                  <span className="font-mono text-xs text-[#1a1814] font-bold">20m</span>
                  <span className="font-mono text-[10px] text-[#a89f96]">Medium</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-lg bg-white border border-[#e8e2d9] px-3 py-1.5">
                  <span className="font-mono text-xs text-[#1a1814] font-bold">35m</span>
                  <span className="font-mono text-[10px] text-[#a89f96]">Hard</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing — 3 plans */}
      <section id="pricing" className="bg-[#faf8f3] py-24">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-mono text-xs text-[#6b6560]">{"// pricing"}</p>
          <h2 className="mt-2 font-mono text-3xl text-[#1a1814] md:text-[32px]">Simple, honest pricing</h2>
          <p className="mt-2 text-base text-[#6b6560]">Start free. Upgrade when you&apos;re ready.</p>

          <div className="mt-12 flex flex-col items-center gap-5 sm:flex-row sm:flex-wrap sm:justify-center">

            {/* FREE */}
            <article className="w-full max-w-xs rounded-xl border border-[#e8e2d9] bg-white p-7">
              <Badge className="bg-[#f0ede6] font-mono text-[#6b6560] hover:bg-[#f0ede6]">Free</Badge>
              <div className="mt-5 flex items-end gap-2">
                <p className="font-mono text-[36px] leading-none text-[#1a1814]">₹0</p>
                <p className="pb-1 text-sm text-[#6b6560]">/forever</p>
              </div>
              <Separator className="my-5 bg-[#e8e2d9]" />
              <ul className="space-y-2.5">
                {[
                  "5 solves per day",
                  "Think First + hints",
                  "Pattern detection",
                  "Memory hooks",
                  "Quick check quiz",
                  "Streak tracking",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-[#6b6560]">
                    <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 text-[#1a1814]" />
                    {f}
                  </li>
                ))}
                {["Similar problems (full)", "Missing concepts", "Solve history"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-[#a89f96]">
                    <X className="h-3.5 w-3.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                variant="outline"
                onClick={() => router.push("/solve")}
                className="mt-6 w-full border-[#e8e2d9] bg-transparent font-mono text-sm text-[#6b6560] hover:border-[#1a1814] hover:text-[#1a1814]"
              >
                Start Free
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </article>

            {/* BASIC */}
            <article className="w-full max-w-xs rounded-xl border border-[#e8e2d9] bg-white p-7">
              <Badge className="bg-[#f0ede6] font-mono text-[#6b6560] hover:bg-[#f0ede6]">Basic</Badge>
              <div className="mt-5 flex items-end gap-2">
                <p className="font-mono text-[36px] leading-none text-[#1a1814]">₹149</p>
                <p className="pb-1 text-sm text-[#6b6560]">/month</p>
              </div>
              <p className="mt-1 font-mono text-xs text-[#a89f96]">~100 solves/month</p>
              <Separator className="my-5 bg-[#e8e2d9]" />
              <ul className="space-y-2.5">
                {[
                  "100 solves per month",
                  "Everything in Free",
                  "Similar problems (full)",
                  "Missing concepts",
                  "Solve history (30 days)",
                  "Interview recognition tips",
                  "Interview mode",
                  "Streak tracking",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-[#6b6560]">
                    <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 text-[#1a1814]" />
                    {f}
                  </li>
                ))}
                {["Unlimited solves"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-[#a89f96]">
                    <X className="h-3.5 w-3.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <PaymentButton
                plan="basic"
                className="mt-6 w-full border border-[#1a1814] bg-transparent font-mono text-sm text-[#1a1814] hover:bg-[#f0ede6]"
              >
                Get Basic
                <ChevronRight className="ml-1 h-4 w-4" />
              </PaymentButton>
            </article>

            {/* PRO */}
            <article className="relative w-full max-w-xs rounded-xl border-2 border-[#1a1814] bg-[#1a1814] p-7">
              <Badge className="absolute -top-3 right-4 bg-[#faf8f3] font-mono text-[11px] text-[#1a1814] hover:bg-[#faf8f3]">
                Most popular
              </Badge>
              <Badge
                variant="outline"
                className="border-[#faf8f3]/40 bg-transparent font-mono text-[#faf8f3] hover:bg-transparent"
              >
                Pro
              </Badge>
              <div className="mt-5 flex items-end gap-2">
                <p className="font-mono text-[36px] leading-none text-[#faf8f3]">₹299</p>
                <p className="pb-1 text-sm text-[#faf8f3]/70">/month</p>
              </div>
              <p className="mt-1 font-mono text-xs text-[#a89f96]">~$2.4 · less than a coffee</p>
              <Separator className="my-5 bg-[#faf8f3]/20" />
              <ul className="space-y-2.5">
                {[
                  "High usage limit",
                  "Everything in Basic",
                  "Full solve history",
                  "Pattern flashcards",
                  "Interview mode",
                  "Streak tracking",
                  "Priority support",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-[#a89f96]">
                    <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 text-[#faf8f3]" />
                    {f}
                  </li>
                ))}
              </ul>
              <PaymentButton
                plan="pro"
                className="mt-6 w-full bg-[#faf8f3] font-mono font-bold text-sm text-[#1a1814] hover:bg-[#f0ede6]"
              >
                Get Pro
                <ChevronRight className="ml-1 h-4 w-4" />
              </PaymentButton>
            </article>

          </div>

          <p className="mt-8 text-center font-mono text-xs text-[#a89f96]">
            Payments via Razorpay · Secure · Cancel anytime · Launching soon
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-[#f5f2eb] py-24">
        <div className="mx-auto max-w-3xl px-6">
          <p className="font-mono text-xs text-[#6b6560]">{"// faq"}</p>
          <h2 className="mt-2 font-mono text-3xl text-[#1a1814] md:text-[32px]">Common questions</h2>
          <p className="mt-2 text-base text-[#6b6560]">Things people usually ask before trying.</p>

          <div className="mt-12 space-y-3">
            {[
              {
                q: "How is this different from just using AI Platform?",
                a: "That gives you the answer. PatternFlow teaches you to think. We use a structured Socratic method — Think First prompts, progressive hints, quick-check quizzes — designed so you actually learn the pattern, not just copy-paste a solution.",
              },
              {
                q: "What patterns does PatternFlow detect?",
                a: "25+ core algorithm patterns including Sliding Window, Two Pointers, Binary Search, BFS/DFS, Dynamic Programming, Greedy, Backtracking, Union-Find, Topological Sort, Monotonic Stack, and more. The AI identifies the best-fit pattern for each problem.",
              },
              {
                q: "Do I need to sign up to use it?",
                a: "Yes. for testing you get 5 free solves per day after signup. Just paste a problem and go.",
              },
              {
                q: "What kind of problems can I paste?",
                a: "Anything — full LeetCode problem pages, GeeksforGeeks questions, raw problem text, even screenshots of a problem statement. We extract and understand the problem from whatever you give us.",
              },
              {
                q: "Is this useful for interview prep?",
                a: "Absolutely. The Interview Mode gives you timed practice under real conditions. Interview recognition tips teach you to spot patterns from problem descriptions — the exact skill interviewers test for.",
              },
              {
                q: "Can I cancel my subscription anytime?",
                a: "Yes, no lock-in. Your plan just won\u2019t renew next month. You keep access until the current billing period ends.",
              },
            ].map((item, i) => (
              <FaqItem key={i} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e8e2d9] bg-[#faf8f3]">
        <div className="mx-auto max-w-6xl px-6 py-12">

          <div className="grid grid-cols-1 gap-10 md:grid-cols-4">

            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="h-5 w-5 text-[#1a1814]" />
                <span className="font-mono text-lg font-bold text-[#1a1814]">PatternFlow</span>
              </div>
              <p className="text-sm text-[#6b6560] leading-relaxed max-w-xs">
                AI-powered DSA pattern trainer. Stop memorizing solutions — start building intuition that lasts.
              </p>
              <div className="flex items-center gap-3 mt-5">
                <a
                  href="https://twitter.com/Dev_code_04"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-[#e8e2d9] px-3 py-2 text-xs font-mono text-[#6b6560] hover:border-[#1a1814] hover:text-[#1a1814] transition-all"
                >
                  <X className="h-3.5 w-3.5" />
                  Twitter
                </a>
              </div>
            </div>

            {/* Product */}
            <div>
              <p className="font-mono text-xs text-[#a89f96] mb-4 uppercase tracking-wider">Product</p>
              <ul className="space-y-3">
                {[
                  { label: "Solve a problem", href: "/solve" },
                  { label: "How it works", href: "/#how-it-works" },
                  { label: "Pricing", href: "/#pricing" },
                  { label: "Dashboard", href: "/dashboard" },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[#6b6560] hover:text-[#1a1814] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <p className="font-mono text-xs text-[#a89f96] mb-4 uppercase tracking-wider">Legal</p>
              <ul className="space-y-3">
                {[
                  { label: "Privacy Policy", href: "/privacy" },
                  { label: "Terms of Service", href: "/terms" },
                  { label: "Refund Policy", href: "/refund" },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[#6b6560] hover:text-[#1a1814] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          <div className="mt-12 pt-6 border-t border-[#e8e2d9] flex flex-wrap items-center justify-between gap-4">
            <p className="font-mono text-xs text-[#a89f96]">
              © 2026 PatternFlow · Built for DSA Hustlers, by a developer.
            </p>
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-[#a89f96]">Payments secured by Razorpay</span>
              <span className="font-mono text-xs text-[#e8e2d9]">·</span>
              <span className="font-mono text-xs text-[#a89f96]">Made in India 🇮🇳</span>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full rounded-xl border border-[#e8e2d9] bg-white p-5 text-left transition-all hover:border-[#d4cdc4]"
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-mono text-sm font-medium text-[#1a1814]">{question}</h3>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 text-[#a89f96] transition-transform duration-200 ${open ? "rotate-180" : ""
            }`}
        />
      </div>
      <div
        className={`grid transition-all duration-200 ease-in-out ${open ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
      >
        <div className="overflow-hidden">
          <p className="text-sm leading-relaxed text-[#6b6560]">{answer}</p>
        </div>
      </div>
    </button>
  );
}
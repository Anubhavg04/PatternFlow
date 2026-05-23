"use client";

import { useState } from "react";
import Image from "next/image";
import iconPng from "@/app/icon.png";
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
    <div className="bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 pt-24 sm:px-6">
        <div className="relative z-10 mx-auto max-w-[680px] text-center">
          <Badge
            variant="outline"
            className="gap-1.5 border-border bg-muted px-3 py-1 font-mono text-[11px] text-muted-foreground"
          >
            <Sparkles size={12} className="text-foreground" />
            AI-Powered Pattern Recognition
          </Badge>
          <h1 className="mt-6 font-mono text-[32px] leading-[1.1] tracking-[-1px] text-foreground md:text-[52px]">
            Understand DSA.
            <br />
            <span className="font-black text-foreground">Not memorize it.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-[480px] text-[18px] text-muted-foreground">
            Paste any problem. Get pattern detection, memory hooks, and similar problems — instantly.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button
              onClick={() => router.push("/solve")}
              className="h-auto gap-2 bg-primary px-6 py-3 font-mono text-sm font-bold text-primary-foreground hover:bg-primary/90"
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
              className="h-auto border-border bg-transparent px-6 py-3 font-mono text-sm text-muted-foreground hover:border-primary hover:text-foreground"
            >
              See how it works
            </Button>
          </div>
          <p className="mt-4 font-mono text-xs text-muted-foreground/70">
            No signup needed · 5 free solves daily · No credit card
          </p>
        </div>
      </section>

      {/* Sticky Quotes */}
      <section id="quotes" className="bg-background py-24">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-3 text-center font-mono text-sm text-muted-foreground/70">{"// daily dose"}</p>
          <h2 className="mb-2 text-center text-3xl font-bold text-foreground">
            A little motivation goes a long way
          </h2>
          <p className="mb-16 text-center font-mono text-sm text-muted-foreground/70">
            quotes change every day · come back tomorrow
          </p>
          <StickyQuotes />
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-secondary py-24">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-mono text-xs text-muted-foreground">{"// the process"}</p>
          <h2 className="mt-2 font-mono text-3xl text-foreground md:text-[32px]">Three steps to clarity</h2>
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            <article className="rounded-lg border border-border bg-card p-6 transition hover:border-border/80">
              <p className="font-mono text-[32px] text-muted-foreground/70">01</p>
              <div className="mt-2 inline-flex rounded-md bg-muted p-2">
                <ClipboardPaste className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="mt-3 font-mono text-base text-foreground">Paste anything</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Full LeetCode page, GFG problem, random question — paste it raw. We extract what matters.
              </p>
            </article>
            <article className="rounded-lg border border-border bg-card p-6 transition hover:border-border/80">
              <p className="font-mono text-[32px] text-muted-foreground/70">02</p>
              <div className="mt-2 inline-flex rounded-md bg-muted p-2">
                <Brain className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="mt-3 font-mono text-base text-foreground">Think, don&apos;t memorize</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                AI guides you to think — hints, Socratic questions, pattern reveal only when you&apos;re ready.
              </p>
            </article>
            <article className="rounded-lg border border-border bg-card p-6 transition hover:border-border/80">
              <p className="font-mono text-[32px] text-muted-foreground/70">03</p>
              <div className="mt-2 inline-flex rounded-md bg-muted p-2">
                <Target className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="mt-3 font-mono text-base text-foreground">Remember it</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Memory hook, interview recognition tips, similar problems — everything to make it stick.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* What You Get — Feature Showcase */}
      <section className="bg-background py-24">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-mono text-xs text-muted-foreground">{"// what you get"}</p>
          <h2 className="mt-2 font-mono text-3xl text-foreground md:text-[32px]">Every solve gives you this</h2>
          <p className="mt-2 text-base text-muted-foreground">Not just an answer — a full learning breakdown.</p>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

            <div className="group relative overflow-hidden rounded-xl bg-border p-[1px] transition-all hover:shadow-md">
  <div className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#f59e0b_0%,#8b5cf6_33%,#3b82f6_66%,#f59e0b_100%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
  <div className="relative h-full w-full rounded-xl bg-card p-6">
              <div className="mb-4 inline-flex rounded-lg bg-primary p-2.5">
                <Brain className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="font-mono text-sm font-bold text-foreground">Think First Prompts</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Before any hints, you get a Socratic question designed to push you toward the right thinking direction.
              </p>
            </div>
              </div>

            <div className="group relative overflow-hidden rounded-xl bg-border p-[1px] transition-all hover:shadow-md">
  <div className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#f59e0b_0%,#8b5cf6_33%,#3b82f6_66%,#f59e0b_100%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
  <div className="relative h-full w-full rounded-xl bg-card p-6">
              <div className="mb-4 inline-flex rounded-lg bg-primary p-2.5">
                <Fingerprint className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="font-mono text-sm font-bold text-foreground">Pattern Detection</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                AI identifies the core algorithm pattern — Sliding Window, Two Pointers, BFS, DP, and 15+ more.
              </p>
            </div>
              </div>

            <div className="group relative overflow-hidden rounded-xl bg-border p-[1px] transition-all hover:shadow-md">
  <div className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#f59e0b_0%,#8b5cf6_33%,#3b82f6_66%,#f59e0b_100%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
  <div className="relative h-full w-full rounded-xl bg-card p-6">
              <div className="mb-4 inline-flex rounded-lg bg-primary p-2.5">
                <Lightbulb className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="font-mono text-sm font-bold text-foreground">Progressive Hints</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Three-level hint system. Reveal one at a time — only when you&apos;re truly stuck. No spoilers.
              </p>
            </div>
              </div>

            <div className="group relative overflow-hidden rounded-xl bg-border p-[1px] transition-all hover:shadow-md">
  <div className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#f59e0b_0%,#8b5cf6_33%,#3b82f6_66%,#f59e0b_100%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
  <div className="relative h-full w-full rounded-xl bg-card p-6">
              <div className="mb-4 inline-flex rounded-lg bg-primary p-2.5">
                <Target className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="font-mono text-sm font-bold text-foreground">Memory Hooks</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                A memorable one-liner that anchors the pattern in your brain. Recall it during interviews instantly.
              </p>
            </div>
              </div>

            <div className="group relative overflow-hidden rounded-xl bg-border p-[1px] transition-all hover:shadow-md">
  <div className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#f59e0b_0%,#8b5cf6_33%,#3b82f6_66%,#f59e0b_100%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
  <div className="relative h-full w-full rounded-xl bg-card p-6">
              <div className="mb-4 inline-flex rounded-lg bg-primary p-2.5">
                <Layers className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="font-mono text-sm font-bold text-foreground">Similar Problems</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Get 3 related problems to reinforce the pattern. Click-to-solve for paid users — instant practice.
              </p>
            </div>
              </div>

            <div className="group relative overflow-hidden rounded-xl bg-border p-[1px] transition-all hover:shadow-md">
  <div className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#f59e0b_0%,#8b5cf6_33%,#3b82f6_66%,#f59e0b_100%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
  <div className="relative h-full w-full rounded-xl bg-card p-6">
              <div className="mb-4 inline-flex rounded-lg bg-primary p-2.5">
                <HelpCircle className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="font-mono text-sm font-bold text-foreground">Quick Check Quiz</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Test your understanding before seeing the full approach. Explains your reasoning like an interviewer.
              </p>
            </div>
              </div>

          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-background py-8">
        <div className="mx-auto flex max-w-4xl flex-wrap justify-around gap-8 px-6">
          <div className="text-center">
            <p className="font-mono text-4xl text-foreground">25+</p>
            <p className="font-mono text-xs text-muted-foreground">algorithm patterns</p>
          </div>
          <div className="text-center">
            <p className="font-mono text-4xl text-foreground">5 sec</p>
            <p className="font-mono text-xs text-muted-foreground">average solve time</p>
          </div>
          <div className="text-center">
            <p className="font-mono text-4xl text-foreground">100%</p>
            <p className="font-mono text-xs text-muted-foreground">free to start</p>
          </div>
        </div>
      </section>

      {/* Interview Mode Showcase */}
      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-col items-center gap-10 md:flex-row md:gap-16">
            {/* Visual */}
            <div className="flex-shrink-0">
              <div className="relative w-full max-w-[220px] rounded-2xl border-2 border-primary bg-primary p-6 shadow-lg">
                <p className="font-mono text-[10px] text-muted-foreground/70 mb-1">interview mode</p>
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-5 w-5 text-primary-foreground" />
                  <span className="font-mono text-[32px] font-bold leading-none text-primary-foreground">18:42</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-background/10 overflow-hidden">
                  <div className="h-full w-[62%] rounded-full bg-background/60 transition-all" />
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-mono text-[11px] text-muted-foreground/70">timer active</span>
                </div>
                {/* Decorative glow */}
                <div className="absolute -inset-1 -z-10 rounded-2xl bg-primary/20 blur-lg" />
              </div>
            </div>
            {/* Text */}
            <div className="max-w-md text-center md:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 mb-4">
                <Timer className="h-3.5 w-3.5 text-foreground" />
                <span className="font-mono text-[11px] text-muted-foreground">Available on Basic & Pro</span>
              </div>
              <h2 className="font-mono text-2xl text-foreground md:text-[28px] leading-tight">
                Practice under real
                <br />
                <span className="font-bold">interview pressure</span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Real interviews have time limits — so does Interview Mode. Get a timed challenge based on problem difficulty (Easy: 10 min, Medium: 20 min, Hard: 35 min) with a floating countdown timer. Build speed and confidence before the real thing.
              </p>
              <div className="mt-5 flex flex-wrap gap-3 justify-center md:justify-start">
                <div className="flex items-center gap-1.5 rounded-lg bg-card border border-border px-3 py-1.5">
                  <span className="font-mono text-xs text-foreground font-bold">10m</span>
                  <span className="font-mono text-[10px] text-muted-foreground/70">Easy</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-lg bg-card border border-border px-3 py-1.5">
                  <span className="font-mono text-xs text-foreground font-bold">20m</span>
                  <span className="font-mono text-[10px] text-muted-foreground/70">Medium</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-lg bg-card border border-border px-3 py-1.5">
                  <span className="font-mono text-xs text-foreground font-bold">35m</span>
                  <span className="font-mono text-[10px] text-muted-foreground/70">Hard</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing — 3 plans */}
      <section id="pricing" className="bg-background py-24">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-mono text-xs text-muted-foreground">{"// pricing"}</p>
          <h2 className="mt-2 font-mono text-3xl text-foreground md:text-[32px]">Simple, honest pricing</h2>
          <p className="mt-2 text-base text-muted-foreground">Start free. Upgrade when you&apos;re ready.</p>

          <div className="mt-12 flex flex-col items-center gap-5 sm:flex-row sm:flex-wrap sm:justify-center">

            {/* FREE */}
            <article className="w-full max-w-xs rounded-xl border border-border bg-card p-7">
              <Badge className="bg-muted font-mono text-muted-foreground hover:bg-muted">Free</Badge>
              <div className="mt-5 flex items-end gap-2">
                <p className="font-mono text-[36px] leading-none text-foreground">₹0</p>
                <p className="pb-1 text-sm text-muted-foreground">/forever</p>
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
                  <li key={f} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 text-foreground" />
                    {f}
                  </li>
                ))}
                {["Similar problems (full)", "Missing concepts", "Solve history"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-muted-foreground/70">
                    <X className="h-3.5 w-3.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                variant="outline"
                onClick={() => router.push("/solve")}
                className="mt-6 w-full border-border bg-transparent font-mono text-sm text-muted-foreground hover:border-primary hover:text-foreground"
              >
                Start Free
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </article>

            {/* BASIC */}
            <article className="w-full max-w-xs rounded-xl border border-border bg-card p-7">
              <Badge className="bg-muted font-mono text-muted-foreground hover:bg-muted">Basic</Badge>
              <div className="mt-5 flex items-end gap-2">
                <p className="font-mono text-[36px] leading-none text-foreground">₹149</p>
                <p className="pb-1 text-sm text-muted-foreground">/month</p>
              </div>
              <p className="mt-1 font-mono text-xs text-muted-foreground/70">~100 solves/month</p>
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
                  <li key={f} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 text-foreground" />
                    {f}
                  </li>
                ))}
                {["Unlimited solves"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-muted-foreground/70">
                    <X className="h-3.5 w-3.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <PaymentButton
                plan="basic"
                className="mt-6 w-full border border-primary bg-transparent font-mono text-sm text-foreground hover:bg-muted"
              >
                Get Basic
                <ChevronRight className="ml-1 h-4 w-4" />
              </PaymentButton>
            </article>

            {/* PRO */}
            <article className="relative w-full max-w-xs rounded-xl border-2 border-primary bg-primary p-7">
              <Badge className="absolute -top-3 right-4 bg-background font-mono text-[11px] text-foreground hover:bg-background">
                Most popular
              </Badge>
              <Badge
                variant="outline"
                className="border-[#faf8f3]/40 bg-transparent font-mono text-primary-foreground hover:bg-transparent"
              >
                Pro
              </Badge>
              <div className="mt-5 flex items-end gap-2">
                <p className="font-mono text-[36px] leading-none text-primary-foreground">₹299</p>
                <p className="pb-1 text-sm text-primary-foreground/70">/month</p>
              </div>
              <p className="mt-1 font-mono text-xs text-muted-foreground/70">~$2.4 · less than a coffee</p>
              <Separator className="my-5 bg-background/20" />
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
                  <li key={f} className="flex items-center gap-2.5 text-sm text-muted-foreground/70">
                    <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 text-primary-foreground" />
                    {f}
                  </li>
                ))}
              </ul>
              <PaymentButton
                plan="pro"
                className="mt-6 w-full bg-background font-mono font-bold text-sm text-foreground hover:bg-muted"
              >
                Get Pro
                <ChevronRight className="ml-1 h-4 w-4" />
              </PaymentButton>
            </article>

          </div>

          <p className="mt-8 text-center font-mono text-xs text-muted-foreground/70">
            Payments via Razorpay · Secure · Cancel anytime · Launching soon
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-secondary py-24">
        <div className="mx-auto max-w-3xl px-6">
          <p className="font-mono text-xs text-muted-foreground">{"// faq"}</p>
          <h2 className="mt-2 font-mono text-3xl text-foreground md:text-[32px]">Common questions</h2>
          <p className="mt-2 text-base text-muted-foreground">Things people usually ask before trying.</p>

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
      <footer className="border-t border-border bg-background">
        <div className="mx-auto max-w-6xl px-6 py-12">

          <div className="grid grid-cols-1 gap-10 md:grid-cols-4">

            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Image src={iconPng} alt="PatternFlow Icon" width={24} height={24} className="rounded-sm object-contain" />
                <span className="font-mono text-lg font-bold text-foreground">PatternFlow</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                AI-powered DSA pattern trainer. Stop memorizing solutions — start building intuition that lasts.
              </p>
              <div className="flex items-center gap-3 mt-5">
                <a
                  href="https://twitter.com/Dev_code_04"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-mono text-muted-foreground hover:border-primary hover:text-foreground transition-all"
                >
                  <X className="h-3.5 w-3.5" />
                  Twitter
                </a>
              </div>
            </div>

            {/* Product */}
            <div>
              <p className="font-mono text-xs text-muted-foreground/70 mb-4 uppercase tracking-wider">Product</p>
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
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <p className="font-mono text-xs text-muted-foreground/70 mb-4 uppercase tracking-wider">Legal</p>
              <ul className="space-y-3">
                {[
                  { label: "Privacy Policy", href: "/privacy" },
                  { label: "Terms of Service", href: "/terms" },
                  { label: "Refund Policy", href: "/refund" },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          <div className="mt-12 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
            <p className="font-mono text-xs text-muted-foreground/70">
              © 2026 PatternFlow · Built for DSA Hustlers, by a developer.
            </p>
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-muted-foreground/70">Payments secured by Razorpay</span>
              <span className="font-mono text-xs text-[#e8e2d9]">·</span>
              <span className="font-mono text-xs text-muted-foreground/70">Made in India 🇮🇳</span>
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
      className="w-full rounded-xl border border-border bg-card p-5 text-left transition-all hover:border-border/80"
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-mono text-sm font-medium text-foreground">{question}</h3>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 text-muted-foreground/70 transition-transform duration-200 ${open ? "rotate-180" : ""
            }`}
        />
      </div>
      <div
        className={`grid transition-all duration-200 ease-in-out ${open ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
      >
        <div className="overflow-hidden">
          <p className="text-sm leading-relaxed text-muted-foreground">{answer}</p>
        </div>
      </div>
    </button>
  );
}
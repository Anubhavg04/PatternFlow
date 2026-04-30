import { Navbar } from "@/components/Navbar"
import { Code2 } from "lucide-react"
import Link from "next/link"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#faf8f3]">
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-24">
        <p className="font-mono text-sm text-[#a89f96] mb-2">// legal</p>
        <h1 className="text-3xl font-bold text-[#1a1814] mb-2">Privacy Policy</h1>
        <p className="font-mono text-xs text-[#a89f96] mb-12">Last updated: April 23, 2025</p>

        <div className="space-y-10 text-[#6b6560] text-sm leading-relaxed">

          <section>
            <h2 className="text-base font-semibold text-[#1a1814] mb-3">1. Information we collect</h2>
            <p>When you use PatternFlow, we collect the following information:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>Email address and name (when you sign up via Clerk authentication)</li>
              <li>DSA problems you submit for analysis</li>
              <li>Your solve history and usage patterns</li>
              <li>Payment information (processed securely by Razorpay — we never store card details)</li>
              <li>Basic usage analytics (page views, feature usage)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#1a1814] mb-3">2. How we use your information</h2>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>To provide and improve the PatternFlow service</li>
              <li>To save your solve history and track your progress</li>
              <li>To process payments and manage your subscription</li>
              <li>To send important service updates (no spam)</li>
              <li>To analyze usage patterns and improve AI responses</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#1a1814] mb-3">3. Data storage</h2>
            <p>Your data is stored securely using Supabase (PostgreSQL database hosted on AWS). Authentication is handled by Clerk. We use industry-standard encryption for all data in transit and at rest.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#1a1814] mb-3">4. Third-party services</h2>
            <p>We use the following third-party services:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li><strong className="text-[#1a1814]">Clerk</strong> — Authentication and user management</li>
              <li><strong className="text-[#1a1814]">Supabase</strong> — Database storage</li>
              <li><strong className="text-[#1a1814]">Razorpay</strong> — Payment processing</li>
              <li><strong className="text-[#1a1814]">OpenRouter / Google Gemini</strong> — AI analysis</li>
              <li><strong className="text-[#1a1814]">Vercel</strong> — Hosting</li>
            </ul>
            <p className="mt-3">Each of these services has their own privacy policy. We encourage you to review them.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#1a1814] mb-3">5. Data retention</h2>
            <p>Free users: Solve history is not stored permanently. Paid users: Solve history is retained for 30 days (Basic) or indefinitely (Pro). You can request deletion of your data at any time by contacting us.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#1a1814] mb-3">6. Your rights</h2>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your account and data</li>
              <li>Export your solve history</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#1a1814] mb-3">7. Contact</h2>
            <p>For any privacy-related questions, contact us at:</p>
            
              href="https://twitter.com/Dev_code_04"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block font-mono text-[#1a1814] underline hover:opacity-70"
            <a>
              @Dev_code_04 on Twitter
            </a>
          </section>

        </div>
      </main>

      <footer className="border-t border-[#e8e2d9] bg-[#f5f2eb] py-6">
        <div className="mx-auto max-w-3xl px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-[#a89f96]" />
            <span className="font-mono text-sm text-[#a89f96]">PatternFlow</span>
          </div>
          <div className="flex gap-4 font-mono text-xs text-[#a89f96]">
            <Link href="/privacy" className="hover:text-[#1a1814]">Privacy</Link>
            <Link href="/terms" className="hover:text-[#1a1814]">Terms</Link>
            <Link href="/refund" className="hover:text-[#1a1814]">Refund</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
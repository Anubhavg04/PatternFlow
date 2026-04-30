import { Navbar } from "@/components/Navbar"
import { Code2 } from "lucide-react"
import Link from "next/link"

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#faf8f3]">
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-24">
        <p className="font-mono text-sm text-[#a89f96] mb-2">// legal</p>
        <h1 className="text-3xl font-bold text-[#1a1814] mb-2">Terms of Service</h1>
        <p className="font-mono text-xs text-[#a89f96] mb-12">Last updated: April 23, 2025</p>

        <div className="space-y-10 text-[#6b6560] text-sm leading-relaxed">

          <section>
            <h2 className="text-base font-semibold text-[#1a1814] mb-3">1. Acceptance of terms</h2>
            <p>By using PatternFlow, you agree to these Terms of Service. If you do not agree, please do not use the service. We reserve the right to update these terms at any time with notice.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#1a1814] mb-3">2. Description of service</h2>
            <p>PatternFlow is an AI-powered DSA (Data Structures and Algorithms) learning tool that helps users understand algorithmic patterns through guided hints, visualizations, and memory techniques. It is designed for educational purposes only.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#1a1814] mb-3">3. User accounts</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>You must provide accurate information when creating an account</li>
              <li>You are responsible for maintaining the security of your account</li>
              <li>You must be at least 13 years old to use this service</li>
              <li>One account per person — multiple accounts are not permitted</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#1a1814] mb-3">4. Acceptable use</h2>
            <p>You agree not to:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>Use the service for any unlawful purpose</li>
              <li>Attempt to reverse engineer or scrape the AI responses</li>
              <li>Share your account credentials with others</li>
              <li>Use automated tools to abuse the free tier limits</li>
              <li>Resell or redistribute the service without permission</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#1a1814] mb-3">5. Subscriptions and payments</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>Paid plans are billed monthly</li>
              <li>Payments are processed by Razorpay — secure and encrypted</li>
              <li>Subscriptions auto-renew unless cancelled</li>
              <li>You can cancel anytime from your account settings</li>
              <li>See our Refund Policy for refund details</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#1a1814] mb-3">6. AI-generated content</h2>
            <p>PatternFlow uses AI to generate educational content. While we strive for accuracy, AI responses may occasionally contain errors. Always verify important information. We are not responsible for decisions made based on AI-generated content.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#1a1814] mb-3">7. Intellectual property</h2>
            <p>The PatternFlow platform, design, and code are owned by the creator. User-submitted problems remain the property of their respective owners (LeetCode, GFG, etc.). AI-generated explanations are provided for personal educational use only.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#1a1814] mb-3">8. Limitation of liability</h2>
            <p>PatternFlow is provided "as is" without warranty of any kind. We are not liable for any damages arising from use of the service, including but not limited to lost profits, data loss, or service interruptions.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#1a1814] mb-3">9. Termination</h2>
            <p>We reserve the right to suspend or terminate accounts that violate these terms. You may delete your account at any time. Upon termination, your data will be deleted within 30 days.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#1a1814] mb-3">10. Contact</h2>
            
              href="https://twitter.com/Dev_code_04"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[#1a1814] underline hover:opacity-70"
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
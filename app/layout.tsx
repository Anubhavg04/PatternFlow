import type { Metadata } from "next";
import { Space_Mono, Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { PHProvider, PostHogAuth } from "@/components/providers/PostHogProvider";
import NextTopLoader from 'nextjs-toploader';
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "PatternFlow",
  description:
    "Paste any DSA problem. Get instant pattern detection, visualization, memory hooks, and similar problems. Built for interview prep.",
  keywords: "DSA, LeetCode, algorithm, pattern recognition, interview prep, visualization",
  openGraph: {
    title: "PatternFlow",
    description: "AI-powered pattern recognition for DSA problems. Free to use.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PatternFlow",
    description: "Paste any DSA problem. Get pattern + visualization + memory hook instantly.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";
  const clerkEnabled = clerkKey.startsWith("pk_") && !clerkKey.includes("placeholder");

  return (
    <html lang="en" className={`${inter.variable} ${spaceMono.variable}`}>
      <body className={inter.className}>
        <NextTopLoader 
          color="#1a1814"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #1a1814,0 0 5px #1a1814"
        />
        <PHProvider>
          {clerkEnabled ? (
            <ClerkProvider>
              <PostHogAuth />
              {children}
            </ClerkProvider>
          ) : (
            children
          )}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                fontFamily: "var(--font-mono)",
                fontSize: "13px",
                border: "1px solid #e8e2d9",
                background: "#faf8f3",
                color: "#1a1814",
              },
            }}
          />
        </PHProvider>
        <Analytics />
      </body>
    </html>
  );
}


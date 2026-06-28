import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mystic Tarot — AI-Powered Tarot Readings",
  description: "Discover your destiny with AI-powered tarot readings. Get personalized insights through the ancient wisdom of the cards.",
  keywords: ["tarot", "tarot reading", "AI tarot", "online tarot", "free tarot reading"],
  openGraph: {
    title: "Mystic Tarot — AI-Powered Tarot Readings",
    description: "Discover your destiny with AI-powered tarot readings.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="min-h-screen flex flex-col">
          <header className="border-b border-mystic-800/50 bg-black/20 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
              <a href="/" className="flex items-center gap-2">
                <span className="text-2xl">✦</span>
                <span className="text-xl font-semibold bg-gradient-to-r from-mystic-300 to-gold-400 bg-clip-text text-transparent">
                  Mystic Tarot
                </span>
              </a>
              <nav className="flex items-center gap-6 text-sm text-mystic-200">
                <a href="/" className="hover:text-mystic-300 transition-colors">Readings</a>
                <a href="/card/the-fool" className="hover:text-mystic-300 transition-colors">Card Meanings</a>
              </nav>
            </div>
          </header>
          <main className="flex-1">
            {children}
          </main>
          <footer className="border-t border-mystic-800/30 bg-black/20 py-8">
            <div className="max-w-6xl mx-auto px-4 text-center text-sm text-mystic-400">
              <p>Mystic Tarot &mdash; For entertainment purposes only.</p>
              <p className="mt-1">AI-powered readings to inspire reflection and self-discovery.</p>
              <div className="flex items-center justify-center gap-4 mt-4 text-xs">
                <a href="/privacy" className="text-mystic-500 hover:text-mystic-300 transition-colors">Privacy Policy</a>
                <span className="text-mystic-700">&middot;</span>
                <a href="/terms" className="text-mystic-500 hover:text-mystic-300 transition-colors">Terms of Service</a>
                <span className="text-mystic-700">&middot;</span>
                <a href="mailto:support@mystictarot.app" className="text-mystic-500 hover:text-mystic-300 transition-colors">support@mystictarot.app</a>
              </div>
            </div>
          </footer>
        </div>
        <Analytics />
      </body>
    </html>
  );
}

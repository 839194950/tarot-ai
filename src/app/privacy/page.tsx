import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Mystic Tarot",
  description: "Privacy Policy for Mystic Tarot. Learn how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 animate-fadeIn">
      <h1 className="text-3xl font-bold text-mystic-100 mb-8">Privacy Policy</h1>
      <div className="prose prose-invert max-w-none space-y-6 text-mystic-200">
        <p className="text-sm text-mystic-500">Last updated: June 22, 2026</p>

        <section>
          <h2 className="text-xl font-semibold text-mystic-100 mt-8 mb-3">1. Introduction</h2>
          <p>Mystic Tarot (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our tarot reading services.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-mystic-100 mt-8 mb-3">2. Information We Collect</h2>
          <p><strong>Personal Data:</strong> When you make a purchase, we may collect your name, email address, and payment information. Payment processing is handled securely by Creem (our Merchant of Record) &mdash; we never store your full payment details.</p>
          <p><strong>Reading Data:</strong> The questions you submit and the cards drawn are processed to generate your reading but are not permanently stored.</p>
          <p><strong>Usage Data:</strong> We collect anonymous analytics (page views, visit duration) via Vercel Analytics to improve our service.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-mystic-100 mt-8 mb-3">3. How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide and maintain our tarot reading service</li>
            <li>To process payments and deliver purchased readings</li>
            <li>To improve our website and user experience</li>
            <li>To communicate with you about your purchases</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-mystic-100 mt-8 mb-3">4. Third-Party Services</h2>
          <p>We use the following third-party services:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Creem</strong> &mdash; Payment processing and merchant of record</li>
            <li><strong>DeepSeek</strong> &mdash; AI-powered reading generation</li>
            <li><strong>Vercel</strong> &mdash; Website hosting and analytics</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-mystic-100 mt-8 mb-3">5. Data Security</h2>
          <p>We implement reasonable security measures to protect your information. However, no method of transmission over the Internet is 100% secure.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-mystic-100 mt-8 mb-3">6. Contact Us</h2>
          <p>If you have questions about this Privacy Policy, please contact us at <a href="mailto:a839194950@outlook.com" className="text-mystic-400 hover:text-mystic-300">a839194950@outlook.com</a>.</p>
        </section>
      </div>
    </div>
  );
}

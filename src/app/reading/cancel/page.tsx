import Link from "next/link";

export default function ReadingCancelPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center animate-fadeIn">
      <div className="text-5xl mb-6">😔</div>
      <h1 className="text-2xl font-bold text-mystic-100 mb-2">Payment Cancelled</h1>
      <p className="text-mystic-400 mb-8">No worries. The cards will be here when you&apos;re ready.</p>
      <div className="flex items-center justify-center gap-4">
        <Link
          href="/"
          className="px-8 py-4 bg-mystic-700 rounded-xl text-mystic-100 hover:bg-mystic-600 transition-colors"
        >
          ← Back to Home
        </Link>
        <Link
          href="/"
          className="px-8 py-4 bg-gradient-to-r from-mystic-600 to-mystic-500 rounded-xl text-white font-semibold hover:from-mystic-500 hover:to-mystic-400 transition-all"
        >
          ✦ Free Reading
        </Link>
      </div>
    </div>
  );
}

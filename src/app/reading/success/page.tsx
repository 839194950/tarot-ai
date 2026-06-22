"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import TarotCard from "@/components/TarotCard";
import { TarotCard as CardType, getRandomCards, spreads, SpreadType } from "@/lib/cards";

function VerifyPayment() {
  const searchParams = useSearchParams();
  const [checkoutId, setCheckoutId] = useState<string | null>(null);
  const [status, setStatus] = useState<"verifying" | "paid" | "failed">("verifying");
  const [step, setStep] = useState<"verifying" | "reading" | "done">("verifying");
  const [cards, setCards] = useState<CardType[]>([]);
  const [reading, setReading] = useState("");
  const [error, setError] = useState("");
  const [pendingInfo, setPendingInfo] = useState<{ spreadType: SpreadType; question: string } | null>(null);

  // Read checkout_id from URL (fallback to sessionStorage)
  useEffect(() => {
    const ids = searchParams.getAll("checkout_id");
    let id = ids.find(v => v !== "{checkout_id}") || null;
    let info: any = null;
    if (!id) {
      try {
        const saved = sessionStorage.getItem("pending_checkout");
        if (saved) info = JSON.parse(saved);
        id = info?.id || null;
      } catch {}
    }
    setCheckoutId(id);

    // Read pending info
    if (!info) {
      try {
        const saved = sessionStorage.getItem("pending_checkout");
        if (saved) info = JSON.parse(saved);
      } catch {}
    }
    if (info) {
      setPendingInfo({ spreadType: info.spreadType, question: info.question || "" });
      sessionStorage.removeItem("pending_checkout");
    }
  }, [searchParams]);

  // Verify payment
  useEffect(() => {
    if (!checkoutId) {
      setStatus("failed");
      return;
    }

    let attempts = 0;
    const maxAttempts = 6;

    async function verify() {
      try {
        const res = await fetch(`/api/verify-payment?checkout_id=${checkoutId}`);
        const data = await res.json();
        if (data.status === "paid") {
          setStatus("paid");
          return;
        }
        if (data.status === "pending" && attempts < maxAttempts) {
          attempts++;
          setTimeout(verify, 2000);
          return;
        }
        setStatus("failed");
      } catch {
        setStatus("failed");
      }
    }

    const timer = setTimeout(verify, 1500);
    return () => clearTimeout(timer);
  }, [checkoutId]);

  // After paid, do reading
  useEffect(() => {
    if (status !== "paid" || !pendingInfo) return;

    setStep("reading");
    const spread = spreads[pendingInfo.spreadType];
    const drawn = getRandomCards(spread.cardCount);
    setCards(drawn);

    fetch("/api/reading", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cardIds: drawn.map(c => c.id),
        spreadType: pendingInfo.spreadType,
        question: pendingInfo.question,
      }),
    })
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => {
        setReading(data.reading);
        setStep("done");
      })
      .catch(() => {
        setError("The cards are not clear right now. Please try again.");
        setStep("done");
      });
  }, [status, pendingInfo]);

  const spread = pendingInfo ? spreads[pendingInfo.spreadType] : null;

  return (
    <>
      {step === "verifying" && status === "verifying" && (
        <>
          <div className="text-5xl mb-6 animate-float">🔮</div>
          <h1 className="text-2xl font-bold text-mystic-100 mb-2">Verifying Your Payment...</h1>
          <p className="text-mystic-400">Please hold while we confirm your reading.</p>
        </>
      )}

      {status === "paid" && step === "reading" && (
        <>
          <div className="text-5xl mb-6 animate-float">✨</div>
          <h1 className="text-2xl font-bold text-mystic-100 mb-2">Consulting the Cards...</h1>
          <p className="text-mystic-400 mb-8">Your payment is confirmed. Drawing your cards now.</p>
          {cards.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {cards.map((card, i) => (
                <TarotCard
                  key={card.id}
                  card={card}
                  position={spread?.positions[i]}
                  index={i}
                />
              ))}
            </div>
          )}
        </>
      )}

      {step === "done" && reading && (
        <div className="max-w-2xl mx-auto animate-fadeIn">
          <div className="text-5xl mb-4">✨</div>
          <h1 className="text-2xl font-bold text-mystic-100 mb-6 text-center">Your Reading</h1>

          {cards.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {cards.map((card, i) => (
                <TarotCard
                  key={card.id}
                  card={card}
                  position={spread?.positions[i]}
                  index={i}
                />
              ))}
            </div>
          )}

          <div className="bg-mystic-950/50 border border-mystic-800/50 rounded-2xl p-6 sm:p-8">
            {pendingInfo?.question && (
              <div className="mb-6 pb-4 border-b border-mystic-800/50">
                <p className="text-sm text-mystic-500 uppercase tracking-wider mb-1">Your Question</p>
                <p className="text-mystic-200 italic">&ldquo;{pendingInfo.question}&rdquo;</p>
              </div>
            )}
            <div className="prose prose-invert max-w-none">
              {reading.split("\n\n").map((p, i) => (
                <p key={i} className="text-mystic-200 leading-relaxed mb-4">{p}</p>
              ))}
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/"
              className="inline-block px-8 py-4 bg-gradient-to-r from-mystic-600 to-mystic-500 rounded-xl text-white font-semibold hover:from-mystic-500 hover:to-mystic-400 transition-all"
            >
              ✦ New Reading
            </Link>
          </div>
        </div>
      )}

      {(step === "done" && error) && (
        <>
          <div className="text-5xl mb-6">😔</div>
          <h1 className="text-2xl font-bold text-mystic-100 mb-2">Reading Failed</h1>
          <p className="text-mystic-400 mb-8">{error}</p>
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-mystic-700 rounded-xl text-mystic-100 hover:bg-mystic-600 transition-colors"
          >
            ← Try Again
          </Link>
        </>
      )}

      {status === "failed" && (
        <>
          <div className="text-5xl mb-6">😔</div>
          <h1 className="text-2xl font-bold text-mystic-100 mb-2">Payment Not Confirmed</h1>
          <p className="text-mystic-400 mb-8">We couldn&apos;t verify your payment. If you were charged, please contact support.</p>
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-mystic-700 rounded-xl text-mystic-100 hover:bg-mystic-600 transition-colors"
          >
            ← Try Again
          </Link>
        </>
      )}
    </>
  );
}

export default function ReadingSuccessPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 animate-fadeIn">
      <Suspense fallback={
        <>
          <div className="text-5xl mb-6 animate-float">🔮</div>
          <h1 className="text-2xl font-bold text-mystic-100 mb-2">Verifying...</h1>
        </>
      }>
        <VerifyPayment />
      </Suspense>
    </div>
  );
}

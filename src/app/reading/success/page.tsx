"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function VerifyPayment() {
  const searchParams = useSearchParams();
  const [checkoutId, setCheckoutId] = useState<string | null>(null);
  const [status, setStatus] = useState<"verifying" | "paid" | "failed">("verifying");

  useEffect(() => {
    const ids = searchParams.getAll("checkout_id");
    let id = ids.find(v => v !== "{checkout_id}") || null;
    if (!id) {
      try {
        const saved = sessionStorage.getItem("pending_checkout");
        if (saved) id = JSON.parse(saved).id;
      } catch {}
    }
    setCheckoutId(id);
  }, [searchParams]);

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

  return (
    <>
      {status === "verifying" && (
        <>
          <div className="text-5xl mb-6 animate-float">🔮</div>
          <h1 className="text-2xl font-bold text-mystic-100 mb-2">Verifying Your Payment...</h1>
          <p className="text-mystic-400">Please hold while we confirm your reading.</p>
          {checkoutId && (
            <p className="text-xs text-mystic-600 mt-4">ID: {checkoutId}</p>
          )}
        </>
      )}

      {status === "paid" && (
        <>
          <div className="text-5xl mb-6">✨</div>
          <h1 className="text-2xl font-bold text-mystic-100 mb-2">Payment Confirmed!</h1>
          <p className="text-mystic-400 mb-8">Your reading is ready. The cards await.</p>
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-gradient-to-r from-mystic-600 to-mystic-500 rounded-xl text-white font-semibold hover:from-mystic-500 hover:to-mystic-400 transition-all"
          >
            ✦ Begin Your Reading
          </Link>
        </>
      )}

      {status === "failed" && (
        <>
          <div className="text-5xl mb-6">😔</div>
          <h1 className="text-2xl font-bold text-mystic-100 mb-2">Payment Not Confirmed</h1>
          <p className="text-mystic-400 mb-2">We couldn&apos;t verify your payment. If you were charged, please contact support.</p>
          {checkoutId && (
            <p className="text-xs text-mystic-600 mb-8">Debug ID: {checkoutId}</p>
          )}
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
    <div className="max-w-lg mx-auto px-4 py-20 text-center animate-fadeIn">
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

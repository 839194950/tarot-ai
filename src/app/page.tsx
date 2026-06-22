"use client";

import { useState, useEffect } from "react";
import TarotCard from "@/components/TarotCard";
import { TarotCard as TarotCardType, getRandomCards, spreads, SpreadType } from "@/lib/cards";

type Step = "home" | "question" | "drawing" | "result" | "paying";

export default function Home() {
  const [step, setStep] = useState<Step>("home");
  const [selectedSpread, setSelectedSpread] = useState<SpreadType>("one-card");
  const [cards, setCards] = useState<TarotCardType[]>([]);
  const [reading, setReading] = useState<string>("");
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const spread = spreads[selectedSpread];

  // Handle return from paid checkout
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("pending_checkout");
      if (saved) {
        const data = JSON.parse(saved);
        sessionStorage.removeItem("pending_checkout");
        setSelectedSpread(data.spreadType);
        setQuestion(data.question || "");
        doReading(data.spreadType, data.question || "");
      }
    } catch {}
  }, []);

  function handleStartFreeReading() {
    setSelectedSpread("one-card");
    setQuestion("");
    setError("");
    setStep("drawing");
    doReading("one-card", "");
  }

  function handleSelectPaidSpread(type: SpreadType) {
    setSelectedSpread(type);
    setStep("question");
  }

  async function doReading(type: SpreadType, q: string) {
    setLoading(true);
    setError("");
    setReading("");

    const drawn = getRandomCards(spreads[type].cardCount);
    setCards(drawn);

    try {
      const res = await fetch("/api/reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cardIds: drawn.map((c) => c.id),
          spreadType: type,
          question: q,
        }),
      });

      if (!res.ok) throw new Error("Reading failed");

      const data = await res.json();
      setReading(data.reading);
      setStep("result");
    } catch (e) {
      setError("The cards are not clear right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handlePaidReading() {
    if (!question.trim()) {
      setError("Please ask a question to focus the reading.");
      return;
    }
    setStep("paying");
    setLoading(true);

    try {
      const res = await fetch("/api/creem-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ spreadType: selectedSpread }),
      });

      if (!res.ok) throw new Error("Checkout failed");
      const data = await res.json();
      sessionStorage.setItem("pending_checkout", JSON.stringify({
        id: data.checkout_id,
        spreadType: selectedSpread,
        question,
      }));
      window.location.href = data.checkout_url;
    } catch (e) {
      setError("Payment setup failed. Please try again.");
      setLoading(false);
      setStep("question");
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {step === "home" && (
        <div className="space-y-16 animate-fadeIn">
          {/* Hero */}
          <section className="text-center py-12">
            <div className="inline-block mb-4">
              <span className="text-5xl animate-float inline-block">🔮</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-mystic-300 via-mystic-400 to-gold-400 bg-clip-text text-transparent">
                Discover Your Destiny
              </span>
            </h1>
            <p className="text-lg text-mystic-300 max-w-2xl mx-auto">
              Ancient tarot wisdom meets modern AI. Get personalized, insightful readings that illuminate your path forward.
            </p>
          </section>

          {/* Free Reading */}
          <section className="text-center">
            <h2 className="text-2xl font-semibold text-mystic-200 mb-2">✨ Daily Free Reading</h2>
            <p className="text-mystic-400 mb-6">Pull a single card for daily guidance. Free, no sign-up required.</p>
            <button
              onClick={handleStartFreeReading}
              className="px-8 py-4 bg-gradient-to-r from-mystic-600 to-mystic-500 rounded-xl text-white font-semibold text-lg hover:from-mystic-500 hover:to-mystic-400 transition-all duration-300 animate-glow"
            >
              ✦ Draw Your Free Card
            </button>
          </section>

          {/* Paid Spreads */}
          <section className="pb-16">
            <h2 className="text-2xl font-semibold text-mystic-200 text-center mb-8">🌙 Deep Readings</h2>
            <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <ReadingOption
                spread="three-card"
                onSelect={() => handleSelectPaidSpread("three-card")}
              />
              <ReadingOption
                spread="celtic-cross"
                onSelect={() => handleSelectPaidSpread("celtic-cross")}
              />
            </div>
          </section>
        </div>
      )}

      {step === "question" && (
        <div className="max-w-lg mx-auto py-12 animate-fadeIn">
          <button onClick={() => setStep("home")} className="text-mystic-400 hover:text-mystic-300 mb-6 text-sm">
            ← Back
          </button>
          <h2 className="text-2xl font-semibold text-mystic-200 mb-2">{spread.name}</h2>
          <p className="text-mystic-400 mb-6">{spread.description}</p>
          <p className="text-sm text-mystic-300 mb-2">Price: ${(spread.price / 100).toFixed(2)}</p>

          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="What question weighs on your heart? (e.g., 'What do I need to know about my career right now?')"
            className="w-full bg-mystic-950/50 border border-mystic-700 rounded-xl p-4 text-mystic-100 placeholder-mystic-600 focus:outline-none focus:border-mystic-500 min-h-[120px] resize-none"
          />

          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

          <button
            onClick={handlePaidReading}
            disabled={loading}
            className="w-full mt-4 px-8 py-4 bg-gradient-to-r from-gold-600 to-gold-500 rounded-xl text-black font-semibold text-lg hover:from-gold-500 hover:to-gold-400 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Preparing..." : `✨ Get Reading — $${(spread.price / 100).toFixed(2)}`}
          </button>
        </div>
      )}

      {(step === "drawing" || step === "result") && (
        <div className="py-12 animate-fadeIn">
          <button onClick={() => setStep("home")} className="text-mystic-400 hover:text-mystic-300 mb-6 text-sm">
            ← New Reading
          </button>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-mystic-200 mb-2">
              {step === "drawing" ? "Drawing Cards..." : spread.name}
            </h2>
            <p className="text-mystic-400">{spread.description}</p>
          </div>

          {/* Cards Display */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8">
            {cards.map((card, i) => (
              <TarotCard
                key={card.id}
                card={card}
                position={spread.positions[i]}
                index={i}
              />
            ))}
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center py-8">
              <div className="text-4xl mb-4 animate-float">🔮</div>
              <p className="text-mystic-300">Consulting the cards...</p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="text-center py-4">
              <p className="text-red-400">{error}</p>
              <button
                onClick={() => doReading(selectedSpread, question)}
                className="mt-4 px-6 py-3 bg-mystic-600 rounded-lg text-white hover:bg-mystic-500"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Reading Result */}
          {reading && (
            <div className="max-w-2xl mx-auto animate-fadeIn">
              <div className="bg-mystic-950/50 border border-mystic-800/50 rounded-2xl p-6 sm:p-8">
                {question && (
                  <div className="mb-6 pb-4 border-b border-mystic-800/50">
                    <p className="text-sm text-mystic-500 uppercase tracking-wider mb-1">Your Question</p>
                    <p className="text-mystic-200 italic">&ldquo;{question}&rdquo;</p>
                  </div>
                )}
                <div className="prose prose-invert max-w-none">
                  {reading.split("\n\n").map((p, i) => (
                    <p key={i} className="text-mystic-200 leading-relaxed mb-4">{p}</p>
                  ))}
                </div>
              </div>

              {/* Share / New Reading */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={() => setStep("home")}
                  className="px-6 py-3 bg-mystic-700 rounded-xl text-mystic-100 hover:bg-mystic-600 transition-colors"
                >
                  ✦ New Reading
                </button>

                {selectedSpread === "one-card" && (
                  <button
                    onClick={() => handleSelectPaidSpread("three-card")}
                    className="px-6 py-3 bg-gradient-to-r from-mystic-600 to-mystic-500 rounded-xl text-white hover:from-mystic-500 hover:to-mystic-400 transition-all"
                  >
                    🌙 Try a Deep Reading
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {step === "paying" && (
        <div className="text-center py-20 animate-fadeIn">
          <div className="text-4xl mb-4 animate-float">🔮</div>
          <p className="text-mystic-300">Redirecting to secure checkout...</p>
        </div>
      )}
    </div>
  );
}

function ReadingOption({ spread, onSelect }: { spread: SpreadType; onSelect: () => void }) {
  const s = spreads[spread];
  return (
    <button
      onClick={onSelect}
      className="group bg-mystic-950/50 border border-mystic-800/50 rounded-2xl p-6 text-left hover:border-mystic-600 hover:bg-mystic-900/30 transition-all duration-300"
    >
      <h3 className="text-lg font-semibold text-mystic-200 group-hover:text-mystic-100 mb-2">{s.name}</h3>
      <p className="text-sm text-mystic-400 mb-4">{s.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-mystic-500">{s.cardCount} cards · {s.positions.join(" · ")}</span>
        <span className="text-gold-400 font-semibold">${(s.price / 100).toFixed(2)}</span>
      </div>
    </button>
  );
}

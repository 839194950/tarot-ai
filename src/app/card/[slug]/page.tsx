import { notFound } from "next/navigation";
import { allCards, findCardBySlug, formatCardNameForSlug } from "@/lib/cards";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allCards.map((card) => ({
    slug: formatCardNameForSlug(card.name),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const card = findCardBySlug(slug);
  if (!card) return { title: "Card Not Found" };

  return {
    title: `${card.name} Tarot Card Meaning — Mystic Tarot`,
    description: `Learn the meaning of the ${card.name} tarot card. Keywords: ${card.keywords.join(", ")}. Upright and reversed meanings explained.`,
    openGraph: {
      title: `${card.name} — Tarot Card Meaning`,
      description: `Discover the meaning of the ${card.name} tarot card. ${card.meaningUp.substring(0, 100)}`,
    },
  };
}

export default async function CardPage({ params }: Props) {
  const { slug } = await params;
  const card = findCardBySlug(slug);

  if (!card) notFound();

  const relatedCards = allCards
    .filter((c) => c.suit === card.suit && c.id !== card.id)
    .slice(0, 4);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 animate-fadeIn">
      <Link href="/" className="text-mystic-400 hover:text-mystic-300 text-sm mb-6 inline-block">
        ← Home
      </Link>

      <div className="bg-mystic-950/50 border border-mystic-800/50 rounded-2xl p-6 sm:p-8 mb-8">
        <div className="flex items-start gap-2 mb-4">
          <span className="text-xs text-mystic-500 uppercase tracking-wider">
            {card.arcana === "major" ? `Major Arcana · No. ${card.number}` : `${card.suit} · ${card.element}`}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-mystic-100 mb-4">{card.name}</h1>

        <div className="flex flex-wrap gap-2 mb-6">
          {card.keywords.map((kw) => (
            <span key={kw} className="px-3 py-1 bg-mystic-800/50 rounded-full text-xs text-mystic-300">
              {kw}
            </span>
          ))}
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-sm text-mystic-500 uppercase tracking-wider mb-2">Upright Meaning</h2>
            <p className="text-mystic-200 leading-relaxed">{card.meaningUp}</p>
          </div>
          <div>
            <h2 className="text-sm text-mystic-500 uppercase tracking-wider mb-2">Reversed Meaning</h2>
            <p className="text-mystic-200 leading-relaxed">{card.meaningRev}</p>
          </div>
        </div>
      </div>

      {/* Get Reading CTA */}
      <div className="text-center mb-12">
        <Link
          href="/"
          className="inline-block px-8 py-4 bg-gradient-to-r from-mystic-600 to-mystic-500 rounded-xl text-white font-semibold hover:from-mystic-500 hover:to-mystic-400 transition-all duration-300"
        >
          ✦ Get a Personalized Reading
        </Link>
      </div>

      {/* Related Cards */}
      {relatedCards.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-mystic-200 mb-4">More {card.suit.charAt(0).toUpperCase() + card.suit.slice(1)} Cards</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {relatedCards.map((rc) => (
              <Link
                key={rc.id}
                href={`/card/${formatCardNameForSlug(rc.name)}`}
                className="bg-mystic-950/30 border border-mystic-800/30 rounded-xl p-3 text-center hover:border-mystic-600 transition-colors"
              >
                <p className="text-sm text-mystic-200 font-medium">{rc.name}</p>
                <p className="text-xs text-mystic-500 mt-1">{rc.keywords[0]}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

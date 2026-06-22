"use client";

import { TarotCard as TarotCardType } from "@/lib/cards";

interface Props {
  card?: TarotCardType;
  position?: string;
  index?: number;
  faceDown?: boolean;
  reversed?: boolean;
  onClick?: () => void;
}

const suitSymbols: Record<string, string> = {
  major: "✦",
  wands: "🔥",
  cups: "🜄",
  swords: "⚔️",
  pentacles: "🪙",
};

export default function TarotCard({ card, position, index = 0, faceDown, reversed, onClick }: Props) {
  if (faceDown || !card) {
    return (
      <button
        onClick={onClick}
        className="card-back rounded-xl w-32 h-52 sm:w-36 sm:h-56 flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300 animate-glow"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <span className="text-3xl mb-2">✦</span>
        <span className="text-xs text-mystic-300 font-medium">Mystic Tarot</span>
      </button>
    );
  }

  return (
    <div
      className="animate-cardReveal"
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div
        className={`card-front rounded-xl w-32 h-52 sm:w-36 sm:h-56 p-3 flex flex-col ${reversed ? "rotate-180" : ""}`}
      >
        <div className="flex items-center gap-1 mb-1">
          <span className="text-xs">{suitSymbols[card.suit]}</span>
          <span className="text-[10px] text-mystic-300 uppercase tracking-wider">{card.suit === "major" ? "Major" : card.suit}</span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center text-center px-1">
          <span className="text-lg font-bold text-mystic-200 leading-tight">{card.name}</span>
          <span className="text-[10px] text-mystic-400 mt-1 italic">{card.keywords.slice(0, 2).join(", ")}</span>
        </div>
        <div className="text-[9px] text-mystic-500 text-center">{card.arcana === "major" ? `No. ${card.number}` : card.element || ""}</div>
      </div>
      {position && (
        <p className="text-center text-xs text-mystic-400 mt-2 font-medium">{position}</p>
      )}
    </div>
  );
}

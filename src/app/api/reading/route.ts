import { NextRequest, NextResponse } from "next/server";
import { cardMap, spreads, SpreadType } from "@/lib/cards";
import { generateReading } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const { cardIds, spreadType, question } = await req.json();

    if (!cardIds || !spreadType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const spread = spreads[spreadType as SpreadType];
    if (!spread) {
      return NextResponse.json({ error: "Invalid spread type" }, { status: 400 });
    }

    if (cardIds.length !== spread.cardCount) {
      return NextResponse.json({ error: "Card count mismatch" }, { status: 400 });
    }

    const cards = cardIds.map((id: string) => cardMap.get(id)).filter(Boolean);
    if (cards.length !== cardIds.length) {
      return NextResponse.json({ error: "Invalid card IDs" }, { status: 400 });
    }

    const reading = await generateReading({
      cards: cards as any[],
      question: question || undefined,
      spreadType: spreadType as SpreadType,
      positions: spread.positions,
    });

    return NextResponse.json({ reading });
  } catch (error: any) {
    console.error("Reading API error:", error);
    return NextResponse.json({ error: "Failed to generate reading" }, { status: 500 });
  }
}

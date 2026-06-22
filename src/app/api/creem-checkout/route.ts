import { NextRequest, NextResponse } from "next/server";
import { spreads, SpreadType } from "@/lib/cards";
import { createCheckoutSession } from "@/lib/creem";

// Map spread types to Creem product IDs
// User needs to create these products in their Creem dashboard
const PRODUCT_IDS: Record<string, string> = {
  "three-card": process.env.CREEM_PRODUCT_THREE_CARD || "",
  "celtic-cross": process.env.CREEM_PRODUCT_CELTIC_CROSS || "",
};

export async function POST(req: NextRequest) {
  try {
    const { spreadType } = await req.json();

    if (!spreadType || !PRODUCT_IDS[spreadType]) {
      return NextResponse.json({ error: "Invalid spread type or product not configured" }, { status: 400 });
    }

    const productId = PRODUCT_IDS[spreadType];
    const checkout = await createCheckoutSession(productId);

    return NextResponse.json({ checkout_url: checkout.checkout_url });
  } catch (error: any) {
    console.error("Creem checkout error:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { verifyCheckout } from "@/lib/creem";

export async function GET(req: NextRequest) {
  const checkoutId = req.nextUrl.searchParams.get("checkout_id");

  if (!checkoutId) {
    return NextResponse.json({ error: "Missing checkout_id" }, { status: 400 });
  }

  try {
    const result = await verifyCheckout(checkoutId);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ status: "failed" }, { status: 500 });
  }
}

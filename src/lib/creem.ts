export interface CreemCheckoutResponse {
  checkout_url: string;
  checkout_id: string;
}

export interface CreemCheckoutStatus {
  status: "paid" | "pending" | "expired" | "failed";
}

const CREEM_MODE = process.env.CREEM_MODE || "test";
const CREEM_API = CREEM_MODE === "live"
  ? "https://api.creem.io"
  : "https://test-api.creem.io";

const API_KEY = process.env.CREEM_API_KEY || "";

export async function createCheckoutSession(productId: string): Promise<CreemCheckoutResponse> {
  const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const response = await fetch(`${CREEM_API}/v1/checkouts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify({
      product_id: productId,
      success_url: `${origin}/reading/success?checkout_id={checkout_id}`,
      cancel_url: `${origin}/reading/cancel`,
      embed: false,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Creem checkout failed: ${error}`);
  }

  return response.json();
}

export async function verifyCheckout(checkoutId: string): Promise<CreemCheckoutStatus> {
  const response = await fetch(`${CREEM_API}/v1/checkouts`, {
    headers: {
      "x-api-key": API_KEY,
    },
  });

  if (!response.ok) {
    return { status: "failed" };
  }

  const checkouts = await response.json();
  const checkout = Array.isArray(checkouts)
    ? checkouts.find((c: any) => c.id === checkoutId)
    : null;

  if (!checkout) return { status: "pending" };
  return { status: checkout.status === "paid" ? "paid" : "pending" };
}

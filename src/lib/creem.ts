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
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Creem checkout failed: ${error}`);
  }

  return response.json();
}

export async function verifyCheckout(checkoutId: string): Promise<CreemCheckoutStatus> {
  const response = await fetch(`${CREEM_API}/v1/checkouts?checkout_id=${checkoutId}`, {
    headers: {
      "x-api-key": API_KEY,
    },
  });

  if (!response.ok) {
    return { status: "failed" };
  }

  const checkout = await response.json();
  const isPaid = checkout.status === "completed" || checkout.order?.status === "paid";
  return { status: isPaid ? "paid" : "pending" };
}

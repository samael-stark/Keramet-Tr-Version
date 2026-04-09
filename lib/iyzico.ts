import crypto from "crypto";

export const IYZICO_BASE_URL =
  process.env.IYZICO_BASE_URL || "https://sandbox-api.iyzipay.com";

export const IYZICO_API_KEY = process.env.IYZICO_API_KEY || "";
export const IYZICO_SECRET_KEY = process.env.IYZICO_SECRET_KEY || "";

export function generateConversationId(orderId: string) {
  return `order_${orderId}_${Date.now()}`;
}

export function generateIyzicoAuthorization(
  uriPath: string,
  body: string,
  randomString: string
) {
  const payload = `${randomString}${uriPath}${body}`;

  const signature = crypto
    .createHmac("sha256", IYZICO_SECRET_KEY)
    .update(payload)
    .digest("base64");

  const authString = `apiKey:${IYZICO_API_KEY}&randomKey:${randomString}&signature:${signature}`;
  const encoded = Buffer.from(authString).toString("base64");

  return `IYZWSv2 ${encoded}`;
}

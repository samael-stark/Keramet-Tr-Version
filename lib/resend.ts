import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  throw new Error("Missing RESEND_API_KEY");
}

export const resend = new Resend(apiKey);

export const resendConfig = {
  from: process.env.RESEND_FROM_EMAIL || "Keramet <onboarding@resend.dev>",
  adminEmail: process.env.RESEND_ADMIN_EMAIL || "",
};

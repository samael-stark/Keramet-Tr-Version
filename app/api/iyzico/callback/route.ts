import { NextRequest, NextResponse } from "next/server";

import { FieldValue } from "firebase-admin/firestore";

import { adminDb } from "@/lib/firebase-admin";

export const runtime = "nodejs";

export const dynamic =
  "force-dynamic";

async function handleCallback(
  req: NextRequest
) {
  try {
    const Iyzipay =
      require("iyzipay");

    const iyzipay =
      new Iyzipay({
        apiKey:
          process.env
            .IYZICO_API_KEY || "",

        secretKey:
          process.env
            .IYZICO_SECRET_KEY || "",

        uri:
          process.env
            .IYZICO_BASE_URL ||
          "https://sandbox-api.iyzipay.com",
      });

    let token = "";

    // HANDLE POST

    if (req.method === "POST") {
      const formData =
        await req.formData();

      token =
        formData
          .get("token")
          ?.toString() || "";
    }

    // HANDLE GET

    if (req.method === "GET") {
      token =
        req.nextUrl.searchParams.get(
          "token"
        ) || "";
    }

    // NO TOKEN

    if (!token) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/payment-failed`,
        {
          status: 303,
        }
      );
    }

    // VERIFY PAYMENT

    const verifyData: any =
      await new Promise(
        (
          resolve,
          reject
        ) => {
          iyzipay.checkoutForm.retrieve(
            {
              locale: "en",

              token,
            },

            function (
              err: any,
              result: any
            ) {
              if (err) {
                reject(err);
              } else {
                resolve(
                  result
                );
              }
            }
          );
        }
      );

    console.log(
      "VERIFY DATA:",
      verifyData
    );

    // PAYMENT FAILED

    if (
      verifyData.status !==
        "success" ||
      verifyData.paymentStatus !==
        "SUCCESS"
    ) {
      const failedOrderId =
        verifyData.basketId;

      if (failedOrderId) {
        await adminDb
          .collection("orders")
          .doc(failedOrderId)
          .update({
            updatedAt:
              FieldValue.serverTimestamp(),

            "payment.status":
              "failed",

            "payment.failureReason":
              verifyData.errorMessage ||
              "Payment failed",

            "payment.rawResponse":
              verifyData,
          });
      }

      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/payment-failed`,
        {
          status: 303,
        }
      );
    }

    // PAYMENT SUCCESS

    const orderId =
      verifyData.basketId;

    if (!orderId) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/payment-failed`,
        {
          status: 303,
        }
      );
    }

    // UPDATE ORDER

    await adminDb
      .collection("orders")
      .doc(orderId)
      .update({
        updatedAt:
          FieldValue.serverTimestamp(),

        "payment.status":
          "paid",

        "payment.paidAt":
          FieldValue.serverTimestamp(),

        "payment.paymentId":
          verifyData.paymentId ||
          "",

        "payment.conversationId":
          verifyData.conversationId ||
          "",

        "payment.currency":
          verifyData.currency ||
          "USD",

        "payment.paidPrice":
          verifyData.paidPrice ||
          "",

        "payment.rawResponse":
          verifyData,

        orderStatus:
          "processing",
      });

    // SUCCESS REDIRECT

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/thank-you?orderId=${orderId}`,
      {
        status: 303,
      }
    );
  } catch (error) {
    console.error(
      "IYZICO CALLBACK ERROR:",
      error
    );

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/payment-failed`,
      {
        status: 303,
      }
    );
  }
}

// POST SUPPORT

export async function POST(
  req: NextRequest
) {
  return handleCallback(req);
}

// GET SUPPORT

export async function GET(
  req: NextRequest
) {
  return handleCallback(req);
}

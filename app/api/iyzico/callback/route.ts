import { NextRequest, NextResponse } from "next/server";

import { FieldValue } from "firebase-admin/firestore";

import { adminDb } from "@/lib/firebase-admin";

export const runtime = "nodejs";

export const dynamic =
  "force-dynamic";

export async function POST(
  req: NextRequest
) {
  try {
    // IMPORTANT
    // LOAD IYZIPAY INSIDE ROUTE

    const Iyzipay =
      eval("require")(
        "iyzipay"
      );

    const iyzipay =
      new Iyzipay({
        apiKey:
          process.env
            .IYZICO_API_KEY ||
          "",

        secretKey:
          process.env
            .IYZICO_SECRET_KEY ||
          "",

        uri:
          process.env
            .IYZICO_BASE_URL ||
          "https://sandbox-api.iyzipay.com",
      });

    // FORM DATA

    const formData =
      await req.formData();

    const token =
      formData
        .get("token")
        ?.toString() || "";

    if (!token) {
      return NextResponse.json(
        {
          error:
            "Token missing",
        },
        { status: 400 }
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

    // FAILED

    if (
      verifyData.status !==
        "success" ||
      verifyData.paymentStatus !==
        "SUCCESS"
    ) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/payment-failed`
      );
    }

    // SUCCESS

    const orderId =
      verifyData.basketId;

    if (!orderId) {
      return NextResponse.json(
        {
          error:
            "Order ID missing",
        },
        { status: 400 }
      );
    }

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

        "payment.rawResponse":
          verifyData,
      });

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/thank-you?orderId=${orderId}`
    );
  } catch (error) {
    console.error(
      "IYZICO CALLBACK ERROR:",
      error
    );

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/payment-failed`
    );
  }
}

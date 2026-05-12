import { NextRequest, NextResponse } from "next/server";

import { FieldValue } from "firebase-admin/firestore";

import { adminDb } from "@/lib/firebase-admin";

import {
  resend,
  resendConfig,
} from "@/lib/resend";

import {
  getOrderStatusEmailHtml,
} from "@/lib/email-templates";

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

    // TOKEN MISSING

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

        fulfillmentStatus:
          "order_confirmed",

        orderStatus:
          "processing",
      });

    // GET UPDATED ORDER

    const orderSnap =
      await adminDb
        .collection("orders")
        .doc(orderId)
        .get();

    const order =
      orderSnap.data();

    // SEND CUSTOMER EMAIL

    if (
      order?.customer?.email
    ) {
      try {
        await resend.emails.send({
          from:
            resendConfig.from,

          to:
            order.customer.email,

          subject: `Order Confirmed #${order.orderNumber}`,

          html:
            getOrderStatusEmailHtml({
              orderNumber:
                order.orderNumber || "",

              customerName:
                `${order.customer.firstName || ""} ${
                  order.customer.lastName || ""
                }`.trim() ||
                "Customer",

              status:
                "order_confirmed",

              note:
                "Your payment was received successfully.",

              trackUrl:
                "https://www.keramethali.com/track-order",
            }),
        });

        console.log(
          "CUSTOMER EMAIL SENT"
        );
      } catch (emailError) {
        console.error(
          "CUSTOMER EMAIL ERROR:",
          emailError
        );
      }
    }

    // SEND ADMIN EMAIL

    try {
      await resend.emails.send({
        from:
          resendConfig.from,

        to:
          "keramethalisecond@gmail.com",

        subject: `NEW PAID ORDER #${order?.orderNumber}`,

        html: `
          <div style="font-family:Arial,sans-serif;padding:20px;">
            <h2>New Paid Order</h2>

            <p>
              <strong>Order:</strong>
              #${order?.orderNumber || ""}
            </p>

            <p>
              <strong>Customer:</strong>
              ${
                order?.customer
                  ?.firstName || ""
              }
              ${
                order?.customer
                  ?.lastName || ""
              }
            </p>

            <p>
              <strong>Email:</strong>
              ${
                order?.customer
                  ?.email || ""
              }
            </p>

            <p>
              <strong>Total:</strong>
              ${
                order?.pricing
                  ?.currency ||
                "USD"
              }
              ${
                order?.pricing
                  ?.total || 0
              }
            </p>

            <p>
              Payment received successfully.
            </p>
          </div>
        `,
      });

      console.log(
        "ADMIN EMAIL SENT"
      );
    } catch (adminEmailError) {
      console.error(
        "ADMIN EMAIL ERROR:",
        adminEmailError
      );
    }

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

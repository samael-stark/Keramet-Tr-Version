import { NextRequest, NextResponse } from "next/server";

import {
  FieldValue,
} from "firebase-admin/firestore";

import { adminDb } from "@/lib/firebase-admin";

import { resend, resendConfig } from "@/lib/resend";

import { getOrderStatusEmailHtml } from "@/lib/email-templates";

export const runtime = "nodejs";

export const dynamic =
  "force-dynamic";

export async function POST(
  req: NextRequest
) {
  try {
    // LOAD SDK

    const Iyzipay =
      eval("require")(
        "iyzipay"
      );

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

    // FORM DATA

    const formData =
      await req.formData();

    const token =
      formData
        .get("token")
        ?.toString() || "";

    if (!token) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/payment-failed`
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
        303
      );
    }

    // SUCCESS

    const orderId =
      verifyData.basketId;

    if (!orderId) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/payment-failed`,
        303
      );
    }

    // UPDATE ORDER

    await adminDb
      .collection("orders")
      .doc(orderId)
      .update({
        updatedAt:
          FieldValue.serverTimestamp(),

        status: "paid",

        orderStatus:
          "processing",

        fulfillmentStatus:
          "order_confirmed",

        "payment.status":
          "paid",

        "payment.provider":
          "iyzico",

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
      });

    // GET UPDATED ORDER

    const orderSnap =
      await adminDb
        .collection("orders")
        .doc(orderId)
        .get();

    const orderData =
      orderSnap.data();

    // SEND EMAILS

    try {
      if (
        orderData?.customer?.email
      ) {
        const customerEmail =
          orderData.customer.email;

        const customerName =
          `${orderData.customer.firstName || ""} ${
            orderData.customer.lastName ||
            ""
          }`.trim();

        // CUSTOMER EMAIL

        await resend.emails.send({
          from:
            resendConfig.from,

          to: customerEmail,

          subject: `Order Confirmed #${orderData.orderNumber}`,

          html:
            getOrderStatusEmailHtml(
              {
                orderNumber:
                  orderData.orderNumber ||
                  "",

                customerName:
                  customerName ||
                  "Customer",

                status:
                  "order_confirmed",

                note: `Thank you for your purchase from Keramet Hali. Your order has been received successfully.`,

                trackUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/track-order`,
              }
            ),
        });

        // ADMIN EMAIL

        await resend.emails.send({
          from:
            resendConfig.from,

          to:
            process.env
              .RESEND_ADMIN_EMAIL ||
            "keramethalisecond@gmail.com",

          subject: `New Order Received #${orderData.orderNumber}`,

          html: `
            <div style="font-family:Arial;padding:24px">
              <h2>New Order Received</h2>

              <p>
                <strong>Order Number:</strong>
                ${orderData.orderNumber}
              </p>

              <p>
                <strong>Customer:</strong>
                ${customerName}
              </p>

              <p>
                <strong>Email:</strong>
                ${customerEmail}
              </p>

              <p>
                <strong>Total:</strong>
                ${orderData.pricing?.currency || "USD"} ${orderData.pricing?.total || 0}
              </p>

              <p>
                Payment completed successfully via iyzico.
              </p>
            </div>
          `,
        });

        console.log(
          "ORDER EMAILS SENT"
        );
      }
    } catch (emailError) {
      console.error(
        "EMAIL ERROR:",
        emailError
      );
    }

    // REDIRECT

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/thank-you?orderId=${orderId}`,
      303
    );
  } catch (error) {
    console.error(
      "IYZICO CALLBACK ERROR:",
      error
    );

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/payment-failed`,
      303
    );
  }
}

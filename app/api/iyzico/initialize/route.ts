import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { adminAuth, adminDb } from "@/lib/firebase-admin";
import {
  IYZICO_BASE_URL,
  generateConversationId,
  generateIyzicoAuthorization,
} from "@/lib/iyzico";

type InitializeBody = {
  orderId: string;
};

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const idToken = authHeader.split("Bearer ")[1];
    const decodedToken = await adminAuth.verifyIdToken(idToken);

    const body = (await req.json()) as InitializeBody;
    const orderId = body.orderId;

    if (!orderId) {
      return NextResponse.json({ error: "orderId is required" }, { status: 400 });
    }

    const orderRef = adminDb.collection("orders").doc(orderId);
    const orderSnap = await orderRef.get();

    if (!orderSnap.exists) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const order = orderSnap.data();

    if (!order) {
      return NextResponse.json({ error: "Order data missing" }, { status: 404 });
    }

    if (order.customer?.uid !== decodedToken.uid) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (!Array.isArray(order.items) || order.items.length === 0) {
      return NextResponse.json({ error: "Order has no items" }, { status: 400 });
    }

    const origin = process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin;
    const conversationId = generateConversationId(orderId);

    const requestBody = {
      locale: "en",
      conversationId,
      price: String(order.pricing.subtotal),
      paidPrice: String(order.pricing.total),
      currency: order.pricing.currency || "USD",
      basketId: orderId,
      paymentGroup: "PRODUCT",
      callbackUrl: `${origin}/api/iyzico/callback`,
      enabledInstallments: [1],
      buyer: {
        id: order.customer.uid,
        name: order.customer.firstName,
        surname: order.customer.lastName,
        gsmNumber: order.customer.phone,
        email: order.customer.email,
        identityNumber: "11111111111",
        registrationAddress: order.customer.addressLine1,
        city: order.customer.city,
        country: order.customer.country,
        zipCode: order.customer.postalCode || "00000",
        ip: "127.0.0.1",
      },
      shippingAddress: {
        contactName: `${order.customer.firstName} ${order.customer.lastName}`,
        city: order.customer.city,
        country: order.customer.country,
        address: `${order.customer.addressLine1} ${order.customer.addressLine2 || ""}`.trim(),
        zipCode: order.customer.postalCode || "00000",
      },
      billingAddress: {
        contactName: `${order.customer.firstName} ${order.customer.lastName}`,
        city: order.customer.city,
        country: order.customer.country,
        address: `${order.customer.addressLine1} ${order.customer.addressLine2 || ""}`.trim(),
        zipCode: order.customer.postalCode || "00000",
      },
      basketItems: order.items.map((item: any, index: number) => ({
        id: item.productId || `item_${index + 1}`,
        name: item.title,
        category1: "Carpet",
        itemType: "PHYSICAL",
        price: String(item.price),
      })),
    };

    const uriPath = "/payment/iyzipos/checkoutform/initialize/auth/ecom";
    const bodyString = JSON.stringify(requestBody);
    const randomString = Date.now().toString();

    const authorization = generateIyzicoAuthorization(
      uriPath,
      bodyString,
      randomString
    );

    const iyzicoRes = await fetch(`${IYZICO_BASE_URL}${uriPath}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
        "x-iyzi-rnd": randomString,
      },
      body: bodyString,
    });

    const iyzicoData = await iyzicoRes.json();

    if (iyzicoData.status !== "success") {
      await orderRef.update({
        updatedAt: FieldValue.serverTimestamp(),
        "payment.status": "failed",
      });

      return NextResponse.json(
        {
          error: iyzicoData.errorMessage || "iyzico initialize failed",
          iyzico: iyzicoData,
        },
        { status: 400 }
      );
    }

    await orderRef.update({
      updatedAt: FieldValue.serverTimestamp(),
      "payment.status": "pending",
      "payment.iyzicoConversationId": conversationId,
      "payment.iyzicoToken": iyzicoData.token || "",
      "payment.paymentPageUrl": iyzicoData.paymentPageUrl || "",
    });

    return NextResponse.json({
      success: true,
      token: iyzicoData.token,
      paymentPageUrl: iyzicoData.paymentPageUrl,
      conversationId,
    });
  } catch (error) {
    console.error("iyzico initialize error:", error);
    return NextResponse.json(
      { error: "Failed to initialize payment" },
      { status: 500 }
    );
  }
}

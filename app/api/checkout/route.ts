import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

type IncomingItem = {
  id: string;
  qty: number;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const items: IncomingItem[] = body?.items || [];

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const validatedItems = [];

    let subtotal = 0;

    for (const item of items) {
      if (!item.id) continue;

      const docRef = adminDb.collection("products").doc(item.id);
      const snap = await docRef.get();

      if (!snap.exists) {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 400 },
        );
      }

      const data = snap.data();

      // Optional: prevent inactive products from checkout
      if (data?.isActive === false) {
        return NextResponse.json(
          { error: "Product is no longer available" },
          { status: 400 },
        );
      }

      const price = Number(data?.price || 0);

      // SINGLE PRODUCT RULE
      const safeQty = 1;

      const lineTotal = price * safeQty;
      subtotal += lineTotal;

      validatedItems.push({
        id: snap.id,
        title: data?.title || "Untitled",
        price,
        qty: safeQty,
        lineTotal,
      });
    }

    const shipping = 0; // FREE DELIVERY
    const total = subtotal + shipping;

    return NextResponse.json({
      items: validatedItems,
      subtotal,
      shipping,
      total,
      currency: "USD",
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}

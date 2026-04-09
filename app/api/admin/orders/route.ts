import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function GET() {
  try {
    const snapshot = await adminDb
      .collection("orders")
      .orderBy("createdAt", "desc")
      .get();

    const orders = snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        orderNumber: data.orderNumber || "",
        customerName: `${data.customer?.firstName || ""} ${data.customer?.lastName || ""}`.trim(),
        email: data.customer?.email || "",
        phone: data.customer?.phone || "",
        total: data.pricing?.total || 0,
        status: data.fulfillmentStatus || "order_confirmed",
        paymentStatus: data.payment?.status || data.status || "pending",
        createdAt: data.createdAt?.toDate
          ? data.createdAt.toDate().toISOString()
          : null,
      };
    });

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error: any) {
    console.error("Admin orders fetch error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to fetch orders",
      },
      { status: 500 }
    );
  }
}

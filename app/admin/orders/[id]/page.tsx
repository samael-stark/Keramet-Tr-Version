"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type OrderStatusHistoryItem = {
  status: string;
  label: string;
  createdAt: string | null;
  note?: string;
};

type OrderItem = {
  title: string;
  image: string;
  price: number;
};

type OrderDetail = {
  id: string;
  orderNumber: string;
  fulfillmentStatus: string;
  fulfillmentStatusLabel: string;
  paymentStatus: string;
  createdAt: string | null;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    addressLine1: string;
    addressLine2?: string;
    postalCode?: string;
  };
  items: OrderItem[];
  pricing: {
    subtotal: number;
    shipping: number;
    total: number;
    currency: string;
  };
  statusHistory: OrderStatusHistoryItem[];
};

function formatDate(value: string | null) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString();
}

function getCurrencySymbol(currency: string) {
  switch (currency) {
    case "USD":
      return "$";
    case "EUR":
      return "€";
    case "GBP":
      return "£";
    case "TRY":
      return "₺";
    default:
      return `${currency} `;
  }
}

const STATUS_OPTIONS = [
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

export default function OrderDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [note, setNote] = useState("");

  const fetchOrder = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`/api/admin/orders/${id}`, {
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to load order");
      }

      setOrder(data.order);
    } catch (err: any) {
      setError(err.message || "Failed to load order");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchOrder();
  }, [id]);

  const updateFulfillmentStatus = async (status: string) => {
    if (!order) return;

    if (order.fulfillmentStatus === status) {
      setError("This status is already set.");
      return;
    }

    try {
      setUpdating(status);
      setError("");
      setSuccess("");

      const res = await fetch(`/api/admin/orders/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
          note,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update status");
      }

      setSuccess("Status updated successfully");
      setNote("");

      await fetchOrder();
    } catch (err: any) {
      setError(err.message || "Failed to update status");
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return <main className="p-6 text-gray-700">Loading order...</main>;
  }

  if (error && !order) {
    return <main className="p-6 text-red-700">{error}</main>;
  }

  if (!order) {
    return <main className="p-6 text-gray-700">Order not found.</main>;
  }

  return (
    <main className="min-h-screen bg-custom-bg px-6 py-12">
      <div className="mx-auto max-w-5xl space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-custom-accent">
            Order #{order.orderNumber}
          </h1>
        </div>

        {error && (
          <div className="rounded-[1.25rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-[1.25rem] border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {success}
          </div>
        )}

        {/* STATUS UPDATE */}
        <div className="rounded-[1.75rem] bg-white/20 p-6 shadow-xl backdrop-blur-xl">
          <h2 className="mb-4 text-lg font-bold">Update Fulfillment Status</h2>

          <textarea
            placeholder="Optional note (e.g. tracking number, delay reason)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="mb-4 w-full rounded-xl border border-white/40 bg-white/60 p-3 text-sm outline-none focus:ring-2 focus:ring-custom-accent"
          />

          <div className="flex flex-wrap gap-3">
            {STATUS_OPTIONS.map((item) => {
              const active = order.fulfillmentStatus === item.value;
              const isLoading = updating === item.value;

              return (
                <button
                  key={item.value}
                  disabled={!!updating || active}
                  onClick={() => updateFulfillmentStatus(item.value)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    active
                      ? "bg-custom-accent text-white"
                      : "bg-white/50 text-gray-800 hover:bg-white/70"
                  } disabled:cursor-not-allowed disabled:opacity-70`}
                >
                  {isLoading ? "Updating..." : item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* STATUS HISTORY */}
        <div className="rounded-[1.75rem] bg-white/20 p-6 shadow-xl backdrop-blur-xl">
          <h2 className="mb-4 text-lg font-bold">Status Timeline</h2>

          <div className="space-y-4">
            {order.statusHistory?.length ? (
              order.statusHistory.map((entry, index) => (
                <div
                  key={`${entry.status}-${index}`}
                  className="flex gap-4 rounded-2xl border border-white/50 bg-white/50 p-4"
                >
                  <div className="mt-1 h-3 w-3 rounded-full bg-custom-accent" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      {entry.label}
                    </p>
                    <p className="text-sm text-gray-600">
                      {formatDate(entry.createdAt)}
                    </p>
                    {entry.note && (
                      <p className="mt-2 text-sm text-gray-700">
                        {entry.note}
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>No status history yet.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

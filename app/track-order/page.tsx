"use client";

import { FormEvent, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type TrackOrderResponse = {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  fulfillmentStatus: string;
  fulfillmentStatusLabel: string;
  paymentStatus: string;
  createdAt: string | null;
  total: number;
  currency: string;
  items: {
    title: string;
    image: string;
    price: number;
  }[];
  statusHistory: {
    status: string;
    label: string;
    createdAt: string | null;
    note?: string;
  }[];
};

const STATUS_FLOW = [
  "order_confirmed",
  "processing",
  "shipped",
  "delivered",
];

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

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState<TrackOrderResponse | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const res = await fetch("/api/track-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderNumber: orderNumber.trim(),
          email: email.trim().toLowerCase(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to find order.");
      }

      setOrder(data.order);
    } catch (err: any) {
      setError(err.message || "Failed to find order.");
    } finally {
      setLoading(false);
    }
  };

  const getCurrentStepIndex = () => {
    if (!order) return 0;
    return STATUS_FLOW.indexOf(order.fulfillmentStatus);
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-custom-bg px-4 py-10 md:px-6 md:py-14">
        <div className="mx-auto max-w-5xl">
          {/* FORM */}
          <div className="rounded-[2rem] border border-white/50 bg-white/20 p-6 shadow-xl backdrop-blur-xl md:p-8">
            <h1 className="text-3xl font-extrabold text-custom-accent">
              Track Your Order
            </h1>

            {/* GUIDE */}
            <div className="mt-4 rounded-2xl border border-white/40 bg-white/70 p-5 text-sm text-gray-700">
              <p className="font-semibold text-gray-900 mb-2">
                How to track your order
              </p>
              <ul className="space-y-1">
                <li>• Enter your order number without the # symbol</li>
                <li>• Use the same email used during checkout</li>
              </ul>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-6 grid gap-4 md:grid-cols-2"
            >
              <input
                type="text"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="Example: KRM-123456"
                className="rounded-2xl border bg-white/70 px-4 py-3 outline-none focus:border-custom-accent"
                required
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="rounded-2xl border bg-white/70 px-4 py-3 outline-none focus:border-custom-accent"
                required
              />

              <button className="col-span-2 rounded-2xl bg-custom-accent py-3 text-white font-semibold hover:bg-custom-accent-light transition">
                {loading ? "Checking..." : "Track Order"}
              </button>
            </form>

            {error && (
              <div className="mt-4 text-red-600 text-sm">{error}</div>
            )}
          </div>

          {/* RESULT */}
          {order && (
            <div className="mt-8 space-y-6">
              {/* HEADER */}
              <div className="rounded-[2rem] bg-white/20 p-6 shadow-xl backdrop-blur-xl">
                <h2 className="text-2xl font-bold text-custom-accent">
                  #{order.orderNumber}
                </h2>
                <p className="text-sm text-gray-600">
                  Placed on {formatDate(order.createdAt)}
                </p>
              </div>

              {/* PROGRESS */}
              <div className="rounded-[2rem] bg-white/20 p-6 shadow-xl backdrop-blur-xl">
                <h3 className="font-bold mb-6 text-gray-900">
                  Order Progress
                </h3>

                <div className="relative flex items-center justify-between">
                  {STATUS_FLOW.map((step, index) => {
                    const currentIndex = getCurrentStepIndex();
                    const isActive = index <= currentIndex;

                    return (
                      <div
                        key={step}
                        className="flex-1 text-center relative"
                      >
                        {/* LINE */}
                        {index !== STATUS_FLOW.length - 1 && (
                          <div className="absolute top-2 left-1/2 w-full h-[2px] bg-gray-300 z-0">
                            <div
                              className={`h-full ${
                                index < currentIndex
                                  ? "bg-custom-accent"
                                  : ""
                              }`}
                            />
                          </div>
                        )}

                        {/* DOT */}
                        <div
                          className={`relative z-10 mx-auto h-4 w-4 rounded-full ${
                            isActive
                              ? "bg-custom-accent"
                              : "bg-gray-300"
                          }`}
                        />

                        <p className="mt-3 text-xs font-medium capitalize text-gray-700">
                          {step.replace("_", " ")}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* TIMELINE */}
              <div className="rounded-[2rem] bg-white/20 p-6 shadow-xl backdrop-blur-xl">
                <h3 className="font-bold mb-6 text-gray-900">Timeline</h3>

                <div className="relative space-y-6">
                  {order.statusHistory.map((step, i) => (
                    <div key={i} className="relative pl-8">
                      {/* LINE */}
                      <div className="absolute left-1 top-2 bottom-0 w-[2px] bg-gray-300" />

                      {/* DOT */}
                      <div className="absolute left-0 top-2 h-3 w-3 rounded-full bg-custom-accent" />

                      <div>
                        <p className="font-semibold text-gray-900">
                          {step.label}
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatDate(step.createdAt)}
                        </p>

                        {step.note && (
                          <p className="mt-2 text-sm text-gray-700">
                            {step.note}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ITEMS */}
              <div className="rounded-[2rem] bg-white/20 p-6 shadow-xl backdrop-blur-xl">
                <h3 className="font-bold mb-6 text-gray-900">Items</h3>

                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 rounded-2xl border border-white/50 bg-white/60 p-4"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-20 w-20 rounded-xl object-cover"
                      />

                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">
                          {item.title}
                        </p>
                      </div>

                      <div className="font-semibold text-gray-900">
                        {getCurrencySymbol(order.currency)}
                        {item.price}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

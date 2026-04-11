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
    const index = STATUS_FLOW.indexOf(order.fulfillmentStatus);
    return index === -1 ? 0 : index;
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-custom-bg px-4 py-8 md:px-6 md:py-14">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-[1.75rem] border border-white/50 bg-white/20 p-5 shadow-xl backdrop-blur-xl md:rounded-[2rem] md:p-8">
            <h1 className="text-2xl font-extrabold text-custom-accent md:text-3xl">
              Track Your Order
            </h1>

            <div className="mt-4 rounded-2xl border border-white/40 bg-white/70 p-4 text-sm text-gray-700 md:p-5">
              <p className="mb-2 font-semibold text-gray-900">
                How to track your order
              </p>
              <ul className="space-y-1">
                <li>• Enter your order number without the # symbol</li>
                <li>• Use the same email used during checkout</li>
              </ul>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2"
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

              <button className="rounded-2xl bg-custom-accent py-3 font-semibold text-white transition hover:bg-custom-accent-light md:col-span-2">
                {loading ? "Checking..." : "Track Order"}
              </button>
            </form>

            {error && <div className="mt-4 text-sm text-red-600">{error}</div>}
          </div>

          {order && (
            <div className="mt-8 space-y-5 md:space-y-6">
              <div className="rounded-[1.75rem] bg-white/20 p-5 shadow-xl backdrop-blur-xl md:rounded-[2rem] md:p-6">
                <h2 className="break-words text-xl font-bold text-custom-accent md:text-2xl">
                  #{order.orderNumber}
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  Placed on {formatDate(order.createdAt)}
                </p>
              </div>

              <div className="rounded-[1.75rem] bg-white/20 p-5 shadow-xl backdrop-blur-xl md:rounded-[2rem] md:p-6">
                <h3 className="mb-5 font-bold text-gray-900 md:mb-6">
                  Order Progress
                </h3>

                <div className="overflow-x-auto">
                  <div className="relative flex min-w-[620px] items-start justify-between px-2">
                    {STATUS_FLOW.map((step, index) => {
                      const currentIndex = getCurrentStepIndex();
                      const isActive = index <= currentIndex;

                      return (
                        <div
                          key={step}
                          className="relative flex flex-1 flex-col items-center text-center"
                        >
                          {index !== STATUS_FLOW.length - 1 && (
                            <div className="absolute left-1/2 top-2 z-0 h-[2px] w-full bg-gray-300">
                              <div
                                className={`h-full ${
                                  index < currentIndex
                                    ? "bg-custom-accent"
                                    : "bg-gray-300"
                                }`}
                              />
                            </div>
                          )}

                          <div
                            className={`relative z-10 h-4 w-4 rounded-full ${
                              isActive ? "bg-custom-accent" : "bg-gray-300"
                            }`}
                          />

                          <p className="mt-3 px-2 text-xs font-medium capitalize text-gray-700">
                            {step.replaceAll("_", " ")}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="rounded-[1.75rem] bg-white/20 p-5 shadow-xl backdrop-blur-xl md:rounded-[2rem] md:p-6">
                <h3 className="mb-5 font-bold text-gray-900 md:mb-6">
                  Timeline
                </h3>

                <div className="relative space-y-6">
                  {order.statusHistory.map((step, i) => (
                    <div key={i} className="relative pl-8">
                      {i !== order.statusHistory.length - 1 && (
                        <div className="absolute bottom-[-28px] left-[5px] top-2 w-[2px] bg-gray-300" />
                      )}

                      <div className="absolute left-0 top-2 h-3 w-3 rounded-full bg-custom-accent" />

                      <div>
                        <p className="font-semibold text-gray-900">
                          {step.label}
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatDate(step.createdAt)}
                        </p>

                        {step.note && (
                          <p className="mt-2 text-sm leading-6 text-gray-700">
                            {step.note}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.75rem] bg-white/20 p-5 shadow-xl backdrop-blur-xl md:rounded-[2rem] md:p-6">
                <h3 className="mb-5 font-bold text-gray-900 md:mb-6">Items</h3>

                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-4 rounded-2xl border border-white/50 bg-white/60 p-4 sm:flex-row sm:items-center"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-24 w-full rounded-xl object-cover sm:h-20 sm:w-20"
                      />

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold leading-6 text-gray-900 sm:text-base">
                          {item.title}
                        </p>
                      </div>

                      <div className="text-sm font-semibold text-gray-900 sm:text-base">
                        {getCurrencySymbol(order.currency)}
                        {item.price}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/50 bg-white/60 p-4">
                  <span className="font-semibold text-gray-800">Total</span>
                  <span className="font-bold text-custom-accent">
                    {getCurrencySymbol(order.currency)}
                    {order.total}
                  </span>
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

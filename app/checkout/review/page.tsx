"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

type CheckoutItem = {
  id: string;
  title?: string;
  coverUrl?: string;
  price: number;
  category?: string;
  size?: string;
};

type CheckoutPayload = {
  customer: {
    country: string;
    fullName: string;
    streetAddress: string;
    apartment: string;
    city: string;
    postalCode: string;
    countryCode: string;
    phoneNumber: string;
  };
  items: CheckoutItem[];
  subtotal: number;
};

export default function CheckoutReviewPage() {
  const router = useRouter();

  const [ready, setReady] = useState(false);
  const [checkoutData, setCheckoutData] = useState<CheckoutPayload | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderError, setOrderError] = useState("");

  useEffect(() => {
    const raw = sessionStorage.getItem("checkoutDetails");

    if (!raw) {
      router.replace("/checkout");
      return;
    }

    try {
      const parsed = JSON.parse(raw) as CheckoutPayload;

      if (!parsed?.customer || !parsed?.items?.length) {
        router.replace("/checkout");
        return;
      }

      setCheckoutData(parsed);
      setReady(true);
    } catch {
      router.replace("/checkout");
    }
  }, [router]);

  const fullAddress = useMemo(() => {
    if (!checkoutData) return "";

    return [
      checkoutData.customer.streetAddress,
      checkoutData.customer.apartment,
      checkoutData.customer.city,
      checkoutData.customer.postalCode,
      checkoutData.customer.country,
    ]
      .filter(Boolean)
      .join(", ");
  }, [checkoutData]);

  const fullPhone = useMemo(() => {
    if (!checkoutData) return "";
    return `${checkoutData.customer.countryCode} ${checkoutData.customer.phoneNumber}`;
  }, [checkoutData]);

  const handleEditAddress = () => {
    router.push("/checkout");
  };

  const handlePlaceOrder = async () => {
    try {
      setIsSubmitting(true);
      setOrderError("");

      const user = auth.currentUser;

      if (!user) {
        router.push("/auth");
        return;
      }

      if (!checkoutData || !checkoutData.items?.length) {
        setOrderError("Checkout details are missing.");
        return;
      }

      const idToken = await user.getIdToken();

      const trimmedName = checkoutData.customer.fullName.trim();
      const nameParts = trimmedName.split(/\s+/);
      const firstName = nameParts[0] || "Guest";
      const lastName = nameParts.slice(1).join(" ") || "-";

      const orderPayload = {
        customer: {
          email: user.email || "",
          firstName,
          lastName,
          phone: `${checkoutData.customer.countryCode} ${checkoutData.customer.phoneNumber}`.trim(),
          country: checkoutData.customer.country,
          city: checkoutData.customer.city,
          addressLine1: checkoutData.customer.streetAddress,
          addressLine2: checkoutData.customer.apartment || "",
          postalCode: checkoutData.customer.postalCode || "",
        },
        items: checkoutData.items.map((item) => ({
          productId: item.id,
          title: item.title || "Untitled product",
          price: Number(item.price || 0),
          image: item.coverUrl || "",
          quantity: 1 as const,
        })),
        shipping: 0,
        currency: "USD",
      };

      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(orderPayload),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        throw new Error(orderData.error || "Failed to create order");
      }

      sessionStorage.setItem("pendingOrderId", orderData.orderId);
      sessionStorage.setItem("pendingOrderNumber", orderData.orderNumber);

      router.push("/checkout/thank-you");
    } catch (error: any) {
      console.error("Place order flow failed:", error);
      setOrderError(error.message || "Something went wrong while placing your order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!ready || !checkoutData) {
    return (
      <>
        <Header />
        <main className="page">
          <div className="wrap">
            <div className="loadingCard">Preparing review step…</div>
          </div>
        </main>
        <Footer />

        <style jsx>{`
          .page {
            background: #f5f5eb;
            min-height: 100vh;
          }

          .wrap {
            max-width: 1200px;
            margin: 0 auto;
            padding: 48px 20px 70px;
          }

          .loadingCard {
            background: rgba(255, 255, 255, 0.82);
            border: 1px solid rgba(122, 31, 31, 0.08);
            border-radius: 20px;
            padding: 28px;
            font-weight: 700;
            color: #1c1c1c;
            box-shadow: 0 10px 28px rgba(122, 31, 31, 0.05);
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="page">
        <div className="wrap">
          <div className="topbar">
            <div>
              <h1 className="title">Review & Payment</h1>
              <p className="subtitle">
                Confirm your delivery details and order summary before placing the order.
              </p>
            </div>

            <div className="steps">
              <span className="step done">1. Address</span>
              <span className="step active">2. Review &amp; Payment</span>
            </div>
          </div>

          <div className="grid">
            <section className="leftColumn">
              <div className="card">
                <div className="cardHeader">
                  <h2>Delivery details</h2>
                  <button className="editBtn" onClick={handleEditAddress}>
                    Edit
                  </button>
                </div>

                <div className="detailBlock">
                  <div className="detailRow">
                    <span className="label">Full name</span>
                    <span className="value">{checkoutData.customer.fullName}</span>
                  </div>

                  <div className="detailRow">
                    <span className="label">Phone</span>
                    <span className="value">{fullPhone}</span>
                  </div>

                  <div className="detailRow">
                    <span className="label">Address</span>
                    <span className="value">{fullAddress}</span>
                  </div>
                </div>
              </div>

            <div className="card">
  <div className="cardHeader">
    <h2>Payment method</h2>
    <button className="editBtn" onClick={handleEditAddress}>
      Edit
    </button>
  </div>

  <div className="paymentBox">
    <div className="paymentIcon">💳</div>

    <div>
      <p className="paymentTitle">Iyzico secure checkout</p>

      <p className="paymentText">
        You will be redirected to iyzico to complete your payment once the
        integration is enabled. For now, your order will be saved in our
        system after you place it.
      </p>

      {/* PAYMENT LOGOS ADDED HERE */}
      <div className="paymentLogos">
        <img
          src="/payment-logos/pay_with_iyzico.svg"
          alt="Iyzico"
        />
        <img
          src="/payment-logos/Visa_Inc._logo.svg"
          alt="Visa"
        />
        <img
          src="/payment-logos/Mastercard-logo.svg"
          alt="Mastercard"
        />
      </div>
    </div>
  </div>

  <button
    type="button"
    className="placeBtn"
    onClick={handlePlaceOrder}
    disabled={isSubmitting}
  >
    {isSubmitting ? "Placing Order..." : "Place Order"}
  </button>

  {orderError ? <p className="errorText">{orderError}</p> : null}
</div>
            </section>

            <aside className="summaryCard">
              <h3>Order summary</h3>

              <div className="summaryItems">
                {checkoutData.items.map((item) => (
                  <div key={item.id} className="summaryRow">
                    <div className="left">
                      <img
                        src={item.coverUrl || ""}
                        alt={item.title || "Product"}
                      />
                      <div className="textWrap">
                        <p className="itemTitle">
                          {item.title || "Untitled product"}
                        </p>
                        <p className="itemMeta">
                          {item.category || "Rug"}
                          {item.size ? ` • ${item.size}` : ""}
                        </p>
                        <div className="priceWrap">
                          USD {Number(item.price || 0).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="totals">
                <div className="sumRow">
                  <span>Subtotal</span>
                  <strong>USD {checkoutData.subtotal.toFixed(2)}</strong>
                </div>
                <div className="sumRow">
                  <span>Delivery</span>
                  <strong>Free</strong>
                </div>
                <div className="sumRow total">
                  <span>Total</span>
                  <strong>USD {checkoutData.subtotal.toFixed(2)}</strong>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .page {
          background: #f5f5eb;
          min-height: 100vh;
        }

        .wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 48px 20px 70px;
        }
   .paymentLogos {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 14px;
  flex-wrap: nowrap;
  overflow-x: auto;
}

/* Base style */
.paymentLogos img {
  width: auto;
  object-fit: contain;
  flex-shrink: 0;
}

/* Iyzico (medium size) */
.paymentLogos img[alt="Iyzico"] {
  height: 40px;
}

/* Visa (slightly smaller because SVG is visually heavy) */
.paymentLogos img[alt="Visa"] {
  height: 28px;
}

/* Mastercard (needs a bit more size) */
.paymentLogos img[alt="Mastercard"] {
  height: 47px;
}
        .topbar {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 28px;
        }

        .title {
          font-size: 42px;
          font-weight: 900;
          color: #7a1f1f;
          margin-bottom: 8px;
        }

        .subtitle {
          color: rgba(0, 0, 0, 0.6);
          line-height: 1.5;
          max-width: 580px;
        }

        .steps {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .step {
          font-size: 13px;
          font-weight: 700;
          color: rgba(0, 0, 0, 0.48);
          padding: 10px 14px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.72);
          border: 1px solid rgba(122, 31, 31, 0.08);
          white-space: nowrap;
        }

        .step.active {
          color: #7a1f1f;
          background: rgba(122, 31, 31, 0.08);
          border-color: rgba(122, 31, 31, 0.14);
        }

        .step.done {
          color: #1c1c1c;
        }

        .grid {
          display: grid;
          grid-template-columns: 1fr 390px;
          gap: 24px;
          align-items: start;
        }

        .leftColumn {
          display: flex;
          flex-direction: column;
          gap: 20px;
          order: 1;
        }

        .summaryCard {
          order: 2;
        }

        .card,
        .summaryCard {
          background: rgba(255, 255, 255, 0.82);
          border: 1px solid rgba(122, 31, 31, 0.08);
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 10px 28px rgba(122, 31, 31, 0.05);
        }

        .cardHeader {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 18px;
        }

        .card h2,
        .summaryCard h3 {
          font-size: 22px;
          font-weight: 900;
          color: #1c1c1c;
          margin-bottom: 20px;
        }

        .editBtn {
          border: 1px solid rgba(122, 31, 31, 0.2);
          background: rgba(255, 255, 255, 0.85);
          color: #7a1f1f;
          padding: 8px 12px;
          border-radius: 10px;
          font-weight: 700;
          cursor: pointer;
        }

        .detailBlock {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .detailRow {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 18px;
          border-bottom: 1px solid rgba(122, 31, 31, 0.08);
          padding-bottom: 12px;
        }

        .detailRow:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .label {
          font-size: 13px;
          font-weight: 800;
          color: rgba(0, 0, 0, 0.5);
          min-width: 120px;
        }

        .value {
          font-size: 14px;
          font-weight: 700;
          color: #1c1c1c;
          text-align: right;
          line-height: 1.5;
        }

        .paymentBox {
          display: flex;
          gap: 14px;
          align-items: flex-start;
          background: rgba(122, 31, 31, 0.05);
          border-radius: 14px;
          padding: 16px;
          margin-top: 14px;
        }

        .paymentIcon {
          font-size: 24px;
          line-height: 1;
        }

        .paymentTitle {
          font-size: 15px;
          font-weight: 900;
          color: #1c1c1c;
          margin-bottom: 4px;
        }

        .paymentText {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.65);
          line-height: 1.6;
        }

        .placeBtn {
          width: 100%;
          border: none;
          background: #7a1f1f;
          color: #fff;
          font-weight: 900;
          padding: 14px 16px;
          border-radius: 14px;
          cursor: pointer;
          box-shadow: 0 10px 22px rgba(122, 31, 31, 0.22);
          margin-top: 18px;
          transition: background 0.2s ease, opacity 0.2s ease;
        }

        .placeBtn:hover {
          background: #641919;
        }

        .placeBtn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .errorText {
          margin-top: 12px;
          font-size: 14px;
          font-weight: 700;
          color: #b42318;
          line-height: 1.5;
        }

        .summaryItems {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 22px;
        }

        .summaryRow {
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(122, 31, 31, 0.08);
        }

        .left {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          min-width: 0;
        }

        .left img {
          width: 58px;
          height: 78px;
          object-fit: cover;
          border-radius: 12px;
          background: #fff;
          flex-shrink: 0;
        }

        .textWrap {
          min-width: 0;
          flex: 1;
          padding-right: 4px;
        }

        .itemTitle {
          font-size: 14px;
          font-weight: 800;
          color: #1c1c1c;
          line-height: 1.42;
          margin-bottom: 6px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          word-break: break-word;
          overflow-wrap: anywhere;
          max-width: 100%;
        }

        .itemMeta {
          font-size: 13px;
          color: rgba(0, 0, 0, 0.58);
          margin-bottom: 10px;
        }

        .priceWrap {
          font-size: 15px;
          font-weight: 900;
          color: #7a1f1f;
        }

        .totals {
          padding-top: 4px;
        }

        .sumRow {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 15px;
          margin-bottom: 12px;
          color: #1c1c1c;
        }

        .sumRow strong {
          color: #7a1f1f;
        }

        .sumRow.total {
          margin-top: 10px;
          padding-top: 14px;
          border-top: 1px solid rgba(122, 31, 31, 0.1);
          font-weight: 900;
          font-size: 17px;
        }

        @media (max-width: 1024px) {
          .grid {
            grid-template-columns: 1fr;
          }

          .summaryCard {
            order: 1;
          }

          .leftColumn {
            order: 2;
          }

          .topbar {
            flex-direction: column;
            align-items: flex-start;
          }

          .steps {
            justify-content: flex-start;
          }

          .title {
            font-size: 34px;
          }
        }

        @media (max-width: 640px) {
          .wrap {
            padding: 32px 16px 70px;
          }

          .card,
          .summaryCard {
            padding: 20px;
          }

          .detailRow {
            flex-direction: column;
            gap: 6px;
          }

          .value {
            text-align: left;
          }

          .left img {
            width: 56px;
            height: 76px;
          }

          .itemTitle {
            font-size: 13px;
            line-height: 1.45;
          }

          .step {
            font-size: 12px;
            padding: 9px 12px;
          }
        }
      `}</style>
    </>
  );
}

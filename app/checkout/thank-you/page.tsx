"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ThankYouPage() {
  const router = useRouter();
  const [orderNumber, setOrderNumber] = useState("");

 useEffect(() => {
  const params = new URLSearchParams(
    window.location.search
  );

  const orderId = params.get("orderId");

  const storedOrderNumber =
    sessionStorage.getItem(
      "pendingOrderNumber"
    );

  // NO ORDER DATA FOUND

  if (!orderId && !storedOrderNumber) {
    router.replace("/");
    return;
  }

  if (storedOrderNumber) {
    setOrderNumber(storedOrderNumber);
  } else if (orderId) {
    setOrderNumber(orderId);
  }

  // CLEAR TEMP STORAGE

  sessionStorage.removeItem(
    "checkoutDetails"
  );

  sessionStorage.removeItem(
    "pendingOrderId"
  );

  sessionStorage.removeItem(
    "pendingOrderNumber"
  );
}, [router]);

  const handleContinueShopping = () => {
    router.push("/products");
  };

  return (
    <>
      <Header />

      <main className="page">
        <div className="wrap">
          <div className="card">
            <div className="iconWrap">✔</div>

<h1 className="title">Siparişiniz Alındı!</h1>

            <p className="subtitle">
Ödemeniz başarıyla tamamlandı. Siparişiniz alınmıştır ve hazırlanmaya başlanacaktır.</p>

            {orderNumber ? (
              <div className="orderBox">
                <span className="orderLabel">Sipariş Numaranız</span>
                <strong className="orderNumber">{orderNumber}</strong>
              </div>
            ) : null}

            <p className="note">
Sipariş onayınız ve durum güncellemeleri kısa süre içinde e-posta adresinize gönderilecektir.
            </p>

            <div className="actions">
              <button
                type="button"
                className="primaryBtn"
                onClick={handleContinueShopping}
              >
                Alışverişe Devam Et
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .page {
          min-height: 100vh;
          background: #f5f5eb;
          padding: 48px 20px 80px;
        }

        .wrap {
          max-width: 760px;
          margin: 0 auto;
        }

        .card {
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(122, 31, 31, 0.08);
          border-radius: 24px;
          padding: 48px 32px;
          box-shadow: 0 12px 30px rgba(122, 31, 31, 0.06);
          text-align: center;
        }

        .iconWrap {
          width: 72px;
          height: 72px;
          margin: 0 auto 20px;
          border-radius: 999px;
          background: rgba(122, 31, 31, 0.1);
          color: #7a1f1f;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 34px;
          font-weight: 900;
        }

        .title {
          font-size: 42px;
          line-height: 1.15;
          font-weight: 900;
          color: #7a1f1f;
          margin-bottom: 12px;
        }

        .subtitle {
          font-size: 16px;
          line-height: 1.7;
          color: rgba(0, 0, 0, 0.7);
          max-width: 560px;
          margin: 0 auto 24px;
        }

        .orderBox {
          background: rgba(122, 31, 31, 0.06);
          border: 1px solid rgba(122, 31, 31, 0.12);
          border-radius: 18px;
          padding: 20px;
          margin: 0 auto 22px;
          max-width: 420px;
        }

        .orderLabel {
          display: block;
          font-size: 13px;
          font-weight: 800;
          color: rgba(0, 0, 0, 0.55);
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .orderNumber {
          display: block;
          font-size: 26px;
          font-weight: 900;
          color: #7a1f1f;
          word-break: break-word;
        }

        .note {
          font-size: 15px;
          line-height: 1.7;
          color: rgba(0, 0, 0, 0.65);
          margin-bottom: 30px;
        }

        .actions {
          display: flex;
          justify-content: center;
        }

        .primaryBtn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 220px;
          padding: 14px 22px;
          border-radius: 14px;
          border: 1px solid #7a1f1f;
          background: #7a1f1f;
          color: #ffffff;
          font-size: 15px;
          font-weight: 800;
          line-height: 1;
          cursor: pointer;
          box-shadow: 0 10px 22px rgba(122, 31, 31, 0.18);
          transition: background 0.2s ease, border-color 0.2s ease,
            transform 0.2s ease, box-shadow 0.2s ease;
        }

        .primaryBtn:hover {
          background: #641919;
          border-color: #641919;
        }

        .primaryBtn:active {
          transform: translateY(1px);
          box-shadow: 0 6px 14px rgba(122, 31, 31, 0.2);
        }

        @media (max-width: 640px) {
          .page {
            padding: 32px 16px 70px;
          }

          .card {
            padding: 36px 20px;
          }

          .title {
            font-size: 32px;
          }

          .orderNumber {
            font-size: 22px;
          }

          .primaryBtn {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}

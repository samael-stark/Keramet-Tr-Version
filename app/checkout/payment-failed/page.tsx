"use client";

import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PaymentFailedPage() {
  return (
    <>
      <Header />

      <main className="page">
        <div className="card">
          <div className="icon">❌</div>

          <h1>Payment Failed</h1>

          <p>
            Unfortunately your payment could not be
            completed.
          </p>

          <p className="subtext">
            Please try again using another card or
            payment method.
          </p>

          <div className="actions">
            <Link
              href="/checkout/review"
              className="retryBtn"
            >
              Try Again
            </Link>

            <Link
              href="/cart"
              className="cartBtn"
            >
              Back to Cart
            </Link>
          </div>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .page {
          min-height: 100vh;

          background: #f5f5eb;

          display: flex;

          align-items: center;

          justify-content: center;

          padding: 40px 20px;
        }

        .card {
          width: 100%;

          max-width: 520px;

          background: rgba(
            255,
            255,
            255,
            0.9
          );

          border-radius: 24px;

          padding: 42px 34px;

          text-align: center;

          border: 1px solid rgba(
            122,
            31,
            31,
            0.08
          );

          box-shadow: 0 12px 30px rgba(
            122,
            31,
            31,
            0.08
          );
        }

        .icon {
          font-size: 62px;

          margin-bottom: 20px;
        }

        h1 {
          font-size: 36px;

          font-weight: 900;

          color: #7a1f1f;

          margin-bottom: 14px;
        }

        p {
          font-size: 16px;

          line-height: 1.7;

          color: #1c1c1c;

          margin-bottom: 10px;
        }

        .subtext {
          color: rgba(0, 0, 0, 0.6);

          margin-bottom: 28px;
        }

        .actions {
          display: flex;

          gap: 14px;

          justify-content: center;

          flex-wrap: wrap;
        }

        .retryBtn,
        .cartBtn {
          padding: 14px 22px;

          border-radius: 14px;

          font-weight: 800;

          text-decoration: none;

          transition: all 0.2s ease;
        }

        .retryBtn {
          background: #7a1f1f;

          color: white;

          box-shadow: 0 10px 22px rgba(
            122,
            31,
            31,
            0.2
          );
        }

        .retryBtn:hover {
          background: #641919;
        }

        .cartBtn {
          border: 1px solid rgba(
            122,
            31,
            31,
            0.16
          );

          color: #7a1f1f;

          background: white;
        }

        .cartBtn:hover {
          background: rgba(
            122,
            31,
            31,
            0.04
          );
        }

        @media (max-width: 640px) {
          .card {
            padding: 34px 22px;
          }

          h1 {
            font-size: 30px;
          }

          .actions {
            flex-direction: column;
          }

          .retryBtn,
          .cartBtn {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}

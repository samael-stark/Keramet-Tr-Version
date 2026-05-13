"use client";

import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PaymentFailedPage() {
  return (
    <>
      <Header />

      <main className="page">
        <div className="bgGlow topGlow" />
        <div className="bgGlow bottomGlow" />

        <div className="card">
          <div className="iconWrap">
            <div className="icon">✕</div>
          </div>

          <div className="content">
            <span className="badge">Payment Error</span>

            <h1>Payment Failed</h1>

            <p className="description">
              Unfortunately, your payment could not be completed at this time.
            </p>

            <p className="subtext">
              Please verify your payment details or try another card or payment
              method before attempting again.
            </p>
          </div>

          <div className="actions">
            <Link href="/checkout/review" className="retryBtn">
              Try Again
            </Link>

            <Link href="/cart" className="cartBtn">
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
          padding: 48px 20px;
          position: relative;
          overflow: hidden;
        }

        .bgGlow {
          position: absolute;
          width: 420px;
          height: 420px;
          border-radius: 999px;
          filter: blur(90px);
          opacity: 0.08;
          pointer-events: none;
        }

        .topGlow {
          top: -140px;
          left: -120px;
          background: #7a1f1f;
        }

        .bottomGlow {
          bottom: -160px;
          right: -120px;
          background: #7a1f1f;
        }

        .card {
          width: 100%;
          max-width: 580px;
          position: relative;
          z-index: 2;

          background: rgba(255, 255, 255, 0.82);

          backdrop-filter: blur(18px);

          border: 1px solid rgba(122, 31, 31, 0.08);

          border-radius: 30px;

          padding: 52px 42px;

          text-align: center;

          box-shadow:
            0 10px 30px rgba(122, 31, 31, 0.06),
            0 30px 60px rgba(122, 31, 31, 0.08);
        }

        .iconWrap {
          width: 96px;
          height: 96px;

          margin: 0 auto 28px;

          border-radius: 999px;

          background: rgba(122, 31, 31, 0.08);

          display: flex;
          align-items: center;
          justify-content: center;

          border: 1px solid rgba(122, 31, 31, 0.08);

          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7);
        }

        .icon {
          width: 62px;
          height: 62px;

          border-radius: 999px;

          background: #7a1f1f;

          color: white;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 30px;
          font-weight: 900;

          box-shadow: 0 10px 24px rgba(122, 31, 31, 0.25);
        }

        .content {
          margin-bottom: 34px;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;

          padding: 8px 14px;

          border-radius: 999px;

          background: rgba(122, 31, 31, 0.08);

          color: #7a1f1f;

          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.04em;
          text-transform: uppercase;

          margin-bottom: 18px;
        }

        h1 {
          font-size: 42px;
          line-height: 1.1;
          font-weight: 900;
          color: #7a1f1f;
          margin-bottom: 18px;
        }

        .description {
          font-size: 17px;
          line-height: 1.7;
          color: #1c1c1c;
          margin-bottom: 12px;
        }

        .subtext {
          font-size: 15px;
          line-height: 1.7;
          color: rgba(0, 0, 0, 0.58);
          max-width: 440px;
          margin: 0 auto;
        }

        .actions {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .retryBtn,
        .cartBtn {
          min-width: 190px;

          padding: 15px 22px;

          border-radius: 16px;

          font-weight: 800;

          text-decoration: none;

          transition:
            transform 0.2s ease,
            background 0.2s ease,
            border-color 0.2s ease,
            box-shadow 0.2s ease;
        }

        .retryBtn {
          background: #7a1f1f;
          color: white;

          box-shadow: 0 14px 30px rgba(122, 31, 31, 0.22);
        }

        .retryBtn:hover {
          background: #641919;
          transform: translateY(-2px);
        }

        .cartBtn {
          background: rgba(255, 255, 255, 0.75);

          border: 1px solid rgba(122, 31, 31, 0.12);

          color: #7a1f1f;
        }

        .cartBtn:hover {
          background: rgba(122, 31, 31, 0.04);
          border-color: rgba(122, 31, 31, 0.18);
          transform: translateY(-2px);
        }

        @media (max-width: 640px) {
          .page {
            padding: 34px 16px;
          }

          .card {
            padding: 38px 24px;
            border-radius: 24px;
          }

          .iconWrap {
            width: 82px;
            height: 82px;
            margin-bottom: 24px;
          }

          .icon {
            width: 54px;
            height: 54px;
            font-size: 24px;
          }

          h1 {
            font-size: 34px;
          }

          .description {
            font-size: 15px;
          }

          .subtext {
            font-size: 14px;
          }

          .actions {
            flex-direction: column;
          }

          .retryBtn,
          .cartBtn {
            width: 100%;
            min-width: unset;
          }
        }
      `}</style>
    </>
  );
}

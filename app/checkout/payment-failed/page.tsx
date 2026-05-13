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
              <span>Try Again</span>

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M5 12h14"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            <Link href="/cart" className="cartBtn">
              <span>Back to Cart</span>

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M6 6h15l-1.5 9h-12z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 6L4 3H2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="9" cy="20" r="1" />
                <circle cx="18" cy="20" r="1" />
              </svg>
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
          max-width: 600px;
          position: relative;
          z-index: 2;

          background: rgba(255, 255, 255, 0.82);

          backdrop-filter: blur(18px);

          border: 1px solid rgba(122, 31, 31, 0.08);

          border-radius: 32px;

          padding: 56px 42px;

          text-align: center;

          box-shadow:
            0 10px 30px rgba(122, 31, 31, 0.06),
            0 30px 60px rgba(122, 31, 31, 0.08);
        }

        .iconWrap {
          width: 100px;
          height: 100px;

          margin: 0 auto 30px;

          border-radius: 999px;

          background: rgba(122, 31, 31, 0.08);

          display: flex;
          align-items: center;
          justify-content: center;

          border: 1px solid rgba(122, 31, 31, 0.08);

          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.8),
            0 12px 30px rgba(122, 31, 31, 0.05);
        }

        .icon {
          width: 64px;
          height: 64px;

          border-radius: 999px;

          background: linear-gradient(
            135deg,
            #8d2626,
            #641919
          );

          color: white;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 30px;
          font-weight: 900;

          box-shadow:
            0 14px 30px rgba(122, 31, 31, 0.28),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .content {
          margin-bottom: 38px;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;

          padding: 8px 15px;

          border-radius: 999px;

          background: rgba(122, 31, 31, 0.08);

          color: #7a1f1f;

          font-size: 12px;
          font-weight: 800;

          letter-spacing: 0.05em;
          text-transform: uppercase;

          margin-bottom: 20px;
        }

        h1 {
          font-size: 44px;
          line-height: 1.08;
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

          max-width: 460px;

          margin: 0 auto;
        }

        .actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .retryBtn,
        .cartBtn {
          position: relative;

          min-width: 220px;

          height: 58px;

          border-radius: 18px;

          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;

          text-decoration: none;

          font-size: 15px;
          font-weight: 800;

          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            background 0.25s ease,
            border-color 0.25s ease;
        }

        .retryBtn svg,
        .cartBtn svg {
          width: 18px;
          height: 18px;

          transition: transform 0.25s ease;

          flex-shrink: 0;
        }

        .retryBtn {
          background: linear-gradient(
            135deg,
            #8d2626,
            #641919
          );

          color: white;

          border: 1px solid rgba(255, 255, 255, 0.08);

          box-shadow:
            0 18px 34px rgba(122, 31, 31, 0.26),
            inset 0 1px 0 rgba(255, 255, 255, 0.18);
        }

        .retryBtn:hover {
          transform: translateY(-3px);

          box-shadow:
            0 24px 42px rgba(122, 31, 31, 0.34),
            inset 0 1px 0 rgba(255, 255, 255, 0.18);
        }

        .retryBtn:hover svg {
          transform: translateX(3px);
        }

        .cartBtn {
          background: rgba(255, 255, 255, 0.75);

          color: #7a1f1f;

          border: 1px solid rgba(122, 31, 31, 0.12);

          backdrop-filter: blur(10px);

          box-shadow:
            0 10px 24px rgba(122, 31, 31, 0.06),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }

        .cartBtn:hover {
          transform: translateY(-3px);

          background: rgba(122, 31, 31, 0.05);

          border-color: rgba(122, 31, 31, 0.18);

          box-shadow:
            0 18px 34px rgba(122, 31, 31, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }

        .cartBtn:hover svg {
          transform: scale(1.08);
        }

        @media (max-width: 640px) {
          .page {
            padding: 36px 16px;
          }

          .card {
            padding: 40px 24px;
            border-radius: 26px;
          }

          .iconWrap {
            width: 86px;
            height: 86px;
            margin-bottom: 26px;
          }

          .icon {
            width: 56px;
            height: 56px;
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

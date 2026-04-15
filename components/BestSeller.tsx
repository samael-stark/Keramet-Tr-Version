"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";

type Product = {
  id: string;
  title: string;
  coverUrl: string;
  price: number;
  category?: string;
};

export default function BestSeller({ products }: { products: Product[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [wishlist, setWishlist] = useState<string[]>([]);
  const [currency, setCurrency] = useState("USD");
  const [rates, setRates] = useState<Record<string, number>>({});
  const [ratesLoaded, setRatesLoaded] = useState(false);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    const amount = el.clientWidth * 0.55;

    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    if (stored) setWishlist(JSON.parse(stored));
  }, []);

  useEffect(() => {
    const saved =
      typeof window !== "undefined" ? localStorage.getItem("currency") : null;
    if (saved) setCurrency(saved);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("currency", currency);
    }
  }, [currency]);

  useEffect(() => {
    async function fetchRates() {
      try {
        const res = await fetch("/api/exchange", { cache: "no-store" });
        const data = await res.json();
        setRates(data?.rates || {});
      } catch {
        setRates({});
      } finally {
        setRatesLoaded(true);
      }
    }

    fetchRates();
  }, []);

  const toggleWishlist = (id: string) => {
    let updated: string[];

    if (wishlist.includes(id)) {
      updated = wishlist.filter((x) => x !== id);
    } else {
      updated = [...wishlist, id];
    }

    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  const convertPrice = (usd: number) => {
    if (currency === "USD") return usd;
    const rate = rates[currency];
    if (!rate) return usd;
    return usd * rate;
  };

  const formatPrice = (usd: number) => {
    const value = convertPrice(usd);
    return `${currency} ${value.toFixed(2)}`;
  };

  const saleEndDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 10);

    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
    });
  }, []);

  return (
    <section className="border-t border-gray-200 bg-custom-bg py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-14 text-center">
          <h3 className="text-sm font-medium uppercase tracking-widest text-gray-600">
            Our Top Picks
          </h3>
          <h2 className="mt-2 text-4xl font-extrabold text-custom-accent">
            Our Best Seller
          </h2>
        </div>

        <div className="best-seller-slider relative">
          <button
            onClick={() => scroll("left")}
            className="slider-arrow slider-arrow-left hidden lg:flex"
            aria-label="Scroll best sellers left"
          >
            <FaChevronLeft />
          </button>

          <div
            ref={scrollRef}
            className="no-scrollbar w-full overflow-x-auto scroll-smooth"
          >
            <div className="slider-track">
              {products.map((p) => {
                const isActive = wishlist.includes(p.id);
                const originalPrice =
                  Number(p.price) > 0 ? Number(p.price) / 0.35 : 0;

                return (
                  <Link
                    key={p.id}
                    href={`/products/${p.id}`}
                    className="product-link"
                  >
                    <article className="product-shell">
                      <div className="product-card">
                        <div className="img-wrap">
                          <img
                            src={p.coverUrl}
                            alt={p.title}
                            className="product-image"
                          />

                          <button
                            className={`wish-btn ${isActive ? "active" : ""}`}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleWishlist(p.id);
                            }}
                            aria-label="Add to wishlist"
                            title="Wishlist"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              width="22"
                              height="22"
                              className="heart-svg"
                            >
                              <path
                                d="M11.995 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                                2 5.42 4.42 3 7.5 3
                                c1.74 0 3.41.81 4.5 2.09
                                C13.09 3.81 14.76 3 16.5 3
                                19.58 3 22 5.42 22 8.5
                                c0 3.78-3.4 6.86-8.55 11.54l-1.455 1.31z"
                              />
                            </svg>
                          </button>
                        </div>

                        <div className="product-info">
                          {p.category && (
                            <p className="product-category">{p.category}</p>
                          )}

                          <p className="product-title">{p.title}</p>

                          <div className="price-block">
                            <div className="price-line">
                              <span className="price-current">
                                {ratesLoaded
                                  ? formatPrice(Number(p.price))
                                  : `USD ${Number(p.price).toFixed(2)}`}
                              </span>

                              <span className="price-old">
                                {ratesLoaded
                                  ? formatPrice(originalPrice)
                                  : `USD ${originalPrice.toFixed(2)}`}
                              </span>
                            </div>

                            <p className="sale-note">
                              65% off • Sale ends on {saleEndDate}
                            </p>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => scroll("right")}
            className="slider-arrow slider-arrow-right hidden lg:flex"
            aria-label="Scroll best sellers right"
          >
            <FaChevronRight />
          </button>
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/products"
            className="inline-flex items-center rounded-full border border-custom-accent px-10 py-3 font-semibold text-custom-accent transition-colors hover:bg-custom-accent hover:text-white"
          >
            View All Rugs
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>

      <style jsx>{`
        .best-seller-slider {
          position: relative;
        }

        .slider-track {
          display: grid;
          grid-auto-flow: column;
          grid-auto-columns: 80%;
          gap: 22px;
          padding-bottom: 4px;
        }

        .slider-arrow {
          position: absolute;
          top: 50%;
          z-index: 10;
          width: 48px;
          height: 48px;
          border-radius: 999px;
          border: none;
          background: rgba(255, 255, 255, 0.92);
          color: #7a1f1f;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.14);
          backdrop-filter: blur(8px);
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.25s ease, box-shadow 0.25s ease;
        }

        .slider-arrow:hover {
          background: #fff;
          box-shadow: 0 12px 26px rgba(0, 0, 0, 0.18);
        }

        .slider-arrow-left {
          left: -64px;
          transform: translateY(-50%);
        }

        .slider-arrow-right {
          right: -64px;
          transform: translateY(-50%);
        }

        .product-link {
          text-decoration: none;
          color: inherit;
        }

        .product-shell {
          height: 100%;
          border-radius: 22px;
          transition:
            transform 0.28s ease,
            box-shadow 0.28s ease;
        }

        .product-shell:hover {
          transform: translateY(-6px);
        }

        .product-card {
          background: rgba(255, 255, 255, 0.38);
          border: 1px solid rgba(122, 31, 31, 0.08);
          border-radius: 22px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
          transition:
            box-shadow 0.28s ease,
            border-color 0.28s ease;
        }

        .product-shell:hover .product-card {
          box-shadow: 0 18px 38px rgba(0, 0, 0, 0.09);
          border-color: rgba(122, 31, 31, 0.16);
        }

        .img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          background: #ebe7db;
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.45s ease;
        }

        .product-shell:hover .product-image {
          transform: scale(1.035);
        }

        .wish-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 40px;
          height: 40px;
          border-radius: 999px;
          border: none;
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.16);
          cursor: pointer;
          display: grid;
          place-items: center;
          transition: all 0.25s ease;
        }

        .wish-btn:hover {
          transform: scale(1.1);
        }

        .heart-svg {
          fill: transparent;
          stroke: #222;
          stroke-width: 2;
          transition: all 0.25s ease;
        }

        .wish-btn:hover .heart-svg,
        .wish-btn.active .heart-svg {
          fill: #7a1f1f;
          stroke: #7a1f1f;
        }

        .product-info {
          padding: 16px 16px 18px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .product-category {
          margin: 0;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #9b8f80;
        }

        .product-title {
          margin: 0;
          min-height: 68px;
          line-height: 1.45;
          font-size: 15px;
          font-weight: 500;
          color: #1f1f1f;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .price-block {
          margin-top: 2px;
        }

        .price-line {
          display: flex;
          align-items: baseline;
          gap: 8px;
          flex-wrap: wrap;
        }

        .price-current {
          font-weight: 800;
          color: #7a1f1f;
          font-size: 17px;
          letter-spacing: 0.01em;
          line-height: 1.2;
        }

        .price-old {
          font-size: 13px;
          font-weight: 500;
          color: #8d8479;
          text-decoration: line-through;
          line-height: 1.2;
        }

        .sale-note {
          margin: 3px 0 0;
          font-size: 11px;
          font-weight: 700;
          color: #5e8a1f;
          line-height: 1.45;
        }

        @media (min-width: 640px) {
          .slider-track {
            grid-auto-columns: 48%;
          }
        }

        @media (min-width: 1024px) {
          .slider-track {
            grid-auto-columns: calc((100% - 44px) / 3);
          }
        }

        @media (max-width: 900px) {
          .product-title {
            min-height: 60px;
            font-size: 14px;
          }
        }

        @media (max-width: 560px) {
          .product-info {
            padding: 14px 12px 16px;
          }

          .product-title {
            min-height: 56px;
            font-size: 13.5px;
          }

          .price-current {
            font-size: 15px;
          }

          .price-old {
            font-size: 12px;
          }

          .sale-note {
            font-size: 10px;
          }

          .wish-btn {
            width: 36px;
            height: 36px;
            top: 10px;
            right: 10px;
          }
        }
      `}</style>
    </section>
  );
}

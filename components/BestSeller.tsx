"use client";

import "./BestSeller.css";
import PriceDisplay from "@/components/PriceDisplay";
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

  const saleEndDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 10);

    return date.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
    });
  }, []);

  return (
    <section className="border-t border-gray-200 bg-custom-bg py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-14 text-center">
          <h3 className="text-sm font-medium uppercase tracking-widest text-gray-600">
            Öne Çıkanlar
          </h3>
          <h2 className="mt-2 text-4xl font-extrabold text-custom-accent">
            En Çok Tercih Edilenler
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
  Number(p.price) > 0
    ? Number(p.price) / 0.85
    : 0;

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
                            aria-label="Favorilere Ekle"
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
  <PriceDisplay basePrice={Number(p.price)} />
</span>

<span className="price-old">
  <PriceDisplay basePrice={originalPrice} />
</span>
                            </div>

                            <p className="sale-note">
                             %15 İndirim • Kampanya Bitişi: {saleEndDate}
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
            Tüm Halıları Gör
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>


    </section>
  );
}

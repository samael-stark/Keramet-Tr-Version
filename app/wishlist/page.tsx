"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PriceDisplay from "@/components/PriceDisplay";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";

export default function WishlistPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [toast, setToast] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWishlist() {
      const stored = localStorage.getItem("wishlist");
      const ids: string[] = stored ? JSON.parse(stored) : [];

      setWishlistIds(ids);

      if (!ids.length) {
        setLoading(false);
        return;
      }

      const snap = await getDocs(collection(db, "products"));

      const all = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const filtered = all.filter((p) => ids.includes(p.id));

      setProducts(filtered);
      setLoading(false);
    }

    loadWishlist();
  }, []);

  const removeFromWishlist = (id: string) => {
    const updated = wishlistIds.filter((x) => x !== id);

    setWishlistIds(updated);

    localStorage.setItem("wishlist", JSON.stringify(updated));

    setProducts((prev) => prev.filter((p) => p.id !== id));

    window.dispatchEvent(new Event("wishlistUpdated"));

    setToast(true);

    setTimeout(() => setToast(false), 2000);
  };

  const isEmpty = !loading && products.length === 0;

  return (
    <>
      <Header />

      <main className="wishlist-page">
        <div className="wishlist-wrapper">
          {!isEmpty && (
            <h1 className="wishlist-title">
              Favorilerim
            </h1>
          )}

          {loading ? (
            <div className="loading">
              Favorileriniz yükleniyor...
            </div>
          ) : isEmpty ? (
            <div className="empty-state">
              <h2>Favorileriniz henüz boş.</h2>

              <p>
                Beğendiğiniz halıları favorilerinize ekleyin ve dilediğiniz zaman tekrar inceleyin.
              </p>

              <Link
                href="/products"
                className="shop-link"
              >
                <span className="shop-btn">
                  Halıları İncele
                </span>
              </Link>
            </div>
          ) : (
            <div className="wishlist-grid">
              {products.map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.id}`}
                  className="card-link"
                >
                  <article className="wishlist-card">
                    <div className="img-wrap">
                      <img
                        src={p.coverUrl}
                        alt={p.title}
                      />

                      <button
                        className="wish-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          removeFromWishlist(p.id);
                        }}
                        aria-label="Favorilerden kaldır"
                        title="Favorilerden kaldır"
                      >
                        <FaHeart />
                      </button>
                    </div>

                    <div className="card-body">
                      {p.category && (
                        <p className="category">
                          {p.category}
                        </p>
                      )}

                      <h4 className="title">
                        {p.title}
                      </h4>

                      <div className="price">
                        <PriceDisplay
                          basePrice={Number(p.price)}
                        />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />

      {toast && (
        <div className="toast">
          Favorilerden kaldırıldı
        </div>
      )}

      <style jsx>{`
        .wishlist-page {
          background: #f5f5eb;
          min-height: 100vh;
        }

        .wishlist-wrapper {
          max-width: 1400px;
          margin: 0 auto;
          padding: 50px 24px 70px;
        }

        .wishlist-title {
          font-size: 40px;
          font-weight: 800;
          color: #7a1f1f;
          margin: 0 0 30px;
        }

        .loading {
          min-height: 50vh;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6f675d;
          font-size: 16px;
          font-weight: 500;
        }

        .empty-state {
  min-height: 65vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
}

        .empty-state h2 {
          margin: 0;
          font-size: 30px;
          font-weight: 800;
          color: #111827;
          letter-spacing: -0.01em;
          line-height: 1.2;
        }

        .empty-state p {
          margin-top: 16px;
          max-width: 520px;
          color: #6f675d;
          font-size: 16px;
          line-height: 1.7;
        }

        .shop-link {
          margin-top: 50px;
          text-decoration: none !important;
          display: inline-block;
        }

        .shop-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 180px;
          padding: 14px 30px;
          background: #7a1f1f;
          color: #ffffff;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.02em;
          transition: all 0.25s ease;
          box-shadow: 0 10px 25px rgba(122, 31, 31, 0.25);
        }

        .shop-link:hover .shop-btn {
          background: #5f1818;
          transform: translateY(-2px);
          box-shadow: 0 14px 30px rgba(122, 31, 31, 0.35);
        }

        .wishlist-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 28px;
        }

        .card-link {
          text-decoration: none;
          color: inherit;
        }

        .wishlist-card {
          background: rgba(255, 255, 255, 0.5);
          border-radius: 20px;
          overflow: hidden;
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .wishlist-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
        }

        .img-wrap {
          position: relative;
          aspect-ratio: 4 / 5;
          background: #ebe7db;
          overflow: hidden;
        }

        .img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .wish-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: white;
          border: none;
          color: #7a1f1f;
          display: grid;
          place-items: center;
          cursor: pointer;
          box-shadow: 0 6px 14px rgba(0, 0, 0, 0.12);
          transition: transform 0.2s ease;
        }

        .wish-btn:hover {
          transform: scale(1.08);
        }

        .card-body {
          padding: 16px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .category {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #9b8f80;
          margin: 0 0 6px;
        }

        .title {
          font-size: 14px;
          min-height: 60px;
          line-height: 1.5;
          margin: 0;
          color: #1f2937;
        }

        .price {
          margin-top: 10px;
          font-weight: 800;
          color: #7a1f1f;
          font-size: 16px;
        }

        .toast {
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          background: #7a1f1f;
          color: white;
          padding: 12px 20px;
          border-radius: 999px;
          z-index: 50;
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.18);
        }

        @media (max-width: 1024px) {
          .wishlist-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .wishlist-wrapper {
            padding: 36px 18px 56px;
          }

          .wishlist-title {
            font-size: 34px;
          }

          .empty-state {
            min-height: 58vh;
          }

          .empty-state h2 {
            font-size: 26px;
          }

          .empty-state p {
            font-size: 15px;
            max-width: 460px;
          }

          .shop-btn {
            min-width: 165px;
            padding: 13px 24px;
            font-size: 14px;
          }
        }

        @media (max-width: 600px) {
          .wishlist-grid {
            gap: 18px;
          }

          .title {
            min-height: 50px;
            font-size: 13px;
          }

          .empty-state h2 {
            font-size: 24px;
          }

          .empty-state p {
            font-size: 14px;
          }
        }
      `}</style>
    </>
  );
}

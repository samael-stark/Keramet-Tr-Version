"use client";

import Header from "@/components/Header";
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

    const updatedProducts = products.filter((p) => p.id !== id);
    setProducts(updatedProducts);

    window.dispatchEvent(new Event("wishlistUpdated"));

    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  return (
    <>
      <Header />

      <div className="wishlist-wrapper">
        <h1 className="wishlist-title">Your Favorites</h1>

        {loading ? null : products.length === 0 ? (
          <div className="empty-state">
            <h2>Nothing here... yet.</h2>
            <p>
              These are a few of your favourite things... or they will be, once
              you favourite something.
            </p>

            {/* ✅ Updated Link with span for underline */}
            <Link href="/products" className="shop-btn">
              <span className="shop-btn-text">Continue Shopping</span>
            </Link>
          </div>
        ) : (
          <div className="wishlist-grid">
            {products.map((p) => (
              <Link key={p.id} href={`/products/${p.id}`}>
                <div className="wishlist-card">
                  <div className="img-wrap">
                    <img src={p.coverUrl} alt={p.title} />

                    <button
                      className="wish-btn active"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        removeFromWishlist(p.id);
                      }}
                    >
                      <FaHeart />
                    </button>
                  </div>

                  <h4>{p.title}</h4>
                  <p className="price">USD {Number(p.price).toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {toast && <div className="toast">Removed from Favorites</div>}

      <style jsx>{`
        .wishlist-wrapper {
          padding: 60px 80px;
        }

        .wishlist-title {
          font-size: 42px;
          font-weight: 800;
          color: #7a1f1f;
          margin-bottom: 40px;
        }

        .wishlist-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 28px;
        }

        .wishlist-card {
          padding: 9px;
          border-radius: 12px;
          cursor: pointer;
          transition:
            box-shadow 0.25s ease,
            transform 0.25s ease;
        }

        .wishlist-card:hover {
          box-shadow:
            0 14px 28px rgba(0, 0, 0, 0.14),
            0 28px 56px rgba(0, 0, 0, 0.1);
          transform: translateY(-3px);
        }

        .img-wrap {
          position: relative;
          width: 100%;
          height: 260px;
          overflow: hidden;
          border-radius: 12px;
        }

        .img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .wish-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 36px;
          height: 36px;
          border-radius: 999px;
          border: none;
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
          font-size: 18px;
          display: grid;
          place-items: center;
          color: #7a1f1f;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .wish-btn:hover {
          transform: scale(1.15);
        }

        .price {
          color: #7a1f1f;
          font-weight: 700;
          margin-top: 4px;
        }

        .empty-state {
          text-align: center;
          margin-top: 120px;
        }

        .empty-state h2 {
          font-size: 28px;
          margin-bottom: 12px;
          font-weight: 700;
        }

        .empty-state p {
          color: #666;
          max-width: 480px;
          margin: 0 auto 24px;
          line-height: 1.6;
        }

        .shop-btn {
          display: inline-block;
          padding: 12px 22px;
          background: #7a1f1f;
          color: white;
          border-radius: 8px;
          font-weight: 600;
        }

        /* ✅ This underline WILL work */
        .shop-btn-text {
          text-decoration: underline !important;
        }

        .toast {
          position: fixed;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          background: #7a1f1f;
          color: white;
          padding: 14px 28px;
          border-radius: 8px;
          font-weight: 600;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
          z-index: 2000;
        }

        @media (max-width: 1024px) {
          .wishlist-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .wishlist-wrapper {
            padding: 40px 30px;
          }
        }
      `}</style>
    </>
  );
}

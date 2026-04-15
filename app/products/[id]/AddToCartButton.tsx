"use client";

import { useState } from "react";
import { addToCart } from "@/lib/cart";

export default function AddToCartButton({ productId }: { productId: string }) {
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addToCart(productId, 1);

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <>
      <button className={`add-to-cart ${added ? "added" : ""}`} onClick={handleClick}>
        {added ? "Added ✓" : "Add to Cart"}
      </button>

      <style jsx>{`
        .add-to-cart {
          width: 100%;
          background: #7a1f1f;
          color: #fff;
          border: none;
          padding: 16px 18px;
          border-radius: 16px;
          font-weight: 800;
          font-size: 15px;
          letter-spacing: 0.01em;
          cursor: pointer;
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            background 0.25s ease;
          box-shadow: 0 12px 26px rgba(122, 31, 31, 0.22);
        }

        .add-to-cart:hover {
          box-shadow: 0 16px 30px rgba(122, 31, 31, 0.28);
          transform: translateY(-2px);
        }

        .add-to-cart.added {
          background: #2e7d4e;
          box-shadow: 0 12px 26px rgba(46, 125, 78, 0.24);
        }

        @media (max-width: 640px) {
          .add-to-cart {
            padding: 15px 16px;
            border-radius: 14px;
            font-size: 14px;
          }
        }
      `}</style>
    </>
  );
}

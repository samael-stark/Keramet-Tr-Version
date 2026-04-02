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
      <button className="add-to-cart" onClick={handleClick}>
        {added ? "Added ✓" : "Add to Cart"}
      </button>

      <style jsx>{`
        .add-to-cart {
          margin-top: 24px;
          width: 100%;
          background: #7a1f1f;
          color: #fff;
          border: none;
          padding: 14px;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .add-to-cart:hover {
          box-shadow: 0 10px 22px rgba(122, 31, 31, 0.25);
          transform: translateY(-2px);
        }
      `}</style>
    </>
  );
}

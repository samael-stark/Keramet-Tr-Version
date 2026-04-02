"use client";

import { useState, useRef, useEffect } from "react";

export default function ProductGallery({
  images,
  title,
  productId, // 🔥 ADD THIS PROP
}: {
  images: string[];
  title: string;
  productId: string; // 🔥 ADD THIS TYPE
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const touchStartX = useRef<number | null>(null);

  /* ===================== LOAD WISHLIST STATE ===================== */

  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    const ids: string[] = stored ? JSON.parse(stored) : [];

    if (ids.includes(productId)) {
      setIsWishlisted(true);
    }
  }, [productId]);

  const toggleWishlist = () => {
    const stored = localStorage.getItem("wishlist");
    let ids: string[] = stored ? JSON.parse(stored) : [];

    if (ids.includes(productId)) {
      ids = ids.filter((x) => x !== productId);
      setIsWishlisted(false);
    } else {
      ids.push(productId);
      setIsWishlisted(true);
    }

    localStorage.setItem("wishlist", JSON.stringify(ids));

    // 🔥 Notify header to update count
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  if (!images || images.length === 0) return null;

  const nextImage = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  /* ===================== MOBILE SWIPE ===================== */

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;

    const diff = touchStartX.current - e.changedTouches[0].clientX;

    if (diff > 50) nextImage();
    else if (diff < -50) prevImage();

    touchStartX.current = null;
  };

  return (
    <>
      {/* ================= THUMBNAILS ================= */}
      <div className="thumbs">
        {images.map((src, i) => (
          <div
            key={i}
            className={`thumb ${i === activeIndex ? "active" : ""}`}
            onClick={() => setActiveIndex(i)}
          >
            <img src={src} alt="thumb" />
          </div>
        ))}
      </div>

      {/* ================= MAIN IMAGE ================= */}
      <div
        className="main-image-wrapper"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={images[activeIndex]}
          alt={title}
          className="main-image"
          onClick={() => setIsZoomOpen(true)}
        />

        {/* ❤️ Wishlist Icon */}
        <button
          className={`heart-btn ${isWishlisted ? "active" : ""}`}
          onClick={toggleWishlist}
          aria-label="Add to wishlist"
          title="Wishlist"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" className="heart-svg">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
             2 5.42 4.42 3 7.5 3
             c1.74 0 3.41.81 4.5 2.09
             C13.09 3.81 14.76 3 16.5 3
             19.58 3 22 5.42 22 8.5
             c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </button>

        {/* Desktop Arrows */}
        <button className="arrow left" onClick={prevImage}>
          ‹
        </button>

        <button className="arrow right" onClick={nextImage}>
          ›
        </button>
      </div>

      {/* ================= FULLSCREEN PREVIEW ================= */}
      {isZoomOpen && (
        <div
          className="zoom-overlay"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button className="close-btn" onClick={() => setIsZoomOpen(false)}>
            ✕
          </button>

          <button className="arrow left" onClick={prevImage}>
            ‹
          </button>

          <img src={images[activeIndex]} alt={title} className="zoom-image" />

          <button className="arrow right" onClick={nextImage}>
            ›
          </button>
        </div>
      )}

      {/* ================= STYLES ================= */}
      <style jsx>{`
        .thumbs {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .thumb {
          width: 90px;
          height: 90px;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          border: 2px solid transparent;
        }

        .thumb.active {
          border-color: #7a1f1f;
        }

        .thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .main-image-wrapper {
          position: relative;
          width: 100%;
          height: 700px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .main-image {
          max-width: 100%;
          max-height: 700px;
          object-fit: contain;
          cursor: pointer;
        }

        .heart-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: none;
          background: #fff;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          cursor: pointer;
          z-index: 3;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }

        .heart-svg {
          fill: transparent;
          stroke: #222;
          stroke-width: 2;
          transition: all 0.25s ease;
        }

        .heart-btn:hover .heart-svg {
          fill: #7a1f1f;
          stroke: #7a1f1f;
        }

        .heart-btn.active .heart-svg {
          fill: #7a1f1f;
          stroke: #7a1f1f;
        }

        .arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: none;
          background: #fff;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          font-size: 28px;
          cursor: pointer;
          z-index: 2;
        }

        .arrow.left {
          left: 20px;
        }
        .arrow.right {
          right: 20px;
        }

        .zoom-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .zoom-image {
          max-width: 90%;
          max-height: 90%;
          object-fit: contain;
        }

        .close-btn {
          position: absolute;
          top: 30px;
          right: 30px;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: none;
          background: #fff;
          font-size: 18px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 1100px) {
          .thumbs {
            flex-direction: row;
            overflow-x: auto;
          }

          .main-image-wrapper {
            height: 500px;
          }

          .arrow {
            display: none;
          }
        }
      `}</style>
    </>
  );
}

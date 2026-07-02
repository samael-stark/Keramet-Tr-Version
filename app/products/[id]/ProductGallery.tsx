"use client";

import { useState, useRef, useEffect } from "react";

export default function ProductGallery({
  images,
  title,
  productId,
}: {
  images: string[];
  title: string;
  productId: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const touchStartX = useRef<number | null>(null);

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
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  if (!images || images.length === 0) return null;

  const nextImage = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

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
      <div className="gallery-shell">
        {/* ================= THUMBNAILS ================= */}
        <div className="thumbs">
          {images.map((src, i) => (
            <div
              key={i}
              className={`thumb ${i === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(i)}
            >
             <img src={src} alt={`${title} küçük görsel ${i + 1}`} />
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

          <button
            className={`heart-btn ${isWishlisted ? "active" : ""}`}
            onClick={toggleWishlist}
          aria-label="Favorilere Ekle"
title="Favorilere Ekle"
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

          <button className="arrow left" onClick={prevImage} aria-label="Önceki Görsel">
            ‹
          </button>

          <button className="arrow right" onClick={nextImage}aria-label="Sonraki Görsel">
            ›
          </button>
        </div>
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

          <button className="arrow left" onClick={prevImage} aria-label="Previous image">
            ‹
          </button>

          <img src={images[activeIndex]} alt={title} className="zoom-image" />

          <button className="arrow right" onClick={nextImage} aria-label="Next image">
            ›
          </button>
        </div>
      )}

      <style jsx>{`
        .gallery-shell {
          display: grid;
          grid-template-columns: 96px 1fr;
          gap: 18px;
          align-items: start;
        }

        .thumbs {
          display: flex;
          flex-direction: column;
          gap: 12px;
          position: sticky;
          top: 24px;
        }

        .thumb {
          width: 96px;
          height: 96px;
          border-radius: 18px;
          overflow: hidden;
          cursor: pointer;
          border: 1px solid rgba(122, 31, 31, 0.08);
          background: rgba(255, 255, 255, 0.65);
          transition:
            transform 0.25s ease,
            border-color 0.25s ease,
            box-shadow 0.25s ease,
            opacity 0.25s ease;
          opacity: 0.82;
        }

        .thumb:hover {
          transform: translateY(-2px);
          opacity: 1;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.06);
        }

        .thumb.active {
          border-color: #7a1f1f;
          box-shadow: 0 12px 26px rgba(122, 31, 31, 0.12);
          opacity: 1;
        }

        .thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .main-image-wrapper {
          position: relative;
          width: 100%;
          min-height: 700px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 30px;
          background: rgba(255, 255, 255, 0.62);
          border: 1px solid rgba(122, 31, 31, 0.08);
          box-shadow: 0 16px 42px rgba(0, 0, 0, 0.05);
          overflow: hidden;
          backdrop-filter: blur(8px);
          padding: 22px;
        }

        .main-image {
          max-width: 100%;
          max-height: 650px;
          object-fit: contain;
          cursor: zoom-in;
          transition: transform 0.35s ease;
        }

        .main-image:hover {
          transform: scale(1.015);
        }

        .heart-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1px solid rgba(122, 31, 31, 0.08);
          background: rgba(255, 255, 255, 0.96);
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
          cursor: pointer;
          z-index: 3;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            background 0.25s ease;
        }

        .heart-btn:hover {
          transform: scale(1.06);
          box-shadow: 0 14px 30px rgba(0, 0, 0, 0.16);
        }

        .heart-svg {
          fill: transparent;
          stroke: #222;
          stroke-width: 2;
          transition: all 0.25s ease;
        }

        .heart-btn:hover .heart-svg,
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
          border: 1px solid rgba(122, 31, 31, 0.08);
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
          font-size: 28px;
          cursor: pointer;
          z-index: 2;
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            background 0.25s ease;
        }

        .arrow:hover {
          transform: translateY(-50%) scale(1.05);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.16);
          background: #fff;
        }

        .arrow.left {
          left: 18px;
        }

        .arrow.right {
          right: 18px;
        }

        .zoom-overlay {
          position: fixed;
          inset: 0;
          background: rgba(20, 15, 12, 0.94);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 24px;
        }

        .zoom-image {
          max-width: 90%;
          max-height: 90%;
          object-fit: contain;
        }

        .close-btn {
          position: absolute;
          top: 26px;
          right: 26px;
          width: 46px;
          height: 46px;
          border-radius: 50%;
          border: none;
          background: #fff;
          font-size: 18px;
          cursor: pointer;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
          transition: transform 0.2s ease;
        }

        .close-btn:hover {
          transform: scale(1.05);
        }

        @media (max-width: 1100px) {
          .gallery-shell {
            grid-template-columns: 1fr;
          }

          .thumbs {
            flex-direction: row;
            overflow-x: auto;
            position: static;
            order: 2;
            padding-bottom: 4px;
          }

          .thumb {
            width: 84px;
            height: 84px;
            flex: 0 0 auto;
            border-radius: 16px;
          }

          .main-image-wrapper {
            min-height: 540px;
            order: 1;
          }

          .arrow {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .gallery-shell {
            gap: 14px;
          }

          .main-image-wrapper {
            min-height: 400px;
            border-radius: 22px;
            padding: 16px;
          }

          .main-image {
            max-height: 360px;
          }

          .heart-btn {
            width: 42px;
            height: 42px;
            top: 14px;
            right: 14px;
          }

          .thumb {
            width: 74px;
            height: 74px;
            border-radius: 14px;
          }

          .zoom-image {
            max-width: 95%;
            max-height: 82%;
          }

          .close-btn {
            top: 18px;
            right: 18px;
            width: 42px;
            height: 42px;
          }
        }
      `}</style>
    </>
  );
}

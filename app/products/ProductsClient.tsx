"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Product = {
  id: string;
  title: string;
  price: number;
  coverUrl: string;
  size?: string;
  category?: string;
};

/* ===================== SIZE OPTIONS ===================== */

const SIZE_OPTIONS = [
  "9 × 12 ft · 275 × 365 cm",
  "8 × 10 ft · 250 × 300 cm",
  "7 × 10 ft · 200 × 300 cm",
  "6 × 9 ft · 180 × 270 cm",
  "6 × 8 ft · 170 × 240 cm",
  "5 × 7 ft · 150 × 200 cm",
  "5 × 6 ft · 150 × 180 cm",
  "4 × 6 ft · 120 × 180 cm",
  "3 × 5 ft · 100 × 150 cm",
  "3 × 4 ft · 80 × 120 cm",
  "2 × 3 ft · 60 × 90 cm",
];
const COLLECTION_OPTIONS = [
  "Mamluk",
  " Bidjar",
  "Serapi",
  "Pazyryk",
  "Gabbeh",
  "Bakhtiari",
  "Striped",
  "Kazak",
  "Tree of Life",
  "Khal Muhammadi",
  "Belgic",
  "Kilim",
  "Runner",
  "Persian",
  "Waziri",
  "Sickle Leaf",
  "Karakul",
  "⁠Pictorial Birds",
  "⁠Suzani",
  "⁠OverDye",
];

const SIZE_LABEL_TO_DB: Record<string, string> = {
  "9 × 12 ft · 275 × 365 cm": "9 ft x 12 ft",
  "8 × 10 ft · 250 × 300 cm": "8 ft x 10 ft",
  "7 × 10 ft · 200 × 300 cm": "7 ft x 10 ft",
  "6 × 9 ft · 180 × 270 cm": "6 ft x 9 ft",
  "6 × 8 ft · 170 × 240 cm": "6 ft x 8 ft",
  "5 × 7 ft · 150 × 200 cm": "5 ft x 7 ft",
  "5 × 6 ft · 150 × 180 cm": "5 ft x 6 ft",
  "4 × 6 ft · 120 × 180 cm": "4 ft x 6 ft",
  "3 × 5 ft · 100 × 150 cm": "3 ft x 5 ft",
  "3 × 4 ft · 80 × 120 cm": "3 ft x 4 ft",
  "2 × 3 ft · 60 × 90 cm": "2 ft x 3 ft",
};

const PRODUCTS_PER_PAGE = 20;

export default function ProductsClient({ products }: { products: Product[] }) {
  const [showSizes, setShowSizes] = useState(false);
  const [showCollections, setShowCollections] = useState(false);

  const [query, setQuery] = useState("");
  const [selectedCollection, setSelectedCollection] = useState<string>("");

  const [selectedSizeLabel, setSelectedSizeLabel] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // wishlist (save IDs only)
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    if (stored) {
      setWishlist(JSON.parse(stored));
    }
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

    // 🔥 IMPORTANT: notify Header
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  // ===================== CURRENCY (USD base) =====================
  const [currency, setCurrency] = useState<string>("USD");
  const [rates, setRates] = useState<Record<string, number>>({});
  const [ratesLoaded, setRatesLoaded] = useState(false);

  useEffect(() => {
    // keep user's last choice
    const saved =
      typeof window !== "undefined" ? localStorage.getItem("currency") : null;
    if (saved) setCurrency(saved);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined")
      localStorage.setItem("currency", currency);
  }, [currency]);

  useEffect(() => {
    async function fetchRates() {
      try {
        // NOTE: create /api/exchange route as discussed (base USD)
        const res = await fetch("/api/exchange", { cache: "no-store" });
        const data = await res.json();
        setRates(data?.rates || {});
      } catch (e) {
        // keep USD if rates fail
        setRates({});
      } finally {
        setRatesLoaded(true);
      }
    }

    fetchRates();
  }, []);

  const convertPrice = (usd: number) => {
    if (currency === "USD") return usd;
    const rate = rates[currency];
    if (!rate) return usd;
    return usd * rate;
  };

  const formatPrice = (usd: number) => {
    const value = convertPrice(usd);
    // light formatting, keeps your UI style the same (just swaps label/value)
    return `${currency} ${value.toFixed(2)}`;
  };

  /* ===================== FILTER ===================== */

  const filteredProducts = products.filter((p) => {
    const matchesSearch = (p.title || "")
      .toLowerCase()
      .includes(query.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedCollection) {
      if ((p.category || "").trim() !== selectedCollection) return false;
    }

    if (selectedSizeLabel) {
      const expectedSize = SIZE_LABEL_TO_DB[selectedSizeLabel];
      if ((p.size || "").trim() !== expectedSize) return false;
    }

    if (selectedSizeLabel) {
      const expectedSize = SIZE_LABEL_TO_DB[selectedSizeLabel];
      if ((p.size || "").trim() !== expectedSize) return false;
    }

    return true;
  });

  /* ===================== PAGINATION ===================== */

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [query, selectedCollection, selectedSizeLabel]);

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE,
  );

  /* ===================== ACTIVE STATES ===================== */

  return (
    <div className="layout-wrapper">
      {/* ================= MOBILE FILTER BUTTON ================= */}
      <button
        className="mobile-filter-btn"
        onClick={() => setIsFilterOpen(true)}
      >
        ☰ Filters
      </button>

      {/* ================= SIDEBAR ================= */}
      <aside className={`sidebar ${isFilterOpen ? "open" : ""}`}>
        <button className="close-drawer" onClick={() => setIsFilterOpen(false)}>
          ✕
        </button>

        {/* All Products */}
        <div
          onClick={() => {
            setSelectedCollection("");
            setSelectedSizeLabel("");
          }}
          className={`filter-item ${
            !selectedCollection && !selectedSizeLabel ? "active" : ""
          }`}
        >
          All Products
        </div>

        {/* Shop by Size */}
        <div
          className="filter-item filter-toggle"
          style={{ marginTop: 18 }}
          onClick={() => {
            setShowSizes((prev) => !prev);
            setShowCollections(false);
          }}
        >
          <span>Shop by Size</span>
          <span className={`arrow ${showSizes ? "open" : ""}`} />
        </div>

        {showSizes && (
          <div className="size-list">
            {SIZE_OPTIONS.map((label) => {
              const active = selectedSizeLabel === label;
              return (
                <span
                  key={label}
                  onClick={() => {
                    setSelectedSizeLabel(active ? "" : label);
                    setSelectedCollection("");
                  }}
                  className={active ? "active" : ""}
                >
                  {label}
                </span>
              );
            })}
          </div>
        )}

        {/* Shop by Collection */}
        <div
          className="filter-item filter-toggle"
          style={{ marginTop: 18 }}
          onClick={() => {
            setShowCollections((prev) => !prev);
            setShowSizes(false);
          }}
        >
          <span>Shop by Collection</span>
          <span className={`arrow ${showCollections ? "open" : ""}`} />
        </div>

        {showCollections && (
          <div className="size-list">
            {COLLECTION_OPTIONS.map((collection) => {
              const active = selectedCollection === collection;
              return (
                <span
                  key={collection}
                  onClick={() => {
                    setSelectedCollection(active ? "" : collection);
                    setSelectedSizeLabel("");
                  }}
                  className={active ? "active" : ""}
                >
                  {collection}
                </span>
              );
            })}
          </div>
        )}
      </aside>

      {/* ================= RIGHT CONTENT ================= */}
      <div className="content">
        <div className="topbar">
          <h2 className="mobile-heading">All items</h2>

          {/* right side controls (keeps layout: still right-aligned block) */}
          <div className="topbar-controls">
            <div className="search">
              <input
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              <svg
                className="search-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>

            {/* Currency selector (USD primary, TRY included) */}
            <div className="currency">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                aria-label="Currency"
                title="Currency"
              >
                <option value="USD">USD $</option>
                <option value="TRY">TRY ₺</option>
                <option value="EUR">EUR €</option>
                <option value="GBP">GBP £</option>
                <option value="AED">AED د.إ</option>
              </select>
            </div>
          </div>
        </div>

        <div className="product-grid">
          {paginatedProducts.map((p) => {
            const isActive = wishlist.includes(p.id);

            return (
              <Link key={p.id} href={`/products/${p.id}`}>
                <div className="product-shell">
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
                        {" "}
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
                        </svg>{" "}
                      </button>
                    </div>

                    <div className="product-info">
                      <p>{p.title}</p>

                      {/* If rates aren't loaded yet, still shows USD (no UI shift) */}
                      <p className="price">
                        {ratesLoaded
                          ? formatPrice(Number(p.price))
                          : `USD ${Number(p.price).toFixed(2)}`}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* ================= PAGINATION ================= */}
        {totalPages > 1 && (
          <div className="pagination-wrapper">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="page-btn"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`page-btn ${
                    page === currentPage ? "active-page" : ""
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="page-btn"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {isFilterOpen && (
        <div
          className="drawer-overlay"
          onClick={() => setIsFilterOpen(false)}
        />
      )}

      {/* ================= STYLES ================= */}
      <style jsx>{`
        .layout-wrapper {
          display: flex;
          gap: 40px;
        }

        .filter-toggle {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .arrow {
          width: 6px;
          height: 6px;
          border-right: 2px solid #222;
          border-bottom: 2px solid #222;
          transform: rotate(45deg);
          transition: transform 0.2s ease;
          margin-left: 6px;
        }

        .arrow.open {
          transform: rotate(-135deg);
        }

        .sidebar {
          width: 260px;
          flex-shrink: 0;
        }

        .filter-item {
          cursor: pointer;
          margin-bottom: 12px;
          font-size: 14px;
        }

        .filter-item.active,
        .size-list span.active {
          color: #7a1f1f;
          font-weight: 700;
        }

        .size-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 20px;
        }

        .size-list span {
          cursor: pointer;
          font-size: 14px;
        }

        .content {
          flex: 1;
        }

        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .topbar h2 {
          color: #7a1f1f;
          font-size: 24px;
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        /* keeps your right side in one block like before */
        .topbar-controls {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .search {
          position: relative; /* ADD THIS */
          background: #ececec;
          border-radius: 999px;
          padding: 8px 14px;
          width: 260px;
        }

        .search input {
          width: 100%;
          border: none;
          background: transparent;
          outline: none;
          padding-right: 28px; /* ADD THIS */
        }
        .search-icon {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          width: 16px;
          height: 16px;
          opacity: 0.6;
          pointer-events: none;
        }

        /* currency selector styled to match your UI */
        .currency select {
          height: 38px;
          padding: 0 12px;
          border-radius: 999px;
          border: 1px solid #ddd;
          background: #fff;
          font-weight: 600;
          cursor: pointer;
          outline: none;
          color: #7a1f1f;
        }
        .currency select:focus {
          border-color: #7a1f1f;
          box-shadow: 0 0 0 2px rgba(122, 31, 31, 0.15);
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 24px;
        }

        /* ✅ hover shadow restored (your old behavior) */
        .product-shell {
          padding: 9px;
          border-radius: 12px;
          cursor: pointer;
          transition:
            box-shadow 0.25s ease,
            transform 0.25s ease;
        }

        .product-shell:hover {
          box-shadow:
            0 14px 28px rgba(0, 0, 0, 0.14),
            0 28px 56px rgba(0, 0, 0, 0.1);
          transform: translateY(-3px);
        }
        .heart-svg {
          fill: transparent;
          stroke: #222;
          stroke-width: 2;
          transition: all 0.25s ease;
        }

        .wish-btn:hover .heart-svg {
          fill: #7a1f1f;
          stroke: #7a1f1f;
        }

        .wish-btn.active .heart-svg {
          fill: #7a1f1f;
          stroke: #7a1f1f;
        }

        .product-card {
          background: #f5f5eb;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .img-wrap {
          position: relative;
          width: 100%;
          height: 240; /* fixed height for ALL images */
          overflow: hidden;
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover; /* crops evenly */
          display: block;
        }

        /* ✅ wishlist icon (kept as you had it) */
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
          font-size: 26px;
          cursor: pointer;
          display: grid;
          place-items: center;
          color: #222;
          transition: all 0.25s ease;
        }

        .wish-btn:hover {
          transform: scale(1.15);
          color: #7a1f1f;
        }

        .wish-btn.active {
          color: #7a1f1f;
        }

        .product-info {
          padding: 12px;
        }

        .price {
          font-weight: 700;
          color: #7a1f1f;
        }

        .pagination-wrapper {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 40px;
          flex-wrap: wrap;
        }

        .page-btn {
          padding: 10px 16px;
          border-radius: 12px;
          border: 1px solid #ddd;
          background: #f3f3f3;
          cursor: pointer;
          font-weight: 600;
        }

        .active-page {
          background: #7a1f1f;
          color: white;
          border-color: #7a1f1f;
        }

        .mobile-filter-btn {
          display: none;
        }

        .drawer-overlay {
          display: none;
        }

        /* ✅ IMPORTANT: close button must NOT show on desktop */
        .close-drawer {
          display: none;
        }

        @media (max-width: 900px) {
          .layout-wrapper {
            flex-direction: column;
          }
          @media (max-width: 900px) {
            .topbar h2 {
              font-size: 27px;
              font-weight: 700;
            }
          }

          .topbar {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }

          /* Make topbar behave like vertical stack */
          .topbar-controls {
            display: flex;
            flex-direction: column;
            gap: 12px;
            order: 1;
          }

          /* Search first */
          .search {
            width: 100%;
            order: 1;
          }

          /* Currency second */
          .currency {
            width: 100%;
            order: 2;
          }

          .currency select {
            width: 100%;
          }

          /* Move heading BELOW controls */
          .mobile-heading {
            order: 3;
            margin-top: 6px;
          }

          .topbar {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .topbar-controls {
            width: 100%;
            flex-direction: column;
            gap: 10px;
          }

          .search {
            width: 100%;
          }

          .currency {
            width: 100%;
          }

          .currency select {
            width: 100%;
          }

          .mobile-filter-btn {
            display: block;
            margin-bottom: -30px;
            background: #7a1f1f;
            color: white;
            border: none;
            padding: 8px 14px;
            border-radius: 10px;
          }

          .sidebar {
            position: fixed;
            top: 0;
            left: -100%;
            height: 100vh;
            width: 280px;
            background: #f5f5eb;
            padding: 20px;
            z-index: 1000;
            overflow-y: auto;
            transition: left 0.3s ease;
          }

          .sidebar.open {
            left: 0;
          }

          .drawer-overlay {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.4);
            z-index: 999;
          }

          .product-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          /* show close ONLY in mobile drawer */
          .close-drawer {
            display: inline-block;
            margin-bottom: 14px;
            background: transparent;
            border: none;
            font-size: 22px;
            cursor: pointer;
          }
        }
      `}</style>
    </div>
  );
}

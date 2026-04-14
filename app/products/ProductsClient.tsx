"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Product = {
  id: string;
  title: string;
  price: number;
  coverUrl: string;
  size?: string;
  category?: string;
};

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
  "Bidjar",
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
  "Pictorial Birds",
  "Suzani",
  "OverDye",
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
  const searchParams = useSearchParams();

  const [showSizes, setShowSizes] = useState(false);
  const [showCollections, setShowCollections] = useState(false);

  const [query, setQuery] = useState("");
  const [selectedCollection, setSelectedCollection] = useState("");
  const [selectedSizeLabel, setSelectedSizeLabel] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    if (stored) setWishlist(JSON.parse(stored));
  }, []);

  useEffect(() => {
    const categoryFromURL = searchParams.get("category");

    if (categoryFromURL) {
      setSelectedCollection(categoryFromURL);
      setShowCollections(true);
      setShowSizes(false);
    } else {
      setSelectedCollection("");
    }
  }, [searchParams]);

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

  const [currency, setCurrency] = useState("USD");
  const [rates, setRates] = useState<Record<string, number>>({});
  const [ratesLoaded, setRatesLoaded] = useState(false);

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

    return true;
  });

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [query, selectedCollection, selectedSizeLabel]);

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE,
  );

  const hasActiveFilters = !!selectedCollection || !!selectedSizeLabel || !!query;

  return (
    <div className="shop-shell">
      <div className="layout-wrapper">
        <aside className={`sidebar ${isFilterOpen ? "open" : ""}`}>
          <div className="sidebar-head">
            <h3>Browse</h3>
            <button
              className="close-drawer"
              onClick={() => setIsFilterOpen(false)}
              aria-label="Close filters"
            >
              ✕
            </button>
          </div>

          <button
            onClick={() => {
              setSelectedCollection("");
              setSelectedSizeLabel("");
              setQuery("");
            }}
            className={`all-products-btn ${
              !selectedCollection && !selectedSizeLabel && !query ? "active" : ""
            }`}
          >
            All Products
          </button>

          <div className="filter-block">
            <button
              className="filter-toggle"
              onClick={() => {
                setShowSizes((prev) => !prev);
                setShowCollections(false);
              }}
            >
              <span>Shop by Size</span>
              <span className={`arrow ${showSizes ? "open" : ""}`} />
            </button>

            {showSizes && (
              <div className="filter-list">
                {SIZE_OPTIONS.map((label) => {
                  const active = selectedSizeLabel === label;

                  return (
                    <button
                      key={label}
                      onClick={() => {
                        setSelectedSizeLabel(active ? "" : label);
                        setSelectedCollection("");
                      }}
                      className={`filter-chip ${active ? "active" : ""}`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="filter-block">
            <button
              className="filter-toggle"
              onClick={() => {
                setShowCollections((prev) => !prev);
                setShowSizes(false);
              }}
            >
              <span>Shop by Collection</span>
              <span className={`arrow ${showCollections ? "open" : ""}`} />
            </button>

            {showCollections && (
              <div className="filter-list">
                {COLLECTION_OPTIONS.map((collection) => {
                  const active = selectedCollection === collection;

                  return (
                    <button
                      key={collection}
                      onClick={() => {
                        setSelectedCollection(active ? "" : collection);
                        setSelectedSizeLabel("");
                      }}
                      className={`filter-chip ${active ? "active" : ""}`}
                    >
                      {collection}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </aside>

        <div className="content">
          <div className="topbar">
            <div className="topbar-left">
              <h2 className="page-title">
                {selectedCollection ? `${selectedCollection} Rugs` : "All Rugs"}
              </h2>

              <button
                className="mobile-filter-btn"
                onClick={() => setIsFilterOpen(true)}
              >
                Filters
              </button>
            </div>

            <div className="topbar-controls">
              <div className="search">
                <input
                  placeholder="Search rugs"
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

          {hasActiveFilters && (
            <div className="active-filters">
              {query && (
                <span className="active-pill">
                  Search: {query}
                  <button onClick={() => setQuery("")}>×</button>
                </span>
              )}

              {selectedSizeLabel && (
                <span className="active-pill">
                  {selectedSizeLabel}
                  <button onClick={() => setSelectedSizeLabel("")}>×</button>
                </span>
              )}

              {selectedCollection && (
                <span className="active-pill">
                  {selectedCollection}
                  <button onClick={() => setSelectedCollection("")}>×</button>
                </span>
              )}
            </div>
          )}

          <div className="product-grid">
            {paginatedProducts.map((p) => {
              const isActive = wishlist.includes(p.id);

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
                        {p.category && <p className="product-category">{p.category}</p>}
                        <p className="product-title">{p.title}</p>
                        <p className="price">
                          {ratesLoaded
                            ? formatPrice(Number(p.price))
                            : `USD ${Number(p.price).toFixed(2)}`}
                        </p>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>

          {filteredProducts.length === 0 && (
            <div className="empty-state">
              <h3>No products found</h3>
              <p>Try a different search or remove filters.</p>
            </div>
          )}

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
      </div>

      {isFilterOpen && (
        <div
          className="drawer-overlay"
          onClick={() => setIsFilterOpen(false)}
        />
      )}

      <style jsx>{`
        .shop-shell {
          width: 100%;
        }

        .layout-wrapper {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 44px;
          align-items: start;
        }

        .sidebar {
          position: sticky;
          top: 24px;
          align-self: start;
          background: rgba(255, 255, 255, 0.45);
          border: 1px solid rgba(122, 31, 31, 0.08);
          border-radius: 24px;
          padding: 24px 20px;
          backdrop-filter: blur(10px);
        }

        .sidebar-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
        }

        .sidebar-head h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 700;
          color: #7a1f1f;
          letter-spacing: 0.02em;
        }

        .all-products-btn {
          width: 100%;
          text-align: left;
          border: none;
          background: transparent;
          cursor: pointer;
          font-size: 15px;
          font-weight: 600;
          color: #1f1f1f;
          padding: 12px 14px;
          border-radius: 14px;
          transition: all 0.2s ease;
          margin-bottom: 12px;
        }

        .all-products-btn:hover,
        .all-products-btn.active {
          background: rgba(122, 31, 31, 0.08);
          color: #7a1f1f;
        }

        .filter-block {
          border-top: 1px solid rgba(0, 0, 0, 0.06);
          padding-top: 14px;
          margin-top: 14px;
        }

        .filter-toggle {
          width: 100%;
          border: none;
          background: transparent;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          font-size: 15px;
          font-weight: 600;
          color: #1f1f1f;
          padding: 4px 0;
        }

        .arrow {
          width: 7px;
          height: 7px;
          border-right: 2px solid #222;
          border-bottom: 2px solid #222;
          transform: rotate(45deg);
          transition: transform 0.22s ease;
          margin-left: 10px;
        }

        .arrow.open {
          transform: rotate(-135deg);
        }

        .filter-list {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 14px;
        }

        .filter-chip {
          border: 1px solid rgba(122, 31, 31, 0.14);
          background: rgba(255, 255, 255, 0.75);
          color: #2b2b2b;
          border-radius: 999px;
          padding: 8px 12px;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-chip:hover,
        .filter-chip.active {
          background: #7a1f1f;
          color: white;
          border-color: #7a1f1f;
        }

        .content {
          min-width: 0;
        }

        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 18px;
          margin-bottom: 26px;
        }

        .topbar-left {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        .page-title {
          margin: 0;
          color: #7a1f1f;
          font-size: 38px;
          line-height: 1;
          font-weight: 700;
        }

        .topbar-controls {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }

        .search {
          position: relative;
          width: 300px;
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 999px;
          padding: 12px 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
        }

        .search input {
          width: 100%;
          border: none;
          background: transparent;
          outline: none;
          padding-right: 28px;
          font-size: 14px;
          color: #1f1f1f;
        }

        .search input::placeholder {
          color: #8f8a80;
        }

        .search-icon {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          width: 16px;
          height: 16px;
          opacity: 0.55;
          pointer-events: none;
        }

        .currency select {
          height: 46px;
          padding: 0 14px;
          border-radius: 999px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          background: rgba(255, 255, 255, 0.82);
          font-weight: 700;
          cursor: pointer;
          outline: none;
          color: #7a1f1f;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
        }

        .currency select:focus {
          border-color: #7a1f1f;
          box-shadow: 0 0 0 3px rgba(122, 31, 31, 0.12);
        }

        .active-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 24px;
        }

        .active-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(122, 31, 31, 0.08);
          color: #7a1f1f;
          border: 1px solid rgba(122, 31, 31, 0.12);
          border-radius: 999px;
          padding: 8px 12px;
          font-size: 13px;
          font-weight: 600;
        }

        .active-pill button {
          border: none;
          background: transparent;
          color: #7a1f1f;
          cursor: pointer;
          font-size: 16px;
          line-height: 1;
          padding: 0;
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 28px 22px;
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

        .price {
          margin: 0;
          font-weight: 800;
          color: #7a1f1f;
          font-size: 17px;
          letter-spacing: 0.01em;
        }

        .empty-state {
          margin-top: 30px;
          text-align: center;
          background: rgba(255, 255, 255, 0.45);
          border: 1px solid rgba(122, 31, 31, 0.08);
          border-radius: 24px;
          padding: 44px 24px;
        }

        .empty-state h3 {
          margin: 0 0 10px;
          color: #7a1f1f;
          font-size: 24px;
        }

        .empty-state p {
          margin: 0;
          color: #746c60;
        }

        .pagination-wrapper {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 40px;
          flex-wrap: wrap;
        }

        .page-btn {
          padding: 11px 16px;
          border-radius: 14px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          background: rgba(255, 255, 255, 0.72);
          cursor: pointer;
          font-weight: 700;
          color: #2a2a2a;
          transition: all 0.2s ease;
        }

        .page-btn:hover:not(:disabled) {
          border-color: rgba(122, 31, 31, 0.25);
          color: #7a1f1f;
        }

        .page-btn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
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

        .close-drawer {
          display: none;
          border: none;
          background: transparent;
          font-size: 22px;
          cursor: pointer;
          color: #1f1f1f;
        }

        @media (max-width: 1200px) {
          .product-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        @media (max-width: 900px) {
          .layout-wrapper {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .sidebar {
            position: fixed;
            top: 0;
            left: -100%;
            height: 100vh;
            width: 310px;
            max-width: 88vw;
            background: #f5f5eb;
            border-radius: 0;
            padding: 22px 18px;
            z-index: 1000;
            overflow-y: auto;
            transition: left 0.28s ease;
            box-shadow: 18px 0 40px rgba(0, 0, 0, 0.12);
          }

          .sidebar.open {
            left: 0;
          }

          .sidebar-head {
            margin-bottom: 18px;
          }

          .close-drawer {
            display: inline-block;
          }

          .drawer-overlay {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.38);
            z-index: 999;
          }

          .topbar {
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
          }

          .topbar-left {
            align-items: center;
          }

          .page-title {
            font-size: 30px;
          }

          .mobile-filter-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: #7a1f1f;
            color: white;
            border: none;
            padding: 8px 14px;
            border-radius: 999px;
            font-weight: 700;
            cursor: pointer;
            font-size: 13px;
            box-shadow: 0 8px 20px rgba(122, 31, 31, 0.18);
          }

          .topbar-controls {
            width: 100%;
            flex-direction: column;
            align-items: stretch;
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

          .product-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 20px 16px;
          }

          .product-title {
            min-height: 60px;
            font-size: 14px;
          }
        }

        @media (max-width: 560px) {
          .page-title {
            font-size: 26px;
          }

          .product-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 18px 14px;
          }

          .product-info {
            padding: 14px 12px 16px;
          }

          .product-title {
            min-height: 56px;
            font-size: 13.5px;
          }

          .price {
            font-size: 15px;
          }

          .wish-btn {
            width: 36px;
            height: 36px;
            top: 10px;
            right: 10px;
          }
        }
      `}</style>
    </div>
  );
}

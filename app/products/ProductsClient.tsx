"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FaSearch, FaTimes } from "react-icons/fa";
import ProductCard from "@/components/ProductCard";
import { normalizeCategory } from "@/lib/categories";
import { useWishlist } from "@/lib/wishlist";

type Product = {
  id: string;
  title: string;
  price: number;
  coverUrl: string;
  size?: string;
  category?: string;
  stock?: number;
};

const COLLECTION_OPTIONS = [
  "Memlük",
  "Sultani",
  "Pazırık",
  "Gebbeh",
  "Bahtiyari",
  "Şal",
  "Kazak",
  "Hayat Ağacı",
  "Hamyab",
  "Bilicik",
  "Kilim",
  "Yolluk",
  "Karakul",
  "Karabağ",
  "Suzani",
  "Overdye",
  "Khorjin",
  "Kuşlu",
  "Hayvan Figürlü",
];

type SortKey = "recommended" | "price-asc" | "price-desc";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "recommended", label: "Önerilen" },
  { value: "price-asc", label: "Fiyat: Düşükten Yükseğe" },
  { value: "price-desc", label: "Fiyat: Yüksekten Düşüğe" },
];

const PRODUCTS_PER_PAGE = 20;

export default function ProductsClient({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const { wishlist, toggle } = useWishlist();

  const [query, setQuery] = useState("");
  const [selectedCollection, setSelectedCollection] = useState("");
  const [sort, setSort] = useState<SortKey>("recommended");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const categoryFromURL = searchParams.get("category");
    setSelectedCollection(categoryFromURL ? normalizeCategory(categoryFromURL) : "");
  }, [searchParams]);

  // Number of products per collection (shown next to each name).
  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const p of products) {
      const c = normalizeCategory(p.category);
      if (c) map[c] = (map[c] || 0) + 1;
    }
    return map;
  }, [products]);

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("tr-TR");

    const list = products.filter((p) => {
      if (q && !(p.title || "").toLocaleLowerCase("tr-TR").includes(q)) {
        return false;
      }

      if (selectedCollection && normalizeCategory(p.category) !== selectedCollection) {
        return false;
      }

      return true;
    });

    if (sort === "price-asc") {
      return [...list].sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (sort === "price-desc") {
      return [...list].sort((a, b) => Number(b.price) - Number(a.price));
    }

    return list;
  }, [products, query, selectedCollection, sort]);

  useEffect(() => {
    setCurrentPage(1);
  }, [query, selectedCollection, sort]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE,
  );

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const selectCollection = (collection: string) => {
    setSelectedCollection((prev) => (prev === collection ? "" : collection));
  };

  const pageTitle = selectedCollection || "Tüm Halılar";

  return (
    <div>
      {/* Page header */}
      <div className="border-b border-line bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-14">
          <nav className="text-xs text-muted" aria-label="Sayfa yolu">
            <Link href="/" className="hover:text-custom-accent">
              Ana Sayfa
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink">Mağaza</span>
          </nav>

          <h1 className="mt-4 font-display text-5xl font-semibold leading-none text-ink md:text-6xl">
            {pageTitle}
          </h1>

          <p className="mt-3 text-sm text-muted">
            {filteredProducts.length} Ürün
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-12">
        <div className="lg:grid lg:grid-cols-[230px_1fr] lg:gap-12">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-32">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-custom-accent">
                Koleksiyonlar
              </p>

              <ul className="mt-5 space-y-1 border-l border-line">
                <li>
                  <button
                    onClick={() => setSelectedCollection("")}
                    className={`-ml-px flex w-full items-center justify-between border-l-2 py-1.5 pl-4 text-left text-sm transition ${
                      !selectedCollection
                        ? "border-custom-accent font-semibold text-custom-accent"
                        : "border-transparent text-ink/75 hover:text-custom-accent"
                    }`}
                  >
                    Tüm Halılar
                    <span className="text-xs text-muted">{products.length}</span>
                  </button>
                </li>

                {COLLECTION_OPTIONS.map((collection) => {
                  const active = selectedCollection === collection;

                  return (
                    <li key={collection}>
                      <button
                        onClick={() => selectCollection(collection)}
                        className={`-ml-px flex w-full items-center justify-between border-l-2 py-1.5 pl-4 text-left text-sm transition ${
                          active
                            ? "border-custom-accent font-semibold text-custom-accent"
                            : "border-transparent text-ink/75 hover:text-custom-accent"
                        }`}
                      >
                        {collection}
                        <span className="text-xs text-muted">
                          {counts[collection] || 0}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          <div className="min-w-0">
            {/* Toolbar */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <label className="relative block w-full sm:max-w-xs">
                <span className="sr-only">Halı ara</span>
                <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Halı ara"
                  className="h-11 w-full rounded-full border border-line bg-paper pl-10 pr-10 text-sm text-ink outline-none transition focus:border-custom-accent"
                />
                {query ? (
                  <button
                    onClick={() => setQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted hover:text-custom-accent"
                    aria-label="Aramayı temizle"
                  >
                    <FaTimes className="text-xs" />
                  </button>
                ) : null}
              </label>

              <label className="flex items-center gap-2 text-sm text-muted">
                Sırala:
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="h-11 rounded-full border border-line bg-paper px-4 text-sm text-ink outline-none focus:border-custom-accent"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {/* Mobile / tablet collection chips */}
            <div className="no-scrollbar -mx-6 mt-5 flex gap-2 overflow-x-auto px-6 lg:hidden">
              <button
                onClick={() => setSelectedCollection("")}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${
                  !selectedCollection
                    ? "border-custom-accent bg-custom-accent text-white"
                    : "border-line bg-paper text-ink"
                }`}
              >
                Tümü
              </button>

              {COLLECTION_OPTIONS.map((collection) => {
                const active = selectedCollection === collection;

                return (
                  <button
                    key={collection}
                    onClick={() => selectCollection(collection)}
                    className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${
                      active
                        ? "border-custom-accent bg-custom-accent text-white"
                        : "border-line bg-paper text-ink"
                    }`}
                  >
                    {collection}
                  </button>
                );
              })}
            </div>

            {/* Active filters */}
            {selectedCollection || query ? (
              <div className="mt-5 flex flex-wrap items-center gap-2">
                {selectedCollection ? (
                  <span className="inline-flex items-center gap-2 rounded-full bg-custom-accent/10 px-3 py-1.5 text-xs font-semibold text-custom-accent">
                    {selectedCollection}
                    <button
                      onClick={() => setSelectedCollection("")}
                      aria-label="Koleksiyon filtresini kaldır"
                    >
                      <FaTimes />
                    </button>
                  </span>
                ) : null}

                {query ? (
                  <span className="inline-flex items-center gap-2 rounded-full bg-custom-accent/10 px-3 py-1.5 text-xs font-semibold text-custom-accent">
                    “{query}”
                    <button onClick={() => setQuery("")} aria-label="Aramayı temizle">
                      <FaTimes />
                    </button>
                  </span>
                ) : null}

                <button
                  onClick={() => {
                    setSelectedCollection("");
                    setQuery("");
                  }}
                  className="text-xs text-muted underline-offset-4 hover:text-custom-accent hover:underline"
                >
                  Tümünü temizle
                </button>
              </div>
            ) : null}

            {/* Grid */}
            {paginatedProducts.length ? (
              <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 xl:grid-cols-4">
                {paginatedProducts.map((p, index) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    wished={wishlist.includes(p.id)}
                    onToggleWish={toggle}
                    priority={index < 4}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-10 rounded-sm border border-dashed border-line bg-paper px-6 py-16 text-center">
                <h2 className="font-display text-3xl font-semibold text-ink">
                  Ürün bulunamadı
                </h2>
                <p className="mt-3 text-sm text-muted">
                  Farklı bir arama yapmayı veya filtreleri temizlemeyi deneyin.
                </p>
                <button
                  onClick={() => {
                    setSelectedCollection("");
                    setQuery("");
                  }}
                  className="mt-6 rounded-full bg-custom-accent px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white hover:bg-custom-accent-light"
                >
                  Tüm Halıları Göster
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 ? (
              <nav
                className="mt-14 flex flex-wrap items-center justify-center gap-2"
                aria-label="Sayfalar"
              >
                <button
                  disabled={currentPage === 1}
                  onClick={() => goToPage(currentPage - 1)}
                  className="h-10 rounded-full border border-line px-4 text-sm text-ink transition hover:border-custom-accent disabled:opacity-40"
                >
                  Önceki
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(
                    (page) =>
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1),
                  )
                  .map((page, index, pages) => (
                    <span key={page} className="contents">
                      {index > 0 && page - pages[index - 1] > 1 ? (
                        <span className="px-1 text-muted">…</span>
                      ) : null}

                      <button
                        onClick={() => goToPage(page)}
                        aria-current={page === currentPage ? "page" : undefined}
                        className={`h-10 w-10 rounded-full text-sm transition ${
                          page === currentPage
                            ? "bg-custom-accent text-white"
                            : "border border-line text-ink hover:border-custom-accent"
                        }`}
                      >
                        {page}
                      </button>
                    </span>
                  ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => goToPage(currentPage + 1)}
                  className="h-10 rounded-full border border-line px-4 text-sm text-ink transition hover:border-custom-accent disabled:opacity-40"
                >
                  Sonraki
                </button>
              </nav>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

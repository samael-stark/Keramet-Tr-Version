import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FaHandSparkles,
  FaLock,
  FaPhoneAlt,
  FaTruck,
} from "react-icons/fa";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PriceDisplay from "@/components/PriceDisplay";
import { getProductDetail, getProductSummaries } from "@/lib/products-server";
import ProductGallery from "./ProductGallery";
import AddToCartButton from "./AddToCartButton";
import RelatedProducts from "./RelatedProducts";

type Params = { id: string };

const RELATED_COUNT = 4;

// Page title / description for search engines and link previews.
// Uses the same cached product read as the page (no extra Firestore read).
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { id } = await params;
  const data = id ? await getProductDetail(id) : null;

  if (!data) return { title: "Ürün bulunamadı" };

  return {
    title: data.title || "El Dokuması Halı",
    description: (data.description || "").slice(0, 160) || undefined,
    openGraph: data.coverUrl ? { images: [data.coverUrl] } : undefined,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;

  if (!id) return notFound();

  // Cached per product; refreshed daily or after an admin change / sale.
  const data = await getProductDetail(id);

  if (!data) return notFound();

  const title = data.title ?? "İsimsiz Ürün";
  const price = Number(data.price ?? 0);
  const description =
    data.description ?? "Bu ürün için henüz açıklama eklenmemiştir.";
  const images =
    data.images.length > 0 ? data.images : data.coverUrl ? [data.coverUrl] : [];
  const soldOut = data.isActive === false || Number(data.stock) <= 0;

  // Campaign: displayed 15% discount
  const originalPrice = price > 0 ? price / 0.85 : 0;

  const saleEndDate = new Date();
  saleEndDate.setDate(saleEndDate.getDate() + 10);

  const formattedSaleDate = saleEndDate.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
  });

  // Similar rugs: same collection first, then others. Comes from the cached
  // product list, so it costs no extra Firestore reads.
  const available = (await getProductSummaries()).filter(
    (p) => p.id !== id && p.isActive !== false && Number(p.stock) > 0,
  );
  const sameCategory = data.category
    ? available.filter((p) => p.category === data.category)
    : [];
  const related = [
    ...sameCategory,
    ...available.filter((p) => !sameCategory.includes(p)),
  ].slice(0, RELATED_COUNT);

  const details = [
    { label: "Koleksiyon", value: data.category },
    { label: "Ölçü", value: data.size },
    { label: "Dokuma", value: "El dokuması" },
    { label: "Adet", value: "Tek parça" },
  ].filter((d) => d.value);

  const trust = [
    { icon: FaHandSparkles, text: "El dokuması, tek ve özgün parça" },
    { icon: FaTruck, text: "2–5 iş günü içinde özenle paketlenip kargoda" },
    { icon: FaLock, text: "iyzico altyapısı ile güvenli ödeme" },
    { icon: FaPhoneAlt, text: "Sorularınız için bize telefonla ulaşın" },
  ];

  return (
    <>
      <Header />

      <main className="bg-custom-bg">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-8 lg:px-10 lg:pb-24 lg:pt-10">
          {/* Breadcrumb */}
          <nav className="mb-6 text-xs text-muted" aria-label="Sayfa yolu">
            <Link href="/" className="hover:text-custom-accent">
              Ana Sayfa
            </Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-custom-accent">
              Mağaza
            </Link>
            {data.category ? (
              <>
                <span className="mx-2">/</span>
                <Link
                  href={`/products?category=${encodeURIComponent(data.category)}`}
                  className="hover:text-custom-accent"
                >
                  {data.category}
                </Link>
              </>
            ) : null}
          </nav>

          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
            <ProductGallery images={images} title={title} productId={id} />

            {/* Info column */}
            <div className="lg:sticky lg:top-28">
              {data.category ? (
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-custom-accent">
                  {data.category}
                </p>
              ) : null}

              <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.1] text-ink md:text-5xl">
                {title}
              </h1>

              {/* Price */}
              <div className="mt-6 border-y border-line py-6">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-3xl font-semibold text-custom-accent">
                    <PriceDisplay basePrice={price} />
                  </span>
                  {originalPrice > 0 ? (
                    <span className="text-base text-muted line-through">
                      <PriceDisplay basePrice={originalPrice} />
                    </span>
                  ) : null}
                  {!soldOut ? (
                    <span className="rounded-full bg-custom-accent px-3 py-1 text-[11px] font-semibold text-white">
                      %15 İndirim
                    </span>
                  ) : null}
                </div>

                {!soldOut ? (
                  <p className="mt-2 text-sm text-muted">
                    Kampanya {formattedSaleDate} tarihine kadar geçerlidir.
                  </p>
                ) : (
                  <p className="mt-2 text-sm font-semibold text-custom-accent">
                    Bu halı satılmıştır. Benzer halılarımıza aşağıdan göz
                    atabilirsiniz.
                  </p>
                )}
              </div>

              {/* Details */}
              {details.length ? (
                <dl className="mt-6 grid grid-cols-2 gap-3">
                  {details.map((d) => (
                    <div
                      key={d.label}
                      className="rounded-sm border border-line bg-paper px-4 py-3"
                    >
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted">
                        {d.label}
                      </dt>
                      <dd className="mt-1 text-sm font-semibold text-ink">
                        {d.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : null}

              {/* CTA */}
              <div className="mt-6">
                <AddToCartButton productId={id} soldOut={soldOut} />
              </div>

              {/* Trust */}
              <ul className="mt-6 space-y-3 rounded-sm bg-paper p-5">
                {trust.map((t) => {
                  const Icon = t.icon;
                  return (
                    <li key={t.text} className="flex items-center gap-3 text-sm text-ink/80">
                      <Icon className="shrink-0 text-custom-accent" />
                      {t.text}
                    </li>
                  );
                })}
              </ul>

              {/* Description */}
              <div className="mt-8">
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-custom-accent">
                  Ürün Açıklaması
                </h2>
                <p className="mt-4 whitespace-pre-line text-[15px] leading-7 text-ink/80">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <RelatedProducts products={related} />
      </main>

      <Footer />
    </>
  );
}

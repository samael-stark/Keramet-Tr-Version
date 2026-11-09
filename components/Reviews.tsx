"use client";

import { useRef, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaArrowRight,
} from "react-icons/fa";
import SectionHeading from "@/components/home/SectionHeading";

// Real reviews from our Etsy store (international customers), translated
// into Turkish. The note under the cards says so.
const reviews = [
  {
    name: "Lon",
    date: "27 Mart 2026",
    rating: 5,
    text: "Bu halı muhteşem, kalitesi ise olağanüstü! Teslimat çok hızlıydı ve ürün tam olarak fotoğraflardaki ve açıklamadaki gibi. Halı almak için doğru adres burası!",
    productTitle:
      "El Dokuması Gabbeh Hayat Ağacı Yün Halı: 6x8 Afgan Halısı",
    productImage: "/img/reviews/review1.jpg",
  },
  {
    name: "Irene",
    date: "18 Şubat 2026",
    rating: 5,
    text: "Çok hızlı ulaşan bu güzel ürün ve ilgili, samimi hizmetiniz için teşekkür ederim. Tek eksik bulduğum şey, ürünü ayrıntılı olarak anlatan bir menşe belgesi oldu. Ürünü ileride satmak istersem bu benim için önemli olurdu.",
    productTitle:
      "7x10 ft El Dokuması Kırmızı Çiçek Desenli Sultani Afgan Yün Halı – Doğal Kök Boya",
    productImage: "/img/reviews/review2.jpg",
  },
  {
    name: "Azhir",
    date: "7 Şubat 2026",
    rating: 5,
    text: "Bu satıcıdan yaptığım alışveriş mükemmeldi. Eşimle yeni evimiz için büyük bir halı arıyorduk ve aradığımız tarz bu mağazadaydı. Fiyat ve kargo seçeneklerini öğrenmek için mesaj attım ve alışverişi tamamladık. Uluslararası bir gönderi olmasına, halının da çok ağır ve büyük olmasına rağmen kargo son derece hızlı geldi. Kesinlikle tavsiye ederim.",
    productTitle:
      "10x13 ft El Dokuması Kahverengi Çiçek Desenli Sultani Afgan Yün Halı – Doğal Kök Boya",
    productImage: "/img/reviews/review3.jpg",
  },
  {
    name: "Cynthia",
    date: "15 Aralık 2025",
    rating: 5,
    text: "Harika hizmet, hızlı teslimat ve üstün kalite.",
    productTitle:
      "El Dokuması 5x7 Afgan Yün Halı – Sultani Desen – Doğal Kök Boya",
    productImage: "/img/reviews/review4.jpg",
  },
  {
    name: "Kenneth",
    date: "15 Aralık 2025",
    rating: 5,
    text: "Halıdan çok memnunum. Renkleri çok güzel, işçiliği de çok özenli. Kenar püsküllerindeki renkli bağlamalara bayıldım. Zemine tamamen düz seriliyor ve aldığım odada çok güzel duruyor. Kargo ve teslimat çok hızlıydı. Bu satıcıyı gönül rahatlığıyla tavsiye ederim. A+++",
    productTitle:
      "El Dokuması Mavi Pazırık 6x8 Afgan Yün Halı – Doğal Kök Boya",
    productImage: "/img/reviews/review5.jpg",
  },
  {
    name: "Catarina",
    date: "15 Eylül 2025",
    rating: 5,
    text: "Bu halı harika! Umduğum her şey. Tam anlatıldığı gibi; fotoğraflar gerçek güzelliğini yansıtmıyor bile. Ayrıca Keramet çok düşünceliydi ve hediye olarak küçük bir halı daha göndermişti :) Bu mağazadan tekrar alışveriş yaparım!",
    productTitle: "7x10 Pazırık Afgan Halısı: El Dokuması Yün, At Desenli",
    productImage: "/img/reviews/review6.jpg",
  },
];

const LONG_REVIEW = 220;

export default function Reviews() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollBy({
      left: dir === "left" ? -el.clientWidth : el.clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-custom-bg py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 lg:mb-14">
          <SectionHeading
            align="left"
            label="Müşteri Yorumları"
            title="Müşterilerimiz Ne Diyor?"
            intro="El dokuması halılarımızı tercih eden müşterilerimizin gerçek deneyimlerini keşfedin."
          />

          <div className="hidden items-center gap-3 sm:flex">
            <button
              onClick={() => scroll("left")}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-custom-accent/30 text-custom-accent transition hover:bg-custom-accent hover:text-white"
              aria-label="Sola Kaydır"
            >
              <FaChevronLeft />
            </button>

            <button
              onClick={() => scroll("right")}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-custom-accent/30 text-custom-accent transition hover:bg-custom-accent hover:text-white"
              aria-label="Sağa Kaydır"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="no-scrollbar -mx-6 flex snap-x snap-mandatory items-stretch gap-5 overflow-x-auto scroll-smooth px-6 pb-2 lg:mx-0 lg:px-0"
        >
          {reviews.map((review, index) => {
            const isLong = review.text.length > LONG_REVIEW;
            const isOpen = expanded === index;

            return (
              <article
                key={review.name + review.date}
                className="flex w-[86%] flex-shrink-0 snap-start flex-col rounded-sm border border-line bg-paper p-7 sm:w-[60%] lg:w-[calc((100%-2.5rem)/3)]"
              >
                <div className="flex items-start justify-between">
                  <span
                    aria-hidden
                    className="font-display text-6xl leading-none text-custom-accent/25"
                  >
                    “
                  </span>

                  <div
                    className="flex gap-1 text-[13px] text-[#c8962e]"
                    aria-label={`5 üzerinden ${review.rating} yıldız`}
                  >
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>

                <p
                  className={`mt-2 text-[15px] leading-7 text-ink/85 ${
                    isLong && !isOpen ? "line-clamp-5" : ""
                  }`}
                >
                  {review.text}
                </p>

                {isLong ? (
                  <button
                    onClick={() => setExpanded(isOpen ? null : index)}
                    className="mt-2 self-start text-xs font-semibold uppercase tracking-[0.16em] text-custom-accent hover:text-custom-accent-light"
                  >
                    {isOpen ? "Daha az göster" : "Devamını oku"}
                  </button>
                ) : null}

                <div className="mt-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-custom-accent font-display text-lg font-semibold text-white">
                    {review.name.charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      {review.name}
                    </p>
                    <p className="text-xs text-muted">{review.date}</p>
                  </div>
                </div>

                <div className="mt-auto flex items-center gap-3 border-t border-line pt-5">
                  <img
                    src={review.productImage}
                    alt={review.productTitle}
                    loading="lazy"
                    decoding="async"
                    className="h-14 w-14 shrink-0 rounded-sm object-cover"
                  />
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">
                      Değerlendirilen Ürün
                    </p>
                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-ink/80">
                      {review.productTitle}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <a
            href="https://www.etsy.com/shop/KERAMETHALI?dd_referrer=#reviews"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 rounded-full border border-custom-accent px-10 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-custom-accent transition hover:bg-custom-accent hover:text-white"
          >
            Tüm Yorumları Gör
            <FaArrowRight />
          </a>

          <p className="text-xs text-muted">
            Yorumlar Etsy mağazamızdaki uluslararası müşterilerimize aittir ve
            Türkçeye çevrilmiştir.
          </p>
        </div>
      </div>
    </section>
  );
}

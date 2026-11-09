"use client";

import Link from "next/link";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import SectionHeading from "@/components/home/SectionHeading";

const categories = [
  {
    title: "MEMLÜK",
    subtitle: "TARİHİ ZARAFET",
    value: "Memlük",
    image: "/img/Categories/mamluk.JPG",
  },
  {
    title: "SULTANİ",
    subtitle: "ASİL DOKUNUŞ",
    value: "Sultani",
    image: "/img/Categories/sultani.JPG",
  },
  {
    title: "PAZIRIK",
    subtitle: "TARİHTEN İLHAM",
    value: "Pazırık",
    image: "/img/Categories/pazyryk.JPG",
  },
  {
    title: "GEBBEH",
    subtitle: "SADE VE DOĞAL",
    value: "Gebbeh",
    image: "/img/Categories/Gabbeh.JPG",
  },
  {
    title: "BAHTİYARİ",
    subtitle: "GELENEKSEL ŞIKLIK",
    value: "Bahtiyari",
    image: "/img/Categories/bakhtiari.jpg",
  },

  // New Turkish categories (images will be added later)

  {
    title: "ŞAL",
    subtitle: "İNCE DOKUMA",
    value: "Şal",
    image: "/img/Categories/striped.jpg",
  },
  {
    title: "KAZAK",
    subtitle: "CESUR DESENLER",
    value: "Kazak",
    image: "/img/Categories/kazak.jpg",
  },
  {
    title: "HAYAT AĞACI",
    subtitle: "ANLAMLI MOTİFLER",
    value: "Hayat Ağacı",
    image: "/img/Categories/treeoflife.jpg",
  },
  {
    title: "HAMYAB",
    subtitle: "GELENEKSEL DOKU",
    value: "Hamyab",
    image: "/img/Categories/Hamyab.jpg",
  },
  {
    title: "BİLİCİK",
    subtitle: "ANADOLU ZARAFETİ",
    value: "Bilicik",
    image: "/img/Categories/BİLİCİK.jpg",
  },
  {
    title: "KİLİM",
    subtitle: "DÜZ DOKUMA",
    value: "Kilim",
    image: "/img/Categories/kilim .jpg",
  },
  {
    title: "YOLLUK",
    subtitle: "KORİDORLAR İÇİN",
    value: "Yolluk",
    image: "/img/Categories/runnerrugs.jpg",
  },
  {
    title: "KARAKUL",
    subtitle: "GELENEKSEL ESTETİK",
    value: "Karakul",
    image: "/img/Categories/Karakul.JPG",
  },
  {
    title: "KARABAĞ",
    subtitle: "KAFKAS ESİNTİSİ",
    value: "Karabağ",
    image: "/img/Categories/Karabağ.jpg",
  },
  {
  title: "KHORJIN",
  subtitle: "GELENEKSEL DOKU",
  value: "Khorjin",
  image: "/img/Categories/Khorjin.jpg",
},

  {
    title: "KUŞLU",
    subtitle: "DOĞADAN İZLER",
    value: "Kuşlu",
    image: "/img/Categories/pictorialbirds.JPG",
  },

  // "Hayvan Figürlü" is in the shop filter but not here yet: add it once
  // there is a category image for it.

  {
    title: "SUZANİ",
    subtitle: "ZARİF NAKIŞLAR",
    value: "Suzani",
    image: "/img/Categories/suzani.jpg",
  },
  {
    title: "OVERDYE",
    subtitle: "MODERN VİNTAGE",
    value: "Overdye",
    image: "/img/Categories/overdye.jpg",
  },
];
export default function CategoriesSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    const amount = el.clientWidth * 0.8;

    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section id="categories" className="scroll-mt-32 bg-custom-bg py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 lg:mb-14">
          <SectionHeading
            align="left"
            label="Koleksiyonlar"
            title="Yaşam alanınıza uygun el dokuması halıları keşfedin"
          />

          <div className="flex items-center gap-3">
            <Link
              href="/products"
              className="mr-2 border-b border-custom-accent pb-1 text-xs font-semibold uppercase tracking-[0.2em] text-custom-accent transition hover:text-custom-accent-light"
            >
              Tümünü Gör
            </Link>

            <button
              onClick={() => scroll("left")}
              className="hidden h-11 w-11 items-center justify-center rounded-full border border-custom-accent/30 text-custom-accent transition hover:bg-custom-accent hover:text-white sm:flex"
              aria-label="Sola Kaydır"
            >
              <FaChevronLeft />
            </button>

            <button
              onClick={() => scroll("right")}
              className="hidden h-11 w-11 items-center justify-center rounded-full border border-custom-accent/30 text-custom-accent transition hover:bg-custom-accent hover:text-white sm:flex"
              aria-label="Sağa Kaydır"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-6 pb-2 lg:mx-0 lg:px-0"
        >
          {categories.map((cat) => (
            <Link
              key={cat.value}
              href={`/products?category=${encodeURIComponent(cat.value)}`}
              className="group relative block w-[68%] flex-shrink-0 snap-start overflow-hidden rounded-sm bg-[#e9e1d3] sm:w-[42%] lg:w-[calc((100%-3.75rem)/4)]"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.06]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">
                    {cat.subtitle}
                  </p>

                  <h3 className="mt-2 font-display text-3xl font-semibold leading-none">
                    {cat.value}
                  </h3>

                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
                    İncele
                    <span className="h-px w-6 bg-white/70 transition-all duration-300 group-hover:w-10" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
    title: "PAZYRYK",
    subtitle: "TARİHTEN İLHAM",
    value: "Pazyryk",
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
    image: "",
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
    image: "",
  },
  {
    title: "BİLECİK",
    subtitle: "ANADOLU ZARAFETİ",
    value: "Bilicik",
    image: "",
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
    image: "",
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
    image: "",
  },
  {
    title: "KUŞLU",
    subtitle: "DOĞADAN İLHAM",
    value: "Kuşlu",
    image: "",
  },
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
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: dir === "left" ? -340 : 340,
      behavior: "smooth",
    });
  };

  return (
    <section id="categories" className="bg-custom-bg py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-14 text-center lg:mb-16">
          <h3 className="text-sm font-medium uppercase tracking-[0.28em] text-gray-600">
            KOLEKSİYONLAR
          </h3>

          <h2 className="mt-3 text-3xl font-extrabold text-custom-accent md:text-4xl">
            Yaşam alanınıza uygun el dokuması halıları keşfedin
          </h2>
        </div>

        <div className="relative flex items-center">
          <button
            onClick={() => scroll("left")}
            className="absolute -left-12 z-10 hidden rounded-full border border-[#e7ddd7] bg-white p-3 text-custom-accent shadow-xl transition hover:-translate-y-0.5 hover:bg-gray-50 lg:flex"
            aria-label="Sola Kaydır"
          >
            <FaChevronLeft />
          </button>

          <div
            ref={scrollRef}
            className="no-scrollbar flex gap-6 overflow-x-auto scroll-smooth pb-2 -mx-6 px-6 lg:mx-0 lg:px-0"
          >
            {categories.map((cat) => (
              <Link
                key={cat.value}
                href={`/products?category=${encodeURIComponent(cat.value)}`}
                className="group relative block w-64 flex-shrink-0 overflow-hidden rounded-[22px] bg-white shadow-[0_12px_35px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-1 md:w-72 lg:w-[32%]"
              >
                <div className="relative h-[24rem] overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05] group-hover:blur-[1.5px]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/10 transition duration-300 group-hover:from-black/75 group-hover:via-black/30 group-hover:to-black/20" />

                  <div className="absolute inset-x-0 bottom-0 z-10 p-6 text-white">
                    <p className="mb-2 text-[11px] uppercase tracking-[0.24em] text-white/85">
                      {cat.subtitle}
                    </p>

                    <h3 className="text-2xl font-bold leading-tight md:text-[30px]">
                      {cat.title}
                    </h3>

                    <span className="mt-4 inline-block border-b border-white pb-1 text-sm uppercase tracking-[0.22em] text-white transition-colors group-hover:border-[#d9b8a7] group-hover:text-[#f0d7cb]">
                      İncele
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute -right-12 z-10 hidden rounded-full border border-[#e7ddd7] bg-white p-3 text-custom-accent shadow-xl transition hover:-translate-y-0.5 hover:bg-gray-50 lg:flex"
            aria-label="Sağa Kaydır"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}

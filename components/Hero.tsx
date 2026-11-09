"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

const SLIDE_DURATION_MS = 6000;

const slides = [
  {
    image: "/img/BannerOne.jpg",
    tag: "El Dokuması Premium Halılar",
    title: "Geleneksel Afgan Halıları",
    highlight: "Afgan Halıları",
    description:
      "Usta zanaatkârlar tarafından el dokuması olarak üretilen kaliteli Afgan halıları ile yaşam alanlarınıza zarafet katın.",
  },
  {
    image: "/img/BannerTwo.jpg",
    tag: "Zamansız El Sanatı",
    title: "Özel Memlük Halıları",
    highlight: "Memlük Halıları",
    description:
      "Yüzyıllardır süregelen dokuma geleneğini modern yaşam alanlarınızla buluşturun.",
  },
  {
    image: "/img/BannerThree.jpg",
    tag: "Doğal • El Dokuması • Kaliteli",
    title: "Şık Sultani Halıları",
    highlight: "Sultani Halıları",
    description:
      "Doğal yünlerden üretilen, uzun yıllar kullanabileceğiniz özgün el dokuması halılar.",
  },
];

export default function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setActive((prev) => (prev + 1) % slides.length),
    [],
  );

  useEffect(() => {
    if (paused) return;

    const timer = setTimeout(next, SLIDE_DURATION_MS);
    return () => clearTimeout(timer);
  }, [active, paused, next]);

  const current = slides[active];
  const lead = current.title.split(current.highlight)[0];

  return (
    <section
      className="relative h-[78vh] min-h-[520px] max-h-[820px] overflow-hidden bg-[#1c1310]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      {/* Background images (crossfade + slow zoom on the active one) */}
      {slides.map((slide, index) => (
        <div
          key={slide.image}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-out ${
            active === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={active !== index}
        >
          <img
            key={active === index ? `on-${active}` : `off-${index}`}
            src={slide.image}
            alt=""
            className={`h-full w-full object-cover object-bottom ${
              active === index ? "hero-zoom" : ""
            }`}
            fetchPriority={index === 0 ? "high" : "low"}
          />
        </div>
      ))}

      {/* Readability gradients */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/70 via-black/35 to-black/5" />
      {/* Phones: text spans the full width, so darken the whole image */}
      <div className="absolute inset-0 z-10 bg-black/35 md:hidden" />
      <div className="absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-black/50 to-transparent" />

      {/* Content */}
      <div className="relative z-20 mx-auto flex h-full max-w-7xl items-center px-6 lg:px-10">
        <div key={active} className="max-w-xl text-white">
          <div className="fade-up flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">
              {current.tag}
            </span>
          </div>

          <h1
            className="fade-up mt-6 font-display text-5xl font-semibold leading-[1.02] md:text-7xl"
            style={{ animationDelay: "120ms" }}
          >
            {lead}
            <span className="block italic text-gold">{current.highlight}</span>
          </h1>

          <p
            className="fade-up mt-6 max-w-md text-base leading-7 text-white/85 md:text-lg"
            style={{ animationDelay: "240ms" }}
          >
            {current.description}
          </p>

          <div
            className="fade-up mt-9 flex flex-wrap gap-3"
            style={{ animationDelay: "360ms" }}
          >
            <a
              href="#categories"
              className="inline-flex items-center rounded-full bg-paper px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-custom-accent transition hover:bg-white"
            >
              Koleksiyonlar
            </a>

            <Link
              href="/products"
              className="inline-flex items-center rounded-full border border-white/60 px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:border-white hover:bg-white/10"
            >
              Mağaza
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

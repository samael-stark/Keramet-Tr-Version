"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const current = slides[active];

  return (
    <section className="relative overflow-hidden h-[600px]">
      {/* Background images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            active === index ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center bottom",
          }}
        />
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30 z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-6">
          <div className="hero-overlay-card flex flex-col space-y-4 text-gray-800">
            <span className="text-white text-sm font-medium">
              {current.tag}
            </span>

            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-white">
              {current.title.split(current.highlight)[0]}
              <span className="text-custom-accent">
                {current.highlight}
              </span>
            </h2>

            <p className="text-white text-lg hidden md:block">
              {current.description}
            </p>

            <Link
              href="/products"
              className="bg-custom-accent hover:bg-custom-accent-light text-white font-semibold py-3 px-8 rounded-md shadow-lg self-start transition-colors"
            >
              Koleksiyonu İncele
            </Link>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              active === i ? "bg-custom-accent" : "bg-gray-300"
            }`}
            aria-label={`Slayt ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

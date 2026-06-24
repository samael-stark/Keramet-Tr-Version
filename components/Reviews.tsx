"use client";

import "./Reviews.css";

import Link from "next/link";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaStar, FaArrowRight } from "react-icons/fa";

const reviews = [
  {
    name: "Lon",
    date: "27 Mar, 2026",
    rating: 5,
    text: "This rug is spectacular and the quality is outstanding! Fast delivery and exactly as pictured and described. This is the place to buy your rugs!",
    productTitle: "Hand Knotted Gabbeh Tree of Life Wool Rug: 6x8 Afghan Area Rug",
    productImage: "/img/reviews/review1.jpg",
  },
  {
    name: "Irene",
    date: "18 Feb, 2026",
    rating: 5,
    text: "Thank you for a beautiful product that arrived super fast and for great personal service. The only thing I miss is a certificate of origin that describes the product in detail. This would be important in case I would need to sell the product.",
    productTitle: "7x10 ft Hand Knotted Red Floral Sultani Afghan Area Wool Rug - Natural Vegetable Dye",
    productImage: "/img/reviews/review2.jpg",
  },
  {
    name: "Azhir",
    date: "07 Feb, 2026",
    rating: 5,
    text: "My purchase from this vendor was excellent. My wife and I were in the market for a large rug for a new house, and this vendor had the style I wanted. I messaged them to understand pricing and shipping options, and we made the sale. Shipping arrived extremely quick for an international sale and being very heavy/large. Overall, highly recommend.",
    productTitle: "10x13 ft Hand Knotted Brown Floral Sultani Afghan Wool Area Rug - Natural Vegetable Dye",
    productImage: "/img/reviews/review3.jpg",
  },
  {
    name: "Cynthia",
    date: "15 Dec, 2025",
    rating: 5,
    text: "Beautiful service, quick delivery, and great quality.",
    productTitle: "Hand Knotted 5x7 Afghan Wool Rug - Sultani Design - Natural Vegetable Dye",
    productImage: "/img/reviews/review4.jpg",
  },
  {
    name: "Kenneth",
    date: "15 Dec, 2025",
    rating: 5,
    text: "I’m very pleased with the carpet. Beautiful colours and very well finished. Love the colourful binding around the edge tassels. It lies absolutely flat. The carpet looks very good in the room I bought it for. Shipping and delivery was very quick. I thoroughly recommend this seller. A+++",
    productTitle: "Hand Knotted Blue Pazyryk 6x8 Afghan Wool Rug, Natural Vegetable Dye",
    productImage: "/img/reviews/review5.jpg",
  },
  {
    name: "Catarina",
    date: "15 Sept, 2025",
    rating: 5,
    text: "This rug is amazing! it's everything I hoped for. It is just as described and the photos don't do it justice. Also, Keramet was very thoughtful and packed a smaller rug as a gift :) I would buy again from this shop!",
    productTitle: "7x10 Pazyryk Afghan Rug: Hand-Knotted Wool, Horse Design",
    productImage: "/img/reviews/review6.jpg",
  },
];

export default function Reviews() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: dir === "left" ? -scrollRef.current.clientWidth : scrollRef.current.clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="border-t border-gray-200 bg-custom-bg py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16 text-center">
          <h3 className="text-sm font-medium uppercase tracking-widest text-gray-600">
            Testimonials
          </h3>
          <h2 className="mt-3 text-4xl font-extrabold text-custom-accent">
            Our Happy Customers
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Real reviews from customers who appreciate craftsmanship, quality,
            and timeless handmade design.
          </p>
        </div>

        <div className="relative flex items-center">
          <button
            onClick={() => scroll("left")}
            className="hidden lg:flex absolute -left-12 z-10 rounded-full bg-white/70 p-3 text-custom-accent shadow-xl backdrop-blur-md transition hover:bg-white"
            aria-label="Scroll testimonials left"
          >
            <FaChevronLeft />
          </button>

          <div
            ref={scrollRef}
            className="no-scrollbar overflow-x-auto scroll-smooth -mx-6 px-6 pb-4 lg:mx-0 lg:px-0"
          >
            <div className="grid grid-flow-col auto-cols-[88%] gap-6 sm:auto-cols-[60%] lg:auto-cols-[calc((100%-3rem)/3)]">
              {reviews.map((review, index) => (
                <article key={index} className="review-card">
                  <div className="review-top">
                    <div>
                      <h4 className="review-name">{review.name}</h4>
                      <p className="review-date">on {review.date}</p>
                    </div>
                  </div>

                  <div className="stars" aria-label={`${review.rating} star review`}>
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>

                  <p className="review-text">{review.text}</p>

                  <div className="product-tile">
                    <div className="product-tile-image">
                      <img src={review.productImage} alt={review.productTitle} />
                    </div>

                    <div className="product-tile-content">
                      <p className="product-tile-label">Reviewed Product</p>
                      <p className="product-tile-title">{review.productTitle}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <button
            onClick={() => scroll("right")}
            className="hidden lg:flex absolute -right-12 z-10 rounded-full bg-white/70 p-3 text-custom-accent shadow-xl backdrop-blur-md transition hover:bg-white"
            aria-label="Scroll testimonials right"
          >
            <FaChevronRight />
          </button>
        </div>

        <div className="mt-14 text-center">
          <a
            href="https://www.etsy.com/shop/KERAMETHALI?dd_referrer=#reviews"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full border border-custom-accent px-10 py-3 font-semibold text-custom-accent transition-colors hover:bg-custom-accent hover:text-white"
          >
            More Reviews
            <FaArrowRight className="ml-2" />
          </a>
        </div>
      </div>


    </section>
  );
}

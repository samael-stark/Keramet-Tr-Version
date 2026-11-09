import Link from "next/link";

// Full-width editorial banner between the products and the reviews.
export default function StoryBanner() {
  return (
    <section className="relative overflow-hidden">
      <img
        src="/img/BannerTwo.jpg"
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[#1c1310]/65" />

      <div className="relative mx-auto max-w-3xl px-6 py-24 text-center text-white md:py-32">
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">
          El Emeği, Göz Nuru
        </p>

        <p className="mt-6 font-display text-4xl font-medium italic leading-tight md:text-6xl">
          “Her düğümde ustanın emeği, her desende bir hikâye.”
        </p>

        <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/80">
          Halılarımız aylar süren sabırlı bir el işçiliğinin ürünüdür. Her biri
          tek parçadır; aynısı bir daha dokunmaz.
        </p>

        <Link
          href="/products"
          className="mt-10 inline-flex items-center rounded-full border border-white/70 px-9 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-custom-accent"
        >
          Koleksiyonu Keşfedin
        </Link>
      </div>
    </section>
  );
}

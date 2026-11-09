import Link from "next/link";
import {
  FaGlobe,
  FaHandSparkles,
  FaShieldAlt,
  FaTruck,
} from "react-icons/fa";
import SectionHeading from "@/components/home/SectionHeading";

const trustPoints = [
  {
    icon: FaHandSparkles,
    title: "El Dokuması Halılar",
    text: "Her halı; ustalık, kalite ve zamansız tasarım anlayışıyla özenle seçilir.",
  },
  {
    icon: FaShieldAlt,
    title: "Kalite Garantisi",
    text: "Doğal malzemeler, güvenilir üretim ve uzun yıllar kullanılabilecek üstün kalite.",
  },
  {
    icon: FaGlobe,
    title: "Geleneksel Ustalık",
    text: "Nesiller boyunca aktarılan el dokuma sanatını modern yaşam alanlarıyla buluşturuyoruz.",
  },
  {
    icon: FaTruck,
    title: "Güvenli Teslimat",
    text: "Siparişleriniz özenle paketlenerek Türkiye'nin her yerine güvenle ulaştırılır.",
  },
];

export default function About() {
  return (
    <section id="aboutus" className="scroll-mt-32 bg-custom-bg py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-sm">
              <img
                src="/img/BannerThree.jpg"
                alt="Keramet Halı el dokuması halı"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="absolute -bottom-6 right-6 rounded-sm bg-custom-accent px-7 py-5 text-white shadow-xl md:-right-6">
              <p className="font-display text-3xl font-semibold leading-none">
                Tek Parça
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.24em] text-white/80">
                Her halı özgündür
              </p>
            </div>
          </div>

          {/* Text */}
          <div>
            <SectionHeading align="left" label="Hakkımızda" title="Keramet Halı" />

            <p className="mt-6 text-base leading-8 text-ink/80 sm:text-lg">
              Keramet Halı olarak, el dokuması halıları geleneksel ustalık ve
              modern yaşam anlayışıyla buluşturuyoruz. Her koleksiyonumuz
              kalite, estetik ve uzun ömürlü kullanım düşünülerek özenle
              seçilmektedir.
            </p>

            <p className="mt-4 text-base leading-8 text-muted">
              Yaşam alanlarınıza sıcaklık, zarafet ve karakter katacak özel
              halıları sizlerle buluşturmayı hedefliyoruz.
            </p>

            <div className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {trustPoints.map((point) => {
                const Icon = point.icon;

                return (
                  <div key={point.title} className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-custom-accent/25 text-custom-accent">
                      <Icon />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-ink">
                        {point.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-muted">
                        {point.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link
              href="/products"
              className="mt-10 inline-flex items-center border-b border-custom-accent pb-1 text-xs font-semibold uppercase tracking-[0.2em] text-custom-accent transition hover:text-custom-accent-light"
            >
              Koleksiyonu İncele
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

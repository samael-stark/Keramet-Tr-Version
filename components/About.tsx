import {
  FaGlobe,
  FaHandSparkles,
  FaShieldAlt,
  FaTruck,
} from "react-icons/fa";

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
    <section id="aboutus" className="bg-custom-bg py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        {/* Heading */}
        <div className="text-center">
          <h3 className="text-sm font-medium uppercase tracking-[0.28em] text-gray-600">
            HAKKIMIZDA
          </h3>

          <h2 className="mt-3 text-3xl font-extrabold text-custom-accent sm:text-4xl">
            Keramet Halı
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#5c554d] sm:text-lg">
            Keramet Halı olarak, el dokuması halıları geleneksel ustalık ve
            modern yaşam anlayışıyla buluşturuyoruz. Her koleksiyonumuz kalite,
            estetik ve uzun ömürlü kullanım düşünülerek özenle seçilmektedir.
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#736b61] sm:text-base">
            Yaşam alanlarınıza sıcaklık, zarafet ve karakter katacak özel
            halıları sizlerle buluşturmayı hedefliyoruz.
          </p>
        </div>

        {/* Trust Points */}
        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((point) => {
            const Icon = point.icon;

            return (
              <div
                key={point.title}
                className="text-center px-4"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f5ece6] text-custom-accent">
                  <Icon className="text-xl" />
                </div>

                <h4 className="mt-5 text-lg font-semibold text-[#2d2823]">
                  {point.title}
                </h4>

                <p className="mt-3 text-sm leading-7 text-[#6d655c]">
                  {point.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

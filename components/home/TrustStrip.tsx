import { FaHandSparkles, FaLock, FaTruck, FaPhoneAlt } from "react-icons/fa";

// Short value points shown right under the hero.
// Keep every claim here true for the store (see the shipping policy).
const points = [
  {
    icon: FaHandSparkles,
    title: "El Dokuması & Tek Parça",
    text: "Her halı özgün ve tektir",
  },
  {
    icon: FaTruck,
    title: "Özenli Paketleme",
    text: "1–2 iş günü içinde kargoda",
  },
  {
    icon: FaLock,
    title: "Güvenli Ödeme",
    text: "iyzico altyapısı ile korunan ödeme",
  },
  {
    icon: FaPhoneAlt,
    title: "Birebir Destek",
    text: "Doğru halıyı birlikte seçelim",
  },
];

export default function TrustStrip() {
  return (
    <section className="border-b border-line bg-paper">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-6 px-6 py-8 lg:grid-cols-4 lg:px-10">
        {points.map((point, i) => {
          const Icon = point.icon;

          return (
            <div
              key={point.title}
              className={`flex items-center gap-4 lg:justify-center ${
                i > 0 ? "lg:border-l lg:border-line" : ""
              }`}
            >
              <Icon className="shrink-0 text-xl text-custom-accent" />
              <div>
                <p className="text-sm font-semibold text-ink">{point.title}</p>
                <p className="mt-0.5 text-xs text-muted">{point.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

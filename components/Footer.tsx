import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-custom-accent">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <h3 className="text-2xl font-extrabold tracking-widest text-custom-bg">
              KERAMET HALI
            </h3>

            <p className="mt-4 text-custom-bg/80 leading-relaxed">
              Her Eve Yakışan El Dokuması Halılar
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-custom-bg mb-4">
              Hızlı Erişim
            </h4>

            <ul className="space-y-3 font-medium">
              <li>
                <Link
                  href="/"
                  className="text-custom-bg/80 hover:text-custom-bg transition"
                >
                  Ana Sayfa
                </Link>
              </li>

              <li>
                <Link
                  href="/#categories"
                  className="text-custom-bg/80 hover:text-custom-bg transition"
                >
                Koleksiyonlar
                </Link>
              </li>

              <li>
                <Link
                  href="/products"
                  className="text-custom-bg/80 hover:text-custom-bg transition"
                >
                  Mağaza
                </Link>
              </li>

              <li>
                <Link
                  href="/track-order"
                  className="text-custom-bg/80 hover:text-custom-bg transition"
                >
                  Sipariş Takibi
                </Link>
              </li>

              <li>
                <Link
                  href="/#aboutus"
                  className="text-custom-bg/80 hover:text-custom-bg transition"
                >
                  Hakkımızda
                </Link>
              </li>

              <li>
                <Link
                  href="/#contact"
                  className="text-custom-bg/80 hover:text-custom-bg transition"
                >
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-custom-bg mb-4">
              Politikalar
            </h4>

            <ul className="space-y-3 font-medium">
              <li>
                <Link
                  href="/distance-selling-agreement"
                  className="text-custom-bg/80 hover:text-custom-bg transition"
                >
                  Mesafeli Satış Sözleşmesi
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy-policy"
                  className="text-custom-bg/80 hover:text-custom-bg transition"
                >
                  Gizlilik Politikası
                </Link>
              </li>

              <li>
                <Link
                  href="/return-policy"
                  className="text-custom-bg/80 hover:text-custom-bg transition"
                >
                  İade Politikası
                </Link>
              </li>

              <li>
                <Link
                  href="/shipping-policy"
                  className="text-custom-bg/80 hover:text-custom-bg transition"
                >
                  Kargo Politikası
                </Link>
              </li>

              <li>
                <Link
                  href="/terms"
                  className="text-custom-bg/80 hover:text-custom-bg transition"
                >
                  Kullanım Koşulları
                </Link>
              </li>
            </ul>
          </div>

          {/* Social + Payments */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-custom-bg mb-4">
              Bizi Takip Edin
            </h4>

            <div className="flex items-center gap-4">

              <a
                href="https://www.facebook.com/profile.php?id=61580349339271#"
                target="_blank"
                rel="noreferrer"
                className="group w-12 h-12 rounded-xl border border-custom-bg/40 flex items-center justify-center transition hover:bg-custom-bg"
              >
                <FaFacebookF className="text-custom-bg group-hover:text-custom-accent transition" />
              </a>

              <a
                href="https://www.instagram.com/keramethali/"
                target="_blank"
                rel="noreferrer"
                className="group w-12 h-12 rounded-xl border border-custom-bg/40 flex items-center justify-center transition hover:bg-custom-bg"
              >
                <FaInstagram className="text-custom-bg group-hover:text-custom-accent transition" />
              </a>

              <a
                href="https://www.tiktok.com/@keramet.hali"
                target="_blank"
                rel="noreferrer"
                className="group w-12 h-12 rounded-xl border border-custom-bg/40 flex items-center justify-center transition hover:bg-custom-bg"
              >
                <FaTiktok className="text-custom-bg group-hover:text-custom-accent transition" />
              </a>

            </div>

            {/* Payment Logos */}
            <div className="mt-6">
              <p className="text-sm text-custom-bg/70 mb-3">
                Güvenli Ödeme
              </p>

              <div className="flex items-center gap-3 flex-wrap">

                <div className="bg-[#f9f6e3] px-3 py-2 rounded-lg flex items-center justify-center">
                  <img
                    src="/payment-logos/pay_with_iyzico.svg"
                    alt="Iyzico"
                    className="h-5 w-auto object-contain"
                  />
                </div>

                <div className="bg-[#f9f6e3] px-3 py-2 rounded-lg flex items-center justify-center">
                  <img
                    src="/payment-logos/Visa_Inc._logo.svg"
                    alt="Visa"
                    className="h-5 w-auto object-contain"
                  />
                </div>

                <div className="bg-[#f9f6e3] px-3 py-2 rounded-lg flex items-center justify-center">
                  <img
                    src="/payment-logos/Mastercard-logo.svg"
                    alt="Mastercard"
                    className="h-5 w-auto object-contain"
                  />
                </div>

              </div>
            </div>

          </div>

        </div>

<div className="mt-16 pt-8 border-t border-custom-bg/30 text-center text-sm text-custom-bg/80">
  © {new Date().getFullYear()} Keramet Halı. Tüm hakları saklıdır.
</div>

      </div>
    </footer>
  );
}

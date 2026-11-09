"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PaymentFailedPage() {
  // "?reason=inventory" = the rug was sold to someone else during payment.
  const [soldOut, setSoldOut] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSoldOut(params.get("reason") === "inventory");
  }, []);

  return (
    <>
      <Header />

      <main className="min-h-screen bg-custom-bg">
        <div className="mx-auto max-w-2xl px-6 py-16 text-center lg:py-24">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ink text-2xl text-white">
            <FaTimes />
          </span>

          <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.3em] text-custom-accent">
            İşlem Tamamlanamadı
          </p>

          {soldOut ? (
            <>
              <h1 className="mt-3 font-display text-5xl font-semibold leading-tight text-ink md:text-6xl">
                Bu Halı Az Önce Satıldı
              </h1>
              <p className="mx-auto mt-4 max-w-md text-base leading-7 text-muted">
                Ödeme sırasında sepetinizdeki tek parça halılardan biri başka
                bir müşteri tarafından satın alındı. Kartınızdan tutar
                çekildiyse lütfen bizimle hemen iletişime geçin; iade işlemini
                başlatalım ya da size benzer bir halı önerelim.
              </p>
            </>
          ) : (
            <>
              <h1 className="mt-3 font-display text-5xl font-semibold leading-tight text-ink md:text-6xl">
                Ödeme Başarısız
              </h1>
              <p className="mx-auto mt-4 max-w-md text-base leading-7 text-muted">
                Maalesef ödemeniz şu anda tamamlanamadı. Lütfen kart
                bilgilerinizi kontrol edin veya farklı bir kart ile tekrar
                deneyin. Kartınızdan tutar çekildiğini görürseniz lütfen bizimle
                iletişime geçin.
              </p>
            </>
          )}

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            {soldOut ? (
              <Link
                href="/cart"
                className="rounded-full bg-custom-accent px-8 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-custom-accent-light"
              >
                Sepetime Git
              </Link>
            ) : (
              <Link
                href="/checkout/review"
                className="rounded-full bg-custom-accent px-8 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-custom-accent-light"
              >
                Tekrar Dene
              </Link>
            )}

            <a
              href="tel:+905065274930"
              className="rounded-full border border-custom-accent px-8 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-custom-accent transition hover:bg-custom-accent hover:text-white"
            >
              Bizi Arayın
            </a>
          </div>

          <p className="mt-8 text-xs text-muted">
            Yardıma mı ihtiyacınız var? +90 506 527 49 30
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}

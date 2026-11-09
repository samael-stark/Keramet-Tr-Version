"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { CheckoutSteps, CheckoutSummary, StateCard } from "@/components/checkout/CheckoutParts";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { fetchProductsByIds } from "@/lib/products-client";
import { getCart, type CartItem } from "@/lib/cart";

type ProductDoc = {
  id: string;
  title?: string;
  coverUrl?: string;
  price?: number;
  category?: string;
  size?: string;
};

type CheckoutForm = {
  fullName: string;
  streetAddress: string;
  apartment: string;
  city: string;
  district: string;
  postalCode: string;
  phoneNumber: string;
};

const TURKISH_PROVINCES = [
  "Adana",
  "Adıyaman",
  "Afyonkarahisar",
  "Ağrı",
  "Amasya",
  "Ankara",
  "Antalya",
  "Artvin",
  "Aydın",
  "Balıkesir",
  "Bilicik",
  "Bingöl",
  "Bitlis",
  "Bolu",
  "Burdur",
  "Bursa",
  "Çanakkale",
  "Çankırı",
  "Çorum",
  "Denizli",
  "Diyarbakır",
  "Düzce",
  "Edirne",
  "Elazığ",
  "Erzincan",
  "Erzurum",
  "Eskişehir",
  "Gaziantep",
  "Giresun",
  "Gümüşhane",
  "Hakkâri",
  "Hatay",
  "Isparta",
  "Mersin",
  "İstanbul",
  "İzmir",
  "Kars",
  "Kastamonu",
  "Kayseri",
  "Kırıkkale",
  "Kırklareli",
  "Kırşehir",
  "Kilis",
  "Kocaeli",
  "Konya",
  "Kütahya",
  "Malatya",
  "Manisa",
  "Kahramanmaraş",
  "Mardin",
  "Muğla",
  "Muş",
  "Nevşehir",
  "Niğde",
  "Ordu",
  "Osmaniye",
  "Rize",
  "Sakarya",
  "Samsun",
  "Siirt",
  "Sinop",
  "Sivas",
  "Şanlıurfa",
  "Şırnak",
  "Tekirdağ",
  "Tokat",
  "Trabzon",
  "Tunceli",
  "Uşak",
  "Van",
  "Yalova",
  "Yozgat",
  "Zonguldak",
  "Aksaray",
  "Bayburt",
  "Karaman",
  "Batman",
  "Ardahan",
  "Iğdır",
  "Bartın",
  "Karabük",
];

export default function CheckoutPage() {
  const router = useRouter();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<ProductDoc[]>([]);
  const [ready, setReady] = useState(false);
  const [submitting, setSubmitting] = useState(false);

const [form, setForm] = useState<CheckoutForm>({
    fullName: "",
    streetAddress: "",
    apartment: "",
    city: "",
    district: "",
    postalCode: "",
    phoneNumber: "",
});

  const [errors, setErrors] = useState<
    Partial<Record<keyof CheckoutForm, string>>
  >({});

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.replace("/auth?redirect=/checkout");
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    const sync = () => setCart(getCart());
    sync();
    window.addEventListener("cartUpdated", sync);
    return () => window.removeEventListener("cartUpdated", sync);
  }, []);

  useEffect(() => {
    async function load() {
      const ids = cart.map((x) => x.id);

      if (!ids.length) {
        setProducts([]);
        setReady(true);
        return;
      }

      // Read only the products in the cart (1 read each), not the whole collection.
      const filtered = await fetchProductsByIds<ProductDoc>(ids);
      setProducts(filtered);
      setReady(true);
    }

    setReady(false);
    load();
  }, [cart]);

  const items = useMemo(() => {
    const map = new Map(products.map((p) => [p.id, p]));

    return cart
      .map((c) => {
        const p = map.get(c.id);
        if (!p) return null;

        return {
          ...p,
          price: Number(p.price || 0),
        };
      })
      .filter(Boolean) as Array<ProductDoc & { price: number }>;
  }, [cart, products]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, x) => sum + x.price, 0);
  }, [items]);

  const handleChange = (field: keyof CheckoutForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

const validate = () => {
    const nextErrors: Partial<Record<keyof CheckoutForm, string>> = {};

    if (!form.fullName.trim()) {
        nextErrors.fullName = "Lütfen ad ve soyadınızı giriniz.";
    }

    if (!form.streetAddress.trim()) {
        nextErrors.streetAddress = "Lütfen adresinizi giriniz.";
    }

    if (!form.city.trim()) {
        nextErrors.city = "Lütfen şehir seçiniz.";
    }

    if (!form.district.trim()) {
        nextErrors.district = "Lütfen ilçe giriniz.";
    }

    if (!form.phoneNumber.trim()) {
        nextErrors.phoneNumber = "Lütfen telefon numaranızı giriniz.";
    } else if (form.phoneNumber.replace(/\D/g, "").length < 10) {
        nextErrors.phoneNumber = "Geçerli bir telefon numarası giriniz.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
};

  const handleContinue = () => {
    if (!items.length) {
      router.push("/cart");
      return;
    }

    if (!validate()) return;

    setSubmitting(true);

   const payload = {
  customer: form,
  items,
  subtotal,
  currency: "TRY",
};

    sessionStorage.setItem("checkoutDetails", JSON.stringify(payload));
    router.push("/checkout/review");
  };

  const inputClass = (hasError?: string) =>
    `h-12 w-full rounded-sm border bg-paper px-4 text-sm text-ink outline-none transition focus:border-custom-accent ${
      hasError ? "border-custom-accent" : "border-line"
    }`;

  const labelClass = "mb-1.5 block text-xs font-semibold text-ink/80";

  const fieldError = (message?: string) =>
    message ? <p className="mt-1.5 text-xs text-custom-accent">{message}</p> : null;

  if (!ready) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-custom-bg">
          <PageHero title="Teslimat" crumbs={[{ href: "/cart", label: "Sepet" }, { label: "Teslimat" }]} />
          <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-14">
            <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
              <div className="h-96 animate-pulse rounded-sm bg-paper" />
              <div className="h-72 animate-pulse rounded-sm bg-paper" />
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!items.length) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-custom-bg">
          <PageHero title="Teslimat" crumbs={[{ href: "/cart", label: "Sepet" }, { label: "Teslimat" }]} />
          <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-14">
            <StateCard title="Sepetiniz boş" text="Devam etmek için sepetinize ürün ekleyin.">
              <Link
                href="/products"
                className="mt-8 inline-flex items-center rounded-full bg-custom-accent px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-custom-accent-light"
              >
                Halıları İncele
              </Link>
            </StateCard>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-custom-bg">
        <PageHero
          title="Teslimat"
          label="Güvenli Ödeme"
          crumbs={[{ href: "/cart", label: "Sepet" }, { label: "Teslimat" }]}
          subtitle="Siparişinizi tamamlamak için teslimat bilgilerinizi giriniz."
        >
          <CheckoutSteps current={1} />
        </PageHero>

        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-14">
          <div className="grid items-start gap-8 lg:grid-cols-[1fr_400px] lg:gap-12">
            <section className="rounded-sm border border-line bg-paper p-6 md:p-8">
              <h2 className="font-display text-3xl font-semibold text-ink">
                Teslimat Bilgileri
              </h2>
              <p className="mt-1 text-xs text-muted">* ile işaretli alanlar zorunludur.</p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <label className="block sm:col-span-2">
                  <span className={labelClass}>Ad Soyad *</span>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    placeholder="Ad Soyad"
                    autoComplete="name"
                    className={inputClass(errors.fullName)}
                  />
                  {fieldError(errors.fullName)}
                </label>

                <label className="block sm:col-span-2">
                  <span className={labelClass}>Adres *</span>
                  <input
                    type="text"
                    value={form.streetAddress}
                    onChange={(e) => handleChange("streetAddress", e.target.value)}
                    placeholder="Mahalle, Cadde, Sokak, Bina No"
                    autoComplete="address-line1"
                    className={inputClass(errors.streetAddress)}
                  />
                  {fieldError(errors.streetAddress)}
                </label>

                <label className="block sm:col-span-2">
                  <span className={labelClass}>Apartman / Daire (Opsiyonel)</span>
                  <input
                    type="text"
                    value={form.apartment}
                    onChange={(e) => handleChange("apartment", e.target.value)}
                    placeholder="Apartman, Kat, Daire No"
                    autoComplete="address-line2"
                    className={inputClass()}
                  />
                </label>

                <label className="block">
                  <span className={labelClass}>Şehir *</span>
                  <select
                    value={form.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    className={inputClass(errors.city)}
                  >
                    <option value="">Şehir Seçiniz</option>
                    {TURKISH_PROVINCES.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  {fieldError(errors.city)}
                </label>

                <label className="block">
                  <span className={labelClass}>İlçe *</span>
                  <input
                    type="text"
                    value={form.district}
                    onChange={(e) => handleChange("district", e.target.value)}
                    placeholder="İlçe"
                    className={inputClass(errors.district)}
                  />
                  {fieldError(errors.district)}
                </label>

                <label className="block">
                  <span className={labelClass}>Posta Kodu</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={form.postalCode}
                    onChange={(e) => handleChange("postalCode", e.target.value)}
                    placeholder="34010"
                    autoComplete="postal-code"
                    className={inputClass()}
                  />
                </label>

                <label className="block">
                  <span className={labelClass}>Telefon Numarası *</span>
                  <span className="flex gap-2">
                    <span className="flex h-12 items-center rounded-sm border border-line bg-custom-bg px-4 text-sm font-semibold text-ink">
                      +90
                    </span>
                    <input
                      type="tel"
                      value={form.phoneNumber}
                      onChange={(e) => handleChange("phoneNumber", e.target.value)}
                      placeholder="5XX XXX XX XX"
                      autoComplete="tel-national"
                      className={inputClass(errors.phoneNumber)}
                    />
                  </span>
                  {fieldError(errors.phoneNumber)}
                </label>
              </div>

              <div className="mt-8 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                <Link
                  href="/cart"
                  className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted hover:text-custom-accent"
                >
                  ← Sepete Dön
                </Link>

                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={submitting}
                  className="rounded-full bg-custom-accent px-8 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white shadow-[0_12px_26px_rgba(96,25,21,0.22)] transition hover:-translate-y-0.5 hover:bg-custom-accent-light disabled:opacity-70"
                >
                  {submitting ? "Kaydediliyor…" : "Ödeme Adımına Geç"}
                </button>
              </div>
            </section>

            <CheckoutSummary items={items} subtotal={subtotal} />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

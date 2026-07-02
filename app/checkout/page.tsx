"use client";
import PriceDisplay from "@/components/PriceDisplay";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
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

      const snap = await getDocs(collection(db, "products"));
      const all = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as any),
      })) as ProductDoc[];

      const filtered = all.filter((p) => ids.includes(p.id));
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
    };

    sessionStorage.setItem("checkoutDetails", JSON.stringify(payload));
    router.push("/checkout/review");
  };

  if (!ready) {
    return (
      <>
        <Header />
        <main className="page">
          <div className="wrap">
            <div className="loadingCard">Teslimat Sayfası Yükleniyor...</div>
          </div>
        </main>
        <Footer />

        <style jsx>{`
          .page {
            background: #f5f5eb;
            min-height: 100vh;
          }

          .wrap {
            max-width: 1200px;
            margin: 0 auto;
            padding: 48px 20px 70px;
          }

          .loadingCard {
            background: rgba(255, 255, 255, 0.82);
            border: 1px solid rgba(122, 31, 31, 0.08);
            border-radius: 18px;
            padding: 28px;
            font-weight: 700;
            color: #1c1c1c;
          }
        `}</style>
      </>
    );
  }

  if (!items.length) {
    return (
      <>
        <Header />
        <main className="page">
          <div className="wrap">
            <div className="emptyCard">
              <h1>Sepetiniz boş.</h1>
              <p>Devam etmek için sepetinize ürün ekleyin.</p>
              <Link href="/products">
                <span className="filledBtn">Halıları İncele</span>
              </Link>
            </div>
          </div>
        </main>
        <Footer />

        <style jsx>{`
          .page {
            background: #f5f5eb;
            min-height: 100vh;
          }

          .wrap {
            max-width: 1200px;
            margin: 0 auto;
            padding: 48px 20px 70px;
          }

          .emptyCard {
            background: rgba(255, 255, 255, 0.82);
            border: 1px solid rgba(122, 31, 31, 0.08);
            border-radius: 18px;
            padding: 32px;
            text-align: center;
          }

          .emptyCard h1 {
            font-size: 28px;
            font-weight: 900;
            color: #1c1c1c;
            margin-bottom: 10px;
          }

          .emptyCard p {
            color: rgba(0, 0, 0, 0.6);
            margin-bottom: 18px;
          }

          .filledBtn {
            display: inline-block;
            border: 1px solid #7a1f1f;
            background: #7a1f1f;
            color: #fff;
            padding: 10px 14px;
            border-radius: 12px;
            font-weight: 700;
            cursor: pointer;
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="page">
        <div className="wrap">
          <div className="topbar">
            <div>
              <h1 className="title">Teslimat</h1>
              <p className="subtitle">
             Siparişinizi tamamlamak için teslimat bilgilerinizi giriniz.
              </p>
            </div>

            <div className="steps">
              <span className="step active">1. Teslimat</span>
              <span className="step">2. Ödeme</span>
            </div>
          </div>

          <div className="grid">
            <section className="formCard">
              <h2>Teslimat Bilgileri</h2>



              <div className="field">
                <label>Ad Soyad *</label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
               placeholder="Ad Soyad"
                />
                {errors.fullName ? <p className="error">{errors.fullName}</p> : null}
              </div>

              <div className="field">
                <label>Adres *</label>
                <input
                  type="text"
                  value={form.streetAddress}
                  onChange={(e) => handleChange("streetAddress", e.target.value)}
                 placeholder="Mahalle, Cadde, Sokak, Bina No, Daire No"
                />
                {errors.streetAddress ? (
                  <p className="error">{errors.streetAddress}</p>
                ) : null}
              </div>

              <div className="field">
                <label>Apartman / Daire (Opsiyonel)</label>
                <input
                  type="text"
                  value={form.apartment}
                  onChange={(e) => handleChange("apartment", e.target.value)}
                  placeholder="Apartman, Kat, Daire No (Opsiyonel)"
                />
              </div>

              <div className="field">
                 <label>Şehir *</label>
              <select
    value={form.city}
    onChange={(e) => handleChange("city", e.target.value)}
>
    <option value="">Şehir Seçiniz</option>

    {TURKISH_PROVINCES.map((city) => (
        <option key={city} value={city}>
            {city}
        </option>
    ))}
</select>
                {errors.city ? <p className="error">{errors.city}</p> : null}
              </div>

          <div className="field">
    <label>İlçe *</label>

    <input
        type="text"
        value={form.district}
        onChange={(e) => handleChange("district", e.target.value)}
       placeholder="İlçe Giriniz"
    />

    {errors.district ? (
        <p className="error">{errors.district}</p>
    ) : null}
</div>

<div className="field">
    <label>Posta Kodu</label>

    <input
        type="text"
        value={form.postalCode}
        onChange={(e) => handleChange("postalCode", e.target.value)}
        placeholder="34010"
    />
</div>

<div className="field">
    <label>Telefon Numarası *</label>

    <div
        style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
        }}
    >
        <span
            style={{
                padding: "13px 16px",
                border: "1px solid rgba(122,31,31,.16)",
                borderRadius: "12px",
                background: "#fff",
                fontWeight: 700,
                minWidth: "65px",
                textAlign: "center",
            }}
        >
            +90
        </span>

        <input
            type="tel"
            value={form.phoneNumber}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
            placeholder="5XX XXX XX XX"
            style={{ flex: 1 }}
        />
    </div>

    {errors.phoneNumber ? (
        <p className="error">{errors.phoneNumber}</p>
    ) : null}
</div>

              <button
                type="button"
                className="continueBtn"
                onClick={handleContinue}
                disabled={submitting}
              >
                {submitting ? "Kaydediliyor..." : "Onay ve Ödemeye Devam Et"}
              </button>
            </section>

            <aside className="summaryCard">
              <h3>Sipariş Özeti</h3>

              <div className="summaryItems">
                {items.map((item) => (
                  <div key={item.id} className="summaryRow">
                    <div className="left">
                      <img
                        src={item.coverUrl || ""}
                        alt={item.title || "Ürün"}
                      />
                      <div className="textWrap">
                        <p className="itemTitle">
                          {item.title || "İsimsiz Ürün"}
                        </p>
                        <p className="itemMeta">
                          {item.category || "Halı"}
                          {item.size ? ` • ${item.size}` : ""}
                        </p>
                       <div className="priceWrap">
    <PriceDisplay basePrice={item.price} />
</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="totals">
                <div className="sumRow">
                  <span>Ara Toplam</span>
                <strong>
    <PriceDisplay basePrice={subtotal} />
</strong>
                </div>
                <div className="sumRow">
                  <span>Teslimat</span>
                  <strong>Ücretsiz</strong>
                </div>
                <div className="sumRow total">
                  <span>Toplam</span>
                 <strong>
    <PriceDisplay basePrice={subtotal} />
</strong>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .page {
          background: #f5f5eb;
          min-height: 100vh;
        }

        .wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 48px 20px 70px;
        }

        .topbar {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 28px;
        }

        .title {
          font-size: 42px;
          font-weight: 900;
          color: #7a1f1f;
          margin-bottom: 8px;
        }

        .subtitle {
          color: rgba(0, 0, 0, 0.6);
          line-height: 1.5;
          max-width: 560px;
        }

        .steps {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .step {
          font-size: 13px;
          font-weight: 700;
          color: rgba(0, 0, 0, 0.48);
          padding: 10px 14px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.72);
          border: 1px solid rgba(122, 31, 31, 0.08);
          white-space: nowrap;
        }

        .step.active {
          color: #7a1f1f;
          background: rgba(122, 31, 31, 0.08);
          border-color: rgba(122, 31, 31, 0.14);
        }

        .grid {
          display: grid;
          grid-template-columns: 1fr 390px;
          gap: 24px;
          align-items: start;
        }

        .formCard,
        .summaryCard {
          background: rgba(255, 255, 255, 0.82);
          border: 1px solid rgba(122, 31, 31, 0.08);
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 10px 28px rgba(122, 31, 31, 0.05);
        }

        .formCard h2,
        .summaryCard h3 {
          font-size: 22px;
          font-weight: 900;
          margin-bottom: 20px;
          color: #1c1c1c;
        }

        .field {
          margin-bottom: 16px;
        }

        .field label {
          display: block;
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 800;
          color: #4b1b1b;
        }

        .field input,
        .field select {
          width: 100%;
          border: 1px solid rgba(122, 31, 31, 0.16);
          background: #fff;
          border-radius: 12px;
          padding: 13px 14px;
          font-size: 14px;
          outline: none;
        }

        .field input:focus,
        .field select:focus {
          border-color: #7a1f1f;
          box-shadow: 0 0 0 3px rgba(122, 31, 31, 0.08);
        }

        .double {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 14px;
        }

        .error {
          margin-top: 6px;
          font-size: 13px;
          color: #b91c1c;
          font-weight: 700;
        }

        .continueBtn {
          width: 100%;
          border: none;
          background: #7a1f1f;
          color: #fff;
          font-weight: 900;
          padding: 14px 16px;
          border-radius: 14px;
          cursor: pointer;
          box-shadow: 0 10px 22px rgba(122, 31, 31, 0.22);
          margin-top: 8px;
          transition: background 0.2s ease, opacity 0.2s ease;
        }

        .continueBtn:hover {
          background: #641919;
        }

        .continueBtn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .summaryItems {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 22px;
        }

        .summaryRow {
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(122, 31, 31, 0.08);
        }

        .left {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          min-width: 0;
        }

        .left img {
          width: 58px;
          height: 78px;
          object-fit: cover;
          border-radius: 12px;
          background: #fff;
          flex-shrink: 0;
        }

        .textWrap {
          min-width: 0;
          flex: 1;
        }

        .itemTitle {
          font-size: 14px;
          font-weight: 800;
          color: #1c1c1c;
          line-height: 1.42;
          margin-bottom: 6px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          word-break: break-word;
          overflow-wrap: anywhere;
          max-width: 100%;
        }

        .itemMeta {
          font-size: 13px;
          color: rgba(0, 0, 0, 0.58);
          margin-bottom: 10px;
        }

        .priceWrap {
          font-size: 15px;
          font-weight: 900;
          color: #7a1f1f;
        }

        .totals {
          padding-top: 4px;
        }

        .sumRow {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 15px;
          margin-bottom: 12px;
          color: #1c1c1c;
        }

        .sumRow strong {
          color: #7a1f1f;
        }

        .sumRow.total {
          margin-top: 10px;
          padding-top: 14px;
          border-top: 1px solid rgba(122, 31, 31, 0.1);
          font-weight: 900;
          font-size: 17px;
        }

        @media (max-width: 1024px) {
          .grid {
            grid-template-columns: 1fr;
          }

          .topbar {
            flex-direction: column;
            align-items: flex-start;
          }

          .steps {
            justify-content: flex-start;
          }

          .title {
            font-size: 34px;
          }
        }

        @media (max-width: 640px) {
          .double {
            grid-template-columns: 1fr;
          }

          .wrap {
            padding: 32px 16px 70px;
          }

          .formCard,
          .summaryCard {
            padding: 20px;
          }

          .left img {
            width: 56px;
            height: 76px;
          }

          .itemTitle {
            font-size: 13px;
            line-height: 1.45;
          }

          .step {
            font-size: 12px;
            padding: 9px 12px;
          }
        }
      `}</style>
    </>
  );
}

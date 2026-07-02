import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DistanceSalesAgreementPage() {
  return (
    <>
      <Header />

      <main className="bg-custom-bg min-h-screen">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <h1 className="text-4xl font-extrabold text-custom-accent">
            Mesafeli Satış Sözleşmesi
          </h1>

          <div className="mt-8 space-y-10 text-[#4e473f] leading-8">

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">1. TARAFLAR</h2>
              <p className="mt-3">
                İşbu Mesafeli Satış Sözleşmesi aşağıda bilgileri bulunan ALICI ile
                SATICI arasında elektronik ortamda kurulmuştur.
              </p>
              <p className="mt-3">
                <strong>ALICI</strong> – Sipariş sırasında beyan edilen ad, soyad,
                adres ve iletişim bilgileri.
              </p>
              <p className="mt-3">
                <strong>SATICI</strong> – Keramet Halı Handmade Rugs & Kilims <br />
                BÜYÜK MİLAS HAN, Hobyar, Cemal Nadir Sk. No:24 İç Kapı No:107,
                34112 Fatih / İstanbul / Türkiye <br />
                Telefon: +90 506 527 49 30 <br />
                E-posta: support@keramethali.com
              </p>
              <p className="mt-3">
                ALICI siparişi onaylayarak ürün bedeli, kargo ücreti, varsa gümrük
                vergileri ve yasal yükümlülükleri ödemeyi kabul eder.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">2. TANIMLAR</h2>
              <p className="mt-3">
                İşbu sözleşme 6502 Sayılı Tüketicinin Korunması Hakkında Kanun ve
                Mesafeli Sözleşmeler Yönetmeliği hükümlerine uygun olarak
                hazırlanmıştır.
              </p>
              <p className="mt-3">
                Türkiye dışındaki satışlarda, ALICI'nın ülkesindeki emredici
                tüketici hükümleri saklı kalmak üzere Türk Hukuku uygulanacaktır.
              </p>
              <p className="mt-3">
                Sitede belirtilen fiyatlar aksi belirtilmedikçe USD cinsindendir.
                Döviz kuru ve banka komisyonlarından SATICI sorumlu değildir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">3. KONU</h2>
              <p className="mt-3">
                Bu sözleşme internet sitesi üzerinden sipariş verilen el dokuması
                halı ve kilimlerin satışı, ödemesi, teslimatı ve tarafların hak ve
                yükümlülüklerini düzenler.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">4. SATICI BİLGİLERİ</h2>
              <p className="mt-3">
                Keramet Halı Handmade Rugs & Kilims<br/>
                BÜYÜK MİLAS HAN, Hobyar, Cemal Nadir Sk. No:24 İç Kapı No:107,
                Fatih / İstanbul / Türkiye<br/>
                Telefon: +90 506 527 49 30<br/>
                E-posta: support@keramethali.com
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">5. ALICI BİLGİLERİ</h2>
              <p className="mt-3">
                Sipariş sırasında girilen teslimat ve fatura bilgileri resmi
                kayıt olarak esas alınacaktır.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">
                6. TESLİMAT, ULUSLARARASI GÖNDERİ VE GÜMRÜK
              </h2>
              <p className="mt-3">
                SATICI ürünlerini Türkiye'den dünyanın birçok ülkesine gönderir.
                Teslimat süreleri ülke, taşıyıcı firma ve gümrük işlemlerine göre
                değişebilir.
              </p>
              <p className="mt-3">
                Gümrük vergileri, ithalat masrafları ve yerel vergiler ALICI'ya
                aittir. SATICI gümrük gecikmelerinden sorumlu değildir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">7. ÖDEME</h2>
              <p className="mt-3">
                Siparişler yalnızca ödemenin başarıyla tamamlanmasının ardından
                işleme alınır. SATICI şüpheli işlemleri doğrulama veya iptal etme
                hakkını saklı tutar.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">8. GÜVENLİK</h2>
              <p className="mt-3">
                Dolandırıcılığı önlemek amacıyla kimlik doğrulaması veya ek belge
                talep edilebilir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">9. GENEL HÜKÜMLER</h2>
              <div className="mt-3 whitespace-pre-line">{`ALICI ürün özelliklerini, fiyatı, ödeme ve teslimat bilgilerini okuyup onayladığını kabul eder.

Ürünler yasal süre içerisinde teslim edilir.

SATICI gerekli hallerde eşdeğer ürün sunabilir.

Mücbir sebepler teslimat sürelerini etkileyebilir.

ALICI teslim sırasında ürünü kontrol etmekle yükümlüdür.

Yanlış bilgi verilmesinden doğacak sonuçlardan ALICI sorumludur.`}</div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">10. CAYMA HAKKI</h2>
              <p className="mt-3">
                ALICI, yürürlükteki mevzuat kapsamında teslimden itibaren 14 gün
                içinde cayma hakkını kullanabilir. İade şartları İade Politikası
                kapsamında değerlendirilir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">11. İADE EDİLEMEYEN ÜRÜNLER</h2>
              <p className="mt-3">
                Kişiye özel hazırlanan veya değişiklik yapılan ürünlerde ilgili
                mevzuat hükümleri uygulanır.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">12. TEMERRÜT</h2>
              <p className="mt-3">
                Ödeme yükümlülüğünün yerine getirilmemesi halinde yürürlükteki
                mevzuat hükümleri uygulanacaktır.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">13. YETKİLİ MERCİ</h2>
              <p className="mt-3">
                Uyuşmazlıklarda T.C. Ticaret Bakanlığı tarafından belirlenen
                parasal sınırlar dahilinde Tüketici Hakem Heyetleri ve Tüketici
                Mahkemeleri yetkilidir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">14. YÜRÜRLÜK</h2>
              <p className="mt-3">
                Siparişin tamamlanması ile ALICI bu sözleşmenin tüm hükümlerini
                kabul etmiş sayılır.
              </p>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

export default function TermsPage() {
  return (
    <>
      <Header />

      <main className="bg-custom-bg min-h-screen">
        <PageHero title="Kullanım Koşulları" label="Politikalar" crumbs={[{ label: "Kullanım Koşulları" }]} />

        <div className="mx-auto max-w-4xl px-6 py-10 lg:px-10 lg:py-14">

          <div className="space-y-10 rounded-sm border border-line bg-paper p-6 text-[15px] leading-8 text-ink/80 md:p-10 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:text-ink [&_strong]:text-ink [&_a]:text-custom-accent [&_a]:underline">

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">
                Genel Hükümler
              </h2>

              <p className="mt-3">
                Bu web sitesini ziyaret ederek, kullanarak veya sipariş vererek
                işbu Kullanım Koşulları'nı kabul etmiş sayılırsınız. Bu
                koşulları kabul etmiyorsanız web sitesini kullanmamalı ve
                herhangi bir satın alma işlemi gerçekleştirmemelisiniz.
              </p>

              <p className="mt-3">
                Web sitemiz uluslararası müşterilere hizmet vermektedir.
                Aksi belirtilmediği sürece ürün fiyatları ödeme aşamasında
                belirtilen para birimi üzerinden sunulur.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">
                Ürün Bilgileri
              </h2>

              <p className="mt-3">
                Ürünlerimizi mümkün olduğunca doğru şekilde sunmaya özen
                gösteriyoruz. Ancak halılarımız el dokuması olduğundan renk,
                desen, ölçü ve doku açısından küçük farklılıklar oluşabilir.
                Bu durum ürün kusuru olarak değerlendirilmez.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">
                Fiyatlandırma
              </h2>

              <p className="mt-3">
                Ürün fiyatları önceden haber verilmeksizin değiştirilebilir.
                Fiyatlandırma, yazım veya listeleme hatalarının tespit edilmesi
                halinde sipariş oluşturulmuş olsa dahi gerekli düzeltmeler
                yapılabilir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">
                Siparişler
              </h2>

              <p className="mt-3">
                Siparişleri kabul etme, reddetme veya iptal etme hakkı saklıdır.
                Bu durum; stok yetersizliği, fiyat hataları, ödeme sorunları,
                şüpheli işlemler veya bu kullanım koşullarının ihlali gibi
                durumları kapsayabilir.
              </p>

              <p className="mt-3">
                Ödeme alındıktan sonra siparişin iptal edilmesi halinde,
                ödemeniz kullanılan ödeme yöntemine iade edilir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">
                Kargo ve Teslimat
              </h2>

              <p className="mt-3">
                Siparişlerin gönderimi ve teslimatı Kargo Politikamız
                doğrultusunda gerçekleştirilir.
              </p>

              <p className="mt-3">
                Teslimat süreleri tahmini olup; gümrük işlemleri, taşıyıcı firma
                gecikmeleri veya kontrolümüz dışındaki nedenlere bağlı olarak
                değişebilir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">
                Mücbir Sebepler
              </h2>

              <p className="mt-3">
                Doğal afetler, savaşlar, grevler, salgın hastalıklar, gümrük
                gecikmeleri, taşıyıcı firma sorunları ve benzeri kontrolümüz
                dışındaki nedenlerden kaynaklanan gecikme veya yükümlülüklerin
                yerine getirilememesinden sorumlu tutulamayız.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">
                Sorumluluğun Sınırlandırılması
              </h2>

              <p className="mt-3">
                Yürürlükteki mevzuatın izin verdiği ölçüde, web sitesinin
                kullanımından veya ürün satın alınmasından kaynaklanabilecek
                dolaylı, tesadüfi veya sonuç niteliğindeki zararlardan sorumlu
                tutulamayız.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">
                Uygulanacak Hukuk
              </h2>

              <p className="mt-3">
                İşbu Kullanım Koşulları Türkiye Cumhuriyeti kanunlarına tabidir.
                Türkiye dışında ikamet eden tüketiciler bakımından, bulundukları
                ülkedeki zorunlu tüketici koruma hükümleri saklıdır.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">
                Değişiklikler
              </h2>

              <p className="mt-3">
                Bu Kullanım Koşulları gerekli görüldüğünde güncellenebilir.
                Güncellenmiş metnin web sitesinde yayımlanmasının ardından
                sitenin kullanılmaya devam edilmesi, yeni koşulların kabul
                edildiği anlamına gelir.
              </p>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

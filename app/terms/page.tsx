import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <>
      <Header />

      <main className="bg-custom-bg min-h-screen">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <h1 className="text-4xl font-extrabold text-custom-accent">
            Kullanım Koşulları
          </h1>

          <div className="mt-8 space-y-8 text-[#4e473f] leading-8">

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

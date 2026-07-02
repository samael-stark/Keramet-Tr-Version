import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ShippingPolicyPage() {
  return (
    <>
      <Header />

      <main className="bg-custom-bg min-h-screen">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <h1 className="text-4xl font-extrabold text-custom-accent">
            Kargo Politikası
          </h1>

          <div className="mt-8 space-y-8 text-[#4e473f] leading-8">

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">
                Sipariş Hazırlama Süresi
              </h2>

              <p className="mt-3">
                Aksi belirtilmediği sürece siparişleriniz genellikle 2–5 iş günü
                içerisinde hazırlanarak kargoya teslim edilir.
              </p>

              <p className="mt-3">
                Yoğun dönemlerde, resmi tatillerde veya el dokuması ve özel
                üretim halılarda hazırlık süresi daha uzun olabilir.
              </p>

              <p className="mt-3">
                Siparişler yalnızca ödemenin başarıyla onaylanmasının ardından
                gönderime hazırlanır.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">
                Teslimat
              </h2>

              <p className="mt-3">
                Siparişlerimiz Türkiye'den dünyanın birçok ülkesine
                gönderilmektedir.
              </p>

              <p className="mt-3">
                Teslimat süresi; teslimat ülkesi, tercih edilen kargo firması ve
                gümrük işlemlerine bağlı olarak değişiklik gösterebilir.
              </p>

              <p className="mt-3">
                Belirtilen teslimat süreleri yalnızca tahmini sürelerdir ve
                kontrolümüz dışında gelişebilecek nedenlerle gecikmeler
                yaşanabilir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">
                Kargo Takibi
              </h2>

              <p className="mt-3">
                Siparişiniz kargoya verildikten sonra, uygun olduğu durumlarda
                gönderinizi takip edebilmeniz için takip bilgileri sizinle
                paylaşılır.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">
                Gümrük Vergileri ve İthalat Masrafları
              </h2>

              <p className="mt-3">
                Uluslararası siparişler, teslimat yapılacak ülkenin uyguladığı
                gümrük vergileri, KDV, ithalat vergileri veya diğer yerel
                ücretlere tabi olabilir.
              </p>

              <p className="mt-3">
                Bu masraflar ürün fiyatına veya kargo ücretine dahil değildir ve
                tamamen müşterinin sorumluluğundadır.
              </p>

              <p className="mt-3">
                Satıcı, gümrük işlemleri nedeniyle oluşabilecek gecikmeler,
                ek ücretler veya resmi makamların uyguladığı işlemlerden sorumlu
                değildir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">
                Gecikmeler ve Mücbir Sebepler
              </h2>

              <p className="mt-3">
                Kargo firmaları, gümrük işlemleri, olumsuz hava koşulları,
                grevler, savaşlar, salgın hastalıklar veya kontrolümüz dışında
                gelişen diğer mücbir sebepler nedeniyle oluşabilecek
                gecikmelerden sorumlu değiliz.
              </p>

              <p className="mt-3">
                Bu gibi durumlarda teslimat süresi uzayabilir ve satıcının
                herhangi bir sorumluluğu doğmaz.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">
                Kayıp veya Geciken Gönderiler
              </h2>

              <p className="mt-3">
                Gönderinizin gecikmesi veya kaybolduğunun düşünülmesi halinde,
                gerekli incelemenin yapılabilmesi için ilgili kargo firması ile
                iş birliği sağlarız.
              </p>

              <p className="mt-3">
                Ancak sipariş kargo firmasına teslim edildikten sonra teslimat
                sürecinin sorumluluğu ilgili taşıyıcı firmaya aittir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">
                Teslimat Adresi
              </h2>

              <p className="mt-3">
                Müşteriler, teslimat adresi bilgilerinin eksiksiz ve doğru
                olduğundan sorumludur.
              </p>

              <p className="mt-3">
                Yanlış veya eksik adres bilgilerinden kaynaklanan gecikmelerden,
                teslim edilemeyen gönderilerden veya ek kargo ücretlerinden
                satıcı sorumlu değildir.
              </p>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

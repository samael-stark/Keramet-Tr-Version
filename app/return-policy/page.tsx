import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ReturnPolicyPage() {
  return (
    <>
      <Header />

      <main className="bg-custom-bg min-h-screen">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <h1 className="text-4xl font-extrabold text-custom-accent">
            İade Politikası
          </h1>

          <div className="mt-8 space-y-8 text-[#4e473f] leading-8">

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">
                İade Hakkı
              </h2>

              <p className="mt-3">
                Satın aldığınız üründen memnun kalmanız bizim için önemlidir.
                Siparişinizi teslim aldıktan sonra, yürürlükteki tüketici
                mevzuatına uygun olarak 14 gün içerisinde bizimle iletişime
                geçerek iade talebinde bulunabilirsiniz.
              </p>

              <p className="mt-3">
                İade işlemini başlatmadan önce, herhangi bir ürünü geri
                göndermeden önce bizimle iletişime geçmeniz gerekmektedir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">
                İade Koşulları
              </h2>

              <p className="mt-3">
                İade edilecek ürünler kullanılmamış, yıkanmamış, zarar
                görmemiş ve mümkünse orijinal ambalajı ile birlikte
                gönderilmelidir.
              </p>

              <p className="mt-3">
                Kullanım, hasar, değişiklik veya aşınma belirtileri bulunan
                ürünler iade kapsamına alınmayabilir.
              </p>

              <p className="mt-3">
                Varsa ürünle birlikte gönderilen tüm aksesuarlar, etiketler ve
                orijinal ambalaj da iade paketine dahil edilmelidir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">
                İade Kargo Ücretleri
              </h2>

              <p className="mt-3">
                Ürün hatalı, hasarlı veya yanlış gönderilmediği sürece iade
                kargo masrafları müşteriye aittir.
              </p>

              <p className="mt-3">
                Uluslararası siparişlerde iade gönderiminin organizasyonu,
                kargo ücretleri, gümrük vergileri, ithalat/ihracat masrafları ve
                uygulanabilecek diğer yerel vergiler müşterinin
                sorumluluğundadır.
              </p>

              <p className="mt-3">
                Satıcı; gümrük işlemleri, taşıyıcı firmalar veya resmi kurumlar
                nedeniyle oluşabilecek gecikmelerden, kayıplardan veya iade
                gönderisinin alıkonulmasından sorumlu değildir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">
                Para İadesi
              </h2>

              <p className="mt-3">
                İade edilen ürün tarafımıza ulaşıp kontrol edildikten sonra,
                onaylanan iadeler ödeme sırasında kullanılan aynı ödeme yöntemi
                ile gerçekleştirilecektir.
              </p>

              <p className="mt-3">
                Para iadesinin hesabınıza yansıma süresi, bankanıza veya ödeme
                kuruluşuna bağlı olarak değişebilir. Bu süreç genellikle onaydan
                sonra 5 ila 14 iş günü arasında tamamlanmaktadır.
              </p>

              <p className="mt-3">
                İade nedeni firmamızdan kaynaklanan bir hata (yanlış veya
                kusurlu ürün gönderimi) olmadığı sürece, ilk gönderim kargo
                ücreti iade edilmez.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">
                İade Edilemeyen Ürünler
              </h2>

              <p className="mt-3">
                Özel ölçüyle hazırlanan, kişiye özel üretilen veya müşteri
                talebine göre değiştirilen ürünler; hasarlı veya yanlış
                gönderilmedikleri sürece iade edilemez.
              </p>

              <p className="mt-3">
                Ayrıca yürürlükteki mevzuat kapsamında hijyen veya güvenlik
                nedeniyle iadesi mümkün olmayan ürünler de iade kapsamı dışında
                tutulabilir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">
                İade Gönderi Takibi
              </h2>

              <p className="mt-3">
                İade gönderileriniz için kargo takip numarasını ve gönderi
                belgesini saklamanızı tavsiye ederiz.
              </p>

              <p className="mt-3">
                İade sürecinde taşıma sırasında kaybolan veya geciken
                gönderilerden firmamız sorumlu değildir.
              </p>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

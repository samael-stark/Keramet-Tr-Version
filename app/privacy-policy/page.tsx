import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />

      <main className="bg-custom-bg min-h-screen">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <h1 className="text-4xl font-extrabold text-custom-accent">
            Gizlilik Politikası
          </h1>

          <div className="mt-8 space-y-8 text-[#4e473f] leading-8">

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">
                Genel Bakış
              </h2>

              <p className="mt-3">
                Keramet Halı, kişisel verilerinizin gizliliğine önem verir ve
                bilgilerinizin korunmasını taahhüt eder. Bu Gizlilik Politikası,
                web sitemizi ziyaret ettiğinizde veya sipariş verdiğinizde
                kişisel verilerinizin nasıl toplandığını, kullanıldığını,
                saklandığını ve korunduğunu açıklar. Veri işleme süreçlerimiz,
                yürürlükteki veri koruma mevzuatı ve uluslararası gizlilik
                standartları doğrultusunda yürütülmektedir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">
                Toplanan Bilgiler
              </h2>

              <p className="mt-3">
                Web sitemizi kullandığınızda veya sipariş oluşturduğunuzda ad,
                soyad, e-posta adresi, telefon numarası, fatura ve teslimat
                adresi, ödeme bilgileri (güvenli şekilde üçüncü taraf ödeme
                sağlayıcıları tarafından işlenir) ve sipariş geçmişi gibi
                kişisel bilgileri toplayabiliriz.
              </p>

              <p className="mt-3">
                Ayrıca web sitemizin güvenliğini ve performansını geliştirmek
                amacıyla IP adresi, tarayıcı türü ve cihaz bilgileri gibi sınırlı
                teknik veriler de toplanabilir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">
                Bilgileriniz Nasıl Kullanılır?
              </h2>

              <p className="mt-3">
                Kişisel bilgileriniz; siparişlerinizi işlemek ve teslim etmek,
                müşteri desteği sağlamak, siparişleriniz hakkında sizinle
                iletişime geçmek, hizmetlerimizi geliştirmek, dolandırıcılığı
                önlemek ve yasal yükümlülüklerimizi yerine getirmek amacıyla
                kullanılmaktadır.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">
                Veri İşlemenin Hukuki Dayanağı
              </h2>

              <p className="mt-3">
                Kişisel verileriniz; satış sözleşmesinin yerine getirilmesi,
                yasal yükümlülüklerin yerine getirilmesi (vergi ve muhasebe
                işlemleri) ve meşru menfaatlerimiz (müşteri hizmetleri,
                dolandırıcılığın önlenmesi ve hizmet kalitesinin artırılması)
                kapsamında işlenmektedir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">
                Ödeme Güvenliği
              </h2>

              <p className="mt-3">
                Tüm ödemeler güvenli üçüncü taraf ödeme sağlayıcıları aracılığıyla
                gerçekleştirilmektedir. Kredi veya banka kartı bilgileriniz
                sunucularımızda saklanmaz.
              </p>

              <p className="mt-3">
                Ödeme işlemleri, uygulanabilir sektör güvenlik standartlarına
                (örneğin PCI-DSS) uygun şekilde yürütülmektedir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">
                Çerezler (Cookies) ve Takip Teknolojileri
              </h2>

              <p className="mt-3">
                Web sitemiz kullanıcı deneyimini geliştirmek, ziyaretçi
                istatistiklerini analiz etmek ve performansı artırmak amacıyla
                çerezler ve benzeri teknolojiler kullanabilir. Tarayıcı
                ayarlarınız üzerinden çerezleri devre dışı bırakabilirsiniz;
                ancak bu durumda bazı özellikler düzgün çalışmayabilir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">
                Verilerin Paylaşılması
              </h2>

              <p className="mt-3">
                Kişisel verileriniz hiçbir şekilde satılmaz veya ticari amaçla
                üçüncü kişilerle paylaşılmaz.
              </p>

              <p className="mt-3">
                Siparişlerinizin işlenmesi ve teslimatı için yalnızca ödeme
                kuruluşları, kargo firmaları ve teknik hizmet sağlayıcıları gibi
                güvenilir iş ortaklarımızla gerekli ölçüde veri paylaşımı
                yapılabilir.
              </p>

              <p className="mt-3">
                Siparişinizin teslimat adresine bağlı olarak verileriniz,
                uluslararası gönderim süreçleri kapsamında farklı ülkelere
                aktarılabilir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">
                Veri Saklama Süresi
              </h2>

              <p className="mt-3">
                Kişisel verileriniz yalnızca bu politikada belirtilen amaçların
                yerine getirilmesi ve yasal yükümlülüklerin karşılanması için
                gerekli olan süre boyunca saklanmaktadır.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">
                Haklarınız
              </h2>

              <p className="mt-3">
                Bulunduğunuz ülkenin yürürlükteki mevzuatına bağlı olarak,
                kişisel verilerinize erişme, düzeltme, güncelleme veya silinmesini
                talep etme hakkına sahip olabilirsiniz. Ayrıca belirli veri işleme
                faaliyetlerine itiraz etme veya bunların sınırlandırılmasını
                isteme hakkınız da bulunabilir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">
                Veri Güvenliği
              </h2>

              <p className="mt-3">
                Kişisel verilerinizi yetkisiz erişim, kayıp, kötüye kullanım ve
                izinsiz açıklamaya karşı korumak amacıyla uygun teknik ve idari
                güvenlik önlemleri uygulanmaktadır.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">
                İletişim
              </h2>

              <p className="mt-3">
                Gizlilik Politikamız veya kişisel verilerinizin işlenmesi hakkında
                sorularınız olması durumunda, web sitemizde yer alan iletişim
                bilgilerimiz üzerinden bizimle iletişime geçebilirsiniz.
              </p>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

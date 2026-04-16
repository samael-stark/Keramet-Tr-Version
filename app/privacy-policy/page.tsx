import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />

      <main className="bg-custom-bg min-h-screen">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <h1 className="text-4xl font-extrabold text-custom-accent">
            Privacy Policy
          </h1>

          <div className="mt-8 space-y-8 text-[#4e473f] leading-8">
            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">Overview</h2>
              <p className="mt-3">
                Keramet Hali values your privacy and is committed to protecting
                your personal information. This Privacy Policy explains what
                data we collect, how we use it, and how we protect it when you
                visit our website or place an order.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">Information We Collect</h2>
              <p className="mt-3">
                We may collect information such as your name, email address,
                phone number, shipping address, billing information, and order
                details when you interact with our website or place an order.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">How We Use Your Information</h2>
              <p className="mt-3">
                We use your information to process orders, communicate with you,
                provide customer support, improve our services, and deliver a
                better shopping experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">Payment Security</h2>
              <p className="mt-3">
                Payment details are processed securely through third-party
                payment providers. We do not store sensitive full payment card
                information on our website servers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">Data Sharing</h2>
              <p className="mt-3">
                We do not sell your personal data. We may share limited
                information only with trusted service providers when necessary
                to process payments, fulfill orders, deliver shipments, or
                comply with legal obligations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">Your Rights</h2>
              <p className="mt-3">
                You may contact us if you would like to review, update, or
                request deletion of your personal information, subject to
                applicable legal requirements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">Contact</h2>
              <p className="mt-3">
                If you have any questions about this Privacy Policy, please
                contact Keramet Hali through the contact details provided on our
                website.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

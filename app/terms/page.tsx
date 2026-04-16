import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <>
      <Header />

      <main className="bg-custom-bg min-h-screen">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <h1 className="text-4xl font-extrabold text-custom-accent">
            Terms & Conditions
          </h1>

          <div className="mt-8 space-y-8 text-[#4e473f] leading-8">
            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">General</h2>
              <p className="mt-3">
                By using this website and placing an order, you agree to these
                Terms & Conditions. Please read them carefully before making a
                purchase.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">Product Information</h2>
              <p className="mt-3">
                We aim to present products as accurately as possible. Because
                rugs are handmade, slight variations in color, size, and detail
                may naturally occur.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">Pricing</h2>
              <p className="mt-3">
                Prices displayed on the website are subject to change without
                notice. We reserve the right to correct pricing or listing
                errors where necessary.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">Orders</h2>
              <p className="mt-3">
                We reserve the right to accept, refuse, or cancel orders if
                necessary, including cases involving pricing issues,
                availability, or suspected unauthorized activity.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">Liability</h2>
              <p className="mt-3">
                We are not responsible for indirect or consequential damages
                arising from the use of this website or the purchase of our
                products, except where required by applicable law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">Changes</h2>
              <p className="mt-3">
                We may update these Terms & Conditions from time to time.
                Continued use of the website after changes means you accept the
                updated terms.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

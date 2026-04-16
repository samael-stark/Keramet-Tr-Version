import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ShippingPolicyPage() {
  return (
    <>
      <Header />

      <main className="bg-custom-bg min-h-screen">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <h1 className="text-4xl font-extrabold text-custom-accent">
            Shipping Policy
          </h1>

          <div className="mt-8 space-y-8 text-[#4e473f] leading-8">
            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">Processing Time</h2>
              <p className="mt-3">
                Orders are usually processed within a few business days unless
                otherwise stated. Processing times may vary during busy periods
                or for special orders.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">Delivery</h2>
              <p className="mt-3">
                We offer worldwide shipping. Delivery time depends on the
                destination country, carrier, and customs procedures where
                applicable.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">Tracking</h2>
              <p className="mt-3">
                Tracking information will be provided when available so you can
                monitor your shipment after dispatch.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">Customs & Duties</h2>
              <p className="mt-3">
                International customers may be responsible for customs duties,
                import taxes, or local fees depending on the destination
                country’s regulations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">Delays</h2>
              <p className="mt-3">
                Delivery delays caused by carriers, customs, weather, or other
                events outside our control may occur and are not always
                preventable.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

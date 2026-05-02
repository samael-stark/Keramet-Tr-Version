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
                Orders are typically processed within 2–5 business days unless otherwise stated.
                Processing time may be longer during peak seasons, holidays, or for handmade and custom-made rugs.
              </p>
              <p className="mt-3">
                Orders are only shipped after payment confirmation is completed successfully.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">Delivery</h2>
              <p className="mt-3">
                We offer worldwide shipping from Turkey.
                Delivery times vary depending on the destination country, shipping carrier, and customs clearance procedures.
              </p>
              <p className="mt-3">
                Estimated delivery times are provided for reference only and are not guaranteed,
                as delays may occur due to external factors beyond our control.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">Tracking</h2>
              <p className="mt-3">
                Tracking information will be provided once your order has been shipped,
                allowing you to monitor your shipment through the carrier’s system when available.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">Customs, Import Taxes & Duties</h2>
              <p className="mt-3">
                International orders may be subject to customs duties, import taxes, VAT, or other local charges
                imposed by the destination country.
              </p>
              <p className="mt-3">
                These charges are the sole responsibility of the customer and are not included in the product price or shipping fee.
              </p>
              <p className="mt-3">
                The SELLER is not responsible for delays, seizures, or additional charges caused by customs authorities.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">Delays & Force Majeure</h2>
              <p className="mt-3">
                We are not responsible for delays caused by shipping carriers, customs processing, weather conditions,
                strikes, wars, pandemics, or other events beyond our reasonable control.
              </p>
              <p className="mt-3">
                In such cases, delivery times may be extended without liability on the part of the SELLER.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">Lost or Delayed Shipments</h2>
              <p className="mt-3">
                If a shipment is delayed or appears lost, we will cooperate with the shipping carrier to investigate the issue.
              </p>
              <p className="mt-3">
                However, final responsibility for delivery rests with the shipping carrier once the order has been dispatched.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">Address Accuracy</h2>
              <p className="mt-3">
                Customers are responsible for providing complete and accurate shipping information.
                We are not responsible for delays or non-delivery caused by incorrect or incomplete addresses.
              </p>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

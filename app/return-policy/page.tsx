import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ReturnPolicyPage() {
  return (
    <>
      <Header />

      <main className="bg-custom-bg min-h-screen">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <h1 className="text-4xl font-extrabold text-custom-accent">
            Return Policy
          </h1>

          <div className="mt-8 space-y-8 text-[#4e473f] leading-8">
            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">Returns</h2>
              <p className="mt-3">
                We want you to be satisfied with your purchase. If you are not
                fully satisfied, you may contact us within 14 days of receiving
                your order to request a return.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">Return Conditions</h2>
              <p className="mt-3">
                Returned items must be in their original condition, unused, and
                returned with original packaging where possible. Items damaged
                due to misuse may not qualify for a refund.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">Return Shipping Costs</h2>
              <p className="mt-3">
                Return cargo and shipping charges are the responsibility of the
                customer. Customers are responsible for arranging and paying for
                the return shipment unless the item arrives damaged or incorrect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">Refunds</h2>
              <p className="mt-3">
                Once the returned item is received and inspected, approved
                refunds will be issued to the original payment method within a
                reasonable processing period.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">Non-Returnable Cases</h2>
              <p className="mt-3">
                Custom, altered, or specially requested items may not be
                eligible for return unless they arrive damaged or incorrect.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

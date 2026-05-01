import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DistanceSellingAgreementPage() {
  return (
    <>
      <Header />

      <main className="bg-custom-bg min-h-screen">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 py-16 lg:py-20">

          <h1 className="text-4xl font-extrabold text-custom-accent">
            Distance Selling Agreement
          </h1>

          <div className="mt-8 space-y-8 text-[#4e473f] leading-8">

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">Overview</h2>

              <p className="mt-3">
                Sample Distance Selling Agreement<br />
                The distance selling contract included on this page is for illustrative purposes only.
                The clauses may vary depending on the industry. You should adapt it to your company’s needs.
              </p>

              <p className="mt-3">
                Access<br />
                You can edit the agreements in Content Management &gt;&gt; Pages. Click here for help about Pages section.
              </p>

              <p className="mt-3">
                The site owner is responsible for the content of the sample contract; no liability is accepted for its use.
              </p>

              <p className="mt-3">
                NOTE: THIS IS AN EXAMPLE. Please customize it and seek legal advice before using.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">1. Parties</h2>

              <p className="mt-3">
                This Agreement is made between BUYER and SELLER under the terms below.
              </p>

              <p className="mt-3">
                BUYER:<br />
                NAME-SURNAME:<br />
                ADDRESS:
              </p>

              <p className="mt-3">
                SELLER:<br />
                NAME-SURNAME:<br />
                ADDRESS:
              </p>

              <p className="mt-3">
                By placing an order, the BUYER agrees to pay all charges including product price,
                taxes, and shipping fees.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">2. Definitions</h2>

              <p className="mt-3">
                MINISTER: Minister of Customs and Trade<br />
                MINISTRY: Ministry of Customs and Trade<br />
                LAW: Law No. 6502 on Consumer Protection<br />
                REGULATION: Regulation on Distance Contracts<br />
                SELLER: Company offering goods or services<br />
                BUYER: Person purchasing goods or services for non-commercial use<br />
                SITE: Seller’s website<br />
                AGREEMENT: This contract between BUYER and SELLER<br />
                GOODS: Physical or digital products
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">3. Subject</h2>

              <p className="mt-3">
                This agreement covers the sale and delivery of products ordered electronically through the website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">4. Seller Information</h2>

              <p className="mt-3">
                Title:<br />
                Address:<br />
                Phone:<br />
                Fax:<br />
                Email:
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">5. Buyer Information</h2>

              <p className="mt-3">
                Recipient:<br />
                Delivery Address:<br />
                Phone:<br />
                Email:
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">7. Product Information</h2>

              <p className="mt-3">
                Product details, pricing, and availability are shown on the website at the time of purchase.
              </p>

              <p className="mt-3">
                Product Description / Quantity / Unit Price / Total (VAT Included)<br />
                Product<br />
                Shipping Fee:<br />
                Total:
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">9. General Provisions</h2>

              <p className="mt-3">
                The BUYER confirms they have read and accepted all terms before completing the order.
              </p>

              <p className="mt-3">
                Delivery is completed within the legal timeframe not exceeding 30 days.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">10. Right of Withdrawal</h2>

              <p className="mt-3">
                The BUYER may withdraw within 14 days of receiving the product without providing any reason.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">11. Exceptions</h2>

              <p className="mt-3">
                Custom-made products, hygiene items, and perishable goods are excluded from withdrawal rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">12. Payment Default</h2>

              <p className="mt-3">
                In case of failed payment, the BUYER is responsible for bank charges and interest.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">13. Disputes</h2>

              <p className="mt-3">
                Consumer arbitration boards or courts in the buyer’s region will handle disputes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d2823]">14. Acceptance</h2>

              <p className="mt-3">
                The BUYER accepts all terms once payment is completed on the website.
              </p>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

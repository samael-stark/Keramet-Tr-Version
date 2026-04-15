import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/CategoriesSlider";
import BestSeller from "@/components/BestSeller";
import Reviews from "@/components/Reviews";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { adminDb } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

export default async function Home() {
  const snap = await adminDb.collection("products").get();

  let products = snap.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      title: data.title || "",
      coverUrl: data.coverUrl || "",
      price: Number(data.price || 0),
      category: data.category || "",
      isActive: data.isActive ?? true,
    };
  });

  products = products
    .filter((p) => p.isActive !== false)
    .sort(() => 0.5 - Math.random())
    .slice(0, 6);

  return (
    <>
      <Header />
      <Hero />
      <Categories />
      <BestSeller products={products} />
      <Reviews />
      <About />
      <Contact />
      <Footer />
    </>
  );
}

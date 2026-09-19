import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-neutral-100 px-5 py-28 md:px-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm uppercase tracking-[0.4em] text-neutral-500">Our story</p>
          <h1 className="mt-3 text-5xl font-black md:text-7xl">ABOUT STITCHY FASHION</h1>
          <section className="mt-12 grid gap-8 lg:grid-cols-2">
            <div className="rounded-[35px] bg-black p-8 text-white md:p-12">
              <p className="text-7xl font-black">30</p>
              <p className="mt-2 text-xl text-neutral-400">years of coat cutting and stitching experience</p>
            </div>
            <div className="rounded-[35px] bg-white p-8 shadow-xl md:p-12">
              <h2 className="text-3xl font-black">Crafted around you</h2>
              <p className="mt-5 leading-8 text-neutral-600">Stitchy Fashion creates carefully measured coats, blazers, waistcoats and traditional formalwear for customers in Lahore and beyond. Every order is shaped around your fit, style and occasion.</p>
              <p id="location" className="mt-5 font-bold">Street No. 31, Muslim Abad, Mughalpura, Lahore, Pakistan</p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSlider />

      <section className="px-6 py-24 md:px-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl font-black md:text-6xl">
            Why Choose Stitchy Fashion?
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-4">
            {[
              ["30 Years", "Professional experience"],
              ["Custom Fit", "Measurements made for you"],
              ["Premium", "Careful coat cutting & stitching"],
              ["Support", "Direct customer service"],
            ].map(([title, description]) => (
              <div
                key={title}
                className="glass rounded-3xl p-7 shadow-lg"
              >
                <h3 className="text-2xl font-black">{title}</h3>
                <p className="mt-3 text-neutral-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="location" className="bg-neutral-950 px-6 py-24 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm uppercase tracking-[0.4em] text-neutral-500">
            Visit Us
          </p>

          <h2 className="mt-4 text-4xl font-black md:text-6xl">
            STITCHY FASHION
          </h2>

          <p className="mt-5 max-w-xl text-neutral-400">
            Street No. 31, Muslim Abad, Mughalpura, Lahore, Pakistan
          </p>

          <a
            href="https://wa.me/923289509594"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-full bg-white px-7 py-4 font-bold text-black"
          >
            WhatsApp: 03289509594
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
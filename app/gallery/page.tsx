import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const looks = ["Formal tailoring", "Wedding coats", "Prince coats", "Premium waistcoats", "Modern blazers", "Traditional style"];

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-neutral-100 px-5 py-28 md:px-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm uppercase tracking-[0.4em] text-neutral-500">The work</p>
          <h1 className="mt-3 text-5xl font-black md:text-7xl">GALLERY</h1>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {looks.map((look, index) => (
              <article key={look} className="group overflow-hidden rounded-[30px] bg-white shadow-xl">
                <div className="flex h-72 items-center justify-center bg-gradient-to-br from-neutral-200 via-neutral-800 to-black">
                  <div className="coat-float h-48 w-32 rounded-[30px] border border-white/20 bg-gradient-to-b from-neutral-700 to-black shadow-2xl" />
                </div>
                <div className="p-6"><p className="text-xs text-neutral-400">LOOK 0{index + 1}</p><h2 className="mt-2 text-xl font-black">{look}</h2><p className="mt-2 text-neutral-600">Measured, cut and finished by Stitchy Fashion.</p></div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

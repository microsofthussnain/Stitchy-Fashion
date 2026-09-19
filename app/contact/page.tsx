import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-neutral-100 px-5 py-28 md:px-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm uppercase tracking-[0.4em] text-neutral-500">Stitchy Fashion</p>
          <h1 className="mt-3 text-5xl font-black md:text-7xl">CONTACT US</h1>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <section className="rounded-[35px] bg-black p-8 text-white md:p-12">
              <p className="text-sm uppercase tracking-[0.3em] text-neutral-400">Visit or message us</p>
              <h2 className="mt-5 text-3xl font-black">Let&apos;s make your next coat.</h2>
              <div className="mt-8 space-y-4 text-neutral-300">
                <p>03289509594</p>
                <p>Street No. 31, Muslim Abad, Mughalpura, Lahore, Pakistan</p>
              </div>
              <Link href="/customer/chat" className="mt-8 inline-block rounded-full bg-white px-7 py-4 font-bold text-black">
                OPEN CUSTOMER CHAT
              </Link>
            </section>
            <section className="rounded-[35px] bg-white p-8 shadow-xl md:p-12">
              <h2 className="text-3xl font-black">Send an enquiry</h2>
              <p className="mt-4 text-neutral-600">Send your name, measurements, order questions or images directly to our team.</p>
              <Link href="/customer/chat" className="mt-8 inline-block rounded-full bg-black px-6 py-4 font-bold text-white">CONTACT STITCHY FASHION</Link>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

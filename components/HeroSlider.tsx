"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Scissors, Sparkles } from "lucide-react";

export default function HeroSlider() {
  return (
    <main className="overflow-hidden">
      <section className="relative flex min-h-screen items-center px-6 py-24 md:px-20">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="z-10"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-white/60 px-4 py-2 text-sm backdrop-blur">
              <Sparkles size={16} />
              30 Years of Tailoring Excellence
            </div>

            <h1 className="text-5xl font-black tracking-tight md:text-8xl">
              STITCHY
              <br />
              <span className="text-neutral-500">FASHION</span>
            </h1>

            <p className="mt-6 text-xl font-semibold">Tariq Mehmood</p>

            <p className="mt-2 max-w-xl text-lg text-neutral-600">
              30 Years Experienced Master Tailor
              <br />
              Coat Cutting & Stitching Specialist
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/order"
                className="premium-button shine rounded-full bg-black px-7 py-4 font-bold text-white"
              >
                CUSTOM ORDER
              </Link>

              <Link
                href="/collection"
                className="premium-button flex items-center gap-2 rounded-full border border-black/10 bg-white px-7 py-4 font-bold"
              >
                VIEW COAT COLLECTION
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1 }}
            className="relative flex min-h-[500px] items-center justify-center"
          >
            <div className="absolute h-80 w-80 rounded-full bg-neutral-300/40 blur-3xl" />

            <div className="coat-float relative flex h-[440px] w-[300px] items-center justify-center rounded-[45%] border border-white bg-gradient-to-br from-neutral-900 via-neutral-700 to-neutral-950 shadow-[0_40px_100px_rgba(0,0,0,.35)]">
              <div className="text-center text-white">
                <Scissors className="mx-auto mb-5" size={48} />
                <p className="text-3xl font-black">STITCHY</p>
                <p className="mt-2 text-sm tracking-[0.4em]">FASHION</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="flex min-h-screen items-center bg-neutral-950 px-6 py-24 text-white md:px-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-neutral-400">
              Custom Tailoring
            </p>

            <h2 className="mt-4 text-5xl font-black md:text-7xl">
              YOUR SIZE.
              <br />
              YOUR STYLE.
            </h2>

            <p className="mt-6 max-w-xl text-neutral-400">
              Customize your own coat with your own size, special measurements
              and style.
            </p>

            <Link
              href="/order"
              className="mt-8 inline-block rounded-full bg-white px-8 py-4 font-bold text-black transition hover:-translate-y-1"
            >
              CUSTOM ORDER
            </Link>
          </div>

          <div className="rounded-[40px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Exact Measurements",
                "Multiple Design Images",
                "Personal Style",
                "Professional Cutting",
                "Premium Stitching",
                "Direct Customer Support",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 p-5"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="min-h-screen px-6 py-24 md:px-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm uppercase tracking-[0.4em] text-neutral-500">
            Premium Collection
          </p>

          <h2 className="mt-3 text-5xl font-black md:text-7xl">
            COATS MADE
            <br />
            FOR YOU.
          </h2>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Single & Double Breasted Coat",
              "Prince Coat",
              "Waistcoat",
              "Sherwani Coat",
              "Overcoat",
              "Blazer Coat",
              "Groom Special Package",
            ].map((coat, index) => (
              <Link
                key={coat}
                href={`/order?coat=${encodeURIComponent(coat)}`}
                className="group rounded-3xl bg-white p-6 shadow-xl transition hover:-translate-y-2"
              >
                <div className="mb-5 flex h-48 items-center justify-center rounded-2xl bg-neutral-100">
                  <div className="coat-float h-32 w-20 rounded-xl bg-gradient-to-b from-neutral-800 to-neutral-950" />
                </div>

                <p className="text-xs text-neutral-400">0{index + 1}</p>

                <h3 className="mt-2 font-bold">{coat}</h3>

                <span className="mt-4 inline-block text-sm font-semibold underline">
                  ORDER NOW
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="flex min-h-screen items-center bg-neutral-100 px-6 py-24 md:px-20">
        <div className="mx-auto w-full max-w-7xl">
          <div className="rounded-[45px] bg-black p-10 text-white md:p-20">
            <p className="text-sm uppercase tracking-[0.4em] text-neutral-400">
              Stitching Academy
            </p>

            <h2 className="mt-5 max-w-4xl text-5xl font-black md:text-7xl">
              LEARN PROFESSIONAL COAT CUTTING & STITCHING.
            </h2>

            <p className="mt-6 max-w-2xl text-lg text-neutral-400">
              Learn from a 30-year experienced master tailor. Learning duration
              depends on your learning speed.
            </p>

            <Link
              href="/academy"
              className="mt-8 inline-block rounded-full bg-white px-8 py-4 font-bold text-black"
            >
              APPLY FOR ADMISSION
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
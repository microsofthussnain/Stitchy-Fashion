import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black px-6 py-16 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
        <div>
          <h2 className="text-3xl font-black">Stitchy Fashion</h2>

          <p className="mt-4 text-neutral-400">
            30 Years Experience
            <br />
            Coat Cutting & Stitching Specialist
          </p>
        </div>

        <div>
          <h3 className="font-bold">Quick Links</h3>

          <div className="mt-4 grid gap-2 text-neutral-400">
            <Link href="/order">Custom Order</Link>
            <Link href="/collection">Coat Collection</Link>
            <Link href="/academy">Stitching School</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>

        <div>
          <h3 className="font-bold">Contact</h3>

          <p className="mt-4 text-neutral-400">
            Tariq Mehmood
            <br />
            03289509594
            <br />
            Street No. 31, Muslim Abad,
            <br />
            Mughalpura, Lahore, Pakistan
          </p>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-6 text-sm text-neutral-500">
        © {new Date().getFullYear()} Stitchy Fashion. All rights reserved.
      </div>
    </footer>
  );
}
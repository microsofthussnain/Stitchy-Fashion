import Navbar from "@/components/Navbar";
import Link from "next/link";

const coats = [
  {
    name: "Single & Double Breasted Coat",
    description: "A sophisticated formal and business coat.",
    purpose: "Formal & Business",
    worn: "Office, meetings, formal events and business occasions.",
    style: "Clean structured shoulders with premium tailoring.",
  },
  {
    name: "Prince Coat",
    description: "A refined Pakistani formal and wedding style.",
    purpose: "Formal & Wedding",
    worn: "Weddings, dinners and formal celebrations.",
    style: "Elegant long-line silhouette with traditional influence.",
  },
  {
    name: "Waistcoat",
    description: "A classic combination for traditional Pakistani clothing.",
    purpose: "With Shalwar Kameez",
    worn: "Eid, weddings and formal traditional events.",
    style: "Elegant fitted waistcoat with custom detailing.",
  },
  {
    name: "Sherwani Coat",
    description: "Premium wedding and formal outerwear.",
    purpose: "Wedding & Formal",
    worn: "Groom events and formal Pakistani celebrations.",
    style: "Traditional inspiration with modern tailoring.",
  },
  {
    name: "Overcoat",
    description: "Warm and sophisticated cold-weather tailoring.",
    purpose: "Cold Weather & Formal",
    worn: "Winter, travel and formal occasions.",
    style: "Long silhouette with a refined structured finish.",
  },
  {
    name: "Blazer Coat",
    description: "Versatile modern tailoring.",
    purpose: "Office, University & Formal",
    worn: "Work, university, dinners and semi-formal events.",
    style: "Modern fit suitable for multiple occasions.",
  },
  {
    name: "Groom Special Package",
    description: "A coordinated premium groom tailoring package.",
    purpose: "Groom & Wedding",
    worn: "Wedding ceremonies, receptions and groom events.",
    style: "Personalized styling and complete measurements.",
  },
];

export default function CollectionPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-neutral-100 px-5 py-28 md:px-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm uppercase tracking-[0.4em] text-neutral-500">
            Stitchy Fashion
          </p>

          <h1 className="mt-3 text-5xl font-black md:text-7xl">
            COAT COLLECTION
          </h1>

          <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {coats.map((coat, index) => (
              <article
                key={coat.name}
                className="overflow-hidden rounded-[30px] bg-white shadow-xl transition hover:-translate-y-2"
              >
                <div className="flex h-72 items-center justify-center bg-neutral-200">
                  <div className="coat-float h-48 w-32 rounded-[30px] bg-gradient-to-b from-neutral-800 to-black shadow-2xl" />
                </div>

                <div className="p-7">
                  <span className="text-xs text-neutral-400">
                    COLLECTION 0{index + 1}
                  </span>

                  <h2 className="mt-2 text-2xl font-black">
                    {coat.name}
                  </h2>

                  <p className="mt-3 text-neutral-600">
                    {coat.description}
                  </p>

                  <div className="mt-5 space-y-2 text-sm">
                    <p>
                      <strong>Purpose:</strong> {coat.purpose}
                    </p>

                    <p>
                      <strong>Where/When:</strong> {coat.worn}
                    </p>

                    <p>
                      <strong>Style:</strong> {coat.style}
                    </p>
                  </div>

                  <div className="mt-7 flex gap-3">
                    <Link
                      href={`/order?coat=${encodeURIComponent(coat.name)}`}
                      className="flex-1 rounded-full bg-black px-4 py-3 text-center text-sm font-bold text-white"
                    >
                      ORDER NOW
                    </Link>

                    <Link
                      href={`/order?coat=${encodeURIComponent(coat.name)}`}
                      className="rounded-full border px-4 py-3 text-center text-sm font-bold"
                    >
                      DETAILS
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
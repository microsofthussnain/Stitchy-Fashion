import Navbar from "@/components/Navbar";
import AdmissionForm from "@/components/AdmissionForm";

export default function AcademyPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-neutral-100 px-5 py-28 md:px-20">
        <div className="mx-auto max-w-7xl">
          <section className="rounded-[40px] bg-black p-8 text-white md:p-16">
            <p className="text-sm uppercase tracking-[0.4em] text-neutral-500">
              Stitchy Academy
            </p>

            <h1 className="mt-5 max-w-5xl text-5xl font-black md:text-7xl">
              Learn Professional Coat Cutting & Stitching From a 30-Year
              Experienced Master.
            </h1>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              <div className="rounded-3xl border border-white/10 p-6">
                <p className="text-neutral-400">Monthly Fee</p>
                <p className="mt-2 text-3xl font-black">Rs. 10,000</p>
              </div>

              <div className="rounded-3xl border border-white/10 p-6">
                <p className="text-neutral-400">Academy Timing</p>
                <p className="mt-2 text-3xl font-black">
                  8 AM – 8 PM
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 p-6">
                <p className="text-neutral-400">Duration</p>
                <p className="mt-2 text-lg font-bold">
                  Depends on student's learning speed
                </p>
              </div>
            </div>

            <p className="mt-8 max-w-3xl text-neutral-400">
              After successful learning/training, suitable students may
              receive work opportunities and salary according to company
              policy.
            </p>
          </section>

          <section className="mt-16">
            <h2 className="text-4xl font-black">Courses</h2>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "Single & Double Breasted Coat",
                "Prince Coat",
                "Waistcoat",
                "Sherwani Coat",
                "Overcoat",
                "Blazer Coat",
                "Groom Special Package",
              ].map((course) => (
                <div
                  key={course}
                  className="rounded-3xl bg-white p-6 shadow-lg"
                >
                  <h3 className="font-bold">{course}</h3>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-16 grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-4xl font-black">
                Apply For Admission
              </h2>

              <p className="mt-4 text-neutral-600">
                Stitchy Fashion, Street No. 31, Muslim Abad, Mughalpura,
                Lahore.
              </p>
            </div>

            <AdmissionForm />
          </section>
        </div>
      </main>
    </>
  );
}
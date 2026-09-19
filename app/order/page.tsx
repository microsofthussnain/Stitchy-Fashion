import Navbar from "@/components/Navbar";
import OrderForm from "@/components/OrderForm";

type Props = {
  searchParams: Promise<{
    coat?: string;
  }>;
};

export default async function OrderPage({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-neutral-100 px-4 py-28 md:px-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10">
            <p className="text-sm uppercase tracking-[0.4em] text-neutral-500">
              Stitchy Fashion
            </p>

            <h1 className="mt-3 text-5xl font-black md:text-7xl">
              CUSTOM ORDER
            </h1>

            <p className="mt-5 max-w-2xl text-neutral-600">
              Customize your own coat with your own size, special measurements
              and style.
            </p>
          </div>

          <OrderForm initialCoat={params.coat} />
        </div>
      </main>
    </>
  );
}
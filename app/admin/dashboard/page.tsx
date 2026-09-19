import Navbar from "@/components/Navbar";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
  const [orders, students, customers, messages] =
    await Promise.all([
      prisma.order.findMany({
        include: {
          customer: true,
          measurements: true,
          coatTypes: {
            include: {
              coatType: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 50,
      }),

      prisma.admission.findMany({
        include: {
          student: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 50,
      }),

      prisma.customer.count(),

      prisma.message.count({
        where: {
          read: false,
        },
      }),
    ]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-neutral-100 px-5 py-28 md:px-20">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-5xl font-black">
            ADMIN MANAGER
          </h1>

          <p className="mt-2 text-neutral-500">
            Husnain Ali
          </p>

          <Link href="/admin/messages" className="mt-6 inline-block rounded-full bg-black px-6 py-3 font-bold text-white">
            OPEN CUSTOMER MESSAGES
          </Link>

          <div className="mt-10 grid gap-5 md:grid-cols-4">
            <Stat title="Orders" value={orders.length} />
            <Stat title="Students" value={students.length} />
            <Stat title="Customers" value={customers} />
            <Stat title="Unread Messages" value={messages} />
          </div>

          <section className="mt-10 rounded-3xl bg-white p-6 shadow-xl">
            <h2 className="text-2xl font-black">
              Latest Orders
            </h2>

            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[800px] text-left">
                <thead>
                  <tr className="border-b">
                    <th className="p-3">Order ID</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Coat</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="p-3 font-bold">
                        {order.orderNumber}
                      </td>

                      <td className="p-3">
                        {order.customer.fullName}
                      </td>

                      <td className="p-3">
                        {order.customer.phone}
                      </td>

                      <td className="p-3">
                        {order.coatTypes
                          .map((item) => item.coatType.name)
                          .join(", ")}
                      </td>

                      <td className="p-3">
                        {order.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-10 rounded-3xl bg-white p-6 shadow-xl">
            <h2 className="text-2xl font-black">
              Student Admissions
            </h2>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {students.map((admission) => (
                <div
                  key={admission.id}
                  className="rounded-2xl border p-5"
                >
                  <h3 className="font-bold">
                    {admission.student.fullName}
                  </h3>

                  <p className="text-sm text-neutral-500">
                    {admission.student.phone}
                  </p>

                  <p className="mt-2 text-sm">
                    Status: {admission.status}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

function Stat({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-3xl bg-white p-7 shadow-xl">
      <p className="text-sm text-neutral-500">{title}</p>
      <p className="mt-2 text-4xl font-black">{value}</p>
    </div>
  );
}
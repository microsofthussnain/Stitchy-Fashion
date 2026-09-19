import Navbar from "@/components/Navbar";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function OwnerDashboard() {
  const [orders, customers, students, admins, salaries] =
    await Promise.all([
      prisma.order.count(),
      prisma.customer.count(),
      prisma.student.count(),
      prisma.user.count({
        where: {
          role: "ADMIN",
        },
      }),
      prisma.salaryRecord.findMany({
        include: {
          admin: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
    ]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-neutral-100 px-5 py-28 md:px-20">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-5xl font-black">
            OWNER PANEL
          </h1>

          <p className="mt-2 text-neutral-500">
            Tariq Mehmood
          </p>

          <Link href="/owner/messages" className="mt-6 inline-block rounded-full bg-black px-6 py-3 font-bold text-white">
            OPEN CUSTOMER MESSAGES
          </Link>

          <div className="mt-10 grid gap-5 md:grid-cols-4">
            <Stat title="Orders" value={orders} />
            <Stat title="Customers" value={customers} />
            <Stat title="Students" value={students} />
            <Stat title="Admin Managers" value={admins} />
          </div>

          <section className="mt-10 rounded-3xl bg-white p-7 shadow-xl">
            <h2 className="text-2xl font-black">
              Private Salary Management
            </h2>

            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b text-left">
                    <th className="p-3">Admin</th>
                    <th className="p-3">Monthly Salary</th>
                    <th className="p-3">Received</th>
                    <th className="p-3">Advance/Credit</th>
                    <th className="p-3">Date</th>
                  </tr>
                </thead>

                <tbody>
                  {salaries.map((salary) => (
                    <tr key={salary.id} className="border-b">
                      <td className="p-3">
                        {salary.admin.name}
                      </td>

                      <td className="p-3">
                        Rs. {salary.monthlySalary}
                      </td>

                      <td className="p-3">
                        Rs. {salary.amountReceived}
                      </td>

                      <td className="p-3">
                        Rs. {salary.creditAdvance}
                      </td>

                      <td className="p-3">
                        {salary.paymentDate
                          ? salary.paymentDate.toLocaleDateString()
                          : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              ["Manage Admin Manager", "/owner/dashboard"],
              ["Manage Permissions", "/owner/dashboard"],
              ["Manage Orders", "/order"],
              ["Manage Students", "/academy"],
              ["Manage Messages", "/owner/messages"],
              ["Manage Salary", "/owner/dashboard"],
              ["Manage Website Content", "/"],
              ["Manage Coat Types", "/collection"],
              ["Manage Gallery", "/gallery"],
              ["Manage Reviews", "/owner/dashboard"],
              ["View Reports", "/owner/dashboard"],
              ["Password / Security", "/owner/login"],
            ].map(([item, href]) => (
              <Link
                key={item}
                href={href}
                className="rounded-3xl bg-white p-6 text-left font-bold shadow-lg transition hover:-translate-y-1"
              >
                {item}
              </Link>
            ))}
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
import Navbar from "@/components/Navbar";
import StaffChatInbox from "@/components/StaffChatInbox";

export default function AdminMessagesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-neutral-100 px-5 py-28 md:px-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">Admin manager</p>
          <h1 className="mt-3 text-5xl font-black md:text-7xl">CUSTOMER MESSAGES</h1>
          <StaffChatInbox role="ADMIN" />
        </div>
      </main>
    </>
  );
}

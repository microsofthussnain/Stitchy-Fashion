"use client";

import { useEffect, useState } from "react";
import ChatPanel from "@/components/ChatPanel";

type Message = {
  id: string;
  customerId: string | null;
  customer?: { fullName: string; phone: string } | null;
  createdAt: string;
  text: string | null;
};

export default function StaffChatInbox({ role }: { role: "ADMIN" | "OWNER" }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>();

  async function loadCustomers() {
    const response = await fetch("/api/messages?staff=true", { cache: "no-store" });
    if (response.ok) setMessages((await response.json()).messages);
  }

  useEffect(() => {
    loadCustomers();
    const timer = window.setInterval(loadCustomers, 5000);
    return () => window.clearInterval(timer);
  }, []);

  const customers = Array.from(
    new Map(
      messages
        .filter((message) => message.customerId && message.customer)
        .map((message) => [message.customerId, message.customer])
    ).entries()
  );

  return (
    <div className="mt-10 grid gap-5 lg:grid-cols-[280px_1fr]">
      <aside className="rounded-3xl bg-white p-4 shadow-xl">
        <h2 className="px-3 text-xl font-black">Conversations</h2>
        <div className="mt-4 grid gap-2">
          {customers.map(([id, customer]) => (
            <button key={id} onClick={() => setSelectedCustomerId(id || undefined)} className={`rounded-2xl p-4 text-left ${selectedCustomerId === id ? "bg-black text-white" : "bg-neutral-100"}`}>
              <p className="font-bold">{customer?.fullName}</p>
              <p className="mt-1 text-xs opacity-60">{customer?.phone}</p>
            </button>
          ))}
          {customers.length === 0 && <p className="p-3 text-sm text-neutral-500">No conversations yet.</p>}
        </div>
      </aside>
      <ChatPanel mode="staff" role={role} selectedCustomerId={selectedCustomerId} />
    </div>
  );
}

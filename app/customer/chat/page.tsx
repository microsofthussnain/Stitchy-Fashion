"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ChatPanel from "@/components/ChatPanel";

export default function CustomerChatPage() {
  const [customerId, setCustomerId] = useState<string>();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    setCustomerId(window.localStorage.getItem("stitchy-customer-id") || undefined);
    setName(window.localStorage.getItem("stitchy-customer-name") || "");
    setPhone(window.localStorage.getItem("stitchy-customer-phone") || "");
  }, []);

  function rememberCustomer(id: string) {
    window.localStorage.setItem("stitchy-customer-id", id);
    window.localStorage.setItem("stitchy-customer-name", name);
    window.localStorage.setItem("stitchy-customer-phone", phone);
    setCustomerId(id);
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-neutral-100 px-5 py-28 md:px-20">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">Customer service</p>
          <h1 className="mt-3 text-5xl font-black md:text-7xl">CHAT WITH STITCHY</h1>
          {!customerId && (
            <div className="mt-8 rounded-3xl bg-white p-6 shadow-xl">
              <h2 className="text-2xl font-black">Start your private conversation</h2>
              <p className="mt-2 text-neutral-500">Enter your details once so our admin or owner can reply to you.</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" className="rounded-2xl border bg-neutral-50 px-5 py-4" />
                <input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Phone number" className="rounded-2xl border bg-neutral-50 px-5 py-4" />
              </div>
            </div>
          )}
          <div className="mt-8">
            <ChatPanel mode="customer" customerId={customerId} customerName={name} customerPhone={phone} onCustomerCreated={rememberCustomer} />
          </div>
        </div>
      </main>
    </>
  );
}

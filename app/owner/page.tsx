"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OwnerLogin() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        role: "OWNER",
      }),
    });

    if (!response.ok) {
      alert("Invalid owner credentials.");
      return;
    }

    router.push("/owner/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black p-5">
      <div className="w-full max-w-md rounded-[35px] bg-white p-8 shadow-2xl">
        <h1 className="text-4xl font-black">
          OWNER PANEL
        </h1>

        <p className="mt-2 text-neutral-500">
          Tariq Mehmood
        </p>

        <div className="mt-8 space-y-4">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Owner Username"
            className="w-full rounded-2xl border p-4"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-2xl border p-4"
          />
        </div>

        <button
          onClick={login}
          className="mt-6 w-full rounded-full bg-black p-4 font-bold text-white"
        >
          OWNER LOGIN
        </button>
      </div>
    </main>
  );
}
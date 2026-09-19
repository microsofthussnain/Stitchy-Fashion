"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLogin() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function login(event: FormEvent) {
    event.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          role: "ADMIN",
        }),
      });

      if (!response.ok) {
        throw new Error();
      }

      router.push("/admin/dashboard");
    } catch {
      alert("Invalid username or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-950 p-5">
      <form
        onSubmit={login}
        className="w-full max-w-md rounded-[35px] bg-white p-8 shadow-2xl"
      >
        <h1 className="text-4xl font-black">Admin Manager</h1>

        <p className="mt-2 text-neutral-500">Stitchy Fashion</p>

        <div className="mt-8 space-y-4">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full rounded-2xl border px-5 py-4"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-2xl border px-5 py-4"
          />
        </div>

        <button
          disabled={loading}
          className="mt-6 w-full rounded-full bg-black px-5 py-4 font-bold text-white"
        >
          {loading ? "LOGIN..." : "LOGIN"}
        </button>

        <Link
          href="/owner/login"
          className="mt-5 block text-center text-sm underline"
        >
          Owner Panel
        </Link>
      </form>
    </main>
  );
}
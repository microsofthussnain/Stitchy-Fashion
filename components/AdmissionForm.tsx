"use client";

import { FormEvent, useState } from "react";

export default function AdmissionForm() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    fatherName: "",
    phone: "",
    whatsapp: "",
    email: "",
    address: "",
    age: "",
    education: "",
    experience: "",
    preferredTime: "",
    message: "",
  });

  function update(field: string, value: string) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  async function submit(event: FormEvent) {
    event.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("/api/admissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error();
      }

      alert(
        "Your Stitchy Fashion academy application has been submitted successfully."
      );

      setForm({
        fullName: "",
        fatherName: "",
        phone: "",
        whatsapp: "",
        email: "",
        address: "",
        age: "",
        education: "",
        experience: "",
        preferredTime: "",
        message: "",
      });
    } catch {
      alert("Unable to submit application.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-[35px] bg-white p-6 shadow-2xl md:p-9"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {([
          ["fullName", "Full Name", true],
          ["fatherName", "Father Name", false],
          ["phone", "Phone", true],
          ["whatsapp", "WhatsApp", false],
          ["email", "Email", false],
          ["address", "Address", false],
          ["age", "Age", false],
          ["education", "Education", false],
          ["experience", "Previous Stitching Experience", false],
          ["preferredTime", "Preferred Learning Time", false],
        ] as const).map(([field, placeholder, required]) => (
          <input
            key={field}
            required={Boolean(required)}
            value={form[field as keyof typeof form]}
            onChange={(e) =>
              update(field as string, e.target.value)
            }
            placeholder={placeholder as string}
            className="rounded-2xl border bg-neutral-50 px-5 py-4 outline-none focus:border-black"
          />
        ))}

        <textarea
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Message"
          className="min-h-32 rounded-2xl border bg-neutral-50 px-5 py-4 md:col-span-2"
        />

        <input
          type="file"
          accept="image/*,.pdf"
          className="rounded-2xl border bg-neutral-50 p-4 md:col-span-2"
        />
      </div>

      <button
        disabled={loading}
        className="mt-6 w-full rounded-full bg-black px-6 py-4 font-bold text-white disabled:opacity-50"
      >
        {loading ? "SUBMITTING..." : "APPLY FOR ADMISSION"}
      </button>
    </form>
  );
}
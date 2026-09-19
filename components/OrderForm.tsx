"use client";

import { FormEvent, useState } from "react";

const coats = [
  "Single & Double Breasted Coat",
  "Prince Coat",
  "Waistcoat",
  "Sherwani Coat",
  "Overcoat",
  "Blazer Coat",
  "Groom Special Package",
];

const coatMeasurements = [
  ["coatChest", "Chest"],
  ["coatWaist", "Waist"],
  ["coatShoulder", "Shoulder"],
  ["coatSleeveLength", "Sleeve Length"],
  ["coatLength", "Coat Length"],
  ["coatNeck", "Neck"],
  ["coatBicep", "Bicep"],
  ["coatWrist", "Wrist"],
  ["coatFrontLength", "Front Length"],
  ["coatBackLength", "Back Length"],
  ["coatSpecial", "Special Measurement"],
];

const pantMeasurements = [
  ["pantWaist", "Waist"],
  ["pantHip", "Hip"],
  ["pantThigh", "Thigh"],
  ["pantKnee", "Knee"],
  ["pantBottom", "Bottom"],
  ["pantLength", "Pant Length"],
  ["pantCrotch", "Crotch"],
  ["pantSpecial", "Special Measurement"],
];

export default function OrderForm({
  initialCoat,
}: {
  initialCoat?: string;
}) {
  const [selectedCoats, setSelectedCoats] = useState<string[]>(
    initialCoat ? [initialCoat] : []
  );

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<any>({
    fullName: "",
    phone: "",
    whatsapp: "",
    email: "",
    address: "",
    numberOfPieces: 1,
    specialStyle: "",
    specialRequirements: "",
    deliveryRequirements: "",
    measurements: {},
  });

  function update(field: string, value: string) {
    setForm((previous: any) => ({
      ...previous,
      [field]: value,
    }));
  }

  function updateMeasurement(field: string, value: string) {
    setForm((previous: any) => ({
      ...previous,
      measurements: {
        ...previous.measurements,
        [field]: value,
      },
    }));
  }

  function toggleCoat(coat: string) {
    setSelectedCoats((previous) =>
      previous.includes(coat)
        ? previous.filter((item) => item !== coat)
        : [...previous, coat]
    );
  }

  async function submit(event: FormEvent) {
    event.preventDefault();

    if (selectedCoats.length === 0) {
      alert("Please select at least one coat type.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          numberOfPieces: Number(form.numberOfPieces),
          coatTypes: selectedCoats,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      alert(
        `Thank you for ordering from Stitchy Fashion.\n\nYour Order ID is ${result.orderId}.\n\nOur admin will contact you as soon as possible.\n\nEmergency WhatsApp: 03289509594`
      );

      window.location.href = `/customer/chat?order=${result.orderId}`;
    } catch (error) {
      alert("There was a problem submitting your order.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-10 rounded-[35px] bg-white p-6 shadow-2xl md:p-10"
    >
      <div>
        <h2 className="text-3xl font-black">Custom Order</h2>

        <p className="mt-2 text-neutral-500">
          Customize your own coat with your own size, special measurements and
          style.
        </p>
      </div>

      <section>
        <h3 className="mb-5 text-xl font-bold">Customer Details</h3>

        <div className="grid gap-4 md:grid-cols-2">
          {[
            ["fullName", "Full Name", true],
            ["phone", "Phone", true],
            ["whatsapp", "WhatsApp", false],
            ["email", "Email", false],
            ["address", "Address", false],
          ].map(([field, label, required]) => (
            <input
              key={field as string}
              required={Boolean(required)}
              value={form[field as string]}
              onChange={(e) => update(field as string, e.target.value)}
              placeholder={label as string}
              className="rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-4 outline-none focus:border-black"
            />
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-5 text-xl font-bold">Coat Type</h3>

        <div className="grid gap-3 md:grid-cols-2">
          {coats.map((coat) => (
            <button
              type="button"
              key={coat}
              onClick={() => toggleCoat(coat)}
              className={`rounded-2xl border p-5 text-left transition ${
                selectedCoats.includes(coat)
                  ? "border-black bg-black text-white"
                  : "border-neutral-200 bg-neutral-50"
              }`}
            >
              <strong>{coat}</strong>

              <span className="mt-1 block text-sm opacity-70">
                {coat === "Prince Coat"
                  ? "Formal & Wedding"
                  : coat === "Waistcoat"
                    ? "With Shalwar Kameez"
                    : "Premium Tailoring"}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-5 text-xl font-bold">Order Information</h3>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="number"
            min="1"
            value={form.numberOfPieces}
            onChange={(e) => update("numberOfPieces", e.target.value)}
            placeholder="Number of Pieces"
            className="rounded-2xl border px-5 py-4"
          />

          <input
            value={form.specialStyle}
            onChange={(e) => update("specialStyle", e.target.value)}
            placeholder="Special Style"
            className="rounded-2xl border px-5 py-4"
          />

          <textarea
            value={form.specialRequirements}
            onChange={(e) =>
              update("specialRequirements", e.target.value)
            }
            placeholder="Special Requirements"
            className="min-h-32 rounded-2xl border px-5 py-4 md:col-span-2"
          />

          <textarea
            value={form.deliveryRequirements}
            onChange={(e) =>
              update("deliveryRequirements", e.target.value)
            }
            placeholder="Delivery Requirements"
            className="min-h-32 rounded-2xl border px-5 py-4 md:col-span-2"
          />
        </div>
      </section>

      <section>
        <h3 className="mb-5 text-xl font-bold">Coat Measurements</h3>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coatMeasurements.map(([field, label]) => (
            <input
              key={field}
              placeholder={label}
              value={form.measurements[field] || ""}
              onChange={(e) =>
                updateMeasurement(field, e.target.value)
              }
              className="rounded-2xl border bg-neutral-50 px-5 py-4"
            />
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-5 text-xl font-bold">Pant Measurements</h3>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pantMeasurements.map(([field, label]) => (
            <input
              key={field}
              placeholder={label}
              value={form.measurements[field] || ""}
              onChange={(e) =>
                updateMeasurement(field, e.target.value)
              }
              className="rounded-2xl border bg-neutral-50 px-5 py-4"
            />
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-xl font-bold">
          Reference / Design Images
        </h3>

        <input
          type="file"
          accept="image/*"
          multiple
          className="w-full rounded-2xl border bg-neutral-50 p-5"
        />

        <p className="mt-2 text-sm text-neutral-500">
          Multiple reference images can be selected.
        </p>
      </section>

      <button
        disabled={loading}
        className="shine premium-button w-full rounded-full bg-black px-8 py-5 text-lg font-black text-white disabled:opacity-50"
      >
        {loading ? "SUBMITTING..." : "SUBMIT CUSTOM ORDER"}
      </button>

      <p className="text-center text-sm text-neutral-500">
        Emergency WhatsApp: 03289509594
      </p>
    </form>
  );
}
"use client";

import { useState } from "react";

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState("en");

  function changeLanguage(value: string) {
    setLanguage(value);

    document.documentElement.lang = value;
    document.documentElement.dir = value === "ur" ? "rtl" : "ltr";
  }

  return (
    <select
      value={language}
      onChange={(e) => changeLanguage(e.target.value)}
      className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm outline-none backdrop-blur"
    >
      <option value="en">English</option>
      <option value="ur">اردو</option>
    </select>
  );
}
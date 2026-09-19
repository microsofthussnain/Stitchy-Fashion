"use client";

import Link from "next/link";
import {
  Home,
  ShoppingBag,
  Shirt,
  GraduationCap,
  Images,
  Info,
  MapPin,
  Phone,
  MessageCircle,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Custom Order", href: "/order", icon: ShoppingBag },
  { name: "Coat Collection", href: "/collection", icon: Shirt },
  { name: "Stitching School", href: "/academy", icon: GraduationCap },
  { name: "Gallery", href: "/gallery", icon: Images },
  { name: "About", href: "/about", icon: Info },
  { name: "Location", href: "/about#location", icon: MapPin },
  { name: "Contact", href: "/contact", icon: Phone },
  { name: "Customer Service", href: "/customer/chat", icon: MessageCircle },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="site-navigation">
      <aside className="desktop-nav fixed left-4 top-1/2 z-50 hidden -translate-y-1/2 md:block">
        <nav className="glass rounded-3xl p-3 shadow-2xl">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.name}
                className="group relative mb-2 flex h-11 w-11 items-center justify-center rounded-2xl transition hover:bg-black hover:text-white"
              >
                <Icon size={19} />

                <span className="pointer-events-none absolute left-14 scale-0 whitespace-nowrap rounded-lg bg-black px-3 py-2 text-xs text-white transition group-hover:scale-100">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>

      <header className="fixed right-0 top-0 z-50 w-full px-4 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <button
            onClick={() => setOpen(!open)}
            className="glass rounded-full p-3 shadow-xl md:hidden"
          >
            {open ? <X /> : <Menu />}
          </button>

          <Link href="/" className="ml-auto">
            <img
              src="/logo.png"
              alt="Stitchy Fashion"
              className="h-16 w-16 rounded-2xl object-contain shadow-xl"
            />
          </Link>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden">
          <nav className="absolute left-4 right-4 top-24 rounded-3xl bg-white p-5 shadow-2xl">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-4 border-b py-4"
                >
                  <Icon size={20} />
                  {item.name}
                </Link>
              );
            })}

            <div className="pt-4">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
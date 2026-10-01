"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Trang chủ" },
  { href: "/#dich-vu", label: "Dịch vụ" },
  { href: "/#bang-gia", label: "Bảng giá" },
  { href: "/products", label: "Sản phẩm" },
  { href: "/blog", label: "Tin tức" },
  { href: "/contact", label: "Liên hệ" },
];

export default function Header() {
  const pathname = usePathname();
  const isActive = (href: string) => !href.includes("#") && (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 bg-cream shadow-md">
      <div className="bg-gradient-to-r from-brand-700 to-brand-500 text-xs text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2">
          <p className="flex gap-5">
            <span>📞 0352 482 496</span>
            <span>✉️ hello@onon.pet</span>
          </p>
          <p className="hidden gap-4 font-semibold sm:flex" aria-label="Mạng xã hội">
            <span>Facebook</span>
            <span>Instagram</span>
            <span>Zalo</span>
          </p>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 py-5 font-fun text-3xl font-semibold italic tracking-wide text-brand-700">
          <span aria-hidden className="text-brand-500">🐾</span>OnOn.Pet
        </Link>
        <nav aria-label="Menu chính" className="hidden h-full lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`border-b-2 px-4 py-8 text-xs font-bold uppercase tracking-wide transition hover:text-brand-500 ${
                isActive(l.href) ? "border-brand-500 text-brand-500" : "border-transparent text-ink"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <details className="relative lg:hidden">
          <summary className="cursor-pointer list-none rounded border px-3 py-2 text-sm font-bold text-ink">☰ Menu</summary>
          <div className="absolute right-0 mt-2 w-52 rounded border bg-white p-2 shadow-lg">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="block rounded px-3 py-2 text-sm font-semibold text-ink hover:bg-brand-50">
                {l.label}
              </Link>
            ))}
          </div>
        </details>
      </div>
    </header>
  );
}

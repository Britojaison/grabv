"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function MobileNav({ activePage = "" }: { activePage?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button - visible on mobile/tablet only */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 z-[200]"
        aria-label="Toggle menu"
      >
        <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
        <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[150] bg-black/50 lg:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] z-[200] transform transition-transform duration-300 ease-in-out lg:hidden ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{ backgroundColor: "rgb(12, 61, 27)" }}
      >
        <div className="flex flex-col pt-20 px-8 gap-6">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 text-white text-2xl"
            aria-label="Close menu"
          >
            ✕
          </button>

          {[
            { href: "/", label: "Home" },
            { href: "#", label: "Recipes" },
            { href: "/products", label: "Products" },
            { href: "/ourstory", label: "Our Story" },
            { href: "#", label: "Contact Us" },
            { href: "#", label: "FAQ" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`text-[20px] font-medium font-bomstad transition-colors ${activePage === item.label ? "text-[rgb(247,216,13)]" : "text-white hover:text-[rgb(247,216,13)]"}`}
            >
              {item.label}
            </Link>
          ))}

          <button
            style={{
              backgroundColor: "rgb(247, 216, 13)",
              color: "rgb(12, 61, 27)",
            }}
            className="mt-4 w-full py-3 rounded-[5px] text-[18px] font-bomstad font-medium"
          >
            Order Now
          </button>
        </div>
      </div>
    </>
  );
}

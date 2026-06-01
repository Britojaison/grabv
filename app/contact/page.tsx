"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type ContactLine = {
  label: string;
  href?: string;
};

type ContactCard = {
  title: string;
  lines: ContactLine[];
};

const contactCards: ContactCard[] = [
  {
    title: "Customer Support",
    lines: [
      { label: "hello@grabv.in", href: "mailto:hello@grabv.in" },
      { label: "+91 91871 24305", href: "tel:+919187124305" },
    ],
  },
  {
    title: "Manufactured by",
    lines: [
      { label: "GrabV Fresh Foods Pvt. Ltd." },
      { label: "#01, #09 & #10, Doddaiah Garden, Kottigepalya," },
      { label: "Magadi Main Road, Bangalore - 560091" },
      { label: "FSSAI 11225332000944" },
    ],
  },
  {
    title: "Marketed by",
    lines: [
      { label: "GrabV Fresh Foods Pvt. Ltd." },
      { label: "#09, Doddaiah Garden, Kottigepalya," },
      { label: "Magadi Main Road, Bangalore - 560091" },
      { label: "FSSAI 11225332000944" },
    ],
  },
];

export default function ContactPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const subject = `Hello GrabV team - message from ${name}`;
    const body = [
      "Hi GrabV team,",
      "",
      message,
      "",
      "Thank you,",
      name,
    ].join("\n");

    window.location.href = `mailto:hello@grabv.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="flex flex-col min-h-screen w-full font-arpona overflow-x-hidden" style={{ backgroundColor: "rgb(239, 238, 230)" }}>
      <header style={{ backgroundColor: "rgb(12, 61, 27)" }} className="sticky top-0 z-[100] w-full flex-shrink-0 shadow-md">
        <div className="max-w-[1600px] mx-auto px-4 md:pl-4 md:pr-8 h-[70px] md:h-[80px] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="lg:hidden flex items-center">
              <button className="text-white focus:outline-none p-2" onClick={() => setIsMenuOpen(true)} aria-label="Open menu">
                <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="0" y1="2" x2="24" y2="2" stroke="white" strokeWidth="2.5" />
                  <line x1="0" y1="8" x2="24" y2="8" stroke="white" strokeWidth="2.5" />
                  <line x1="0" y1="14" x2="24" y2="14" stroke="white" strokeWidth="2.5" />
                </svg>
              </button>
            </div>

            <Link href="/" className="flex items-center">
              <Image src="/images/logo.svg" alt="GrabV Logo" width={110} height={40} className="w-auto h-8 md:h-12" priority />
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-8 xl:gap-12 text-white font-medium">
            <Link href="/" className="hover:text-[rgb(247,216,13)] transition-colors text-[18px]">Home</Link>
            <Link href="/recipes" className="hover:text-[rgb(247,216,13)] transition-colors text-[18px]">Recipes</Link>
            <Link href="/products" className="hover:text-[rgb(247,216,13)] transition-colors text-[18px]">Products</Link>
            <Link href="/ourstory" className="hover:text-[rgb(247,216,13)] transition-colors text-[18px] whitespace-nowrap">Our Story</Link>
            <Link href="/contact" className="text-[rgb(247,216,13)] transition-colors text-[18px] whitespace-nowrap">Contact Us</Link>
            <Link href="/faq" className="hover:text-[rgb(247,216,13)] transition-colors text-[18px]">FAQ</Link>
          </nav>

          <Link
            href="/all-purposegravy"
            style={{ borderRadius: "5px", backgroundColor: "rgb(247, 216, 13)", color: "rgb(12, 61, 27)", letterSpacing: "0.05em" }}
            className="font-arpona font-medium flex items-center justify-center hover:bg-yellow-400 transition-colors shrink-0 text-[12px] md:text-[18px] w-[85px] md:w-[142px] h-[30px] md:h-[37px]"
          >
            Order Now
          </Link>
        </div>

        {isMenuOpen && (
          <div className="fixed inset-0 z-[200] bg-[rgb(12,61,27)] flex flex-col items-center justify-center animate-in fade-in duration-300">
            <button className="absolute top-6 right-8 text-white p-2 hover:scale-110 transition-transform" onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 5L25 25M25 5L5 25" stroke="white" strokeWidth="3" />
              </svg>
            </button>
            <nav className="flex flex-col items-center gap-8 text-white font-arpona font-medium text-[24px]">
              <Link href="/" onClick={() => setIsMenuOpen(false)} className="hover:text-[rgb(247,216,13)] transition-colors">Home</Link>
              <Link href="/recipes" onClick={() => setIsMenuOpen(false)} className="hover:text-[rgb(247,216,13)] transition-colors">Recipes</Link>
              <Link href="/products" onClick={() => setIsMenuOpen(false)} className="hover:text-[rgb(247,216,13)] transition-colors">Products</Link>
              <Link href="/ourstory" onClick={() => setIsMenuOpen(false)} className="hover:text-[rgb(247,216,13)] transition-colors">Our Story</Link>
              <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="hover:text-[rgb(247,216,13)] transition-colors text-[rgb(247,216,13)]">Contact Us</Link>
              <Link href="/faq" onClick={() => setIsMenuOpen(false)} className="hover:text-[rgb(247,216,13)] transition-colors">FAQ</Link>
              <Link href="/all-purposegravy" style={{ backgroundColor: "rgb(247, 216, 13)", color: "rgb(12, 61, 27)" }} className="mt-4 px-10 py-3 rounded-full font-bold text-[18px] hover:bg-yellow-400 transition-colors flex items-center justify-center" onClick={() => setIsMenuOpen(false)}>
                Order Now
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="w-full flex-1" style={{ backgroundColor: "rgb(239, 238, 230)" }}>
        <section className="relative overflow-hidden px-3 md:px-8 py-12 md:py-20" style={{ backgroundColor: "rgb(21, 107, 54)" }}>
          <div className="absolute inset-0 opacity-20">
            <Image src="/images/bg green2.svg" alt="" fill className="object-cover object-bottom" priority />
          </div>
          <div className="relative w-full max-w-[1380px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-10">
              <div>
                <p className="font-arpona font-semibold text-[14px] md:text-[22px] uppercase tracking-wide mb-3" style={{ color: "rgb(247, 216, 13)" }}>
                  GrabV Care
                </p>
                <h1 className="font-kura uppercase leading-none text-[46px] md:text-[64px] lg:text-[92px]">
                  <span className="text-white">Contact </span>
                  <span style={{ color: "rgb(247, 216, 13)" }}>Us</span>
                </h1>
              </div>
              <p className="font-arpona text-[16px] md:text-[24px] leading-relaxed max-w-[560px] text-white">
                Questions about orders, stores, product details, or feedback? Send us a note and the GrabV team will get back to you.
              </p>
            </div>
          </div>
        </section>

        <section className="px-3 md:px-8 pt-10 md:pt-16 pb-12 md:pb-20">
          <div className="w-full max-w-[1380px] mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 md:gap-8 items-start">
            <div className="grid grid-cols-1 gap-4 md:gap-5">
              {contactCards.map((card, index) => (
                <div
                  key={card.title}
                  className="rounded-[8px] border-2 bg-white px-5 py-5 md:px-7 md:py-6 shadow-sm"
                  style={{ borderColor: index === 1 ? "rgb(247, 216, 13)" : "rgb(21, 107, 54)" }}
                >
                  <h2 className="font-kura uppercase text-[32px] md:text-[44px] leading-none mb-4" style={{ color: index === 0 ? "rgb(247, 0, 52)" : "rgb(21, 107, 54)" }}>
                    {card.title}
                  </h2>
                  <div className="flex flex-col gap-1 font-arpona text-[16px] md:text-[20px] leading-relaxed" style={{ color: "rgb(62, 91, 63)" }}>
                    {card.lines.map((line) =>
                      line.href ? (
                        <Link key={line.label} href={line.href} className="font-semibold hover:text-[rgb(247,0,52)] transition-colors">
                          {line.label}
                        </Link>
                      ) : (
                        <p key={line.label}>{line.label}</p>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="rounded-[8px] border-2 bg-white px-5 py-6 md:px-8 md:py-8 shadow-md" style={{ borderColor: "rgb(247, 216, 13)" }}>
              <div className="mb-6">
                <p className="font-arpona font-semibold uppercase tracking-wide text-[13px] md:text-[16px]" style={{ color: "rgb(247, 0, 52)" }}>
                  Write to us
                </p>
                <h2 className="font-kura uppercase text-[36px] md:text-[58px] leading-none mt-1" style={{ color: "rgb(21, 107, 54)" }}>
                  Send a Message
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col gap-2 text-[15px] md:text-[17px] font-semibold" style={{ color: "rgb(21, 107, 54)" }}>
                  Name
                  <input type="text" name="name" required className="h-12 rounded-[8px] border px-4 text-[16px] font-normal outline-none focus:border-[rgb(247,0,52)] text-[rgb(12,61,27)]" style={{ borderColor: "rgba(21,107,54,0.3)" }} />
                </label>
                <label className="flex flex-col gap-2 text-[15px] md:text-[17px] font-semibold" style={{ color: "rgb(21, 107, 54)" }}>
                  Phone
                  <input type="tel" name="phone" className="h-12 rounded-[8px] border px-4 text-[16px] font-normal outline-none focus:border-[rgb(247,0,52)] text-[rgb(12,61,27)]" style={{ borderColor: "rgba(21,107,54,0.3)" }} />
                </label>
                <label className="md:col-span-2 flex flex-col gap-2 text-[15px] md:text-[17px] font-semibold" style={{ color: "rgb(21, 107, 54)" }}>
                  Email
                  <input type="email" name="email" required className="h-12 rounded-[8px] border px-4 text-[16px] font-normal outline-none focus:border-[rgb(247,0,52)] text-[rgb(12,61,27)]" style={{ borderColor: "rgba(21,107,54,0.3)" }} />
                </label>
                <label className="md:col-span-2 flex flex-col gap-2 text-[15px] md:text-[17px] font-semibold" style={{ color: "rgb(21, 107, 54)" }}>
                  Message
                  <textarea name="message" required rows={6} className="resize-none rounded-[8px] border px-4 py-3 text-[16px] font-normal outline-none focus:border-[rgb(247,0,52)] text-[rgb(12,61,27)]" style={{ borderColor: "rgba(21,107,54,0.3)" }} />
                </label>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center">
                <button type="submit" className="h-12 px-8 rounded-[8px] font-arpona font-bold text-[18px] uppercase transition-transform hover:scale-[1.02]" style={{ backgroundColor: "rgb(247, 216, 13)", color: "rgb(12, 61, 27)" }}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="w-full py-12 md:py-16 pl-3 pr-6 md:pl-4 md:pr-8" style={{ backgroundColor: "rgb(21, 107, 54)" }}>
        <div className="max-w-[1600px] mx-auto">
          <div className="md:hidden grid grid-cols-2 gap-x-8 gap-y-10">
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-4">
                <div className="w-[70px] h-[35px] relative">
                  <Image src="/images/logo.svg" alt="GrabV Logo" fill className="object-contain" />
                </div>
                <div className="flex flex-col gap-0 text-[11px] font-medium leading-tight font-arpona" style={{ color: "rgb(247, 216, 13)" }}>
                  <p>© 2026 GrabV. All rights reserved.</p>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-[16px] font-bold" style={{ color: "rgb(247, 216, 13)" }}>Company</h4>
                <div className="flex flex-col gap-0 text-[14px] font-medium font-arpona leading-relaxed" style={{ color: "rgb(247, 216, 13)" }}>
                  <Link href="/ourstory">Our Story</Link>
                  <Link href="/#process">Process</Link>
                  <Link href="/#quality">Quality Promise</Link>
                  <Link href="/contact">Contact Us</Link>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-1">
                <h4 className="text-[16px] font-bold" style={{ color: "rgb(247, 216, 13)" }}>Order & Policies</h4>
                <div className="flex flex-col gap-0 text-[14px] font-medium font-arpona leading-relaxed" style={{ color: "rgb(247, 216, 13)" }}>
                  <Link href="#">WhatsApp Order</Link>
                  <Link href="#">Exchange Order</Link>
                  <Link href="#">Privacy Policy</Link>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-[16px] font-bold" style={{ color: "rgb(247, 216, 13)" }}>Product</h4>
                <div className="flex flex-col gap-0 text-[14px] font-medium font-arpona leading-relaxed" style={{ color: "rgb(247, 216, 13)" }}>
                  <Link href="/all-purposegravy">All Purpose Gravy</Link>
                  <Link href="/all-purposegravy#ingredients">Ingredients</Link>
                  <Link href="/all-purposegravy#how-to-use">How to Use</Link>
                  <Link href="/recipes">Recipes</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-0 flex flex-col w-full md:w-[299px] h-auto md:h-[234px] justify-between">
              <div className="flex flex-col">
                <div className="w-[110px] h-[55px] relative mb-4">
                  <Image src="/images/logo.svg" alt="GrabV Logo" fill className="object-contain object-left" />
                </div>
                <div className="flex flex-col gap-1 text-[16px] font-medium leading-[1.2] font-arpona" style={{ color: "rgb(247, 216, 13)" }}>
                  <p>© 2026 GrabV. All rights reserved.</p>
                </div>
              </div>
            </div>

            <div className="rounded-[30px] p-6 flex flex-col w-full md:w-[299px] h-auto md:h-[234px]" style={{ backgroundColor: "rgb(55, 122, 49)" }}>
              <h4 className="text-[22px] font-bold mb-2" style={{ color: "rgb(247, 216, 13)" }}>Company</h4>
              <div className="flex flex-col gap-1 text-[18px] font-medium font-arpona leading-tight" style={{ color: "rgb(247, 216, 13)" }}>
                <Link href="/ourstory" className="hover:opacity-80 transition-opacity">Our Story</Link>
                <Link href="/#process" className="hover:opacity-80 transition-opacity">Process</Link>
                <Link href="/#quality" className="hover:text-[rgb(247,216,13)] transition-colors">Quality Promise</Link>
                <Link href="/contact" className="hover:opacity-80 transition-opacity">Contact Us</Link>
              </div>
            </div>

            <div className="rounded-[30px] p-6 flex flex-col w-full md:w-[299px] h-auto md:h-[234px]" style={{ backgroundColor: "rgb(55, 122, 49)" }}>
              <h4 className="text-[22px] font-bold mb-2" style={{ color: "rgb(247, 216, 13)" }}>Product</h4>
              <div className="flex flex-col gap-1 text-[18px] font-medium font-arpona leading-tight" style={{ color: "rgb(247, 216, 13)" }}>
                <Link href="/all-purposegravy" className="hover:opacity-80 transition-opacity">All Purpose Gravy</Link>
                <Link href="/all-purposegravy#ingredients" className="hover:opacity-80 transition-opacity">Ingredients</Link>
                <Link href="/all-purposegravy#how-to-use" className="hover:opacity-80 transition-opacity">How to Use</Link>
                <Link href="/recipes" className="hover:opacity-80 transition-opacity">Recipes</Link>
              </div>
            </div>

            <div className="rounded-[30px] p-6 flex flex-col w-full md:w-[299px] h-auto md:h-[234px]" style={{ backgroundColor: "rgb(55, 122, 49)" }}>
              <h4 className="text-[22px] font-bold mb-2" style={{ color: "rgb(247, 216, 13)" }}>Order & Policies</h4>
              <div className="flex flex-col gap-1 text-[18px] font-medium font-arpona leading-tight" style={{ color: "rgb(247, 216, 13)" }}>
                <Link href="#" className="hover:opacity-80 transition-opacity">WhatsApp Order</Link>
                <Link href="#" className="hover:opacity-80 transition-opacity">Exchange Order</Link>
                <Link href="#" className="hover:opacity-80 transition-opacity">Privacy Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

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
      {/* Header removed, now in layout.tsx */}

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

      {/* Footer removed, now in layout.tsx */}
    </div>
  );
}

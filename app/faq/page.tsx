"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const faqs = [
    {
        question: "What makes GrabV different from other ready-made gravies?",
        answer: "GrabV is a freshly made, slowly cooked onion tomato gravy with zero added preservatives, not a shelf-stable packaged product. Every pouch is made in small batches to retain the taste and depth of a homemade gravy.",
    },
    {
        question: "Does it contain any preservatives or artificial additives?",
        answer: "No, GrabV is completely free from added preservatives, artificial colours, or flavour enhancers. What you get is pure, clean ingredients cooked the traditional way.",
    },
    {
        question: "What spices are already in the gravy?",
        answer: "The gravy comes with spices like cumin, cinnamon, clove, and bay leaf, roasted and ground in, along with cashews for body, and chilli, turmeric, coriander, and pepper for a well-balanced base. It is mildly salted.",
    },
    {
        question: "What dishes can I make with GrabV?",
        answer: "It works as a base for virtually any Indian curry: paneer, chicken, vegetables, dal makhani, egg curry, and more. Since the foundational spices and the onion-tomato base are already done, you only need to add your main ingredient and finish with a tadka if needed.",
    },
    {
        question: "Where can I buy GrabV?",
        answer: "You can buy them at your nearest Simpli Namdhari supermarket in namma Bengaluru.",
    },
    {
        question: "How should I store GrabV?",
        answer: "GrabV is a chilled product, so it should be refrigerated at all times. Do not freeze. Check the pack label for the best-before date; once opened, consume within 7 days of opening.",
    },
    {
        question: "Is it suitable for vegetarians?",
        answer: "Yes, GrabV is 100% vegetarian.",
    },
    {
        question: "Does it contain any allergens?",
        answer: "It does contain cashews, so those with tree nut allergies should take note. Check the ingredient label on the pack for the full allergen information.",
    },
    {
        question: "What pack sizes are available?",
        answer: "GrabV is available in 250g and 750g packs.",
    },
    {
        question: "What is the serving size?",
        answer: "250g is enough for 2 people and 750g can serve 4-5 people.",
    },
    {
        question: "How to use it?",
        answer: "Add your tempering (tadka) in oil, saute veggies or paneer of your choice, pour gravy and adjust consistency, sprinkle spices and salt to taste. Cook for 7 minutes and enjoy.",
    },
];

export default function FAQPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="flex flex-col min-h-screen w-full font-arpona overflow-x-hidden" style={{ backgroundColor: 'rgb(239, 238, 230)' }}>
            {/* Header removed, now in layout.tsx */}

            <main className="w-full flex-1" style={{ backgroundColor: 'rgb(239, 238, 230)' }}>
                <section className="px-3 md:px-8 py-12 md:py-20" style={{ backgroundColor: 'rgb(21, 107, 54)' }}>
                    <div className="w-full max-w-[1380px] mx-auto">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 md:gap-10">
                            <div>
                                <p className="font-arpona font-semibold text-[14px] md:text-[22px] uppercase tracking-wide mb-3" style={{ color: 'rgb(247, 216, 13)' }}>
                                    GrabV Help
                                </p>
                                <h1 className="font-kura uppercase leading-none text-[44px] md:text-[60px] lg:text-[86px]">
                                    <span className="text-white">Frequently Asked </span>
                                    <span style={{ color: 'rgb(247, 216, 13)' }}>Questions</span>
                                </h1>
                            </div>
                            <p className="font-arpona text-[16px] md:text-[24px] leading-relaxed max-w-[540px] text-white">
                                Everything you need to know about storing, cooking, and enjoying GrabV.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="px-3 md:px-8 pt-10 md:pt-16 pb-12 md:pb-20">
                    <div className="w-full max-w-[1380px] mx-auto">
                        <div className="grid grid-cols-1 gap-3 md:hidden">
                            {faqs.map((faq, index) => (
                                <details
                                    key={faq.question}
                                    className="group rounded-[8px] border-2 bg-white px-4 py-4 md:px-6 md:py-5 shadow-sm open:shadow-md transition-shadow"
                                    style={{ borderColor: index % 2 === 0 ? 'rgb(247, 216, 13)' : 'rgb(21, 107, 54)' }}
                                >
                                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-arpona text-[17px] md:text-[22px] font-semibold leading-snug" style={{ color: 'rgb(21, 107, 54)' }}>
                                        <span>{faq.question}</span>
                                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[24px] leading-none transition-transform group-open:rotate-45" style={{ backgroundColor: 'rgb(247, 216, 13)', color: 'rgb(247, 0, 52)' }}>
                                            +
                                        </span>
                                    </summary>
                                    <p className="mt-4 pr-2 font-arpona text-[15px] md:text-[18px] leading-relaxed" style={{ color: 'rgb(62, 91, 63)' }}>
                                        {faq.answer}
                                    </p>
                                </details>
                            ))}
                        </div>

                        <div className="hidden md:grid md:grid-cols-2 gap-5 items-start">
                            {[0, 1].map((column) => (
                                <div key={column} className="flex flex-col gap-5">
                                    {faqs
                                        .filter((_, index) => index % 2 === column)
                                        .map((faq, index) => (
                                            <details
                                                key={faq.question}
                                                className="group rounded-[8px] border-2 bg-white px-6 py-5 shadow-sm open:shadow-md transition-shadow"
                                                style={{ borderColor: (index + column) % 2 === 0 ? 'rgb(247, 216, 13)' : 'rgb(21, 107, 54)' }}
                                            >
                                                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-arpona text-[22px] font-semibold leading-snug" style={{ color: 'rgb(21, 107, 54)' }}>
                                                    <span>{faq.question}</span>
                                                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[24px] leading-none transition-transform group-open:rotate-45" style={{ backgroundColor: 'rgb(247, 216, 13)', color: 'rgb(247, 0, 52)' }}>
                                                        +
                                                    </span>
                                                </summary>
                                                <p className="mt-4 pr-2 font-arpona text-[18px] leading-relaxed" style={{ color: 'rgb(62, 91, 63)' }}>
                                                    {faq.answer}
                                                </p>
                                            </details>
                                        ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer removed, now in layout.tsx */}
        </div>
    );
}

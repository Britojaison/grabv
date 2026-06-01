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
            <header
                style={{ backgroundColor: 'rgb(12, 61, 27)' }}
                className="sticky top-0 z-[100] w-full flex-shrink-0 shadow-md"
            >
                <div className="max-w-[1600px] mx-auto px-4 md:pl-4 md:pr-8 h-[70px] md:h-[80px] flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="lg:hidden flex items-center">
                            <button
                                className="text-white focus:outline-none p-2"
                                onClick={() => setIsMenuOpen(true)}
                                aria-label="Open menu"
                            >
                                <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <line x1="0" y1="2" x2="24" y2="2" stroke="white" strokeWidth="2.5" />
                                    <line x1="0" y1="8" x2="24" y2="8" stroke="white" strokeWidth="2.5" />
                                    <line x1="0" y1="14" x2="24" y2="14" stroke="white" strokeWidth="2.5" />
                                </svg>
                            </button>
                        </div>

                        <Link href="/" className="flex items-center">
                            <Image
                                src="/images/logo.svg"
                                alt="GrabV Logo"
                                width={110}
                                height={40}
                                className="w-auto h-8 md:h-12"
                                priority
                            />
                        </Link>
                    </div>

                    <nav className="hidden lg:flex items-center gap-8 xl:gap-12 text-white font-medium">
                        <Link href="/" className="hover:text-[rgb(247,216,13)] transition-colors text-[18px]">Home</Link>
                        <Link href="/recipes" className="hover:text-[rgb(247,216,13)] transition-colors text-[18px]">Recipes</Link>
                        <Link href="/products" className="hover:text-[rgb(247,216,13)] transition-colors text-[18px]">Products</Link>
                        <Link href="/ourstory" className="hover:text-[rgb(247,216,13)] transition-colors text-[18px] whitespace-nowrap">Our Story</Link>
                        <Link href="/contact" className="hover:text-[rgb(247,216,13)] transition-colors text-[18px] whitespace-nowrap">Contact Us</Link>
                        <Link href="/faq" className="text-[rgb(247,216,13)] transition-colors text-[18px]">FAQ</Link>
                    </nav>

                    <button
                        style={{
                            borderRadius: '5px',
                            backgroundColor: 'rgb(247, 216, 13)',
                            color: 'rgb(12, 61, 27)',
                            letterSpacing: '0.05em'
                        }}
                        className="font-arpona font-medium flex items-center justify-center hover:bg-yellow-400 transition-colors shrink-0 text-[12px] md:text-[18px] w-[85px] md:w-[142px] h-[30px] md:h-[37px]"
                    >
                        Order Now
                    </button>
                </div>

                {isMenuOpen && (
                    <div className="fixed inset-0 z-[200] bg-[rgb(12,61,27)] flex flex-col items-center justify-center animate-in fade-in duration-300">
                        <button
                            className="absolute top-6 right-8 text-white p-2 hover:scale-110 transition-transform"
                            onClick={() => setIsMenuOpen(false)}
                            aria-label="Close menu"
                        >
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 5L25 25M25 5L5 25" stroke="white" strokeWidth="3" />
                            </svg>
                        </button>
                        <nav className="flex flex-col items-center gap-8 text-white font-arpona font-medium text-[24px]">
                            <Link href="/" onClick={() => setIsMenuOpen(false)} className="hover:text-[rgb(247,216,13)] transition-colors">Home</Link>
                            <Link href="/recipes" onClick={() => setIsMenuOpen(false)} className="hover:text-[rgb(247,216,13)] transition-colors">Recipes</Link>
                            <Link href="/products" onClick={() => setIsMenuOpen(false)} className="hover:text-[rgb(247,216,13)] transition-colors">Products</Link>
                            <Link href="/ourstory" onClick={() => setIsMenuOpen(false)} className="hover:text-[rgb(247,216,13)] transition-colors">Our Story</Link>
                            <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="hover:text-[rgb(247,216,13)] transition-colors">Contact Us</Link>
                            <Link href="/faq" onClick={() => setIsMenuOpen(false)} className="hover:text-[rgb(247,216,13)] transition-colors text-[rgb(247,216,13)]">FAQ</Link>
                            <button
                                style={{ backgroundColor: 'rgb(247, 216, 13)', color: 'rgb(12, 61, 27)' }}
                                className="mt-4 px-10 py-3 rounded-full font-bold text-[18px] hover:bg-yellow-400 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Order Now
                            </button>
                        </nav>
                    </div>
                )}
            </header>

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

            <footer className="w-full py-12 md:py-16 pl-3 pr-6 md:pl-4 md:pr-8" style={{ backgroundColor: 'rgb(21, 107, 54)' }}>
                <div className="max-w-[1600px] mx-auto">
                    <div className="md:hidden grid grid-cols-2 gap-x-8 gap-y-10">
                        <div className="flex flex-col gap-10">
                            <div className="flex flex-col gap-4">
                                <div className="w-[70px] h-[35px] relative">
                                    <Image src="/images/logo.svg" alt="GrabV Logo" fill className="object-contain" />
                                </div>
                                <div className="flex flex-col gap-0 text-[11px] font-medium leading-tight font-arpona" style={{ color: 'rgb(247, 216, 13)' }}>
                                    <p>© 2026 GrabV. All rights reserved.</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <h4 className="text-[16px] font-bold" style={{ color: 'rgb(247, 216, 13)' }}>Company</h4>
                                <div className="flex flex-col gap-0 text-[14px] font-medium font-arpona leading-relaxed" style={{ color: 'rgb(247, 216, 13)' }}>
                                    <Link href="/ourstory">Our Story</Link>
                                    <Link href="/#process">Process</Link>
                                    <Link href="/#quality">Quality Promise</Link>
                                    <Link href="/contact">Contact Us</Link>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-10">
                            <div className="flex flex-col gap-1">
                                <h4 className="text-[16px] font-bold" style={{ color: 'rgb(247, 216, 13)' }}>Order & Policies</h4>
                                <div className="flex flex-col gap-0 text-[14px] font-medium font-arpona leading-relaxed" style={{ color: 'rgb(247, 216, 13)' }}>
                                    <Link href="#">WhatsApp Order</Link>
                                    <Link href="#">Exchange Order</Link>
                                    <Link href="#">Privacy Policy</Link>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <h4 className="text-[16px] font-bold" style={{ color: 'rgb(247, 216, 13)' }}>Product</h4>
                                <div className="flex flex-col gap-0 text-[14px] font-medium font-arpona leading-relaxed" style={{ color: 'rgb(247, 216, 13)' }}>
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
                                <div className="flex flex-col gap-1 text-[16px] font-medium leading-[1.2] font-arpona" style={{ color: 'rgb(247, 216, 13)' }}>
                                    <p>© 2026 GrabV. All rights reserved.</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[30px] p-6 flex flex-col w-full md:w-[299px] h-auto md:h-[234px]" style={{ backgroundColor: 'rgb(55, 122, 49)' }}>
                            <h4 className="text-[22px] font-bold mb-2" style={{ color: 'rgb(247, 216, 13)' }}>Company</h4>
                            <div className="flex flex-col gap-1 text-[18px] font-medium font-arpona leading-tight" style={{ color: 'rgb(247, 216, 13)' }}>
                                <Link href="/ourstory" className="hover:opacity-80 transition-opacity">Our Story</Link>
                                <Link href="/#process" className="hover:opacity-80 transition-opacity">Process</Link>
                                <Link href="/#quality" className="hover:text-[rgb(247,216,13)] transition-colors">Quality Promise</Link>
                                <Link href="/contact" className="hover:opacity-80 transition-opacity">Contact Us</Link>
                            </div>
                        </div>

                        <div className="rounded-[30px] p-6 flex flex-col w-full md:w-[299px] h-auto md:h-[234px]" style={{ backgroundColor: 'rgb(55, 122, 49)' }}>
                            <h4 className="text-[22px] font-bold mb-2" style={{ color: 'rgb(247, 216, 13)' }}>Product</h4>
                            <div className="flex flex-col gap-1 text-[18px] font-medium font-arpona leading-tight" style={{ color: 'rgb(247, 216, 13)' }}>
                                <Link href="/all-purposegravy" className="hover:opacity-80 transition-opacity">All Purpose Gravy</Link>
                                <Link href="/all-purposegravy#ingredients" className="hover:opacity-80 transition-opacity">Ingredients</Link>
                                <Link href="/all-purposegravy#how-to-use" className="hover:opacity-80 transition-opacity">How to Use</Link>
                                <Link href="/recipes" className="hover:opacity-80 transition-opacity">Recipes</Link>
                            </div>
                        </div>

                        <div className="rounded-[30px] p-6 flex flex-col w-full md:w-[299px] h-auto md:h-[234px]" style={{ backgroundColor: 'rgb(55, 122, 49)' }}>
                            <h4 className="text-[22px] font-bold mb-2" style={{ color: 'rgb(247, 216, 13)' }}>Order & Policies</h4>
                            <div className="flex flex-col gap-1 text-[18px] font-medium font-arpona leading-tight" style={{ color: 'rgb(247, 216, 13)' }}>
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

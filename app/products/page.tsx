"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProductsListPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="flex flex-col min-h-screen w-full font-bomstad overflow-x-hidden" style={{ backgroundColor: 'rgb(239, 239, 231)' }}>

            {/* Navbar */}
            <header
                style={{ backgroundColor: 'rgb(12, 61, 27)' }}
                className="relative z-[100] w-full flex-shrink-0 shadow-md"
            >
                <div className="max-w-[1440px] mx-auto px-4 md:px-8 h-[70px] md:h-[80px] flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {/* Hamburger Menu - Mobile Only */}
                        <div className="md:hidden flex items-center">
                            <button
                                className="text-white focus:outline-none p-2"
                                onClick={() => setIsMenuOpen(true)}
                            >
                                <svg width="30" height="20" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <line x1="0" y1="2" x2="30" y2="2" stroke="white" strokeWidth="3" />
                                    <line x1="0" y1="10" x2="30" y2="10" stroke="white" strokeWidth="3" />
                                    <line x1="0" y1="18" x2="30" y2="18" stroke="white" strokeWidth="3" />
                                </svg>
                            </button>
                        </div>

                        <Link href="/" className="flex items-center">
                            <Image
                                src="/images/logo.svg"
                                alt="GrabV Logo"
                                width={110}
                                height={40}
                                className="w-auto h-12"
                                priority
                            />
                        </Link>
                    </div>

                    <nav className="hidden md:flex items-center gap-12 text-white font-medium">
                        <Link href="/" className="hover:text-[rgb(247,216,13)] transition-colors text-[18px]">Home</Link>
                        <Link href="#" className="hover:text-[rgb(247,216,13)] transition-colors text-[18px]">Recipes</Link>
                        <Link href="/products" className="text-[rgb(247,216,13)] transition-colors text-[18px]">Products</Link>
                        <Link href="/ourstory" className="hover:text-[rgb(247,216,13)] transition-colors text-[18px] whitespace-nowrap">Our Story</Link>
                        <Link href="#" className="hover:text-[rgb(247,216,13)] transition-colors text-[18px] whitespace-nowrap">Contact Us</Link>
                        <Link href="#" className="hover:text-[rgb(247,216,13)] transition-colors text-[18px]">FAQ</Link>
                    </nav>

                    <button
                        style={{
                            width: '142px',
                            height: '37px',
                            borderRadius: '5px',
                            fontSize: '18px',
                            backgroundColor: 'rgb(247, 216, 13)',
                            color: 'rgb(12, 61, 27)',
                            letterSpacing: '0.05em'
                        }}
                        className="font-bomstad font-medium flex items-center justify-center hover:bg-yellow-400 transition-colors shrink-0 text-[14px] md:text-[18px] w-[100px] md:w-[142px]"
                    >
                        Order Now
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && (
                    <div className="fixed inset-0 z-[200] bg-[rgb(12,61,27)] flex flex-col items-center justify-center animate-in fade-in duration-300">
                        <button
                            className="absolute top-6 right-8 text-white p-2 hover:scale-110 transition-transform"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 5L25 25M25 5L5 25" stroke="white" strokeWidth="3" />
                            </svg>
                        </button>
                        <nav className="flex flex-col items-center gap-8 text-white font-bomstad font-medium text-[24px]">
                            <Link href="/" onClick={() => setIsMenuOpen(false)} className="hover:text-[rgb(247,216,13)] transition-colors">Home</Link>
                            <Link href="#" onClick={() => setIsMenuOpen(false)} className="hover:text-[rgb(247,216,13)] transition-colors">Recipes</Link>
                            <Link href="/products" onClick={() => setIsMenuOpen(false)} className="hover:text-[rgb(247,216,13)] transition-colors text-[rgb(247,216,13)]">Products</Link>
                            <Link href="/ourstory" onClick={() => setIsMenuOpen(false)} className="hover:text-[rgb(247,216,13)] transition-colors">Our Story</Link>
                            <Link href="#" onClick={() => setIsMenuOpen(false)} className="hover:text-[rgb(247,216,13)] transition-colors">Contact Us</Link>
                            <Link href="#" onClick={() => setIsMenuOpen(false)} className="hover:text-[rgb(247,216,13)] transition-colors">FAQ</Link>
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

            {/* Main Content */}
            <main className="w-full relative flex flex-col items-center" style={{ backgroundColor: 'rgb(239, 239, 231)' }}>

                {/* Explore Products Section */}
                <div className="w-full max-w-[1440px] mx-auto px-8 pt-16 pb-8">
                    <div className="w-full flex flex-col items-center mb-20 px-4 text-center">
                        <h2 className="font-kura leading-none mb-12 uppercase flex gap-4">
                            <span className="text-[65px]" style={{ color: 'rgb(21, 107, 54)' }}>OUR</span>
                            <span className="text-[65px]" style={{ color: 'rgb(247, 0, 52)' }}>PRODUCTS</span>
                        </h2>

                        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10">
                            {[
                                { status: 'active', title: 'All Purpose Gravy (Onion & Tomato)' },
                                { status: 'coming_soon', title: 'All Purpose Gravy (Onion & Tomato)' },
                                { status: 'coming_soon', title: 'All Purpose Gravy (Onion & Tomato)' }
                            ].map((item, idx) => (
                                <div key={idx} className="flex flex-col items-center group">
                                    {/* Image Container */}
                                    <div className={`relative w-full aspect-[4/5] rounded-[20px] overflow-hidden mb-1 ${item.status === 'active' ? 'cursor-pointer' : ''}`}>
                                        <Image
                                            src="/images/all-p-gravy.svg"
                                            alt="Product"
                                            fill
                                            className={`object-contain transition-transform duration-500 group-hover:scale-[1.02] ${item.status === 'coming_soon' ? 'grayscale opacity-60' : ''}`}
                                        />
                                        {/* Coming Soon Badge */}
                                        {item.status === 'coming_soon' && (
                                            <div className="absolute inset-0 flex items-center justify-center p-4">
                                                <div className="bg-[rgb(247,0,52)] text-white px-8 py-2 rounded-[10px] text-[18px] font-bomstad font-normal shadow-lg">
                                                    Coming Soon
                                                </div>
                                            </div>
                                        )}
                                        {/* Clickable overlay for active products */}
                                        {item.status === 'active' && (
                                            <Link href="/all-purposegravy" className="absolute inset-0 z-10" aria-label="View product details" />
                                        )}
                                    </div>

                                    {/* Product Pill */}
                                    <div className="px-6 py-2 rounded-[10px] mb-3" style={{ backgroundColor: 'rgb(228, 233, 223)' }}>
                                        <span className="text-[20px] font-bomstad leading-snug text-center block" style={{ color: 'rgb(21, 106, 55)' }}>
                                            {item.title}
                                        </span>
                                    </div>

                                    {/* View Product Button */}
                                    <Link
                                        href="/all-purposegravy"
                                        className="w-[353px] relative h-[72px] flex items-center justify-center hover:scale-[1.02] transition-all group/btn"
                                    >
                                        <div
                                            className="absolute w-[349px] h-[60px] top-[10px] left-[0.75px] z-0 bg-[rgb(247,216,13)] rounded-[9px]"
                                            style={{ transform: 'rotate(-1.6deg)' }}
                                        />
                                        <div className="absolute inset-0 z-10 w-full h-full">
                                            <Image
                                                src="/images/border7.svg"
                                                alt="border"
                                                fill
                                                className="object-fill"
                                            />
                                        </div>
                                        <span className="relative z-20 text-[32px] font-kura font-normal text-[rgb(247,0,52)] uppercase">
                                            View Product
                                        </span>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {/* New Grid Footer Section */}
            <footer className="w-full py-16 px-8" style={{ backgroundColor: 'rgb(21, 107, 54)' }}>
                <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* Column 1: Brand Box */}
                    <div className="rounded-[30px] p-6 flex flex-col w-full md:w-[299px] h-auto md:h-[234px]" style={{ backgroundColor: 'rgb(55, 122, 49)' }}>
                        <div className="w-[80px] h-[40px] relative mb-3">
                            <Image src="/images/logo.svg" alt="GrabV Logo" fill className="object-contain" />
                        </div>
                        <div className="flex flex-col gap-1 text-[16px] font-medium leading-[1.2] font-bomstad" style={{ color: 'rgb(247, 216, 13)' }}>
                            <p>© 2026 GrabV. All rights reserved.</p>
                            <p className="opacity-90">88gb Digital Marketing & Technology Company</p>
                        </div>
                    </div>

                    {/* Column 2: Company Box */}
                    <div className="rounded-[30px] p-6 flex flex-col w-full md:w-[299px] h-auto md:h-[234px]" style={{ backgroundColor: 'rgb(55, 122, 49)' }}>
                        <h4 className="text-[22px] font-bold mb-2" style={{ color: 'rgb(247, 216, 13)' }}>Company</h4>
                        <div className="flex flex-col gap-1 text-[18px] font-medium font-bomstad leading-tight" style={{ color: 'rgb(247, 216, 13)' }}>
                            <Link href="/ourstory" className="hover:opacity-80 transition-opacity">Our Story</Link>
                            <Link href="#" className="hover:opacity-80 transition-opacity">Process</Link>
                            <Link href="#" className="hover:text-[rgb(247,216,13)] transition-colors">Quality Promise</Link>
                            <Link href="#" className="hover:opacity-80 transition-opacity">Contact Us</Link>
                        </div>
                    </div>

                    {/* Column 3: Product Box */}
                    <div className="rounded-[30px] p-6 flex flex-col w-full md:w-[299px] h-auto md:h-[234px]" style={{ backgroundColor: 'rgb(55, 122, 49)' }}>
                        <h4 className="text-[22px] font-bold mb-2" style={{ color: 'rgb(247, 216, 13)' }}>Product</h4>
                        <div className="flex flex-col gap-1 text-[18px] font-medium font-bomstad leading-tight" style={{ color: 'rgb(247, 216, 13)' }}>
                            <Link href="/all-purposegravy" className="hover:opacity-80 transition-opacity">All Purpose Gravy</Link>
                            <Link href="#" className="hover:opacity-80 transition-opacity">Ingredients</Link>
                            <Link href="#" className="hover:opacity-80 transition-opacity">How to Use</Link>
                            <Link href="#" className="hover:opacity-80 transition-opacity">Recipes</Link>
                        </div>
                    </div>

                    {/* Column 4: Orders & Policies Box */}
                    <div className="rounded-[30px] p-6 flex flex-col w-full md:w-[299px] h-auto md:h-[234px] justify-between" style={{ backgroundColor: 'rgb(55, 122, 49)' }}>
                        <div>
                            <h4 className="text-[22px] font-bold mb-2" style={{ color: 'rgb(247, 216, 13)' }}>Order & Policies</h4>
                            <div className="flex flex-col gap-1 text-[18px] font-medium font-bomstad leading-tight" style={{ color: 'rgb(247, 216, 13)' }}>
                                <Link href="#" className="hover:opacity-80 transition-opacity">WhatsApp Order</Link>
                                <Link href="#" className="hover:opacity-80 transition-opacity">Exchange Order</Link>
                                <Link href="#" className="hover:opacity-80 transition-opacity">Privacy Policy</Link>
                            </div>
                        </div>

                        {/* Social Links at Bottom Right of this box */}
                        <div className="flex flex-col items-end gap-1.5 self-end mt-4">
                            <span className="text-[14px] font-bold font-bomstad text-white">Follow Us</span>
                            <div className="flex items-center gap-3">
                                <Link href="#" className="w-6 h-6 relative hover:scale-110 transition-transform brightness-0 invert">
                                    <Image src="/images/facebook.svg" alt="Facebook" fill className="object-contain" />
                                </Link>
                                <Link href="#" className="w-6 h-6 relative hover:scale-110 transition-transform brightness-0 invert">
                                    <Image src="/images/whatsapp1.svg" alt="WhatsApp" fill className="object-contain" />
                                </Link>
                                <Link href="#" className="w-6 h-6 relative hover:scale-110 transition-transform brightness-0 invert">
                                    <Image src="/images/insta.svg" alt="Instagram" fill className="object-contain" />
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </footer>
        </div>
    );
}

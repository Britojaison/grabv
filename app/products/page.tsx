"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProductsListPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="flex flex-col min-h-screen w-full font-arpona overflow-x-hidden" style={{ backgroundColor: 'rgb(239, 239, 231)' }}>

            {/* Navbar */}
            <header
                style={{ backgroundColor: 'rgb(12, 61, 27)' }}
                className="sticky top-0 z-[100] w-full flex-shrink-0 shadow-md"
            >
                <div className="max-w-[1600px] mx-auto px-4 md:pl-4 md:pr-8 h-[70px] md:h-[80px] flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {/* Hamburger Menu - Mobile and Tablet */}
                        <div className="lg:hidden flex items-center">
                            <button
                                className="text-white focus:outline-none p-2"
                                onClick={() => setIsMenuOpen(true)}
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
                        <Link href="/products" className="text-[rgb(247,216,13)] transition-colors text-[18px]">Products</Link>
                        <Link href="/ourstory" className="hover:text-[rgb(247,216,13)] transition-colors text-[18px] whitespace-nowrap">Our Story</Link>
                        <Link href="/contact" className="hover:text-[rgb(247,216,13)] transition-colors text-[18px] whitespace-nowrap">Contact Us</Link>
                        <Link href="/faq" className="hover:text-[rgb(247,216,13)] transition-colors text-[18px]">FAQ</Link>
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
                        <nav className="flex flex-col items-center gap-8 text-white font-arpona font-medium text-[24px]">
                            <Link href="/" onClick={() => setIsMenuOpen(false)} className="hover:text-[rgb(247,216,13)] transition-colors">Home</Link>
                            <Link href="/recipes" onClick={() => setIsMenuOpen(false)} className="hover:text-[rgb(247,216,13)] transition-colors">Recipes</Link>
                            <Link href="/products" onClick={() => setIsMenuOpen(false)} className="hover:text-[rgb(247,216,13)] transition-colors text-[rgb(247,216,13)]">Products</Link>
                            <Link href="/ourstory" onClick={() => setIsMenuOpen(false)} className="hover:text-[rgb(247,216,13)] transition-colors">Our Story</Link>
                            <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="hover:text-[rgb(247,216,13)] transition-colors">Contact Us</Link>
                            <Link href="/faq" onClick={() => setIsMenuOpen(false)} className="hover:text-[rgb(247,216,13)] transition-colors">FAQ</Link>
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
                <div className="w-full max-w-[1600px] mx-auto px-4 md:px-16 pt-8 md:pt-16 pb-8">
                    <div className="w-full flex flex-col items-center mb-8 md:mb-20 px-4 text-center">
                        <h2 className="font-kura leading-none mb-8 md:mb-12 uppercase text-center">
                            <span className="text-[32px] sm:text-[42px] md:text-[50px] lg:text-[65px] mr-2 md:mr-4 inline-block" style={{ color: 'rgb(21, 107, 54)' }}>OUR</span>
                            <span className="text-[32px] sm:text-[42px] md:text-[50px] lg:text-[65px] inline-block" style={{ color: 'rgb(247, 0, 52)' }}>PRODUCTS</span>
                        </h2>

                        <div className="w-full flex md:grid md:grid-cols-2 lg:grid-cols-3 overflow-x-auto md:overflow-visible gap-4 md:gap-10 pb-4 md:pb-0 no-scrollbar px-4 md:px-0">
                            {[
                                { status: 'active', title: 'Onion Tomato Gravy', image: '/images/APGArtboard-1 (3).png' },
                                { status: 'coming_soon', title: 'Smoked Makhani Gravy', image: '/images/smoked makani.png' },
                                { status: 'coming_soon', title: 'Smoked Makhani Gravy', image: '/images/smoked makani.png' }
                            ].map((item, idx) => (
                                <div key={idx} className="flex flex-col items-center group shrink-0 w-[190px] md:w-auto">
                                    {/* Image Container */}
                                    <div className={`relative w-full aspect-[4/5] rounded-[20px] overflow-hidden mb-5 bg-[#F5F5F5] ${item.status === 'active' ? 'cursor-pointer' : ''}`}>
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className={`object-cover transition-transform duration-500 ${
                                                item.status === 'coming_soon'
                                                    ? 'object-bottom scale-[1.45] group-hover:scale-[1.48] grayscale opacity-60'
                                                    : 'object-center scale-[1.36] -translate-y-[16px] group-hover:scale-[1.38] md:object-bottom md:scale-[1.34] md:-translate-y-[28px] md:group-hover:scale-[1.37]'
                                                }`}
                                        />
                                        {/* Coming Soon Badge */}
                                        {item.status === 'coming_soon' && (
                                            <div className="absolute inset-0 flex items-center justify-center p-4">
                                                <div className="bg-[rgb(247,0,52)] text-white px-3 md:px-6 py-1 md:py-2 rounded-[8px] md:rounded-[10px] text-[14px] md:text-[18px] font-arpona font-normal shadow-lg">
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
                                    <div className="px-2 md:px-6 py-1.5 md:py-2 rounded-[8px] md:rounded-[10px] mb-3 w-full md:w-auto" style={{ backgroundColor: 'rgb(228, 233, 223)' }}>
                                        <span className="text-[14px] md:text-[20px] font-arpona leading-snug text-center block" style={{ color: 'rgb(21, 106, 55)' }}>
                                            {item.title}
                                        </span>
                                    </div>

                                    {/* View Product Button */}
                                    <Link
                                        href="/all-purposegravy"
                                        className="w-full md:w-[353px] relative h-[60px] md:h-[72px] flex items-center justify-center hover:scale-[1.02] transition-all group/btn"
                                    >
                                        <div
                                            className="absolute w-[calc(100%-10px)] md:w-[349px] h-[calc(100%-28px)] md:h-[60px] top-[14px] left-[5px] md:left-[0.75px] z-0 bg-[rgb(247,216,13)] rounded-[9px]"
                                            style={{ transform: 'rotate(-0.8deg)' }}
                                        />
                                        <div className="absolute inset-0 z-10 w-full h-full">
                                            <Image
                                                src="/images/border7.svg"
                                                alt="border"
                                                fill
                                                className="object-fill"
                                            />
                                        </div>
                                        <span className="relative z-20 text-[20px] md:text-[32px] font-kura font-medium text-[rgb(247,0,52)] uppercase">
                                            View Product
                                        </span>
                                    </Link>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>


            </main>


            {/* Footer Section */}
            <footer className="w-full py-12 md:py-16 pl-3 pr-6 md:pl-4 md:pr-8" style={{ backgroundColor: 'rgb(21, 107, 54)' }}>
                <div className="max-w-[1600px] mx-auto">
                    {/* Mobile Footer (Matching Figma) */}
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
                                <div className="flex flex-col gap-1 mt-2">
                                    <span className="text-[11px] font-bold font-arpona text-white">Follow Us</span>
                                    <div className="flex items-center gap-3">
                                        <Link href="#" className="w-4 h-4 relative brightness-0 invert">
                                            <Image src="/images/facebook.svg" alt="Facebook" fill className="object-contain" />
                                        </Link>
                                        <Link href="#" className="w-4 h-4 relative brightness-0 invert">
                                            <Image src="/images/whatsapp1.svg" alt="WhatsApp" fill className="object-contain" />
                                        </Link>
                                        <Link href="#" className="w-4 h-4 relative brightness-0 invert">
                                            <Image src="/images/insta.svg" alt="Instagram" fill className="object-contain" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Footer Section */}
                    <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Column 1: Brand & Socials (No Box) */}
                        <div className="p-0 flex flex-col w-full md:w-[299px] h-auto md:h-[234px] justify-between">
                            <div className="flex flex-col">
                                <div className="w-[110px] h-[55px] relative mb-4">
                                    <Image src="/images/logo.svg" alt="GrabV Logo" fill className="object-contain object-left" />
                                </div>
                                <div className="flex flex-col gap-1 text-[16px] font-medium leading-[1.2] font-arpona" style={{ color: 'rgb(247, 216, 13)' }}>
                                    <p>© 2026 GrabV. All rights reserved.</p>
                                </div>
                            </div>

                            <div className="flex flex-col items-start gap-1.5 mt-auto">
                                <span className="text-[14px] font-bold font-arpona text-white">Follow Us</span>
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

                        {/* Column 2: Company Box */}
                        <div className="rounded-[30px] p-6 flex flex-col w-full md:w-[299px] h-auto md:h-[234px]" style={{ backgroundColor: 'rgb(55, 122, 49)' }}>
                            <h4 className="text-[22px] font-bold mb-2" style={{ color: 'rgb(247, 216, 13)' }}>Company</h4>
                            <div className="flex flex-col gap-1 text-[18px] font-medium font-arpona leading-tight" style={{ color: 'rgb(247, 216, 13)' }}>
                                <Link href="/ourstory" className="hover:opacity-80 transition-opacity">Our Story</Link>
                                <Link href="/#process" className="hover:opacity-80 transition-opacity">Process</Link>
                                <Link href="/#quality" className="hover:text-[rgb(247,216,13)] transition-colors">Quality Promise</Link>
                                <Link href="/contact" className="hover:opacity-80 transition-opacity">Contact Us</Link>
                            </div>
                        </div>

                        {/* Column 3: Product Box */}
                        <div className="rounded-[30px] p-6 flex flex-col w-full md:w-[299px] h-auto md:h-[234px]" style={{ backgroundColor: 'rgb(55, 122, 49)' }}>
                            <h4 className="text-[22px] font-bold mb-2" style={{ color: 'rgb(247, 216, 13)' }}>Product</h4>
                            <div className="flex flex-col gap-1 text-[18px] font-medium font-arpona leading-tight" style={{ color: 'rgb(247, 216, 13)' }}>
                                <Link href="/all-purposegravy" className="hover:opacity-80 transition-opacity">All Purpose Gravy</Link>
                                <Link href="/all-purposegravy#ingredients" className="hover:opacity-80 transition-opacity">Ingredients</Link>
                                <Link href="/all-purposegravy#how-to-use" className="hover:opacity-80 transition-opacity">How to Use</Link>
                                <Link href="/recipes" className="hover:opacity-80 transition-opacity">Recipes</Link>
                            </div>
                        </div>

                        {/* Column 4: Order & Policies Box */}
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

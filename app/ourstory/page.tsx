"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function OurStoryPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="flex flex-col min-h-screen w-full font-bomstad overflow-x-hidden" style={{ backgroundColor: 'rgb(239, 238, 230)' }}>

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
                        <Link href="/products" className="hover:text-[rgb(247,216,13)] transition-colors text-[18px]">Products</Link>
                        <Link href="/ourstory" className="text-[rgb(247,216,13)] transition-colors text-[18px] whitespace-nowrap">Our Story</Link>
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
                            <Link href="/products" onClick={() => setIsMenuOpen(false)} className="hover:text-[rgb(247,216,13)] transition-colors">Products</Link>
                            <Link href="/ourstory" onClick={() => setIsMenuOpen(false)} className="hover:text-[rgb(247,216,13)] transition-colors text-[rgb(247,216,13)]">Our Story</Link>
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
            <main className="w-full relative flex flex-col items-center">

                {/* Hero Section - How it started */}
                <section className="w-full relative pt-12 md:pt-24 pb-24 md:pb-48 flex flex-col items-center overflow-visible">
                    {/* Background Layer */}
                    <div className="absolute inset-0 z-0 overflow-hidden">
                        <Image
                            src="/images/bg yellow.svg"
                            alt="Yellow Background"
                            fill
                            className="object-cover object-bottom"
                            priority
                        />
                    </div>

                    <div className="relative w-full max-w-[1440px] mx-auto px-4 md:px-8 z-10 flex flex-row md:flex-row items-center gap-4 md:gap-12">
                        
                        {/* Left Content */}
                        <div className="w-[50%] md:w-[60%] flex flex-col items-start">

                            <h1 className="font-kura leading-[0.9] mb-4 md:mb-10 uppercase">
                                <span className="block text-[22px] md:text-[100px]" style={{ color: 'rgb(21, 107, 54)' }}>A PROBLEM</span>
                                <span className="block text-[18px] md:text-[60px]" style={{ color: 'rgb(247, 0, 52)' }}>
                                    EVERY FAMILY KNOWS
                                </span>
                            </h1>

                            {/* Description Texts */}
                            <div className="flex flex-col gap-4 md:gap-8 w-full">
                                <p className="font-bomstad font-normal text-[13.5px] md:text-[18px] leading-[1.3]" style={{ color: 'rgb(21, 107, 54)' }}>
                                    Every evening, millions of Indian families face the same question – what&apos;s for dinner, and who has 90 minutes to cook it? The onion-tomato masala alone takes longer than most people have after a full day of work.
                                </p>
                                <p className="hidden md:block font-bomstad font-normal text-[18px] leading-[1.3]" style={{ color: 'rgb(21, 107, 54)' }}>
                                    Our founder Priya was one of them. A working mother in Bengaluru, she found herself choosing between quick but unhealthy, or homemade but exhausting. There had to be a better way.
                                </p>
                            </div>
                        </div>

                        {/* Right Content - Image */}
                        <div className="w-[50%] md:w-[40%] flex justify-center md:justify-end">
                            <div className="relative w-full aspect-[4/5] md:aspect-[581/424] max-w-[320px] md:max-w-[581px] rounded-[15px] md:rounded-[20px] overflow-hidden border-t-[6px] md:border-t-[10px] border-r-[6px] md:border-r-[10px] border-[rgb(247,0,52)] md:-mt-16 shadow-lg">
                                <Image
                                    src="/images/ourstory1.webp"
                                    alt="How it started"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>

                    </div>
                </section>

                {/* Made with love & slow heat sections */}
                <section className="w-full py-8 md:py-4 flex flex-col items-center gap-8 md:gap-0">

                    {/* Top Sub-section: Side-by-side on Mobile too */}
                    <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 flex flex-row md:flex-row items-start md:items-center gap-4 md:gap-16">
                        {/* Image */}
                        <div className="w-[45%] md:w-[50%] flex justify-center md:justify-start">
                            <div className="relative w-full aspect-square md:aspect-[581/593] max-w-[650px]">
                                <Image
                                    src="/images/ourstory2.svg"
                                    alt="Our Story 2"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        {/* Text */}
                        <div className="w-[55%] md:w-[50%] flex flex-col items-start pt-0 md:pt-2">
                            {/* Our Story Tag */}
                            <div className="relative mb-2 md:mb-4 inline-block scale-75 md:scale-100 origin-left">
                                <div style={{ backgroundColor: 'rgb(247, 216, 13)' }} className="px-6 md:px-8 py-1.5 md:py-2.5 rounded-full relative z-10">
                                    <span className="text-[rgb(21,107,54)] font-normal text-[18px] md:text-[25px] font-bomstad tracking-wider whitespace-nowrap uppercase">
                                        OUR STORY
                                    </span>
                                </div>
                                <div className="absolute -inset-1.5 md:-inset-2 z-20 pointer-events-none">
                                    <Image src="/images/border4.svg" alt="" fill className="object-contain" />
                                </div>
                            </div>

                            <h2 className="font-kura leading-[0.95] mb-2 md:mb-6 uppercase">
                                <span className="block text-[18px] md:text-[60px]" style={{ color: 'rgb(21, 107, 54)' }}>MADE WITH LOVE &</span>
                                <span className="block text-[18px] md:text-[60px]" style={{ color: 'rgb(247, 0, 52)' }}>SLOW HEAT</span>
                            </h2>

                            <p className="font-bomstad font-normal text-[13.5px] md:text-[18px] leading-[1.3] opacity-90" style={{ color: 'rgb(21, 107, 54)' }}>
                                Every evening, millions of Indian families face the same question – what&apos;s for dinner, and who has 90 minutes to cook it?
                            </p>
                        </div>
                    </div>

                    {/* Bottom Sub-section */}
                    <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 flex flex-row-reverse md:flex-row-reverse items-start md:items-center gap-4 md:gap-16">
                        {/* Image */}
                        <div className="w-[45%] md:w-[50%] flex justify-center md:justify-end">
                            <div className="relative w-full aspect-square md:aspect-[581/593] max-w-[700px]">
                                <Image
                                    src="/images/ourstory3.svg"
                                    alt="Our Story 3"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        {/* Text */}
                        <div className="w-[55%] md:w-[50%] flex flex-col items-start pt-0 md:pt-2">
                            <div className="relative mb-2 md:mb-4 inline-block scale-75 md:scale-100 origin-left">
                                <div style={{ backgroundColor: 'rgb(247, 216, 13)' }} className="px-6 md:px-8 py-1.5 md:py-2.5 rounded-full relative z-10">
                                    <span className="text-[rgb(21,107,54)] font-normal text-[18px] md:text-[25px] font-bomstad tracking-wider whitespace-nowrap uppercase">
                                        OUR STORY
                                    </span>
                                </div>
                                <div className="absolute -inset-1.5 md:-inset-2 z-20 pointer-events-none">
                                    <Image src="/images/border4.svg" alt="" fill className="object-contain" />
                                </div>
                            </div>

                            <h2 className="font-kura leading-[0.95] mb-2 md:mb-6 uppercase">
                                <span className="block text-[18px] md:text-[60px]" style={{ color: 'rgb(21, 107, 54)' }}>MADE WITH LOVE &</span>
                                <span className="block text-[18px] md:text-[60px]" style={{ color: 'rgb(247, 0, 52)' }}>SLOW HEAT</span>
                            </h2>

                            <p className="font-bomstad font-normal text-[13.5px] md:text-[18px] leading-[1.3] opacity-90" style={{ color: 'rgb(21, 107, 54)' }}>
                                Every evening, millions of Indian families face the same question – what&apos;s for dinner, and who has 90 minutes to cook it?
                            </p>
                        </div>
                    </div>
                </section>

                {/* Features Bar - Redesigned for Mobile */}
                <section className="w-full relative flex flex-col items-center overflow-visible mt-8">
                    <div className="w-full min-h-[60px] md:min-h-0 md:py-0 relative flex items-center justify-center">
                        {/* Mobile Background - Green Paper with Torn Edge */}
                        <div className="md:hidden absolute inset-0 z-0">
                            <Image 
                                src="/images/green paper mobile.svg" 
                                alt="" 
                                fill 
                                className="object-cover object-top"
                                priority
                            />
                        </div>
                        
                        {/* Mobile Bar Content - Infinite Scrolling Marquee */}
                        <div className="md:hidden relative z-10 w-full overflow-hidden py-4">
                            <div className="flex flex-row animate-marquee whitespace-nowrap gap-8 w-max">
                                {[
                                    { icon: "/images/timer2.svg", text: "Ready In 10 min" },
                                    { icon: "/images/slow.svg", text: "Slow cooked" },
                                    { icon: "/images/fssai icon.svg", text: "FSSAI Certified" },
                                    { icon: "/images/tick2.svg", text: "Zero Preservatives" },
                                    { icon: "/images/cold.svg", text: "Cold Chain Packed" },
                                    { icon: "/images/timer2.svg", text: "Ready In 10 min" },
                                    { icon: "/images/slow.svg", text: "Slow cooked" },
                                    { icon: "/images/fssai icon.svg", text: "FSSAI Certified" },
                                    { icon: "/images/tick2.svg", text: "Zero Preservatives" },
                                    { icon: "/images/cold.svg", text: "Cold Chain Packed" },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-2 shrink-0">
                                        <div className="w-5 h-5 relative" style={{ filter: 'brightness(0) saturate(100%) invert(87%) sepia(74%) saturate(1629%) hue-rotate(345deg) brightness(102%) contrast(104%)' }}>
                                            <Image src={item.icon} alt="" fill className="object-contain" />
                                        </div>
                                        <span className="font-bomstad font-normal text-[12px] uppercase tracking-wide" style={{ color: 'rgb(247, 216, 13)' }}>{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Desktop Background Layer (Unchanged) */}
                        <div className="hidden md:block w-full relative pt-24 pb-16 flex flex-col items-center text-center overflow-hidden">
                            <div className="absolute inset-0 z-0 overflow-hidden">
                                <Image src="/images/bg green2.svg" alt="" fill className="object-cover object-top scale-x-[-1]" priority />
                                <div className="absolute inset-0 -z-10" style={{ backgroundColor: 'rgb(239, 238, 230)' }} />
                            </div>
                            <div className="relative z-10 flex flex-col items-center gap-6 mt-4">
                                <div className="flex flex-wrap justify-center items-center gap-6">
                                    {[
                                        { icon: "/images/timer2.svg", text: "Ready in 10 min" },
                                        { icon: "/images/slow.svg", text: "Slow cooked" },
                                        { icon: "/images/fssai icon.svg", text: "FSSAI Certified" },
                                    ].map((item, idx) => (
                                        <div key={idx} className="bg-white md:bg-[rgb(247,216,13)] rounded-full px-8 py-3.5 flex items-center gap-4 shadow-md text-[rgb(21,106,55)]">
                                            <div className="w-8 h-8 relative flex items-center justify-center">
                                                <Image src={item.icon} alt="" fill className="object-contain" />
                                            </div>
                                            <span className="font-bomstad font-normal text-[25px] whitespace-nowrap">{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-wrap justify-center items-center gap-6">
                                    {[
                                        { icon: "/images/tick2.svg", text: "Zero Preservatives" },
                                        { icon: "/images/cold.svg", text: "Cold Chain Packed" },
                                    ].map((item, idx) => (
                                        <div key={idx} className="bg-white md:bg-[rgb(247,216,13)] rounded-full px-8 py-3.5 flex items-center gap-4 shadow-md text-[rgb(21,106,55)]">
                                            <div className="w-8 h-8 relative flex items-center justify-center">
                                                <Image src={item.icon} alt="" fill className="object-contain" />
                                            </div>
                                            <span className="font-bomstad font-normal text-[25px] whitespace-nowrap">{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Amit Shah Section */}
                <section className="w-full py-12 md:py-24 flex flex-col items-center overflow-hidden">
                    {/* Mobile View Section (Side-by-side) */}
                    <div className="md:hidden w-full max-w-[1440px] mx-auto px-4 flex flex-col gap-8">
                        <div className="w-full flex flex-row items-start gap-4">
                            {/* Portrait on Left */}
                            <div className="w-[45%] flex flex-col items-center">
                                <div className="relative w-full aspect-[430/480] rounded-[15px] overflow-visible border-t-[6px] border-r-[6px] border-[rgb(247,0,52)] shadow-xl">
                                    <Image
                                        src="/images/ourstory4.webp"
                                        alt="Amit Shah"
                                        fill
                                        className="object-cover rounded-[15px]"
                                    />
                                    {/* Mobile Tilted Badge - Contained within border */}
                                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-30 w-[80%]">
                                        <div className="relative w-full h-[40px] flex items-center justify-center">
                                            <div style={{ backgroundColor: 'rgb(247, 216, 13)' }} className="absolute inset-0.5 rounded-[8px]" />
                                            <div className="absolute -inset-1.5 z-10 pointer-events-none">
                                                <Image src="/images/border5.svg" alt="" fill className="object-contain" />
                                            </div>
                                            <div className="relative z-20 text-center rotate-[1.5deg]">
                                                <p className="font-kura text-[13px] leading-none text-[rgb(247,0,52)] uppercase">AMIT SHAH</p>
                                                <p className="font-bomstad text-[8px] text-[rgb(21,107,54)] leading-none mt-1">millions of Indian</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Text on Right */}
                            <div className="w-[55%] flex flex-col items-start pt-2">
                                <h2 className="font-kura leading-[0.95] mb-4 uppercase">
                                    <span className="block text-[22px]" style={{ color: 'rgb(21, 107, 54)' }}>MADE WITH LOVE &</span>
                                    <span className="block text-[22px]" style={{ color: 'rgb(247, 0, 52)' }}>SLOW HEAT</span>
                                </h2>
                                <p className="font-bomstad font-normal text-[13.5px] leading-[1.3] opacity-95" style={{ color: 'rgb(21, 107, 54)' }}>
                                    Our founder Priya was one of them. A working mother in Bengaluru, she found herself choosing between quick but unhealthy, or homemade but exhausting. There had to be a better way.
                                </p>
                            </div>
                        </div>

                        {/* Mobile Blockquote (Below) */}
                        <div className="w-full px-2 mt-4">
                            <div className="pl-4 border-l-2 border-[rgb(247,0,52)]">
                                <p className="font-bomstad font-medium text-[15.5px] leading-[1.4]" style={{ color: 'rgb(21, 107, 54)' }}>
                                    Our founder Priya was one of them. A working mother in Bengaluru, she found herself choosing between quick but unhealthy, or homemade but exhausting. There had to be a better way.Our founder Priya was one of them. A working mother
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Desktop View Section (Original Layout) */}
                    <div className="hidden md:flex w-full max-w-[1440px] mx-auto px-8 flex-row items-start gap-24">
                        {/* Portrait & Tilted Box on Left */}
                        <div className="w-[45%] flex flex-col items-center">
                            <div className="relative w-full aspect-[430/480] max-w-[430px] rounded-[20px] overflow-hidden border-t-[10px] border-r-[10px] border-[rgb(247,0,52)]">
                                <Image
                                    src="/images/ourstory4.webp"
                                    alt="Amit Shah"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="relative inline-block lg:-mt-24 z-30">
                                <div style={{ backgroundColor: 'rgb(247, 216, 13)', width: '306px', height: '132px' }} className="rounded-[15px] relative z-10" />
                                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center rotate-[1.5deg]">
                                    <div className="absolute -inset-1 pointer-events-none">
                                        <Image src="/images/border5.svg" alt="" fill className="object-contain" />
                                    </div>
                                    <span className="relative z-30 font-kura text-[32px] leading-tight mb-2 uppercase" style={{ color: 'rgb(247, 0, 52)' }}>AMIT SHAH</span>
                                    <span className="relative z-30 font-bomstad text-[18px] font-normal leading-tight" style={{ color: 'rgb(21, 107, 54)' }}>Every evening, millions<br />of Indian</span>
                                </div>
                            </div>
                        </div>

                        {/* Text Content on Right */}
                        <div className="w-[55%] flex flex-col items-start pt-8">
                            <h2 className="font-kura leading-[0.95] mb-8 uppercase">
                                <span className="block text-[60px]" style={{ color: 'rgb(21, 107, 54)' }}>MADE WITH</span>
                                <span className="block text-[60px]" style={{ color: 'rgb(247, 0, 52)' }}>LOVE & SLOW HEAT</span>
                            </h2>
                            <div className="flex flex-col gap-8">
                                <p className="font-bomstad font-normal text-[18px] leading-[1.3]" style={{ color: 'rgb(21, 107, 54)' }}>
                                    Our founder Priya was one of them. A working mother in Bengaluru, she found herself choosing between quick but unhealthy, or homemade but exhausting. There had to be a better way.
                                </p>
                                <div className="pl-8 border-l-[6px]" style={{ borderColor: 'rgb(247, 0, 52)' }}>
                                    <p className="font-bomstad font-medium text-[20px] leading-[1.3]" style={{ color: 'rgb(21, 107, 54)' }}>
                                        Our founder Priya was one of them. A working mother in Bengaluru, she found herself choosing between quick but unhealthy, or homemade but exhausting. There had to be a better way.Our founder Priya was one of them. A working mother in Bengaluru, she found herself choosing between quick but unhealthy, or homemade but exhausting. There had to be a better way.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* New Grid Footer Section */}
            <footer className="w-full py-12 md:py-16 px-6 md:px-8" style={{ backgroundColor: 'rgb(21, 107, 54)' }}>
                <div className="max-w-[1440px] mx-auto">
                    {/* Mobile Footer (Figma Style) */}
                    <div className="md:hidden grid grid-cols-2 gap-x-8 gap-y-10">
                        {/* Col 1: Brand & Company */}
                        <div className="flex flex-col gap-10">
                            <div className="flex flex-col gap-4">
                                <div className="w-[70px] h-[35px] relative">
                                    <Image src="/images/logo.svg" alt="GrabV Logo" fill className="object-contain" />
                                </div>
                                <div className="flex flex-col gap-0 text-[11px] font-medium leading-tight font-bomstad" style={{ color: 'rgb(247, 216, 13)' }}>
                                    <p>© 2026 GrabV. All rights reserved.</p>
                                    <p className="opacity-80">88gb Digital Marketing & Technology Company</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <h4 className="text-[16px] font-bold" style={{ color: 'rgb(247, 216, 13)' }}>Company</h4>
                                <div className="flex flex-col gap-0 text-[14px] font-medium font-bomstad leading-relaxed" style={{ color: 'rgb(247, 216, 13)' }}>
                                    <Link href="/ourstory">Our Story</Link>
                                    <Link href="#">Process</Link>
                                    <Link href="#">Quality Promise</Link>
                                    <Link href="#">Contact Us</Link>
                                </div>
                            </div>
                        </div>

                        {/* Col 2: Policies & Products */}
                        <div className="flex flex-col gap-10">
                            <div className="flex flex-col gap-1">
                                <h4 className="text-[16px] font-bold" style={{ color: 'rgb(247, 216, 13)' }}>Order & Policies</h4>
                                <div className="flex flex-col gap-0 text-[14px] font-medium font-bomstad leading-relaxed" style={{ color: 'rgb(247, 216, 13)' }}>
                                    <Link href="#">WhatsApp Order</Link>
                                    <Link href="#">Exchange Order</Link>
                                    <Link href="#">Privacy Policy</Link>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <h4 className="text-[16px] font-bold" style={{ color: 'rgb(247, 216, 13)' }}>Product</h4>
                                <div className="flex flex-col gap-0 text-[14px] font-medium font-bomstad leading-relaxed" style={{ color: 'rgb(247, 216, 13)' }}>
                                    <Link href="/all-purposegravy">All Purpose Gravy</Link>
                                    <Link href="#">Ingredients</Link>
                                    <Link href="#">How to Use</Link>
                                    <Link href="#">Recipes</Link>
                                </div>

                                <div className="flex flex-col gap-1 mt-2">
                                    <span className="text-[11px] font-bold font-bomstad text-white">Follow Us</span>
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

                    {/* Desktop Footer Section (Unchanged) */}
                    <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {/* Column 1: Brand Box */}
                        <div className="rounded-[20px] md:rounded-[30px] p-6 flex flex-col w-full md:w-[299px] h-auto md:h-[234px]" style={{ backgroundColor: 'rgb(55, 122, 49)' }}>
                            <div className="w-[80px] h-[40px] relative mb-4">
                                <Image src="/images/logo.svg" alt="GrabV Logo" fill className="object-contain" />
                            </div>
                            <div className="flex flex-col gap-1 text-[14px] md:text-[16px] font-medium leading-tight font-bomstad" style={{ color: 'rgb(247, 216, 13)' }}>
                                <p>© 2026 GrabV. All rights reserved.</p>
                                <p className="opacity-90">88gb Digital Marketing & Technology Company</p>
                            </div>
                        </div>

                        {/* Column 2: Company Box */}
                        <div className="rounded-[20px] md:rounded-[30px] p-6 flex flex-col w-full md:w-[299px] h-auto md:h-[234px]" style={{ backgroundColor: 'rgb(55, 122, 49)' }}>
                            <h4 className="text-[18px] md:text-[22px] font-bold mb-3 md:mb-4" style={{ color: 'rgb(247, 216, 13)' }}>Company</h4>
                            <div className="flex flex-col gap-2 text-[16px] md:text-[18px] font-medium font-bomstad leading-tight" style={{ color: 'rgb(247, 216, 13)' }}>
                                <Link href="/ourstory" className="hover:opacity-80 transition-opacity">Our Story</Link>
                                <Link href="#" className="hover:opacity-80 transition-opacity">Process</Link>
                                <Link href="#" className="hover:text-[rgb(247,216,13)] transition-colors">Quality Promise</Link>
                                <Link href="#" className="hover:opacity-80 transition-opacity">Contact Us</Link>
                            </div>
                        </div>

                        {/* Column 3: Product Box */}
                        <div className="rounded-[20px] md:rounded-[30px] p-6 flex flex-col w-full md:w-[299px] h-auto md:h-[234px]" style={{ backgroundColor: 'rgb(55, 122, 49)' }}>
                            <h4 className="text-[18px] md:text-[22px] font-bold mb-3 md:mb-4" style={{ color: 'rgb(247, 216, 13)' }}>Product</h4>
                            <div className="flex flex-col gap-2 text-[16px] md:text-[18px] font-medium font-bomstad leading-tight" style={{ color: 'rgb(247, 216, 13)' }}>
                                <Link href="/all-purposegravy" className="hover:opacity-80 transition-opacity">All Purpose Gravy</Link>
                                <Link href="#" className="hover:opacity-80 transition-opacity">Ingredients</Link>
                                <Link href="#" className="hover:opacity-80 transition-opacity">How to Use</Link>
                                <Link href="#" className="hover:opacity-80 transition-opacity">Recipes</Link>
                            </div>
                        </div>

                        {/* Column 4: Orders & Policies Box */}
                        <div className="rounded-[20px] md:rounded-[30px] p-6 flex flex-col w-full md:w-[299px] h-auto md:h-[234px] justify-between" style={{ backgroundColor: 'rgb(55, 122, 49)' }}>
                            <div className="mb-6 md:mb-0">
                                <h4 className="text-[18px] md:text-[22px] font-bold mb-3 md:mb-4" style={{ color: 'rgb(247, 216, 13)' }}>Order & Policies</h4>
                                <div className="flex flex-col gap-2 text-[16px] md:text-[18px] font-medium font-bomstad leading-tight" style={{ color: 'rgb(247, 216, 13)' }}>
                                    <Link href="#" className="hover:opacity-80 transition-opacity">WhatsApp Order</Link>
                                    <Link href="#" className="hover:opacity-80 transition-opacity">Exchange Order</Link>
                                    <Link href="#" className="hover:opacity-80 transition-opacity">Privacy Policy</Link>
                                </div>
                            </div>

                            {/* Social Links at Bottom Right of this box */}
                            <div className="flex flex-col items-start md:items-end gap-2 self-start md:self-end mt-4 md:mt-auto">
                                <span className="text-[12px] md:text-[14px] font-bold font-bomstad text-white">Follow Us</span>
                                <div className="flex items-center gap-4">
                                    <Link href="#" className="w-5 h-5 md:w-6 md:h-6 relative hover:scale-110 transition-transform brightness-0 invert">
                                        <Image src="/images/facebook.svg" alt="Facebook" fill className="object-contain" />
                                    </Link>
                                    <Link href="#" className="w-5 h-5 md:w-6 md:h-6 relative hover:scale-110 transition-transform brightness-0 invert">
                                        <Image src="/images/whatsapp1.svg" alt="WhatsApp" fill className="object-contain" />
                                    </Link>
                                    <Link href="#" className="w-5 h-5 md:w-6 md:h-6 relative hover:scale-110 transition-transform brightness-0 invert">
                                        <Image src="/images/insta.svg" alt="Instagram" fill className="object-contain" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

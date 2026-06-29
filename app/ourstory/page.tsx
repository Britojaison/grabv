"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function OurStoryPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const revealImages = document.querySelectorAll(".story-reveal-image");

        if (!("IntersectionObserver" in window)) {
            revealImages.forEach((image) => image.classList.add("is-visible"));
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { rootMargin: "0px 0px -15% 0px", threshold: 0.2 }
        );

        revealImages.forEach((image) => observer.observe(image));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="flex flex-col min-h-screen w-full font-arpona" style={{ backgroundColor: 'rgb(239, 238, 230)' }}>

            {/* Header removed, now in layout.tsx */}

            {/* Main Content */}
            <main className="w-full relative flex flex-col items-center">


                {/* Hero Section - How it started */}
                <section className="w-full relative pt-24 md:pt-32 pb-24 md:pb-48 flex flex-col items-center overflow-visible">
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

                    <div className="relative w-full max-w-[1600px] mx-auto pl-4 pr-4 md:pl-16 md:pr-8 z-10 flex flex-row md:flex-row items-center gap-4 md:gap-12">
                        
                        {/* Left Content */}
                        <div className="w-[50%] md:w-[60%] flex flex-col items-start">

                            <h1 className="font-kura leading-[0.9] mb-4 md:mb-10 uppercase">
                                <span className="block text-[22px] md:text-[70px] lg:text-[100px]" style={{ color: 'rgb(21, 107, 54)' }}>The curry</span>
                                <span className="block text-[18px] md:text-[42px] lg:text-[60px]" style={{ color: 'rgb(247, 0, 52)' }}>story</span>
                            </h1>

                            {/* Description Texts */}
                            <div className="w-full">
                                <p className="font-arpona font-normal text-[14.5px] md:text-[20px] leading-[1.3] max-w-[660px]" style={{ color: 'rgb(21, 107, 54)' }}>
                                    Grab began with a very everyday problem, &quot;cooking takes time&quot;. A lot of it. And in the middle of busy days, work calls, traffic, and endless routines, making a simple curry started feeling like a task.
                                </p>
                                <p className="font-arpona font-normal text-[14.5px] md:text-[20px] leading-[1.3] mt-3 max-w-[500px]" style={{ color: 'rgb(21, 107, 54)' }}>
                                    So we thought... what if the hardest part was already done for you? That question became GrabV.
                                </p>
                            </div>
                        </div>

                        {/* Right Content - Image */}
                        <div className="w-[50%] md:w-[40%] flex justify-center md:justify-end">
                            <div className="story-reveal-image relative w-full aspect-[4/5] md:aspect-[581/424] max-w-[320px] md:max-w-[581px] rounded-[15px] md:rounded-[20px] overflow-hidden border-t-[6px] md:border-t-[10px] border-r-[6px] md:border-r-[10px] border-[rgb(247,0,52)] md:-mt-4 shadow-lg">
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
                <section className="w-full py-8 md:py-4 flex flex-col items-center gap-2 md:gap-0 xl:pb-[200px] 2xl:pb-[260px]">

                    {/* Top Sub-section: Side-by-side on Mobile too */}
                    {/* Mobile Heading & Para 1 */}
                    <div className="block md:hidden w-full px-4 mb-1">
                        {/* Our Story Tag */}
                        <div className="relative mb-2 inline-block scale-75 origin-left">
                            <div style={{ backgroundColor: 'rgb(247, 216, 13)' }} className="px-6 py-1.5 rounded-full relative z-10">
                                <span className="text-[rgb(21,107,54)] font-normal text-[18px] font-arpona tracking-wider whitespace-nowrap uppercase">
                                    OUR STORY
                                </span>
                            </div>
                            <div className="absolute -inset-1.5 z-20 pointer-events-none">
                                <Image src="/images/border4.svg" alt="" fill className="object-contain" />
                            </div>
                        </div>

                        <h2 className="font-kura leading-[0.95] mb-2 uppercase">
                            <span className="block text-[18px]" style={{ color: 'rgb(21, 107, 54)' }}>The story</span>
                            <span className="block text-[18px]" style={{ color: 'rgb(247, 0, 52)' }}>behind</span>
                        </h2>

                        <p className="font-arpona font-normal text-[13.5px] leading-[1.3]" style={{ color: 'rgb(21, 107, 54)' }}>
                            Grab was born from observing something incredibly common, people were skipping cooking not because they didn&apos;t want to, but because they simply didn&apos;t have the time anymore.
                        </p>
                    </div>

                    <div className="w-full max-w-[1600px] mx-auto px-4 md:pl-4 md:pr-8 flex flex-row md:flex-row items-center gap-4 md:gap-16">
                        {/* Image */}
                        <div className="w-[45%] md:w-[50%] flex justify-center md:justify-start">
                            <div className="story-reveal-image relative w-full aspect-square md:aspect-[581/593] max-w-[650px]" style={{ "--reveal-delay": "80ms" } as React.CSSProperties}>
                                <Image
                                    src="/images/ourstory2.webp"
                                    alt="Our Story 2"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        {/* Text */}
                        <div className="w-[55%] md:w-[50%] flex flex-col items-start pt-0 md:pt-2">
                            {/* Desktop Heading & Tag */}
                            <div className="hidden md:block">
                                {/* Our Story Tag */}
                                <div className="relative mb-4 inline-block origin-left">
                                    <div style={{ backgroundColor: 'rgb(247, 216, 13)' }} className="px-8 py-2.5 rounded-full relative z-10">
                                        <span className="text-[rgb(21,107,54)] font-normal text-[25px] font-arpona tracking-wider whitespace-nowrap uppercase">
                                            OUR STORY
                                        </span>
                                    </div>
                                    <div className="absolute -inset-2 z-20 pointer-events-none">
                                        <Image src="/images/border4.svg" alt="" fill className="object-contain" />
                                    </div>
                                </div>

                                <h2 className="font-kura leading-[0.95] mb-6 uppercase">
                                    <span className="block text-[60px]" style={{ color: 'rgb(21, 107, 54)' }}>The story</span>
                                    <span className="block text-[60px]" style={{ color: 'rgb(247, 0, 52)' }}>behind</span>
                                </h2>
                            </div>

                            <div className="flex flex-col gap-3 md:gap-5">
                                {/* Desktop Para 1 */}
                                <p className="hidden md:block font-arpona font-normal text-[18px] leading-[1.3]" style={{ color: 'rgb(21, 107, 54)' }}>
                                    Grab was born from observing something incredibly common, people were skipping cooking not because they didn&apos;t want to, but because they simply didn&apos;t have the time anymore.
                                </p>
                                
                                <p className="font-arpona font-normal text-[13.5px] md:text-[18px] leading-[1.3]" style={{ color: 'rgb(21, 107, 54)' }}>
                                    The idea was never to create another packaged food brand. The goal was to create something that genuinely helped everyday cooking feel easier while still tasting real.
                                </p>
                                
                                <p className="hidden md:block font-arpona font-normal text-[18px] leading-[1.3]" style={{ color: 'rgb(21, 107, 54)' }}>
                                    That meant building gravies that felt fresh, rich, and dependable. Something that could save nearly an hour in the kitchen without taking away the taste and joy of cooking itself.
                                </p>
                                <p className="hidden md:block font-arpona font-normal text-[18px] leading-[1.3]" style={{ color: 'rgb(21, 107, 54)' }}>
                                    After countless trials, recipes, and processes, Grab became a fresh-chilled gravy solution made for the way modern India cooks today.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Para 3 & 4 */}
                    <div className="block md:hidden w-full px-4 mt-1 flex flex-col gap-1">
                        <p className="font-arpona font-normal text-[13.5px] leading-[1.3]" style={{ color: 'rgb(21, 107, 54)' }}>
                            That meant building gravies that felt fresh, rich, and dependable. Something that could save nearly an hour in the kitchen without taking away the taste and joy of cooking itself.
                        </p>
                        <p className="font-arpona font-normal text-[13.5px] leading-[1.3]" style={{ color: 'rgb(21, 107, 54)' }}>
                            After countless trials, recipes, and processes, Grab became a fresh-chilled gravy solution made for the way modern India cooks today.
                        </p>
                    </div>

                    {/* Bottom Sub-section */}
                    <div className="w-full max-w-[1600px] mx-auto px-4 md:pl-4 md:pr-8 flex flex-row-reverse md:flex-row-reverse items-center gap-4 md:gap-16 mt-6 md:mt-0">
                        {/* Image */}
                        <div className="w-[45%] md:w-[50%] flex justify-center md:justify-end">
                            <div className="story-reveal-image relative w-full aspect-square md:aspect-[581/593] max-w-[700px]" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
                                <Image
                                    src="/images/ourstory3.webp"
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
                                    <span className="text-[rgb(21,107,54)] font-normal text-[18px] md:text-[25px] font-arpona tracking-wider whitespace-nowrap uppercase">
                                        OUR STORY
                                    </span>
                                </div>
                                <div className="absolute -inset-1.5 md:-inset-2 z-20 pointer-events-none">
                                    <Image src="/images/border4.svg" alt="" fill className="object-contain" />
                                </div>
                            </div>

                            <h2 className="font-kura leading-[0.95] mb-2 md:mb-6 uppercase">
                                <span className="block text-[18px] md:text-[44px] lg:text-[60px]" style={{ color: 'rgb(21, 107, 54)' }}>What makes</span>
                                <span className="block text-[18px] md:text-[44px] lg:text-[60px]" style={{ color: 'rgb(247, 0, 52)' }}>Grab different</span>
                            </h2>

                            <div className="flex flex-col gap-3 md:gap-5">
                                <p className="font-arpona font-normal text-[13.5px] md:text-[18px] leading-[1.3] opacity-90" style={{ color: 'rgb(21, 107, 54)' }}>
                                    Our gravies are made in fresh batches using real ingredients and handled through chilled storage instead of heavy preservatives.
                                </p>
                                <p className="hidden md:block font-arpona font-normal text-[18px] leading-[1.3] opacity-90" style={{ color: 'rgb(21, 107, 54)' }}>
                                    The idea was simple: when you cook with Grab, the meal should still feel like your own.
                                </p>
                                <p className="hidden md:block font-arpona font-normal text-[18px] leading-[1.3] opacity-90" style={{ color: 'rgb(21, 107, 54)' }}>
                                    You cook the dish. We make the beginning easier.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Para 2 & 3 */}
                    <div className="block md:hidden w-full px-4 mt-2 flex flex-col gap-1">
                        <p className="font-arpona font-normal text-[13.5px] leading-[1.3] opacity-90" style={{ color: 'rgb(21, 107, 54)' }}>
                            The idea was simple: when you cook with Grab, the meal should still feel like your own.
                        </p>
                        <p className="font-arpona font-normal text-[13.5px] leading-[1.3] opacity-90" style={{ color: 'rgb(21, 107, 54)' }}>
                            You cook the dish. We make the beginning easier.
                        </p>
                    </div>
                </section>



                {/* Amit Shah Section hidden by request. Keep this content in code for future restore. */}
                {false && (
                <section className="w-full py-12 md:py-24 flex flex-col items-center overflow-hidden">
                    {/* Mobile View Section (Side-by-side) */}
                    <div className="md:hidden w-full max-w-[1600px] mx-auto px-4 flex flex-col gap-8">
                        <div className="w-full flex flex-row items-start gap-4">
                            {/* Portrait on Left */}
                            <div className="w-[45%] flex flex-col items-center">
                                <div className="story-reveal-image relative w-full aspect-[430/480] rounded-[15px] overflow-visible border-t-[6px] border-r-[6px] border-[rgb(247,0,52)] shadow-xl">
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
                                                <p className="font-arpona text-[8px] text-[rgb(21,107,54)] leading-none mt-1">millions of Indian</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Text on Right */}
                            <div className="w-[55%] flex flex-col items-start pt-2">
                                <h2 className="font-kura leading-[0.95] mb-4 uppercase">
                                    <span className="block text-[22px]" style={{ color: 'rgb(21, 107, 54)' }}>Fresh cooking</span>
                                    <span className="block text-[22px]" style={{ color: 'rgb(247, 0, 52)' }}>starts here.</span>
                                </h2>
                                <p className="font-arpona font-normal text-[13.5px] leading-[1.3] opacity-95" style={{ color: 'rgb(21, 107, 54)' }}>
                                    Grab is for people who want real food without spending hours in the kitchen every day.
                                </p>
                            </div>
                        </div>

                        {/* Mobile Blockquote (Below) */}
                        <div className="w-full px-2 mt-4">
                            <div className="pl-4 border-l-2 border-[rgb(247,0,52)]">
                                <p className="font-arpona font-medium text-[15.5px] leading-[1.4]" style={{ color: 'rgb(21, 107, 54)' }}>
                                    We believe convenience and freshness should finally belong together. And this is only the beginning.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Desktop View Section (Original Layout) */}
                    <div className="hidden md:flex w-full max-w-[1600px] mx-auto pl-4 pr-8 flex-row items-start gap-24">
                        {/* Portrait & Tilted Box on Left */}
                        <div className="w-[45%] flex flex-col items-center">
                            <div className="story-reveal-image relative w-full aspect-[430/480] max-w-[430px] rounded-[20px] overflow-hidden border-t-[10px] border-r-[10px] border-[rgb(247,0,52)]">
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
                                    <span className="relative z-30 font-arpona text-[18px] font-normal leading-tight" style={{ color: 'rgb(21, 107, 54)' }}>Every evening, millions<br />of Indian</span>
                                </div>
                            </div>
                        </div>

                        {/* Text Content on Right */}
                        <div className="w-[55%] flex flex-col items-start pt-8">
                            <h2 className="font-kura leading-[0.95] mb-8 uppercase">
                                <span className="block text-[60px]" style={{ color: 'rgb(21, 107, 54)' }}>Fresh cooking</span>
                                <span className="block text-[60px]" style={{ color: 'rgb(247, 0, 52)' }}>starts here.</span>
                            </h2>
                            <div className="flex flex-col gap-8">
                                <p className="font-arpona font-normal text-[18px] leading-[1.3]" style={{ color: 'rgb(21, 107, 54)' }}>
                                    Grab is for people who want real food without spending hours in the kitchen every day.
                                </p>
                                <div className="pl-8 border-l-[6px]" style={{ borderColor: 'rgb(247, 0, 52)' }}>
                                    <p className="font-arpona font-medium text-[20px] leading-[1.3]" style={{ color: 'rgb(21, 107, 54)' }}>
                                        We believe convenience and freshness should finally belong together. And this is only the beginning.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                )}
            </main>

            {/* Footer removed, now in layout.tsx */}
        </div>
    );
}

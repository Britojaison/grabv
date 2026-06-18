"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProductsListPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="flex flex-col min-h-screen w-full font-arpona overflow-x-hidden" style={{ backgroundColor: 'rgb(239, 239, 231)' }}>

            {/* Header removed, now in layout.tsx */}

            {/* Main Content */}
            <main className="w-full relative flex flex-col items-center" style={{ backgroundColor: 'rgb(239, 239, 231)' }}>



                {/* Explore Products Section */}
                <div className="w-full max-w-[1600px] mx-auto px-4 md:pl-4 md:pr-8 pt-24 md:pt-32 pb-8">
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


            {/* Footer removed, now in layout.tsx */}
        </div>
    );
}

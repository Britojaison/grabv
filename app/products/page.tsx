"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProductsListPage() {
    return (
        <div className="flex flex-col min-h-screen w-full font-arpona overflow-x-hidden" style={{ backgroundColor: 'rgb(239, 239, 231)' }}>

            {/* Header removed, now in layout.tsx */}

            {/* Main Content */}
            <main className="w-full relative flex flex-col items-center" style={{ backgroundColor: 'rgb(239, 239, 231)' }}>



                {/* Explore Products Section */}
                <div className="mx-auto w-full max-w-[100rem] px-4 pt-24 pb-8 sm:px-6 sm:pt-28 lg:px-10 lg:pt-32 xl:px-14 2xl:px-20">
                    <div className="w-full flex flex-col items-center mb-8 md:mb-20 px-4 text-center">
                        <h2 className="font-kura leading-none mb-8 md:mb-12 uppercase text-center">
                            <span className="text-[2rem] sm:text-[2.625rem] md:text-[3.125rem] lg:text-[4.0625rem] mr-2 md:mr-4 inline-block" style={{ color: 'rgb(21, 107, 54)' }}>OUR</span>
                            <span className="text-[2rem] sm:text-[2.625rem] md:text-[3.125rem] lg:text-[4.0625rem] inline-block" style={{ color: 'rgb(247, 0, 52)' }}>PRODUCTS</span>
                        </h2>

                        <div className="no-scrollbar flex w-full gap-4 overflow-x-auto px-4 pb-4 sm:gap-6 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3 lg:gap-8 xl:gap-10">
                            {[
                                { status: 'active', title: 'Onion Tomato Gravy', image: '/images/APGArtboard-1 (3).png' },
                                { status: 'coming_soon', title: 'Smoked Makhani Gravy', image: '/images/smoked makani.png' },
                                { status: 'coming_soon', title: 'Smoked Makhani Gravy', image: '/images/smoked makani.png' }
                            ].map((item, idx) => (
                                <div key={idx} className="group flex w-[11.875rem] shrink-0 flex-col items-center md:w-full">
                                    {/* Image Container */}
                                    <div className={`relative w-full aspect-[4/5] rounded-[1.25rem] overflow-hidden mb-5 bg-[#F5F5F5] ${item.status === 'active' ? 'cursor-pointer' : ''}`}>
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className={`object-cover transition-transform duration-500 ${
                                                item.status === 'coming_soon'
                                                    ? 'object-bottom scale-[1.45] group-hover:scale-[1.48] grayscale opacity-60'
                                                    : 'object-center scale-[1.36] -translate-y-[1rem] group-hover:scale-[1.38] md:object-bottom md:scale-[1.34] md:-translate-y-[1.75rem] md:group-hover:scale-[1.37]'
                                                }`}
                                        />
                                        {/* Coming Soon Badge */}
                                        {item.status === 'coming_soon' && (
                                            <div className="absolute inset-0 flex items-center justify-center p-4">
                                                <div className="bg-[rgb(247,0,52)] text-white px-3 md:px-6 py-1 md:py-2 rounded-[0.5rem] md:rounded-[0.625rem] text-[0.875rem] md:text-[1.125rem] font-arpona font-normal shadow-lg">
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
                                    <div className="px-2 md:px-6 py-1.5 md:py-2 rounded-[0.5rem] md:rounded-[0.625rem] mb-3 w-full md:w-auto" style={{ backgroundColor: 'rgb(228, 233, 223)' }}>
                                        <span className="text-[0.875rem] md:text-[1.25rem] font-arpona leading-snug text-center block" style={{ color: 'rgb(21, 106, 55)' }}>
                                            {item.title}
                                        </span>
                                    </div>

                                    {/* View Product Button */}
                                    <Link
                                        href="/all-purposegravy"
                                        className="group/btn relative flex h-[3.75rem] w-full max-w-[22.0625rem] items-center justify-center transition-all hover:scale-[1.02] md:h-[4.5rem]"
                                    >
                                        <div
                                            className="absolute top-[0.875rem] left-[0.3125rem] z-0 h-[calc(100%_-_1.75rem)] w-[calc(100%_-_0.625rem)] rounded-[0.5625rem] bg-[rgb(247,216,13)] md:left-[0.125rem] md:h-[3.75rem] md:w-[calc(100%_-_0.25rem)]"
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
                                        <span className="relative z-20 text-[1.25rem] md:text-[2rem] font-kura font-medium text-[rgb(247,0,52)] uppercase">
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

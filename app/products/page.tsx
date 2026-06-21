"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProductsListPage() {
  const [activeProductMobile, setActiveProductMobile] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    
    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = x / rect.width;
    const maxScroll = container.scrollWidth - rect.width;
    
    container.scrollLeft = percentage * maxScroll;
  };

  return (
    <div className="flex flex-col w-full font-arpona overflow-x-hidden" style={{ backgroundColor: 'rgb(239, 239, 231)' }}>
      {/* Main Content */}
      <main className="w-full relative flex flex-col items-center pb-0 xl:pb-[200px] 2xl:pb-[260px] -mb-24 md:-mb-32 xl:mb-0" style={{ backgroundColor: 'rgb(239, 239, 231)' }}>
        
        {/* Our Products Section */}
        <div className="relative w-full z-10 pb-0 mt-0 xl:mt-24">
          
          <section className="relative w-full flex flex-col items-center pt-[35vw] md:pt-[25vw] xl:pt-[11vw] 2xl:pt-[100px] pb-12 2xl:pb-24 z-10">
            {/* Huge Heading */}
            <div className="relative z-10 font-kura uppercase leading-[0.8] tracking-[-0.02em] text-center flex flex-col items-center w-full">
              
              {/* Tomato Image Behind Text */}
              <img src="/images/HomePage/tomato.png" className="absolute left-[8%] 2xl:left-[11%] top-[12%] 2xl:top-[15%] w-[19.5vw] 2xl:w-[290px] object-contain z-[-1] pointer-events-none -rotate-12" alt="" />

              {/* Shadow layer (Yellow) */}
              <div className="absolute inset-0 flex flex-col items-center z-0 pointer-events-none translate-y-[1.4vw] translate-x-[2.2vw] 2xl:translate-y-[10px] 2xl:translate-x-[16px]" style={{ color: '#F7D80C' }}>
                <div className="text-[18vw] 2xl:text-[260px]">OUR</div>
                <div className="text-[18vw] 2xl:text-[260px]">PRODUCTS</div>
              </div>

              {/* Fill layer (Green) */}
              <div className="relative z-10 flex flex-col items-center w-full" style={{ color: '#156B37' }}>
                <div className="relative w-full flex justify-center text-[18vw] 2xl:text-[260px]">
                  OUR
                </div>
                <div className="text-[18vw] 2xl:text-[260px]">
                  PRODUCTS
                </div>
              </div>
            </div>

          </section>

          {/* Our Products Horizontal Scrolling Wrapper */}
          <div className="relative w-full h-auto z-10 mt-[-60px] 2xl:mt-0 pb-12">
            <section className="relative w-full h-auto flex flex-col justify-start 2xl:justify-center overflow-hidden">
            
            {/* Horizontal Scrolling Track */}
            <div 
              ref={scrollRef}
              className="relative w-full z-30 overflow-x-auto overflow-y-hidden pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-default"
              onMouseMove={handleMouseMove}
              onScroll={(e) => {
                const scrollLeft = e.currentTarget.scrollLeft;
                const width = e.currentTarget.clientWidth;
                const index = Math.round(scrollLeft / width);
                setActiveProductMobile(index);
              }}
            >
              <div className="flex items-start 2xl:items-center gap-0 2xl:gap-[100px] pl-[5vw] 2xl:pl-[120px] pr-[5vw] 2xl:pr-[120px] pb-8 2xl:pb-0 w-max 2xl:w-[max-content]">
                
                {/* Product 1 */}
                <div className="relative inline-block flex-shrink-0 flex flex-col items-center 2xl:items-end w-auto">
                  <div className="relative w-[100vw] 2xl:w-auto">
                    <img src="/images/HomePage/product1.png" className="w-[100vw] 2xl:w-auto h-auto 2xl:h-[950px] object-contain block drop-shadow-2xl pointer-events-none" draggable={false} alt="Product 1" />
                    
                    <div className="absolute top-[34%] left-[64%] w-[36%] flex flex-col items-start text-black font-arpona">
                      <h3 className="text-[3.9vw] 2xl:text-[50px] leading-[1.0] tracking-[-0.05em] font-bold">
                        ONION<br/>TOMATO<br/>GRAVY
                      </h3>
                      
                      <div className="mt-[1vw] 2xl:mt-7 flex flex-col gap-0 2xl:gap-1 text-[2vw] 2xl:text-[24px] font-medium tracking-tight">
                        <p>Zero Added Preservatives</p>
                        <p>All Purpose Gravy</p>
                        <p>Slow Cooked</p>
                      </div>
                      
                      <Link href="/all-purposegravy" className="mt-[2vw] 2xl:mt-14 2xl:ml-6 bg-[rgb(247,216,13)] text-black px-[2.2vw] 2xl:px-5 py-[0.5vw] 2xl:py-1.5 rounded-[0.8vw] 2xl:rounded-[6px] font-medium text-[2.2vw] 2xl:text-[16px] hover:bg-yellow-400 transition-colors flex items-center justify-center gap-[1vw] 2xl:gap-1.5 shadow-sm whitespace-nowrap inline-flex w-fit">
                        View Product
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[2vw] h-[2vw] 2xl:w-4 2xl:h-4 ml-[0.5vw] 2xl:ml-1">
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Product 2 */}
                <div className="relative inline-block flex-shrink-0 flex flex-col items-center 2xl:items-end w-auto group">
                  <div className="relative w-[100vw] 2xl:w-auto">
                    <img src="/images/HomePage/product2.png" className="w-[100vw] 2xl:w-auto h-auto 2xl:h-[950px] object-contain block drop-shadow-2xl grayscale-[0.8] opacity-80 pointer-events-none" draggable={false} alt="Product 2" />
                    
                    {/* Coming Soon Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                      <div className="bg-black/40 backdrop-blur-md px-[6vw] md:px-[4vw] lg:px-[3vw] 2xl:px-12 py-[2vw] md:py-[1.5vw] lg:py-[1vw] 2xl:py-4 rounded-full border border-white/20 shadow-xl">
                        <p className="text-white font-arpona font-medium text-[3.3vw] md:text-[2.2vw] lg:text-[1.8vw] 2xl:text-[22px] uppercase tracking-[0.25em] text-center">
                          Coming Soon
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Mobile Shared Fixed Indicators & Button */}
            <div className="flex flex-col items-center mt-[-5vw] md:mt-[-3vw] pb-4 2xl:hidden w-full relative z-40">
              <div className="flex justify-center gap-[2vw] md:gap-[1.5vw] mb-[4vw] md:mb-[2.5vw]">
                <div className={`w-[5vw] md:w-[3vw] lg:w-[2.5vw] h-[1.5vw] md:h-[0.8vw] lg:h-[0.6vw] rounded-full transition-colors ${activeProductMobile === 0 ? 'bg-[rgb(247,216,13)]' : 'bg-gray-300'}`} />
                <div className={`w-[5vw] md:w-[3vw] lg:w-[2.5vw] h-[1.5vw] md:h-[0.8vw] lg:h-[0.6vw] rounded-full transition-colors ${activeProductMobile === 1 ? 'bg-[rgb(247,216,13)]' : 'bg-gray-300'}`} />
              </div>
              <Link href="/all-purposegravy" className={`bg-[rgb(247,216,13)] inline-block text-black px-[6vw] md:px-[4vw] lg:px-[3vw] py-[1.5vw] md:py-[1vw] lg:py-[0.8vw] rounded-[1.5vw] md:rounded-[1vw] lg:rounded-[0.8vw] font-bold text-[3.3vw] md:text-[2.2vw] lg:text-[1.8vw] shadow-sm tracking-tight font-arpona transition-opacity ${activeProductMobile === 1 ? 'opacity-50 pointer-events-none' : ''}`}>
                See more
              </Link>
            </div>

          </section>
        </div>
      </div>
      </main>
    </div>
  );
}

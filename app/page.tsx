"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen w-full font-bomstad overflow-x-hidden" style={{ backgroundColor: 'rgb(239, 238, 230)' }}>

      {/* Navbar Section (H: 80px) */}
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
                <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="0" y1="2" x2="24" y2="2" stroke="white" strokeWidth="2.5" />
                  <line x1="0" y1="8" x2="24" y2="8" stroke="white" strokeWidth="2.5" />
                  <line x1="0" y1="14" x2="24" y2="14" stroke="white" strokeWidth="2.5" />
                </svg>
              </button>
            </div>

            {/* Logo */}
            <div className="flex items-center">
              <Image
                src="/images/logo.svg"
                alt="GrabV Logo"
                width={110}
                height={40}
                className="w-auto h-8 md:h-12"
                priority
              />
            </div>
          </div>

          {/* Desktop Nav - Hidden on Mobile */}
          <nav className="hidden md:flex items-center gap-12 text-white font-medium">
            <Link href="/" className="hover:text-[rgb(247,216,13)] transition-colors text-[18px]">Home</Link>
            <Link href="#" className="hover:text-[rgb(247,216,13)] transition-colors text-[18px]">Recipes</Link>
            <Link href="/products" className="hover:text-[rgb(247,216,13)] transition-colors text-[18px]">Products</Link>
            <Link href="/ourstory" className="hover:text-[rgb(247,216,13)] transition-colors text-[18px] whitespace-nowrap">Our Story</Link>
            <Link href="#" className="hover:text-[rgb(247,216,13)] transition-colors text-[18px] whitespace-nowrap">Contact Us</Link>
            <Link href="#" className="hover:text-[rgb(247,216,13)] transition-colors text-[18px]">FAQ</Link>
          </nav>

          <button
            style={{
              borderRadius: '5px',
              backgroundColor: 'rgb(247, 216, 13)',
              color: 'rgb(12, 61, 27)',
              letterSpacing: '0.05em'
            }}
            className="font-bomstad font-medium flex items-center justify-center hover:bg-yellow-400 transition-colors shrink-0 text-[12px] md:text-[18px] w-[85px] md:w-[142px] h-[30px] md:h-[37px]"
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

      {/* Main Container - Full Width */}
      <main className="w-full relative flex flex-col">

        {/* Full-width Background Panel */}
        <div className="absolute left-0 top-0 w-full h-[380px] md:h-[800px] z-0 flex-shrink-0">
          {/* Mobile Background */}
          <div className="md:hidden absolute inset-0">
            <Image
              src="/images/green mobile 1.svg"
              alt="Hero Background Mobile"
              fill
              className="object-cover object-top"
              priority
            />
          </div>
          {/* Desktop Background */}
          <div className="hidden md:block absolute inset-0">
            <Image
              src="/images/bg green.svg"
              alt="Hero Background Desktop"
              fill
              className="object-cover object-bottom"
              priority
            />
          </div>
        </div>

        {/* Content Wrapper constrained to 1440px with correct z-index */}
        <div className="relative w-full max-w-[1440px] mx-auto px-4 md:px-8 h-auto min-h-[380px] md:h-[800px] shrink-0 z-30 flex">

          {/* Left Text Content - In normal flow so alignment strictly matches navbar */}
          <div className="w-full lg:w-[60%] pt-10 md:pt-[70px] z-20 flex flex-col items-start">
            {/* Fresh & Flavorful Pill with Custom Border */}
            <div className="relative mb-6 md:mb-8 inline-block w-fit">
              {/* Yellow Pill Background */}
              <div
                style={{ backgroundColor: 'rgb(247, 216, 13)' }}
                className="w-fit px-4 md:px-8 h-[40px] md:h-[60px] rounded-full flex items-center justify-center gap-2 md:gap-3 relative z-10 shadow-md"
              >
                <div className="relative w-[18px] h-[18px] md:w-[27px] md:h-[27px] shrink-0" style={{ filter: 'brightness(0) invert(34%) sepia(35%) saturate(1048%) hue-rotate(97deg) brightness(93%) contrast(92%)' }}>
                  <Image
                    src="/images/leaf.svg"
                    alt="Leaf"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="font-bomstad font-medium tracking-wide whitespace-nowrap text-[18px] md:text-[27px]" style={{ color: 'rgb(21, 107, 54)' }}>
                  Fresh & Flavorful
                </span>
              </div>

              {/* Border SVG on Top - forced to stretch via object-fill */}
              <div className="absolute -inset-x-4 md:-inset-x-6 -inset-y-1 md:-inset-y-2 z-20 pointer-events-none">
                <Image
                  src="/images/border2.svg"
                  alt="Pill Border"
                  fill
                  className="object-fill"
                />
              </div>
            </div>

            {/* Main Heading */}
            <div className="mb-3 md:mb-6">
              <h1 className="font-kura leading-[0.9] text-brand-yellow m-0 p-0 uppercase text-[40px] md:text-[100px]">
                ONE GRAVY
              </h1>
              <h1 className="font-kura leading-[1.1] text-white m-0 p-0 uppercase text-[24px] md:text-[60px]">
                Endless Possibilities
              </h1>
            </div>

            {/* Description */}
            <p className="text-white max-w-[220px] md:max-w-2xl leading-[1.2] mb-6 md:mb-10 font-bomstad font-normal text-[14px] md:text-[25px]">
              A slow-cooked, preservative-free<br />
              onion-tomato base made with love<br />
              — dinner is ready in 10 minutes.
            </p>

            {/* CTA Buttons - Single button as per request */}
            <div className="flex flex-wrap lg:flex-nowrap items-center gap-4">
              <Link
                href="/products"
                className="bg-[rgb(17,82,40)] border border-transparent text-white rounded-full px-6 md:px-10 py-2.5 md:py-3.5 text-[18px] md:text-[25px] font-bomstad font-normal hover:bg-brand-yellow hover:text-[rgb(17,82,40)] transition-all shadow-sm whitespace-nowrap"
              >
                Explore Our Products
              </Link>
            </div>
          </div>

          {/* Mobile Gravy Pouring Image - Positioned to attach to the top/navbar area */}
          <div className="md:hidden absolute right-[-40px] top-[-30px] w-[300px] h-[600px] z-40 pointer-events-none">
            <div className="relative w-full h-full">
              <Image
                src="/images/Gravy pouring.svg"
                alt="Gravy Flow"
                fill
                className="object-contain object-top-right"
                priority
              />
            </div>
          </div>
        </div>

        {/* Spices Overlay behind the gravy pot - scaled down and kept within green area */}
        <div
          className="absolute pointer-events-none hidden lg:block z-20 overflow-hidden"
          style={{ width: '784px', height: '603px', top: '50px', right: '50px' }}
        >
          <Image
            src="/images/spices.svg"
            alt="Spices background"
            fill
            className="object-contain object-right"
            priority
          />
        </div>


        <div
          className="absolute right-0 pointer-events-none hidden md:block z-[50]"
          style={{ width: '720px', height: '1368px', top: '-40px' }}
        >
          <Image
            src="/images/Gravy pouring.svg"
            alt="Gravy Flow"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Features Bottom Bar - positioned in the beige section below the green hero */}
        <div className="w-full relative pt-4 md:pt-12 pb-12 md:pb-24 z-10">
          <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 relative z-[30]">

            {/* Features Horizontal Scroll - Mobile Only */}
            <div className="md:hidden overflow-hidden relative w-full mb-8">
              <div className="animate-marquee flex w-max gap-12 py-2">
                {[...Array(4)].map((_, i) => (
                  <React.Fragment key={i}>
                    {[
                      { img: 'timer2.svg', text: 'Ready in 10 min' },
                      { img: 'slow.svg', text: 'Slow cooked' },
                      { img: 'fssai icon.svg', text: 'FSSAI Certified' },
                      { img: 'tick2.svg', text: 'Zero Preservatives' },
                      { img: 'cold.svg', text: 'Cold Chain Packed' }
                    ].map((item, idx) => (
                      <div key={`${i}-${idx}`} className="flex items-center gap-2 shrink-0">
                        <div className="w-[20px] h-[20px] relative">
                          <Image src={`/images/${item.img}`} alt={item.text} fill className="object-contain" />
                        </div>
                        <span className="text-[rgb(21,107,54)] font-normal text-[18px] font-bomstad whitespace-nowrap">{item.text}</span>
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Features Rows of Pills - Desktop Staggered Layout */}
            <div className="hidden md:flex flex-col gap-5 items-start lg:w-[75%]">
              {/* Row 1 */}
              <div className="flex flex-wrap items-center gap-5">
                <div
                  style={{ backgroundColor: 'rgb(247, 216, 13)' }}
                  className="rounded-full px-7 py-3 flex items-center gap-3 shadow-sm"
                >
                  <div className="w-[30px] h-[30px] relative">
                    <Image src="/images/timer2.svg" alt="Ready in 10 min" fill className="object-contain" />
                  </div>
                  <span className="text-[rgb(21,107,54)] font-normal text-[25px] font-bomstad whitespace-nowrap">Ready in 10 min</span>
                </div>
                <div
                  style={{ backgroundColor: 'rgb(247, 216, 13)' }}
                  className="rounded-full px-7 py-3 flex items-center gap-3 shadow-sm"
                >
                  <div className="w-[30px] h-[30px] relative">
                    <Image src="/images/slow.svg" alt="Slow cooked" fill className="object-contain" />
                  </div>
                  <span className="text-[rgb(21,107,54)] font-normal text-[25px] font-bomstad whitespace-nowrap">Slow cooked</span>
                </div>
                <div
                  style={{ backgroundColor: 'rgb(247, 216, 13)' }}
                  className="rounded-full px-7 py-3 flex items-center gap-3 shadow-sm"
                >
                  <div className="w-[30px] h-[30px] relative">
                    <Image src="/images/fssai icon.svg" alt="FSSAI Certified" fill className="object-contain" />
                  </div>
                  <span className="text-[rgb(21,107,54)] font-normal text-[25px] font-bomstad whitespace-nowrap">FSSAI Certified</span>
                </div>
              </div>
              {/* Row 2 */}
              <div className="flex flex-wrap items-center gap-5 ml-20">
                <div
                  style={{ backgroundColor: 'rgb(247, 216, 13)' }}
                  className="rounded-full px-7 py-3 flex items-center gap-3 shadow-sm"
                >
                  <div className="w-[30px] h-[30px] relative">
                    <Image src="/images/tick2.svg" alt="Zero Preservatives" fill className="object-contain" />
                  </div>
                  <span className="text-[rgb(21,107,54)] font-normal text-[25px] font-bomstad whitespace-nowrap">Zero Preservatives</span>
                </div>
                <div
                  style={{ backgroundColor: 'rgb(247, 216, 13)' }}
                  className="rounded-full px-7 py-3 flex items-center gap-3 shadow-sm"
                >
                  <div className="w-[30px] h-[30px] relative">
                    <Image src="/images/cold.svg" alt="Cold Chain Packed" fill className="object-contain" />
                  </div>
                  <span className="text-[rgb(21,107,54)] font-normal text-[25px] font-bomstad whitespace-nowrap">Cold Chain Packed</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* What is GrabV Section */}
        <section
          className="w-screen relative left-1/2 -translate-x-1/2 pt-0 pb-0 flex flex-col items-center overflow-visible -mt-20 md:mt-0 min-h-[400px] md:min-h-[600px]"
        >
          {/* Mobile Background */}
          <div className="md:hidden absolute inset-0 z-0">
            <Image
              src="/images/yellow mobile 2.svg"
              alt="Yellow Background Mobile"
              fill
              className="object-cover object-top"
              priority
            />
          </div>
          {/* Desktop Background */}
          <div className="hidden md:block absolute inset-0 z-0">
            <Image
              src="/images/bg yellow.svg"
              alt="Yellow Background Desktop"
              fill
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Content Wrapper */}
          <div className="relative w-full max-w-[1440px] mx-auto px-4 md:px-8 z-[40] flex flex-col lg:flex-row items-center pt-12 md:pt-0">

            {/* Left Content */}
            <div className="w-full lg:w-[40%] flex flex-col items-center lg:items-start pt-2 md:pt-0 text-center lg:text-left">
              {/* Question Pill with Border Settings */}
              <div className="relative mb-6 md:mb-4 inline-block w-fit">
                {/* Red Pill Background */}
                <div
                  style={{ backgroundColor: 'rgb(247, 0, 52)' }}
                  className="px-6 md:px-10 py-2 md:py-3.5 rounded-full relative z-10 shadow-md"
                >
                  <span className="text-white font-normal text-[20px] md:text-[28px] whitespace-nowrap font-bomstad tracking-wider">
                    What Is GrabV
                  </span>
                </div>

                {/* Border Setting - Tight fit to tag */}
                <div className="absolute -inset-x-1 -inset-y-0.5 z-20 pointer-events-none">
                  <Image
                    src="/images/border3.svg"
                    alt="Pill Border"
                    fill
                    className="object-fill"
                  />
                </div>
              </div>

              {/* Secret Heading */}
              {/* Mobile Heading (1 Line) */}
              <div className="md:hidden mb-6 w-full flex flex-col items-center text-center">
                <h2 className="font-kura leading-[1.0] text-[20px] sm:text-[24px] m-0 p-0 uppercase whitespace-nowrap">
                  <span style={{ color: 'rgb(247, 0, 52)' }}>Your Secret to </span>
                  <span style={{ color: 'rgb(21, 107, 54)' }}>Effortless </span>
                  <span style={{ color: 'rgb(247, 0, 52)' }}>Cooking</span>
                </h2>
              </div>
              {/* Desktop Heading (2 Lines) */}
              <div className="hidden md:flex flex-col items-start mb-6 w-full text-left">
                <h2 className="font-kura leading-[0.9] text-[75px] m-0 p-0 uppercase" style={{ color: 'rgb(247, 0, 52)' }}>
                  Your Secret to
                </h2>
                <h2 className="font-kura leading-[1.0] text-[75px] m-0 p-0 uppercase whitespace-nowrap">
                  <span style={{ color: 'rgb(21, 107, 54)'/* Green */ }}>Effortless </span>
                  <span style={{ color: 'rgb(247, 0, 52)'/* Red */ }}>Cooking</span>
                </h2>
              </div>

              {/* Description text */}
              {/* Mobile Description */}
              <p className="md:hidden max-w-2xl leading-[1.3] mb-0 md:mb-12 font-normal font-bomstad text-[16px] text-center" style={{ color: 'rgb(21, 107, 54)' }}>
                A slow-cooked, preservative-free onion-tomato base<br />
                made with love – dinner is ready in 10 minutes.
              </p>
              {/* Desktop Description */}
              <p className="hidden md:block max-w-xl leading-[1.3] mb-12 font-normal font-bomstad text-[25px] text-left" style={{ color: 'rgb(21, 107, 54)' }}>
                A slow-cooked, preservative-free<br />
                onion-tomato base made with love – dinner<br />
                is ready in 5 minutes.
              </p>

              {/* Desktop Learn More Button */}
              <button
                style={{ backgroundColor: 'rgb(21, 107, 54)' }}
                className="hidden md:flex group items-center gap-6 px-10 py-5 rounded-full text-white text-[25px] font-normal font-bomstad hover:bg-black transition-all shadow-lg"
              >
                Learn More
                <Image src="/images/arrow.svg" alt="Arrow" width={32} height={32} className="object-contain" />
              </button>


            </div>

            {/* Right Content - Product Image */}
            <div className="w-full lg:w-[60%] flex justify-center lg:justify-end relative h-[320px] md:h-[800px] mt-4 md:mt-0 lg:translate-y-10 lg:translate-x-40">
              <div className="relative w-full h-full max-w-[500px] md:max-w-[900px]">
                <Image
                  src="/images/product 1.svg"
                  alt="Product Showcase"
                  fill
                  className="object-contain object-top lg:object-right"
                  priority
                />
              </div>
            </div>

          </div>
        </section>

        {/* Pouch To Plate Section */}
        <section className="w-full pt-16 md:pt-28 pb-20 md:pb-24 flex flex-col items-center" style={{ backgroundColor: 'rgb(239, 238, 230)' }}>
          <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8">

            <div className="flex flex-col mb-10 relative">
              {/* Mobile Layout (Hidden on Desktop) */}
              <div className="md:hidden flex flex-col w-full mb-4 -mt-10">
                <div className="flex justify-between items-center w-full gap-3">
                  <div className="flex-[1.2] flex flex-col text-left">
                    <h2 className="font-kura leading-[1.0] text-[23px] uppercase whitespace-nowrap">
                      <span style={{ color: 'rgb(247, 0, 52)' }}>POUCH TO PLATE </span><br />
                      <span style={{ color: 'rgb(21, 107, 54)' }}>IN 5 STEPS</span>
                    </h2>
                    <p className="font-bomstad font-normal text-[13px] leading-[1.2] mt-2" style={{ color: 'rgb(21, 107, 54)' }}>
                      No Chopping. No Prep.<br />No Recipe Needed
                    </p>
                  </div>

                  <div className="flex-[1.2] flex flex-col gap-1.5">
                    <div className="relative w-full h-[150px]">
                      <Image
                        src="/images/cook2.svg"
                        alt="GrabV Ingredients showcase"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div
                      style={{ backgroundColor: 'rgb(247, 216, 13)' }}
                      className="w-full rounded-[8px] p-1.5 px-2 grid grid-cols-2 gap-x-1 gap-y-1.5 shadow-sm border border-[rgb(21,107,54)]/10"
                    >
                      <div className="flex flex-col border-r border-[rgb(21,107,54)]/20 pr-1">
                        <span className="font-bold text-[12px] leading-tight" style={{ color: 'rgb(16, 107, 54)' }}>10 Min</span>
                        <span className="text-[8px] font-bold" style={{ color: 'rgb(16, 107, 54)' }}>cooking time</span>
                      </div>
                      <div className="flex flex-col pl-1">
                        <span className="font-bold text-[12px] leading-tight" style={{ color: 'rgb(16, 107, 54)' }}>Zero%</span>
                        <span className="text-[8px] font-bold" style={{ color: 'rgb(16, 107, 54)' }}>Preservatives</span>
                      </div>
                      <div className="flex flex-col border-t border-r border-[rgb(21,107,54)]/20 pt-1.5 pr-1">
                        <span className="font-bold text-[12px] leading-tight" style={{ color: 'rgb(16, 107, 54)' }}>20+ Recipes</span>
                        <span className="text-[8px] font-bold" style={{ color: 'rgb(16, 107, 54)' }}>Dishes possible</span>
                      </div>
                      <div className="flex flex-col border-t border-[rgb(21,107,54)]/20 pt-1.5 pl-1">
                        <span className="font-bold text-[12px] leading-tight" style={{ color: 'rgb(16, 107, 54)' }}>750 G</span>
                        <span className="text-[8px] font-bold" style={{ color: 'rgb(16, 107, 54)' }}>Per pouch</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop Layout (Hidden on Mobile) */}
              <div className="hidden md:flex flex-col items-center text-center w-full">
                <div className="relative z-20">
                  <h2 className="font-kura leading-[1.0] text-[46px] sm:text-[56px] lg:text-[85px] m-0 p-0 uppercase">
                    <span style={{ color: 'rgb(247, 0, 52)' }}>Pouch To Plate </span>
                    <span style={{ color: 'rgb(21, 107, 54)' }}>In 5 Steps</span>
                  </h2>
                  <p className="font-bomstad font-normal text-[17px] sm:text-[20px] lg:text-[25px] leading-[1.2] mt-4" style={{ color: 'rgb(21, 107, 54)' }}>
                    No Chopping. No Prep. No Recipe Needed
                  </p>
                </div>

                <div className="flex flex-col items-center -mt-32 w-full">
                  <div className="relative w-[450px] h-[550px] sm:w-[600px] sm:h-[650px] z-10 shrink-0">
                    <Image
                      src="/images/cook2.svg"
                      alt="GrabV Ingredients showcase"
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div
                    style={{ backgroundColor: 'rgb(247, 216, 13)' }}
                    className="w-full max-w-[950px] min-h-[54px] rounded-[10px] flex flex-wrap sm:flex-nowrap items-center px-6 py-4 shadow-sm -mt-1"
                  >
                    <div className="flex-1 flex items-center justify-center gap-4 px-4 shrink-0">
                      <Image src="/images/clock.svg" alt="" width={36} height={36} className="shrink-0" />
                      <div className="flex flex-col text-left shrink-0">
                        <span className="font-bold text-[24px] leading-tight whitespace-nowrap" style={{ color: 'rgb(16, 107, 54)' }}>10 Min</span>
                        <span className="text-[12px] font-bold whitespace-nowrap" style={{ color: 'rgb(16, 107, 54)', letterSpacing: '0.05em' }}>cooking time</span>
                      </div>
                    </div>
                    <div className="hidden sm:block w-[1px] h-10 bg-[rgb(16,107,54)]/30" />

                    <div className="flex-1 flex flex-col items-center justify-center text-center px-4 shrink-0">
                      <span className="font-bold text-[24px] leading-tight whitespace-nowrap" style={{ color: 'rgb(16, 107, 54)' }}>Zero %</span>
                      <span className="text-[12px] font-bold whitespace-nowrap" style={{ color: 'rgb(16, 107, 54)', letterSpacing: '0.05em' }}>Preservatives</span>
                    </div>
                    <div className="hidden sm:block w-[1px] h-10 bg-[rgb(16,107,54)]/30" />

                    <div className="flex-1 flex flex-col items-center justify-center text-center px-4 shrink-0">
                      <span className="font-bold text-[24px] leading-tight whitespace-nowrap" style={{ color: 'rgb(16, 107, 54)' }}>20+</span>
                      <span className="text-[12px] font-bold whitespace-nowrap" style={{ color: 'rgb(16, 107, 54)', letterSpacing: '0.05em' }}>Dishes possible</span>
                    </div>
                    <div className="hidden sm:block w-[1px] h-10 bg-[rgb(16,107,54)]/30" />

                    <div className="flex-1 flex flex-col items-center justify-center text-center px-4 shrink-0">
                      <span className="font-bold text-[24px] leading-tight whitespace-nowrap" style={{ color: 'rgb(16, 107, 54)' }}>750 G</span>
                      <span className="text-[12px] font-bold whitespace-nowrap" style={{ color: 'rgb(16, 107, 54)', letterSpacing: '0.05em' }}>Per pouch</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex overflow-x-auto md:overflow-visible no-scrollbar md:grid w-full max-w-[1284px] mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-x-8 md:gap-y-20 mt-2 md:mt-20 mb-20 px-2 md:px-0 pt-7 md:pt-0">
              {[
                { step: 1, text: "Add your tempering\n(tadka) in oil.", rotate: "-rotate-6" },
                { step: 2, text: "Sauté veggies or\nprotein of your choice.", rotate: "rotate-6" },
                { step: 3, text: "Pour GrabV &\nadjust consistency", rotate: "-rotate-6" },
                { step: 4, text: "Sprinkle spices\n& salt to taste.", rotate: "rotate-6" },
                { step: 5, text: "Cook for 10 mins\nand enjoy!", rotate: "-rotate-6" }
              ].map((item) => (
                <div key={item.step} className="flex flex-col items-center shrink-0 w-[47%] md:w-full">
                  <div className="relative group w-full">
                    <div className="absolute -top-[15px] md:-top-[34px] left-1/2 -translate-x-1/2 w-[85px] md:w-[124px] h-[30px] md:h-[42px] z-20">
                      <div className={`absolute inset-0 rounded-full bg-[rgb(247,216,13)] border-[1.5px] md:border-[3px] border-[rgb(247,0,52)] flex items-center justify-center shadow-sm md:hidden ${item.rotate}`}>
                        <span className="font-kura text-[14px] text-[rgb(247,0,52)]">Step {item.step}</span>
                      </div>

                      {/* Desktop Tag (Tilted) */}
                      <div className="hidden md:block absolute inset-0 w-full h-full">
                        <div className="absolute inset-0 rounded-full" style={{ backgroundColor: 'rgb(247, 216, 13)' }} />
                        <div className={`absolute inset-0 rounded-full border-[3px] border-[#f70034] flex items-center justify-center shadow-sm ${item.rotate}`}>
                          <span className="font-kura text-[21px] leading-none text-[#f70034]">Step {item.step}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-[15px] md:rounded-[10px] p-1.5 pt-6 md:pt-[30px] shadow-sm border-[1.5px] border-[rgb(247,216,13)] flex flex-col items-center text-center w-full h-[230px] md:h-[350px]">
                      <div className="relative w-full h-[110px] md:h-[200px] mb-5 md:mb-6 rounded-[10px] overflow-hidden">
                        <Image
                          src={`/images/step ${item.step}.webp`}
                          alt={`Step ${item.step}`}
                          fill
                          sizes="(max-width: 640px) 160px, 20vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <p className="font-bomstad font-normal text-[15px] md:text-[18px] leading-[1.2] md:leading-[22px] whitespace-pre-line px-2 text-center" style={{ color: 'rgb(21, 107, 54)' }}>
                        {item.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Ingredients & Purity Section - Tighter height to fit viewport */}
        <section className="w-full relative pt-0 pb-2 md:py-20 flex flex-col items-center overflow-visible min-h-0 md:min-h-[850px] justify-center" style={{ backgroundColor: 'rgb(239, 239, 231)' }}>
          {/* Full-width Yellow Background with torn edges */}
          <div className="absolute inset-x-0 -top-32 bottom-0 z-0 overflow-hidden">
            {/* Mobile Background */}
            <div className="md:hidden absolute inset-0">
              <Image
                src="/images/yellow mobile 3.svg"
                alt="Yellow Background Mobile"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
            {/* Desktop Background */}
            <div className="hidden md:block absolute inset-0">
              <Image
                src="/images/bg yellow.svg"
                alt="Yellow Background Desktop"
                fill
                className="object-cover object-top -scale-y-100"
                priority
              />
            </div>
          </div>

          {/* Content Wrapper */}
          <div className="relative w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[80px] z-10 flex flex-col items-start pb-0">

            {/* Mobile Layout (Hidden on Desktop) */}
            <div className="md:hidden flex flex-col items-center w-full text-center -mt-8">
              {/* Ingredients Pill */}
              <div className="relative w-[210px] h-[42px] mb-6">
                <div
                  className="absolute inset-0 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgb(247, 0, 52)' }}
                >
                  <span className="text-white font-bomstad font-bold text-[14px] uppercase tracking-wide">
                    Ingredients & Purity
                  </span>
                </div>
                <div className="absolute inset-0 -rotate-[4deg] scale-105">
                  <Image
                    src="/images/corner rectangle.svg"
                    alt=""
                    fill
                    className="pointer-events-none object-contain"
                  />
                </div>
              </div>

              {/* Heading */}
              <h2 className="font-kura leading-[1.0] text-[21px] uppercase mb-4 whitespace-nowrap">
                <span style={{ color: 'rgb(247, 0, 52)' }}>FRESH FOOD </span>
                <span style={{ color: 'rgb(21, 107, 54)' }}>NOTHING HIDDEN</span>
              </h2>

              {/* Subtitle */}
              <p className="font-bomstad font-normal text-[15px] leading-[1.4] mb-8 px-2" style={{ color: 'rgb(21, 107, 54)' }}>
                Every Ingredient printed. Every batch tested.<br />
                You deserve to know what you&apos;re feeding your family.
              </p>

              {/* Showcase Image Container */}
              <div className="w-full relative h-[250px] mb-8">
                <Image
                  src="/images/home ingredients .svg"
                  alt="GrabV Fresh Ingredients"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Ingredients Horizontal Scroll for Mobile */}
              <div className="flex overflow-x-auto no-scrollbar gap-6 w-full pb-2 px-4">
                {[
                  { img: 'onion.svg', title: 'Fresh Onions', desc: 'Slow-fried to golden' },
                  { img: 'cumin.svg', title: 'Whole Cumin', desc: 'Bloom-roasted' },
                  { img: 'tomatoes.svg', title: 'Ripe Tomato', desc: 'Naturally cooked' },
                  { img: 'bayleaf.svg', title: 'Bay Leaf', desc: 'Traditional tempering' },
                  { img: 'garlic.svg', title: 'Fresh Garlic', desc: 'Paste made daily' },
                  { img: 'oil.svg', title: 'Sunflower Oil', desc: 'Cold-Pressed' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-left shrink-0">
                    <div className="w-[80px] h-[80px] flex-shrink-0 flex items-center justify-center">
                      <div className="relative w-full h-full">
                        <Image
                          src={`/images/${item.img}`}
                          alt={item.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col leading-tight min-w-[110px]">
                      <h4 className="font-bomstad font-bold text-[16px]" style={{ color: 'rgb(21, 107, 54)' }}>
                        {item.title}
                      </h4>
                      <p className="font-bomstad font-normal text-[12px]" style={{ color: 'rgb(12, 61, 27)' }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Layout (Hidden on Mobile) */}
            <div className="hidden md:flex flex-col w-full">
              {/* Top Row: Headings and Showcase Image */}
              <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-8 mb-8 -mt-6">
                <div className="flex flex-col items-start w-full lg:w-[50%]">
                  {/* Ingredients Pill */}
                  <div className="relative w-[325px] h-[60px] mb-6 opacity-100">
                    <div
                      className="absolute inset-0 w-[325px] h-[60px] rounded-[100px] flex items-center justify-center"
                      style={{ backgroundColor: 'rgb(247, 0, 52)' }}
                    >
                      <span className="text-white font-bold text-[23px] font-bomstad tracking-wider">
                        Ingredients & Purity
                      </span>
                    </div>
                    <div className="absolute inset-0 -rotate-[2.01deg]">
                      <Image
                        src="/images/corner rectangle.svg"
                        alt=""
                        fill
                        className="pointer-events-none object-contain"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <h2 className="font-kura leading-[1.0] text-[55px] lg:text-[65px] m-0 p-0 uppercase" style={{ color: 'rgb(247, 0, 52)' }}>
                      Fresh Food
                    </h2>
                    <h2 className="font-kura leading-[1.0] text-[55px] lg:text-[65px] m-0 p-0 uppercase whitespace-nowrap" style={{ color: 'rgb(21, 107, 54)' }}>
                      Nothing Hidden
                    </h2>
                  </div>

                  {/* Subtitle */}
                  <p className="max-w-2xl font-bomstad font-normal leading-[1.4] text-[18px]" style={{ color: 'rgb(21, 107, 54)' }}>
                    Every ingredient printed. Every batch tested.<br />
                    You deserve to know what you&apos;re feeding your family.
                  </p>
                </div>

                <div className="w-full lg:w-[563px] lg:h-[332px] relative -mt-4 shrink-0 lg:mr-12">
                  <Image
                    src="/images/home ingredients .svg"
                    alt="Home Ingredients"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Ingredients Grid - Tightened spacing */}
              <div className="w-full lg:w-[1146px] lg:h-[402px] rounded-[10px] grid grid-cols-1 lg:grid-cols-2 gap-x-[120px] gap-y-8 mt-2">
                {[
                  { img: 'onion.svg', title: 'Fresh Onions', desc: 'Slow-fried to golden' },
                  { img: 'cumin.svg', title: 'Whole Cumin & Coriander', desc: 'Bloom-roasted for full aroma' },
                  { img: 'tomatoes.svg', title: 'Ripe Tomatoes', desc: 'Naturally cooked down' },
                  { img: 'bayleaf.svg', title: 'Bay Leaf & Green Cardamom', desc: 'Traditional tempering' },
                  { img: 'garlic.svg', title: 'Fresh Ginger & Garlic', desc: 'Paste made daily, not dried powder' },
                  { img: 'oil.svg', title: 'Cold-Pressed Sunflower Oil', desc: 'Unrefined, no trans fats' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-8">
                    <div className="w-[117px] h-[119px] flex-shrink-0 flex items-center justify-center">
                      <div className="relative w-full h-full">
                        <Image
                          src={`/images/${item.img}`}
                          alt={item.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    {/* Ingredient Text */}
                    <div className="flex flex-col gap-1">
                      <h4 className="font-bomstad font-bold text-[26px] leading-[1.1] whitespace-nowrap" style={{ color: 'rgb(21, 107, 54)' }}>
                        {item.title}
                      </h4>
                      <p className="font-bomstad font-normal text-[16px] leading-[1.2]" style={{ color: 'rgb(12, 61, 27)' }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>


          </div>
        </section>

        {/* Our Quality Promise Section */}
        <section className="w-full relative pt-4 md:pt-12 pb-8 md:pb-12 flex flex-col items-center overflow-hidden" style={{ backgroundColor: 'rgb(239, 238, 230)' }}>
          <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 flex flex-col items-center relative z-10 pt-0 pb-12">

            {/* Title - Hidden on Mobile */}
            <h2 className="hidden md:block font-kura font-normal text-[85px] m-0 p-0 leading-[1.1] text-center tracking-wide uppercase mb-20">
              <span style={{ color: 'rgb(247, 0, 52)' }}>Our Quality </span>
              <span style={{ color: 'rgb(21, 107, 54)' }}>Promise</span>
            </h2>

            {/* Mobile Continuous Auto-Scroll (Marquee) */}
            <div className="md:hidden w-full overflow-hidden py-4">
              <div className="flex gap-12 whitespace-nowrap animate-marquee w-max">
                {[
                  "No artificial colours", "FSSAI certified", "100% vegetarian",
                  "No added sugar", "No MSG", "Batch tested",
                  "Gluten-free", "No trans fats", "Zero Preservatives"
                ].concat([
                  "No artificial colours", "FSSAI certified", "100% vegetarian",
                  "No added sugar", "No MSG", "Batch tested",
                  "Gluten-free", "No trans fats", "Zero Preservatives"
                ]).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-[45px] h-[45px] bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm relative overflow-hidden">
                      <Image
                        src="/images/tick2.svg"
                        alt="Tick"
                        width={30}
                        height={30}
                      />
                    </div>
                    <span className="font-bomstad font-normal text-[18px]" style={{ color: 'rgb(21, 107, 54)' }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:grid w-full justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6 pl-4 lg:pl-12">
              {[
                "No artificial colours",
                "FSSAI certified",
                "100% vegetarian",
                "No added sugar",
                "No MSG",
                "Batch tested",
                "Gluten-free",
                "No trans fats",
                "Zero Preservatives"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-5">
                  <div className="w-[55px] h-[55px] bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm relative overflow-hidden">
                    <Image
                      src="/images/tick2.svg"
                      alt="Tick"
                      width={38}
                      height={38}
                    />
                  </div>
                  <span className="font-bomstad font-normal text-[25px]" style={{ color: 'rgb(21, 107, 54)' }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Cook Anything Section */}
        <section className="w-full relative flex flex-col items-center overflow-visible -mt-12">
          {/* Top Half - Background Image with Torn Edge */}
          <div className="w-full relative pt-12 md:pt-24 pb-8 md:pb-36 flex flex-col items-center text-center overflow-hidden">
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              {/* Mobile Background */}
              <div className="md:hidden absolute inset-0">
                <Image
                  src="/images/green mobile 2.svg"
                  alt="Background Mobile"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
              {/* Desktop Background */}
              <div className="hidden md:block absolute inset-0">
                <Image
                  src="/images/bg green2.svg"
                  alt="Background Desktop"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
              {/* Fallback pattern / color blending top edge to beige */}
              <div className="absolute inset-0 -z-10" style={{ backgroundColor: 'rgb(239, 238, 230)' }} />
            </div>

            {/* Content Wrapper */}
            <div className="relative z-10 flex flex-col items-center w-full px-4">
              {/* Mobile Pill (md:hidden) */}
              <div className="md:hidden relative w-[240px] h-[48px] mb-6">
                <div className="absolute inset-0 rounded-full" style={{ backgroundColor: 'rgb(247, 216, 13)' }} />
                <div className="absolute inset-0 border-[1.5px] border-[#f70034] rounded-full flex items-center justify-center">
                  <span className="font-bomstad font-bold text-[14px] leading-none" style={{ color: 'rgb(21, 107, 54)' }}>
                    Make 20+ dishes with GrabV
                  </span>
                </div>
              </div>

              {/* Desktop Pill (hidden md:block) */}
              <div className="hidden md:block relative w-[313px] h-[83px] mb-10">
                <div className="absolute left-[0.76px] top-[7.36px] w-[308.483px] h-[67px] rounded-[100px]">
                  <Image
                    src="/images/yellow rectangle.svg"
                    alt=""
                    fill
                    className="pointer-events-none object-fill"
                  />
                </div>
                <Image
                  src="/images/red border.svg"
                  alt=""
                  fill
                  className="pointer-events-none object-contain"
                />
                <span className="absolute inset-0 flex items-center justify-center font-bomstad font-semibold text-[18px] leading-none tracking-normal" style={{ color: 'rgb(21, 107, 54)' }}>
                  Make 20+ dishes with GrabV
                </span>
              </div>

              {/* Main Heading */}
              <div className="mb-6 md:mb-8 flex flex-row items-baseline justify-center gap-1.5 md:gap-4 whitespace-nowrap">
                <h2 className="font-kura text-[22px] md:text-[85px] leading-[0.9]" style={{ color: 'rgb(247, 216, 13)' }}>
                  COOK ANYTHING
                </h2>
                <h2 className="font-kura text-[22px] md:text-[85px] leading-[0.9] text-white">
                  IN MINUTES
                </h2>
              </div>

              {/* Subtext */}
              <div className="text-white text-[16px] md:text-[25px] font-bomstad font-normal leading-[1.3] max-w-3xl px-4 md:px-6 opacity-90">
                <p>From quick weeknight dals to weekend feasts.</p>
                <p>One base, unlimited possibilities.</p>
              </div>
            </div>
          </div>

          {/* Bottom Half - Light Cream Background */}
          <div
            className="w-full pt-4 md:pt-12 pb-2 md:pb-20 flex flex-col items-center"
            style={{ backgroundColor: 'rgb(239, 238, 230)' }}
          >
            {/* Vegetarian Category */}
            <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 flex items-center gap-3 md:gap-8 mb-8 md:mb-12 opacity-80">
              <div className="flex-1 h-[1px] md:h-[2px]" style={{ backgroundColor: 'rgb(21, 107, 54)' }} />
              <div className="flex items-center gap-2 md:gap-3 px-4 md:px-8 py-2 md:py-3 rounded-full shrink-0" style={{ backgroundColor: 'rgb(179, 202, 183)' }}>
                <div className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full" style={{ backgroundColor: 'rgb(21, 107, 54)' }} />
                <span className="font-bold text-[14px] md:text-[22px] tracking-[0.1em]" style={{ color: 'rgb(21, 107, 54)' }}>
                  VEGETARIAN
                </span>
              </div>
              <div className="flex-1 h-[1px] md:h-[2px]" style={{ backgroundColor: 'rgb(21, 107, 54)' }} />
            </div>

            {/* Vegetarian Recipes - Horizontal scroll on mobile */}
            <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 flex overflow-x-auto no-scrollbar md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-28">
              {[
                { title: "Paneer Butter Masala", desc: "Creamy, rich, restaurant-style. Just add paneer to GrabV, simmer 5 minutes, finish with butter." },
                { title: "Paneer Butter Masala", desc: "Creamy, rich, restaurant-style. Just add paneer to GrabV, simmer 5 minutes, finish with butter." },
                { title: "Paneer Butter Masala", desc: "Creamy, rich, restaurant-style. Just add paneer to GrabV, simmer 5 minutes, finish with butter." }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col group items-start shrink-0 w-[175px] md:w-auto">
                  <div className="relative w-full aspect-[4/5] rounded-[15px] md:rounded-[30px] overflow-hidden mb-4 md:mb-8 shadow-md md:shadow-xl">
                    <Image
                      src="/images/food1.svg"
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 md:top-5 inset-x-3 md:inset-x-5 flex justify-between items-center opacity-90">
                      <div className="text-white px-2 md:px-5 py-1 md:py-2 rounded-full text-[11px] md:text-[20px] font-bold shadow-md" style={{ backgroundColor: 'rgba(21, 107, 54, 0.9)' }}>
                        Veg
                      </div>
                      <div className="text-white px-2 md:px-5 py-1 md:py-2 rounded-full text-[11px] md:text-[20px] font-bold shadow-md flex items-center gap-1 md:gap-2" style={{ backgroundColor: 'rgba(21, 107, 54, 0.9)' }}>
                        <Image src="/images/timer.svg" alt="Timer" width={12} height={12} className="brightness-0 invert" />
                        <span>6 Min</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-start px-1 md:px-2">
                    <div className="px-2 md:px-4 py-0.5 md:py-1.5 rounded-full mb-2 md:mb-3 shadow-sm" style={{ backgroundColor: 'rgb(207, 219, 204)' }}>
                      <span className="text-[10px] md:text-[18px] font-bomstad font-normal tracking-wide" style={{ color: 'rgb(21, 107, 54)' }}>
                        Indian classic
                      </span>
                    </div>
                    <h3 className="font-bomstad font-bold text-[16px] md:text-[30px] leading-tight tracking-normal mb-2 md:mb-3" style={{ color: 'rgb(247, 0, 52)' }}>
                      {item.title}
                    </h3>
                    <p className="font-bomstad text-[12px] md:text-[18px] leading-relaxed tracking-normal font-normal max-w-full" style={{ color: 'rgb(21, 107, 54)' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Non-Vegetarian Category */}
            <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 flex items-center gap-3 md:gap-8 mt-16 md:mt-24 mb-8 md:mb-12 opacity-80">
              <div className="flex-1 h-[1px] md:h-[2px]" style={{ backgroundColor: 'rgb(247, 0, 52)' }} />
              <div className="flex items-center gap-2 md:gap-3 px-4 md:px-8 py-2 md:py-3 rounded-full shrink-0" style={{ backgroundColor: 'rgba(247, 0, 52, 0.15)' }}>
                <div className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full" style={{ backgroundColor: 'rgb(247, 0, 52)' }} />
                <span className="font-bold text-[14px] md:text-[22px] tracking-[0.1em]" style={{ color: 'rgb(247, 0, 52)' }}>
                  NON-VEGETARIAN
                </span>
              </div>
              <div className="flex-1 h-[1px] md:h-[2px]" style={{ backgroundColor: 'rgb(247, 0, 52)' }} />
            </div>

            {/* Non-Vegetarian Recipes - Horizontal scroll on mobile */}
            <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 flex overflow-x-auto no-scrollbar md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-28 mb-16 md:mb-32">
              {[
                { title: "Chicken Butter Masala", desc: "Tender chicken in our signature gravy. Restaurant quality in 6 minutes at home." },
                { title: "Chicken Butter Masala", desc: "Tender chicken in our signature gravy. Restaurant quality in 6 minutes at home." },
                { title: "Chicken Butter Masala", desc: "Tender chicken in our signature gravy. Restaurant quality in 6 minutes at home." }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col group items-start shrink-0 w-[175px] md:w-auto">
                  <div className="relative w-full aspect-[4/5] rounded-[15px] md:rounded-[30px] overflow-hidden mb-4 md:mb-8 shadow-md md:shadow-xl">
                    <Image
                      src="/images/food1.svg"
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 md:top-5 inset-x-3 md:inset-x-5 flex justify-between items-center opacity-90">
                      <div className="text-white px-2 md:px-5 py-1 md:py-2 rounded-full text-[11px] md:text-[20px] font-bold shadow-md" style={{ backgroundColor: 'rgba(125, 23, 16, 0.9)' }}>
                        Non-veg
                      </div>
                      <div className="text-white px-2 md:px-5 py-1 md:py-2 rounded-full text-[11px] md:text-[20px] font-bold shadow-md flex items-center gap-1 md:gap-2" style={{ backgroundColor: 'rgba(125, 23, 16, 0.9)' }}>
                        <Image src="/images/timer.svg" alt="Timer" width={12} height={12} className="brightness-0 invert" />
                        <span>6 Min</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-start px-1 md:px-2">
                    <div className="px-2 md:px-4 py-0.5 md:py-1.5 rounded-full mb-2 md:mb-3 shadow-sm" style={{ backgroundColor: 'rgb(207, 219, 204)' }}>
                      <span className="text-[10px] md:text-[18px] font-bold tracking-wide" style={{ color: 'rgb(21, 107, 54)' }}>
                        Indian classic
                      </span>
                    </div>
                    <h3 className="font-bomstad font-bold text-[16px] md:text-[30px] leading-tight tracking-normal mb-2 md:mb-3" style={{ color: 'rgb(247, 0, 52)' }}>
                      {item.title}
                    </h3>
                    <p className="font-bomstad text-[12px] md:text-[18px] leading-relaxed tracking-normal font-normal max-w-full" style={{ color: 'rgb(21, 107, 54)' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Banner Section */}
            <div
              className="w-[calc(100%-32px)] md:w-full max-w-[1440px] mx-auto rounded-[15px] px-4 md:px-8 py-6 md:py-10 flex flex-row items-center justify-between gap-4 mb-4 md:mb-10 overflow-hidden relative"
              style={{ backgroundColor: 'rgb(21, 107, 54)' }}
            >
              <div className="flex flex-col items-start text-left z-10 max-w-[65%]">
                <h2 className="font-kura text-[14px] md:text-[55px] leading-tight mb-1 uppercase">
                  <span style={{ color: 'rgb(247, 216, 13)' }}>20+ RECIPES. </span>
                  <span className="text-white">ONE POUCH.</span>
                </h2>
                <p className="text-white text-[9px] md:text-[22px] font-medium opacity-90 leading-tight">
                  Every dish starts with GrabV. What will you make tonight?
                </p>
              </div>

              <button
                className="bg-[#f70034] text-white px-4 md:px-10 py-2.5 md:py-5 rounded-full font-bomstad font-bold text-[11px] md:text-[30px] shadow-lg hover:bg-black transition-all whitespace-nowrap z-10 shrink-0"
              >
                Order Your Pouch
              </button>
            </div>
          </div>
        </section>

        {/* Manufacturing Process Section */}
        <section className="w-full pt-0 md:pt-0 pb-20 md:pb-32 flex flex-col items-center" style={{ backgroundColor: 'rgb(239, 238, 230)' }}>
          <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 flex flex-col items-center">

            {/* Mobile Header (md:hidden) */}
            <div className="md:hidden flex flex-col items-center text-center mb-10 w-full">
              {/* Badge - High Fidelity SVG Style */}
              <div className="relative w-[220px] h-[58px] mb-6">
                <div className="absolute left-[0.54px] top-[5.05px] w-[216.57px] h-[46.88px] rounded-[100px] bg-[#f70034]" />
                <Image
                  src="/images/green border.svg"
                  alt=""
                  fill
                  className="pointer-events-none object-contain"
                />
                <span className="absolute inset-0 flex items-center justify-center font-bomstad font-bold text-[14px] text-white uppercase tracking-wide">
                  Manufacturing Process
                </span>
              </div>
              <h2 className="font-kura text-[21px] leading-tight mb-1 uppercase whitespace-nowrap">
                <span style={{ color: 'rgb(247, 0, 52)' }}>How we make </span>
                <span style={{ color: 'rgb(21, 107, 54)' }}>every pouch</span>
              </h2>
              <p className="text-[12px] font-bomstad font-normal opacity-90 max-w-[280px]" style={{ color: 'rgb(21, 107, 54)' }}>
                No factory line. No bulk shortcuts.
              </p>
            </div>

            {/* Desktop Header (hidden md:flex) */}
            <div className="hidden md:flex flex-col items-center text-center mb-8 w-full">
              <div className="relative w-[282px] h-[75px] mb-10">
                <div className="absolute left-[0.69px] top-[6.46px] w-[277.615px] h-[60px] rounded-[100px]">
                  <Image src="/images/red rectangle.svg" alt="" fill className="pointer-events-none object-fill" />
                </div>
                <Image src="/images/green border.svg" alt="" fill className="pointer-events-none object-contain" />
                <span className="absolute inset-0 flex items-center justify-center font-bomstad font-semibold text-[18px] leading-none tracking-normal text-white">
                  Manufacturing Process
                </span>
              </div>
              <h2 className="font-kura text-[85px] leading-[0.9] mb-4 uppercase">
                <span style={{ color: 'rgb(247, 0, 52)' }}>How we make </span>
                <span style={{ color: 'rgb(21, 107, 54)' }}>every pouch</span>
              </h2>
              <div className="max-w-4xl text-[18px] font-bomstad font-normal leading-[1.4] tracking-normal text-center mb-12 px-6 opacity-90" style={{ color: 'rgb(21, 107, 54)' }}>
                No factory line. No bulk shortcuts. Every batch is made by hand the way a good cook<br />
                would — because that&apos;s the only way it tastes right.
              </div>
            </div>

            {/* Mobile Vertical Timeline (md:hidden) */}
            <div className="md:hidden w-full relative flex flex-col gap-6 pl-2">
              {[
                { step: 1, title: "Fresh produce sourced daily", desc: "Onions, tomatoes, ginger and garlic are sourced fresh every morning. No cold storage, no aged produce." },
                { step: 2, title: "Fresh produce sourced daily", desc: "Onions, tomatoes, ginger and garlic are sourced fresh every morning. No cold storage, no aged produce." },
                { step: 3, title: "Fresh produce sourced daily", desc: "Onions, tomatoes, ginger and garlic are sourced fresh every morning. No cold storage, no aged produce." },
                { step: 4, title: "Fresh produce sourced daily", desc: "Onions, tomatoes, ginger and garlic are sourced fresh every morning. No cold storage, no aged produce." },
                { step: 5, title: "Fresh produce sourced daily", desc: "Onions, tomatoes, ginger and garlic are sourced fresh every morning. No cold storage, no aged produce." }
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-6 relative">
                  {/* Connecting Line - Correctly scoped to bridge the gap */}
                  {item.step !== 5 && (
                    <div className="absolute top-[22px] left-[47px] w-[2px] h-[calc(100%+24px)] bg-[rgb(247,216,13)] z-0" />
                  )}

                  <div className="flex flex-col items-center shrink-0 w-[94px] relative">
                    {/* Moon Icon */}
                    <div className="relative w-full h-[44px] flex items-center justify-center mt-0.5 z-10">
                      <Image src="/images/moon.svg" alt="Step" fill className="object-contain" />
                      <span className="font-kura text-[24px] relative z-10 pt-[2px]" style={{ color: 'rgb(247, 0, 52)' }}>{item.step}</span>
                    </div>
                  </div>
                  <div className="flex flex-col text-left pr-4">
                    <h4 className="font-bomstad text-[16px] font-bold mb-0" style={{ color: 'rgb(247, 0, 52)' }}>{item.title}</h4>
                    <p className="font-bomstad text-[12px] font-normal leading-relaxed max-w-[280px]" style={{ color: 'rgb(21, 107, 54)' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Timeline (hidden md:flex) */}
            <div className="hidden md:flex w-full relative flex flex-col items-start gap-12 pt-4">
              <div className="absolute left-[89px] top-[41px] bottom-[41px] w-[4px] z-0" style={{ backgroundColor: 'rgb(247, 216, 13)' }} />
              {[
                { step: 1, title: "Fresh produce sourced daily", desc: "Onions, tomatoes, ginger and garlic are sourced fresh every morning. No cold storage, no aged produce." },
                { step: 2, title: "Fresh produce sourced daily", desc: "Onions, tomatoes, ginger and garlic are sourced fresh every morning. No cold storage, no aged produce." },
                { step: 3, title: "Fresh produce sourced daily", desc: "Onions, tomatoes, ginger and garlic are sourced fresh every morning. No cold storage, no aged produce." },
                { step: 4, title: "Fresh produce sourced daily", desc: "Onions, tomatoes, ginger and garlic are sourced fresh every morning. No cold storage, no aged produce." },
                { step: 5, title: "Fresh produce sourced daily", desc: "Onions, tomatoes, ginger and garlic are sourced fresh every morning. No cold storage, no aged produce." }
              ].map((item) => (
                <div key={item.step} className="flex items-center gap-16 relative z-10 w-full group">
                  <div className="relative shrink-0 w-[178px] h-[82px] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <Image src="/images/moon.svg" alt="Step" fill className="object-contain" />
                    <span className="font-kura text-[50px] relative z-10 pt-[4px]" style={{ color: 'rgb(247, 0, 52)' }}>{item.step}</span>
                  </div>
                  <div className="flex flex-col items-start text-left">
                    <h4 className="font-bomstad text-[30px] font-semibold mb-2" style={{ color: 'rgb(21, 107, 54)' }}>{item.title}</h4>
                    <p className="font-bomstad text-[18px] font-normal opacity-90" style={{ color: 'rgb(21, 107, 54)' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Reviews Section */}
        <div className="w-full relative flex flex-col items-center">
          {/* Green Header with Jagged Edge */}
          <div className="w-full relative pt-12 md:pt-20 pb-12 md:pb-32 flex flex-col items-center text-center">
            <div className="absolute inset-0 z-0 overflow-hidden">
              <Image
                src="/images/bg green3.svg"
                alt="Background"
                fill
                className="object-cover object-bottom scale-x-[-1]"
                priority
              />
              {/* Fallback pattern / color blending top edge to beige */}
              <div className="absolute inset-0 -z-10" style={{ backgroundColor: 'rgb(239, 238, 230)' }} />
            </div>

            <div className="relative z-10 flex flex-col items-center px-4 w-full">
              {/* What people are saying Pill - Mobile optimized */}
              <div className="md:hidden relative w-[240px] h-[63px] mb-4">
                <div className="absolute left-[2.5px] top-[5.6px] w-[235px] h-[51px] rounded-full bg-[rgb(247,216,13)]" />
                <Image src="/images/red border.svg" alt="" fill className="pointer-events-none object-contain" />
                <span className="absolute inset-0 flex items-center justify-center font-bomstad font-bold text-[14px] leading-none tracking-normal text-[#156b36]">
                  What people are saying
                </span>
              </div>

              {/* What people are saying Pill - Desktop */}
              <div className="hidden md:block relative w-[315px] h-[83px] mb-10">
                <div className="absolute left-[0.76px] top-[7.36px] w-[310px] h-[67px] rounded-[100px] bg-[rgb(247,216,13)]" />
                <Image src="/images/red border.svg" alt="" fill className="pointer-events-none object-contain" />
                <span className="absolute inset-0 flex items-center justify-center font-bomstad font-semibold text-[18px] leading-none tracking-normal" style={{ color: 'rgb(21, 107, 54)' }}>
                  What people are saying
                </span>
              </div>

              {/* Heading */}
              <h2 className="font-kura text-[32px] md:text-[85px] leading-tight mb-0 md:mb-4 text-center uppercase">
                <span className="text-white">Our GrabV </span>
                <span style={{ color: 'rgb(247, 216, 13)' }}>Your Review</span>
              </h2>
            </div>
          </div>

          {/* Review Cards - Horizontal scroll on mobile */}
          <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pt-4 md:py-20 flex overflow-x-auto no-scrollbar md:grid md:grid-cols-3 gap-6 md:gap-8 pb-8 md:pb-16">
            {[1, 2, 3].map((item) => (
              <div key={item} className="relative p-4 md:p-8 rounded-[20px] bg-white flex flex-col gap-2 md:gap-6 shrink-0 w-[211px] h-[187px] md:w-auto md:h-auto shadow-sm">
                {/* Mobile Card Borders (Double yellow border effect per request) */}
                <div className="absolute -inset-1 md:hidden pointer-events-none">
                  <Image src="/images/card border phone.svg" alt="" fill className="object-fill" />
                </div>
                <div className="absolute -inset-1.5 md:hidden pointer-events-none rotate-[1.5deg] scale-[1.02] opacity-70">
                  <Image src="/images/card border phone.svg" alt="" fill className="object-fill" />
                </div>

                {/* Desktop Card Borders (Double yellow border effect per request) */}
                <div className="absolute -inset-2.5 hidden md:block pointer-events-none">
                  <Image src="/images/card border web.svg" alt="" fill className="object-fill" />
                </div>
                <div className="absolute -inset-3 hidden md:block pointer-events-none -rotate-[0.8deg] scale-[1.01] opacity-70">
                  <Image src="/images/card border web.svg" alt="" fill className="object-fill" />
                </div>

                <div className="flex items-center gap-3 md:gap-4 relative z-10">
                  <div className="w-10 h-10 md:w-16 md:h-16 rounded-full overflow-hidden relative border border-neutral-100">
                    <Image src="/images/review.svg" alt="User" fill className="object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] md:text-[20px] font-bold" style={{ color: 'rgb(21, 107, 54)' }}>Shneha Mehta</span>
                    <span className="text-[11px] md:text-[16px] text-neutral-400">Delhi</span>
                  </div>
                </div>
                <div className="flex gap-0.5 relative z-10">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="text-[15px] md:text-[24px]" style={{ color: 'rgb(247, 216, 13)' }}>★</span>
                  ))}
                </div>
                <p className="text-[11px] md:text-[18px] leading-relaxed font-medium relative z-10 line-clamp-4 md:line-clamp-none" style={{ color: 'rgb(21, 107, 54)' }}>
                  &quot;I was sceptical — how can a ready base taste this good? The onions are actually caramelised properly. My husband thought I&apos;d been cooking all afternoon.&quot;
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="w-[calc(100%-16px)] md:w-full max-w-[1440px] mx-auto min-h-[280px] md:h-[550px] rounded-[8px] px-4 py-8 md:p-24 flex flex-col items-center justify-center text-center relative overflow-hidden mb-10 shadow-xl"
          style={{ backgroundColor: 'rgb(21, 106, 55)' }}
        >

          {/* Heading - Single line for mobile */}
          <h2 className="font-kura text-[19px] md:text-[70px] leading-tight mb-4 md:mb-8 whitespace-nowrap">
            <span style={{ color: 'rgb(247, 216, 13)' }}>Ready to cook smarter </span>
            <span className="text-white">Everyday?</span>
          </h2>

          {/* Subtext */}
          <p className="text-white text-[13px] md:text-[20px] font-bomstad font-normal tracking-wide opacity-90 mb-8 md:mb-12 max-w-4xl px-2 md:px-0 leading-relaxed md:leading-[1.3]">
            Order 750g Or 250g pouch. A week of effortless dinners. Zero preservatives. Shipped cold, direct to your door.
          </p>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-8 md:mb-12 w-full max-w-[1000px]">
            <div className="flex flex-row items-center justify-center gap-3 md:gap-8 w-full md:w-auto">
              {/* Order 750g */}
              <button className="bg-white text-[#f70034] flex-1 md:w-[260px] py-3 md:py-5 rounded-full font-bomstad font-medium text-[14px] md:text-[24px] shadow-xl hover:scale-105 hover:bg-[#f70034] hover:text-white transition-all shrink-0">
                Order 750g
              </button>

              {/* Order 250g */}
              <button className="bg-white text-[#f70034] flex-1 md:w-[260px] py-3 md:py-5 rounded-full font-bomstad font-medium text-[14px] md:text-[24px] shadow-xl hover:scale-105 hover:bg-[#f70034] hover:text-white transition-all shrink-0">
                Order 250g
              </button>
            </div>

            {/* WhatsApp - Tertiary */}
            <button className="bg-white text-[#f70034] w-[180px] md:w-[260px] py-2.5 md:py-5 rounded-full font-bomstad font-normal text-[14px] md:text-[24px] shadow-xl hover:scale-105 hover:bg-[#f70034] hover:text-white transition-all group flex items-center justify-center gap-2 md:gap-4 shrink-0">
              <div className="w-5 h-5 md:w-8 md:h-8 relative group-hover:brightness-0 group-hover:invert transition-all">
                <Image src="/images/whatsapp.svg" alt="WhatsApp" fill className="object-contain" />
              </div>
              <span>WhatsApp us</span>
            </button>
          </div>

          {/* Footer text */}
          <div className="text-white text-[10px] min-[375px]:text-[11px] md:text-[24px] font-bomstad font-medium tracking-tight md:tracking-wide flex flex-row flex-nowrap items-center justify-center gap-1 md:gap-2 opacity-100 whitespace-nowrap px-4 md:px-2">
            <span>Free delivery on orders above ₹499</span>
            <span className="opacity-60">·</span>
            <span>Ships within 48 hours</span>
            <span className="opacity-60">·</span>
            <div className="flex items-center gap-0">
              <div className="h-5 w-10 md:h-16 md:w-32 relative invert brightness-0">
                <Image src="/images/fssai%20text.svg" alt="FSSAI" fill className="object-contain" />
              </div>
              <span>Certified</span>
            </div>
          </div>
        </div>
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

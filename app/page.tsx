"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const qualityPromises = [
    { text: "100% Vegan", icon: "leaf.svg" },
    { text: "Batch Tested", icon: "Batch tested.svg" },
    { text: "FSSAI", icon: "FSSAI (1).svg" },
    { text: "No Artificial Colours", icon: "No artificial colours.svg" },
    { text: "Zero Preservatives", icon: "Zero Preservatives (1).svg" },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full font-arpona overflow-x-hidden" style={{ backgroundColor: 'rgb(239, 238, 230)' }}>

      {/* Navbar Section (H: 80px) */}
      <header
        style={{ backgroundColor: 'rgb(12, 61, 27)' }}
        className="relative z-[100] w-full flex-shrink-0 shadow-md"
      >
        <div className="max-w-[1600px] mx-auto pl-2 pr-4 md:pl-4 md:pr-8 h-[70px] md:h-[80px] flex items-center justify-between">
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
        <div className="relative w-full max-w-[1600px] mx-auto pl-2 pr-4 md:pl-12 lg:pl-16 md:pr-8 h-auto min-h-[380px] md:h-[800px] shrink-0 z-30 flex">

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
                <span className="font-arpona font-medium tracking-wide whitespace-nowrap text-[18px] md:text-[27px]" style={{ color: 'rgb(21, 107, 54)' }}>
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

            <div className="mt-4 md:mt-10 mb-8 md:mb-16">
              <h1 className="font-kura leading-[0.9] text-brand-yellow m-0 p-0 uppercase text-[38px] md:text-[90px] max-w-[300px] md:max-w-none">
                The taste of <br className="hidden md:block" /> slow cooking
              </h1>
              <h1 className="font-kura leading-[1.1] text-white m-0 p-0 uppercase text-[19px] md:text-[50px] lg:text-[60px] md:whitespace-nowrap max-w-[300px] md:max-w-none mt-2">
                Without the long prep.
              </h1>
            </div>



            {/* CTA Buttons - Single button as per request */}
            <div className="flex flex-wrap lg:flex-nowrap items-center gap-4">
              <Link
                href="/products"
                className="bg-[rgb(17,82,40)] border border-transparent text-white rounded-full px-6 md:px-12 py-2.5 md:py-4 text-[18px] md:text-[30px] font-arpona font-semibold hover:bg-brand-yellow hover:text-[rgb(17,82,40)] transition-all shadow-sm whitespace-nowrap uppercase tracking-wide"
              >
                Grab Your Packs
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
          <div className="w-full max-w-[1600px] mx-auto pl-2 pr-4 md:pl-4 md:pr-8 relative z-[30]">

            {/* Features Horizontal Scroll - Mobile Only */}
            <div className="md:hidden overflow-hidden relative w-full mb-8">
              <div className="animate-marquee flex w-max gap-12 py-2">
                {[...Array(4)].map((_, i) => (
                  <React.Fragment key={i}>
                    {[
                      { img: 'timer2.svg', text: 'Ready in 7 mins' },
                      { img: 'slow.svg', text: 'Slow cooked' },
                      { img: 'FSSAI (1).svg', text: 'FSSAI Certified' },
                      { img: 'tick2.svg', text: 'Zero Preservatives' },
                      { img: 'cold.svg', text: 'Cold Chain Packed' }
                    ].map((item, idx) => (
                      <div key={`${i}-${idx}`} className="flex items-center gap-2 shrink-0">
                        <div className="w-[20px] h-[20px] relative">
                          <Image src={`/images/${item.img}`} alt={item.text} fill className="object-contain" />
                        </div>
                        <span className="text-[rgb(21,107,54)] font-normal text-[18px] font-arpona whitespace-nowrap">{item.text}</span>
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
                    <Image src="/images/timer2.svg" alt="Ready in 7 mins" fill className="object-contain" />
                  </div>
                  <span className="text-[rgb(21,107,54)] font-normal text-[25px] font-arpona whitespace-nowrap">Ready in 7 mins</span>
                </div>
                <div
                  style={{ backgroundColor: 'rgb(247, 216, 13)' }}
                  className="rounded-full px-7 py-3 flex items-center gap-3 shadow-sm"
                >
                  <div className="w-[30px] h-[30px] relative">
                    <Image src="/images/slow.svg" alt="Slow cooked" fill className="object-contain" />
                  </div>
                  <span className="text-[rgb(21,107,54)] font-normal text-[25px] font-arpona whitespace-nowrap">Slow cooked</span>
                </div>
                <div
                  style={{ backgroundColor: 'rgb(247, 216, 13)' }}
                  className="rounded-full px-7 py-3 flex items-center gap-3 shadow-sm"
                >
                  <div className="w-[30px] h-[30px] relative">
                    <Image src="/images/FSSAI (1).svg" alt="FSSAI Certified" fill className="object-contain" />
                  </div>
                  <span className="text-[rgb(21,107,54)] font-normal text-[25px] font-arpona whitespace-nowrap">FSSAI Certified</span>
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
                  <span className="text-[rgb(21,107,54)] font-normal text-[25px] font-arpona whitespace-nowrap">Zero Preservatives</span>
                </div>
                <div
                  style={{ backgroundColor: 'rgb(247, 216, 13)' }}
                  className="rounded-full px-7 py-3 flex items-center gap-3 shadow-sm"
                >
                  <div className="w-[30px] h-[30px] relative">
                    <Image src="/images/cold.svg" alt="Cold Chain Packed" fill className="object-contain" />
                  </div>
                  <span className="text-[rgb(21,107,54)] font-normal text-[25px] font-arpona whitespace-nowrap">Cold Chain Packed</span>
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
          <div className="relative w-full max-w-[1600px] mx-auto pl-2 pr-4 md:pl-12 lg:pl-16 md:pr-8 z-[40] flex flex-col lg:flex-row items-center pt-12 md:pt-0">

            {/* Left Content */}
            <div className="w-full lg:w-[40%] flex flex-col items-center lg:items-start pt-2 md:pt-0 text-center lg:text-left">
              {/* Question Pill with Border Settings */}
              <div className="relative mb-6 md:mb-4 inline-block w-fit">
                {/* Red Pill Background */}
                <div
                  style={{ backgroundColor: 'rgb(247, 0, 52)' }}
                  className="px-6 md:px-10 py-2 md:py-3.5 rounded-full relative z-10 shadow-md"
                >
                  <span className="text-white font-normal text-[20px] md:text-[28px] whitespace-nowrap font-arpona tracking-wider">
                    What is GrabV?
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
                  <span style={{ color: 'rgb(247, 0, 52)' }}>Your everyday </span>
                  <span style={{ color: 'rgb(21, 107, 54)' }}>cooking, </span>
                  <span style={{ color: 'rgb(247, 0, 52)' }}>made easier.</span>
                </h2>
              </div>
              {/* Desktop Heading (2 Lines) */}
              <div className="hidden md:flex flex-col items-start mb-6 w-full text-left">
                <h2 className="font-kura leading-[0.9] text-[60px] m-0 p-0 uppercase" style={{ color: 'rgb(247, 0, 52)' }}>
                  Your everyday
                </h2>
                <h2 className="font-kura leading-[1.0] text-[60px] m-0 p-0 uppercase whitespace-nowrap">
                  <span style={{ color: 'rgb(21, 107, 54)'/* Green */ }}>cooking, </span>
                  <span style={{ color: 'rgb(247, 0, 52)'/* Red */ }}>made easier.</span>
                </h2>
              </div>

              {/* Description text */}
              {/* Mobile Description */}
              <p className="md:hidden max-w-[320px] leading-[1.3] mb-0 md:mb-12 font-normal font-arpona text-[16px] text-center" style={{ color: 'rgb(21, 107, 54)' }}>
                A ready to use, chilled, fresh food processing solution that cuts the average 40-45 minute curry prep time into a quick, preservative free meal.
              </p>
              {/* Desktop Description */}
              <p className="hidden md:block max-w-xl leading-[1.3] mb-12 font-normal font-arpona text-[25px] text-left" style={{ color: 'rgb(21, 107, 54)' }}>
                A ready to use, chilled, fresh food processing solution that cuts the average 40-45 minute curry prep time into a quick, preservative free meal.
              </p>

              {/* Desktop Learn More Button */}
              <Link
                href="/ourstory"
                style={{ backgroundColor: 'rgb(21, 107, 54)' }}
                className="hidden md:flex group items-center gap-6 px-10 py-5 rounded-full text-white text-[25px] font-normal font-arpona hover:bg-black transition-all shadow-lg"
              >
                Learn More
                <Image src="/images/arrow.svg" alt="Arrow" width={32} height={32} className="object-contain" />
              </Link>


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
          <div className="w-full max-w-[1600px] mx-auto pl-2 pr-4 md:pl-4 md:pr-8">

            <div className="flex flex-col mb-10 relative">
              {/* Mobile Layout (Hidden on Desktop) */}
              <div className="md:hidden flex flex-col w-full mb-4 -mt-10">
                <div className="flex justify-between items-center w-full gap-3">
                  <div className="flex-[1] flex flex-col text-left">
                    <h2 className="font-kura leading-[1.0] text-[23px] uppercase whitespace-nowrap">
                      <span style={{ color: 'rgb(247, 0, 52)' }}>POUCH TO PLATE </span><br />
                      <span style={{ color: 'rgb(21, 107, 54)' }}>IN 5 STEPS</span>
                    </h2>
                    <p className="font-arpona font-normal text-[13px] leading-[1.2] mt-2" style={{ color: 'rgb(21, 107, 54)' }}>
                      No Chopping. No Stress.<br />Just Real Food.
                    </p>
                  </div>

                  <div className="flex-[1.4] flex flex-col gap-1.5">
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
                      className="w-full rounded-[8px] p-1 px-1.5 grid grid-cols-2 gap-x-0.5 gap-y-1.5 shadow-sm border border-[rgb(21,107,54)]/10"
                    >
                      <div className="flex flex-col border-r border-[rgb(21,107,54)]/20 pr-1">
                        <span className="font-bold text-[16px] leading-tight" style={{ color: 'rgb(16, 107, 54)' }}>7 Min</span>
                        <span className="text-[10px] font-bold" style={{ color: 'rgb(16, 107, 54)' }}>cooking time</span>
                      </div>
                      <div className="flex flex-col pl-1">
                        <span className="font-bold text-[16px] leading-tight" style={{ color: 'rgb(16, 107, 54)' }}>Zero</span>
                        <span className="text-[10px] font-bold" style={{ color: 'rgb(16, 107, 54)' }}>Preservatives</span>
                      </div>
                      <div className="flex flex-col border-t border-r border-[rgb(21,107,54)]/20 pt-1.5 pr-1">
                        <span className="font-bold text-[16px] leading-tight" style={{ color: 'rgb(16, 107, 54)' }}>20+</span>
                        <span className="text-[10px] font-bold" style={{ color: 'rgb(16, 107, 54)' }}>delicious dishes</span>
                      </div>
                      <div className="flex flex-col border-t border-[rgb(21,107,54)]/20 pt-1.5 pl-1">
                        <span className="font-bold text-[14px] leading-tight whitespace-nowrap" style={{ color: 'rgb(16, 107, 54)' }}>250/750 G</span>
                        <span className="text-[10px] font-bold" style={{ color: 'rgb(16, 107, 54)' }}>per pouch</span>
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
                  <p className="font-arpona font-normal text-[17px] sm:text-[20px] lg:text-[25px] leading-[1.2] mt-4" style={{ color: 'rgb(21, 107, 54)' }}>
                    No Chopping. No Stress. Just Real Food.
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
                      <Image src="/images/clock.svg" alt="" width={48} height={48} className="shrink-0" />
                      <div className="flex flex-col text-left shrink-0">
                        <span className="font-bold text-[30px] leading-tight whitespace-nowrap" style={{ color: 'rgb(16, 107, 54)' }}>7 Min</span>
                        <span className="text-[15px] font-bold whitespace-nowrap" style={{ color: 'rgb(16, 107, 54)', letterSpacing: '0.05em' }}>cooking time</span>
                      </div>
                    </div>
                    <div className="hidden sm:block w-[1px] h-10 bg-[rgb(16,107,54)]/30" />

                    <div className="flex-1 flex flex-col items-center justify-center text-center px-4 shrink-0">
                      <span className="font-bold text-[30px] leading-tight whitespace-nowrap" style={{ color: 'rgb(16, 107, 54)' }}>Zero</span>
                      <span className="text-[15px] font-bold whitespace-nowrap" style={{ color: 'rgb(16, 107, 54)', letterSpacing: '0.05em' }}>Preservatives</span>
                    </div>
                    <div className="hidden sm:block w-[1px] h-10 bg-[rgb(16,107,54)]/30" />

                    <div className="flex-1 flex flex-col items-center justify-center text-center px-4 shrink-0">
                      <span className="font-bold text-[30px] leading-tight whitespace-nowrap" style={{ color: 'rgb(16, 107, 54)' }}>20+</span>
                      <span className="text-[15px] font-bold whitespace-nowrap" style={{ color: 'rgb(16, 107, 54)', letterSpacing: '0.05em' }}>delicious dishes</span>
                    </div>
                    <div className="hidden sm:block w-[1px] h-10 bg-[rgb(16,107,54)]/30" />

                    <div className="flex-1 flex flex-col items-center justify-center text-center px-4 shrink-0">
                      <span className="font-bold text-[30px] leading-tight whitespace-nowrap" style={{ color: 'rgb(16, 107, 54)' }}>250/750 G</span>
                      <span className="text-[15px] font-bold whitespace-nowrap" style={{ color: 'rgb(16, 107, 54)', letterSpacing: '0.05em' }}>per pouch</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex overflow-x-auto md:overflow-visible no-scrollbar md:grid w-full max-w-[1284px] mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-x-8 md:gap-y-20 mt-2 md:mt-20 mb-20 px-2 md:px-0 pt-7 md:pt-0">
              {[
                { step: 1, text: "Add your tempering\n(tadka) in oil", rotate: "-rotate-6" },
                { step: 2, text: "Sauté veggies or\npaneer of your choice.", rotate: "rotate-6" },
                { step: 3, text: "Pour gravy &\nadjust consistency", rotate: "-rotate-6" },
                { step: 4, text: "Sprinkle spices\n& salt to taste.", rotate: "rotate-6" },
                { step: 5, text: "Cook for 7 mins\nand enjoy!", rotate: "-rotate-6" }
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
                      <p className="font-arpona font-normal text-[15px] md:text-[20px] leading-[1.2] md:leading-[24px] whitespace-pre-line px-2 text-center" style={{ color: 'rgb(21, 107, 54)' }}>
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
          <div className="relative w-full max-w-[1600px] mx-auto pl-2 pr-4 md:pl-4 md:pr-8 lg:pl-10 lg:pr-[80px] z-10 flex flex-col items-start pb-0">

            {/* Mobile Layout (Hidden on Desktop) */}
            <div className="md:hidden flex flex-col items-center w-full text-center -mt-8">
              {/* Ingredients Pill */}
              <div className="relative w-[210px] h-[42px] mb-6">
                <div
                  className="absolute inset-0 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgb(247, 0, 52)' }}
                >
                  <span className="text-white font-arpona font-bold text-[14px] uppercase tracking-wide">
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
                <span style={{ color: 'rgb(21, 107, 54)' }}>Our Slow-Cooked </span>
                <span style={{ color: 'rgb(247, 0, 52)' }}>Secret</span>
              </h2>

              {/* Subtitle */}
              <p className="font-arpona font-normal text-[18px] leading-[1.4] mb-8 px-2" style={{ color: 'rgb(21, 107, 54)' }}>
                Every batch is tested and every ingredient is printed.<br />
                No shortcuts, just real food.
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
                  { img: 'Fresh Onions & Tomatoes.jpg', title: 'Fresh Onions & Tomatoes', desc: 'Slow-fried to golden perfection' },
                  { img: 'The Whole Spice Bloom.jpg', title: 'The Whole Spice Bloom', desc: 'Cumin, Cinnamon, Clove, and Bay Leaf' },
                  { img: 'The Essential Spice Blend.jpg', title: 'The Essential Spice Blend', desc: 'Chilli, Turmeric, Coriander, and Pepper' },
                  { img: 'The Creamy Secret.jpg', title: 'The Creamy Secret', desc: 'A touch of Cashews' },
                  { img: 'Zero Additives.jpg', title: 'Zero Additives', desc: '100% preservative-free and fresh-chilled' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-left shrink-0">
                    <div className="w-[80px] h-[80px] flex-shrink-0 flex items-center justify-center bg-white rounded-xl border-[2px] border-[rgb(247,0,52)] overflow-hidden shadow-sm">
                      <div className="relative w-full h-full">
                        <Image
                          src={`/images/${item.img}`}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col leading-tight min-w-[150px]">
                      <h4 className="font-arpona font-bold text-[16px]" style={{ color: 'rgb(21, 107, 54)' }}>
                        {item.title}
                      </h4>
                      <p className="font-arpona font-normal text-[14px]" style={{ color: 'rgb(12, 61, 27)' }}>
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
                      <span className="text-white font-bold text-[23px] font-arpona tracking-wider">
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
                    <h2 className="font-kura leading-[1.0] text-[55px] lg:text-[65px] m-0 p-0 uppercase" style={{ color: 'rgb(21, 107, 54)' }}>
                      Our Slow-Cooked
                    </h2>
                    <h2 className="font-kura leading-[1.0] text-[55px] lg:text-[65px] m-0 p-0 uppercase whitespace-nowrap" style={{ color: 'rgb(247, 0, 52)' }}>
                      Secret
                    </h2>
                  </div>

                  {/* Subtitle */}
                  <p className="max-w-2xl font-arpona font-normal leading-[1.4] text-[22px]" style={{ color: 'rgb(21, 107, 54)' }}>
                    Every batch is tested and every ingredient is printed.<br />
                    No shortcuts, just real food.
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
                  { img: 'Fresh Onions & Tomatoes.jpg', title: 'Fresh Onions & Tomatoes', desc: 'Slow-fried to golden perfection for a rich, robust base.' },
                  { img: 'The Whole Spice Bloom.jpg', title: 'The Whole Spice Bloom', desc: 'Cumin, Cinnamon, Clove, and Bay Leaf roasted for deep aroma.' },
                  { img: 'The Essential Spice Blend.jpg', title: 'The Essential Spice Blend', desc: 'Chilli, Turmeric, Coriander, and Pepper for authentic home-style depth.' },
                  { img: 'The Creamy Secret.jpg', title: 'The Creamy Secret', desc: 'A touch of Cashews for a velvety, restaurant-style finish.' },
                  { img: 'Zero Additives.jpg', title: 'Zero Additives', desc: '100% preservative-free and fresh-chilled to lock in natural flavor.' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-8">
                    <div className="w-[117px] h-[119px] flex-shrink-0 flex items-center justify-center bg-white rounded-2xl border-[3px] border-[rgb(247,0,52)] overflow-hidden shadow-sm">
                      <div className="relative w-[110px] h-[110px]">
                        <Image
                          src={`/images/${item.img}`}
                          alt={item.title}
                          fill
                          className="object-cover rounded-xl"
                        />
                      </div>
                    </div>
                    {/* Ingredient Text */}
                    <div className="flex flex-col gap-1">
                      <h4 className="font-arpona font-bold text-[26px] leading-[1.1] whitespace-nowrap" style={{ color: 'rgb(21, 107, 54)' }}>
                        {item.title}
                      </h4>
                      <p className="font-arpona font-normal text-[20px] leading-[1.2]" style={{ color: 'rgb(12, 61, 27)' }}>
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
        <section id="quality" className="w-full relative pt-4 md:pt-12 pb-8 md:pb-12 flex flex-col items-center overflow-hidden" style={{ backgroundColor: 'rgb(239, 238, 230)' }}>
          <div className="w-full max-w-[1600px] mx-auto pl-2 pr-4 md:pl-4 md:pr-8 flex flex-col items-center relative z-10 pt-0 pb-12">

            <h2 className="font-kura font-normal text-[34px] md:text-[60px] m-0 p-0 leading-[1.1] text-center tracking-wide uppercase mb-8 md:mb-16">
              <span style={{ color: 'rgb(247, 0, 52)' }}>Our Quality </span>
              <span style={{ color: 'rgb(21, 107, 54)' }}>Promise</span>
            </h2>

            <div className="w-full overflow-hidden py-3 md:py-5">
              <div className="flex w-max animate-marquee items-center gap-10 md:gap-16 whitespace-nowrap">
                {[...qualityPromises, ...qualityPromises].map((item, idx) => (
                  <div key={`${item.text}-${idx}`} className="flex items-center gap-3 md:gap-5 py-1 shrink-0">
                    <div className="w-[46px] h-[46px] md:w-[58px] md:h-[58px] bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm relative overflow-hidden">
                      <div className="relative w-[30px] h-[30px] md:w-[40px] md:h-[40px]" style={item.icon === 'leaf.svg' ? { filter: 'brightness(0) invert(34%) sepia(35%) saturate(1048%) hue-rotate(97deg) brightness(93%) contrast(92%)' } : {}}>
                        <Image
                          src={`/images/${item.icon}`}
                          alt={item.text}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <span className="font-arpona font-normal text-[18px] md:text-[25px] leading-none" style={{ color: 'rgb(21, 107, 54)' }}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
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
              <div className="md:hidden relative w-[280px] h-[48px] mb-6">
                <div className="absolute inset-0 rounded-full" style={{ backgroundColor: 'rgb(247, 216, 13)' }} />
                <div className="absolute inset-0 border-[1.5px] border-[#f70034] rounded-full flex items-center justify-center">
                  <span className="font-arpona font-bold text-[13px] leading-none text-center" style={{ color: 'rgb(21, 107, 54)' }}>
                    Make 20+ recipes with one gravy.
                  </span>
                </div>
              </div>

              {/* Desktop Pill (hidden md:block) */}
              <div className="hidden md:block relative w-[420px] h-[83px] mb-10">
                <div className="absolute left-[0.76px] top-[7.36px] w-[415px] h-[67px] rounded-[100px]">
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
                <span className="absolute inset-0 flex items-center justify-center font-arpona font-semibold text-[18px] leading-none tracking-normal" style={{ color: 'rgb(21, 107, 54)' }}>
                  Make 20+ recipes with one gravy.
                </span>
              </div>

              {/* Main Heading */}
              <div className="mb-6 md:mb-10 flex flex-col md:flex-row items-center md:items-baseline justify-center gap-1.5 md:gap-4 whitespace-nowrap">
                <h2 className="font-kura text-[25px] md:text-[85px] leading-[0.9]" style={{ color: 'rgb(247, 216, 13)' }}>
                  Your little shortcut
                </h2>
                <h2 className="font-kura text-[25px] md:text-[85px] leading-[0.9] text-white">
                  to cooking.
                </h2>
              </div>

              {/* Subtext */}
              <div className="text-white text-[16px] md:text-[25px] font-arpona font-normal leading-[1.3] max-w-4xl pl-2 pr-4 md:pl-3 md:pr-6 opacity-90">
                <p>Just switch your ingredients and create</p>
                <p>a whole new dish each time.</p>
              </div>
            </div>
          </div>

          {/* Bottom Half - Light Cream Background */}
          <div
            className="w-full pt-4 md:pt-12 pb-2 md:pb-20 flex flex-col items-center"
            style={{ backgroundColor: 'rgb(239, 238, 230)' }}
          >
            {/* Vegetarian Category */}
            <div className="w-full max-w-[1600px] mx-auto pl-2 pr-4 md:pl-4 md:pr-8 flex items-center gap-3 md:gap-8 mb-8 md:mb-12 opacity-80">
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
            <div className="w-full max-w-[1600px] mx-auto pl-2 pr-4 md:pl-4 md:pr-8 flex overflow-x-auto no-scrollbar md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
              {[
                { title: "Paneer Butter Masala", desc: "Rich, creamy, restaurant style classic.", image: "/images/Panner masala.jpg" },
                { title: "Paneer Do Pyaza", desc: "Bold, onion forward, perfectly balanced flavours.", image: "/images/paneer-pyaza-is-popular-punjabi-vegetarian-recipe-using-cubes-cottage-cheese-with-lots-onion-gravy.jpg" },
                { title: "Chole Masala", desc: "Hearty, spiced, homestyle comfort.", image: "/images/chole.jpg" },
                { title: "Veg Kolhapuri", desc: "Fiery, robust, flavour packed gravy.", image: "/images/Kolhapuri.jpg" }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col group items-start shrink-0 w-[175px] md:w-auto">
                  <div className="relative w-full aspect-[4/5] rounded-[15px] md:rounded-[30px] overflow-hidden mb-4 md:mb-8 shadow-md md:shadow-xl">
                    <Image
                      src={item.image}
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
                      <span className="text-[10px] md:text-[18px] font-arpona font-normal tracking-wide" style={{ color: 'rgb(21, 107, 54)' }}>
                        Indian classic
                      </span>
                    </div>
                    <h3 className="font-arpona font-bold text-[16px] md:text-[30px] leading-tight tracking-normal mb-2 md:mb-3" style={{ color: 'rgb(247, 0, 52)' }}>
                      {item.title}
                    </h3>
                    <p className="font-arpona text-[12px] md:text-[18px] leading-relaxed tracking-normal font-normal max-w-full" style={{ color: 'rgb(21, 107, 54)' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Non-Vegetarian Category */}
            <div className="w-full max-w-[1600px] mx-auto pl-2 pr-4 md:pl-4 md:pr-8 flex items-center gap-3 md:gap-8 mt-16 md:mt-24 mb-8 md:mb-12 opacity-80">
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
            <div className="w-full max-w-[1600px] mx-auto pl-2 pr-4 md:pl-4 md:pr-8 flex overflow-x-auto no-scrollbar md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 mb-16 md:mb-32">
              {[
                { title: "Butter Chicken", desc: "Smooth, buttery, indulgent favourite.", image: "/images/Butter Chicken.jpg" },
                { title: "Chicken Curry", desc: "Homestyle, well spiced, everyday classic.", image: "/images/chiken curry.jpg" },
                { title: "Egg Masala (Motta Curry)", desc: "Thick, masaledar, deeply satisfying.", image: "/images/anda-curry-egg-masala-gravy-indian-spicy-food-recipe-served-with-jeera-rice-roti-naan-selective-focus-colourful-wooden-table-top.jpg" },
                { title: "Mutton Sukka Gravy", desc: "Rich, intense, slow cooked flavours.", image: "/images/Mutton Sukka Gravy.jpg" }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col group items-start shrink-0 w-[175px] md:w-auto">
                  <div className="relative w-full aspect-[4/5] rounded-[15px] md:rounded-[30px] overflow-hidden mb-4 md:mb-8 shadow-md md:shadow-xl">
                    <Image
                      src={item.image}
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
                      <span className="text-[10px] md:text-[18px] font-arpona font-normal tracking-wide" style={{ color: 'rgb(21, 107, 54)' }}>
                        Indian classic
                      </span>
                    </div>
                    <h3 className="font-arpona font-bold text-[16px] md:text-[30px] leading-tight tracking-normal mb-2 md:mb-3" style={{ color: 'rgb(247, 0, 52)' }}>
                      {item.title}
                    </h3>
                    <p className="font-arpona text-[12px] md:text-[18px] leading-relaxed tracking-normal font-normal max-w-full" style={{ color: 'rgb(21, 107, 54)' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Banner Section */}
            <div
              className="w-[calc(100%-32px)] md:w-full max-w-[1600px] mx-auto rounded-[15px] pl-2 pr-4 md:pl-4 md:pr-8 py-6 md:py-10 flex flex-row items-center justify-between gap-4 mb-4 md:mb-10 overflow-hidden relative"
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
                className="bg-[#f70034] text-white px-4 md:px-10 py-2.5 md:py-5 rounded-full font-arpona font-bold text-[11px] md:text-[30px] shadow-lg hover:bg-black transition-all whitespace-nowrap z-10 shrink-0"
              >
                Order Your Pouch
              </button>
            </div>
          </div>
        </section>

        {/* Manufacturing Process Section */}
        <section id="process" className="w-full pt-0 md:pt-0 pb-20 md:pb-32 flex flex-col items-center" style={{ backgroundColor: 'rgb(239, 238, 230)' }}>
          <div className="w-full max-w-[1600px] mx-auto pl-2 pr-4 md:pl-4 md:pr-8 flex flex-col items-center">

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
                <span className="absolute inset-0 flex items-center justify-center font-arpona font-bold text-[14px] text-white uppercase tracking-wide">
                  How we make it
                </span>
              </div>
              <h2 className="font-kura text-[21px] leading-tight mb-1 uppercase whitespace-nowrap">
                <span style={{ color: 'rgb(247, 0, 52)' }}>Every dish starts </span>
                <span style={{ color: 'rgb(21, 107, 54)' }}>with GrabV</span>
              </h2>
              <p className="text-[12px] font-arpona font-normal opacity-90 max-w-[280px]" style={{ color: 'rgb(21, 107, 54)' }}>
                Order yours now!
              </p>
            </div>

            {/* Desktop Header (hidden md:flex) */}
            <div className="hidden md:flex flex-col items-center text-center mb-8 w-full">
              <div className="relative w-[282px] h-[75px] mb-10">
                <div className="absolute left-[0.69px] top-[6.46px] w-[277.615px] h-[60px] rounded-[100px]">
                  <Image src="/images/red rectangle.svg" alt="" fill className="pointer-events-none object-fill" />
                </div>
                <Image src="/images/green border.svg" alt="" fill className="pointer-events-none object-contain" />
                <span className="absolute inset-0 flex items-center justify-center font-arpona font-semibold text-[18px] leading-none tracking-normal text-white">
                  How we make it
                </span>
              </div>
              <h2 className="font-kura text-[85px] leading-[0.9] mb-4 uppercase">
                <span style={{ color: 'rgb(247, 0, 52)' }}>Every dish starts </span>
                <span style={{ color: 'rgb(21, 107, 54)' }}>with GrabV</span>
              </h2>
              <div className="max-w-4xl text-[18px] md:text-[25px] font-arpona font-normal leading-[1.4] tracking-normal text-center mb-12 px-6 opacity-90" style={{ color: 'rgb(21, 107, 54)' }}>
                Order yours now!
              </div>
            </div>

            {/* Mobile Vertical Timeline (md:hidden) */}
            <div className="md:hidden w-full relative flex flex-col items-center gap-6 px-4">
              <div className="relative flex flex-col gap-6 items-start w-fit -ml-6">
                {[
                  { step: 1, title: "Cooked in small batches", desc: "" },
                  { step: 2, title: "Clean and hygienic preparation", desc: "" },
                  { step: 3, title: "Stored and delivered through cold chain", desc: "" },
                  { step: 4, title: "Quality checked at every stage", desc: "" },
                  { step: 5, title: "No preservatives added", desc: "" },
                  { step: 6, title: "100% veg base gravy", desc: "" }
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-6 relative">
                    {/* Connecting Line - Correctly scoped to bridge the gap */}
                    {item.step !== 6 && (
                      <div className="absolute top-[22px] left-[47px] w-[2px] h-[calc(100%+24px)] bg-[rgb(247,216,13)] z-0" />
                    )}

                    <div className="flex flex-col items-center shrink-0 w-[94px] relative">
                      {/* Moon Icon */}
                      <div className="relative w-full h-[44px] flex items-center justify-center mt-0.5 z-10">
                        <Image src="/images/moon.svg" alt="Step" fill className="object-contain" />
                        <span className="font-kura text-[24px] relative z-10 pt-[2px]" style={{ color: 'rgb(247, 0, 52)' }}>{item.step}</span>
                      </div>
                    </div>
                    <div className="flex flex-col text-left pr-4 justify-center h-[44px]">
                      <h4 className="font-arpona text-[17px] font-bold mb-0" style={{ color: 'rgb(247, 0, 52)' }}>{item.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Timeline (hidden md:flex) */}
            <div className="hidden md:flex w-full relative flex flex-col items-center gap-12 pt-4">
              <div className="relative flex flex-col items-start gap-12 w-fit">
                <div className="absolute left-[89px] top-[41px] bottom-[41px] w-[4px] z-0" style={{ backgroundColor: 'rgb(247, 216, 13)' }} />
                {[
                  { step: 1, title: "Cooked in small batches", desc: "" },
                  { step: 2, title: "Clean and hygienic preparation", desc: "" },
                  { step: 3, title: "Stored and delivered through cold chain", desc: "" },
                  { step: 4, title: "Quality checked at every stage", desc: "" },
                  { step: 5, title: "No preservatives added", desc: "" },
                  { step: 6, title: "100% veg base gravy", desc: "" }
                ].map((item) => (
                  <div key={item.step} className="flex items-center gap-16 relative z-10 w-full group">
                    <div className="relative shrink-0 w-[178px] h-[82px] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <Image src="/images/moon.svg" alt="Step" fill className="object-contain" />
                      <span className="font-kura text-[50px] relative z-10 pt-[4px]" style={{ color: 'rgb(247, 0, 52)' }}>{item.step}</span>
                    </div>
                    <div className="flex flex-col items-start text-left">
                      <h4 className="font-arpona text-[32px] font-semibold mb-0" style={{ color: 'rgb(21, 107, 54)' }}>{item.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
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
                <span className="absolute inset-0 flex items-center justify-center font-arpona font-bold text-[14px] leading-none tracking-normal text-[#156b36]">
                  What people are saying
                </span>
              </div>

              {/* What people are saying Pill - Desktop */}
              <div className="hidden md:block relative w-[315px] h-[83px] mb-10">
                <div className="absolute left-[0.76px] top-[7.36px] w-[310px] h-[67px] rounded-[100px] bg-[rgb(247,216,13)]" />
                <Image src="/images/red border.svg" alt="" fill className="pointer-events-none object-contain" />
                <span className="absolute inset-0 flex items-center justify-center font-arpona font-semibold text-[18px] leading-none tracking-normal" style={{ color: 'rgb(21, 107, 54)' }}>
                  What people are saying
                </span>
              </div>

              {/* Heading */}
              <h2 className="font-kura text-[32px] md:text-[85px] leading-tight mb-0 md:mb-4 text-center uppercase">
                <span className="text-white">The GrabV </span>
                <span style={{ color: 'rgb(247, 216, 13)' }}>Experience</span>
              </h2>
            </div>
          </div>

          {/* Review Cards - Horizontal scroll on mobile */}
          <div className="w-full flex flex-col items-center">
            <div className="w-full max-w-[1600px] mx-auto pl-2 pr-4 md:pl-4 md:pr-8 pt-4 md:py-20 flex overflow-x-auto no-scrollbar md:grid md:grid-cols-3 gap-6 md:gap-8 pb-8 md:pb-16">
            {[
              {
                name: "Sneha Mehta",
                location: "Bengaluru",
                text: "I recently shifted to Bengaluru, and I was craving for the home cooked flavour and that's when GrabV’s onion tomato gravy saved me!!! It was absolutely delicious.",
                rating: 5,
                image: "/images/cheerful-traditional-indian-woman-white-background-studio-shot.jpg"
              },
              {
                name: "Harshitha",
                location: "Bengaluru",
                text: "Oh mahn!! What a flavourrr… made me feel like a real chef!!",
                rating: 4.5,
                image: "/images/indian-woman-posing-cute-stylish-outfit-camera-smiling.jpg"
              },
              {
                name: "Chetana Gowda",
                location: "Bengaluru",
                text: "It is an absolute saviour to my busy days, so quick and so easy. Am stocking this up again for sure!!",
                rating: 4,
                image: "/images/stylish-indian-beard-model-man-casual-clothes-posed-outdoor-street-india.jpg"
              }
            ].map((item, idx) => (
              <div key={idx} className="relative p-4 md:p-6 rounded-[20px] bg-white flex flex-col gap-2 md:gap-4 shrink-0 w-[211px] min-h-[150px] h-auto pb-4 md:w-auto md:h-auto shadow-sm">
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
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] md:text-[20px] font-bold" style={{ color: 'rgb(21, 107, 54)' }}>{item.name}</span>
                    <span className="text-[11px] md:text-[16px] text-neutral-400">{item.location}</span>
                  </div>
                </div>
                <div className="flex gap-0.5 relative z-10">
                  {[1, 2, 3, 4, 5].map((s) => {
                    const isFull = s <= Math.floor(item.rating);
                    const isHalf = s === Math.ceil(item.rating) && item.rating % 1 !== 0;
                    return (
                      <div key={s} className="relative text-[15px] md:text-[24px] leading-none">
                        <span style={{ color: 'rgb(210, 210, 210)' }}>★</span>
                        {isFull && (
                          <span className="absolute inset-0" style={{ color: 'rgb(247, 216, 13)' }}>★</span>
                        )}
                        {isHalf && (
                          <span className="absolute inset-0 overflow-hidden w-[50%]" style={{ color: 'rgb(247, 216, 13)' }}>★</span>
                        )}
                      </div>
                    );
                  })}
                </div>
                <p className="text-[12px] md:text-[22px] leading-relaxed font-medium relative z-10 md:line-clamp-none" style={{ color: 'rgb(21, 107, 54)' }}>
                  &quot;{item.text}&quot;
                </p>
              </div>
            ))}
          </div>
        </div>
        </div>

        <div className="w-full flex flex-col items-center">
          <div
            className="w-[calc(100%-16px)] md:w-full max-w-[1600px] mx-auto min-h-[280px] md:h-[550px] rounded-[8px] pl-2 pr-4 md:pl-4 md:pr-8 py-8 md:p-24 flex flex-col items-center justify-center text-center relative overflow-hidden mb-10 shadow-xl"
            style={{ backgroundColor: 'rgb(21, 106, 55)' }}
          >

            {/* Heading - Single line for mobile */}
            <h2 className="font-kura text-[19px] md:text-[70px] leading-tight mb-4 md:mb-8 whitespace-nowrap">
              <span style={{ color: 'rgb(247, 216, 13)' }}>Ready to cook smarter </span>
              <span className="text-white">every day?</span>
            </h2>

            {/* Subtext */}
            <p className="text-white text-[16px] md:text-[28px] font-arpona font-normal tracking-wide opacity-90 mb-8 md:mb-12 max-w-4xl px-2 md:px-0 leading-relaxed md:leading-[1.3]">
              Reclaim your time with our preservative free gravy pouches.<br className="hidden md:block" /> Freshly chilled, FSSAI certified, and delivered to your door.
            </p>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-8 md:mb-12 w-full max-w-[1000px]">
              <div className="flex flex-row items-center justify-center gap-3 md:gap-8 w-full md:w-auto">
                {/* Order 750g */}
                <button className="bg-white text-[#f70034] flex-1 md:w-[260px] py-3 md:py-5 rounded-full font-arpona font-medium text-[14px] md:text-[24px] shadow-xl hover:scale-105 hover:bg-[#f70034] hover:text-white transition-all shrink-0">
                  Order 750g
                </button>

                {/* Order 250g */}
                <button className="bg-white text-[#f70034] flex-1 md:w-[260px] py-3 md:py-5 rounded-full font-arpona font-medium text-[14px] md:text-[24px] shadow-xl hover:scale-105 hover:bg-[#f70034] hover:text-white transition-all shrink-0">
                  Order 250g
                </button>
              </div>

              {/* WhatsApp - Tertiary */}
              <button className="bg-white text-[#f70034] w-[180px] md:w-[260px] py-2.5 md:py-5 rounded-full font-arpona font-normal text-[14px] md:text-[24px] shadow-xl hover:scale-105 hover:bg-[#f70034] hover:text-white transition-all group flex items-center justify-center gap-2 md:gap-4 shrink-0">
                <div className="w-5 h-5 md:w-8 md:h-8 relative group-hover:brightness-0 group-hover:invert transition-all">
                  <Image src="/images/whatsapp.svg" alt="WhatsApp" fill className="object-contain" />
                </div>
                <span>WhatsApp us</span>
              </button>
            </div>

            {/* Footer text */}

          </div>
        </div>
      </main>

      {/* New Grid Footer Section */}
      <footer className="w-full py-12 md:py-16 pl-3 pr-6 md:pl-4 md:pr-8" style={{ backgroundColor: 'rgb(21, 107, 54)' }}>
        <div className="max-w-[1600px] mx-auto">
          {/* Mobile Footer (Figma Style) */}
          <div className="md:hidden grid grid-cols-2 gap-x-8 gap-y-10">
            {/* Col 1: Brand & Company */}
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
                  <Link href="#">Contact Us</Link>
                </div>
              </div>
            </div>

            {/* Col 2: Policies & Products */}
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
                  <Link href="/all-purposegravy">Ingredients</Link>
                  <Link href="/all-purposegravy">How to Use</Link>
                  <Link href="#">Recipes</Link>
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
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Column 1: Brand & Socials (No Box) */}
            <div className="p-0 flex flex-col w-full md:w-[299px] h-auto md:h-[234px] justify-between">
              <div className="flex flex-col">
                <div className="w-[110px] h-[55px] relative mb-4">
                  <Image src="/images/logo.svg" alt="GrabV Logo" fill className="object-contain object-left" />
                </div>
                <div className="flex flex-col gap-1 text-[14px] md:text-[16px] font-medium leading-tight font-arpona" style={{ color: 'rgb(247, 216, 13)' }}>
                  <p>© 2026 GrabV. All rights reserved.</p>
                </div>
              </div>

              <div className="flex flex-col items-start gap-3 mt-auto">
                <span className="text-[14px] md:text-[16px] font-bold font-arpona text-white">Follow Us</span>
                <div className="flex items-center gap-5">
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

            {/* Column 2: Company Box */}
            <div className="rounded-[20px] md:rounded-[30px] p-6 flex flex-col w-full md:w-[299px] h-auto md:h-[234px]" style={{ backgroundColor: 'rgb(55, 122, 49)' }}>
              <h4 className="text-[18px] md:text-[22px] font-bold mb-3 md:mb-4" style={{ color: 'rgb(247, 216, 13)' }}>Company</h4>
              <div className="flex flex-col gap-2 text-[16px] md:text-[18px] font-medium font-arpona leading-tight" style={{ color: 'rgb(247, 216, 13)' }}>
                <Link href="/ourstory" className="hover:opacity-80 transition-opacity">Our Story</Link>
                <Link href="/#process" className="hover:opacity-80 transition-opacity">Process</Link>
                <Link href="/#quality" className="hover:text-[rgb(247,216,13)] transition-colors">Quality Promise</Link>
                <Link href="#" className="hover:opacity-80 transition-opacity">Contact Us</Link>
              </div>
            </div>

            {/* Column 3: Product Box */}
            <div className="rounded-[20px] md:rounded-[30px] p-6 flex flex-col w-full md:w-[299px] h-auto md:h-[234px]" style={{ backgroundColor: 'rgb(55, 122, 49)' }}>
              <h4 className="text-[18px] md:text-[22px] font-bold mb-3 md:mb-4" style={{ color: 'rgb(247, 216, 13)' }}>Product</h4>
              <div className="flex flex-col gap-2 text-[16px] md:text-[18px] font-medium font-arpona leading-tight" style={{ color: 'rgb(247, 216, 13)' }}>
                <Link href="/all-purposegravy" className="hover:opacity-80 transition-opacity">All Purpose Gravy</Link>
                <Link href="/all-purposegravy" className="hover:opacity-80 transition-opacity">Ingredients</Link>
                <Link href="/all-purposegravy" className="hover:opacity-80 transition-opacity">How to Use</Link>
                <Link href="#" className="hover:opacity-80 transition-opacity">Recipes</Link>
              </div>
            </div>

            {/* Column 4: Orders & Policies Box */}
            <div className="rounded-[20px] md:rounded-[30px] p-6 flex flex-col w-full md:w-[299px] h-auto md:h-[234px]" style={{ backgroundColor: 'rgb(55, 122, 49)' }}>
              <h4 className="text-[18px] md:text-[22px] font-bold mb-3 md:mb-4" style={{ color: 'rgb(247, 216, 13)' }}>Order & Policies</h4>
              <div className="flex flex-col gap-2 text-[16px] md:text-[18px] font-medium font-arpona leading-tight" style={{ color: 'rgb(247, 216, 13)' }}>
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

"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const HERO_FRAME_COUNT = 490;
const HERO_SCROLL_DISTANCE = 2200;
const HERO_PRELOAD_RADIUS = 8;
const HERO_FRAME_EASE = 0.18;
const HERO_FRAME_PATH = (frame: number) =>
  `/images/hero video/frames/frame_${String(frame).padStart(4, "0")}.jpg`;

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);
  const heroCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const qualityPromises = [
    { text: "100% Vegan", icon: "leaf.svg" },
    { text: "Batch Tested", icon: "Batch tested.svg" },
    { text: "FSSAI", icon: "FSSAI (1).svg" },
    { text: "No Artificial Colours", icon: "No artificial colours.svg" },
    { text: "Zero Preservatives", icon: "Zero Preservatives (1).svg" },
  ];

  useEffect(() => {
    const hero = heroRef.current;
    const canvas = heroCanvasRef.current;

    if (!hero || !canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const images = new Map<number, HTMLImageElement>();
    let currentFrame = -1;
    let currentProgress = 0;
    let targetProgress = 0;
    let animationFrame: number | null = null;
    let isCancelled = false;
    let hasSyncedInitialProgress = false;

    const drawFrame = (image: HTMLImageElement) => {
      if (!image.naturalWidth || !image.naturalHeight) {
        return;
      }

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imageRatio = image.naturalWidth / image.naturalHeight;
      const canvasRatio = canvasWidth / canvasHeight;

      let drawWidth = canvasWidth;
      let drawHeight = canvasHeight;
      let drawX = 0;
      let drawY = 0;

      if (imageRatio > canvasRatio) {
        drawWidth = canvasHeight * imageRatio;
        drawX = (canvasWidth - drawWidth) / 2;
      } else {
        drawHeight = canvasWidth / imageRatio;
        drawY = (canvasHeight - drawHeight) / 2;
      }

      context.clearRect(0, 0, canvasWidth, canvasHeight);
      context.drawImage(image, drawX, drawY, drawWidth, drawHeight);
    };

    const loadFrame = (frame: number) => {
      const boundedFrame = Math.min(HERO_FRAME_COUNT, Math.max(1, frame));
      const existingImage = images.get(boundedFrame);

      if (existingImage) {
        return existingImage;
      }

      const image = new window.Image();
      image.decoding = "async";
      image.src = HERO_FRAME_PATH(boundedFrame);
      image.onload = () => {
        if (!isCancelled && boundedFrame === currentFrame) {
          drawFrame(image);
        }
      };
      images.set(boundedFrame, image);

      return image;
    };

    const preloadFramesAround = (frame: number) => {
      const endFrame = Math.min(HERO_FRAME_COUNT, frame + HERO_PRELOAD_RADIUS);

      for (let nextFrame = frame; nextFrame <= endFrame; nextFrame += 1) {
        loadFrame(nextFrame);
      }
    };

    const resizeCanvas = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();

      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
    };

    const updateScrollState = () => {
      const heroTop = hero.offsetTop;
      const heroBottom = heroTop + hero.offsetHeight;
      targetProgress = Math.min(1, Math.max(0, (window.scrollY - heroTop) / HERO_SCROLL_DISTANCE));
      const releasePoint = heroBottom - window.innerHeight;
      const isPinned = window.scrollY >= heroTop && window.scrollY < releasePoint;
      const absoluteTop = window.scrollY < heroTop ? 0 : Math.max(0, hero.offsetHeight - window.innerHeight);

      canvas.style.position = isPinned ? "fixed" : "absolute";
      canvas.style.top = isPinned ? "0" : `${absoluteTop}px`;

      if (!hasSyncedInitialProgress) {
        currentProgress = targetProgress;
        hasSyncedInitialProgress = true;
      }
    };

    const renderScrollFrame = () => {
      animationFrame = null;
      currentProgress += (targetProgress - currentProgress) * HERO_FRAME_EASE;

      if (Math.abs(targetProgress - currentProgress) < 0.001) {
        currentProgress = targetProgress;
      }

      const nextFrame = Math.min(
        HERO_FRAME_COUNT,
        Math.max(1, Math.floor(currentProgress * (HERO_FRAME_COUNT - 1)) + 1),
      );

      if (nextFrame !== currentFrame) {
        currentFrame = nextFrame;
        const image = loadFrame(nextFrame);
        preloadFramesAround(nextFrame + 1);

        if (image.complete && image.naturalWidth > 0) {
          drawFrame(image);
        }
      }

      if (currentProgress !== targetProgress) {
        animationFrame = window.requestAnimationFrame(renderScrollFrame);
        return;
      }
    };

    const requestRender = () => {
      updateScrollState();

      if (animationFrame !== null) {
        return;
      }

      animationFrame = window.requestAnimationFrame(renderScrollFrame);
    };

    const handleResize = () => {
      resizeCanvas();
      currentFrame = -1;
      hasSyncedInitialProgress = false;
      requestRender();
    };

    resizeCanvas();
    preloadFramesAround(1);
    requestRender();

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas);

    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      isCancelled = true;
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
      resizeObserver.disconnect();
      window.removeEventListener("scroll", requestRender);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full font-arpona overflow-x-hidden" style={{ backgroundColor: 'rgb(239, 238, 230)' }}>

      {/* Navbar Section */}
      <header
        style={{ backgroundColor: 'rgb(12, 61, 27)' }}
        className="fixed top-0 z-[100] w-full flex-shrink-0 shadow-md"
      >
        <div className="w-full px-4 md:px-[120px] h-[70px] md:h-[110px] flex items-center justify-between">
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

            {/* Logo */}
            <div className="flex items-center">
              <Image
                src="/images/logo.svg"
                alt="GrabV Logo"
                width={200}
                height={80}
                className="w-auto h-8 md:h-[70px]"
                priority
              />
            </div>
          </div>

          {/* Desktop Nav - Hidden on Mobile and Tablet */}
          <nav className="hidden lg:flex flex-1 justify-center items-center gap-12 xl:gap-[110px] text-white font-medium px-12">
            <Link href="/" className="hover:text-[rgb(247,216,13)] transition-colors text-[26px]">Home</Link>
            <Link href="/recipes" className="hover:text-[rgb(247,216,13)] transition-colors text-[26px]">Recipes</Link>
            <Link href="/products" className="hover:text-[rgb(247,216,13)] transition-colors text-[26px]">Products</Link>
            <Link href="/ourstory" className="hover:text-[rgb(247,216,13)] transition-colors text-[26px] whitespace-nowrap">Our Story</Link>
            <Link href="/contact" className="hover:text-[rgb(247,216,13)] transition-colors text-[26px] whitespace-nowrap">Contact Us</Link>
            <Link href="/faq" className="hover:text-[rgb(247,216,13)] transition-colors text-[26px]">FAQ</Link>
          </nav>

          <button
            style={{
              borderRadius: '5px',
              backgroundColor: 'rgb(247, 216, 13)',
              color: 'rgb(12, 61, 27)',
              letterSpacing: '0.05em'
            }}
            className="font-arpona font-bold flex items-center justify-center hover:bg-yellow-400 transition-colors shrink-0 text-[12px] md:text-[22px] w-[85px] md:w-[170px] h-[30px] md:h-[48px]"
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
              <Link href="/products" onClick={() => setIsMenuOpen(false)} className="hover:text-[rgb(247,216,13)] transition-colors">Products</Link>
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

      {/* Main Container - Full Width */}
      <main className="w-full relative flex flex-col">

        <section
          ref={heroRef}
          className="relative z-10 w-full overflow-hidden bg-[rgb(12,61,27)]"
          style={{ height: `calc(${HERO_SCROLL_DISTANCE}px + 100svh)` }}
        >
          <canvas
            ref={heroCanvasRef}
            className="left-0 z-10 block h-svh w-full bg-[rgb(12,61,27)]"
            aria-label="GrabV hero video"
          />
        </section>

        {/* Freshly Made Product Section */}
        <section className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#FBF5E1' }}>
          {/* Background Text Overlay */}
          <div className="absolute left-[120px] right-[120px] inset-y-0 flex flex-col justify-center pointer-events-none select-none z-0 overflow-hidden font-kura uppercase tracking-[-0.08em] drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)]" style={{ color: 'rgb(21, 107, 54)' }}>
            <div className="relative w-full h-[138px] mb-4 whitespace-nowrap text-[138px] leading-[1.0]">
              <span className="absolute left-0">FRESHLY MADE</span>
              <span className="absolute right-0">FRESHLY MADE</span>
            </div>
            <div className="relative w-full h-[138px] mb-4 whitespace-nowrap text-[138px] leading-[1.0]">
              <span className="absolute left-0">100 % VEG</span>
              <span className="absolute right-[80px]">100 % VEG</span>
            </div>
            <div className="relative w-full h-[138px] mb-4 whitespace-nowrap text-[138px] leading-[1.0]">
              <span className="absolute left-0">FSSAI CERTIFIED</span>
              <span className="absolute right-[40px]">FSSAI CERTIFIED</span>
            </div>
            <div className="relative w-full h-[138px] mb-4 whitespace-nowrap text-[138px] leading-[1.0]">
              <span className="absolute left-0">READY IN 10 MINS</span>
              <span className="absolute right-[40px]">READY IN 10 MINS</span>
            </div>
            <div className="relative w-full h-[138px] whitespace-nowrap text-[138px] leading-[1.0]">
              <span className="absolute left-0">REAL INGREDIENTS</span>
              <span className="absolute right-0">REAL INGREDIENTS</span>
            </div>
          </div>

          {/* Product Image */}
          <div className="relative z-10 w-[900px] h-[913px] translate-y-6">
            <Image
              src="/images/HomePage/product package 1.png"
              alt="GrabV Product Package"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>

          {/* Bottom Left Text */}
          <div className="absolute bottom-20 left-[120px] z-20 flex flex-col font-arpona text-[28px] leading-[1.0] tracking-[-0.05em] font-medium text-black">
            <span>Veg or non-veg</span>
            <span>Possibilities are endless</span>
          </div>

          {/* Bottom Right Text */}
          <div className="absolute bottom-20 right-[120px] z-20 flex flex-col font-arpona text-[28px] leading-[1.0] tracking-[-0.05em] font-medium text-black text-right">
            <span>Just add in the gravy</span>
            <span>And enjoy your meal</span>
          </div>
        </section>

        {/* Pouch to Plate Section */}
        <section className="relative w-full flex flex-col items-center pt-24 pb-32 overflow-hidden" style={{ backgroundColor: '#FBF5E1' }}>
          
          {/* Top text */}
          <p className="font-arpona text-[24px] md:text-[30px] leading-[1.0] tracking-[-0.05em] font-medium text-black mb-10 text-center z-10">
            No Chopping. No Stress. Just Real Food.
          </p>

          {/* Huge Heading */}
          <div className="relative font-kura uppercase text-[120px] md:text-[300px] leading-[0.85] tracking-[-0.02em] text-center w-full flex justify-center drop-shadow-xl z-10">
            {/* Outline layer */}
            <div className="absolute inset-0 flex justify-center text-transparent z-0" style={{ WebkitTextStroke: '24px rgb(247, 216, 13)' }}>
              <div>POUCH TO<br/>PLATE IN 5<br/>STEPS</div>
            </div>
            {/* Fill layer */}
            <div className="relative z-10" style={{ color: 'rgb(21, 107, 54)' }}>
              <div>POUCH TO<br/>PLATE IN 5<br/>STEPS</div>
            </div>
          </div>

          {/* Steps Container */}
          <div className="w-full mt-24 pl-[120px] pr-0 flex gap-[50px] overflow-x-auto pb-16 pt-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            
            {/* Step 1 */}
            <div className="w-[600px] md:w-[900px] flex-shrink-0 snap-start flex flex-col">
               <img src="/images/HomePage/cooking img1.png" className="w-full h-auto block" alt="Step 1" />
               <p className="mt-10 ml-8 font-arpona text-[35px] tracking-[-0.05em] font-medium text-black">
                 Add your tempering (tadka) in oil.
               </p>
            </div>

            {/* Step 2 */}
            <div className="w-[600px] md:w-[900px] flex-shrink-0 snap-start flex flex-col">
               <img src="/images/HomePage/cooking img2.png" className="w-full h-auto block" alt="Step 2" />
               <p className="mt-10 ml-8 font-arpona text-[35px] tracking-[-0.05em] font-medium text-black">
                 Sauté veggies or protein of your choice.
               </p>
            </div>

          </div>
        </section>

        {/* Our Products Section */}
        <section className="relative w-full flex flex-col items-center min-h-[900px] overflow-hidden -mt-10">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image src="/images/HomePage/red bg.png" alt="Red torn background" fill className="object-fill" />
          </div>

          {/* Huge Heading */}
          <div className="relative z-10 font-kura uppercase leading-[0.8] tracking-[-0.02em] text-center flex flex-col items-center drop-shadow-[0_15px_15px_rgba(0,0,0,0.3)] pt-[250px] pb-32">
            
            {/* Outline layer */}
            <div className="absolute inset-0 flex flex-col items-center pt-[250px] text-transparent z-0 pointer-events-none" style={{ WebkitTextStroke: '28px rgb(21, 107, 54)' }}>
              <div className="text-[150px] md:text-[300px]">OUR</div>
              <div className="text-[150px] md:text-[300px]">PRODUCTS</div>
            </div>

            {/* Fill layer */}
            <div className="relative z-10 flex flex-col items-center" style={{ color: 'rgb(247, 216, 13)' }}>
              <div className="text-[150px] md:text-[300px]">OUR</div>
              <div className="relative text-[150px] md:text-[300px]">
                PRODUCTS
                {/* Grab Your Packs text */}
                <div className="absolute top-[-25%] right-8 font-arpona text-[28px] tracking-[-0.05em] font-medium text-white normal-case tracking-normal drop-shadow-none pointer-events-none" style={{ WebkitTextStroke: '0', textShadow: 'none' }}>
                  Grab Your Packs
                </div>
              </div>
            </div>

          </div>

          {/* Product Images */}
          <div className="w-full pl-[120px] pr-0 pb-48 mt-12 flex flex-col md:flex-row justify-between items-center gap-24 relative z-10 overflow-visible">
            
            <div className="relative inline-block flex-shrink-0">
              <img src="/images/HomePage/product1.png" className="h-[450px] md:h-[820px] w-auto object-contain block" alt="Product 1" />
              
              <div className="absolute top-[28%] left-[64%] w-[36%] flex flex-col items-start text-black font-arpona">
                <h3 className="text-[34px] md:text-[55px] leading-[0.98] tracking-[-0.05em] font-bold">
                  ONION<br/>TOMATO<br/>GRAVY
                </h3>
                
                <div className="mt-4 md:mt-7 flex flex-col gap-1 md:gap-1 text-[15px] md:text-[26px] font-medium tracking-tight">
                  <p>Zero Added Preservatives</p>
                  <p>All Purpose Gravy</p>
                  <p>Slow Cooked</p>
                </div>
                
                <button className="mt-6 md:mt-10 bg-[rgb(247,216,13)] text-black px-4 py-1.5 md:px-7 md:py-2 rounded-[6px] font-medium text-[15px] md:text-[20px] hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2 shadow-sm whitespace-nowrap">
                  View Product
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5 ml-1">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className="relative inline-block flex-shrink-0 md:translate-x-0">
              <img src="/images/HomePage/product2.png" className="h-[450px] md:h-[820px] w-auto object-contain block" alt="Product 2" />
            </div>
          </div>

          {/* See more button */}
          <div className="w-full flex justify-end pr-[120px] pb-32 relative z-10 -mt-24">
            <button className="bg-[rgb(247,216,13)] text-black px-10 py-3 rounded-[6px] font-bold text-[24px] hover:bg-yellow-400 transition-colors shadow-sm tracking-tight font-arpona">
              See more
            </button>
          </div>

        </section>

        {/* How We Do It Section */}
        <section className="relative w-full flex flex-col items-center pt-24 pb-48 overflow-visible z-0" style={{ backgroundColor: '#FBF5E1' }}>
          
          {/* Huge Heading (In Front) */}
          <div className="relative z-10 font-kura uppercase leading-[0.85] tracking-[-0.02em] text-center flex flex-col items-center drop-shadow-lg w-full">
            <div className="relative text-[100px] md:text-[300px]">
              <span className="absolute inset-0 text-transparent pointer-events-none z-0" style={{ WebkitTextStroke: '20px rgb(247, 216, 13)' }}>HOW</span>
              <span className="relative z-10" style={{ color: 'rgb(21, 107, 54)' }}>HOW</span>
            </div>
            <div className="relative text-[100px] md:text-[300px]">
              <span className="absolute inset-0 text-transparent pointer-events-none z-0" style={{ WebkitTextStroke: '20px rgb(247, 216, 13)' }}>WE DO IT</span>
              <span className="relative z-10" style={{ color: 'rgb(21, 107, 54)' }}>WE DO IT</span>
            </div>
          </div>

          {/* Gravy Pouring Image (Behind Text) */}
          <div className="relative w-full max-w-[1150px] flex justify-center mt-[-100px] md:mt-[-650px] z-0 pointer-events-none">
            <img src="/images/HomePage/Gravy pouring.svg" className="w-[120%] md:w-full max-w-none md:max-w-full h-auto object-contain drop-shadow-2xl translate-x-[10%] md:translate-x-[45%]" alt="Gravy Pouring" />

            {/* Cards Overlay */}
            <div className="absolute inset-0 pointer-events-auto flex justify-center">
              <div className="relative w-full max-w-[1150px] h-full translate-x-[10%] md:translate-x-[20%]">
                
                {/* Card 1: Fresh Onions & Tomatoes (Top Left, near stream) */}
                <div className="absolute top-[48%] left-[40%] md:top-[36%] md:left-[38%] w-[200px] md:w-[600px] -translate-x-1/2 -rotate-[2deg]">
                  <img src="/images/HomePage/card.png" className="w-full h-auto drop-shadow-xl" alt="Card Background" />
                  <div className="absolute inset-0 px-[15%] pt-[14%] pb-[12%] flex flex-col justify-center items-center text-center text-black font-arpona -rotate-[4deg]">
                    <h4 className="font-bold text-[16px] md:text-[34px] tracking-[-0.05em] leading-tight mb-3">Fresh Onions<br/>& Tomatoes</h4>
                    <p className="font-medium text-[11px] md:text-[24px] tracking-[-0.05em] leading-snug underline decoration-2 underline-offset-4 decoration-blue-600 text-center">Slow cooked to<br/>perfection for a rich &<br/>robust base.</p>
                  </div>
                  <svg className="absolute -bottom-8 right-1/4 w-12 h-12 md:w-24 md:h-24 overflow-visible pointer-events-none" viewBox="0 0 100 100" fill="none">
                    <path d="M20,10 Q40,50 60,80" stroke="#E3002B" strokeWidth="6" strokeDasharray="12 12" strokeLinecap="round"/>
                    <path d="M35,75 L60,80 L50,55" stroke="#E3002B" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                {/* Card 2: The Creamy Secret (Top Right) */}
                <div className="absolute top-[45%] right-[20%] md:top-[38%] md:right-[2%] w-[200px] md:w-[600px] translate-x-1/2 rotate-[12deg]">
                  <img src="/images/HomePage/card.png" className="w-full h-auto drop-shadow-xl" alt="Card Background" />
                  <div className="absolute inset-0 px-[15%] pt-[14%] pb-[12%] flex flex-col justify-center items-center text-center text-black font-arpona -rotate-[4deg]">
                    <h4 className="font-bold text-[16px] md:text-[34px] tracking-[-0.05em] leading-tight mb-3">The Creamy Secret</h4>
                    <p className="font-medium text-[11px] md:text-[24px] tracking-[-0.05em] leading-snug underline decoration-2 underline-offset-4 decoration-blue-600 text-center">A dash of cashew for that<br/>restaurant-style velvet<br/>finish & texture</p>
                  </div>
                  <svg className="absolute -bottom-8 left-[15%] w-12 h-12 md:w-24 md:h-24 overflow-visible pointer-events-none" viewBox="0 0 100 100" fill="none">
                    <path d="M80,10 Q60,40 40,80" stroke="#E3002B" strokeWidth="6" strokeDasharray="12 12" strokeLinecap="round"/>
                    <path d="M65,75 L40,80 L50,55" stroke="#E3002B" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                {/* Card 3: The Whole Spice Bloom (Middle Left) */}
                <div className="absolute top-[60%] left-[25%] md:top-[55%] md:left-[-2%] w-[200px] md:w-[600px] -translate-x-1/2 -rotate-[5deg]">
                  <img src="/images/HomePage/card.png" className="w-full h-auto drop-shadow-xl" alt="Card Background" />
                  <div className="absolute inset-0 px-[15%] pt-[14%] pb-[12%] flex flex-col justify-center items-center text-center text-black font-arpona -rotate-[4deg]">
                    <h4 className="font-bold text-[16px] md:text-[34px] tracking-[-0.05em] leading-tight mb-3">The Whole<br/>Spice Bloom</h4>
                    <p className="font-medium text-[11px] md:text-[24px] tracking-[-0.05em] leading-snug underline decoration-2 underline-offset-4 decoration-blue-600 text-center">Cumin, cinnamon, clove<br/>& bay leaves roasted &<br/>grounded for deep aroma</p>
                  </div>
                  <svg className="absolute top-[40%] -right-10 md:-right-20 w-16 h-12 md:w-24 md:h-24 overflow-visible pointer-events-none" viewBox="0 0 100 100" fill="none">
                    <path d="M10,20 Q50,30 90,60" stroke="#E3002B" strokeWidth="6" strokeDasharray="12 12" strokeLinecap="round"/>
                    <path d="M65,45 L90,60 L75,75" stroke="#E3002B" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                {/* Card 4: The Special Blend (Bottom Left) */}
                <div className="absolute top-[75%] left-[30%] md:top-[75%] md:left-[15%] w-[200px] md:w-[600px] -translate-x-1/2 -rotate-[3deg]">
                  <img src="/images/HomePage/card.png" className="w-full h-auto drop-shadow-xl" alt="Card Background" />
                  <div className="absolute inset-0 px-[15%] pt-[14%] pb-[12%] flex flex-col justify-center items-center text-center text-black font-arpona -rotate-[4deg]">
                    <h4 className="font-bold text-[16px] md:text-[34px] tracking-[-0.05em] leading-tight mb-3">The Special<br/>Blend</h4>
                    <p className="font-medium text-[11px] md:text-[24px] tracking-[-0.05em] leading-snug underline decoration-2 underline-offset-4 decoration-blue-600 text-center">Chilli, turmeric, coriander<br/>& pepper for the taste &<br/>feel of home</p>
                  </div>
                  <svg className="absolute top-1/4 -right-10 md:-right-20 w-12 h-12 md:w-24 md:h-24 overflow-visible pointer-events-none" viewBox="0 0 100 100" fill="none">
                    <path d="M10,80 Q40,50 80,20" stroke="#E3002B" strokeWidth="6" strokeDasharray="12 12" strokeLinecap="round"/>
                    <path d="M55,25 L80,20 L70,45" stroke="#E3002B" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                {/* Card 5: Zero Additives (Bottom Center) */}
                <div className="absolute top-[85%] left-[50%] md:top-[85%] md:left-[68%] w-[200px] md:w-[600px] -translate-x-1/2 -rotate-[12deg]">
                  <img src="/images/HomePage/card.png" className="w-full h-auto drop-shadow-xl" alt="Card Background" />
                  <div className="absolute inset-0 px-[15%] pt-[14%] pb-[12%] flex flex-col justify-center items-center text-center text-black font-arpona -rotate-[4deg]">
                    <h4 className="font-bold text-[16px] md:text-[34px] tracking-[-0.05em] leading-tight mb-3">Zero Additives</h4>
                    <p className="font-medium text-[11px] md:text-[24px] tracking-[-0.05em] leading-snug underline decoration-2 underline-offset-4 decoration-blue-600 text-center">100% preservative-free<br/>and freshly made and<br/>chilled to lock in<br/>natural flavor.</p>
                  </div>
                  <svg className="absolute -top-4 left-[30%] w-12 h-12 md:w-24 md:h-24 overflow-visible pointer-events-none" viewBox="0 0 100 100" fill="none">
                    <path d="M80,90 Q50,60 20,20" stroke="#E3002B" strokeWidth="6" strokeDasharray="12 12" strokeLinecap="round"/>
                    <path d="M45,25 L20,20 L30,45" stroke="#E3002B" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

              </div>
            </div>
          </div>

        </section>

        {/* 20+ RECIPES Section */}
        <section className="relative w-full bg-white flex flex-col items-center overflow-hidden">
          <div className="relative w-full min-h-[200vh] flex flex-col items-center py-20 md:py-32" style={{ backgroundImage: "url('/images/HomePage/yellow bg.png')", backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            
            {/* Heading */}
            <div className="relative z-10 flex flex-col items-center mt-10 md:mt-20 font-kura leading-none text-center pointer-events-none">
              <h2 className="relative z-10 text-[#146A36] text-[120px] md:text-[350px] tracking-[-0.02em] drop-shadow-xl" style={{ WebkitTextStroke: '24px #FBD33F', paintOrder: 'stroke fill' }}>20+</h2>
              <h2 className="relative z-20 text-[#146A36] text-[70px] md:text-[280px] tracking-[-0.02em] -mt-10 md:-mt-[60px] drop-shadow-xl" style={{ WebkitTextStroke: '24px #FBD33F', paintOrder: 'stroke fill' }}>RECIPES</h2>
            </div>
            
            {/* Center Container for Product and Dishes */}
            <div className="absolute inset-0 w-full h-full flex items-center justify-center z-20 pointer-events-none">
              
              {/* Center Product */}
              <div className="absolute top-[50%] md:top-[65%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-[200px] md:w-[650px]">
                <img src="/images/HomePage/product package 2.png" alt="Smoked Makhani Gravy" className="w-full h-auto drop-shadow-2xl" />
                <p className="absolute -bottom-[300px] left-1/2 -translate-x-1/2 w-max text-black font-arpona font-medium text-[14px] md:text-[28px] text-center leading-tight tracking-[-0.05em]">
                  Just switch your ingredients and<br/>create a whole new dish each time.
                </p>
              </div>

              {/* --- VEG DISHES (LEFT) --- */}
              {/* Dish 1: Bhindi Masala (Top Left) */}
              <div className="absolute top-[10%] left-[-15%] md:top-[12%] md:left-[0%] w-[250px] md:w-[600px] z-30">
                <img src="/images/HomePage/bhindi.png" alt="Bhindi Masala" className="w-full h-auto drop-shadow-xl" />
                <div className="absolute top-[15%] right-[10%] bg-[#0E5429] text-white font-arpona font-bold text-[14px] md:text-[30px] px-3 md:px-6 py-2 md:py-4 transform -rotate-[8deg] shadow-lg">
                  Bhindi Masala
                </div>
              </div>

              {/* Dish 2: Aloo Gobhi (Middle Left) */}
              <div className="absolute top-[55%] left-[-25%] md:top-[55%] md:left-[-2%] w-[250px] md:w-[400px] -translate-y-1/2 z-20">
                <img src="/images/HomePage/aloo.png" alt="Aloo Gobhi" className="w-full h-auto drop-shadow-xl" />
                <div className="absolute bottom-[20%] right-[5%] bg-[#0E5429] text-white font-arpona font-bold text-[14px] md:text-[30px] px-3 md:px-6 py-2 md:py-4 transform -rotate-[5deg] shadow-lg">
                  Aloo Gobhi
                </div>
              </div>

              {/* Dish 3: Mutter Paneer (Bottom Left) */}
              <div className="absolute bottom-[5%] left-[-20%] md:bottom-[5%] md:left-[-2%] w-[250px] md:w-[550px] z-30">
                <img src="/images/HomePage/panner.png" alt="Mutter Paneer" className="w-full h-auto drop-shadow-xl" />
                <div className="absolute bottom-[5%] left-[30%] bg-[#0E5429] text-white font-arpona font-bold text-[14px] md:text-[30px] px-3 md:px-6 py-2 md:py-4 transform -rotate-[2deg] shadow-lg">
                  Mutter Paneer
                </div>
              </div>

              {/* --- NON-VEG DISHES (RIGHT) --- */}
              {/* Dish 4: Egg Curry (Top Right) */}
              <div className="absolute top-[10%] right-[-15%] md:top-[12%] md:right-[0%] w-[250px] md:w-[600px] z-30">
                <img src="/images/HomePage/egg.png" alt="Egg Curry" className="w-full h-auto drop-shadow-xl" />
                <div className="absolute top-[10%] left-[5%] bg-[#E3002B] text-white font-arpona font-bold text-[14px] md:text-[30px] px-3 md:px-6 py-2 md:py-4 transform rotate-[8deg] shadow-lg" style={{ backgroundImage: "url('/images/HomePage/red bg.png')", backgroundSize: 'cover' }}>
                  Egg Curry
                </div>
              </div>

              {/* Dish 5: Chicken Curry (Middle Right) */}
              <div className="absolute top-[45%] right-[-25%] md:top-[55%] md:right-[-2%] w-[250px] md:w-[400px] -translate-y-1/2 z-20">
                <img src="/images/HomePage/chicken.png" alt="Chicken Curry" className="w-full h-auto drop-shadow-xl" />
                <div className="absolute top-[20%] left-[5%] bg-[#E3002B] text-white font-arpona font-bold text-[14px] md:text-[30px] px-3 md:px-6 py-2 md:py-4 transform -rotate-[4deg] shadow-lg" style={{ backgroundImage: "url('/images/HomePage/red bg.png')", backgroundSize: 'cover' }}>
                  Chicken Curry
                </div>
              </div>

              {/* Dish 6: Mutton Sukka (Bottom Right) */}
              <div className="absolute bottom-[5%] right-[-20%] md:bottom-[5%] md:right-[-2%] w-[250px] md:w-[550px] z-30">
                <img src="/images/HomePage/mutton.png" alt="Mutton Sukka" className="w-full h-auto drop-shadow-xl" />
                <div className="absolute bottom-[5%] right-[20%] bg-[#E3002B] text-white font-arpona font-bold text-[14px] md:text-[30px] px-3 md:px-6 py-2 md:py-4 transform -rotate-[5deg] shadow-lg" style={{ backgroundImage: "url('/images/HomePage/red bg.png')", backgroundSize: 'cover' }}>
                  Mutton Sukka
                </div>
              </div>

              {/* --- ARROWS --- */}
              <svg className="absolute inset-0 w-full h-full z-10 hidden md:block" viewBox="0 0 1920 1080" fill="none">
                {/* Product center is around (960, 594) since it's top 55% */}
                
                {/* To Bhindi Masala (Top Left) */}
                <path d="M780,480 Q650,420 590,350" stroke="#E3002B" strokeWidth="8" strokeDasharray="16 16" strokeLinecap="round"/>
                <path d="M620,340 L590,350 L600,380" stroke="#E3002B" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                
                {/* To Aloo Gobhi (Middle Left) */}
                <path d="M700,594 Q580,600 520,660" stroke="#E3002B" strokeWidth="8" strokeDasharray="16 16" strokeLinecap="round"/>
                <path d="M540,630 L520,660 L555,670" stroke="#E3002B" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>

                {/* To Mutter Paneer (Bottom Left) */}
                <path d="M780,720 Q650,780 520,880" stroke="#E3002B" strokeWidth="8" strokeDasharray="16 16" strokeLinecap="round"/>
                <path d="M550,850 L520,880 L555,890" stroke="#E3002B" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>

                {/* To Egg Curry (Top Right) */}
                <path d="M1140,480 Q1270,420 1330,350" stroke="#E3002B" strokeWidth="8" strokeDasharray="16 16" strokeLinecap="round"/>
                <path d="M1300,340 L1330,350 L1320,380" stroke="#E3002B" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>

                {/* To Chicken Curry (Middle Right) */}
                <path d="M1220,594 Q1340,600 1400,660" stroke="#E3002B" strokeWidth="8" strokeDasharray="16 16" strokeLinecap="round"/>
                <path d="M1365,670 L1400,660 L1380,630" stroke="#E3002B" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>

                {/* To Mutton Sukka (Bottom Right) */}
                <path d="M1140,720 Q1270,780 1400,880" stroke="#E3002B" strokeWidth="8" strokeDasharray="16 16" strokeLinecap="round"/>
                <path d="M1365,890 L1400,880 L1370,850" stroke="#E3002B" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>

            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

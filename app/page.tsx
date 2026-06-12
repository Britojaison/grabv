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
            <Image src="/images/HomePage/red bg.png" alt="Red torn background" fill className="object-cover object-top" />
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
                <div className="absolute top-[10%] right-8 font-arpona text-[28px] tracking-[-0.05em] font-medium text-white normal-case tracking-normal drop-shadow-none pointer-events-none" style={{ WebkitTextStroke: '0', textShadow: 'none' }}>
                  Grab Your Packs
                </div>
              </div>
            </div>

          </div>

          {/* Product Images */}
          <div className="w-full pl-[120px] pr-0 pb-48 flex flex-col md:flex-row justify-between items-center gap-24 relative z-10">
            <div className="w-full md:w-[600px] flex justify-center">
              <img src="/images/HomePage/product1.png" className="w-[400px] md:w-[600px] h-auto object-contain" alt="Product 1" />
            </div>
            <div className="w-full md:w-[600px] flex justify-end md:translate-x-[130px]">
              <img src="/images/HomePage/product2.png" className="w-[400px] md:w-[600px] h-auto object-contain" alt="Product 2" />
            </div>
          </div>

        </section>

      </main>
    </div>
  );
}

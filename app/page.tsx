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
const SlideIn = ({ children, className, direction }: { children: React.ReactNode, className?: string, direction: 'left' | 'right' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: "-20% 0px" } 
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const translateValue = direction === 'left' ? '-100px' : '100px';

  return (
    <div ref={ref} className={className}>
      <div 
        className="w-full h-full transition-all duration-[1000ms] ease-out"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateX(0)' : `translateX(${translateValue})`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

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

  const processSectionRef = useRef<HTMLElement | null>(null);
  const processPathRef = useRef<SVGPathElement | null>(null);
  const ballPathRef = useRef<SVGPathElement | null>(null);
  const coverPathRef = useRef<SVGPathElement | null>(null);

  const stepsContainerRef = useRef<HTMLDivElement | null>(null);
  const stepsTrackRef = useRef<HTMLDivElement | null>(null);

  const productsContainerRef = useRef<HTMLDivElement | null>(null);
  const productsTrackRef = useRef<HTMLDivElement | null>(null);
  const stepsInnerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let pathLength = 0;
    
    setTimeout(() => {
      if (processPathRef.current && ballPathRef.current && coverPathRef.current) {
        pathLength = processPathRef.current.getTotalLength();
        ballPathRef.current.style.strokeDasharray = `0.1 ${pathLength + 100}`;
        coverPathRef.current.style.strokeDasharray = `${pathLength} 100000`;
      }
    }, 100);

    const handleScroll = () => {
      if (!processSectionRef.current || !ballPathRef.current || !coverPathRef.current || pathLength === 0) return;
      const rect = processSectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const pathStartPx = rect.height * 0.22;
      const pathEndPx = rect.height * 0.83;
      const currentScrollCenter = -rect.top + (windowHeight / 2);
      
      let progress = (currentScrollCenter - pathStartPx) / (pathEndPx - pathStartPx);
      progress = Math.max(0, Math.min(1, progress));
      
      requestAnimationFrame(() => {
        if (ballPathRef.current && coverPathRef.current) {
          const offset = -(progress * pathLength);
          ballPathRef.current.style.strokeDashoffset = `${offset}`;
          coverPathRef.current.style.strokeDashoffset = `${offset}`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    setTimeout(handleScroll, 150);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  useEffect(() => {
    let animationFrameId: number;
    const handleScroll = () => {
      animationFrameId = requestAnimationFrame(() => {
        if (stepsContainerRef.current && stepsTrackRef.current) {
          const wrapper = stepsContainerRef.current;
          const track = stepsTrackRef.current;
          
          const rect = wrapper.getBoundingClientRect();
          const stickyOffset = window.innerWidth >= 768 ? 110 : 70;
          const scrollableHeight = stickyOffset + rect.height - window.innerHeight;
          const scrolled = stickyOffset - rect.top;
          
          let translate = 0;
          if (scrollableHeight > 0) {
            const maxTranslate = track.scrollWidth - window.innerWidth;
            
            if (scrolled >= 0 && scrolled <= scrollableHeight) {
              const progress = scrolled / scrollableHeight;
              translate = progress * maxTranslate;
            } else if (scrolled < 0) {
              translate = 0;
            } else if (scrolled > scrollableHeight) {
              translate = maxTranslate;
            }
            
            track.style.transform = `translate3d(-${translate}px, 0, 0)`;
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial state
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    const handleScroll = () => {
      animationFrameId = requestAnimationFrame(() => {
        if (productsContainerRef.current && productsTrackRef.current) {
          const wrapper = productsContainerRef.current;
          const track = productsTrackRef.current;
          
          const rect = wrapper.getBoundingClientRect();
          const stickyOffset = window.innerWidth >= 768 ? 110 : 70;
          const scrollableHeight = stickyOffset + rect.height - window.innerHeight;
          const scrolled = stickyOffset - rect.top;
          
          let translate = 0;
          if (scrollableHeight > 0) {
            const maxTranslate = track.scrollWidth - window.innerWidth;
            
            if (scrolled >= 0 && scrolled <= scrollableHeight) {
              const progress = scrolled / scrollableHeight;
              translate = progress * maxTranslate;
            } else if (scrolled < 0) {
              translate = 0;
            } else if (scrolled > scrollableHeight) {
              translate = maxTranslate;
            }
            
            track.style.transform = `translate3d(-${translate}px, 0, 0)`;
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial state
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full font-arpona overflow-x-clip" style={{ backgroundColor: 'rgb(239, 238, 230)' }}>

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
            <div className="flex items-center md:-ml-4">
              <Image
                src="/images/logo.svg"
                alt="GrabV Logo"
                width={200}
                height={80}
                className="w-[90px] md:w-[125px] h-auto object-contain"
                priority
              />
            </div>
          </div>

          {/* Desktop Nav - Hidden on Mobile and Tablet */}
          <nav className="hidden lg:flex flex-1 justify-center items-center gap-12 xl:gap-[80px] text-white font-medium px-12 lg:ml-12">
            <Link href="/" className="hover:text-[rgb(247,216,13)] transition-colors text-[22px]">Home</Link>
            <Link href="/recipes" className="hover:text-[rgb(247,216,13)] transition-colors text-[22px]">Recipes</Link>
            <Link href="/products" className="hover:text-[rgb(247,216,13)] transition-colors text-[22px]">Products</Link>
            <Link href="/ourstory" className="hover:text-[rgb(247,216,13)] transition-colors text-[22px] whitespace-nowrap">Our Story</Link>
            <Link href="/contact" className="hover:text-[rgb(247,216,13)] transition-colors text-[22px] whitespace-nowrap">Contact Us</Link>
            <Link href="/faq" className="hover:text-[rgb(247,216,13)] transition-colors text-[22px]">FAQ</Link>
          </nav>

          <button
            style={{
              borderRadius: '5px',
              backgroundColor: 'rgb(247, 216, 13)',
              color: '#0D3D1B',
              letterSpacing: '-0.06em'
            }}
            className="font-medium flex items-center justify-center hover:bg-yellow-400 transition-colors shrink-0 text-[12px] md:text-[22px] w-[110px] md:w-[180px] h-[30px] md:h-[48px]"
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
                className="mt-4 px-14 py-3 rounded-full font-arpona font-medium text-[18px] hover:bg-yellow-400 transition-colors"
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
          <div className="absolute left-0 right-0 inset-y-0 flex flex-col justify-center items-center pointer-events-none select-none z-0 overflow-hidden font-kura uppercase tracking-[-0.07em] translate-y-8 px-[120px]" style={{ color: '#146A36' }}>
            <div className="w-full flex justify-between h-[230px] mb-4 text-[230px] leading-[1.0]">
              <span>FRESHLY</span>
              <span>MADE</span>
            </div>
            <div className="w-full flex justify-between h-[158px] text-[158px] leading-[1.0]">
              <span>READY</span>
              <span className="translate-x-[20px]">IN 10 MIN</span>
            </div>
          </div>

          {/* Product Image */}
          <div className="relative z-10 w-[1500px] max-w-[110vw] h-[105vh] max-h-[1600px] translate-y-20">
            <Image
              src="/images/HomePage/product package 1.png"
              alt="GrabV Product Package"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Bottom Left Text */}
          <div className="absolute bottom-8 left-[120px] z-20 flex flex-col tracking-[-0.05em] text-black">
            <span className="font-arpona font-medium text-[28px] leading-[1.0]">Veg or non-veg</span>
            <span className="font-arpona font-medium text-[28px] leading-[1.0]">Possibilities are endless</span>
          </div>

          {/* Bottom Right Text */}
          <div className="absolute bottom-8 right-[120px] z-20 flex flex-col tracking-[-0.05em] text-black text-right">
            <span className="font-arpona font-medium text-[28px] leading-[1.0]">Just add in the gravy</span>
            <span className="font-arpona font-medium text-[28px] leading-[1.0]">And enjoy your meal</span>
          </div>
        </section>

        {/* Pouch to Plate Section - Heading */}
        <section className="relative w-full flex flex-col items-center pt-24 pb-12 overflow-hidden" style={{ backgroundColor: '#FBF5E1' }}>
          
          {/* Top text */}
          <p className="font-arpona text-[24px] md:text-[30px] leading-[1.0] tracking-[-0.05em] font-medium text-black mb-10 text-center z-10">
            No Chopping. No Stress. Just Real Food.
          </p>

          {/* Huge Heading */}
          <div className="relative font-kura uppercase text-[110px] md:text-[260px] leading-[0.85] tracking-[-0.02em] text-center w-full flex justify-center drop-shadow-xl z-10">
            {/* Vegetables Behind Text */}
            <img src="/images/HomePage/onion.png" alt="" className="absolute top-[-8%] left-[12%] md:left-[18%] w-[60px] md:w-[200px] -rotate-[15deg] z-0 pointer-events-none opacity-90" />
            <img src="/images/HomePage/tomato.png" alt="" className="absolute top-[-5%] left-[18%] md:left-[26%] w-[70px] md:w-[190px] z-0 pointer-events-none" />

            {/* Shadow layer */}
            <div className="absolute inset-0 flex justify-center z-0 pointer-events-none translate-y-[5px] translate-x-[8px] md:translate-y-[10px] md:translate-x-[16px]" style={{ color: '#F7D80C' }}>
              <div>POUCH TO<br/>PLATE IN 5<br/>STEPS</div>
            </div>
            
            {/* Fill layer */}
            <div className="relative z-10" style={{ color: '#156B37' }}>
              <div>POUCH TO<br/>PLATE IN 5<br/>STEPS</div>
              {/* Homemade Sticker */}
              <img src="/images/HomePage/homemade.png" alt="Homemade-ish" className="absolute bottom-[18%] right-[-5%] md:right-[-3%] w-[130px] md:w-[290px] rotate-2 drop-shadow-xl z-20 pointer-events-none" />
            </div>
          </div>
        </section>

        {/* Pouch to Plate Wrapper for Scrolljacking */}
        <div ref={stepsContainerRef} className="relative w-full h-[400vh] bg-[#FBF5E1]">
          {/* Pouch to Plate Sticky Section */}
          <section className="sticky top-[70px] md:top-[110px] w-full h-[calc(100vh-70px)] md:h-[calc(100vh-110px)] flex flex-col justify-center overflow-hidden bg-[#FBF5E1]">
            
            {/* Horizontal Scrolling Track */}
            <div className="relative w-full z-30">
              <div ref={stepsTrackRef} className="flex items-center gap-[50px] pl-[40px] md:pl-[120px] pr-[40px] md:pr-[120px] will-change-transform" style={{ width: 'max-content' }}>
                
                {/* Step 1 */}
                <div className="w-[80vw] md:w-[880px] flex-shrink-0 flex flex-col">
                  <img src="/images/HomePage/cooking img1.png" className="w-full h-auto block drop-shadow-2xl" alt="Step 1" />
                  <p className="mt-4 md:mt-6 ml-2 md:ml-4 font-arpona text-[20px] md:text-[30px] tracking-[-0.05em] font-medium text-black drop-shadow-lg">
                    Add your tempering (tadka) in oil.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="w-[80vw] md:w-[880px] flex-shrink-0 flex flex-col">
                  <img src="/images/HomePage/cooking img2.png" className="w-full h-auto block drop-shadow-2xl" alt="Step 2" />
                  <p className="mt-4 md:mt-6 ml-2 md:ml-4 font-arpona text-[20px] md:text-[30px] tracking-[-0.05em] font-medium text-black drop-shadow-lg">
                    Sauté veggies or protein of your choice.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="w-[80vw] md:w-[880px] flex-shrink-0 flex flex-col">
                  <img src="/images/HomePage/cooking img3.png" className="w-full h-auto block drop-shadow-2xl" alt="Step 3" />
                  <p className="mt-4 md:mt-6 ml-2 md:ml-4 font-arpona text-[20px] md:text-[30px] tracking-[-0.05em] font-medium text-black drop-shadow-lg">
                    Pour in the GrabV gravy and mix well.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="w-[80vw] md:w-[880px] flex-shrink-0 flex flex-col">
                  <img src="/images/HomePage/cooking img4.png" className="w-full h-auto block drop-shadow-2xl" alt="Step 4" />
                  <p className="mt-4 md:mt-6 ml-2 md:ml-4 font-arpona text-[20px] md:text-[30px] tracking-[-0.05em] font-medium text-black drop-shadow-lg">
                    Add water as needed and let it simmer.
                  </p>
                </div>

                {/* Step 5 */}
                <div className="w-[80vw] md:w-[880px] flex-shrink-0 flex flex-col">
                  <img src="/images/HomePage/cooking img5.png" className="w-full h-auto block drop-shadow-2xl" alt="Step 5" />
                  <p className="mt-4 md:mt-6 ml-2 md:ml-4 font-arpona text-[20px] md:text-[30px] tracking-[-0.05em] font-medium text-black drop-shadow-lg">
                    Garnish, serve hot, and show off!
                  </p>
                </div>

              </div>
            </div>

          </section>
        </div>

        {/* Our Products Section */}
        {/* Entire Red Section Wrapper (Heading + Scrolljacking) */}
        <div className="relative w-full bg-[#FBF5E1] z-10 pb-[100px] md:pb-[300px]">
          
          {/* Full-height background image spanning both heading and products */}
          <div className="absolute top-0 left-0 right-0 bottom-0 w-full overflow-hidden pointer-events-none z-0">
            <img src="/images/HomePage/red2%20bg.png" alt="Red torn background" className="w-full h-full object-cover object-top" />
          </div>

          {/* Our Products Section - Heading (Normal Scroll) */}
          <section className="relative w-full flex flex-col items-center pt-[140px] md:pt-[330px] pb-12 z-10">
            {/* Huge Heading */}
            <div className="relative z-10 font-kura uppercase leading-[0.8] tracking-[-0.02em] text-center flex flex-col items-center w-full">
              
              {/* Onion Image Behind Text */}
              <img src="/images/HomePage/onion.png" className="absolute left-[3%] md:left-[9%] top-[20%] md:top-[20%] w-[110px] md:w-[280px] object-contain z-[-1] pointer-events-none -rotate-12" alt="" />

              {/* Shadow layer */}
              <div className="absolute inset-0 flex flex-col items-center z-0 pointer-events-none translate-y-[5px] translate-x-[8px] md:translate-y-[10px] md:translate-x-[16px]" style={{ color: '#F7D80C' }}>
                <div className="text-[130px] md:text-[280px]">OUR</div>
                <div className="text-[130px] md:text-[280px]">PRODUCTS</div>
              </div>

              {/* Fill layer */}
              <div className="relative z-10 flex flex-col items-center w-full" style={{ color: '#156B37' }}>
                <div className="relative w-full flex justify-center text-[130px] md:text-[280px]">
                  OUR
                  {/* Grab Your Packs text */}
                  <div className="absolute top-[85%] -translate-y-1/2 right-[10%] md:right-[15%] font-arpona text-[16px] md:text-[24px] tracking-tight font-medium text-white normal-case drop-shadow-none pointer-events-none">
                    Grab Your Packs
                  </div>
                </div>
                <div className="text-[130px] md:text-[280px]">
                  PRODUCTS
                </div>
              </div>
            </div>
          </section>

          {/* Our Products Wrapper for Scrolljacking */}
          <div ref={productsContainerRef} className="relative w-full h-[250vh] z-10">
            {/* Our Products Sticky Section */}
            <section className="sticky top-[70px] md:top-[110px] w-full h-[calc(100vh-70px)] md:h-[calc(100vh-110px)] flex flex-col justify-center overflow-hidden">
            
            {/* Horizontal Scrolling Track */}
            <div className="relative w-full z-30">
              <div ref={productsTrackRef} className="flex items-center gap-[80px] md:gap-[100px] pl-[40px] md:pl-[120px] pr-[40px] md:pr-[120px] will-change-transform" style={{ width: 'max-content' }}>
                
                {/* Product 1 */}
                <div className="relative inline-block flex-shrink-0 flex flex-col items-end">
                  <div className="relative">
                    <img src="/images/HomePage/product1.png" className="h-[540px] md:h-[950px] w-auto object-contain block drop-shadow-2xl" alt="Product 1" />
                    
                    <div className="absolute top-[34%] left-[64%] w-[36%] flex flex-col items-start text-black font-arpona">
                      <h3 className="text-[34px] md:text-[50px] leading-[0.98] tracking-[-0.05em] font-bold">
                        ONION<br/>TOMATO<br/>GRAVY
                      </h3>
                      
                      <div className="mt-4 md:mt-7 flex flex-col gap-1 md:gap-1 text-[15px] md:text-[24px] font-medium tracking-tight">
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
                  
                  {/* See more button */}
                  <div className="mt-[-20px] md:mt-[-40px] z-20">
                    <button className="bg-[rgb(247,216,13)] text-black px-10 py-3 rounded-[6px] font-bold text-[24px] hover:bg-yellow-400 transition-colors shadow-sm tracking-tight font-arpona">
                      See more
                    </button>
                  </div>
                </div>

                {/* Product 2 */}
                <div className="relative inline-block flex-shrink-0 group">
                  <img src="/images/HomePage/product2.png" className="h-[540px] md:h-[950px] w-auto object-contain block drop-shadow-2xl grayscale-[0.8] opacity-80" alt="Product 2" />
                  
                  {/* Coming Soon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <div className="bg-black/40 backdrop-blur-md px-8 py-3 md:px-12 md:py-4 rounded-full border border-white/20 shadow-xl">
                      <p className="text-white font-arpona font-medium text-[14px] md:text-[22px] uppercase tracking-[0.25em] text-center">
                        Coming Soon
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* See more button - Absolute bottom right */}
            <div className="absolute bottom-[2%] md:bottom-[5%] right-[5%] md:right-[10%] z-40 pointer-events-auto">
              <Link href="/products" className="inline-block bg-[#F7D80C] text-black font-arpona font-medium text-[18px] md:text-[20px] tracking-[-0.05em] px-6 py-1 md:px-8 md:py-2 rounded-[5px] shadow-lg hover:scale-105 transition-transform duration-300">
                See more
              </Link>
            </div>

          </section>
        </div>
        {/* End of Entire Red Section Wrapper */}
        </div>

        {/* How We Do It Section */}
        <section className="relative w-full flex flex-col items-center pt-24 pb-48 overflow-visible z-0" style={{ backgroundColor: '#FBF5E1' }}>
          
          {/* Huge Heading (In Front) */}
          <div className="relative z-10 font-kura uppercase leading-[0.85] tracking-[-0.02em] text-center flex flex-col items-center w-full">
            <div className="relative text-[#156B36] text-[100px] md:text-[300px]" style={{ WebkitTextStroke: '20px #F7D80C', paintOrder: 'stroke fill' }}>
              HOW
            </div>
            <div className="relative text-[#156B36] text-[100px] md:text-[300px]" style={{ WebkitTextStroke: '20px #F7D80C', paintOrder: 'stroke fill' }}>
              WE DO IT
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
                  <svg className="absolute -bottom-8 right-[40%] w-12 h-12 md:w-24 md:h-24 overflow-visible pointer-events-none" viewBox="0 0 100 100" fill="none">
                    <path d="M20,10 Q40,50 60,80 M35,75 Q45,78 60,80 M50,55 Q55,65 60,80" stroke="#E3002B" strokeWidth="6" strokeDasharray="12 12" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                {/* Card 2: The Creamy Secret (Top Right) */}
                <div className="absolute top-[45%] right-[20%] md:top-[38%] md:right-[2%] w-[200px] md:w-[600px] translate-x-1/2 rotate-[12deg]">
                  <img src="/images/HomePage/card.png" className="w-full h-auto drop-shadow-xl" alt="Card Background" />
                  <div className="absolute inset-0 px-[15%] pt-[14%] pb-[12%] flex flex-col justify-center items-center text-center text-black font-arpona -rotate-[4deg]">
                    <h4 className="font-bold text-[16px] md:text-[34px] tracking-[-0.05em] leading-tight mb-3">The Creamy Secret</h4>
                    <p className="font-medium text-[11px] md:text-[24px] tracking-[-0.05em] leading-snug underline decoration-2 underline-offset-4 decoration-blue-600 text-center">A dash of cashew for that<br/>restaurant-style velvet<br/>finish & texture</p>
                  </div>
                  <svg className="absolute -bottom-8 left-[30%] w-12 h-12 md:w-24 md:h-24 overflow-visible pointer-events-none" viewBox="0 0 100 100" fill="none">
                    <path d="M80,10 Q60,40 40,80 M65,75 Q55,78 40,80 M50,55 Q45,65 40,80" stroke="#E3002B" strokeWidth="6" strokeDasharray="12 12" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                {/* Card 3: The Whole Spice Bloom (Middle Left) */}
                <div className="absolute top-[60%] left-[20%] md:top-[55%] md:left-[-6%] w-[200px] md:w-[600px] -translate-x-1/2 -rotate-[5deg]">
                  <img src="/images/HomePage/card.png" className="w-full h-auto drop-shadow-xl" alt="Card Background" />
                  <div className="absolute inset-0 px-[15%] pt-[14%] pb-[12%] flex flex-col justify-center items-center text-center text-black font-arpona -rotate-[4deg]">
                    <h4 className="font-bold text-[16px] md:text-[34px] tracking-[-0.05em] leading-tight mb-3">The Whole<br/>Spice Bloom</h4>
                    <p className="font-medium text-[11px] md:text-[24px] tracking-[-0.05em] leading-snug underline decoration-2 underline-offset-4 decoration-blue-600 text-center">Cumin, cinnamon, clove<br/>& bay leaves roasted &<br/>grounded for deep aroma</p>
                  </div>
                  <svg className="absolute top-[40%] -right-16 md:-right-32 w-16 h-12 md:w-24 md:h-24 overflow-visible pointer-events-none" viewBox="0 0 100 100" fill="none">
                    <path d="M10,20 Q50,30 90,60 M65,45 Q75,50 90,60 M75,75 Q82,68 90,60" stroke="#E3002B" strokeWidth="6" strokeDasharray="12 12" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                {/* Card 4: The Special Blend (Bottom Left) */}
                <div className="absolute top-[75%] left-[25%] md:top-[75%] md:left-[10%] w-[200px] md:w-[600px] -translate-x-1/2 -rotate-[3deg]">
                  <img src="/images/HomePage/card.png" className="w-full h-auto drop-shadow-xl" alt="Card Background" />
                  <div className="absolute inset-0 px-[15%] pt-[14%] pb-[12%] flex flex-col justify-center items-center text-center text-black font-arpona -rotate-[4deg]">
                    <h4 className="font-bold text-[16px] md:text-[34px] tracking-[-0.05em] leading-tight mb-3">The Special<br/>Blend</h4>
                    <p className="font-medium text-[11px] md:text-[24px] tracking-[-0.05em] leading-snug underline decoration-2 underline-offset-4 decoration-blue-600 text-center">Chilli, turmeric, coriander<br/>& pepper for the taste &<br/>feel of home</p>
                  </div>
                  <svg className="absolute top-1/4 -right-10 md:-right-20 w-12 h-12 md:w-24 md:h-24 overflow-visible pointer-events-none" viewBox="0 0 100 100" fill="none">
                    <path d="M10,80 Q40,50 80,20 M55,25 Q65,22 80,20 M70,45 Q75,32 80,20" stroke="#E3002B" strokeWidth="6" strokeDasharray="12 12" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                {/* Card 5: Zero Additives (Bottom Center) */}
                <div className="absolute top-[83%] left-[50%] md:top-[83%] md:left-[68%] w-[200px] md:w-[600px] -translate-x-1/2 -rotate-[12deg]">
                  <img src="/images/HomePage/card.png" className="w-full h-auto drop-shadow-xl" alt="Card Background" />
                  <div className="absolute inset-0 px-[15%] pt-[14%] pb-[12%] flex flex-col justify-center items-center text-center text-black font-arpona -rotate-[4deg]">
                    <h4 className="font-bold text-[16px] md:text-[34px] tracking-[-0.05em] leading-tight mb-3">Zero Additives</h4>
                    <p className="font-medium text-[11px] md:text-[24px] tracking-[-0.05em] leading-snug underline decoration-2 underline-offset-4 decoration-blue-600 text-center">100% preservative-free<br/>and freshly made and<br/>chilled to lock in<br/>natural flavor.</p>
                  </div>
                  <svg className="absolute -top-4 left-[30%] w-12 h-12 md:w-24 md:h-24 overflow-visible pointer-events-none" viewBox="0 0 100 100" fill="none">
                    <path d="M80,90 Q50,60 20,20 M45,25 Q35,22 20,20 M30,45 Q25,32 20,20" stroke="#E3002B" strokeWidth="6" strokeDasharray="12 12" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                {/* Curry In Motion Sticker */}
                <div className="absolute top-[85%] left-[85%] md:top-[85%] md:left-[96%] w-[120px] md:w-[280px] -translate-x-1/2 rotate-[12deg] z-20 pointer-events-none">
                  <img src="/images/HomePage/curry in motion.png" className="w-full h-auto drop-shadow-xl" alt="Curry In Motion" />
                </div>

              </div>
            </div>
          </div>

        </section>

        {/* 20+ RECIPES Section */}
        <section className="relative w-full bg-transparent flex flex-col items-center overflow-hidden -mt-[100px] md:-mt-[150px] z-20">
          <div className="relative w-full min-h-[200vh] flex flex-col items-center pt-[150px] md:pt-[250px] pb-20 md:pb-32" style={{ backgroundImage: "url('/images/HomePage/yellow bg.png')", backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            
            {/* Heading */}
            <div className="relative z-10 flex flex-col items-center -mt-4 md:-mt-10 font-kura leading-none text-center pointer-events-none">
              <h2 className="relative z-10 text-[#156B37] text-[120px] md:text-[350px] tracking-[-0.02em]" style={{ WebkitTextStroke: '24px #F7D80C', paintOrder: 'stroke fill' }}>20+</h2>
              <h2 className="relative z-20 text-[#156B37] text-[70px] md:text-[280px] tracking-[-0.02em] -mt-10 md:-mt-[60px]" style={{ WebkitTextStroke: '24px #F7D80C', paintOrder: 'stroke fill' }}>RECIPES</h2>
            </div>
            
            {/* Center Container for Product and Dishes */}
            <div className="absolute inset-0 w-full h-full flex items-center justify-center z-20 pointer-events-none">
              
              {/* Center Product */}
              <div className="absolute top-[50%] md:top-[65%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-[200px] md:w-[600px]">
                <img src="/images/HomePage/product package 2.png" alt="Smoked Makhani Gravy" className="w-full h-auto drop-shadow-2xl" />
                <p className="absolute -bottom-[220px] left-1/2 -translate-x-1/2 w-max text-black font-arpona font-medium text-[14px] md:text-[28px] text-center leading-tight tracking-[-0.05em]">
                  Just switch your ingredients and<br/>create a whole new dish each time.
                </p>
              </div>

              {/* --- VEG DISHES (LEFT) --- */}
              {/* Dish 1: Bhindi Masala (Top Left) */}
              <div className="absolute top-[8%] left-[-40%] md:top-[8%] md:left-[-16%] w-[370px] md:w-[890px] z-30">
                <img src="/images/HomePage/bhindi.png" alt="Bhindi Masala" className="w-full h-auto drop-shadow-xl" />
                <div className="absolute top-[19%] left-[58%] md:top-[19%] md:left-[58%] text-white font-arpona font-bold text-[14px] md:text-[30px] transform -rotate-[10deg] pointer-events-none">
                  Bhindi Masala
                </div>
              </div>

              {/* Dish 2: Aloo Gobhi (Middle Left) */}
              <div className="absolute top-[55%] left-[-35%] md:top-[55%] md:left-[-12%] w-[350px] md:w-[850px] -translate-y-1/2 z-20">
                <img src="/images/HomePage/aloo.png" alt="Aloo Gobhi" className="w-full h-auto drop-shadow-xl" />
                <div className="absolute top-[61%] left-[60%] md:top-[61%] md:left-[60%] text-white font-arpona font-bold text-[14px] md:text-[30px] transform -rotate-[10deg] pointer-events-none">
                  Aloo Gobhi
                </div>
              </div>

              {/* Dish 3: Mutter Paneer (Bottom Left) */}
              <div className="absolute bottom-[0%] left-[-30%] md:bottom-[0%] md:left-[-12%] w-[390px] md:w-[920px] z-30">
                <img src="/images/HomePage/panner.png" alt="Mutter Paneer" className="w-full h-auto drop-shadow-xl" />
                <div className="absolute top-[74%] left-[42%] md:top-[74%] md:left-[42%] text-white font-arpona font-bold text-[14px] md:text-[30px] transform rotate-[2deg] pointer-events-none">
                  Mutter Paneer
                </div>
              </div>

              {/* --- NON-VEG DISHES (RIGHT) --- */}
              {/* Dish 4: Egg Curry (Top Right) */}
              <div className="absolute top-[8%] right-[-35%] md:top-[8%] md:right-[-16%] w-[420px] md:w-[950px] z-30">
                <img src="/images/HomePage/egg.png" alt="Egg Curry" className="w-full h-auto drop-shadow-xl" />
                <div className="absolute top-[21%] left-[31%] md:top-[21%] md:left-[31%] text-white font-arpona font-bold text-[14px] md:text-[30px] transform rotate-[12deg] pointer-events-none">
                  Egg Curry
                </div>
              </div>

              {/* Dish 5: Chicken Curry (Middle Right) */}
              <div className="absolute top-[45%] right-[-35%] md:top-[55%] md:right-[-12%] w-[320px] md:w-[750px] -translate-y-1/2 z-20">
                <img src="/images/HomePage/chicken.png" alt="Chicken Curry" className="w-full h-auto drop-shadow-xl" />
                <div className="absolute top-[62%] left-[7%] md:top-[62%] md:left-[7%] text-white font-arpona font-bold text-[14px] md:text-[30px] transform rotate-[4deg] pointer-events-none">
                  Chicken Curry
                </div>
              </div>

              {/* Dish 6: Mutton Sukka (Bottom Right) */}
              <div className="absolute bottom-[2%] right-[-30%] md:bottom-[2%] md:right-[-12%] w-[280px] md:w-[660px] z-30">
                <img src="/images/HomePage/mutton.png" alt="Mutton Sukka" className="w-full h-auto drop-shadow-xl" />
                <div className="absolute top-[80%] left-[14%] md:top-[80%] md:left-[14%] text-white font-arpona font-bold text-[14px] md:text-[30px] transform -rotate-[5deg] pointer-events-none">
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

        {/* HOW WE MAKE IT Section */}
        <section ref={processSectionRef} className="relative w-full flex flex-col items-center overflow-hidden z-0 -mt-[100px] md:-mt-[200px]" style={{ backgroundColor: '#FBF5E1', height: '350vh' }}>
          
          {/* Huge Heading */}
          <div className="relative z-10 font-kura uppercase leading-[0.85] text-left flex flex-col items-start w-full px-4 md:px-[120px] pt-[150px] md:pt-[300px] drop-shadow-xl" style={{ letterSpacing: '-0.02em' }}>
            <div className="relative text-[100px] md:text-[300px]">
              <span className="absolute inset-0 text-transparent pointer-events-none z-0" style={{ WebkitTextStroke: '20px rgb(247, 216, 13)' }}>HOW WE</span>
              <span className="relative z-10" style={{ color: 'rgb(21, 107, 54)' }}>HOW WE</span>
            </div>
            <div className="relative text-[100px] md:text-[300px]">
              <span className="absolute inset-0 text-transparent pointer-events-none z-0" style={{ WebkitTextStroke: '20px rgb(247, 216, 13)' }}>MAKE IT</span>
              <span className="relative z-10" style={{ color: 'rgb(21, 107, 54)' }}>MAKE IT</span>
            </div>
          </div>

          {/* Process Images */}
          <div className="absolute top-[60px] md:top-[140px] left-0 right-0 w-full h-full max-w-[1920px] mx-auto pointer-events-none">
            {/* SVG Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full z-0 hidden md:block" viewBox="0 0 1920 3500" preserveAspectRatio="none">
              <path 
                ref={processPathRef}
                d="M 1520 780 
                   Q 970 1000, 250 1200 
                   C 150 1400, 1000 1550, 1400 1500 
                   C 1800 1450, 2000 1900, 400 1900 
                   C -100 1900, -100 2400, 1400 2400 
                   C 1900 2400, 1900 2900, 500 2930" 
                fill="none" 
                stroke="#E3002B" 
                strokeWidth="6" 
                strokeDasharray="12 12" 
                strokeLinecap="round" 
                vectorEffect="non-scaling-stroke"
              />
              <path 
                ref={coverPathRef}
                d="M 1520 780 Q 970 1000, 250 1200 C 150 1400, 1000 1550, 1400 1500 C 1800 1450, 2000 1900, 400 1900 C -100 1900, -100 2400, 1400 2400 C 1900 2400, 1900 2900, 500 2930" 
                fill="none" 
                stroke="#FBF5E1" 
                strokeWidth="12" 
                strokeLinecap="round" 
              />
              <path 
                ref={ballPathRef}
                d="M 1520 780 Q 970 1000, 250 1200 C 150 1400, 1000 1550, 1400 1500 C 1800 1450, 2000 1900, 400 1900 C -100 1900, -100 2400, 1400 2400 C 1900 2400, 1900 2900, 500 2930" 
                fill="none" 
                stroke="#E3002B" 
                strokeWidth="36" 
                strokeLinecap="round" 
              />
            </svg>

            {/* process1 - Top Right */}
            <SlideIn direction="right" className="absolute top-[8%] md:top-[12%] right-[2%] w-[240px] md:w-[600px] z-10">
              <div className="relative w-full h-full">
                {/* Text Overlay */}
                <div className="absolute top-2 md:top-8 right-0 md:-right-4 w-[240px] md:w-[410px] h-[190px] md:h-[310px] z-20 flex items-center justify-center rotate-[16deg]">
                  <h3 className="relative z-10 font-bold text-black text-[22px] md:text-[32px] text-center leading-tight tracking-tight px-4 mt-1 -rotate-[6deg]">
                    Cooked in<br/>small batches
                  </h3>
                </div>
                <img src="/images/HomePage/process1.png" alt="Process 1" className="w-full h-auto drop-shadow-xl relative z-10" />
              </div>
            </SlideIn>

            {/* process2 - Middle Left */}
            <SlideIn direction="left" className="absolute top-[19%] -left-[6%] w-[320px] md:w-[1050px] z-10">
              <div className="relative w-full h-full">
                <img src="/images/HomePage/process2.png" alt="Process 2" className="w-full h-auto drop-shadow-xl" />
                {/* Text Overlay */}
                <h3 className="absolute z-20 font-bold text-black text-base md:text-[32px] text-center leading-tight tracking-tight bottom-[18%] left-[24%] -rotate-[8deg]">
                  Clean and hygienic<br/>preparation
                </h3>
              </div>
            </SlideIn>

            {/* process3 - Middle Right */}
            <SlideIn direction="right" className="absolute top-[21%] right-[0%] w-[280px] md:w-[1100px] z-10">
              <div className="relative w-full h-full">
                <img src="/images/HomePage/process3.png" alt="Process 3" className="w-full h-auto drop-shadow-xl" />
                {/* Text Overlay */}
                <h3 className="absolute z-20 font-bold text-black text-[22px] md:text-[32px] text-center leading-tight tracking-tight bottom-[18%] right-[21%] -rotate-[6deg]">
                  Quality checked at<br/>every stage
                </h3>
              </div>
            </SlideIn>

            {/* process4 - Bottom Left */}
            <SlideIn direction="left" className="absolute top-[55%] left-[5%] w-[300px] md:w-[750px] z-10">
              <div className="relative w-full h-full">
                <img src="/images/HomePage/process4.png" alt="Process 4" className="w-full h-auto drop-shadow-xl" />
                {/* Text Overlay */}
                <h3 className="absolute z-20 font-bold text-black text-[22px] md:text-[32px] text-center leading-tight tracking-tight bottom-[14%] left-[35%] rotate-[10deg]">
                  Stored and delivered<br/>through cold chain
                </h3>
              </div>
            </SlideIn>

            {/* process5 - Bottom Right */}
            <SlideIn direction="right" className="absolute top-[68%] right-[1%] w-[300px] md:w-[730px] z-10">
              <div className="relative w-full h-full">
                <img src="/images/HomePage/process5.png" alt="Process 5" className="w-full h-auto drop-shadow-xl" />
                {/* Text Overlay */}
                <h3 className="absolute z-20 font-bold text-black text-[22px] md:text-[32px] text-center leading-tight tracking-tight bottom-[12%] right-[14%] rotate-[8deg]">
                  No preservatives<br/>added
                </h3>
              </div>
            </SlideIn>

            {/* process6 - Bottom Left */}
            <SlideIn direction="left" className="absolute top-[74%] md:top-[73%] -left-[2%] w-[300px] md:w-[960px] z-10">
              <div className="relative w-full h-full">
                <img src="/images/HomePage/process6.png" alt="Process 6" className="w-full h-auto drop-shadow-xl" />
                {/* Text Overlay */}
                <h3 className="absolute z-20 font-bold text-black text-[22px] md:text-[32px] text-center leading-tight tracking-tight top-[24%] left-[14%] -rotate-[8deg]">
                  100% veg base<br/>gravy
                </h3>
              </div>
            </SlideIn>
          </div>
          

        </section>

        {/* WHAT PEOPLE ARE SAYING SECTION */}
        <section className="relative w-full bg-[#FBF5E1] pt-[150px] md:pt-[200px] pb-40 overflow-hidden font-arpona bg-cover bg-center bg-no-repeat z-10 -mt-[100px] md:-mt-[150px]" style={{ backgroundImage: "url('/images/HomePage/red2%20bg.png')" }}>
          {/* Top text */}
          <div className="max-w-[1920px] mx-auto px-4 md:px-[90px] pt-12 flex justify-between text-white text-base md:text-xl font-medium mb-12" style={{ letterSpacing: '-0.05em' }}>
            <span className="translate-x-[50px] md:translate-x-[140px] translate-y-[20px] md:translate-y-[60px]">Our GrabV</span>
            <span className="-translate-x-[50px] md:-translate-x-[120px] translate-y-[30px] md:translate-y-[60px]">Your review</span>
          </div>

          {/* Main Heading */}
          <div className="relative w-full flex flex-col items-center justify-center text-center px-4 mt-8 md:mt-16 z-10">
            
            <div className="relative z-10 font-kura uppercase leading-[0.85] tracking-[-0.02em] text-center flex flex-col items-center w-full">
              
              {/* Shadow layer */}
              <div className="absolute inset-0 flex flex-col items-center z-0 pointer-events-none translate-y-[5px] translate-x-[8px] md:translate-y-[10px] md:translate-x-[16px]" style={{ color: '#156B37' }}>
                <div className="text-[90px] md:text-[250px]">WHAT PEOPLE</div>
                <div className="text-[90px] md:text-[250px]">ARE SAYING</div>
              </div>

              {/* Fill layer */}
              <div className="relative z-10 flex flex-col items-center w-full" style={{ color: '#F7D80C' }}>
                <div className="text-[90px] md:text-[250px]">WHAT PEOPLE</div>
                <div className="relative text-[90px] md:text-[250px]">
                  ARE SAYING
                  {/* Stir Simmer Sticker */}
                  <img 
                    src="/images/HomePage/stir simmer sticker.png" 
                    alt="Stir Simmer Sticker" 
                    className="absolute left-[-10%] md:left-[-13%] -bottom-[10%] md:-bottom-[35%] w-[100px] md:w-[230px] rotate-3 z-30 pointer-events-none"
                  />
                </div>
              </div>

            </div>

          </div>

          {/* Reviews Grid */}
          <div className="w-full max-w-[3000px] mx-auto mt-24 md:mt-32 px-0 flex flex-col md:flex-row justify-center items-center gap-12 md:gap-2 relative z-30">
            
            {/* Review 1 */}
            <div className="relative w-[95%] md:w-[33%] max-w-[1400px] mx-auto md:translate-x-[60px]">
              <img src="/images/HomePage/review1.png" alt="Review 1" className="w-full h-auto drop-shadow-2xl" />
              <div className="absolute top-[49%] right-[24%] flex flex-col items-end rotate-[8deg]">
                <span className="font-bold text-[16px] md:text-[24px] text-black leading-none tracking-tight">-Sneha Mehta</span>
                <span className="font-medium text-[12px] md:text-[18px] text-black leading-tight pr-1 tracking-tighter">Bengaluru</span>
              </div>
              <div className="absolute bottom-[5%] left-[18%] right-[10%] h-[40%] flex items-start px-2">
                <p className="text-black font-arpona font-normal tracking-[-0.02em] text-[14px] md:text-[24px] leading-[1.21] md:leading-[1.21] underline decoration-2 underline-offset-4 decoration-[#99B1FA]">
                  I recently<br />
                  shifted to Bengaluru, and I was<br />
                  craving for the home cooked<br />
                  flavour and that's when GrabV's<br />
                  onion tomato gravy saved me!!!<br />
                  It was absolutely delicious.
                </p>
              </div>
            </div>

            {/* Review 2 */}
            <div className="relative w-[95%] md:w-[33%] max-w-[1400px] mx-auto md:-translate-y-[20px]">
              <img src="/images/HomePage/review2.png" alt="Review 2" className="w-full h-auto drop-shadow-2xl" />
              <div className="absolute top-[48%] right-[18%] flex flex-col items-end rotate-[-12deg]">
                <span className="font-bold text-[16px] md:text-[24px] text-black leading-none tracking-tight">-Harshith</span>
                <span className="font-medium text-[12px] md:text-[18px] text-black leading-tight pr-1 tracking-tighter">Bengaluru</span>
              </div>
              <div className="absolute bottom-[0%] left-[18%] right-[10%] h-[40%] flex items-start px-2">
                <p className="text-black font-arpona font-normal tracking-[-0.02em] text-[14px] md:text-[24px] leading-[1.21] md:leading-[1.21] underline decoration-2 underline-offset-4 decoration-[#99B1FA]">
                  Oh mahn!!<br />
                  What a flavourrr... made me feel<br />
                  like a real chef!!
                </p>
              </div>
            </div>

            {/* Review 3 */}
            <div className="relative w-[95%] md:w-[33%] max-w-[1400px] mx-auto md:-translate-x-[60px]">
              <img src="/images/HomePage/review3.png" alt="Review 3" className="w-full h-auto drop-shadow-2xl" />
              <div className="absolute top-[49%] right-[24%] flex flex-col items-end rotate-[6deg]">
                <span className="font-bold text-[16px] md:text-[24px] text-black leading-none tracking-tight">-Chetana Gowda</span>
                <span className="font-medium text-[12px] md:text-[18px] text-black leading-tight pr-1 tracking-tighter">Bengaluru</span>
              </div>
              {/* Tasty Sticker */}
              <img src="/images/HomePage/tasty.png" alt="Tasty" className="absolute bottom-[5%] md:bottom-[2%] left-[6%] md:-left-[1%] w-[100px] md:w-[180px] -rotate-6 drop-shadow-xl z-40 pointer-events-none" />
              <div className="absolute bottom-[0%] left-[18%] right-[10%] h-[40%] flex items-start px-2">
                <p className="text-black font-arpona font-normal tracking-[-0.02em] text-[14px] md:text-[24px] leading-[1.21] md:leading-[1.21] underline decoration-2 underline-offset-4 decoration-[#99B1FA]">
                  Oh It is an absolute saviour to my<br />
                  busy days, so quick and so easy.<br />
                  Am stocking this up<br />
                  again for sure!!
                </p>
              </div>
            </div>
            
          </div>
        </section>

        {/* READY TO COOK SECTION */}
        <section className="relative w-full h-[150vh] bg-[#FBF5E1] pt-24 overflow-hidden font-arpona flex flex-col items-center">
          
          {/* Order Now Button */}
          <button className="bg-[#F7D80C] text-black font-arpona font-medium text-[16px] md:text-[20px] px-10 md:px-14 py-2 md:py-3 rounded-xl mb-16 shadow-md hover:bg-yellow-400 transition-colors z-40">
            Order now
          </button>

          {/* Main Heading */}
          <div className="relative w-full flex flex-col items-center justify-center text-center mt-4">
            
            <div className="relative z-10 font-kura uppercase leading-[0.85] flex flex-col items-center w-full drop-shadow-xl" style={{ letterSpacing: '-0.02em' }}>
              
              {/* READY TO COOK */}
              <div className="relative text-[80px] md:text-[270px] w-full flex justify-center whitespace-nowrap">
                <span className="absolute text-transparent pointer-events-none z-0" style={{ WebkitTextStroke: '20px rgb(247, 216, 13)' }}>READY TO COOK</span>
                <span className="relative z-10" style={{ color: 'rgb(21, 107, 54)' }}>READY TO COOK</span>
                
                {/* Chef Effort Sticker */}
                <img 
                  src="/images/HomePage/chef effort sticker.png" 
                  alt="Chef Effort Sticker" 
                  className="absolute left-[-5%] md:left-[5%] -top-[20%] md:-top-[60%] w-[120px] md:w-[300px] -rotate-3 z-30"
                />
              </div>
              
              {/* SMART SMRTER */}
              <div className="relative text-[80px] md:text-[270px] w-full flex justify-center whitespace-nowrap">
                <span className="absolute text-transparent pointer-events-none z-0" style={{ WebkitTextStroke: '20px rgb(247, 216, 13)' }}>SMART SMRTER</span>
                <span className="relative z-10" style={{ color: 'rgb(21, 107, 54)' }}>SMART SMRTER</span>
              </div>

              {/* EVERY ERDAY? */}
              <div className="relative text-[80px] md:text-[270px] w-full flex justify-center whitespace-nowrap">
                <span className="absolute text-transparent pointer-events-none z-0" style={{ WebkitTextStroke: '20px rgb(247, 216, 13)' }}>EVERY ERDAY?</span>
                <span className="relative z-10" style={{ color: 'rgb(21, 107, 54)' }}>EVERY ERDAY?</span>
              </div>

            </div>

            {/* Product Image */}
            <div className="absolute top-[15%] md:top-[5%] left-[57%] -translate-x-1/2 z-20 w-[95%] md:w-[1100px]">
              <img src="/images/HomePage/product%20package%203.png" alt="Smoked Makhani Gravy" className="w-full h-auto drop-shadow-2xl" />
            </div>

          </div>
          
          {/* Footer Wavy Transition removed as footer now uses background image */}
        </section>

        {/* FOOTER SECTION */}
        <section className="relative w-full bg-[#156B37] pt-[80px] md:pt-[150px] pb-24 font-arpona">
          {/* Yellow fill for the transparent top wavy part */}
          <div className="absolute top-0 left-0 w-full h-[150px] md:h-[300px] bg-[#FBF5E1] z-0"></div>
          
          {/* The green wavy background image */}
          <div className="absolute inset-0 bg-no-repeat bg-top z-0" style={{ backgroundImage: "url('/images/HomePage/green%20bg.png')", backgroundSize: "100% auto" }}></div>
          
          <div className="relative z-10 w-full mx-auto px-8 md:px-[110px] flex flex-col md:flex-row md:justify-between items-start gap-12 md:gap-0">
            
            {/* Column 1: Logo & Copyright */}
            <div className="flex flex-col items-start">
              <img src="/images/logo.svg" alt="GrabV" className="w-[140px] mb-8" />
              <p className="text-[#F7D80C] text-[16px] md:text-[26px] tracking-[-0.03em] leading-[1.6] font-normal">
                © 2026 GrabV. All rights<br/>
                reserved. 88gb Digital<br/>
                Mraketing & Technology<br/>
                Company
              </p>
            </div>

            {/* Column 2: Company */}
            <div className="flex flex-col items-start">
              <h3 className="text-[#F7D80C] text-[16px] md:text-[26px] tracking-[-0.03em] font-normal mb-6">Company</h3>
              <ul className="flex flex-col space-y-2">
                <li><a href="#" className="text-[#F7D80C] text-[16px] md:text-[26px] tracking-[-0.03em] hover:text-white transition-colors">Our Story</a></li>
                <li><a href="#" className="text-[#F7D80C] text-[16px] md:text-[26px] tracking-[-0.03em] hover:text-white transition-colors">Process</a></li>
                <li><a href="#" className="text-[#F7D80C] text-[16px] md:text-[26px] tracking-[-0.03em] hover:text-white transition-colors">Quality Promise</a></li>
                <li><a href="#" className="text-[#F7D80C] text-[16px] md:text-[26px] tracking-[-0.03em] hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>

            {/* Column 3: Product */}
            <div className="flex flex-col items-start">
              <h3 className="text-[#F7D80C] text-[16px] md:text-[26px] tracking-[-0.03em] font-normal mb-6">Product</h3>
              <ul className="flex flex-col space-y-2">
                <li><a href="#" className="text-white text-[16px] md:text-[26px] tracking-[-0.03em] hover:text-[#F7D80C] transition-colors">All Purpose Gravy</a></li>
                <li><a href="#" className="text-[#F7D80C] text-[16px] md:text-[26px] tracking-[-0.03em] hover:text-white transition-colors">Ingredients</a></li>
                <li><a href="#" className="text-[#F7D80C] text-[16px] md:text-[26px] tracking-[-0.03em] hover:text-white transition-colors">How to Use</a></li>
                <li><a href="#" className="text-[#F7D80C] text-[16px] md:text-[26px] tracking-[-0.03em] hover:text-white transition-colors">Recipes</a></li>
              </ul>
            </div>

            {/* Column 4: Order & Policies & Follow Us */}
            <div className="flex flex-col items-start">
              <h3 className="text-[#F7D80C] text-[16px] md:text-[26px] tracking-[-0.03em] font-normal mb-6">Order & Policies</h3>
              <ul className="flex flex-col space-y-2 mb-10">
                <li><a href="#" className="text-[#F7D80C] text-[16px] md:text-[26px] tracking-[-0.03em] hover:text-white transition-colors">WhatsApp Order</a></li>
                <li><a href="#" className="text-[#F7D80C] text-[16px] md:text-[26px] tracking-[-0.03em] hover:text-white transition-colors">Exchange Order</a></li>
                <li><a href="#" className="text-[#F7D80C] text-[16px] md:text-[26px] tracking-[-0.03em] hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
              
              <h3 className="text-white text-[16px] md:text-[26px] tracking-[-0.03em] font-normal mb-4">Follow Us</h3>
              <div className="flex items-center space-x-4">
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <img src="/images/facebook.svg" alt="Facebook" className="w-8 h-8 brightness-0 invert" />
                </a>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <img src="/images/whatsapp.svg" alt="WhatsApp" className="w-8 h-8 brightness-0 invert" />
                </a>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <img src="/images/insta.svg" alt="Instagram" className="w-8 h-8 brightness-0 invert" />
                </a>
              </div>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}

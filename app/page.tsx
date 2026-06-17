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

const AnimatedDottedLine = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const maskPathRef = useRef<SVGPathElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const [pathLen, setPathLen] = useState(0);

  useEffect(() => {
    if (pathRef.current) {
      setPathLen(pathRef.current.getTotalLength());
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !pathRef.current || !ballRef.current || !maskPathRef.current || pathLen === 0) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const scrolled = (windowHeight / 2) - rect.top;
      const end = rect.height;
      
      let p = scrolled / end;
      if (p < 0) p = 0;
      if (p > 1) p = 1;
      
      const drawLength = p * pathLen;
      const pt = pathRef.current.getPointAtLength(drawLength);
      
      ballRef.current.style.left = `${pt.x}%`;
      ballRef.current.style.top = `${pt.y}%`;

      maskPathRef.current.style.strokeDasharray = `${pathLen} ${pathLen}`;
      maskPathRef.current.style.strokeDashoffset = `${pathLen - drawLength}`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount to set initial position
    setTimeout(handleScroll, 100); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathLen]);

  return (
    <div ref={containerRef} className="absolute top-[400px] md:top-[850px] left-0 w-full h-[1500px] md:h-[2200px] pointer-events-none z-0">
      <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100" fill="none">
        <defs>
          <mask id="line-mask">
            <path 
              ref={maskPathRef}
              d="M75,0 C 75,10 25,10 25,20 C 25,30 75,30 75,40 C 75,50 25,50 25,60 C 25,70 75,70 75,80 C 75,90 25,90 25,100" 
              stroke="white" 
              strokeWidth="5" 
              fill="none"
              strokeLinecap="round" 
              style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
            />
          </mask>
        </defs>
        <path 
          ref={pathRef} 
          d="M75,0 C 75,10 25,10 25,20 C 25,30 75,30 75,40 C 75,50 25,50 25,60 C 25,70 75,70 75,80 C 75,90 25,90 25,100" 
          stroke="#E3002B" 
          strokeWidth="4" 
          strokeDasharray="8 12" 
          strokeLinecap="round" 
          vectorEffect="non-scaling-stroke" 
          mask="url(#line-mask)"
        />
      </svg>
      <div 
        ref={ballRef} 
        className="absolute w-[30px] h-[30px] bg-[#E3002B] rounded-full -translate-x-1/2 -translate-y-1/2 z-20 shadow-md border-2 border-white"
        style={{ left: '75%', top: '0%', transition: 'left 0.1s ease-out, top 0.1s ease-out' }}
      />
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



  const stepsContainerRef = useRef<HTMLDivElement | null>(null);
  const stepsTrackRef = useRef<HTMLDivElement | null>(null);

  const productsContainerRef = useRef<HTMLDivElement | null>(null);
  const productsTrackRef = useRef<HTMLDivElement | null>(null);
  const stepsInnerRef = useRef<HTMLElement | null>(null);


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

      {/* Navbar Section removed and added to layout.tsx */}

      {/* Main Container - Full Width */}
      <main className="w-full relative flex flex-col bg-[#FBF5E1]">

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
            <div className="w-full flex justify-between h-[165px] text-[165px] leading-[1.0] mt-2">
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
          <p className="font-arpona text-[22px] md:text-[28px] leading-[1.0] tracking-[-0.05em] font-medium text-black mb-10 text-center z-10">
            No Chopping. No Stress. Just Real Food.
          </p>

          {/* Huge Heading */}
          <div className="relative font-kura uppercase text-[110px] md:text-[260px] leading-[0.85] tracking-[-0.02em] text-center w-full flex justify-center drop-shadow-xl z-10">
            {/* Vegetables Behind Text */}
            <img src="/images/HomePage/tomato.png" alt="" className="absolute top-[-9%] left-[17%] md:left-[25%] w-[105px] md:w-[265px] z-0 pointer-events-none" />
            <img src="/images/HomePage/onion.png" alt="" className="absolute top-[-8%] left-[12%] md:left-[18%] w-[60px] md:w-[200px] -rotate-[15deg] z-0 pointer-events-none opacity-90" />

            {/* Shadow layer */}
            <div className="absolute inset-0 flex justify-center z-0 pointer-events-none translate-y-[5px] translate-x-[8px] md:translate-y-[10px] md:translate-x-[16px]" style={{ color: '#F7D80C' }}>
              <div>POUCH TO<br/>PLATE IN<br/>5 STEPS</div>
            </div>
            
            {/* Fill layer */}
            <div className="relative z-10" style={{ color: '#156B37' }}>
              <div>POUCH TO<br/>PLATE IN<br/>5 STEPS</div>
              {/* Homemade Sticker */}
              <img src="/images/HomePage/homemade.png" alt="Homemade-ish" className="absolute bottom-[25%] right-[-11%] md:right-[-10%] w-[130px] md:w-[290px] rotate-2 drop-shadow-xl z-20 pointer-events-none" />
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
        <div className="relative w-full bg-transparent z-10 pb-[60px] md:pb-[120px]">
          
          {/* Full-height background image spanning both heading and products */}
          <div className="absolute top-0 left-0 right-0 bottom-0 w-full pointer-events-none z-0 flex flex-col">
            {/* Top curve */}
            <img src="/images/HomePage/red2%20bg.png" alt="Red torn background top" className="w-full h-[150px] md:h-[250px] object-cover object-top shrink-0" />
            
            {/* Middle fill (stretched vertically to fill space) */}
            <div className="flex-1 w-full overflow-hidden relative">
              <img src="/images/HomePage/red2%20bg.png" alt="" className="absolute inset-0 w-full h-full object-cover object-center scale-y-[100]" />
            </div>

            {/* Bottom curve */}
            <img src="/images/HomePage/red2%20bg.png" alt="Red torn background bottom" className="w-full h-[150px] md:h-[250px] object-cover object-bottom shrink-0" />
          </div>

          <section className="relative w-full flex flex-col items-center pt-[40px] md:pt-[100px] pb-12 z-10">
            {/* Huge Heading */}
            <div className="relative z-10 font-kura uppercase leading-[0.8] tracking-[-0.02em] text-center flex flex-col items-center w-full">
              
              {/* Onion Image Behind Text */}
              <img src="/images/HomePage/onion.png" className="absolute left-[5%] md:left-[11%] top-[15%] md:top-[15%] w-[110px] md:w-[290px] object-contain z-[-1] pointer-events-none -rotate-12" alt="" />

              {/* Shadow layer (Green) */}
              <div className="absolute inset-0 flex flex-col items-center z-0 pointer-events-none translate-y-[5px] translate-x-[8px] md:translate-y-[10px] md:translate-x-[16px]" style={{ color: '#156B37' }}>
                <div className="text-[115px] md:text-[260px]">OUR</div>
                <div className="text-[115px] md:text-[260px]">PRODUCTS</div>
              </div>

              {/* Fill layer (Yellow) */}
              <div className="relative z-10 flex flex-col items-center w-full" style={{ color: '#F7D80C' }}>
                <div className="relative w-full flex justify-center text-[115px] md:text-[260px]">
                  OUR
                  {/* Grab Your Packs text */}
                  <div className="absolute top-[82%] -translate-y-1/2 right-[15%] md:right-[19%] font-arpona text-[16px] md:text-[24px] tracking-tight font-medium text-white normal-case drop-shadow-none pointer-events-none">
                    Grab Your Packs
                  </div>
                </div>
                <div className="text-[115px] md:text-[260px]">
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
            <div className="absolute bottom-[1%] md:bottom-[2%] right-[5%] md:right-[10%] z-40 pointer-events-auto">
              <Link href="/products" className="inline-block bg-[#F7D80C] text-black font-arpona font-medium text-[18px] md:text-[20px] tracking-[-0.05em] px-6 py-1 md:px-8 md:py-2 rounded-[5px] shadow-lg hover:scale-105 transition-transform duration-300">
                See more
              </Link>
            </div>

          </section>
        </div>
        {/* End of Entire Red Section Wrapper */}
        </div>

        {/* HOW WE MAKE IT Section */}
        <section className="relative w-full bg-[#FBF5E1] pt-12 md:pt-24 pb-32 md:pb-48 overflow-visible z-0">
          
          {/* Top Heading Area */}
          <div className="relative w-full max-w-[1400px] mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-center z-20">
            
            {/* Left: Gravy Pouring Image */}
            <div className="w-full md:w-[50%] relative flex justify-center md:justify-end z-20 md:-mt-[420px] md:-translate-x-[720px]">
              <img src="/images/HomePage/Gravy pouring.png" alt="Gravy Pouring" className="w-[110%] md:w-[105%] max-w-[400px] md:max-w-[800px] object-contain drop-shadow-2xl" />
            </div>

            {/* Right: Text and Star */}
            <div className="w-full md:w-[55%] flex flex-col items-center md:items-start relative z-10 mt-[-40px] md:-mt-[260px] md:-ml-[910px] z-30">
              {/* Star Image */}
              <img src="/images/HomePage/star.png" alt="Star" className="absolute top-[-30px] right-[-10%] md:top-[-40px] md:-right-[430px] w-[120px] md:w-[280px] -rotate-[6deg] z-0" />
              
              <div className="relative font-kura uppercase leading-[0.85] tracking-[-0.02em] text-center md:text-left z-10">
                {/* Shadow layer (Yellow) */}
                <div className="absolute inset-0 z-0 translate-y-[5px] translate-x-[5px] md:translate-y-[10px] md:translate-x-[15px]" style={{ color: '#F7D80C' }}>
                  <div className="text-[80px] md:text-[260px] whitespace-nowrap md:-ml-[40px]">HOW WE</div>
                  <div className="text-[80px] md:text-[260px] whitespace-nowrap">MAKE IT</div>
                </div>
                
                {/* Fill layer (Green) */}
                <div className="relative z-10" style={{ color: '#156B36' }}>
                  <div className="text-[80px] md:text-[260px] whitespace-nowrap md:-ml-[40px]">HOW WE</div>
                  <div className="text-[80px] md:text-[260px] whitespace-nowrap">MAKE IT</div>
                </div>
              </div>
            </div>
          </div>

          {/* Dotted Line SVG (Background) */}
          <AnimatedDottedLine />

          {/* Process Steps Container */}
          <div className="relative w-full max-w-[1200px] mx-auto mt-10 md:-mt-20 px-4 md:px-8 flex flex-col gap-32 md:gap-40 z-10 md:-mb-[3000px]">
            
            {/* Step 1: Chefs (Right) */}
            <div className="flex justify-end w-full relative md:top-[-200px] md:right-[-340px]">
              <SlideIn direction="right" className="relative w-[100%] md:w-[80%]">
                <img src="/images/HomePage/process1.png" alt="Chefs" className="w-full h-auto drop-shadow-2xl" />
              </SlideIn>
            </div>

            {/* Step 2: Stove with 3 pots (Left) */}
            <div className="flex justify-start w-full relative mt-10 md:top-[-880px] md:left-[-370px] md:scale-[2] origin-left">
              <SlideIn direction="left" className="relative w-[100%] md:w-[70%]">
                <img src="/images/HomePage/process2.png" alt="Stove" className="w-full h-auto drop-shadow-2xl" />
              </SlideIn>
            </div>

            {/* Step 3: Lady Tasting (Right) */}
            <div className="flex justify-end w-full relative mt-10 md:top-[-1380px] md:right-[-280px]">
              <SlideIn direction="right" className="relative w-[90%] md:w-[65%]">
                <img src="/images/HomePage/process3.png" alt="Quality Check" className="w-full h-auto drop-shadow-2xl" />
              </SlideIn>
            </div>

            {/* Step 4: Single Pot (Left) */}
            <div className="flex justify-start w-full relative mt-10 md:top-[-1800px] md:left-[-250px]">
              <SlideIn direction="left" className="relative w-[100%] md:w-[55%]">
                <img src="/images/HomePage/process4.png" alt="Single Pot" className="w-full h-auto drop-shadow-2xl" />
              </SlideIn>
            </div>

            {/* Step 5: Bowl of Gravy (Right) */}
            <div className="flex justify-end w-full relative mt-10 md:top-[-2150px] md:right-[-350px]">
              <SlideIn direction="right" className="relative w-[100%] md:w-[85%]">
                <img src="/images/HomePage/process5.png" alt="Gravy Bowl" className="w-full h-auto drop-shadow-2xl" />
              </SlideIn>
            </div>

            {/* Step 6: Cold Storage (Left) */}
            <div className="flex justify-start w-full relative mt-10 md:top-[-2900px] md:left-[-450px]">
              <SlideIn direction="left" className="relative w-[100%] md:w-[90%]">
                <img src="/images/HomePage/process6.png" alt="Cold Storage" className="w-full h-auto drop-shadow-2xl" />
              </SlideIn>
            </div>

          </div>
        </section>

        {/* 20+ RECIPES Section */}
        <section className="relative w-full bg-transparent flex flex-col items-center overflow-hidden -mt-[100px] md:-mt-[150px] z-20">
          <div className="relative w-full min-h-[200vh] flex flex-col items-center pt-[150px] md:pt-[250px] pb-20 md:pb-32" style={{ backgroundImage: "url('/images/HomePage/yellow bg.png')", backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            
            {/* Heading */}
            <div className="relative z-10 flex flex-col items-center -mt-4 md:-mt-10 font-kura leading-none text-center pointer-events-none">
              <h2 className="relative z-10 text-[#156B37] text-[120px] md:text-[300px] tracking-[-0.02em]" style={{ textShadow: '1px 1px 0 #F7D80C, 2px 2px 0 #F7D80C, 3px 3px 0 #F7D80C, 4px 4px 0 #F7D80C, 5px 5px 0 #F7D80C, 6px 6px 0 #F7D80C, 7px 7px 0 #F7D80C, 8px 8px 0 #F7D80C, 9px 9px 0 #F7D80C, 10px 10px 0 #F7D80C, 11px 11px 0 #F7D80C, 12px 12px 0 #F7D80C, 13px 13px 0 #F7D80C, 14px 14px 0 #F7D80C, 15px 15px 0 #F7D80C, 16px 16px 0 #F7D80C, 17px 17px 0 #F7D80C, 18px 18px 0 #F7D80C, 19px 19px 0 #F7D80C, 20px 20px 0 #F7D80C' }}>20+</h2>
              <h2 className="relative z-20 text-[#156B37] text-[70px] md:text-[240px] tracking-[-0.02em] -mt-10 md:-mt-[50px]" style={{ textShadow: '1px 1px 0 #F7D80C, 2px 2px 0 #F7D80C, 3px 3px 0 #F7D80C, 4px 4px 0 #F7D80C, 5px 5px 0 #F7D80C, 6px 6px 0 #F7D80C, 7px 7px 0 #F7D80C, 8px 8px 0 #F7D80C, 9px 9px 0 #F7D80C, 10px 10px 0 #F7D80C, 11px 11px 0 #F7D80C, 12px 12px 0 #F7D80C, 13px 13px 0 #F7D80C, 14px 14px 0 #F7D80C, 15px 15px 0 #F7D80C, 16px 16px 0 #F7D80C, 17px 17px 0 #F7D80C, 18px 18px 0 #F7D80C, 19px 19px 0 #F7D80C, 20px 20px 0 #F7D80C' }}>RECIPES</h2>
            </div>
            
            {/* Center Container for Product and Dishes */}
            <div className="absolute inset-0 w-full h-full flex items-center justify-center z-20 pointer-events-none">
              
              {/* Center Product */}
              <div className="absolute top-[50%] md:top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-[200px] md:w-[680px]">
                <img src="/images/HomePage/product package 2.png" alt="Smoked Makhani Gravy" className="w-full h-auto drop-shadow-2xl" />
              </div>

              {/* --- VEG DISHES (LEFT) --- */}
              {/* Dish 1: Bhindi Masala (Top Left) */}
              <div className="absolute top-[4%] left-[-40%] md:top-[8%] md:left-[-8%] w-[370px] md:w-[700px] z-30">
                <img src="/images/HomePage/bhindi.png" alt="Bhindi Masala" className="w-full h-auto drop-shadow-xl" />
              </div>

              {/* Dish 2: Aloo Gobhi (Middle Left) */}
              <div className="absolute top-[55%] left-[-35%] md:top-[50%] md:left-[-12%] w-[350px] md:w-[900px] -translate-y-1/2 z-20">
                <img src="/images/HomePage/aloo.png" alt="Aloo Gobhi" className="w-full h-auto drop-shadow-xl" />
              </div>

              {/* Dish 3: Mutter Paneer (Bottom Left) */}
              <div className="absolute bottom-[0%] left-[-30%] md:bottom-[-2%] md:left-[-18%] w-[390px] md:w-[1000px] z-10">
                <img src="/images/HomePage/panner.png" alt="Mutter Paneer" className="w-full h-auto drop-shadow-xl" />
              </div>

              {/* --- NON-VEG DISHES (RIGHT) --- */}
              {/* Dish 4: Egg Curry (Top Right) */}
              <div className="absolute top-[4%] right-[-35%] md:top-[0%] md:right-[-16%] w-[420px] md:w-[950px] z-30">
                <img src="/images/HomePage/egg.png" alt="Egg Curry" className="w-full h-auto drop-shadow-xl" />
              </div>

              {/* Dish 5: Chicken Curry (Middle Right) */}
              <div className="absolute top-[45%] right-[-35%] md:top-[50%] md:right-[-24%] w-[320px] md:w-[850px] -translate-y-1/2 z-40">
                <img src="/images/HomePage/chicken.png" alt="Chicken Curry" className="w-full h-auto drop-shadow-xl" />
              </div>

              {/* Dish 6: Mutton Sukka (Bottom Right) */}
              <div className="absolute bottom-[2%] right-[-30%] md:bottom-[10%] md:right-[-18%] w-[280px] md:w-[950px] z-30">
                <img src="/images/HomePage/mutton.png" alt="Mutton Sukka" className="w-full h-auto drop-shadow-xl" />
              </div>

              {/* --- ARROWS --- */}
              <svg className="absolute inset-0 w-full h-full z-10 hidden md:block" viewBox="0 0 1920 1080" fill="none">
                {/* To Bhindi Masala (Top Left) */}
                <path d="M620,450 Q550,350 450,300" stroke="#E3002B" strokeWidth="8" strokeDasharray="16 16" strokeLinecap="round"/>
                <path d="M480,280 L450,300 L470,330" stroke="#E3002B" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                
                {/* To Aloo Gobhi (Middle Left) */}
                <path d="M600,650 Q525,600 450,650" stroke="#E3002B" strokeWidth="8" strokeDasharray="16 16" strokeLinecap="round"/>
                <path d="M480,630 L450,650 L470,680" stroke="#E3002B" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>

                {/* To Mutter Paneer (Bottom Left) - loops from below */}
                <path d="M800,950 Q750,1050 500,950" stroke="#E3002B" strokeWidth="8" strokeDasharray="16 16" strokeLinecap="round"/>
                <path d="M530,930 L500,950 L530,970" stroke="#E3002B" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>

                {/* To Egg Curry (Top Right) */}
                <path d="M1300,450 Q1370,350 1470,300" stroke="#E3002B" strokeWidth="8" strokeDasharray="16 16" strokeLinecap="round"/>
                <path d="M1440,280 L1470,300 L1450,330" stroke="#E3002B" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>

                {/* To Chicken Curry (Middle Right) */}
                <path d="M1320,650 Q1395,600 1470,650" stroke="#E3002B" strokeWidth="8" strokeDasharray="16 16" strokeLinecap="round"/>
                <path d="M1440,630 L1470,650 L1450,680" stroke="#E3002B" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>

                {/* To Mutton Sukka (Bottom Right) - loops from below */}
                <path d="M1120,950 Q1170,1050 1420,950" stroke="#E3002B" strokeWidth="8" strokeDasharray="16 16" strokeLinecap="round"/>
                <path d="M1390,930 L1420,950 L1390,970" stroke="#E3002B" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>

            </div>
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
                <div className="text-[90px] md:text-[280px]">WHAT PEOPLE</div>
                <div className="text-[90px] md:text-[280px]">ARE SAYING</div>
              </div>

              {/* Fill layer */}
              <div className="relative z-10 flex flex-col items-center w-full" style={{ color: '#F7D80C' }}>
                <div className="text-[90px] md:text-[280px]">WHAT PEOPLE</div>
                <div className="relative text-[90px] md:text-[280px]">
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
        <section className="relative w-full h-[160vh] bg-[#FBF5E1] pt-12 md:pt-24 overflow-hidden font-arpona flex flex-col items-center">
          
          {/* Order Now Button */}
          <button className="bg-[#F7D80C] text-black font-arpona font-medium text-[20px] md:text-[32px] leading-tight px-8 md:px-12 py-3 md:py-3 rounded-xl mb-12 shadow-md hover:bg-yellow-400 transition-colors z-40">
            Order now
          </button>

          {/* Main Heading */}
          <div className="relative w-full flex flex-col items-center justify-center text-center mt-4">
            
            <div className="relative z-10 font-kura uppercase leading-[0.85] tracking-[-0.02em] text-center flex flex-col items-center w-full">
              
              {/* Shadow layer */}
              <div className="absolute inset-0 flex flex-col items-center z-0 pointer-events-none translate-y-[5px] translate-x-[8px] md:translate-y-[10px] md:translate-x-[16px]" style={{ color: '#F7D80C' }}>
                <div className="text-[80px] md:text-[270px] whitespace-nowrap">READY TO COOK</div>
                <div className="text-[80px] md:text-[270px] whitespace-nowrap">SMARTSMRTER</div>
                <div className="text-[80px] md:text-[270px] whitespace-nowrap" style={{ letterSpacing: '0.04em', marginLeft: '0.04em' }}>EVERY ERDAY?</div>
              </div>

              {/* Fill layer */}
              <div className="relative z-10 flex flex-col items-center w-full" style={{ color: '#156B37' }}>
                <div className="relative text-[80px] md:text-[270px] w-full flex justify-center whitespace-nowrap">
                  READY TO COOK
                  {/* Chef Effort Sticker */}
                  <img 
                    src="/images/HomePage/chef effort sticker.png" 
                    alt="Chef Effort Sticker" 
                    className="absolute left-[-5%] md:left-[5%] -top-[20%] md:-top-[60%] w-[120px] md:w-[300px] -rotate-3 z-30 pointer-events-none"
                  />
                </div>
                <div className="text-[80px] md:text-[270px] whitespace-nowrap">SMARTSMRTER</div>
                <div className="text-[80px] md:text-[270px] whitespace-nowrap" style={{ letterSpacing: '0.04em', marginLeft: '0.04em' }}>EVERY ERDAY?</div>
              </div>

            </div>

            {/* Product Image */}
            <div className="absolute top-[35%] md:-top-[10%] left-[50%] md:left-[58%] -translate-x-1/2 z-20 w-[95%] md:w-[1200px]">
              <img src="/images/HomePage/product%20package%203.png" alt="Smoked Makhani Gravy" className="w-full h-auto drop-shadow-2xl" />
            </div>

          </div>
          
          {/* Footer Wavy Transition removed as footer now uses background image */}
        </section>

        {/* FOOTER SECTION REMOVED */}

      </main>
    </div>
  );
}

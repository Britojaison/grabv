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

const AnimatedDottedLine = ({ className = "absolute top-[400px] md:top-[850px] left-0 w-full h-[1500px] md:h-[2200px] pointer-events-none z-0" }: { className?: string }) => {
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
    <div ref={containerRef} className={className}>
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
  const [activeProductMobile, setActiveProductMobile] = useState(0);
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
  
  const textSectionRef = useRef<HTMLElement | null>(null);
  const [isTextVisible, setIsTextVisible] = useState(false);

  const readyToCookSectionRef = useRef<HTMLElement | null>(null);
  const [isReadyToCookVisible, setIsReadyToCookVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsTextVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );
    if (textSectionRef.current) observer.observe(textSectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsReadyToCookVisible(entry.isIntersecting);
      },
      { threshold: 0.45 }
    );
    if (readyToCookSectionRef.current) observer.observe(readyToCookSectionRef.current);
    return () => observer.disconnect();
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
          
          if (window.innerWidth < 1280) {
            track.style.transform = `translate3d(0, 0, 0)`;
            return;
          }

          const rect = wrapper.getBoundingClientRect();
          const stickyOffset = 110;
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
          
          if (window.innerWidth < 1280) {
            track.style.transform = `translate3d(0, 0, 0)`;
            return;
          }

          const rect = wrapper.getBoundingClientRect();
          const stickyOffset = 110;
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
        <section ref={textSectionRef} className="relative w-full h-[65vw] xl:h-[100vh] flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#FBF5E1' }}>
          {/* Background Text Overlay */}
          <div className="absolute left-0 right-0 inset-y-0 flex flex-col justify-center items-center pointer-events-none select-none z-0 overflow-hidden font-kura uppercase tracking-[-0.07em] translate-y-0 xl:translate-y-8 px-[4vw] xl:px-[120px]" style={{ color: '#146A36' }}>
            <div 
              className="w-full flex justify-between h-[13vw] xl:h-[230px] mb-[1.5vw] xl:mb-4 text-[13vw] xl:text-[230px] leading-[1.0] transition-transform duration-1000 ease-out"
              style={{ transform: isTextVisible ? 'translateX(0)' : 'translateX(100vw)' }}
            >
              <span>FRESHLY</span>
              <span>MADE</span>
            </div>
            <div 
              className="w-full flex justify-between h-[10.5vw] xl:h-[165px] text-[10.5vw] xl:text-[165px] leading-[1.0] mt-[0.5vw] xl:mt-2 transition-transform duration-1000 ease-out"
              style={{ transform: isTextVisible ? 'translateX(0)' : 'translateX(-100vw)' }}
            >
              <span>READY</span>
              <span className="translate-x-[1vw] xl:translate-x-[20px]">IN 10 MIN</span>
            </div>
          </div>

          {/* Product Image */}
          <div className="relative z-10 w-[80vw] xl:w-[1500px] max-w-[110vw] h-[55vw] xl:h-[105vh] max-h-[1600px] translate-y-[2vw] xl:translate-y-20">
            <Image
              src="/images/HomePage/product package 1.png"
              alt="GrabV Product Package"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Bottom Left Text */}
          <div className="absolute bottom-[4vw] xl:bottom-8 left-[4vw] xl:left-[120px] z-20 flex flex-col gap-[2px] md:gap-0 tracking-[-0.05em] text-black">
            <span className="font-arpona font-medium text-[2.5vw] xl:text-[28px] leading-[1.1]">Veg or non-veg</span>
            <span className="font-arpona font-medium text-[2.5vw] xl:text-[28px] leading-[1.1]">Possibilities are endless</span>
          </div>

          {/* Bottom Right Text */}
          <div className="absolute bottom-[4vw] xl:bottom-8 right-[4vw] xl:right-[120px] z-20 flex flex-col gap-[2px] md:gap-0 tracking-[-0.05em] text-black text-right">
            <span className="font-arpona font-medium text-[2.5vw] xl:text-[28px] leading-[1.1]">Just add in the gravy</span>
            <span className="font-arpona font-medium text-[2.5vw] xl:text-[28px] leading-[1.1]">And enjoy your meal</span>
          </div>
        </section>

        {/* Pouch to Plate Section - Heading */}
        <section className="relative w-full flex flex-col items-center pt-[8vw] xl:pt-24 pb-0 xl:pb-12 overflow-hidden" style={{ backgroundColor: '#FBF5E1' }}>
          
          {/* Top text */}
          <p className="font-arpona text-[3.8vw] xl:text-[28px] leading-[1.0] tracking-[-0.05em] font-medium text-black mb-[4vw] xl:mb-10 text-center z-10">
            No Chopping. No Stress. Just Real Food.
          </p>

          {/* Huge Heading */}
          <div className="relative font-kura uppercase text-[14vw] xl:text-[260px] leading-[0.85] tracking-[-0.02em] text-center w-full flex justify-center drop-shadow-lg xl:drop-shadow-xl z-10">
            {/* Vegetables Behind Text */}
            <img src="/images/HomePage/tomato.png" alt="" className="absolute top-[-6%] xl:top-[-9%] left-[26%] xl:left-[25%] w-[15vw] xl:w-[265px] z-0 pointer-events-none" />
            <img src="/images/HomePage/onion.png" alt="" className="absolute top-[-6%] xl:top-[-8%] left-[20%] xl:left-[18%] w-[12.5vw] xl:w-[200px] -rotate-[15deg] z-[1] xl:z-0 pointer-events-none opacity-90" />

            {/* Shadow layer */}
            <div className="absolute inset-0 flex justify-center z-0 pointer-events-none translate-y-[1.5vw] translate-x-[2.2vw] xl:translate-y-[10px] xl:translate-x-[16px]" style={{ color: '#F7D80C' }}>
              <div>POUCH TO<br/>PLATE IN<br/>5 STEPS</div>
            </div>
            
            {/* Fill layer */}
            <div className="relative z-10" style={{ color: '#156B37' }}>
              <div>POUCH TO<br/>PLATE IN<br/>5 STEPS</div>
              {/* Homemade Sticker */}
              <img src="/images/HomePage/homemade.png" alt="Homemade-ish" className="absolute bottom-[20%] xl:bottom-[25%] right-[-25%] xl:right-[-10%] w-[24vw] xl:w-[290px] rotate-2 drop-shadow-xl z-20 pointer-events-none" />
            </div>
          </div>
        </section>

        {/* Pouch to Plate Wrapper for Scrolljacking */}
        <div ref={stepsContainerRef} className="relative w-full h-auto xl:h-[400vh] pb-20 xl:pb-0" style={{ backgroundColor: '#FBF5E1' }}>
          {/* Pouch to Plate Sticky Section */}
          <section className="relative xl:sticky top-[70px] xl:top-[110px] w-full h-auto xl:h-[calc(100vh-110px)] flex flex-col justify-start pt-0 xl:pt-0 mt-[-15px] xl:mt-0 xl:justify-center overflow-hidden" style={{ backgroundColor: '#FBF5E1' }}>
            {/* Horizontal Scrolling Track */}
            <div className="relative w-full z-30 h-auto xl:h-full flex items-start pt-0 xl:items-center overflow-x-auto overflow-y-hidden xl:overflow-visible snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div ref={stepsTrackRef} className="flex items-start xl:items-end gap-[20px] md:gap-[32px] xl:gap-[50px] pl-[5vw] xl:pl-[120px] pr-[5vw] xl:pr-[120px] pb-[4vw] xl:pb-0 will-change-transform w-max xl:w-[max-content]">
                
                {/* Step 1 */}
                <div className="w-[80vw] md:w-[65vw] lg:w-[55vw] xl:w-[880px] flex-shrink-0 flex flex-col justify-end snap-center">
                  <div className="relative">
                    <img src="/images/HomePage/cooking img1.png" className="w-full h-auto block drop-shadow-2xl object-contain object-bottom max-h-[30vh] md:max-h-[45vh] xl:max-h-[60vh]" alt="Step 1" />
                  </div>
                  <p className="mt-[4vw] md:mt-[3vw] lg:mt-[2vw] xl:mt-6 ml-0 xl:ml-4 font-arpona text-[4vw] md:text-[3.5vw] lg:text-[2.5vw] xl:text-[30px] tracking-[-0.05em] font-medium text-black drop-shadow-lg relative z-10 text-center xl:text-left">
                    Add your tempering (tadka) in oil.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="w-[80vw] md:w-[65vw] lg:w-[55vw] xl:w-[880px] flex-shrink-0 flex flex-col justify-end snap-center">
                  <div className="relative">
                    <img src="/images/HomePage/cooking img2.png" className="w-full h-auto block drop-shadow-2xl object-contain object-bottom max-h-[30vh] md:max-h-[45vh] xl:max-h-[60vh]" alt="Step 2" />
                  </div>
                  <p className="mt-[4vw] md:mt-[3vw] lg:mt-[2vw] xl:mt-6 ml-0 xl:ml-4 font-arpona text-[4vw] md:text-[3.5vw] lg:text-[2.5vw] xl:text-[30px] tracking-[-0.05em] font-medium text-black drop-shadow-lg relative z-10 text-center xl:text-left">
                    Sauté veggies or protein of your choice.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="w-[80vw] md:w-[65vw] lg:w-[55vw] xl:w-[880px] flex-shrink-0 flex flex-col justify-end snap-center">
                  <div className="relative">
                    <img src="/images/HomePage/cooking img3.png" className="w-full h-auto block drop-shadow-2xl object-contain object-bottom max-h-[30vh] md:max-h-[45vh] xl:max-h-[60vh]" alt="Step 3" />
                  </div>
                  <p className="mt-[4vw] md:mt-[3vw] lg:mt-[2vw] xl:mt-6 ml-0 xl:ml-4 font-arpona text-[4vw] md:text-[3.5vw] lg:text-[2.5vw] xl:text-[30px] tracking-[-0.05em] font-medium text-black drop-shadow-lg relative z-10 text-center xl:text-left">
                    Pour GrabV & adjust consistency
                  </p>
                </div>

                {/* Step 4 */}
                <div className="w-[80vw] md:w-[65vw] lg:w-[55vw] xl:w-[880px] flex-shrink-0 flex flex-col justify-end snap-center">
                  <div className="relative">
                    <img src="/images/HomePage/cooking img4.png" className="w-full h-auto block drop-shadow-2xl object-contain object-bottom max-h-[30vh] md:max-h-[45vh] xl:max-h-[60vh]" alt="Step 4" />
                  </div>
                  <p className="mt-[4vw] md:mt-[3vw] lg:mt-[2vw] xl:mt-6 ml-0 xl:ml-4 font-arpona text-[4vw] md:text-[3.5vw] lg:text-[2.5vw] xl:text-[30px] tracking-[-0.05em] font-medium text-black drop-shadow-lg relative z-10 text-center xl:text-left">
                    Add water as needed and let it simmer.
                  </p>
                </div>

                {/* Step 5 */}
                <div className="w-[80vw] md:w-[65vw] lg:w-[55vw] xl:w-[880px] flex-shrink-0 flex flex-col justify-end snap-center">
                  <div className="relative">
                    <img src="/images/HomePage/cooking img5.png" className="w-full h-auto block drop-shadow-2xl object-contain object-bottom max-h-[30vh] md:max-h-[45vh] xl:max-h-[60vh]" alt="Step 5" />
                  </div>
                  <p className="mt-[4vw] md:mt-[3vw] lg:mt-[2vw] xl:mt-6 ml-0 xl:ml-4 font-arpona text-[4vw] md:text-[3.5vw] lg:text-[2.5vw] xl:text-[30px] tracking-[-0.05em] font-medium text-black drop-shadow-lg relative z-10 text-center xl:text-left">
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
            <img src="/images/HomePage/red2%20bg.png" alt="Red torn background top" className="w-full h-[150px] md:h-[190px] xl:h-[250px] object-cover object-top shrink-0" />
            
            {/* Middle fill (stretched vertically to fill space) */}
            <div className="flex-1 w-full overflow-hidden relative">
              <img src="/images/HomePage/red2%20bg.png" alt="" className="absolute inset-0 w-full h-full object-cover object-center scale-y-[100]" />
            </div>

            {/* Bottom curve */}
            <img src="/images/HomePage/red2%20bg.png" alt="Red torn background bottom" className="w-full h-[150px] md:h-[190px] xl:h-[250px] object-cover object-bottom shrink-0" />
          </div>

          <section className="relative w-full flex flex-col items-center pt-[11vw] xl:pt-[100px] pb-0 xl:pb-12 z-10">
            {/* Huge Heading */}
            <div className="relative z-10 font-kura uppercase leading-[0.8] tracking-[-0.02em] text-center flex flex-col items-center w-full">
              
              {/* Onion Image Behind Text */}
              <img src="/images/HomePage/onion.png" className="absolute left-[8%] xl:left-[11%] top-[12%] xl:top-[15%] w-[19.5vw] xl:w-[290px] object-contain z-[-1] pointer-events-none -rotate-12" alt="" />

              {/* Shadow layer (Green) */}
              <div className="absolute inset-0 flex flex-col items-center z-0 pointer-events-none translate-y-[1.4vw] translate-x-[2.2vw] xl:translate-y-[10px] xl:translate-x-[16px]" style={{ color: '#156B37' }}>
                <div className="text-[18vw] xl:text-[260px]">OUR</div>
                <div className="text-[18vw] xl:text-[260px]">PRODUCTS</div>
              </div>

              {/* Fill layer (Yellow) */}
              <div className="relative z-10 flex flex-col items-center w-full" style={{ color: '#F7D80C' }}>
                <div className="relative w-full flex justify-center text-[18vw] xl:text-[260px]">
                  OUR
                  {/* Grab Your Packs text */}
                  <div className="absolute top-[81%] xl:top-[82%] -translate-y-1/2 right-[12%] md:right-[9%] lg:right-[7%] xl:right-[19%] font-arpona text-[2.8vw] xl:text-[24px] tracking-tight font-medium text-white normal-case drop-shadow-none pointer-events-none">
                    Grab Your Packs
                  </div>
                </div>
                <div className="text-[18vw] xl:text-[260px]">
                  PRODUCTS
                </div>
              </div>
            </div>

          </section>

          {/* Our Products Wrapper for Scrolljacking */}
          {/* Our Products Wrapper for Scrolljacking */}
          <div ref={productsContainerRef} className="relative w-full h-auto xl:h-[250vh] z-10 mt-[-60px] xl:mt-0">
            {/* Our Products Sticky Section */}
            <section className="relative xl:sticky top-[70px] xl:top-[110px] w-full h-auto xl:h-[calc(100vh-110px)] flex flex-col justify-start xl:justify-center overflow-hidden">
            
            {/* Horizontal Scrolling Track */}
            <div 
              className="relative w-full z-30 overflow-x-auto xl:overflow-visible snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              onScroll={(e) => {
                const scrollLeft = e.currentTarget.scrollLeft;
                const width = e.currentTarget.clientWidth;
                const index = Math.round(scrollLeft / width);
                setActiveProductMobile(index);
              }}
            >
              <div ref={productsTrackRef} className="flex items-start xl:items-center gap-0 xl:gap-[100px] pl-[5vw] xl:pl-[120px] pr-[5vw] xl:pr-[120px] pb-8 xl:pb-0 will-change-transform w-max xl:w-[max-content]">
                
                {/* Product 1 */}
                <div className="relative inline-block flex-shrink-0 flex flex-col items-center xl:items-end w-auto snap-center">
                  <div className="relative w-[100vw] xl:w-auto">
                    <img src="/images/HomePage/product1.png" className="w-[100vw] xl:w-auto h-auto xl:h-[950px] object-contain block drop-shadow-2xl" alt="Product 1" />
                    
                    <div className="absolute top-[34%] left-[64%] w-[36%] flex flex-col items-start text-black font-arpona">
                      <h3 className="text-[3.9vw] xl:text-[50px] leading-[1.0] tracking-[-0.05em] font-bold">
                        ONION<br/>TOMATO<br/>GRAVY
                      </h3>
                      
                      <div className="mt-[1vw] xl:mt-7 flex flex-col gap-0 xl:gap-1 text-[2vw] xl:text-[24px] font-medium tracking-tight">
                        <p>Zero Added Preservatives</p>
                        <p>All Purpose Gravy</p>
                        <p>Slow Cooked</p>
                      </div>
                      
                      <button className="mt-[2vw] xl:mt-10 bg-[rgb(247,216,13)] text-black px-[2.2vw] xl:px-7 py-[0.5vw] xl:py-2 rounded-[0.8vw] xl:rounded-[6px] font-medium text-[2.2vw] xl:text-[20px] hover:bg-yellow-400 transition-colors flex items-center justify-center gap-[1vw] xl:gap-2 shadow-sm whitespace-nowrap">
                        View Product
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[2vw] h-[2vw] xl:w-5 xl:h-5 ml-[0.5vw] xl:ml-1">
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  {/* See more button */}
                  <div className="mt-[-20px] xl:mt-[-40px] z-20 hidden xl:block">
                    <button className="bg-[rgb(247,216,13)] text-black px-8 xl:px-10 py-2 xl:py-3 rounded-[6px] font-bold text-[18px] xl:text-[24px] hover:bg-yellow-400 transition-colors shadow-sm tracking-tight font-arpona">
                      See more
                    </button>
                  </div>
                </div>

                {/* Product 2 */}
                <div className="relative inline-block flex-shrink-0 flex flex-col items-center xl:items-end w-auto snap-center group">
                  <div className="relative w-[100vw] xl:w-auto">
                    <img src="/images/HomePage/product2.png" className="w-[100vw] xl:w-auto h-auto xl:h-[950px] object-contain block drop-shadow-2xl grayscale-[0.8] opacity-80" alt="Product 2" />
                    
                    {/* Coming Soon Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                      <div className="bg-black/40 backdrop-blur-md px-[6vw] md:px-[4vw] lg:px-[3vw] xl:px-12 py-[2vw] md:py-[1.5vw] lg:py-[1vw] xl:py-4 rounded-full border border-white/20 shadow-xl">
                        <p className="text-white font-arpona font-medium text-[3.3vw] md:text-[2.2vw] lg:text-[1.8vw] xl:text-[22px] uppercase tracking-[0.25em] text-center">
                          Coming Soon
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Mobile Shared Fixed Indicators & Button */}
            <div className="flex flex-col items-center mt-[-5vw] md:mt-[-3vw] pb-[6vw] md:pb-[4vw] xl:hidden w-full relative z-40">
              <div className="flex justify-center gap-[2vw] md:gap-[1.5vw] mb-[4vw] md:mb-[2.5vw]">
                <div className={`w-[5vw] md:w-[3vw] lg:w-[2.5vw] h-[1.5vw] md:h-[0.8vw] lg:h-[0.6vw] rounded-full transition-colors ${activeProductMobile === 0 ? 'bg-[#F7D80C]' : 'bg-white/80'}`} />
                <div className={`w-[5vw] md:w-[3vw] lg:w-[2.5vw] h-[1.5vw] md:h-[0.8vw] lg:h-[0.6vw] rounded-full transition-colors ${activeProductMobile === 1 ? 'bg-[#F7D80C]' : 'bg-white/80'}`} />
              </div>
              <button className={`bg-[#F7D80C] text-black px-[6vw] md:px-[4vw] lg:px-[3vw] py-[1.5vw] md:py-[1vw] lg:py-[0.8vw] rounded-[1.5vw] md:rounded-[1vw] lg:rounded-[0.8vw] font-bold text-[3.3vw] md:text-[2.2vw] lg:text-[1.8vw] shadow-sm tracking-tight font-arpona transition-opacity ${activeProductMobile === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                See more
              </button>
            </div>
            {/* See more button - Absolute bottom right */}
            <div className="absolute bottom-[1%] xl:bottom-[2%] right-[5%] xl:right-[10%] z-40 pointer-events-auto hidden xl:block">
              <Link href="/products" className="inline-block bg-[#F7D80C] text-black font-arpona font-medium text-[18px] xl:text-[20px] tracking-[-0.05em] px-6 py-1 xl:px-8 xl:py-2 rounded-[5px] shadow-lg hover:scale-105 transition-transform duration-300">
                See more
              </Link>
            </div>

          </section>
        </div>
        {/* End of Entire Red Section Wrapper */}
        </div>

        {/* HOW WE MAKE IT Section */}
        <section className="relative w-full bg-[#FBF5E1] pt-12 md:pt-16 xl:pt-24 pb-32 md:pb-40 xl:pb-48 overflow-visible z-0">
          
          {/* Top Heading Area */}
          {/* Top Heading Area */}
          <div className="relative w-full max-w-[1400px] mx-auto px-4 md:px-8 flex flex-col xl:flex-row items-center xl:items-start justify-start xl:justify-between min-h-[300px] md:min-h-[400px] lg:min-h-[550px] xl:min-h-[700px] z-20">
            
            {/* Left: Gravy Pouring Image */}
            <div className="w-[65%] md:w-[60%] lg:w-[50%] relative flex justify-center xl:justify-end z-20 -mt-[145px] md:-mt-[220px] lg:-mt-[300px] xl:-mt-[320px] -translate-x-[75px] min-[361px]:max-[399px]:-translate-x-[95px] min-[400px]:max-[450px]:-translate-x-[115px] sm:-translate-x-[50px] md:-translate-x-[260px] lg:-translate-x-[360px] xl:-translate-x-24">
              <img src="/images/HomePage/Gravy pouring.png" alt="Gravy Pouring" className="w-[100%] md:w-[105%] max-w-[220px] md:max-w-[420px] lg:max-w-[600px] xl:max-w-[800px] object-contain drop-shadow-2xl" />
            </div>

            {/* Right: Text and Star */}
            <div className="w-full xl:w-[52%] flex flex-col items-center xl:items-start relative z-10 -mt-[180px] sm:-mt-[100px] md:-mt-[300px] lg:-mt-[420px] xl:mt-0 max-[360px]:ml-[40px] min-[361px]:max-[450px]:ml-[20px] md:ml-[30px] lg:ml-[40px] xl:-ml-16 z-30">
              {/* Star Image */}
              <img src="/images/HomePage/star.png" alt="Star" className="absolute top-[-38px] right-[8%] md:w-[110px] md:top-[-20px] md:right-[15%] lg:w-[160px] lg:top-[-30px] lg:right-[18%] xl:w-[220px] xl:top-[-40px] xl:-right-[100px] w-[70px] -rotate-[6deg] z-0" />
              
              <div className="relative font-kura uppercase leading-[0.85] tracking-[-0.02em] text-center xl:text-left z-10">
                {/* Shadow layer (Yellow) */}
                <div className="absolute inset-0 z-0 translate-y-[5px] translate-x-[5px] md:translate-y-[8px] md:translate-x-[10px] xl:translate-y-[10px] xl:translate-x-[15px]" style={{ color: '#F7D80C' }}>
                  <div className="text-[45px] min-[361px]:max-[450px]:text-[55px] sm:text-[65px] md:text-[90px] lg:text-[110px] xl:text-[180px] whitespace-nowrap xl:-ml-[40px]">HOW WE</div>
                  <div className="text-[45px] min-[361px]:max-[450px]:text-[55px] sm:text-[65px] md:text-[90px] lg:text-[110px] xl:text-[180px] whitespace-nowrap">MAKE IT</div>
                </div>
                
                {/* Fill layer (Green) */}
                <div className="relative z-10" style={{ color: '#156B36' }}>
                  <div className="text-[45px] min-[361px]:max-[450px]:text-[55px] sm:text-[65px] md:text-[90px] lg:text-[110px] xl:text-[180px] whitespace-nowrap xl:-ml-[40px]">HOW WE</div>
                  <div className="text-[45px] min-[361px]:max-[450px]:text-[55px] sm:text-[65px] md:text-[90px] lg:text-[110px] xl:text-[180px] whitespace-nowrap">MAKE IT</div>
                </div>
              </div>
            </div>

          </div>

          {/* Process Steps Container */}
          <div className="relative w-full max-w-[1200px] mx-auto max-[450px]:-mt-[160px] mt-10 md:mt-16 lg:mt-24 px-4 md:px-8 h-auto xl:h-[2600px] flex flex-col xl:block max-[450px]:gap-2 gap-12 xl:gap-0 z-10 max-[450px]:translate-x-[25px]">
            
            {/* Dotted Line SVG (Background) */}
            <AnimatedDottedLine className="absolute top-[8%] sm:inset-0 left-0 w-full h-[84%] sm:h-full pointer-events-none z-0" />

            {/* Step 1: Chefs (Right) */}
            <div className="relative w-full flex justify-end xl:absolute xl:top-[0%] xl:-translate-y-1/2 xl:right-[2%] xl:w-[45%] order-1">
              <SlideIn direction="right" className="relative max-[450px]:w-[115%] w-[85%] md:w-[75%] lg:w-[65%] xl:w-full flex-shrink-0">
                <img src="/images/HomePage/process1.png" alt="Chefs" className="w-full h-auto drop-shadow-2xl max-[360px]:translate-x-[15px] min-[361px]:max-[450px]:translate-x-[55px] min-[361px]:max-[450px]:translate-y-[40px]" />
              </SlideIn>
            </div>

            {/* Step 2: Stove with 3 pots (Left) */}
            <div className="relative w-full flex justify-start -mt-8 md:mt-0 xl:absolute xl:top-[20%] xl:-translate-y-1/2 xl:left-[2%] xl:w-[45%] order-2">
              <SlideIn direction="left" className="relative max-[450px]:w-[160%] max-[450px]:-ml-[5%] w-[115%] md:w-[90%] lg:w-[80%] -ml-[7%] md:-ml-0 xl:w-full flex-shrink-0">
                <img src="/images/HomePage/process2.png" alt="Stove" className="w-full h-auto drop-shadow-2xl max-[450px]:translate-x-[15px]" />
              </SlideIn>
            </div>

            {/* Step 3: Lady Tasting (Right) */}
            <div className="relative w-full flex justify-end xl:absolute xl:top-[40%] xl:-translate-y-1/2 xl:right-[2%] xl:w-[45%] order-3">
              <SlideIn direction="right" className="relative max-[450px]:w-[115%] w-[85%] md:w-[75%] lg:w-[65%] xl:w-full flex-shrink-0">
                <img src="/images/HomePage/process3.png" alt="Quality Check" className="w-full h-auto drop-shadow-2xl" />
              </SlideIn>
            </div>

            {/* Step 4: Single Pot (Left) */}
            <div className="relative w-full flex justify-start xl:absolute xl:top-[60%] xl:-translate-y-1/2 xl:left-[2%] xl:w-[45%] order-4">
              <SlideIn direction="left" className="relative max-[450px]:w-[85%] w-[75%] md:w-[65%] lg:w-[55%] xl:w-full flex-shrink-0">
                <img src="/images/HomePage/process4.png" alt="Single Pot" className="w-full h-auto drop-shadow-2xl" />
              </SlideIn>
            </div>

            {/* Step 5: Bowl of Gravy (Right) - Remains 5th on mobile */}
            <div className="relative w-full flex justify-end xl:absolute xl:top-[80%] xl:-translate-y-1/2 xl:right-[2%] xl:w-[45%] order-5">
              <SlideIn direction="right" className="relative max-[360px]:w-[125%] min-[361px]:max-[450px]:w-[110%] w-[95%] md:w-[85%] lg:w-[75%] xl:w-full flex-shrink-0">
                <img src="/images/HomePage/process5.png" alt="Gravy Bowl" className="w-full h-auto drop-shadow-2xl min-[361px]:max-[450px]:translate-x-[20px]" />
              </SlideIn>
            </div>

            {/* Step 6: Cold Storage (Left) */}
            <div className="relative w-full flex justify-start -mt-8 md:mt-0 xl:absolute xl:top-[100%] xl:-translate-y-1/2 xl:left-[2%] xl:w-[45%] order-6">
              <SlideIn direction="left" className="relative max-[450px]:-mt-[10px] max-[450px]:w-[120%] max-[450px]:-ml-[10%] w-[100%] md:w-[85%] lg:w-[75%] xl:w-full flex-shrink-0">
                <img src="/images/HomePage/process6.png" alt="Cold Storage" className="w-full h-auto drop-shadow-2xl max-[450px]:-translate-x-[50px]" />
              </SlideIn>
            </div>

          </div>
        </section>

        {/* 20+ RECIPES Section */}
        <section className="relative w-full bg-transparent flex flex-col items-center overflow-hidden -mt-[160px] z-20">
          <div className="relative w-full h-[141vw] sm:h-[600px] md:h-auto md:min-h-[200vh] flex flex-col items-center pt-[70px] md:pt-[250px] pb-20 md:pb-32" style={{ backgroundImage: "url('/images/HomePage/yellow bg.png')", backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            
            {/* Heading */}
            <div className="relative z-10 flex flex-col items-center -mt-8 sm:mt-0 md:-mt-10 font-kura leading-none text-center pointer-events-none">
              {/* Mobile Heading */}
              <h2 className="relative z-10 text-[#156B37] text-[18vw] sm:text-[80px] tracking-[-0.02em] leading-none md:hidden" style={{ textShadow: '1px 1px 0 #F7D80C, 2px 2px 0 #F7D80C, 3px 3px 0 #F7D80C, 4px 4px 0 #F7D80C, 5px 5px 0 #F7D80C, 6px 6px 0 #F7D80C, 7px 7px 0 #F7D80C, 8px 8px 0 #F7D80C' }}>20+</h2>
              <h2 className="relative z-20 text-[#156B37] text-[15vw] sm:text-[65px] tracking-[-0.02em] -mt-1 sm:-mt-2 leading-none md:hidden" style={{ textShadow: '1px 1px 0 #F7D80C, 2px 2px 0 #F7D80C, 3px 3px 0 #F7D80C, 4px 4px 0 #F7D80C, 5px 5px 0 #F7D80C' }}>RECIPES</h2>
              
              {/* Desktop Heading */}
              <h2 className="relative z-10 text-[#156B37] text-[300px] tracking-[-0.02em] leading-none hidden md:block" style={{ textShadow: '1px 1px 0 #F7D80C, 2px 2px 0 #F7D80C, 3px 3px 0 #F7D80C, 4px 4px 0 #F7D80C, 5px 5px 0 #F7D80C, 6px 6px 0 #F7D80C, 7px 7px 0 #F7D80C, 8px 8px 0 #F7D80C, 9px 9px 0 #F7D80C, 10px 10px 0 #F7D80C, 11px 11px 0 #F7D80C, 12px 12px 0 #F7D80C, 13px 13px 0 #F7D80C, 14px 14px 0 #F7D80C, 15px 15px 0 #F7D80C, 16px 16px 0 #F7D80C, 17px 17px 0 #F7D80C, 18px 18px 0 #F7D80C, 19px 19px 0 #F7D80C, 20px 20px 0 #F7D80C' }}>20+</h2>
              <h2 className="relative z-20 text-[#156B37] text-[240px] tracking-[-0.02em] -mt-[50px] leading-none hidden md:block" style={{ textShadow: '1px 1px 0 #F7D80C, 2px 2px 0 #F7D80C, 3px 3px 0 #F7D80C, 4px 4px 0 #F7D80C, 5px 5px 0 #F7D80C, 6px 6px 0 #F7D80C, 7px 7px 0 #F7D80C, 8px 8px 0 #F7D80C, 9px 9px 0 #F7D80C, 10px 10px 0 #F7D80C, 11px 11px 0 #F7D80C, 12px 12px 0 #F7D80C, 13px 13px 0 #F7D80C, 14px 14px 0 #F7D80C, 15px 15px 0 #F7D80C, 16px 16px 0 #F7D80C, 17px 17px 0 #F7D80C, 18px 18px 0 #F7D80C, 19px 19px 0 #F7D80C, 20px 20px 0 #F7D80C' }}>RECIPES</h2>
            </div>
            
            {/* Center Container for Product and Dishes */}
            <div className="absolute inset-0 w-full h-full flex items-center justify-center z-20 pointer-events-none">
                            {/* Center Product */}
              <div className="absolute top-[74vw] sm:top-[315px] md:top-[57%] left-[48%] md:left-[50%] -translate-x-1/2 -translate-y-1/2 z-30 w-[36vw] sm:w-[155px] md:w-[680px]">
                <img src="/images/HomePage/product package 2.png" alt="Smoked Makhani Gravy" className="w-full h-auto drop-shadow-2xl" />
              </div>

              {/* --- VEG DISHES (LEFT) --- */}
              {/* Dish 1: Bhindi Masala (Top Left) */}
              <div className="absolute top-[17vw] sm:top-[72px] left-[-18%] md:top-[8%] md:left-[-8%] w-[42vw] sm:w-[180px] md:w-[700px] z-30">
                <img src="/images/HomePage/bhindi.png" alt="Bhindi Masala" className="w-full h-auto drop-shadow-xl" />
              </div>

              {/* Dish 2: Aloo Gobhi (Middle Left) */}
              <div className="absolute top-[70vw] sm:top-[300px] left-[-22%] md:top-[50%] md:left-[-12%] w-[47vw] sm:w-[200px] md:w-[900px] -translate-y-1/2 z-20">
                <img src="/images/HomePage/aloo.png" alt="Aloo Gobhi" className="w-full h-auto drop-shadow-xl" />
              </div>

              {/* Dish 3: Mutter Paneer (Bottom Left) */}
              <div className="absolute top-[71vw] sm:top-[302px] left-[-28%] md:top-auto md:bottom-[-2%] md:left-[-18%] w-[61vw] sm:w-[260px] md:w-[1000px] z-10">
                <img src="/images/HomePage/panner.png" alt="Mutter Paneer" className="w-full h-auto drop-shadow-xl" />
              </div>

              {/* --- NON-VEG DISHES (RIGHT) --- */}
              {/* Dish 4: Egg Curry (Top Right) */}
              <div className="absolute top-[4vw] sm:top-[18px] right-[-28%] md:top-[0%] md:right-[-16%] w-[59vw] sm:w-[250px] md:w-[950px] z-30">
                <img src="/images/HomePage/egg.png" alt="Egg Curry" className="w-full h-auto drop-shadow-xl" />
              </div>

              {/* Dish 5: Chicken Curry (Middle Right) */}
              <div className="absolute top-[67vw] sm:top-[285px] right-[-26%] md:top-[50%] md:right-[-24%] w-[49vw] sm:w-[210px] md:w-[850px] -translate-y-1/2 z-40">
                <img src="/images/HomePage/chicken.png" alt="Chicken Curry" className="w-full h-auto drop-shadow-xl" />
              </div>

              {/* Dish 6: Mutton Sukka (Bottom Right) */}
              <div className="absolute top-[73vw] sm:top-[312px] right-[-28%] md:top-auto md:bottom-[10%] md:right-[-18%] w-[66vw] sm:w-[280px] md:w-[950px] z-30">
                <img src="/images/HomePage/mutton.png" alt="Mutton Sukka" className="w-full h-auto drop-shadow-xl" />
              </div>

              {/* --- ARROWS --- */}
              <div className="absolute inset-0 w-full h-full z-10 pointer-events-none block">
                {/* To Bhindi Masala (Top Left) */}
                <img src="/images/HomePage/arrow2.png" className="absolute top-[57vw] sm:top-[243px] left-[25%] md:top-[38%] md:left-[30%] w-[12vw] sm:w-[50px] md:w-[200px] lg:w-[280px]" alt="" />
                {/* To Aloo Gobhi (Middle Left) */}
                <img src="/images/HomePage/arrow4.png" className="absolute top-[70vw] sm:top-[300px] left-[22%] md:top-[52%] md:left-[29%] w-[11vw] sm:w-[45px] md:w-[140px] lg:w-[180px] -translate-y-1/2" alt="" />
                {/* To Mutter Paneer (Bottom Left) */}
                <img src="/images/HomePage/arrow6.png" className="absolute top-[87vw] sm:top-[370px] left-[22%] md:top-auto md:bottom-[22%] md:left-[27%] w-[13vw] sm:w-[55px] md:w-[160px] lg:w-[220px]" alt="" />
                
                {/* To Egg Curry (Top Right) */}
                <img src="/images/HomePage/arrow1.png" className="absolute top-[53vw] sm:top-[225px] right-[28%] md:top-[38%] md:right-[24%] w-[13vw] sm:w-[55px] md:w-[160px] lg:w-[220px]" alt="" />
                {/* To Chicken Curry (Middle Right) */}
                <img src="/images/HomePage/arrow3.png" className="absolute top-[69vw] sm:top-[295px] right-[24%] md:top-[52%] md:right-[22%] w-[11vw] sm:w-[45px] md:w-[140px] lg:w-[180px] -translate-y-1/2" alt="" />
                {/* To Mutton Sukka (Bottom Right) */}
                <img src="/images/HomePage/arrow5.png" className="absolute top-[87vw] sm:top-[370px] right-[28%] md:top-auto md:bottom-[21%] md:right-[24%] w-[12vw] sm:w-[50px] md:w-[140px] lg:w-[180px]" alt="" />
              </div>

              {/* Bottom Text */}
              <div className="absolute top-[104vw] sm:top-[442px] md:top-auto md:bottom-[12%] w-full flex justify-center z-30 px-6 text-center">
                <p className="text-black font-semibold md:font-medium text-[10px] md:text-[24px] lg:text-[26px] tracking-[-0.05em] md:tracking-[-0.02em] leading-tight max-w-[250px] md:max-w-[500px] -translate-x-1 md:translate-x-0">
                  Just switch your ingredients and<br /> create a whole new dish each time.
                </p>
              </div>

            </div>
          </div>
        </section>



        {/* WHAT PEOPLE ARE SAYING SECTION */}
        <section className="relative w-full bg-[#FBF5E1] pt-[180px] md:pt-[200px] pb-0 md:pb-32 overflow-hidden font-arpona bg-cover bg-center bg-no-repeat z-10 -mt-[200px] md:-mt-[150px]" style={{ backgroundImage: "url('/images/HomePage/red2%20bg.png')" }}>
          {/* Top text */}
          <div className="max-w-[1920px] mx-auto px-4 md:px-[90px] pt-16 flex justify-between text-white text-base md:text-xl font-medium mb-12" style={{ letterSpacing: '-0.05em' }}>
            <span className="translate-x-[15px] md:translate-x-[20px] translate-y-[20px] md:translate-y-[60px]">Our GrabV</span>
            <span className="-translate-x-[15px] md:-translate-x-[20px] translate-y-[20px] md:translate-y-[60px]">Your review</span>
          </div>

          {/* Main Heading */}
          <div className="relative w-full flex flex-col items-center justify-center text-center px-4 mt-2 md:mt-16 z-10">
            
            <div className="relative z-10 font-kura uppercase leading-[0.85] tracking-[-0.02em] text-center flex flex-col items-center w-full">
              
              {/* Shadow layer */}
              <div className="absolute inset-0 flex flex-col items-center z-0 pointer-events-none translate-y-[5px] translate-x-[8px] md:translate-y-[10px] md:translate-x-[16px]" style={{ color: '#156B37' }}>
                <div className="text-[13.5vw] min-[400px]:max-[450px]:text-[14.5vw] sm:text-[60px] md:text-[280px] whitespace-nowrap">WHAT PEOPLE</div>
                <div className="text-[13.5vw] min-[400px]:max-[450px]:text-[14.5vw] sm:text-[60px] md:text-[280px] whitespace-nowrap">ARE SAYING</div>
              </div>

              {/* Fill layer */}
              <div className="relative z-10 flex flex-col items-center w-full" style={{ color: '#F7D80C' }}>
                <div className="text-[13.5vw] min-[400px]:max-[450px]:text-[14.5vw] sm:text-[60px] md:text-[280px] whitespace-nowrap">WHAT PEOPLE</div>
                <div className="relative text-[13.5vw] min-[400px]:max-[450px]:text-[14.5vw] sm:text-[60px] md:text-[280px] whitespace-nowrap">
                  ARE SAYING
                  {/* Stir Simmer Sticker */}
                  <img 
                    src="/images/HomePage/stir simmer sticker.png" 
                    alt="Stir Simmer Sticker" 
                    className="absolute left-[-10%] md:left-[-13%] -bottom-[100%] md:-bottom-[35%] w-[22vw] md:w-[230px] rotate-3 z-30 pointer-events-none"
                  />
                </div>
              </div>

            </div>

          </div>

          {/* Reviews Grid */}
          <div className="w-full max-w-[3000px] mx-auto mt-12 md:mt-32 px-4 md:px-0 flex overflow-x-auto md:overflow-x-visible snap-x snap-mandatory gap-6 md:gap-2 relative z-30 pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] max-[639px]:-translate-y-[20px]">
            
            {/* Review 1 */}
            <div className="relative w-[82vw] shrink-0 md:shrink md:w-[33%] max-w-[1400px] snap-center md:translate-x-[60px]">
              <img src="/images/HomePage/review1.png" alt="Review 1" className="w-full h-auto drop-shadow-2xl" />
              <div className="absolute top-[48%] md:top-[49%] right-[22%] md:right-[24%] flex flex-col items-end rotate-[8deg]">
                <span className="font-bold text-[3.6vw] sm:text-[16px] md:text-[24px] text-black leading-none tracking-tight">-Sneha Mehta</span>
                <span className="font-medium text-[2.5vw] sm:text-[12px] md:text-[18px] text-black leading-tight pr-1 tracking-tighter">Bengaluru, Copywriter</span>
              </div>
              <div className="absolute bottom-[5%] left-[18%] right-[10%] h-[40%] flex items-start px-2 max-[639px]:translate-y-[20px] max-[639px]:-translate-x-[12px]">
                <p className="text-black font-arpona font-normal tracking-[-0.02em] text-[2.9vw] sm:text-[14px] md:text-[24px] leading-[1.4] md:leading-[1.21] underline decoration-2 underline-offset-4 decoration-[#99B1FA]">
                  I recently shifted to Bengaluru, and I was craving for the home cooked flavour and that's when GrabV's onion tomato gravy saved me!!! It was absolutely delicious.
                </p>
              </div>
            </div>


            {/* Review 2 */}
            <div className="relative w-[68vw] shrink-0 md:shrink md:w-[28%] max-w-[1400px] snap-center max-[639px]:translate-y-[12px] md:translate-y-[10px]">
              <img src="/images/HomePage/review2.png" alt="Review 2" className="w-full h-auto drop-shadow-2xl" />
              <div className="absolute top-[44%] md:top-[43%] right-[13%] flex flex-col items-end rotate-[-10deg] max-[639px]:-translate-y-[6px]">
                <span className="font-bold text-[3.2vw] sm:text-[16px] md:text-[24px] text-black leading-none tracking-tight">-Ananya & Rohan</span>
                <span className="font-medium text-[2.3vw] sm:text-[12px] md:text-[18px] text-black leading-tight pr-1 tracking-tighter">Bengaluru, Consultants</span>
              </div>
              <div className="absolute bottom-[0%] left-[14%] right-[10%] h-[40%] flex items-start px-2 max-[639px]:-translate-y-[4px] max-[639px]:-translate-x-[12px]">
                <p className="text-black font-arpona font-normal tracking-[-0.02em] text-[2.8vw] sm:text-[14px] md:text-[22px] xl:text-[24px] leading-[1.4] md:leading-[1.21] underline decoration-2 underline-offset-4 decoration-[#99B1FA]">
                  After office, full curry prep is too much. GrabV with chicken or paneer tastes really good proper home food vibes. Total weekday save.
                </p>
              </div>
            </div>


            {/* Review 3 */}
            <div className="relative w-[82vw] shrink-0 md:shrink md:w-[33%] max-w-[1400px] snap-center md:-translate-x-[60px]">
              <img src="/images/HomePage/review3.png" alt="Review 3" className="w-full h-auto drop-shadow-2xl" />
              <div className="absolute top-[44%] md:top-[46%] right-[22%] flex flex-col items-end rotate-[6deg]">
                <span className="font-bold text-[3.6vw] sm:text-[16px] md:text-[24px] text-black leading-none tracking-tight">-Rekha Nair</span>
                <span className="font-medium text-[2.5vw] sm:text-[12px] md:text-[18px] text-black leading-tight pr-1 tracking-tighter">Bengaluru, Housewife</span>
              </div>
              {/* Tasty Sticker */}
              <img src="/images/HomePage/tasty.png" alt="Tasty" className="absolute bottom-[5%] md:bottom-[2%] left-[6%] md:-left-[1%] w-[25vw] md:w-[180px] -rotate-6 drop-shadow-xl z-40 pointer-events-none" />
              <div className="absolute bottom-[0%] left-[18%] right-[10%] h-[40%] flex items-start px-2 max-[639px]:-translate-y-[4px] max-[639px]:-translate-x-[12px]">
                <p className="text-black font-arpona font-normal tracking-[-0.02em] text-[2.9vw] sm:text-[14px] md:text-[24px] leading-[1.4] md:leading-[1.21] underline decoration-2 underline-offset-4 decoration-[#99B1FA]">
                  GrabV is very useful at home. Same gravy works for paneer, mixed veg and chicken also. Taste is nice, work is less.
                </p>
              </div>
            </div>

            
          </div>
        </section>

        {/* READY TO COOK SECTION */}
        <section ref={readyToCookSectionRef} className="relative w-full h-[450px] md:h-[160vh] bg-[#FBF5E1] pt-12 md:pt-24 overflow-hidden font-arpona flex flex-col items-center">
          
          {/* Order Now Button */}
          <button className="bg-[#F7D80C] text-black font-arpona font-medium text-[18px] md:text-[30px] tracking-[-0.05em] leading-tight px-7 md:px-[44px] py-[10px] md:py-[10px] rounded-xl mb-12 shadow-md hover:bg-yellow-400 transition-colors z-40">
            Order now
          </button>

          {/* Main Heading */}
          <div className="relative w-full flex flex-col items-center justify-center text-center mt-4">
            
            <div className="relative z-10 font-kura uppercase leading-[0.85] tracking-[-0.02em] text-center flex flex-col items-center w-full">
              
              {/* Shadow layer */}
              <div className="absolute inset-0 flex flex-col items-center z-0 pointer-events-none translate-y-[5px] translate-x-[8px] md:translate-y-[10px] md:translate-x-[16px]" style={{ color: '#F7D80C' }}>
                <div 
                  className="text-[14vw] md:text-[270px] w-[92vw] md:w-auto whitespace-nowrap transition-transform duration-1000 ease-out"
                  style={{ transform: isReadyToCookVisible ? 'translateX(0)' : 'translateX(-100vw)' }}
                >
                  <div className="flex justify-between w-full md:hidden"><span>READY</span><span>TO</span><span>COOK</span></div>
                  <span className="hidden md:inline">READY TO COOK</span>
                </div>
                <div 
                  className="text-[14vw] md:text-[270px] w-[92vw] md:w-auto whitespace-nowrap transition-transform duration-1000 ease-out"
                  style={{ transform: isReadyToCookVisible ? 'translateX(0)' : 'translateX(100vw)' }}
                >
                  <div className="flex justify-between w-full md:hidden">{"SMARTSMRTER".split("").map((c, i) => <span key={i}>{c}</span>)}</div>
                  <span className="hidden md:inline">SMARTSMRTER</span>
                </div>
                <div 
                  className="text-[14vw] md:text-[270px] w-[92vw] md:w-auto whitespace-nowrap transition-transform duration-1000 ease-out" 
                  style={{ transform: isReadyToCookVisible ? 'translateX(0)' : 'translateX(-100vw)' }}
                >
                  <div className="flex justify-between w-full md:hidden" style={{ letterSpacing: 'normal' }}>{"EVERY  ERDAY?".split("").map((c, i) => <span key={i}>{c === ' ' ? '\u00A0' : c}</span>)}</div>
                  <span className="hidden md:inline ml-[0.04em]" style={{ letterSpacing: '0.04em' }}>EVERY ERDAY?</span>
                </div>
              </div>

              {/* Fill layer */}
              <div className="relative z-10 flex flex-col items-center w-full" style={{ color: '#156B37' }}>
                <div 
                  className="relative text-[14vw] md:text-[270px] w-[92vw] md:w-full flex flex-col md:flex-row md:justify-center whitespace-nowrap transition-transform duration-1000 ease-out"
                  style={{ transform: isReadyToCookVisible ? 'translateX(0)' : 'translateX(-100vw)' }}
                >
                  <div className="flex justify-between w-full md:hidden"><span>READY</span><span>TO</span><span>COOK</span></div>
                  <span className="hidden md:inline">READY TO COOK</span>
                  {/* Chef Effort Sticker */}
                  <img 
                    src="/images/HomePage/chef effort sticker.png" 
                    alt="Chef Effort Sticker" 
                    className="absolute left-[-5%] md:left-[5%] -top-[130%] max-[380px]:-translate-y-[15px] md:-top-[60%] w-[100px] md:w-[300px] -rotate-3 z-30 pointer-events-none"
                  />
                </div>
                <div 
                  className="text-[14vw] md:text-[270px] w-[92vw] md:w-auto whitespace-nowrap transition-transform duration-1000 ease-out"
                  style={{ transform: isReadyToCookVisible ? 'translateX(0)' : 'translateX(100vw)' }}
                >
                  <div className="flex justify-between w-full md:hidden">{"SMARTSMRTER".split("").map((c, i) => <span key={i}>{c}</span>)}</div>
                  <span className="hidden md:inline">SMARTSMRTER</span>
                </div>
                <div 
                  className="text-[14vw] md:text-[270px] w-[92vw] md:w-auto whitespace-nowrap transition-transform duration-1000 ease-out" 
                  style={{ transform: isReadyToCookVisible ? 'translateX(0)' : 'translateX(-100vw)' }}
                >
                  <div className="flex justify-between w-full md:hidden" style={{ letterSpacing: 'normal' }}>{"EVERY  ERDAY?".split("").map((c, i) => <span key={i}>{c === ' ' ? '\u00A0' : c}</span>)}</div>
                  <span className="hidden md:inline ml-[0.04em]" style={{ letterSpacing: '0.04em' }}>EVERY ERDAY?</span>
                </div>
              </div>

            </div>

            {/* Product Image */}
            <div className="absolute -top-[12%] md:-top-[10%] left-[55%] md:left-[58%] -translate-x-1/2 z-20 w-[62%] md:w-[1200px]">
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

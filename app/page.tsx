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
        <section ref={textSectionRef} className="relative w-full h-[30vh] md:h-[100vh] flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#FBF5E1' }}>
          {/* Background Text Overlay */}
          <div className="absolute left-0 right-0 inset-y-0 flex flex-col justify-center items-center pointer-events-none select-none z-0 overflow-hidden font-kura uppercase tracking-[-0.07em] translate-y-0 md:translate-y-8 px-4 sm:px-8 md:px-[120px]" style={{ color: '#146A36' }}>
            <div 
              className="w-full flex justify-between h-[42px] sm:h-[60px] md:h-[230px] mb-2 md:mb-4 text-[52px] sm:text-[70px] md:text-[230px] leading-[1.0] transition-transform duration-1000 ease-out"
              style={{ transform: isTextVisible ? 'translateX(0)' : 'translateX(100vw)' }}
            >
              <span>FRESHLY</span>
              <span>MADE</span>
            </div>
            <div 
              className="w-full flex justify-between h-[35px] sm:h-[45px] md:h-[165px] text-[42px] sm:text-[55px] md:text-[165px] leading-[1.0] mt-1 md:mt-2 transition-transform duration-1000 ease-out"
              style={{ transform: isTextVisible ? 'translateX(0)' : 'translateX(-100vw)' }}
            >
              <span>READY</span>
              <span className="translate-x-[5px] md:translate-x-[20px]">IN 10 MIN</span>
            </div>
          </div>

          {/* Product Image */}
          <div className="relative z-10 w-[80vw] md:w-[1500px] max-w-[110vw] h-[25vh] md:h-[105vh] max-h-[1600px] translate-y-0 md:translate-y-20">
            <Image
              src="/images/HomePage/product package 1.png"
              alt="GrabV Product Package"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Bottom Left Text */}
          <div className="absolute bottom-10 md:bottom-8 left-4 sm:left-8 md:left-[120px] z-20 flex flex-col gap-[2px] md:gap-0 tracking-[-0.05em] text-black">
            <span className="font-arpona font-medium text-[10px] sm:text-[14px] md:text-[28px] leading-[1.1]">Veg or non-veg</span>
            <span className="font-arpona font-medium text-[10px] sm:text-[14px] md:text-[28px] leading-[1.1]">Possibilities are endless</span>
          </div>

          {/* Bottom Right Text */}
          <div className="absolute bottom-10 md:bottom-8 right-4 sm:right-8 md:right-[120px] z-20 flex flex-col gap-[2px] md:gap-0 tracking-[-0.05em] text-black text-right">
            <span className="font-arpona font-medium text-[10px] sm:text-[14px] md:text-[28px] leading-[1.1]">Just add in the gravy</span>
            <span className="font-arpona font-medium text-[10px] sm:text-[14px] md:text-[28px] leading-[1.1]">And enjoy your meal</span>
          </div>
        </section>

        {/* Pouch to Plate Section - Heading */}
        <section className="relative w-full flex flex-col items-center pt-8 md:pt-24 pb-0 md:pb-12 overflow-hidden" style={{ backgroundColor: '#FBF5E1' }}>
          
          {/* Top text */}
          <p className="font-arpona text-[14px] sm:text-[18px] md:text-[28px] leading-[1.0] tracking-[-0.05em] font-medium text-black mb-4 md:mb-10 text-center z-10">
            No Chopping. No Stress. Just Real Food.
          </p>

          {/* Huge Heading */}
          <div className="relative font-kura uppercase text-[50px] sm:text-[70px] md:text-[260px] leading-[0.85] tracking-[-0.02em] text-center w-full flex justify-center md:drop-shadow-xl z-10">
            {/* Vegetables Behind Text */}
            <img src="/images/HomePage/tomato.png" alt="" className="absolute top-[-6%] md:top-[-9%] left-[26%] md:left-[25%] w-[55px] md:w-[265px] z-0 pointer-events-none" />
            <img src="/images/HomePage/onion.png" alt="" className="absolute top-[-6%] md:top-[-8%] left-[20%] md:left-[18%] w-[45px] md:w-[200px] -rotate-[15deg] z-[1] md:z-0 pointer-events-none opacity-90" />

            {/* Shadow layer */}
            <div className="absolute inset-0 flex justify-center z-0 pointer-events-none translate-y-[5px] translate-x-[8px] md:translate-y-[10px] md:translate-x-[16px]" style={{ color: '#F7D80C' }}>
              <div>POUCH TO<br/>PLATE IN<br/>5 STEPS</div>
            </div>
            
            {/* Fill layer */}
            <div className="relative z-10" style={{ color: '#156B37' }}>
              <div>POUCH TO<br/>PLATE IN<br/>5 STEPS</div>
              {/* Homemade Sticker */}
              <img src="/images/HomePage/homemade.png" alt="Homemade-ish" className="absolute bottom-[20%] md:bottom-[25%] right-[-25%] md:right-[-10%] w-[85px] md:w-[290px] rotate-2 drop-shadow-xl z-20 pointer-events-none" />
            </div>
          </div>
        </section>

        {/* Pouch to Plate Wrapper for Scrolljacking */}
        <div ref={stepsContainerRef} className="relative w-full h-auto md:h-[400vh] pb-20 md:pb-0" style={{ backgroundColor: '#FBF5E1' }}>
          {/* Pouch to Plate Sticky Section */}
          <section className="relative md:sticky top-[70px] md:top-[110px] w-full h-auto md:h-[calc(100vh-110px)] flex flex-col justify-start pt-0 md:pt-0 mt-[-15px] md:mt-0 md:justify-center overflow-hidden" style={{ backgroundColor: '#FBF5E1' }}>
            
            {/* Horizontal Scrolling Track */}
            <div className="relative w-full z-30 h-auto md:h-full flex items-start pt-0 md:items-center overflow-x-auto overflow-y-hidden md:overflow-visible snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div ref={stepsTrackRef} className="flex items-start md:items-end gap-[20px] md:gap-[50px] pl-5 sm:pl-[40px] md:pl-[120px] pr-5 sm:pr-[40px] md:pr-[120px] pb-4 md:pb-0 will-change-transform w-max md:w-[max-content]">
                
                {/* Step 1 */}
                <div className="w-[80vw] md:w-[880px] flex-shrink-0 flex flex-col justify-end snap-center">
                  <div className="relative">
                    <img src="/images/HomePage/cooking img1.png" className="w-full h-auto block drop-shadow-2xl object-contain object-bottom max-h-[30vh] md:max-h-[60vh]" alt="Step 1" />
                  </div>
                  <p className="mt-4 md:mt-6 ml-0 md:ml-4 font-arpona text-[16px] sm:text-[20px] md:text-[30px] tracking-[-0.05em] font-medium text-black drop-shadow-lg relative z-10 text-center md:text-left">
                    Add your tempering (tadka) in oil.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="w-[80vw] md:w-[880px] flex-shrink-0 flex flex-col justify-end snap-center">
                  <div className="relative">
                    <img src="/images/HomePage/cooking img2.png" className="w-full h-auto block drop-shadow-2xl object-contain object-bottom max-h-[30vh] md:max-h-[60vh]" alt="Step 2" />
                  </div>
                  <p className="mt-4 md:mt-6 ml-0 md:ml-4 font-arpona text-[16px] sm:text-[20px] md:text-[30px] tracking-[-0.05em] font-medium text-black drop-shadow-lg relative z-10 text-center md:text-left">
                    Sauté veggies or protein of your choice.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="w-[80vw] md:w-[880px] flex-shrink-0 flex flex-col justify-end snap-center">
                  <div className="relative">
                    <img src="/images/HomePage/cooking img3.png" className="w-full h-auto block drop-shadow-2xl object-contain object-bottom max-h-[30vh] md:max-h-[60vh]" alt="Step 3" />
                  </div>
                  <p className="mt-4 md:mt-6 ml-0 md:ml-4 font-arpona text-[16px] sm:text-[20px] md:text-[30px] tracking-[-0.05em] font-medium text-black drop-shadow-lg relative z-10 text-center md:text-left">
                    Pour GrabV & adjust consistency
                  </p>
                </div>

                {/* Step 4 */}
                <div className="w-[80vw] md:w-[880px] flex-shrink-0 flex flex-col justify-end snap-center">
                  <div className="relative">
                    <img src="/images/HomePage/cooking img4.png" className="w-full h-auto block drop-shadow-2xl object-contain object-bottom max-h-[30vh] md:max-h-[60vh]" alt="Step 4" />
                  </div>
                  <p className="mt-4 md:mt-6 ml-0 md:ml-4 font-arpona text-[16px] sm:text-[20px] md:text-[30px] tracking-[-0.05em] font-medium text-black drop-shadow-lg relative z-10 text-center md:text-left">
                    Add water as needed and let it simmer.
                  </p>
                </div>

                {/* Step 5 */}
                <div className="w-[80vw] md:w-[880px] flex-shrink-0 flex flex-col justify-end snap-center">
                  <div className="relative">
                    <img src="/images/HomePage/cooking img5.png" className="w-full h-auto block drop-shadow-2xl object-contain object-bottom max-h-[30vh] md:max-h-[60vh]" alt="Step 5" />
                  </div>
                  <p className="mt-4 md:mt-6 ml-0 md:ml-4 font-arpona text-[16px] sm:text-[20px] md:text-[30px] tracking-[-0.05em] font-medium text-black drop-shadow-lg relative z-10 text-center md:text-left">
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

          <section className="relative w-full flex flex-col items-center pt-[40px] md:pt-[100px] pb-0 md:pb-12 z-10">
            {/* Huge Heading */}
            <div className="relative z-10 font-kura uppercase leading-[0.8] tracking-[-0.02em] text-center flex flex-col items-center w-full">
              
              {/* Onion Image Behind Text */}
              <img src="/images/HomePage/onion.png" className="absolute left-[8%] md:left-[11%] top-[12%] md:top-[15%] w-[70px] md:w-[290px] object-contain z-[-1] pointer-events-none -rotate-12" alt="" />

              {/* Shadow layer (Green) */}
              <div className="absolute inset-0 flex flex-col items-center z-0 pointer-events-none translate-y-[5px] translate-x-[8px] md:translate-y-[10px] md:translate-x-[16px]" style={{ color: '#156B37' }}>
                <div className="text-[65px] md:text-[260px]">OUR</div>
                <div className="text-[65px] md:text-[260px]">PRODUCTS</div>
              </div>

              {/* Fill layer (Yellow) */}
              <div className="relative z-10 flex flex-col items-center w-full" style={{ color: '#F7D80C' }}>
                <div className="relative w-full flex justify-center text-[65px] md:text-[260px]">
                  OUR
                  {/* Grab Your Packs text */}
                  <div className="absolute top-[82%] -translate-y-1/2 right-[15%] md:right-[19%] font-arpona text-[10px] md:text-[24px] tracking-tight font-medium text-white normal-case drop-shadow-none pointer-events-none">
                    Grab Your Packs
                  </div>
                </div>
                <div className="text-[65px] md:text-[260px]">
                  PRODUCTS
                </div>
              </div>
            </div>

          </section>

          {/* Our Products Wrapper for Scrolljacking */}
          <div ref={productsContainerRef} className="relative w-full h-auto md:h-[250vh] z-10 mt-[-60px] md:mt-0">
            {/* Our Products Sticky Section */}
            <section className="relative md:sticky top-[70px] md:top-[110px] w-full h-auto md:h-[calc(100vh-110px)] flex flex-col justify-start md:justify-center overflow-hidden">
            
            {/* Horizontal Scrolling Track */}
            <div 
              className="relative w-full z-30 overflow-x-auto md:overflow-visible snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              onScroll={(e) => {
                const scrollLeft = e.currentTarget.scrollLeft;
                const width = e.currentTarget.clientWidth;
                const index = Math.round(scrollLeft / width);
                setActiveProductMobile(index);
              }}
            >
              <div ref={productsTrackRef} className="flex items-start md:items-center gap-0 md:gap-[100px] pl-5 sm:pl-[40px] md:pl-[120px] pr-0 sm:pr-[40px] md:pr-[120px] pb-8 md:pb-0 will-change-transform w-max md:w-[max-content]">
                
                {/* Product 1 */}
                <div className="relative inline-block flex-shrink-0 flex flex-col items-center md:items-end w-auto snap-center">
                  <div className="relative w-[100vw] md:w-auto">
                    <img src="/images/HomePage/product1.png" className="w-[100vw] md:w-auto h-auto md:h-[950px] object-contain block drop-shadow-2xl" alt="Product 1" />
                    
                    <div className="absolute top-[34%] left-[64%] w-[36%] flex flex-col items-start text-black font-arpona">
                      <h3 className="text-[14px] sm:text-[18px] md:text-[50px] leading-[1.0] tracking-[-0.05em] font-bold">
                        ONION<br/>TOMATO<br/>GRAVY
                      </h3>
                      
                      <div className="mt-1 md:mt-7 flex flex-col gap-0 md:gap-1 text-[7px] sm:text-[10px] md:text-[24px] font-medium tracking-tight">
                        <p>Zero Added Preservatives</p>
                        <p>All Purpose Gravy</p>
                        <p>Slow Cooked</p>
                      </div>
                      
                      <button className="mt-2 md:mt-10 bg-[rgb(247,216,13)] text-black px-2 py-0.5 md:px-7 md:py-2 rounded-[3px] md:rounded-[6px] font-medium text-[8px] sm:text-[10px] md:text-[20px] hover:bg-yellow-400 transition-colors flex items-center justify-center gap-1 md:gap-2 shadow-sm whitespace-nowrap">
                        View Product
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-2 h-2 md:w-5 md:h-5 ml-0 md:ml-1">
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  {/* See more button */}
                  <div className="mt-[-20px] md:mt-[-40px] z-20 hidden md:block">
                    <button className="bg-[rgb(247,216,13)] text-black px-10 py-3 rounded-[6px] font-bold text-[24px] hover:bg-yellow-400 transition-colors shadow-sm tracking-tight font-arpona">
                      See more
                    </button>
                  </div>
                </div>

                {/* Product 2 */}
                <div className="relative inline-block flex-shrink-0 flex flex-col items-center md:items-end w-auto snap-center group">
                  <div className="relative w-[100vw] md:w-auto">
                    <img src="/images/HomePage/product2.png" className="w-[100vw] md:w-auto h-auto md:h-[950px] object-contain block drop-shadow-2xl grayscale-[0.8] opacity-80" alt="Product 2" />
                    
                    {/* Coming Soon Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                      <div className="bg-black/40 backdrop-blur-md px-6 py-2 md:px-12 md:py-4 rounded-full border border-white/20 shadow-xl">
                        <p className="text-white font-arpona font-medium text-[12px] md:text-[22px] uppercase tracking-[0.25em] text-center">
                          Coming Soon
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Mobile Shared Fixed Indicators & Button */}
            <div className="flex flex-col items-center mt-[-20px] pb-6 md:hidden w-full relative z-40">
              <div className="flex justify-center gap-2 mb-4">
                <div className={`w-5 h-1.5 rounded-full transition-colors ${activeProductMobile === 0 ? 'bg-[#F7D80C]' : 'bg-white/80'}`} />
                <div className={`w-5 h-1.5 rounded-full transition-colors ${activeProductMobile === 1 ? 'bg-[#F7D80C]' : 'bg-white/80'}`} />
              </div>
              <button className={`bg-[#F7D80C] text-black px-6 py-1.5 rounded-[6px] font-bold text-[12px] shadow-sm tracking-tight font-arpona transition-opacity ${activeProductMobile === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                See more
              </button>
            </div>
            {/* See more button - Absolute bottom right */}
            <div className="absolute bottom-[1%] md:bottom-[2%] right-[5%] md:right-[10%] z-40 pointer-events-auto hidden md:block">
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
            <div className="w-full md:w-[50%] relative flex justify-center md:justify-end z-20 -mt-[145px] -translate-x-[140px] md:-mt-[420px] md:-translate-x-[720px]">
              <img src="/images/HomePage/Gravy pouring.png" alt="Gravy Pouring" className="w-[65%] md:w-[105%] max-w-[220px] md:max-w-[800px] object-contain drop-shadow-2xl" />
            </div>

            {/* Right: Text and Star */}
            <div className="w-full md:w-[55%] flex flex-col items-center md:items-start relative z-10 mt-[-215px] translate-x-[30px] md:translate-x-0 md:-mt-[260px] md:-ml-[910px] z-30">
              {/* Star Image */}
              <img src="/images/HomePage/star.png" alt="Star" className="absolute top-[-38px] right-[8%] md:top-[-40px] md:-right-[430px] w-[70px] md:w-[280px] -rotate-[6deg] z-0" />
              
              <div className="relative font-kura uppercase leading-[0.85] tracking-[-0.02em] text-center md:text-left z-10">
                {/* Shadow layer (Yellow) */}
                <div className="absolute inset-0 z-0 translate-y-[5px] translate-x-[5px] md:translate-y-[10px] md:translate-x-[15px]" style={{ color: '#F7D80C' }}>
                  <div className="text-[65px] sm:text-[70px] md:text-[260px] whitespace-nowrap md:-ml-[40px]">HOW WE</div>
                  <div className="text-[65px] sm:text-[70px] md:text-[260px] whitespace-nowrap">MAKE IT</div>
                </div>
                
                {/* Fill layer (Green) */}
                <div className="relative z-10" style={{ color: '#156B36' }}>
                  <div className="text-[65px] sm:text-[70px] md:text-[260px] whitespace-nowrap md:-ml-[40px]">HOW WE</div>
                  <div className="text-[65px] sm:text-[70px] md:text-[260px] whitespace-nowrap">MAKE IT</div>
                </div>
              </div>
            </div>

          </div>

          {/* Dotted Line SVG (Background) */}
          <AnimatedDottedLine />

          {/* Process Steps Container */}
          <div className="relative w-full max-w-[1200px] mx-auto mt-10 md:-mt-20 px-4 md:px-8 flex flex-col gap-12 md:gap-40 z-10 md:-mb-[3000px]">
            
            {/* Step 1: Chefs (Right) */}
            <div className="flex justify-end w-full relative translate-x-[30px] md:translate-x-0 md:top-[-200px] md:right-[-340px] order-1 md:order-1">
              <SlideIn direction="right" className="relative w-[85%] md:w-[80%]">
                <img src="/images/HomePage/process1.png" alt="Chefs" className="w-full h-auto drop-shadow-2xl" />
              </SlideIn>
            </div>

            {/* Step 2: Stove with 3 pots (Left) */}
            <div className="flex justify-start w-full relative -mt-[90px] md:mt-10 md:top-[-880px] md:left-[-370px] md:scale-[2] origin-left order-2 md:order-2">
              <SlideIn direction="left" className="relative w-full md:w-[70%] scale-[1.5] md:scale-100 origin-left">
                <img src="/images/HomePage/process2.png" alt="Stove" className="w-full h-auto drop-shadow-2xl" />
              </SlideIn>
            </div>

            {/* Step 3: Lady Tasting (Right) */}
            <div className="flex justify-end w-full relative -mt-4 md:mt-10 translate-x-[35px] md:translate-x-0 md:top-[-1380px] md:right-[-280px] order-3 md:order-3">
              <SlideIn direction="right" className="relative w-[85%] md:w-[65%]">
                <img src="/images/HomePage/process3.png" alt="Quality Check" className="w-full h-auto drop-shadow-2xl" />
              </SlideIn>
            </div>

            {/* Step 4: Single Pot (Left) */}
            <div className="flex justify-start w-full relative -mt-4 md:mt-10 md:top-[-1800px] md:left-[-250px] order-4 md:order-4">
              <SlideIn direction="left" className="relative w-[75%] md:w-[55%]">
                <img src="/images/HomePage/process4.png" alt="Single Pot" className="w-full h-auto drop-shadow-2xl" />
              </SlideIn>
            </div>

            {/* Step 5: Bowl of Gravy (Right) - Remains 5th on mobile */}
            <div className="flex justify-end w-full relative -mt-4 md:mt-10 translate-x-[30px] md:translate-x-0 md:top-[-2150px] md:right-[-350px] order-5 md:order-5">
              <SlideIn direction="right" className="relative w-[95%] md:w-[85%]">
                <img src="/images/HomePage/process5.png" alt="Gravy Bowl" className="w-full h-auto drop-shadow-2xl" />
              </SlideIn>
            </div>

            {/* Step 6: Cold Storage (Left) */}
            <div className="flex justify-start w-full relative -mt-[80px] md:mt-10 -translate-x-[50px] md:translate-x-0 md:top-[-2900px] md:left-[-450px] order-6 md:order-6">
              <SlideIn direction="left" className="relative w-[100%] md:w-[90%]">
                <img src="/images/HomePage/process6.png" alt="Cold Storage" className="w-full h-auto drop-shadow-2xl" />
              </SlideIn>
            </div>

          </div>
        </section>

        {/* 20+ RECIPES Section */}
        <section className="relative w-full bg-transparent flex flex-col items-center overflow-hidden -mt-[100px] md:-mt-[150px] z-20">
          <div className="relative w-full h-[600px] md:h-auto md:min-h-[200vh] flex flex-col items-center pt-[70px] md:pt-[250px] pb-20 md:pb-32" style={{ backgroundImage: "url('/images/HomePage/yellow bg.png')", backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            
            {/* Heading */}
            <div className="relative z-10 flex flex-col items-center mt-0 md:-mt-10 font-kura leading-none text-center pointer-events-none">
              {/* Mobile Heading */}
              <h2 className="relative z-10 text-[#156B37] text-[85px] tracking-[-0.02em] leading-none md:hidden" style={{ textShadow: '1px 1px 0 #F7D80C, 2px 2px 0 #F7D80C, 3px 3px 0 #F7D80C, 4px 4px 0 #F7D80C, 5px 5px 0 #F7D80C, 6px 6px 0 #F7D80C, 7px 7px 0 #F7D80C, 8px 8px 0 #F7D80C' }}>20+</h2>
              <h2 className="relative z-20 text-[#156B37] text-[70px] tracking-[-0.02em] -mt-2 leading-none md:hidden" style={{ textShadow: '1px 1px 0 #F7D80C, 2px 2px 0 #F7D80C, 3px 3px 0 #F7D80C, 4px 4px 0 #F7D80C, 5px 5px 0 #F7D80C' }}>RECIPES</h2>
              
              {/* Desktop Heading */}
              <h2 className="relative z-10 text-[#156B37] text-[300px] tracking-[-0.02em] leading-none hidden md:block" style={{ textShadow: '1px 1px 0 #F7D80C, 2px 2px 0 #F7D80C, 3px 3px 0 #F7D80C, 4px 4px 0 #F7D80C, 5px 5px 0 #F7D80C, 6px 6px 0 #F7D80C, 7px 7px 0 #F7D80C, 8px 8px 0 #F7D80C, 9px 9px 0 #F7D80C, 10px 10px 0 #F7D80C, 11px 11px 0 #F7D80C, 12px 12px 0 #F7D80C, 13px 13px 0 #F7D80C, 14px 14px 0 #F7D80C, 15px 15px 0 #F7D80C, 16px 16px 0 #F7D80C, 17px 17px 0 #F7D80C, 18px 18px 0 #F7D80C, 19px 19px 0 #F7D80C, 20px 20px 0 #F7D80C' }}>20+</h2>
              <h2 className="relative z-20 text-[#156B37] text-[240px] tracking-[-0.02em] -mt-[50px] leading-none hidden md:block" style={{ textShadow: '1px 1px 0 #F7D80C, 2px 2px 0 #F7D80C, 3px 3px 0 #F7D80C, 4px 4px 0 #F7D80C, 5px 5px 0 #F7D80C, 6px 6px 0 #F7D80C, 7px 7px 0 #F7D80C, 8px 8px 0 #F7D80C, 9px 9px 0 #F7D80C, 10px 10px 0 #F7D80C, 11px 11px 0 #F7D80C, 12px 12px 0 #F7D80C, 13px 13px 0 #F7D80C, 14px 14px 0 #F7D80C, 15px 15px 0 #F7D80C, 16px 16px 0 #F7D80C, 17px 17px 0 #F7D80C, 18px 18px 0 #F7D80C, 19px 19px 0 #F7D80C, 20px 20px 0 #F7D80C' }}>RECIPES</h2>
            </div>
            
            {/* Center Container for Product and Dishes */}
            <div className="absolute inset-0 w-full h-full flex items-center justify-center z-20 pointer-events-none">
                            {/* Center Product */}
              <div className="absolute top-[315px] md:top-[57%] left-[48%] md:left-[50%] -translate-x-1/2 -translate-y-1/2 z-30 w-[155px] md:w-[680px]">
                <img src="/images/HomePage/product package 2.png" alt="Smoked Makhani Gravy" className="w-full h-auto drop-shadow-2xl" />
              </div>

              {/* --- VEG DISHES (LEFT) --- */}
              {/* Dish 1: Bhindi Masala (Top Left) */}
              <div className="absolute top-[72px] left-[-18%] md:top-[8%] md:left-[-8%] w-[180px] md:w-[700px] z-30">
                <img src="/images/HomePage/bhindi.png" alt="Bhindi Masala" className="w-full h-auto drop-shadow-xl" />
              </div>

              {/* Dish 2: Aloo Gobhi (Middle Left) */}
              <div className="absolute top-[300px] left-[-22%] md:top-[50%] md:left-[-12%] w-[200px] md:w-[900px] -translate-y-1/2 z-20">
                <img src="/images/HomePage/aloo.png" alt="Aloo Gobhi" className="w-full h-auto drop-shadow-xl" />
              </div>

              {/* Dish 3: Mutter Paneer (Bottom Left) */}
              <div className="absolute top-[302px] left-[-28%] md:top-auto md:bottom-[-2%] md:left-[-18%] w-[260px] md:w-[1000px] z-10">
                <img src="/images/HomePage/panner.png" alt="Mutter Paneer" className="w-full h-auto drop-shadow-xl" />
              </div>

              {/* --- NON-VEG DISHES (RIGHT) --- */}
              {/* Dish 4: Egg Curry (Top Right) */}
              <div className="absolute top-[18px] right-[-28%] md:top-[0%] md:right-[-16%] w-[250px] md:w-[950px] z-30">
                <img src="/images/HomePage/egg.png" alt="Egg Curry" className="w-full h-auto drop-shadow-xl" />
              </div>

              {/* Dish 5: Chicken Curry (Middle Right) */}
              <div className="absolute top-[285px] right-[-26%] md:top-[50%] md:right-[-24%] w-[210px] md:w-[850px] -translate-y-1/2 z-40">
                <img src="/images/HomePage/chicken.png" alt="Chicken Curry" className="w-full h-auto drop-shadow-xl" />
              </div>

              {/* Dish 6: Mutton Sukka (Bottom Right) */}
              <div className="absolute top-[312px] right-[-28%] md:top-auto md:bottom-[10%] md:right-[-18%] w-[280px] md:w-[950px] z-30">
                <img src="/images/HomePage/mutton.png" alt="Mutton Sukka" className="w-full h-auto drop-shadow-xl" />
              </div>

              {/* --- ARROWS --- */}
              <div className="absolute inset-0 w-full h-full z-10 pointer-events-none block">
                {/* To Bhindi Masala (Top Left) */}
                <img src="/images/HomePage/arrow2.png" className="absolute top-[243px] left-[25%] md:top-[38%] md:left-[30%] w-[50px] md:w-[200px] lg:w-[280px]" alt="" />
                {/* To Aloo Gobhi (Middle Left) */}
                <img src="/images/HomePage/arrow4.png" className="absolute top-[300px] left-[22%] md:top-[52%] md:left-[29%] w-[45px] md:w-[140px] lg:w-[180px] -translate-y-1/2" alt="" />
                {/* To Mutter Paneer (Bottom Left) */}
                <img src="/images/HomePage/arrow6.png" className="absolute top-[370px] left-[22%] md:top-auto md:bottom-[22%] md:left-[27%] w-[55px] md:w-[160px] lg:w-[220px]" alt="" />
                
                {/* To Egg Curry (Top Right) */}
                <img src="/images/HomePage/arrow1.png" className="absolute top-[225px] right-[28%] md:top-[38%] md:right-[24%] w-[55px] md:w-[160px] lg:w-[220px]" alt="" />
                {/* To Chicken Curry (Middle Right) */}
                <img src="/images/HomePage/arrow3.png" className="absolute top-[295px] right-[24%] md:top-[52%] md:right-[22%] w-[45px] md:w-[140px] lg:w-[180px] -translate-y-1/2" alt="" />
                {/* To Mutton Sukka (Bottom Right) */}
                <img src="/images/HomePage/arrow5.png" className="absolute top-[370px] right-[28%] md:top-auto md:bottom-[21%] md:right-[24%] w-[50px] md:w-[140px] lg:w-[180px]" alt="" />
              </div>

              {/* Bottom Text */}
              <div className="absolute top-[442px] md:top-auto md:bottom-[12%] w-full flex justify-center z-30 px-6 text-center">
                <p className="text-black font-semibold md:font-medium text-[10px] md:text-[24px] lg:text-[26px] tracking-[-0.05em] md:tracking-[-0.02em] leading-tight max-w-[250px] md:max-w-[500px] -translate-x-1 md:translate-x-0">
                  Just switch your ingredients and<br /> create a whole new dish each time.
                </p>
              </div>

            </div>
          </div>
        </section>



        {/* WHAT PEOPLE ARE SAYING SECTION */}
        <section className="relative w-full bg-[#FBF5E1] pt-[150px] md:pt-[200px] pb-0 md:pb-32 overflow-hidden font-arpona bg-cover bg-center bg-no-repeat z-10 -mt-[200px] md:-mt-[150px]" style={{ backgroundImage: "url('/images/HomePage/red2%20bg.png')" }}>
          {/* Top text */}
          <div className="max-w-[1920px] mx-auto px-4 md:px-[90px] pt-12 flex justify-between text-white text-base md:text-xl font-medium mb-12" style={{ letterSpacing: '-0.05em' }}>
            <span className="translate-x-[50px] md:translate-x-[60px] translate-y-[20px] md:translate-y-[60px]">Our GrabV</span>
            <span className="-translate-x-[50px] md:-translate-x-[40px] translate-y-[30px] md:translate-y-[60px]">Your review</span>
          </div>

          {/* Main Heading */}
          <div className="relative w-full flex flex-col items-center justify-center text-center px-4 mt-8 md:mt-16 z-10">
            
            <div className="relative z-10 font-kura uppercase leading-[0.85] tracking-[-0.02em] text-center flex flex-col items-center w-full">
              
              {/* Shadow layer */}
              <div className="absolute inset-0 flex flex-col items-center z-0 pointer-events-none translate-y-[5px] translate-x-[8px] md:translate-y-[10px] md:translate-x-[16px]" style={{ color: '#156B37' }}>
                <div className="text-[15vw] sm:text-[60px] md:text-[280px] whitespace-nowrap">WHAT PEOPLE</div>
                <div className="text-[15vw] sm:text-[60px] md:text-[280px] whitespace-nowrap">ARE SAYING</div>
              </div>

              {/* Fill layer */}
              <div className="relative z-10 flex flex-col items-center w-full" style={{ color: '#F7D80C' }}>
                <div className="text-[15vw] sm:text-[60px] md:text-[280px] whitespace-nowrap">WHAT PEOPLE</div>
                <div className="relative text-[15vw] sm:text-[60px] md:text-[280px] whitespace-nowrap">
                  ARE SAYING
                  {/* Stir Simmer Sticker */}
                  <img 
                    src="/images/HomePage/stir simmer sticker.png" 
                    alt="Stir Simmer Sticker" 
                    className="absolute left-[-10%] md:left-[-13%] -bottom-[40%] md:-bottom-[35%] w-[80px] md:w-[230px] rotate-3 z-30 pointer-events-none"
                  />
                </div>
              </div>

            </div>

          </div>

          {/* Reviews Grid */}
          <div className="w-full max-w-[3000px] mx-auto mt-12 md:mt-32 px-4 md:px-0 flex overflow-x-auto md:overflow-x-visible snap-x snap-mandatory gap-6 md:gap-2 relative z-30 pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            
            {/* Review 1 */}
            <div className="relative w-full shrink-0 md:shrink md:w-[33%] max-w-[1400px] snap-center md:translate-x-[60px]">
              <img src="/images/HomePage/review1.png" alt="Review 1" className="w-full h-auto drop-shadow-2xl" />
              <div className="absolute top-[48%] md:top-[49%] right-[22%] md:right-[24%] flex flex-col items-end rotate-[8deg]">
                <span className="font-bold text-[16px] md:text-[24px] text-black leading-none tracking-tight">-Sneha Mehta</span>
                <span className="font-medium text-[12px] md:text-[18px] text-black leading-tight pr-1 tracking-tighter">Bengaluru, Copywriter</span>
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
            <div className="relative w-[85%] shrink-0 md:shrink md:w-[28%] max-w-[1400px] snap-center md:-translate-y-[20px]">
              <img src="/images/HomePage/review2.png" alt="Review 2" className="w-full h-auto drop-shadow-2xl" />
              <div className="absolute top-[44%] md:top-[49%] right-[13%] flex flex-col items-end rotate-[-10deg]">
                <span className="font-bold text-[16px] md:text-[24px] text-black leading-none tracking-tight">-Ananya & Rohan</span>
                <span className="font-medium text-[12px] md:text-[18px] text-black leading-tight pr-1 tracking-tighter">Bengaluru, Consultants</span>
              </div>
              <div className="absolute bottom-[0%] left-[14%] right-[10%] h-[40%] flex items-start px-2">
                <p className="text-black font-arpona font-normal tracking-[-0.02em] text-[14px] md:text-[22px] xl:text-[24px] leading-[1.21] md:leading-[1.21] underline decoration-2 underline-offset-4 decoration-[#99B1FA]">
                  After office,<br />
                  full curry prep is too much .<br />
                  GrabV with chicken or paneer<br />
                  tastes really good proper home<br />
                  food vibes. Total weekday save.
                </p>
              </div>
            </div>


            {/* Review 3 */}
            <div className="relative w-full shrink-0 md:shrink md:w-[33%] max-w-[1400px] snap-center md:-translate-x-[60px]">
              <img src="/images/HomePage/review3.png" alt="Review 3" className="w-full h-auto drop-shadow-2xl" />
              <div className="absolute top-[44%] md:top-[46%] right-[22%] flex flex-col items-end rotate-[6deg]">
                <span className="font-bold text-[16px] md:text-[24px] text-black leading-none tracking-tight">-Rekha Nair</span>
                <span className="font-medium text-[12px] md:text-[18px] text-black leading-tight pr-1 tracking-tighter">Bengaluru, Housewife</span>
              </div>
              {/* Tasty Sticker */}
              <img src="/images/HomePage/tasty.png" alt="Tasty" className="absolute bottom-[5%] md:bottom-[2%] left-[6%] md:-left-[1%] w-[100px] md:w-[180px] -rotate-6 drop-shadow-xl z-40 pointer-events-none" />
              <div className="absolute bottom-[0%] left-[18%] right-[10%] h-[40%] flex items-start px-2">
                <p className="text-black font-arpona font-normal tracking-[-0.02em] text-[14px] md:text-[24px] leading-[1.21] md:leading-[1.21] underline decoration-2 underline-offset-4 decoration-[#99B1FA]">
                  GrabV is very useful at home.<br />
                  Same gravy works for paneer,<br />
                  mixed veg and chicken also.<br />
                  Taste is nice, work is less.
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
                    className="absolute left-[-5%] md:left-[5%] -top-[130%] md:-top-[60%] w-[100px] md:w-[300px] -rotate-3 z-30 pointer-events-none"
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

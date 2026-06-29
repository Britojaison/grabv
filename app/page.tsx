"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import dynamic from "next/dynamic";

const ScrollyVideo = dynamic<any>(() => 
  // @ts-expect-error: scrolly-video package lacks proper typescript definitions for its JSX exports
  import("scrolly-video/dist/ScrollyVideo.cjs.jsx"), {
  ssr: false,
});
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let st: any;
    let timer: NodeJS.Timeout;

    const initGSAP = () => {
      // @ts-expect-error
      const gsap = window.gsap;
      // @ts-expect-error
      const ScrollTrigger = window.ScrollTrigger;

      if (!gsap || !ScrollTrigger) {
        timer = setTimeout(initGSAP, 50);
        return;
      }

      if (!containerRef.current || !pathRef.current || !ballRef.current || !maskPathRef.current || pathLen === 0) return;

      st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        onUpdate: (self: any) => {
          if (!pathRef.current || !ballRef.current || !maskPathRef.current) return;
          const p = self.progress;
          const drawLength = p * pathLen;
          const pt = pathRef.current.getPointAtLength(drawLength);
          
          ballRef.current.style.left = `${pt.x}%`;
          ballRef.current.style.top = `${pt.y}%`;

          maskPathRef.current.style.strokeDasharray = `${pathLen} ${pathLen}`;
          maskPathRef.current.style.strokeDashoffset = `${pathLen - drawLength}`;
        }
      });
    };

    initGSAP();

    return () => {
      clearTimeout(timer);
      if (st) st.kill();
    };
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
        style={{ left: '75%', top: '0%' }}
      />
    </div>
  );
};

export default function Home() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let st: any;
    let timer: NodeJS.Timeout;

    const initGSAP = () => {
      // @ts-expect-error
      const gsap = window.gsap;
      // @ts-expect-error
      const ScrollTrigger = window.ScrollTrigger;

      if (!gsap || !ScrollTrigger) {
        timer = setTimeout(initGSAP, 50);
        return;
      }

      if (!stepsContainerRef.current || !stepsTrackRef.current) return;
      
      const wrapper = stepsContainerRef.current;
      const track = stepsTrackRef.current;
      const section = wrapper.querySelector('section');

      if (window.innerWidth < 1536) {
        track.style.transform = `translate3d(0, 0, 0)`;
        if (section) section.style.transform = `translateY(0)`;
        return;
      }

      // Reset manual transforms
      track.style.transform = '';
      if (section) section.style.transform = '';

      const scrollableHeight = 110 + wrapper.offsetHeight - window.innerHeight;
      
      st = ScrollTrigger.create({
        trigger: wrapper,
        start: "top 110px",
        end: `+=${scrollableHeight}`,
        pin: section,
        animation: gsap.fromTo(track, { x: 0 }, { x: -(track.scrollWidth - window.innerWidth), ease: "none" }),
        scrub: true,
        invalidateOnRefresh: true,
      });
    };

    initGSAP();

    return () => {
      clearTimeout(timer);
      if (st) st.kill();
    };
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let st: any;
    let timer: NodeJS.Timeout;

    const initGSAP = () => {
      // @ts-expect-error
      const gsap = window.gsap;
      // @ts-expect-error
      const ScrollTrigger = window.ScrollTrigger;

      if (!gsap || !ScrollTrigger) {
        timer = setTimeout(initGSAP, 50);
        return;
      }

      if (!productsContainerRef.current || !productsTrackRef.current) return;
      
      const wrapper = productsContainerRef.current;
      const track = productsTrackRef.current;
      const section = wrapper.querySelector('section');

      if (window.innerWidth < 1536) {
        track.style.transform = `translate3d(0, 0, 0)`;
        if (section) section.style.transform = `translateY(0)`;
        return;
      }

      // Reset manual transforms
      track.style.transform = '';
      if (section) section.style.transform = '';

      const scrollableHeight = 110 + wrapper.offsetHeight - window.innerHeight;
      
      st = ScrollTrigger.create({
        trigger: wrapper,
        start: "top 110px",
        end: `+=${scrollableHeight}`,
        pin: section,
        animation: gsap.fromTo(track, { x: 0 }, { x: -(track.scrollWidth - window.innerWidth), ease: "none" }),
        scrub: true,
        invalidateOnRefresh: true,
      });
    };

    initGSAP();

    return () => {
      clearTimeout(timer);
      if (st) st.kill();
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full font-arpona overflow-x-clip" style={{ backgroundColor: 'rgb(239, 238, 230)' }}>

      {/* Navbar Section removed and added to layout.tsx */}

      {/* Main Container - Full Width */}
      <main className="w-full relative flex flex-col bg-[#FBF5E1]">

        <div className="relative z-10 w-full hidden md:block bg-[rgb(12,61,27)] h-[4000px]">
          {isClient && isDesktop && (
            <ScrollyVideo 
              src="/images/hero video/GrabV_WebsiteVideo.mp4" 
              transitionSpeed={8}
            />
          )}
        </div>

        {/* Freshly Made Product Section */}
        <section ref={textSectionRef} className="relative w-full h-[65vw] flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#FBF5E1' }}>
          {/* Background Text Overlay */}
          <div className="absolute left-0 right-0 inset-y-0 flex flex-col justify-center items-center pointer-events-none select-none z-0 overflow-hidden font-kura uppercase tracking-[-0.07em] translate-y-0 px-[4vw]" style={{ color: '#146A36' }}>
            <div 
              className="w-full flex justify-between h-[13vw] xl:h-[12vw] mb-[1.5vw] text-[13vw] xl:text-[12vw] leading-[1.0] transition-transform duration-1000 ease-out"
              style={{ transform: isTextVisible ? 'translateX(0)' : 'translateX(100vw)' }}
            >
              <span>FRESHLY</span>
              <span>MADE</span>
            </div>
            <div 
              className="w-full flex justify-between h-[9.8vw] xl:h-[9vw] text-[9.8vw] xl:text-[9vw] leading-[1.0] mt-[0.5vw] transition-transform duration-1000 ease-out"
              style={{ transform: isTextVisible ? 'translateX(0)' : 'translateX(-100vw)' }}
            >
              <span>READY</span>
              <span className="translate-x-[1vw]">IN 10 MIN</span>
            </div>
          </div>

          {/* Product Image */}
          <div className="relative z-10 w-[80vw] max-w-[110vw] h-[55vw] max-h-[1600px] translate-y-[2vw]">
            <Image
              src="/images/HomePage/product package 1.webp"
              alt="GrabV Product Package"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Bottom Left Text */}
          <div className="absolute bottom-[4vw] xl:bottom-[7vw] left-[4vw] z-20 flex flex-col gap-[2px] md:gap-0 tracking-[-0.05em] text-black">
            <span className="font-arpona font-medium text-[2.5vw] lg:text-[1.8vw] xl:text-[1.8vw] leading-[1.1]">Veg or non-veg</span>
            <span className="font-arpona font-medium text-[2.5vw] lg:text-[1.8vw] xl:text-[1.8vw] leading-[1.1]">Possibilities are endless</span>
          </div>

          {/* Bottom Right Text */}
          <div className="absolute bottom-[4vw] xl:bottom-[7vw] right-[4vw] z-20 flex flex-col gap-[2px] md:gap-0 tracking-[-0.05em] text-black text-right">
            <span className="font-arpona font-medium text-[2.5vw] lg:text-[1.8vw] xl:text-[1.8vw] leading-[1.1]">Just add in the gravy</span>
            <span className="font-arpona font-medium text-[2.5vw] lg:text-[1.8vw] xl:text-[1.8vw] leading-[1.1]">And enjoy your meal</span>
          </div>
        </section>

        {/* Pouch to Plate Section - Heading */}
        <section className="relative w-full flex flex-col items-center pt-[8vw] 2xl:pt-24 pb-0 2xl:pb-12 overflow-hidden" style={{ backgroundColor: '#FBF5E1' }}>
          
          {/* Top text */}
          <p className="font-arpona text-[3vw] md:text-[1.8vw] lg:text-[2vw] 2xl:text-[28px] leading-[1.0] tracking-[-0.05em] font-medium text-black mb-[4vw] 2xl:mb-10 text-center z-10">
            No Chopping. No Stress. Just Real Food.
          </p>

          {/* Huge Heading */}
          <div className="relative font-kura uppercase text-[14vw] 2xl:text-[260px] leading-[0.85] tracking-[-0.02em] text-center w-full flex justify-center drop-shadow-lg 2xl:drop-shadow-xl z-10">
            {/* Vegetables Behind Text */}
            <img src="/images/HomePage/tomato.webp" alt="" className="absolute top-[-6%] 2xl:top-[-5%] left-[26%] xl:left-[24%] 2xl:left-[25%] w-[15vw] xl:w-[13vw] 2xl:w-[220px] z-0 pointer-events-none" />
            <img src="/images/HomePage/onion.webp" alt="" className="absolute top-[-6%] 2xl:top-[-4%] left-[20%] xl:left-[21%] 2xl:left-[22%] w-[12.5vw] xl:w-[10.5vw] 2xl:w-[170px] -rotate-[15deg] z-[1] 2xl:z-0 pointer-events-none opacity-90" />

            {/* Fill layer with integrated text-shadow */}
            <div className="relative z-10" style={{ color: '#156B37' }}>
              <div className="[text-shadow:1vw_0.8vw_0_#F7D80C] md:[text-shadow:0.8vw_0.6vw_0_#F7D80C] xl:[text-shadow:9px_6px_0_#F7D80C] 2xl:[text-shadow:11px_6px_0_#F7D80C]">
                POUCH TO<br/>PLATE IN<br/>5 STEPS
              </div>
              {/* Homemade Sticker */}
              <img src="/images/HomePage/homemade.webp" alt="Homemade-ish" className="absolute bottom-[20%] 2xl:bottom-[25%] right-[-25%] 2xl:right-[-10%] w-[24vw] 2xl:w-[290px] rotate-2 drop-shadow-xl z-20 pointer-events-none" />
            </div>
          </div>
        </section>

        {/* Pouch to Plate Wrapper for Scrolljacking */}
        <div ref={stepsContainerRef} className="relative w-full h-auto 2xl:h-[400vh] pb-32 2xl:pb-0" style={{ backgroundColor: '#FBF5E1' }}>
          {/* Pouch to Plate Sticky Section */}
          <section className="relative mt-[70px] 2xl:mt-0 w-full h-auto 2xl:h-[calc(100vh-110px)] flex flex-col justify-start pt-0 2xl:pt-0 2xl:justify-center overflow-hidden" style={{ backgroundColor: '#FBF5E1' }}>
            {/* Horizontal Scrolling Track */}
            <div className="relative w-full z-30 h-auto 2xl:h-full flex items-start pt-0 2xl:items-center overflow-x-auto overflow-y-hidden 2xl:overflow-visible snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div ref={stepsTrackRef} className="flex items-start 2xl:items-end gap-[20px] md:gap-[32px] lg:gap-[48px] 2xl:gap-[20px] pl-[5vw] 2xl:pl-[120px] pr-[5vw] 2xl:pr-[120px] pb-[4vw] 2xl:pb-0 will-change-transform w-max 2xl:w-[max-content]">
                
                {/* Step 1 */}
                <div className="w-[80vw] sm:w-[95vw] md:w-[80vw] lg:w-[45vw] 2xl:w-[880px] flex-shrink-0 flex flex-col justify-end snap-center">
                  <div className="relative">
                    <img src="/images/HomePage/cooking img1.webp" className="w-full h-auto block drop-shadow-2xl object-contain object-bottom max-h-[30vh] sm:max-h-[55vh] md:max-h-[60vh] lg:max-h-[55vh] 2xl:max-h-[60vh] scale-[0.95] origin-bottom -translate-y-3" alt="Step 1" />
                  </div>
                  <p className="mt-[4vw] md:mt-[3vw] lg:mt-[2vw] xl:mt-4 2xl:mt-6 ml-0 xl:ml-12 2xl:ml-16 font-arpona text-[4vw] sm:text-xl md:text-[3.5vw] lg:text-2xl xl:text-[28px] 2xl:text-[34px] tracking-[-0.05em] font-medium text-black drop-shadow-lg relative z-10 text-center xl:text-left -translate-y-3">
                    Add your tempering (tadka) in oil.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="w-[80vw] sm:w-[95vw] md:w-[80vw] lg:w-[45vw] 2xl:w-[880px] flex-shrink-0 flex flex-col justify-end snap-center">
                  <div className="relative">
                    <img src="/images/HomePage/cooking img2.webp" className="w-full h-auto block drop-shadow-2xl object-contain object-bottom max-h-[30vh] sm:max-h-[55vh] md:max-h-[60vh] lg:max-h-[55vh] 2xl:max-h-[60vh]" alt="Step 2" />
                  </div>
                  <p className="mt-[4vw] md:mt-[3vw] lg:mt-[2vw] xl:mt-4 2xl:mt-6 ml-0 xl:ml-12 2xl:ml-16 font-arpona text-[4vw] sm:text-xl md:text-[3.5vw] lg:text-2xl xl:text-[28px] 2xl:text-[34px] tracking-[-0.05em] font-medium text-black drop-shadow-lg relative z-10 text-center xl:text-left">
                    Sauté veggies or protein of your choice.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="w-[80vw] sm:w-[95vw] md:w-[80vw] lg:w-[45vw] 2xl:w-[880px] flex-shrink-0 flex flex-col justify-end snap-center">
                  <div className="relative">
                    <img src="/images/HomePage/cooking img3.webp" className="w-full h-auto block drop-shadow-2xl object-contain object-bottom max-h-[30vh] sm:max-h-[55vh] md:max-h-[60vh] lg:max-h-[55vh] 2xl:max-h-[60vh]" alt="Step 3" />
                  </div>
                  <p className="mt-[4vw] md:mt-[3vw] lg:mt-[2vw] xl:mt-4 2xl:mt-6 ml-0 xl:ml-12 2xl:ml-16 font-arpona text-[4vw] sm:text-xl md:text-[3.5vw] lg:text-2xl xl:text-[28px] 2xl:text-[34px] tracking-[-0.05em] font-medium text-black drop-shadow-lg relative z-10 text-center xl:text-left">
                    Pour GrabV & adjust consistency
                  </p>
                </div>

                {/* Step 4 */}
                <div className="w-[80vw] sm:w-[95vw] md:w-[80vw] lg:w-[45vw] 2xl:w-[880px] flex-shrink-0 flex flex-col justify-end snap-center">
                  <div className="relative">
                    <img src="/images/HomePage/cooking img4.webp" className="w-full h-auto block drop-shadow-2xl object-contain object-bottom max-h-[30vh] sm:max-h-[55vh] md:max-h-[60vh] lg:max-h-[55vh] 2xl:max-h-[60vh]" alt="Step 4" />
                  </div>
                  <p className="mt-[4vw] md:mt-[3vw] lg:mt-[2vw] xl:mt-4 2xl:mt-6 ml-0 xl:ml-12 2xl:ml-16 font-arpona text-[4vw] sm:text-xl md:text-[3.5vw] lg:text-2xl xl:text-[28px] 2xl:text-[34px] tracking-[-0.05em] font-medium text-black drop-shadow-lg relative z-10 text-center xl:text-left">
                    Add water as needed and let it simmer.
                  </p>
                </div>

                {/* Step 5 */}
                <div className="w-[80vw] sm:w-[95vw] md:w-[80vw] lg:w-[45vw] 2xl:w-[880px] flex-shrink-0 flex flex-col justify-end snap-center">
                  <div className="relative">
                    <img src="/images/HomePage/cooking img5.webp" className="w-full h-auto block drop-shadow-2xl object-contain object-bottom max-h-[30vh] sm:max-h-[55vh] md:max-h-[60vh] lg:max-h-[55vh] 2xl:max-h-[60vh]" alt="Step 5" />
                  </div>
                  <p className="mt-[4vw] md:mt-[3vw] lg:mt-[2vw] xl:mt-4 2xl:mt-6 ml-0 xl:ml-12 2xl:ml-16 font-arpona text-[4vw] sm:text-xl md:text-[3.5vw] lg:text-2xl xl:text-[28px] 2xl:text-[34px] tracking-[-0.05em] font-medium text-black drop-shadow-lg relative z-10 text-center xl:text-left">
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
            <img src="/images/HomePage/red2%20bg.webp" alt="Red torn background top" className="w-full h-[150px] md:h-[190px] 2xl:h-[250px] object-cover object-top shrink-0" />
            
            {/* Middle fill (stretched vertically to fill space) */}
            <div className="flex-1 w-full overflow-hidden relative">
              <img src="/images/HomePage/red2%20bg.webp" alt="" className="absolute inset-0 w-full h-full object-cover object-center scale-y-[100]" />
            </div>

            {/* Bottom curve */}
            <img src="/images/HomePage/red2%20bg.webp" alt="Red torn background bottom" className="w-full h-[150px] md:h-[190px] 2xl:h-[250px] object-cover object-bottom shrink-0" />
          </div>

          <section className="relative w-full flex flex-col items-center pt-[11vw] 2xl:pt-[130px] pb-0 2xl:pb-12 z-10">
            {/* Huge Heading */}
            <div className="relative z-10 font-kura uppercase leading-[0.8] tracking-[-0.02em] text-center flex flex-col items-center w-full">
              
              {/* Onion Image Behind Text */}
              <img src="/images/HomePage/onion.webp" className="absolute left-[8%] 2xl:left-[13%] top-[12%] xl:top-[17%] 2xl:top-[19%] w-[19.5vw] xl:w-[15vw] 2xl:w-[250px] object-contain z-[-1] pointer-events-none -rotate-12" alt="" />

              {/* Shadow layer (Green) */}
              <div className="absolute inset-0 flex flex-col items-center z-0 pointer-events-none translate-y-[1.4vw] translate-x-[2.2vw] 2xl:translate-y-[10px] 2xl:translate-x-[16px]" style={{ color: '#156B37' }}>
                <div className="text-[18vw] 2xl:text-[260px]">OUR</div>
                <div className="text-[18vw] 2xl:text-[260px]">PRODUCTS</div>
              </div>

              {/* Fill layer (Yellow) */}
              <div className="relative z-10 flex flex-col items-center w-full" style={{ color: '#F7D80C' }}>
                <div className="relative w-full flex justify-center text-[18vw] 2xl:text-[260px]">
                  OUR
                </div>
                <div className="relative text-[18vw] 2xl:text-[260px]">
                  {/* Grab Your Packs text */}
                  <div className="absolute bottom-[110%] right-0 font-arpona text-[2.8vw] 2xl:text-[24px] tracking-tight font-medium text-white normal-case drop-shadow-none pointer-events-none whitespace-nowrap">
                    Grab Your Packs
                  </div>
                  PRODUCTS
                </div>
              </div>
            </div>

          </section>

          {/* Our Products Wrapper for Scrolljacking */}
          {/* Our Products Wrapper for Scrolljacking */}
          <div ref={productsContainerRef} className="relative w-full h-auto 2xl:h-[250vh] z-10 mt-[-60px] 2xl:mt-0">
            {/* Our Products Sticky Section */}
            <section className="relative top-[70px] 2xl:top-0 w-full h-auto 2xl:h-[calc(100vh-110px)] flex flex-col justify-start 2xl:justify-center overflow-hidden">
            
            {/* Horizontal Scrolling Track */}
            <div className="relative w-full z-30 overflow-x-auto overflow-y-hidden 2xl:overflow-visible snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-4">
              <div ref={productsTrackRef} className="flex items-start 2xl:items-center gap-0 2xl:gap-[100px] pl-[5vw] 2xl:pl-[120px] pr-[5vw] 2xl:pr-[120px] pb-8 2xl:pb-0 will-change-transform w-max 2xl:w-[max-content]">
                
                {/* Product 1 */}
                <div className="relative inline-block flex-shrink-0 flex flex-col items-center 2xl:items-end w-auto snap-center">
                  <div className="relative w-[100vw] 2xl:w-auto">
                    <img src="/images/HomePage/product1.webp" className="w-[100vw] 2xl:w-auto h-auto 2xl:h-[950px] object-contain block drop-shadow-2xl" alt="Product 1" />
                    
                    <div className="absolute top-[34%] left-[64%] w-[36%] flex flex-col items-start text-black font-arpona">
                      <h3 className="text-[3.9vw] 2xl:text-[50px] leading-[1.0] tracking-[-0.05em] font-bold">
                        ONION<br/>TOMATO<br/>GRAVY
                      </h3>
                      
                      <div className="mt-[1vw] 2xl:mt-7 flex flex-col gap-0 2xl:gap-1 text-[2vw] 2xl:text-[24px] font-medium tracking-tight">
                        <p>Zero Added Preservatives</p>
                        <p>All Purpose Gravy</p>
                        <p>Slow Cooked</p>
                      </div>
                      
                      <button className="mt-[2vw] 2xl:mt-10 bg-[rgb(247,216,13)] text-black px-[2.2vw] 2xl:px-7 py-[0.5vw] 2xl:py-2 rounded-[0.8vw] 2xl:rounded-[6px] font-medium text-[2.2vw] 2xl:text-[20px] hover:bg-yellow-400 transition-colors flex items-center justify-center gap-[1vw] 2xl:gap-2 shadow-sm whitespace-nowrap">
                        View Product
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[2vw] h-[2vw] 2xl:w-5 2xl:h-5 ml-[0.5vw] 2xl:ml-1">
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  {/* See more button */}
                  <div className="mt-[-20px] 2xl:mt-[-40px] z-20 hidden 2xl:block">
                    <button className="bg-[rgb(247,216,13)] text-black px-8 2xl:px-10 py-2 2xl:py-3 rounded-[6px] font-bold text-[18px] 2xl:text-[24px] hover:bg-yellow-400 transition-colors shadow-sm tracking-tight font-arpona">
                      See more
                    </button>
                  </div>
                </div>

                {/* Product 2 */}
                <div className="relative inline-block flex-shrink-0 flex flex-col items-center 2xl:items-end w-auto snap-center group">
                  <div className="relative w-[100vw] 2xl:w-auto">
                    <img src="/images/HomePage/product2.webp" className="w-[100vw] 2xl:w-auto h-auto 2xl:h-[950px] object-contain block drop-shadow-2xl grayscale-[0.8] opacity-80" alt="Product 2" />
                    
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


            {/* See more button - Absolute bottom right */}
            <div className="absolute bottom-[1%] 2xl:bottom-[2%] right-[5%] 2xl:right-[10%] z-40 pointer-events-auto hidden 2xl:block">
              <Link href="/products" className="inline-block bg-[#F7D80C] text-black font-arpona font-medium text-[18px] 2xl:text-[20px] tracking-[-0.05em] px-6 py-1 2xl:px-8 2xl:py-2 rounded-[5px] shadow-lg hover:scale-105 transition-transform duration-300">
                See more
              </Link>
            </div>

          </section>
        </div>
        {/* End of Entire Red Section Wrapper */}
        </div>

        {/* HOW WE MAKE IT Section */}
        <section className="relative w-full bg-[#FBF5E1] pt-12 md:pt-16 lg:pt-24 pb-32 md:pb-40 lg:pb-48 overflow-visible z-0">
          
          {/* Top Heading Area */}
          <div className="relative w-full max-w-[1400px] mx-auto px-4 md:px-8 flex flex-col items-center justify-start min-h-[300px] md:min-h-[400px] lg:min-h-[550px] z-20">
            
            {/* Left: Gravy Pouring Image */}
            <div className="w-[65%] md:w-[75%] lg:w-[60%] xl:w-[70%] relative flex justify-center z-20 -mt-[145px] md:-mt-[210px] lg:-mt-[250px] xl:-mt-[450px] 2xl:-mt-[420px] -translate-x-[75px] min-[361px]:max-[399px]:-translate-x-[95px] min-[400px]:max-[450px]:-translate-x-[115px] sm:-translate-x-[50px] md:-translate-x-[230px] lg:-translate-x-[320px] xl:-translate-x-[600px] 2xl:-translate-x-[650px]">
              <img src="/images/HomePage/Gravy pouring.webp" alt="Gravy Pouring" className="w-[100%] md:w-[105%] max-w-[220px] md:max-w-[380px] lg:max-w-[460px] xl:max-w-[800px] object-contain drop-shadow-2xl" />
            </div>

            {/* Right: Text and Star */}
            <div className="w-full flex flex-col items-center relative z-10 -mt-[180px] sm:-mt-[100px] md:-mt-[360px] lg:-mt-[420px] xl:-mt-[850px] max-[360px]:ml-[40px] min-[361px]:max-[450px]:ml-[20px] md:ml-[30px] lg:-ml-[30px] xl:-ml-[60px] z-30">
              {/* Star Image */}
              <img src="/images/HomePage/star.webp" alt="Star" className="absolute top-[-38px] right-[8%] md:w-[120px] md:top-[-35px] md:right-[8%] lg:w-[150px] lg:top-[-45px] lg:right-[12%] xl:right-[6%] xl:w-[220px] 2xl:w-[150px] w-[70px] -rotate-[6deg] z-0" />
              
              <div className="relative font-kura uppercase leading-[0.85] tracking-[-0.02em] text-center z-10">
                {/* Shadow layer (Yellow) */}
                <div className="absolute inset-0 z-0 translate-y-[5px] translate-x-[5px] md:translate-y-[8px] md:translate-x-[10px]" style={{ color: '#F7D80C' }}>
                  <div className="text-[45px] min-[361px]:max-[450px]:text-[55px] sm:text-[65px] md:text-[105px] lg:text-[125px] xl:text-[240px] whitespace-nowrap">HOW WE</div>
                  <div className="text-[45px] min-[361px]:max-[450px]:text-[55px] sm:text-[65px] md:text-[105px] lg:text-[125px] xl:text-[240px] whitespace-nowrap">MAKE IT</div>
                </div>
                
                {/* Fill layer (Green) */}
                <div className="relative z-10" style={{ color: '#156B36' }}>
                  <div className="text-[45px] min-[361px]:max-[450px]:text-[55px] sm:text-[65px] md:text-[105px] lg:text-[125px] xl:text-[240px] whitespace-nowrap">HOW WE</div>
                  <div className="text-[45px] min-[361px]:max-[450px]:text-[55px] sm:text-[65px] md:text-[105px] lg:text-[125px] xl:text-[240px] whitespace-nowrap">MAKE IT</div>
                </div>
              </div>
            </div>

          </div>

          {/* Process Steps Container */}
          <div className="relative w-full max-w-[1200px] xl:max-w-[1500px] mx-auto max-[450px]:-mt-[160px] mt-10 md:mt-16 lg:mt-24 px-4 md:px-8 h-auto flex flex-col max-[450px]:gap-2 gap-12 z-10 max-[450px]:translate-x-[25px]">
            
            {/* Dotted Line SVG (Background) */}
            <AnimatedDottedLine className="absolute top-[8%] sm:top-0 xl:top-[150px] left-0 xl:-left-[15%] w-full xl:w-[130%] h-[84%] sm:h-[90%] md:h-[82%] lg:h-[78%] pointer-events-none z-0" />

            {/* Step 1: Chefs (Right) */}
            <div className="relative w-full flex justify-end order-1">
              <SlideIn direction="right" className="relative max-[450px]:w-[115%] w-[85%] md:w-[75%] lg:w-[65%] xl:w-[50%] flex-shrink-0">
                <img src="/images/HomePage/process1.webp" alt="Chefs" className="w-full h-auto drop-shadow-2xl max-[360px]:translate-x-[15px] min-[361px]:max-[450px]:translate-x-[55px] min-[361px]:max-[450px]:translate-y-[40px] md:-translate-y-[130px] md:translate-x-[40px] lg:-translate-y-[230px] lg:translate-x-[40px] xl:translate-y-[30px] xl:translate-x-[100px]" />
              </SlideIn>
            </div>

            {/* Step 2: Stove with 3 pots (Left) */}
            <div className="relative w-full flex justify-start -mt-8 md:mt-0 xl:-mt-[350px] order-2">
              <SlideIn direction="left" className="relative max-[450px]:w-[100%] max-[450px]:-ml-[10%] w-[80%] md:w-[75%] lg:w-[60%] xl:w-[48%] -ml-[7%] md:-ml-0 flex-shrink-0">
                <img src="/images/HomePage/process2.webp" alt="Stove" className="w-full h-auto drop-shadow-2xl translate-y-8 max-[450px]:translate-x-[15px] md:-translate-y-[200px] md:translate-x-[40px] lg:-translate-y-[300px] lg:translate-x-[40px] xl:-translate-y-[60px] xl:-translate-x-[20px]" />
              </SlideIn>
            </div>

            {/* Step 3: Lady Tasting (Right) */}
            <div className="relative w-full flex justify-end xl:-mt-[350px] order-3">
              <SlideIn direction="right" className="relative max-[450px]:w-[115%] w-[85%] md:w-[75%] lg:w-[65%] xl:w-[50%] flex-shrink-0">
                <img src="/images/HomePage/process3.webp" alt="Quality Check" className="w-full h-auto drop-shadow-2xl -translate-y-4 md:-translate-y-[300px] md:translate-x-[40px] lg:-translate-y-[400px] lg:translate-x-[40px] xl:-translate-y-[160px] xl:translate-x-[100px]" />
              </SlideIn>
            </div>

            {/* Step 4: Single Pot (Left) */}
            <div className="relative w-full flex justify-start xl:-mt-[350px] order-4">
              <SlideIn direction="left" className="relative max-[450px]:w-[85%] w-[75%] md:w-[65%] lg:w-[55%] xl:w-[42%] flex-shrink-0">
                <img src="/images/HomePage/process4.webp" alt="Single Pot" className="w-full h-auto drop-shadow-2xl md:-translate-y-[400px] md:translate-x-[40px] lg:-translate-y-[500px] lg:translate-x-[40px] xl:-translate-y-[160px] xl:-translate-x-[20px]" />
              </SlideIn>
            </div>

            {/* Step 5: Bowl of Gravy (Right) - Remains 5th on mobile */}
            <div className="relative w-full flex justify-end xl:-mt-[200px] order-5">
              <SlideIn direction="right" className="relative max-[360px]:w-[125%] min-[361px]:max-[450px]:w-[110%] w-[95%] md:w-[85%] lg:w-[75%] xl:w-[60%] flex-shrink-0">
                <img src="/images/HomePage/process5.webp" alt="Gravy Bowl" className="w-full h-auto drop-shadow-2xl min-[361px]:max-[450px]:translate-x-[20px] md:-translate-y-[400px] md:translate-x-[40px] lg:-translate-y-[500px] lg:translate-x-[40px] xl:-translate-y-[160px] xl:translate-x-[130px]" />
              </SlideIn>
            </div>

            {/* Step 6: Cold Storage (Left) */}
            <div className="relative w-full flex justify-start -mt-8 md:mt-0 xl:-mt-[450px] order-6">
              <SlideIn direction="left" className="relative max-[450px]:-mt-[10px] max-[450px]:w-[120%] max-[450px]:-ml-[10%] w-[100%] md:w-[95%] lg:w-[85%] xl:w-[70%] flex-shrink-0">
                <img src="/images/HomePage/process6.webp" alt="Cold Storage" className="w-full h-auto drop-shadow-2xl -translate-x-[30px] max-[450px]:-translate-x-[80px] md:-translate-y-[460px] md:-translate-x-[60px] lg:-translate-y-[560px] lg:-translate-x-[40px] xl:-translate-y-[160px] xl:-translate-x-[120px]" />
              </SlideIn>
            </div>

          </div>
        </section>

        {/* 20+ RECIPES Section */}
        <section className="relative w-full bg-transparent flex flex-col items-center overflow-hidden -mt-[160px] md:-mt-[580px] lg:-mt-[650px] xl:-mt-[400px] 2xl:-mt-[400px] z-20">
          <div className="relative w-full h-[141vw] flex flex-col items-center pt-[70px] pb-20" style={{ backgroundImage: "url('/images/HomePage/yellow bg.webp')", backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            
            {/* Heading */}
            <div className="relative z-10 flex flex-col items-center -mt-8 md:mt-2 lg:mt-12 xl:mt-20 2xl:mt-28 font-kura leading-none text-center pointer-events-none">
              {/* Heading */}
              <h2 className="relative z-10 text-[#156B37] text-[18vw] tracking-[-0.02em] leading-none [text-shadow:1px_1px_0_#F7D80C,2px_2px_0_#F7D80C,3px_3px_0_#F7D80C,4px_4px_0_#F7D80C,5px_5px_0_#F7D80C,6px_6px_0_#F7D80C,7px_7px_0_#F7D80C,8px_8px_0_#F7D80C] xl:[text-shadow:1px_1px_0_#F7D80C,2px_2px_0_#F7D80C,3px_3px_0_#F7D80C,4px_4px_0_#F7D80C,5px_5px_0_#F7D80C,6px_6px_0_#F7D80C,7px_7px_0_#F7D80C,8px_8px_0_#F7D80C,9px_9px_0_#F7D80C,10px_10px_0_#F7D80C,11px_11px_0_#F7D80C,12px_12px_0_#F7D80C] 2xl:[text-shadow:1px_1px_0_#F7D80C,2px_2px_0_#F7D80C,3px_3px_0_#F7D80C,4px_4px_0_#F7D80C,5px_5px_0_#F7D80C,6px_6px_0_#F7D80C,7px_7px_0_#F7D80C,8px_8px_0_#F7D80C,9px_9px_0_#F7D80C,10px_10px_0_#F7D80C,11px_11px_0_#F7D80C,12px_12px_0_#F7D80C,13px_13px_0_#F7D80C,14px_14px_0_#F7D80C,15px_15px_0_#F7D80C,16px_16px_0_#F7D80C]">20+</h2>
              <h2 className="relative z-20 text-[#156B37] text-[15vw] tracking-[-0.02em] -mt-2 lg:-mt-4 leading-none [text-shadow:1px_1px_0_#F7D80C,2px_2px_0_#F7D80C,3px_3px_0_#F7D80C,4px_4px_0_#F7D80C,5px_5px_0_#F7D80C] xl:[text-shadow:1px_1px_0_#F7D80C,2px_2px_0_#F7D80C,3px_3px_0_#F7D80C,4px_4px_0_#F7D80C,5px_5px_0_#F7D80C,6px_6px_0_#F7D80C,7px_7px_0_#F7D80C,8px_8px_0_#F7D80C] 2xl:[text-shadow:1px_1px_0_#F7D80C,2px_2px_0_#F7D80C,3px_3px_0_#F7D80C,4px_4px_0_#F7D80C,5px_5px_0_#F7D80C,6px_6px_0_#F7D80C,7px_7px_0_#F7D80C,8px_8px_0_#F7D80C,9px_9px_0_#F7D80C,10px_10px_0_#F7D80C,11px_11px_0_#F7D80C,12px_12px_0_#F7D80C]">RECIPES</h2>
            </div>
            
            {/* Center Container for Product and Dishes */}
            <div className="absolute inset-0 w-full h-full flex items-center justify-center z-20 pointer-events-none">
              {/* Center Product */}
              <div className="absolute top-[74vw] md:top-[71vw] lg:top-[69vw] left-[48%] -translate-x-1/2 -translate-y-1/2 z-30 w-[36vw]">
                <img src="/images/HomePage/product package 2.webp" alt="Smoked Makhani Gravy" className="w-full h-auto drop-shadow-2xl" />
              </div>

              {/* --- VEG DISHES (LEFT) --- */}
              {/* Dish 1: Bhindi Masala (Top Left) */}
              <div className="absolute top-[17vw] xl:top-[16vw] left-[-18%] w-[42vw] xl:w-[41vw] z-30">
                <img src="/images/HomePage/bhindi.webp" alt="Bhindi Masala" className="w-full h-auto drop-shadow-xl" />
              </div>

              {/* Dish 2: Aloo Gobhi (Middle Left) */}
              <div className="absolute top-[70vw] xl:top-[69vw] left-[-22%] w-[47vw] xl:w-[46vw] -translate-y-1/2 z-20">
                <img src="/images/HomePage/aloo.webp" alt="Aloo Gobhi" className="w-full h-auto drop-shadow-xl" />
              </div>

              {/* Dish 3: Mutter Paneer (Bottom Left) */}
              <div className="absolute top-[71vw] xl:top-[70vw] left-[-28%] w-[61vw] xl:w-[60vw] z-10">
                <img src="/images/HomePage/panner.webp" alt="Mutter Paneer" className="w-full h-auto drop-shadow-xl" />
              </div>

              {/* --- NON-VEG DISHES (RIGHT) --- */}
              {/* Dish 4: Egg Curry (Top Right) */}
              <div className="absolute top-[4vw] xl:top-[3vw] right-[-28%] w-[59vw] xl:w-[58vw] z-30">
                <img src="/images/HomePage/egg.webp" alt="Egg Curry" className="w-full h-auto drop-shadow-xl" />
              </div>

              {/* Dish 5: Chicken Curry (Middle Right) */}
              <div className="absolute top-[67vw] xl:top-[66vw] right-[-26%] w-[49vw] xl:w-[48vw] -translate-y-1/2 z-40">
                <img src="/images/HomePage/chicken.webp" alt="Chicken Curry" className="w-full h-auto drop-shadow-xl" />
              </div>

              {/* Dish 6: Mutton Sukka (Bottom Right) */}
              <div className="absolute top-[73vw] xl:top-[72vw] right-[-28%] w-[66vw] xl:w-[65vw] z-30">
                <img src="/images/HomePage/mutton.webp" alt="Mutton Sukka" className="w-full h-auto drop-shadow-xl" />
              </div>

              {/* --- ARROWS --- */}
              <div className="absolute inset-0 w-full h-full z-10 pointer-events-none block">
                {/* To Bhindi Masala (Top Left) */}
                <img src="/images/HomePage/arrow2.webp" className="absolute top-[57vw] left-[25%] xl:top-[53vw] xl:left-[27%] w-[12vw]" alt="" />
                {/* To Aloo Gobhi (Middle Left) */}
                <img src="/images/HomePage/arrow4.webp" className="absolute top-[70vw] left-[22%] w-[11vw] -translate-y-1/2" alt="" />
                {/* To Mutter Paneer (Bottom Left) */}
                <img src="/images/HomePage/arrow6.webp" className="absolute top-[87vw] left-[22%] w-[13vw]" alt="" />
                
                {/* To Egg Curry (Top Right) */}
                <img src="/images/HomePage/arrow1.webp" className="absolute top-[53vw] right-[28%] w-[13vw]" alt="" />
                {/* To Chicken Curry (Middle Right) */}
                <img src="/images/HomePage/arrow3.webp" className="absolute top-[69vw] right-[24%] w-[11vw] -translate-y-1/2" alt="" />
                {/* To Mutton Sukka (Bottom Right) */}
                <img src="/images/HomePage/arrow5.webp" className="absolute top-[87vw] right-[28%] w-[12vw]" alt="" />
              </div>

              {/* Bottom Text */}
              <div className="absolute top-[104vw] lg:top-[106vw] xl:top-[108vw] w-full flex justify-center z-30 px-6 text-center">
                <p className="text-black font-semibold text-[3.5vw] md:text-[2.5vw] lg:text-[2vw] xl:text-[1.6vw] tracking-[-0.05em] leading-tight max-w-[55vw] -translate-x-1">
                  Just switch your ingredients and<br /> create a whole new dish each time.
                </p>
              </div>

            </div>
          </div>
        </section>



        {/* WHAT PEOPLE ARE SAYING SECTION */}
        <section className="relative w-full bg-[#FBF5E1] pt-[180px] pb-0 md:pb-16 lg:pb-24 overflow-hidden font-arpona bg-cover bg-center bg-no-repeat z-10 -mt-[200px]" style={{ backgroundImage: "url('/images/HomePage/red2%20bg.webp')" }}>
          {/* Top text placeholder to preserve vertical spacing */}
          <div className="w-full pt-16 mb-12 h-[24px] xl:h-[36px]"></div>

          {/* Main Heading */}
          <div className="relative w-full flex flex-col items-center justify-center text-center px-4 mt-2 z-10">
            
            <div className="relative z-10 font-kura uppercase leading-[0.85] tracking-[-0.02em] text-center flex flex-col items-center w-full">
              
              {/* Shadow layer */}
              <div className="absolute inset-0 flex flex-col items-center z-0 pointer-events-none translate-y-[5px] translate-x-[8px] lg:translate-y-[10px] lg:translate-x-[14px] xl:translate-y-[14px] xl:translate-x-[20px] 2xl:translate-y-[20px] 2xl:translate-x-[28px]" style={{ color: '#156B37' }}>
                <div className="text-[14.5vw] xl:text-[11vw] whitespace-nowrap">WHAT PEOPLE</div>
                <div className="text-[14.5vw] xl:text-[11vw] whitespace-nowrap">ARE SAYING</div>
              </div>

              {/* Fill layer */}
              <div className="relative z-10 flex flex-col items-center w-full" style={{ color: '#F7D80C' }}>
                <div className="relative text-[14.5vw] xl:text-[11vw] whitespace-nowrap">
                  {/* Perfectly aligned Top text */}
                  <div className="absolute bottom-[calc(100%+28px)] left-0 w-full flex justify-between text-white text-base xl:text-3xl font-medium font-arpona normal-case" style={{ letterSpacing: '-0.05em' }}>
                    <span>Our GrabV</span>
                    <span>Your review</span>
                  </div>
                  WHAT PEOPLE
                </div>
                <div className="relative text-[14.5vw] xl:text-[11vw] whitespace-nowrap">
                  ARE SAYING
                  {/* Stir Simmer Sticker */}
                  <img 
                    src="/images/HomePage/stir simmer sticker.webp" 
                    alt="Stir Simmer Sticker" 
                    className="absolute left-[-10%] -bottom-[100%] w-[22vw] md:w-[130px] lg:w-[160px] 2xl:w-[190px] md:-translate-y-[40px] lg:-translate-y-[60px] xl:-translate-y-[85px] 2xl:-translate-y-[160px] rotate-3 z-30 pointer-events-none"
                  />
                </div>
              </div>

            </div>

          </div>

          {/* Reviews Grid */}
          <div className="w-full max-w-[3000px] mx-auto mt-12 px-4 flex md:items-center xl:justify-center overflow-x-auto snap-x snap-mandatory gap-6 relative z-30 pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -translate-y-[20px] md:-translate-y-[5px] lg:translate-y-[10px]">
            
            {/* Review 1 */}
            <div className="relative w-[82vw] md:w-[350px] lg:w-[400px] xl:w-[500px] shrink-0 max-w-[1400px] snap-center">
              <img src="/images/HomePage/review1.webp" alt="Review 1" className="w-full h-auto drop-shadow-2xl" />
              <div className="absolute top-[48%] right-[22%] flex flex-col items-end rotate-[8deg] -translate-y-1 translate-x-1 md:translate-y-0 md:translate-x-0 2xl:-translate-y-2 2xl:translate-x-2">
                <span className="font-bold text-[3.6vw] md:text-[15px] lg:text-[17px] xl:text-[21px] 2xl:text-[23px] text-black leading-none tracking-tight">-Sneha Mehta</span>
                <span className="font-medium text-[2.5vw] md:text-[10px] lg:text-[12px] xl:text-[15px] 2xl:text-[17px] text-black leading-tight pr-1 tracking-tighter">Bengaluru, Copywriter</span>
              </div>
              <div className="absolute bottom-[5%] left-[18%] right-[10%] h-[40%] flex items-start px-2 translate-y-[20px] -translate-x-[12px] xl:translate-y-[24px] xl:-translate-x-[14px]">
                <p className="text-black font-arpona font-normal tracking-[-0.02em] text-[2.9vw] md:text-[12px] lg:text-[14px] xl:text-[18px] 2xl:text-[20px] leading-[1.4] underline decoration-2 underline-offset-4 decoration-[#99B1FA]">
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
            <div className="relative w-[82vw] md:w-[360px] lg:w-[420px] xl:w-[540px] shrink-0 max-w-[1400px] snap-center translate-y-[12px] md:translate-y-0">
              <img src="/images/HomePage/review2.webp" alt="Review 2" className="w-full h-auto drop-shadow-2xl" />
              <div className="absolute top-[44%] right-[13%] flex flex-col items-end rotate-[-10deg] -translate-y-[6px] -translate-x-[8px] md:translate-y-[8px] md:-translate-x-[10px] lg:translate-y-[12px] lg:-translate-x-[12px] xl:translate-y-[15px] xl:-translate-x-[15px] 2xl:translate-y-[5px] 2xl:-translate-x-[30px]">
                <span className="font-bold text-[3.2vw] md:text-[13px] lg:text-[15px] xl:text-[19px] 2xl:text-[21px] text-black leading-none tracking-tight">-Ananya & Rohan</span>
                <span className="font-medium text-[2.3vw] md:text-[9px] lg:text-[11px] xl:text-[14px] 2xl:text-[16px] text-black leading-tight pr-1 tracking-tighter">Bengaluru, Consultants</span>
              </div>
              <div className="absolute bottom-[0%] left-[14%] right-[10%] h-[40%] flex items-start px-2 -translate-y-[4px] md:translate-y-[2px] lg:translate-y-[4px] xl:translate-y-[5px] translate-x-[2px] xl:translate-x-[4px]">
                <p className="text-black font-arpona font-normal tracking-[-0.02em] text-[2.8vw] md:text-[11px] lg:text-[13px] xl:text-[17px] 2xl:text-[19px] leading-[1.4] underline decoration-2 underline-offset-4 decoration-[#99B1FA]">
                  After office,<br />
                  full curry prep is too much.<br />
                  GrabV with chicken or paneer<br />
                  tastes really good proper home<br />
                  food vibes. Total weekday save.
                </p>
              </div>
            </div>


            {/* Review 3 */}
            <div className="relative w-[82vw] md:w-[350px] lg:w-[400px] xl:w-[500px] shrink-0 max-w-[1400px] snap-center">
              <img src="/images/HomePage/review3.webp" alt="Review 3" className="w-full h-auto drop-shadow-2xl" />
              <div className="absolute top-[44%] right-[22%] flex flex-col items-end rotate-[6deg] md:translate-y-[0px] md:translate-x-[8px] lg:translate-y-[2px] lg:translate-x-[10px] xl:translate-y-[3px] xl:translate-x-[12px] 2xl:translate-y-[0px] 2xl:translate-x-[25px]">
                <span className="font-bold text-[3.6vw] md:text-[15px] lg:text-[17px] xl:text-[21px] 2xl:text-[23px] text-black leading-none tracking-tight">-Rekha Nair</span>
                <span className="font-medium text-[2.5vw] md:text-[10px] lg:text-[12px] xl:text-[15px] 2xl:text-[17px] text-black leading-tight pr-1 tracking-tighter">Bengaluru, Housewife</span>
              </div>
              <div className="absolute bottom-[0%] left-[18%] right-[10%] h-[40%] flex items-start px-2 -translate-y-[4px] -translate-x-[12px] xl:-translate-y-[5px] xl:-translate-x-[14px]">
                <p className="text-black font-arpona font-normal tracking-[-0.02em] text-[2.9vw] md:text-[12px] lg:text-[14px] xl:text-[18px] 2xl:text-[20px] leading-[1.4] underline decoration-2 underline-offset-4 decoration-[#99B1FA]">
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
        <section ref={readyToCookSectionRef} className="relative w-full h-[450px] md:h-[700px] lg:h-[900px] xl:h-[1200px] 2xl:h-[83.3vw] bg-[#FBF5E1] pt-12 xl:pt-20 2xl:pt-[5.5vw] overflow-visible font-arpona flex flex-col items-center">
          
          {/* Order Now Button */}
          <Link href="/products" className="mb-12 z-40">
            <button 
              style={{
                borderRadius: '0.3125rem',
                backgroundColor: 'rgb(247, 216, 13)',
                color: '#0D3D1B',
                letterSpacing: '-0.06em'
              }}
              className="flex h-10 w-[8.25rem] shrink-0 items-center justify-center font-medium text-[1rem] transition-colors hover:bg-yellow-400 xl:h-11 xl:w-[9.75rem] xl:text-[1.05rem] 2xl:h-12 2xl:w-[11.25rem] 2xl:text-[1.1rem] shadow-md"
            >
              Order Now
            </button>
          </Link>

          {/* Main Heading */}
          <div className="relative w-full flex flex-col items-center justify-center text-center mt-4">
            
            <div className="relative z-10 font-kura uppercase leading-[0.85] tracking-[-0.02em] text-center flex flex-col items-center w-full">
              
              {/* Shadow layer */}
              <div className="absolute inset-0 flex flex-col items-center z-0 pointer-events-none translate-y-[3px] translate-x-[5px] lg:translate-y-[6px] lg:translate-x-[9px] xl:translate-y-[8px] xl:translate-x-[12px] 2xl:translate-y-[0.55vw] 2xl:translate-x-[0.83vw]" style={{ color: '#F7D80C' }}>
                <div 
                  className="text-[14vw] w-[92vw] whitespace-nowrap transition-transform duration-1000 ease-out"
                  style={{ transform: isReadyToCookVisible ? 'translateX(0)' : 'translateX(-100vw)' }}
                >
                  <div className="flex justify-between w-full"><span>READY</span><span>TO</span><span>COOK</span></div>
                </div>
                <div 
                  className="text-[14vw] w-[92vw] whitespace-nowrap transition-transform duration-1000 ease-out"
                  style={{ transform: isReadyToCookVisible ? 'translateX(0)' : 'translateX(100vw)' }}
                >
                  <div className="flex justify-between w-full">{"SMARTSMRTER".split("").map((c, i) => <span key={i}>{c}</span>)}</div>
                </div>
                <div 
                  className="text-[14vw] w-[92vw] whitespace-nowrap transition-transform duration-1000 ease-out" 
                  style={{ transform: isReadyToCookVisible ? 'translateX(0)' : 'translateX(-100vw)' }}
                >
                  <div className="flex justify-between w-full" style={{ letterSpacing: 'normal' }}>{"EVERY  ERDAY?".split("").map((c, i) => <span key={i}>{c === ' ' ? '\u00A0' : c}</span>)}</div>
                </div>
              </div>

              {/* Fill layer */}
              <div className="relative z-10 flex flex-col items-center w-full" style={{ color: '#156B37' }}>
                <div 
                  className="relative text-[14vw] w-[92vw] flex flex-col whitespace-nowrap transition-transform duration-1000 ease-out"
                  style={{ transform: isReadyToCookVisible ? 'translateX(0)' : 'translateX(-100vw)' }}
                >
                  <div className="flex justify-between w-full"><span>READY</span><span>TO</span><span>COOK</span></div>
                  {/* Chef Effort Sticker */}
                  <img 
                    src="/images/HomePage/chef effort sticker.webp" 
                    alt="Chef Effort Sticker" 
                    className="absolute left-[-5%] -top-[130%] max-[380px]:-translate-y-[15px] w-[100px] md:w-[180px] lg:w-[220px] 2xl:w-[15.2vw] md:translate-x-[20px] lg:translate-x-[30px] 2xl:translate-x-[2vw] md:translate-y-[10px] lg:translate-y-[20px] xl:translate-y-[120px] 2xl:translate-y-[7vw] -rotate-3 z-30 pointer-events-none"
                  />
                </div>
                <div 
                  className="text-[14vw] w-[92vw] whitespace-nowrap transition-transform duration-1000 ease-out"
                  style={{ transform: isReadyToCookVisible ? 'translateX(0)' : 'translateX(100vw)' }}
                >
                  <div className="flex justify-between w-full">{"SMARTSMRTER".split("").map((c, i) => <span key={i}>{c}</span>)}</div>
                </div>
                <div 
                  className="text-[14vw] w-[92vw] whitespace-nowrap transition-transform duration-1000 ease-out" 
                  style={{ transform: isReadyToCookVisible ? 'translateX(0)' : 'translateX(-100vw)' }}
                >
                  <div className="flex justify-between w-full" style={{ letterSpacing: 'normal' }}>{"EVERY  ERDAY?".split("").map((c, i) => <span key={i}>{c === ' ' ? '\u00A0' : c}</span>)}</div>
                </div>
              </div>

            </div>

            {/* Product Image */}
            <div className="absolute top-[10%] left-[55%] -translate-x-1/2 z-20 w-[62%]">
              <img src="/images/HomePage/product%20package%203.webp" alt="Smoked Makhani Gravy" className="w-full h-auto drop-shadow-2xl" />
            </div>

          </div>
          
          {/* Footer Wavy Transition removed as footer now uses background image */}
        </section>

        {/* FOOTER SECTION REMOVED */}

      </main>
    </div>
  );
}

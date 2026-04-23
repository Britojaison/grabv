import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full font-bomstad overflow-x-hidden" style={{ backgroundColor: 'rgb(239, 238, 230)' }}>

      {/* Navbar Section (H: 80px) */}
      <header
        style={{ backgroundColor: 'rgb(12, 61, 27)' }}
        className="relative z-[100] w-full flex-shrink-0 shadow-md"
      >
        <div className="max-w-[1440px] mx-auto px-8 h-[80px] flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/images/logo.svg"
              alt="GrabV Logo"
              width={110}
              height={40}
              className="w-auto h-12"
              priority
            />
          </div>

          <nav className="flex items-center gap-12 text-white font-medium">
            <Link href="/" className="hover:text-[rgb(247,216,13)] transition-colors text-[18px]">Home</Link>
            <Link href="#" className="hover:text-[rgb(247,216,13)] transition-colors text-[18px]">Recipes</Link>
            <Link href="/products" className="hover:text-[rgb(247,216,13)] transition-colors text-[18px]">Products</Link>
            <Link href="/ourstory" className="hover:text-[rgb(247,216,13)] transition-colors text-[18px] whitespace-nowrap">Our Story</Link>
            <Link href="#" className="hover:text-[rgb(247,216,13)] transition-colors text-[18px] whitespace-nowrap">Contact Us</Link>
            <Link href="#" className="hover:text-[rgb(247,216,13)] transition-colors text-[18px]">FAQ</Link>
          </nav>

          <button
            style={{
              width: '142px',
              height: '37px',
              borderRadius: '5px',
              fontSize: '18px',
              backgroundColor: 'rgb(247, 216, 13)',
              color: 'rgb(12, 61, 27)',
              letterSpacing: '0.05em'
            }}
            className="font-bomstad font-medium flex items-center justify-center hover:bg-yellow-400 transition-colors shrink-0"
          >
            Order Now
          </button>
        </div>
      </header>

      {/* Main Container - Full Width */}
      <main className="w-full relative flex flex-col items-center">

        {/* Full-width Background Panel */}
        <div className="absolute left-0 top-0 w-full h-[800px] z-0 flex-shrink-0">
          <Image
            src="/images/bg green.svg"
            alt="Hero Background"
            fill
            className="object-cover object-bottom"
            priority
          />
        </div>

        {/* Content Wrapper constrained to 1440px with correct z-index */}
        <div className="relative w-full max-w-[1440px] mx-auto px-8 h-[800px] shrink-0 z-30 flex">

          {/* Left Text Content - In normal flow so alignment strictly matches navbar */}
          <div className="w-full lg:w-[60%] pt-[70px] z-20 flex flex-col">
            {/* Fresh & Flavorful Pill with Custom Border */}
            <div className="relative mb-8 inline-block w-fit">
              {/* Yellow Pill Background */}
              <div
                style={{ height: '60px', backgroundColor: 'rgb(247, 216, 13)' }}
                className="w-fit px-8 rounded-full flex items-center justify-center gap-3 relative z-10 shadow-md"
              >
                <div className="relative w-[27px] h-[27px] shrink-0" style={{ filter: 'brightness(0) invert(34%) sepia(35%) saturate(1048%) hue-rotate(97deg) brightness(93%) contrast(92%)' }}>
                  <Image
                    src="/images/leaf.svg"
                    alt="Leaf"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="font-bomstad font-medium tracking-wide whitespace-nowrap" style={{ fontSize: '27px', color: 'rgb(21, 107, 54)' }}>
                  Fresh & Flavorful
                </span>
              </div>

              {/* Border SVG on Top - forced to stretch via object-fill */}
              <div className="absolute -inset-x-6 -inset-y-2 z-20 pointer-events-none">
                <Image
                  src="/images/border2.svg"
                  alt="Pill Border"
                  fill
                  className="object-fill"
                />
              </div>
            </div>

            {/* Main Heading */}
            <div className="mb-6">
              <h1 className="font-kura leading-[0.9] text-brand-yellow m-0 p-0 uppercase" style={{ fontSize: '80px' }}>
                ONE GRAVY
              </h1>
              <h1 className="font-kura leading-[0.9] text-white m-0 p-0" style={{ fontSize: '80px' }}>
                Endless Possibilities
              </h1>
            </div>

            {/* Description */}
            <p className="text-white max-w-2xl leading-[1.2] mb-10 font-bomstad font-normal" style={{ fontSize: '25px' }}>
              A slow-cooked, preservative-free<br />
              onion-tomato base made with love — dinner<br />
              is ready in 5 minutes.
            </p>

            {/* CTA Buttons - Single button as per request */}
            <div className="flex flex-wrap lg:flex-nowrap items-center gap-4">
              <Link
                href="/products"
                className="bg-[rgb(17,82,40)] border border-transparent text-white rounded-full px-10 py-3.5 text-[25px] font-bomstad font-normal hover:bg-brand-yellow hover:text-[rgb(17,82,40)] transition-all shadow-sm whitespace-nowrap"
              >
                Explore our products
              </Link>
            </div>
          </div>
        </div>

        {/* Spices Overlay behind the gravy pot - scaled down and kept within green area */}
        <div
          className="absolute pointer-events-none hidden lg:block z-20 overflow-hidden"
          style={{ width: '784px', height: '603px', top: '50px', right: '-10px' }}
        >
          <Image
            src="/images/spices.svg"
            alt="Spices background"
            fill
            className="object-contain object-right opacity-80"
            priority
          />
        </div>

        {/* Gravy Pouring Image spans across sections, pinned to the absolute right of the entire VIEWPORT */}
        <div
          className="absolute right-0 pointer-events-none hidden lg:block z-[50]"
          style={{ width: '644px', height: '1226px', top: '-10px' }}
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
        <div className="w-full relative pt-4 pb-32 z-10">
          <div className="w-full max-w-[1440px] mx-auto px-8 relative z-[30]">

            {/* Features Rows of Pills - Staggered layout as per Figma */}
            <div className="flex flex-col gap-5 items-start lg:w-[75%]">

              {/* Row 1 */}
              <div className="flex flex-wrap items-center gap-5">
                {/* Ready in 10 min */}
                <div className="bg-white rounded-full px-7 py-3 flex items-center gap-3 shadow-sm border border-neutral-100">
                  <div className="w-[30px] h-[30px] relative">
                    <Image src="/images/timer2.svg" alt="Ready in 10 min" fill className="object-contain" />
                  </div>
                  <span className="text-[rgb(21,107,54)] font-normal text-[25px] font-bomstad whitespace-nowrap">Ready in 10 min</span>
                </div>
                {/* Slow cooked */}
                <div className="bg-white rounded-full px-7 py-3 flex items-center gap-3 shadow-sm border border-neutral-100">
                  <div className="w-[30px] h-[30px] relative">
                    <Image src="/images/slow.svg" alt="Slow cooked" fill className="object-contain" />
                  </div>
                  <span className="text-[rgb(21,107,54)] font-normal text-[25px] font-bomstad whitespace-nowrap">Slow cooked</span>
                </div>
                {/* FSSAI Certified */}
                <div className="bg-white rounded-full px-7 py-3 flex items-center gap-3 shadow-sm border border-neutral-100">
                  <div className="w-[30px] h-[30px] relative">
                    <Image src="/images/fssai icon.svg" alt="FSSAI Certified" fill className="object-contain" />
                  </div>
                  <span className="text-[rgb(21,107,54)] font-normal text-[25px] font-bomstad whitespace-nowrap">FSSAI Certified</span>
                </div>
              </div>

              {/* Row 2 - Shifted for staggered effect */}
              <div className="flex flex-wrap items-center gap-5 ml-0 lg:ml-20">
                {/* Zero Preservatives */}
                <div className="bg-white rounded-full px-7 py-3 flex items-center gap-3 shadow-sm border border-neutral-100">
                  <div className="w-[30px] h-[30px] relative">
                    <Image src="/images/tick3.svg" alt="Zero Preservatives" fill className="object-contain" />
                  </div>
                  <span className="text-[rgb(21,107,54)] font-normal text-[25px] font-bomstad whitespace-nowrap">Zero Preservatives</span>
                </div>
                {/* Cold Chain Packed */}
                <div className="bg-white rounded-full px-7 py-3 flex items-center gap-3 shadow-sm border border-neutral-100">
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
        <section className="w-full relative pt-0 pb-0 flex flex-col items-center overflow-visible">
          {/* Full-width Yellow Background - Reduced overlap from top */}
          <div className="absolute inset-x-0 -top-[80px] bottom-0 z-0 pointer-events-none overflow-hidden">
            <div className="relative w-full h-full">
              <Image
                src="/images/bg yellow.svg"
                alt="Yellow Background"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </div>

          {/* Content Wrapper */}
          <div className="relative w-full max-w-[1440px] mx-auto px-8 z-[40] flex flex-col lg:flex-row items-center pt-0 -mt-36">

            {/* Left Content */}
            <div className="w-full lg:w-[40%] flex flex-col items-start pt-0">
              {/* Question Pill with Border Settings */}
              <div className="relative mb-4 inline-block w-fit">
                {/* Red Pill Background */}
                <div
                  style={{ backgroundColor: 'rgb(247, 0, 52)' }}
                  className="px-10 py-3.5 rounded-full relative z-10 shadow-md"
                >
                  <span className="text-white font-normal text-[28px] whitespace-nowrap font-bomstad tracking-wider">
                    What is GrabV ?
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
              <div className="mb-6 w-full">
                <h2 className="font-kura leading-[0.9] text-[75px] m-0 p-0 uppercase" style={{ color: 'rgb(247, 0, 52)' }}>
                  Your Secret to
                </h2>
                <h2 className="font-kura leading-[1] text-[75px] m-0 p-0 uppercase whitespace-nowrap">
                  <span style={{ color: 'rgb(21, 107, 13)'/* Green */ }}>Effortless </span>
                  <span style={{ color: 'rgb(247, 0, 52)'/* Red */ }}>Cooking</span>
                </h2>
              </div>

              {/* Description text */}
              <p className="max-w-xl leading-[1.3] mb-12 font-normal font-bomstad" style={{ fontSize: '25px', color: 'rgb(21, 107, 54)' }}>
                A slow-cooked, preservative-free<br />
                onion-tomato base made with love – dinner<br />
                is ready in 5 minutes.
              </p>

              {/* Learn More Button */}
              <button
                style={{ backgroundColor: 'rgb(21, 107, 54)' }}
                className="group flex items-center gap-6 px-10 py-5 rounded-full text-white text-[25px] font-normal font-bomstad hover:bg-black transition-all shadow-lg"
              >
                Learn More
                <Image src="/images/arrow.svg" alt="Arrow" width={32} height={32} className="object-contain" />
              </button>
            </div>

            {/* Right Content - Product Image moved drastically right */}
            <div className="w-full lg:w-[60%] flex justify-center lg:justify-end relative h-[1000px] lg:-mr-[450px] lg:translate-x-64">
              <div className="relative w-full h-full max-w-[1300px]">
                <Image
                  src="/images/product 1.svg"
                  alt="Product Showcase"
                  fill
                  className="object-contain object-right"
                  priority
                />
              </div>
            </div>

          </div>
        </section>

        {/* Pouch To Plate Section */}
        <section className="w-full pt-28 pb-24 flex flex-col items-center" style={{ backgroundColor: 'rgb(239, 238, 230)' }}>
          <div className="w-full max-w-[1440px] mx-auto px-8">

            <div className="flex flex-col items-center text-center mb-10 relative">
              <div className="relative z-20">
                <h2 className="font-kura leading-[1.0] text-[46px] sm:text-[56px] lg:text-[85px] m-0 p-0 uppercase">
                  <span style={{ color: 'rgb(247, 0, 52)' }}>Pouch To Plate </span>
                  <span style={{ color: 'rgb(21, 107, 54)' }}>In 5 Steps</span>
                </h2>
                <p className="font-bomstad font-normal text-[17px] sm:text-[20px] lg:text-[25px] leading-[1.2] mt-4" style={{ color: 'rgb(21, 107, 54)' }}>
                  No Chopping. No Prep. No Recipe Needed
                </p>
              </div>

              <div className="flex flex-col items-center -mt-24">
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

            {/* Steps Grid */}
            <div className="mx-auto grid w-full max-w-[1284px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-20 mt-32 mb-32">
              {[
                { step: 1, text: "Add your tempering\n(tadka) in oil.", rotate: "-rotate-3" },
                { step: 2, text: "Sauté veggies or\nprotein of your choice.", rotate: "rotate-3" },
                { step: 3, text: "Pour GrabV &\nadjust consistency", rotate: "-rotate-3" },
                { step: 4, text: "Sprinkle spices\n& salt to taste.", rotate: "rotate-3" },
                { step: 5, text: "Cook for 10 mins\nand enjoy!", rotate: "-rotate-3" }
              ].map((item) => (
                <div key={item.step} className="flex flex-col items-center">
                  <div className="relative group w-full max-w-[230px]">
                    <div
                      className={`absolute -top-[34px] left-1/2 -translate-x-1/2 w-[124px] h-[42px] rounded-full border-2 border-[#f70034] flex items-center justify-center z-20 shadow-sm ${item.rotate}`}
                      style={{ backgroundColor: 'rgb(247, 216, 13)' }}
                    >
                      <span className="font-kura text-[21px] leading-none text-[#f70034]">Step {item.step}</span>
                    </div>

                    <div className="bg-white rounded-[5px] p-[5px] shadow-sm border border-[rgb(247,216,13)] flex flex-col items-center text-center w-full h-[290px]">
                      <div className="relative w-full h-[180px] mb-6 rounded-[5px] overflow-hidden">
                        <Image
                          src={`/images/step ${item.step}.svg`}
                          alt={`Step ${item.step}`}
                          fill
                          sizes="(max-width: 640px) 230px, 20vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <p className="font-bomstad font-normal text-[18px] leading-[22px] whitespace-pre-line px-2 text-center" style={{ color: 'rgb(21, 107, 54)' }}>
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
        <section className="w-full relative py-20 flex flex-col items-center overflow-visible min-h-[850px] justify-center" style={{ backgroundColor: 'rgb(239, 238, 230)' }}>
          {/* Full-width Yellow Background with torn edges */}
          <div className="absolute inset-x-0 -top-24 bottom-0 z-0 overflow-hidden">
            <Image
              src="/images/bg yellow.svg"
              alt="Yellow Background"
              fill
              className="object-cover object-top -scale-y-100"
              priority
            />
          </div>

          {/* Content Wrapper */}
          <div className="relative w-full max-w-[1440px] mx-auto px-8 lg:px-[80px] z-10 flex flex-col items-start pb-8">

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

              {/* Showcase Image */}
              <div className="w-full lg:w-[563px] lg:h-[332px] relative -mt-4 shrink-0 lg:mr-12 border-2 border-red-500 rounded-[10px] overflow-hidden">
                <Image
                  src="/images/cook.svg"
                  alt="Cooking Illustration"
                  fill
                  className="object-cover"
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

            <div className="w-full mt-16 h-[19px]" />

          </div>
        </section>

        {/* Our Quality Promise Section */}
        <section className="w-full relative pt-20 pb-20 flex flex-col items-center" style={{ backgroundColor: 'rgb(239, 238, 230)' }}>
          <div className="w-full max-w-[1440px] mx-auto px-8 flex flex-col items-center relative z-10 pt-0 pb-16">

            {/* Title */}
            <h2 className="font-kura font-normal text-[85px] m-0 p-0 leading-[1.1] text-center tracking-wide uppercase mb-20">
              <span style={{ color: 'rgb(247, 0, 52)' }}>Our Quality </span>
              <span style={{ color: 'rgb(21, 107, 54)' }}>Promise</span>
            </h2>

            {/* Grid */}
            <div className="w-full justify-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6 pl-4 lg:pl-12">
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
          <div className="w-full relative pt-24 pb-36 flex flex-col items-center text-center overflow-hidden">
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <Image
                src="/images/bg green2.svg"
                alt="Background"
                fill
                className="object-cover object-top"
                priority
              />
              {/* Fallback pattern / color blending top edge to beige */}
              <div className="absolute inset-0 -z-10" style={{ backgroundColor: 'rgb(239, 238, 230)' }} />
            </div>

            {/* Content Wrapper */}
            <div className="relative z-10 flex flex-col items-center">
              {/* Make 20+ dishes Pill */}
              <div className="relative w-[313px] h-[83px] mb-10">
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
              <div className="mb-8 flex items-baseline justify-center gap-4 flex-wrap">
                <h2 className="font-kura text-[85px] leading-[0.9]" style={{ color: 'rgb(247, 216, 13)' }}>
                  Cook anything
                </h2>
                <h2 className="font-kura text-[85px] leading-[0.9] text-white">
                  In minutes
                </h2>
              </div>

              {/* Subtext */}
              <div className="text-white text-[25px] font-bomstad font-normal leading-[1.3] max-w-3xl px-6 opacity-90">
                <p>From quick weeknight dals to weekend feasts.</p>
                <p>One base, unlimited possibilities.</p>
              </div>
            </div>


          </div>

          {/* Bottom Half - Light Cream Background */}
          <div
            className="w-full pt-12 pb-20 flex flex-col items-center"
            style={{ backgroundColor: 'rgb(239, 238, 230)' }}
          >
            {/* Vegetarian Pill with Horizontal Lines */}
            <div className="w-full max-w-[1440px] mx-auto px-8 flex items-center gap-8 mb-12 opacity-80">
              <div className="flex-1 h-[2px]" style={{ backgroundColor: 'rgb(21, 107, 54)' }} />
              <div className="flex items-center gap-3 px-8 py-3 rounded-full" style={{ backgroundColor: 'rgb(179, 202, 183)' }}>
                <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: 'rgb(21, 107, 54)' }} />
                <span className="font-bold text-[22px] tracking-[0.1em]" style={{ color: 'rgb(21, 107, 54)' }}>
                  VEGETARIAN
                </span>
              </div>
              <div className="flex-1 h-[2px]" style={{ backgroundColor: 'rgb(21, 107, 54)' }} />
            </div>

            {/* Recipe Grid */}
            <div className="w-full max-w-[1440px] mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-28">
              {[
                { title: "Paneer Butter Masala", desc: "Creamy, rich, restaurant-style. Just add paneer to GrabV, simmer 5 minutes, finish with butter." },
                { title: "Paneer Butter Masala", desc: "Creamy, rich, restaurant-style. Just add paneer to GrabV, simmer 5 minutes, finish with butter." },
                { title: "Paneer Butter Masala", desc: "Creamy, rich, restaurant-style. Just add paneer to GrabV, simmer 5 minutes, finish with butter." }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col group items-start">
                  {/* Image Container with Badges */}
                  <div className="relative w-full aspect-[4/5] rounded-[30px] overflow-hidden mb-8 shadow-xl">
                    <Image
                      src="/images/food1.svg"
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Badges on Image */}
                    <div className="absolute top-5 inset-x-5 flex justify-between items-center">
                      <div className="text-white px-5 py-2 rounded-full text-[20px] font-bold shadow-md" style={{ backgroundColor: 'rgba(21, 107, 54, 0.9)' }}>
                        Veg
                      </div>
                      <div className="text-white px-5 py-2 rounded-full text-[20px] font-bold shadow-md flex items-center gap-2" style={{ backgroundColor: 'rgba(21, 107, 54, 0.9)' }}>
                        <Image src="/images/timer.svg" alt="Timer" width={24} height={24} className="brightness-0 invert" />
                        <span>6 Min</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-col items-start px-2">
                    <div className="px-4 py-1.5 rounded-full mb-3 shadow-sm" style={{ backgroundColor: 'rgb(207, 219, 204)' }}>
                      <span className="text-[18px] font-bomstad font-normal tracking-wide" style={{ color: 'rgb(21, 107, 54)' }}>
                        Indian classic
                      </span>
                    </div>
                    <h3 className="font-bomstad font-bold text-[30px] leading-tight tracking-normal mb-3 whitespace-nowrap" style={{ color: 'rgb(247, 0, 52)' }}>
                      {item.title}
                    </h3>
                    <p className="font-bomstad text-[18px] leading-relaxed tracking-normal font-normal max-w-sm" style={{ color: 'rgb(21, 107, 54)' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* Non-Vegetarian Pill with Horizontal Lines */}
            <div className="w-full max-w-[1440px] mx-auto px-8 flex items-center gap-8 mt-24 mb-12 opacity-80">
              <div className="flex-1 h-[2px]" style={{ backgroundColor: 'rgb(247, 0, 52)' }} />
              <div className="flex items-center gap-3 px-8 py-3 rounded-full" style={{ backgroundColor: 'rgba(247, 0, 52, 0.15)' }}>
                <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: 'rgb(247, 0, 52)' }} />
                <span className="font-bold text-[22px] tracking-[0.1em]" style={{ color: 'rgb(247, 0, 52)' }}>
                  NON-VEGETARIAN
                </span>
              </div>
              <div className="flex-1 h-[2px]" style={{ backgroundColor: 'rgb(247, 0, 52)' }} />
            </div>

            {/* Non-Vegetarian Grid */}
            <div className="w-full max-w-[1440px] mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-28 mb-32">
              {[
                { title: "Paneer Butter Masala", desc: "Creamy, rich, restaurant-style. Just add paneer to GrabV, simmer 5 minutes, finish with butter." },
                { title: "Paneer Butter Masala", desc: "Creamy, rich, restaurant-style. Just add paneer to GrabV, simmer 5 minutes, finish with butter." },
                { title: "Paneer Butter Masala", desc: "Creamy, rich, restaurant-style. Just add paneer to GrabV, simmer 5 minutes, finish with butter." }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col group items-start">
                  {/* Image Container with Badges */}
                  <div className="relative w-full aspect-[4/5] rounded-[30px] overflow-hidden mb-8 shadow-xl">
                    <Image
                      src="/images/food1.svg"
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Badges on Image */}
                    <div className="absolute top-5 inset-x-5 flex justify-between items-center">
                      <div className="text-white px-5 py-2 rounded-full text-[20px] font-bold shadow-md" style={{ backgroundColor: 'rgba(125, 23, 16, 0.9)' }}>
                        Non-veg
                      </div>
                      <div className="text-white px-5 py-2 rounded-full text-[20px] font-bold shadow-md flex items-center gap-2" style={{ backgroundColor: 'rgba(125, 23, 16, 0.9)' }}>
                        <Image src="/images/timer.svg" alt="Timer" width={24} height={24} className="brightness-0 invert" />
                        <span>6 Min</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-col items-start px-2">
                    <div className="px-4 py-1.5 rounded-full mb-3 shadow-sm" style={{ backgroundColor: 'rgb(207, 219, 204)' }}>
                      <span className="text-[18px] font-bold tracking-wide" style={{ color: 'rgb(21, 107, 54)' }}>
                        Indian classic
                      </span>
                    </div>
                    <h3 className="font-bomstad font-bold text-[30px] leading-tight tracking-normal mb-3 whitespace-nowrap" style={{ color: 'rgb(247, 0, 52)' }}>
                      {item.title}
                    </h3>
                    <p className="font-bomstad text-[18px] leading-relaxed tracking-normal font-normal max-w-sm" style={{ color: 'rgb(21, 107, 54)' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Banner Section */}
            <div
              className="w-full max-w-[1440px] mx-auto rounded-[20px] px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-8 mb-10 overflow-hidden relative"
              style={{ backgroundColor: 'rgb(21, 107, 54)' }}
            >
              <div className="flex flex-col items-start text-left z-10">
                <h2 className="font-kura text-[55px] leading-tight mb-2 uppercase">
                  <span style={{ color: 'rgb(247, 216, 13)' }}>20+ Recipes. </span>
                  <span className="text-white">One pouch.</span>
                </h2>
                <p className="text-white text-[22px] font-medium opacity-90">
                  Every dish starts with GrabV. What will you make tonight?
                </p>
              </div>

              <button
                className="bg-[#f70034] text-white px-10 py-5 rounded-full font-bomstad font-bold text-[30px] shadow-lg hover:bg-black transition-all whitespace-nowrap z-10"
              >
                Order Your Pouch
              </button>
            </div>
          </div>
        </section>

        {/* Manufacturing Process Section */}
        <section className="w-full pt-0 pb-32 flex flex-col items-center" style={{ backgroundColor: 'rgb(239, 238, 230)' }}>
          <div className="w-full max-w-[1440px] mx-auto px-8 flex flex-col items-start">

            {/* Header Content - Centered manually */}
            <div className="w-full flex flex-col items-center text-center mb-8">

              {/* Badge */}
              <div className="relative w-[282px] h-[75px] mb-10">
                <div className="absolute left-[0.69px] top-[6.46px] w-[277.615px] h-[60px] rounded-[100px]">
                  <Image
                    src="/images/red rectangle.svg"
                    alt=""
                    fill
                    className="pointer-events-none object-fill"
                  />
                </div>
                <Image
                  src="/images/green border.svg"
                  alt=""
                  fill
                  className="pointer-events-none object-contain"
                />
                <span className="absolute inset-0 flex items-center justify-center font-bomstad font-semibold text-[18px] leading-none tracking-normal text-white">
                  Manufacturing Process
                </span>
              </div>

              {/* Heading */}
              <h2 className="font-kura text-[85px] leading-[0.9] mb-4 uppercase">
                <span style={{ color: 'rgb(247, 0, 52)' }}>How we make </span>
                <span style={{ color: 'rgb(21, 107, 54)' }}>every pouch</span>
              </h2>

              {/* Subtext */}
              <div className="max-w-4xl text-[10px] font-bomstad font-normal leading-[1.4] tracking-normal text-center mb-12 px-6 opacity-90" style={{ color: 'rgb(21, 107, 54)' }}>
                No factory line. No bulk shortcuts. Every batch is made by hand the way a good cook<br />
                would — because that&apos;s the only way it tastes right.
              </div>
            </div>

            {/* Process Timeline */}
            <div className="w-full relative flex flex-col items-start gap-12 pt-4">
              {/* Vertical yellow line - starts and ends at the center of the edge moons */}
              <div
                className="absolute left-[89px] top-[41px] bottom-[41px] w-[4px] z-0"
                style={{ backgroundColor: 'rgb(247, 216, 13)' }}
              />

              {[
                { step: 1, title: "Fresh produce sourced daily", desc: "Onions, tomatoes, ginger and garlic are sourced fresh every morning. No cold storage, no aged produce." },
                { step: 2, title: "Slow-cooked in small batches", desc: "We cook our base for hours, just like you would at home, to develop deep, complex flavors naturally." },
                { step: 3, title: "No preservatives added", desc: "Our process relies on traditional cooking techniques and pure ingredients to ensure shelf stability without chemicals." },
                { step: 4, title: "Packed hot for freshness", desc: "Every pouch is sealed while hot to lock in nutrients and flavor, maintaining that home-cooked quality." },
                { step: 5, title: "Strict quality checks", desc: "Every single batch is tasted and verified for consistency and purity before it reaches your kitchen." }
              ].map((item) => (
                <div key={item.step} className="flex items-center gap-16 relative z-10 w-full group">
                  {/* Step Bowl Icon - Figma exact W 178, H 72 (approx H 80 for smoother curve) */}
                  <div className="relative shrink-0 w-[178px] h-[82px] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <Image
                      src="/images/moon.svg"
                      alt="Step Marker"
                      fill
                      className="object-contain"
                    />
                    <span className="font-kura text-[50px] leading-none tracking-normal relative z-10 w-[30px] h-[40px] flex items-center justify-center pt-[4px]" style={{ color: 'rgb(247, 0, 52)' }}>
                      {item.step}
                    </span>
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col items-start text-left max-w-none">
                    <h4 className="font-bomstad text-[30px] font-semibold leading-none tracking-normal mb-6" style={{ color: 'rgb(21, 107, 54)' }}>
                      {item.title}
                    </h4>
                    <p className="font-bomstad text-[18px] font-normal leading-none tracking-normal opacity-90 whitespace-nowrap" style={{ color: 'rgb(21, 107, 54)' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Reviews Section */}
        <div className="w-full relative flex flex-col items-center">
          {/* Green Header with Jagged Edge */}
          <div className="w-full relative pt-20 pb-32 flex flex-col items-center text-center">
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

            <div className="relative z-10 flex flex-col items-center">
              {/* What people are saying Pill */}
              <div className="relative w-[315px] h-[83px] mb-10">
                <div className="absolute left-[0.76px] top-[7.36px] w-[310px] h-[67px] rounded-[100px] bg-[rgb(247,216,13)]" />
                <Image
                  src="/images/red border.svg"
                  alt=""
                  fill
                  className="pointer-events-none object-contain"
                />
                <span className="absolute inset-0 flex items-center justify-center font-bomstad font-semibold text-[18px] leading-none tracking-normal" style={{ color: 'rgb(21, 107, 54)' }}>
                  What people are saying
                </span>
              </div>

              {/* Heading */}
              <h2 className="font-kura text-[85px] leading-[0.9] mb-20 text-center uppercase">
                <span className="text-white">Our GrabV </span>
                <span style={{ color: 'rgb(247, 216, 13)' }}>Your Review</span>
              </h2>
            </div>
          </div>

          {/* Review Cards Grid */}
          <div className="w-full max-w-[1440px] mx-auto px-8 py-20 grid grid-cols-1 md:grid-cols-3 gap-8 pb-32">
            {[1, 2, 3].map((item) => (
              <div key={item} className="relative p-8 rounded-[20px] bg-white flex flex-col gap-6">
                <div className="absolute inset-x-0 inset-y-0 pointer-events-none">
                  <Image
                    src="/images/border6.svg"
                    alt=""
                    fill
                    className="object-fill"
                  />
                </div>
                <div className="absolute -inset-1 pointer-events-none rotate-[1.5deg]">
                  <Image
                    src="/images/border6.svg"
                    alt=""
                    fill
                    className="object-fill"
                  />
                </div>
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-16 h-16 rounded-full overflow-hidden relative border border-neutral-100">
                    <Image src="/images/review.svg" alt="User" fill className="object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[20px] font-bold" style={{ color: 'rgb(21, 107, 54)' }}>Shneha Mehta</span>
                    <span className="text-[16px] text-neutral-400">Delhi</span>
                  </div>
                </div>
                <div className="flex gap-1 relative z-10">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="text-[24px]" style={{ color: 'rgb(247, 216, 13)' }}>★</span>
                  ))}
                </div>
                <p className="text-[18px] leading-relaxed font-medium relative z-10" style={{ color: 'rgb(21, 107, 54)' }}>
                  &quot;I was sceptical — how can a ready base taste this good? The onions are actually caramelised properly. My husband thought I&apos;d been cooking all afternoon.&quot;
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="w-full max-w-[1440px] mx-auto h-[550px] rounded-[15px] p-24 flex flex-col items-center justify-center text-center relative overflow-hidden mb-20 shadow-2xl"
          style={{ backgroundColor: 'rgb(21, 106, 55)' }}
        >

          {/* Heading */}
          <h2 className="font-kura text-[70px] leading-tight mb-8">
            <span style={{ color: 'rgb(247, 216, 13)' }}>Ready to cook smarter, </span>
            <span className="text-white">Everyday?</span>
          </h2>

          {/* Subtext */}
          <p className="text-white text-[20px] font-bomstad font-normal tracking-wide opacity-90 mb-12 max-w-4xl leading-[1.3]">
            Order 750g Or 250g pouch. A week of effortless dinners. Zero preservatives.<br />
            Shipped cold, direct to your door.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
            <button className="bg-white text-[#f70034] w-[260px] py-5 rounded-full font-bomstad font-medium text-[24px] shadow-xl hover:bg-[#f70034] hover:text-white transition-all">
              Order 750g
            </button>
            <button className="bg-white text-[#f70034] w-[260px] py-5 rounded-full font-bomstad font-medium text-[24px] shadow-xl hover:bg-[#f70034] hover:text-white transition-all">
              Order 250g
            </button>
            <button className="bg-white text-[#f70034] w-[260px] py-5 rounded-full font-bomstad font-normal text-[24px] shadow-xl hover:bg-[#f70034] hover:text-white transition-all group flex items-center justify-center gap-4">
              <div className="w-8 h-8 relative group-hover:brightness-0 group-hover:invert transition-all">
                <Image src="/images/whatsapp.svg" alt="WhatsApp" fill className="object-contain" />
              </div>
              <span className="text-[24px]">WhatsApp Us</span>
            </button>
          </div>

          {/* Footer text */}
          <div className="text-white text-[18px] font-bomstad font-normal tracking-wide flex items-center gap-1.5 opacity-80">
            <span>Free delivery on orders above ₹499</span>
            <span>•</span>
            <span>Ships within 48 hours</span>
            <span>•</span>
            <div className="h-10 w-20 relative invert brightness-0 -mx-4">
              <Image src="/images/fssai%20text.svg" alt="FSSAI" fill className="object-contain" />
            </div>
            <span>Certified</span>
          </div>
        </div>
      </main>

      {/* New Grid Footer Section */}
      <footer className="w-full py-16 px-8" style={{ backgroundColor: 'rgb(21, 107, 54)' }}>
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Column 1: Brand Box */}
          <div className="rounded-[30px] p-6 flex flex-col w-[299px] h-[234px]" style={{ backgroundColor: 'rgb(55, 122, 49)' }}>
            <div className="w-[80px] h-[40px] relative mb-3">
              <Image src="/images/logo.svg" alt="GrabV Logo" fill className="object-contain" />
            </div>
            <div className="flex flex-col gap-1 text-[16px] font-medium leading-[1.2] font-bomstad" style={{ color: 'rgb(247, 216, 13)' }}>
              <p>© 2026 GrabV. All rights reserved.</p>
              <p className="opacity-90">88gb Digital Marketing & Technology Company</p>
            </div>
          </div>

          {/* Column 2: Company Box */}
          <div className="rounded-[30px] p-6 flex flex-col w-[299px] h-[234px]" style={{ backgroundColor: 'rgb(55, 122, 49)' }}>
            <h4 className="text-[22px] font-bold mb-2" style={{ color: 'rgb(247, 216, 13)' }}>Company</h4>
            <div className="flex flex-col gap-1 text-[18px] font-medium font-bomstad leading-tight" style={{ color: 'rgb(247, 216, 13)' }}>
              <Link href="/ourstory" className="hover:opacity-80 transition-opacity">Our Story</Link>
              <Link href="#" className="hover:opacity-80 transition-opacity">Process</Link>
              <Link href="#" className="hover:text-[rgb(247,216,13)] transition-colors">Quality Promise</Link>
              <Link href="#" className="hover:opacity-80 transition-opacity">Contact Us</Link>
            </div>
          </div>

          {/* Column 3: Product Box */}
          <div className="rounded-[30px] p-6 flex flex-col w-[299px] h-[234px]" style={{ backgroundColor: 'rgb(55, 122, 49)' }}>
            <h4 className="text-[22px] font-bold mb-2" style={{ color: 'rgb(247, 216, 13)' }}>Product</h4>
            <div className="flex flex-col gap-1 text-[18px] font-medium font-bomstad leading-tight" style={{ color: 'rgb(247, 216, 13)' }}>
              <Link href="#" className="hover:opacity-80 transition-opacity">All Purpose Gravy</Link>
              <Link href="#" className="hover:opacity-80 transition-opacity">Ingredients</Link>
              <Link href="#" className="hover:opacity-80 transition-opacity">How to Use</Link>
              <Link href="#" className="hover:opacity-80 transition-opacity">Recipes</Link>
            </div>
          </div>

          {/* Column 4: Orders & Policies Box */}
          <div className="rounded-[30px] p-6 flex flex-col w-[299px] h-[234px] justify-between" style={{ backgroundColor: 'rgb(55, 122, 49)' }}>
            <div>
              <h4 className="text-[22px] font-bold mb-2" style={{ color: 'rgb(247, 216, 13)' }}>Order & Policies</h4>
              <div className="flex flex-col gap-1 text-[18px] font-medium font-bomstad leading-tight" style={{ color: 'rgb(247, 216, 13)' }}>
                <Link href="#" className="hover:opacity-80 transition-opacity">WhatsApp Order</Link>
                <Link href="#" className="hover:opacity-80 transition-opacity">Exchange Order</Link>
                <Link href="#" className="hover:opacity-80 transition-opacity">Privacy Policy</Link>
              </div>
            </div>

            {/* Social Links at Bottom Right of this box */}
            <div className="flex flex-col items-end gap-1.5 self-end mt-auto">
              <span className="text-[14px] font-bold font-bomstad text-white">Follow Us</span>
              <div className="flex items-center gap-3">
                <Link href="#" className="w-6 h-6 relative hover:scale-110 transition-transform brightness-0 invert">
                  <Image src="/images/facebook.svg" alt="Facebook" fill className="object-contain" />
                </Link>
                <Link href="#" className="w-6 h-6 relative hover:scale-110 transition-transform brightness-0 invert">
                  <Image src="/images/whatsapp1.svg" alt="WhatsApp" fill className="object-contain" />
                </Link>
                <Link href="#" className="w-6 h-6 relative hover:scale-110 transition-transform brightness-0 invert">
                  <Image src="/images/insta.svg" alt="Instagram" fill className="object-contain" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </footer>
    </div >
  );
}

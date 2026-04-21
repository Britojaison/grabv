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
            <Link href="#" className="hover:text-[rgb(247,216,13)] transition-colors text-[18px] whitespace-nowrap">our Story</Link>
            <Link href="#" className="hover:text-[rgb(247,216,13)] transition-colors text-[18px] whitespace-nowrap">Contact us</Link>
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
            src="/images/background.svg"
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
            {/* Fresh & Flavorful Pill */}
            <div
              style={{ height: '60px', backgroundColor: 'rgb(247, 216, 13)' }}
              className="w-fit px-8 rounded-full flex items-center justify-center gap-3 mb-8 shadow-md"
            >
              <Image
                src="/images/leaf.svg"
                alt="Leaf"
                width={27}
                height={27}
                className="w-auto h-auto"
                style={{ filter: 'brightness(0) invert(34%) sepia(35%) saturate(1048%) hue-rotate(97deg) brightness(93%) contrast(92%)' }}
              />
              <span className="font-bomstad font-medium tracking-wide whitespace-nowrap" style={{ fontSize: '27px', color: 'rgb(21, 107, 54)' }}>
                Fresh & Flavorful
              </span>
            </div>

            {/* Main Heading */}
            <div className="mb-6">
              <h1 className="font-kura leading-[0.9] text-brand-yellow m-0 p-0" style={{ fontSize: '80px', textTransform: 'none' }}>
                One Gravy
              </h1>
              <h1 className="font-kura leading-[0.9] text-white m-0 p-0" style={{ fontSize: '80px', textTransform: 'none' }}>
                Endless
              </h1>
              <h1 className="font-kura leading-[0.9] text-white m-0 p-0" style={{ fontSize: '80px', textTransform: 'none' }}>
                Possibilities
              </h1>
            </div>

            {/* Description */}
            <p className="text-white max-w-xl leading-[1.2] mb-10 font-bomstad font-normal" style={{ fontSize: '25px' }}>
              A slow-cooked, preservative-free<br />
              onion-tomato base made with love – dinner<br />
              is ready in 5 minutes.
            </p>

            {/* CTA Buttons - Force single row on desktop to match Figma */}
            <div className="flex flex-wrap lg:flex-nowrap items-center gap-4">
              <button
                className="bg-[rgb(17,82,40)] border border-transparent text-white rounded-[32px] px-8 py-3.5 text-[22px] font-medium hover:bg-brand-yellow hover:text-[rgb(17,82,40)] transition-all shadow-sm whitespace-nowrap"
              >
                Order 750g Pouch
              </button>
              <button
                className="bg-[rgb(17,82,40)] border border-transparent text-white rounded-[32px] px-8 py-3.5 text-[22px] font-medium hover:bg-brand-yellow hover:text-[rgb(17,82,40)] transition-all shadow-sm whitespace-nowrap"
              >
                Order 250g Pouch
              </button>
              <button
                className="bg-[rgb(17,82,40)] border border-transparent text-white rounded-[32px] px-8 py-3.5 text-[22px] font-medium hover:bg-brand-yellow hover:text-[rgb(17,82,40)] transition-all shadow-sm whitespace-nowrap"
              >
                See Recipes
              </button>
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

        {/* Features Bottom Bar - Content elevated to stay above yellow ragged edge */}
        <div className="w-full relative pt-16 pb-32 z-[10]">
          <div className="w-full max-w-[1440px] mx-auto px-8 flex flex-col xl:flex-row gap-6 relative z-[30]">

            {/* Features list restricted so it doesn't collide with Gravy bowl on right */}
            <div className="w-full lg:w-[60%] grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12">
              <div className="flex items-center gap-6">
                <Image src="/images/tick.svg" alt="Tick" width={75} height={75} className="object-contain shrink-0" />
                <span className="text-[#156b36] font-bold whitespace-nowrap" style={{ fontSize: '30px' }}>Zero Preservatives</span>
              </div>
              <div className="flex items-center gap-6">
                <Image src="/images/tick.svg" alt="Tick" width={75} height={75} className="object-contain shrink-0" />
                <span className="text-[#156b36] font-bold whitespace-nowrap" style={{ fontSize: '30px' }}>Slow Cooked</span>
              </div>
              <div className="flex items-center gap-6">
                <Image src="/images/tick.svg" alt="Tick" width={75} height={75} className="object-contain shrink-0" />
                <span className="text-[#156b36] font-bold whitespace-nowrap" style={{ fontSize: '30px' }}>Ready In 5 Mins</span>
              </div>
              <div className="flex items-center gap-6">
                <Image src="/images/tick.svg" alt="Tick" width={75} height={75} className="object-contain shrink-0" />
                <span className="text-[#156b36] font-bold whitespace-nowrap" style={{ fontSize: '30px' }}>Fresh & Flavorful</span>
              </div>
            </div>

          </div>
        </div>

        {/* What is GrabV Section */}
        <section className="w-full relative pt-20 pb-5 flex flex-col items-center">
          {/* Full-width Yellow Torn Background - Refined overlap to hit only the bottom of the pot */}
          <div className="absolute inset-x-0 -top-[140px] bottom-0 z-20 pointer-events-none">
            <div className="relative w-full h-[calc(100%+140px)]">
              <Image
                src="/images/bg yellow.svg"
                alt="Yellow Background"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </div>

          {/* Content Wrapper - Elevated z-index to stay above background */}
          <div className="relative w-full max-w-[1440px] mx-auto px-8 z-[40] flex flex-col lg:flex-row items-center gap-12">

            {/* Left Content */}
            <div className="w-full lg:w-[55%] flex flex-col items-start pt-12">
              {/* Question Pill */}
              <div
                style={{ backgroundColor: 'rgb(247, 0, 52)' }}
                className="px-10 py-3.5 rounded-full mb-10 shadow-md"
              >
                <span className="text-white font-semibold text-[28px] whitespace-nowrap font-bomstad tracking-wider">
                  What is GrabV ?
                </span>
              </div>

              {/* Secret Heading */}
              <div className="mb-6">
                <h2 className="font-kura leading-[0.9] text-[75px] m-0 p-0" style={{ color: 'rgb(247, 0, 52)' }}>
                  Your Secret to
                </h2>
                <h2 className="font-kura leading-[0.9] text-[75px] m-0 p-0">
                  <span style={{ color: 'rgb(21, 107, 54)' }}>Effortless </span>
                  <span style={{ color: 'rgb(247, 0, 52)' }}>Cooking</span>
                </h2>
              </div>

              {/* Description text */}
              <p className="max-w-xl leading-[1.3] mb-12 font-semibold font-bomstad" style={{ fontSize: '25px', color: 'rgb(21, 107, 54)' }}>
                A slow-cooked, preservative-free<br />
                onion-tomato base made with love – dinner<br />
                is ready in 5 minutes.
              </p>

              {/* Learn More Button */}
              <button
                style={{ backgroundColor: 'rgb(21, 107, 54)' }}
                className="group flex items-center gap-6 px-10 py-4 rounded-[20px] text-white text-[22px] font-semibold font-bomstad hover:bg-black transition-all shadow-lg"
              >
                Learn More
                <Image src="/images/arrow.svg" alt="Arrow" width={32} height={32} className="object-contain" />
              </button>
            </div>

            {/* Right Content - Product Image */}
            <div className="w-full lg:w-[45%] flex justify-center lg:justify-end relative h-[500px]">
              <div className="relative w-full h-full max-w-[550px]">
                <Image
                  src="/images/product 1.svg"
                  alt="Product Showcase"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

          </div>
        </section>

        {/* Pouch To Plate Section */}
        <section className="w-full py-24 flex flex-col items-center" style={{ backgroundColor: 'rgb(239, 238, 230)' }}>
          <div className="w-full max-w-[1440px] mx-auto px-8">

            {/* Header Row */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-20 pt-12 relative">

              {/* Titles */}
              <div className="flex flex-col items-start text-left">
                <h2 className="font-kura leading-[0.9] text-[65px] m-0 p-0" style={{ color: 'rgb(247, 0, 52)' }}>
                  Pouch To Plate
                </h2>
                <h2 className="font-kura leading-[0.9] text-[65px] mb-8" style={{ color: 'rgb(21, 107, 54)' }}>
                  In 4 Steps
                </h2>
                <p className="font-bomstad font-bold text-[30px] leading-[1.2]" style={{ color: 'rgb(21, 107, 54)' }}>
                  No Chopping. No Prep.<br />
                  No Recipe Needed
                </p>
              </div>

              {/* Chef and Stats Pill Container */}
              <div className="flex flex-col items-center relative pt-10">
                {/* Chef Illustration - Decreased size and moved higher */}
                {/* Chef Illustration - Moved higher */}
                {/* Chef Illustration - Moved down slightly to not crowd the red text */}
                <div className="w-[220px] h-[220px] mb-0 z-10 transition-all">
                  <Image
                    src="/images/cook.svg"
                    alt="Chef Illustration"
                    width={220}
                    height={220}
                    className="object-contain w-auto h-auto"
                  />
                </div>

                {/* Stats Pill - Exact Figma dimensions 528x54 and sitting right below chef */}
                <div
                  style={{ backgroundColor: 'rgb(247, 216, 13)', width: '528px', height: '54px' }}
                  className="rounded-[10px] flex items-center justify-between px-6 shadow-sm z-0 mt-0"
                >
                  <div className="flex items-center gap-2">
                    <Image src="/images/clock.svg" alt="Clock" width={24} height={24} />
                    <div className="flex flex-col">
                      <span className="font-bold text-[18px] leading-tight" style={{ color: 'rgb(16, 107, 54)' }}>10 Min</span>
                      <span className="text-[10px] font-bold" style={{ color: 'rgb(16, 107, 54)' }}>cooking time</span>
                    </div>
                  </div>
                  <div className="w-[1px] h-8 bg-neutral-400/30" />
                  <div className="flex flex-col">
                    <span className="font-bold text-[18px] leading-tight" style={{ color: 'rgb(16, 107, 54)' }}>Zero %</span>
                    <span className="text-[10px] font-bold" style={{ color: 'rgb(16, 107, 54)' }}>Preservatives</span>
                  </div>
                  <div className="w-[1px] h-8 bg-neutral-400/30" />
                  <div className="flex flex-col">
                    <span className="font-bold text-[18px] leading-tight" style={{ color: 'rgb(16, 107, 54)' }}>20+</span>
                    <span className="text-[10px] font-bold" style={{ color: 'rgb(16, 107, 54)' }}>Dishes possible</span>
                  </div>
                  <div className="w-[1px] h-8 bg-neutral-400/30" />
                  <div className="flex flex-col">
                    <span className="font-bold text-[18px] leading-tight" style={{ color: 'rgb(16, 107, 54)' }}>750 G</span>
                    <span className="text-[10px] font-bold" style={{ color: 'rgb(16, 107, 54)' }}>Per pouch</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
              {[
                { step: 1, text: "Add your tempering\n(tadka) in oil." },
                { step: 2, text: "Sauté veggies or\nprotein of your\nchoice." },
                { step: 3, text: "Pour GrabV & adjust\nconsistency" },
                { step: 4, text: "Sprinkle spices\n& salt to taste." },
                { step: 5, text: "Cook for 10 mins\nand enjoy!" },
                { step: 6, text: "Home cooked\ntaste, ready in 10\nmins." }
              ].map((item) => (
                <div key={item.step} className="flex flex-col items-center">
                  <div className="relative group">
                    {/* Yellow Inverted Step Label - Overlapping card top edge as per Figma */}
                    <div
                      className="absolute -top-[36px] left-1/2 -translate-x-1/2 w-[178px] h-[72px] rounded-b-full flex items-center justify-center z-20 pb-2 shadow-md"
                      style={{ backgroundColor: 'rgb(247, 216, 13)' }}
                    >
                      <span className="font-kura text-[28px] text-[#f70034]">Step {item.step}</span>
                    </div>

                    {/* Step Card */}
                    <div className="bg-white rounded-[20px] p-6 shadow-sm border border-neutral-100 flex flex-col items-center text-center w-[380px] h-[480px]">
                      <div className="relative w-[340px] h-[300px] mb-8 rounded-[15px] overflow-hidden">
                        <Image
                          src={`/images/step ${item.step}.svg`}
                          alt={`Step ${item.step}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <p className="text-[24px] font-bold leading-[1.3] whitespace-pre-line" style={{ color: 'rgb(21, 107, 54)' }}>
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
          <div className="absolute inset-x-0 -top-24 bottom-0 z-0">
            <Image
              src="/images/bg yellow.svg"
              alt="Yellow Background"
              fill
              className="object-cover object-top"
              priority
            />
          </div>

          {/* Content Wrapper */}
          <div className="relative w-full max-w-[1440px] mx-auto px-8 z-10 flex flex-col items-start pb-8">

            {/* Top Row: Headings and Showcase Image */}
            <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-12 mb-8 -mt-6">
              <div className="flex flex-col items-start w-full lg:w-[60%]">
                {/* Ingredients Pill */}
                <div
                  className="px-6 py-2 rounded-full mb-6 shadow-md"
                  style={{ backgroundColor: 'rgb(247, 0, 52)' }}
                >
                  <span className="text-white font-bold text-[20px] font-bomstad tracking-wider">
                    Ingredients & Purity
                  </span>
                </div>

                {/* Main Heading */}
                <div className="mb-6">
                  <h2 className="font-kura leading-[0.9] text-[65px] m-0 p-0" style={{ color: 'rgb(247, 0, 52)' }}>
                    Fresh Food
                  </h2>
                  <h2 className="font-kura leading-[0.9] text-[65px] m-0 p-0" style={{ color: 'rgb(21, 107, 54)' }}>
                    Nothing Hidden
                  </h2>
                </div>

                {/* Subtitle */}
                <p className="max-w-2xl font-bold leading-[1.3] text-[22px]" style={{ color: 'rgb(21, 107, 54)' }}>
                  Every ingredient printed. Every batch tested.<br />
                  You deserve to know what you're feeding your family.
                </p>
              </div>

              {/* Showcase Image - cook2.svg - Responsive intrinsic aspect ratio to prevent cropping */}
              <div className="w-full lg:w-[420px] aspect-[462/367] relative mt-4 shrink-0">
                <Image
                  src="/images/cook2.svg"
                  alt="Cooking Showcase"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Ingredients Grid - Tightened spacing */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-4 mt-2">
              {[
                { img: 'onion.svg', title: 'Fresh Onions', desc: 'Slow-fried to golden' },
                { img: 'cumin.svg', title: 'Whole Cumin & Coriander', desc: 'Bloom-roasted for full aroma' },
                { img: 'tomatoes.svg', title: 'Ripe Tomatoes', desc: 'Naturally cooked down' },
                { img: 'bayleaf.svg', title: 'Bay Leaf & Green Cardamom', desc: 'Traditional tempering' },
                { img: 'garlic.svg', title: 'Fresh Ginger & Garlic', desc: 'Paste made daily, not dried powder' },
                { img: 'oil.svg', title: 'Cold-Pressed Sunflower Oil', desc: 'Unrefined, no trans fats' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  {/* Ingredient Icon Frame - Shrined to 100x100 */}
                  <div className="w-[100px] h-[100px] flex-shrink-0 flex items-center justify-center p-2">
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
                  <div className="flex flex-col">
                    <h4 className="font-kura text-[24px] leading-tight" style={{ color: 'rgb(21, 107, 54)' }}>
                      {item.title}
                    </h4>
                    <p className="font-bold text-[18px] leading-tight" style={{ color: 'rgb(21, 107, 54)' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Red Accent Bar & Long Line from Figma - Made more visible */}
            <div className="w-full flex items-center justify-center mt-16 relative h-[19px]">
              {/* Long thin line - passing through center */}
              <div
                className="absolute w-full h-[2px] top-1/2 -translate-y-1/2 left-0 right-0 z-0"
                style={{ backgroundColor: 'rgb(247, 0, 52)' }}
              />
              {/* Red Pill */}
              <div
                className="rounded-full shadow-sm z-10 relative"
                style={{ backgroundColor: 'rgb(247, 0, 52)', width: '646px', height: '19px' }}
              />
            </div>

          </div>
        </section>

        {/* Our Quality Promise Section */}
        <section className="w-full relative pt-4 pb-20 flex flex-col items-center" style={{ backgroundColor: 'rgb(239, 238, 230)' }}>
          {/* Ensure this section slips cleanly under or matches the edge of the previous section if needed.
              We'll use negative margin to pull it up slightly if the torn edge requires it, but for now
              we just stack it normally. */}
          <div className="w-full max-w-[1440px] mx-auto px-8 flex flex-col items-center relative z-10 pt-0 pb-16">

            {/* Title */}
            <h2 className="font-kura font-normal text-[85px] m-0 p-0 leading-[1.1] text-center tracking-wide normal-case">
              <span style={{ color: 'rgb(247, 0, 52)' }}>Our Quality </span>
              <span style={{ color: 'rgb(21, 107, 54)' }}>Promise</span>
            </h2>

            {/* Subtitle */}
            <p className="font-bold text-[26px] mt-4 mb-20" style={{ color: 'rgb(21, 107, 54)' }}>
              Every batch verified. Every ingredient traceable.
            </p>

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
                  <span className="font-bold text-[24px]" style={{ color: 'rgb(21, 107, 54)' }}>
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
                src="/images/bg%20green.svg"
                alt="Background"
                fill
                className="object-cover object-bottom scale-x-[-1]"
                priority
              />
              {/* Fallback pattern / color blending top edge to beige */}
              <div className="absolute inset-0 -z-10" style={{ backgroundColor: 'rgb(239, 238, 230)' }} />
            </div>

            {/* Content Wrapper */}
            <div className="relative z-10 flex flex-col items-center">
              {/* Make 20+ dishes Pill */}
              <div
                className="px-8 py-2 rounded-full mb-10 overflow-hidden shadow-sm"
                style={{ backgroundColor: 'rgb(97, 143, 40)' }}
              >
                <span className="font-bold text-[22px] tracking-tight" style={{ color: 'rgb(247, 216, 13)' }}>
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
                { title: "Paneer Butter Masala", desc: "Creamy, rich, restaurant-style.\nJust add paneer to GrabV,\nsimmer 5 minutes, finish with butter." },
                { title: "Paneer Butter Masala", desc: "Creamy, rich, restaurant-style.\nJust add paneer to GrabV,\nsimmer 5 minutes, finish with butter." },
                { title: "Paneer Butter Masala", desc: "Creamy, rich, restaurant-style.\nJust add paneer to GrabV,\nsimmer 5 minutes, finish with butter." }
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
                      <div className="bg-[#156b36] text-white px-5 py-2 rounded-full text-[20px] font-bold shadow-md">
                        Veg
                      </div>
                      <div className="bg-[#156b36] text-white px-5 py-2 rounded-full text-[20px] font-bold shadow-md flex items-center gap-2">
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
                    <h3 className="font-kura text-[30px] leading-tight mb-4 whitespace-nowrap" style={{ color: 'rgb(247, 0, 52)' }}>
                      {item.title}
                    </h3>
                    <p className="font-bomstad text-[25px] leading-[1.4] font-normal whitespace-pre-line" style={{ color: 'rgb(21, 107, 54)' }}>
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
                { title: "Paneer Butter Masala", desc: "Creamy, rich, restaurant-style.\nJust add paneer to GrabV,\nsimmer 5 minutes, finish with butter." },
                { title: "Paneer Butter Masala", desc: "Creamy, rich, restaurant-style.\nJust add paneer to GrabV,\nsimmer 5 minutes, finish with butter." },
                { title: "Paneer Butter Masala", desc: "Creamy, rich, restaurant-style.\nJust add paneer to GrabV,\nsimmer 5 minutes, finish with butter." }
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
                      <div className="text-white px-5 py-2 rounded-full text-[20px] font-bold shadow-md" style={{ backgroundColor: 'rgb(125, 23, 16)' }}>
                        Non-veg
                      </div>
                      <div className="text-white px-5 py-2 rounded-full text-[20px] font-bold shadow-md flex items-center gap-2" style={{ backgroundColor: 'rgb(125, 23, 16)' }}>
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
                    <h3 className="font-kura text-[30px] leading-tight mb-4 whitespace-nowrap" style={{ color: 'rgb(247, 0, 52)' }}>
                      {item.title}
                    </h3>
                    <p className="font-bomstad text-[25px] leading-[1.4] font-normal whitespace-pre-line" style={{ color: 'rgb(21, 107, 54)' }}>
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
                <h2 className="font-kura text-[55px] leading-tight mb-2">
                  <span style={{ color: 'rgb(247, 216, 13)' }}>20+ Recipes. </span>
                  <span className="text-white">One pouch.</span>
                </h2>
                <p className="text-white text-[22px] font-medium opacity-90">
                  Every dish starts with GrabV. What will you make tonight?
                </p>
              </div>

              <button
                className="bg-[#f70034] text-white px-10 py-5 rounded-full text-[24px] font-bold shadow-lg hover:bg-black transition-all whitespace-nowrap z-10"
              >
                Order Your Pouch
              </button>
            </div>
          </div>
        </section>

        {/* Manufacturing Process Section */}
        <section className="w-full pt-8 pb-32 flex flex-col items-center" style={{ backgroundColor: 'rgb(239, 238, 230)' }}>
          <div className="w-full max-w-[1440px] mx-auto px-8 flex flex-col items-start">

            {/* Header Content - Centered manually */}
            <div className="w-full flex flex-col items-center text-center mb-8">

              {/* Badge */}
              <div
                className="px-8 py-2 rounded-full mb-10"
                style={{ backgroundColor: 'rgba(247, 0, 52, 0.15)' }}
              >
                <span className="font-bold text-[22px] tracking-tight" style={{ color: 'rgb(247, 0, 52)' }}>
                  Manufacturing Process
                </span>
              </div>

              {/* Heading */}
              <h2 className="font-kura text-[85px] leading-[0.9] mb-12">
                <span style={{ color: 'rgb(247, 0, 52)' }}>How we make </span>
                <span style={{ color: 'rgb(21, 107, 54)' }}>every pouch</span>
              </h2>

              {/* Subtext */}
              <div className="max-w-4xl text-[26px] font-bold leading-[1.3] mb-12 px-6 opacity-90" style={{ color: 'rgb(21, 107, 54)' }}>
                No factory line. No bulk shortcuts. Every batch is made by hand<br />
                the way a good cook would – because that's the only way it<br />
                tastes right.
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
                    <span className="font-kura text-[65px] relative z-10" style={{ color: 'rgb(247, 0, 52)' }}>
                      {item.step}
                    </span>
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col items-start text-left max-w-3xl">
                    <h4 className="font-bomstad text-[30px] font-medium leading-tight mb-2" style={{ color: 'rgb(21, 107, 54)' }}>
                      {item.title}
                    </h4>
                    <p className="font-bomstad text-[30px] font-normal leading-[1.3] opacity-90" style={{ color: 'rgb(21, 107, 54)' }}>
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
                src="/images/bg%20green.svg"
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
              <div
                className="px-8 py-2 rounded-full mb-10 border-2 border-[rgb(12,61,27)]"
                style={{ backgroundColor: 'rgb(247, 216, 13)' }}
              >
                <span className="font-bold text-[22px] tracking-tight" style={{ color: 'rgb(12, 61, 27)' }}>
                  What people are saying
                </span>
              </div>

              {/* Heading */}
              <h2 className="font-kura text-[85px] leading-[0.9] mb-20 text-center">
                <span className="text-white">Our GrabV </span>
                <span style={{ color: 'rgb(247, 216, 13)' }}>Your Review</span>
              </h2>
            </div>
          </div>

          {/* Review Cards Grid */}
          <div className="w-full max-w-[1440px] mx-auto px-8 py-20 grid grid-cols-1 md:grid-cols-3 gap-8 pb-32">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="p-8 rounded-[20px] bg-white border border-[rgb(247, 216, 13)] shadow-sm flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden relative border border-neutral-100">
                    <Image src="/images/review.svg" alt="User" fill className="object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[20px] font-bold" style={{ color: 'rgb(21, 107, 54)' }}>Shneha Mehta</span>
                    <span className="text-[16px] text-neutral-400">Delhi</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="text-[24px]" style={{ color: 'rgb(247, 216, 13)' }}>★</span>
                  ))}
                </div>
                <p className="text-[18px] leading-relaxed font-medium" style={{ color: 'rgb(21, 107, 54)' }}>
                  "I was sceptical — how can a ready base taste this good? The onions are actually caramelised properly. My husband thought I'd been cooking all afternoon."
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA Box */}
        <div
          className="w-full max-w-[1440px] mx-auto h-[635px] rounded-[15px] p-24 flex flex-col items-center justify-center text-center relative overflow-hidden mb-20"
          style={{ backgroundColor: 'rgb(12, 61, 27)' }}
        >
          {/* Badge */}
          <div
            className="px-8 py-2 rounded-full mb-6"
            style={{ backgroundColor: 'rgb(92, 113, 20)' }}
          >
            <span className="font-bold text-[22px] tracking-wide" style={{ color: 'rgb(247, 216, 13)' }}>
              Get GrabV
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-kura text-[85px] leading-[0.9] mb-6">
            <span style={{ color: 'rgb(247, 216, 13)' }}>Ready to cook </span><br />
            <span className="text-white">smarter, Everyday?</span>
          </h2>

          {/* Subtext */}
          <p className="text-white text-[22px] font-medium opacity-90 mb-12 max-w-3xl leading-relaxed">
            Order 750g Or 250g pouch. A week of effortless dinners. Zero preservatives. Shipped cold, direct to your door.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
            <button className="bg-[#f70034] text-white w-[260px] py-5 rounded-full text-[24px] font-bold shadow-xl hover:scale-105 transition-all">
              Order 750g
            </button>
            <button className="bg-white text-[#f70034] w-[260px] py-5 rounded-full text-[24px] font-bold shadow-xl hover:scale-105 transition-all">
              Order 250g
            </button>
            <button className="bg-white text-[#156b36] w-[260px] py-5 rounded-full text-[24px] font-bold shadow-xl flex items-center justify-center gap-4 hover:scale-105 transition-all">
              <div className="w-8 h-8 relative">
                <Image src="/images/whatsapp.svg" alt="WhatsApp" fill className="object-contain" />
              </div>
              <span className="text-[24px]">WhatsApp Us</span>
            </button>
          </div>

          {/* Footer text */}
          <div className="text-white text-[25px] font-medium tracking-wide flex items-center gap-4 opacity-80">
            <span>Free delivery on orders above ₹499</span>
            <span className="mx-2">•</span>
            <span>Ships within 48 hours</span>
            <span className="mx-2">•</span>
            <div className="h-14 w-36 relative invert brightness-0 -mx-6">
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
          <div className="rounded-[30px] p-10 flex flex-col h-full" style={{ backgroundColor: 'rgb(55, 122, 49)' }}>
            <div className="w-[124px] h-[64px] relative mb-6">
              <Image src="/images/logo.svg" alt="GrabV Logo" fill className="object-contain" />
            </div>
            <div className="flex flex-col gap-4 text-[18px] font-medium leading-relaxed font-bomstad" style={{ color: 'rgb(247, 216, 13)' }}>
              <p>© 2026 GrabV. All rights reserved.</p>
              <p>88gb Digital Marketing & Technology Company</p>
            </div>
          </div>

          {/* Column 2: Company Box */}
          <div className="rounded-[30px] p-10 flex flex-col h-full" style={{ backgroundColor: 'rgb(55, 122, 49)' }}>
            <h4 className="text-[28px] font-bold mb-8" style={{ color: 'rgb(247, 216, 13)' }}>Company</h4>
            <div className="flex flex-col gap-4 text-[20px] font-medium font-bomstad" style={{ color: 'rgb(247, 216, 13)' }}>
              <Link href="#" className="hover:opacity-80 transition-opacity">Our Story</Link>
              <Link href="#" className="hover:opacity-80 transition-opacity">Process</Link>
              <Link href="#" className="hover:text-[rgb(247,216,13)] transition-colors">Quality Promise</Link>
              <Link href="#" className="hover:opacity-80 transition-opacity">Contact Us</Link>
            </div>
          </div>

          {/* Column 3: Product Box */}
          <div className="rounded-[30px] p-10 flex flex-col h-full" style={{ backgroundColor: 'rgb(55, 122, 49)' }}>
            <h4 className="text-[28px] font-bold mb-8" style={{ color: 'rgb(247, 216, 13)' }}>Product</h4>
            <div className="flex flex-col gap-4 text-[20px] font-medium font-bomstad" style={{ color: 'rgb(247, 216, 13)' }}>
              <Link href="#" className="hover:opacity-80 transition-opacity">All Purpose Gravy</Link>
              <Link href="#" className="hover:opacity-80 transition-opacity">Ingredients</Link>
              <Link href="#" className="hover:opacity-80 transition-opacity">How to Use</Link>
              <Link href="#" className="hover:opacity-80 transition-opacity">Recipes</Link>
            </div>
          </div>

          {/* Column 4: Orders & Policies Box */}
          <div className="rounded-[30px] p-10 flex flex-col h-full justify-between" style={{ backgroundColor: 'rgb(55, 122, 49)' }}>
            <div>
              <h4 className="text-[28px] font-bold mb-8" style={{ color: 'rgb(247, 216, 13)' }}>Order & Policies</h4>
              <div className="flex flex-col gap-4 text-[20px] font-medium font-bomstad" style={{ color: 'rgb(247, 216, 13)' }}>
                <Link href="#" className="hover:opacity-80 transition-opacity">WhatsApp Order</Link>
                <Link href="#" className="hover:opacity-80 transition-opacity">Exchange Order</Link>
                <Link href="#" className="hover:opacity-80 transition-opacity">Privacy Policy</Link>
              </div>
            </div>

            {/* Social Links at Bottom Right of this box */}
            <div className="flex flex-col items-end gap-3 self-end mt-8">
              <span className="text-[16px] font-bold font-bomstad" style={{ color: 'rgb(247, 216, 13)' }}>Follow Us</span>
              <div className="flex items-center gap-4">
                <Link href="#" className="w-8 h-8 relative hover:scale-110 transition-transform invert brightness-0">
                  <Image src="/images/facebook.svg" alt="Facebook" fill className="object-contain" />
                </Link>
                <Link href="#" className="w-8 h-8 relative hover:scale-110 transition-transform invert brightness-0">
                  <Image src="/images/whatsapp1.svg" alt="WhatsApp" fill className="object-contain" />
                </Link>
                <Link href="#" className="w-8 h-8 relative hover:scale-110 transition-transform invert brightness-0">
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

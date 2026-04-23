import Image from "next/image";
import Link from "next/link";

export default function ProductsPage() {
    return (
        <div className="flex flex-col min-h-screen w-full font-bomstad overflow-x-hidden" style={{ backgroundColor: 'rgb(239, 238, 230)' }}>

            {/* Navbar (Same as Home but Products highlight) */}
            <header
                style={{ backgroundColor: 'rgb(12, 61, 27)' }}
                className="relative z-[100] w-full flex-shrink-0 shadow-md"
            >
                <div className="max-w-[1440px] mx-auto px-8 h-[80px] flex items-center justify-between">
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/images/logo.svg"
                            alt="GrabV Logo"
                            width={110}
                            height={40}
                            className="w-auto h-12"
                            priority
                        />
                    </Link>

                    <nav className="flex items-center gap-12 text-white font-medium">
                        <Link href="/" className="hover:text-[rgb(247,216,13)] transition-colors text-[18px]">Home</Link>
                        <Link href="#" className="hover:text-[rgb(247,216,13)] transition-colors text-[18px]">Recipes</Link>
                        <Link href="/products" className="text-[rgb(247,216,13)] transition-colors text-[18px]">Products</Link>
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

            {/* Main Content */}
            <main className="w-full relative flex flex-col items-center">

                {/* Content Wrapper for Product Info */}
                <div className="w-full max-w-[1440px] mx-auto px-8 pt-16 pb-20">


                    <div className="w-full flex flex-col lg:flex-row gap-16 lg:gap-24">

                        {/* Left: Image Gallery */}
                        <div className="w-full lg:w-[50%] flex flex-col">
                            <div className="relative w-[520px] h-[560px] rounded-[30px] overflow-hidden mb-6 bg-transparent flex items-center justify-center">
                                <Image
                                    src="/images/explore prod.svg"
                                    alt="Product Main"
                                    fill
                                    className="object-cover scale-[1.05]"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Right: Product Details */}
                        <div className="w-full lg:w-[50%] flex flex-col items-start pt-4">

                            {/* Fresh & Flavorful Pill */}
                            <div className="relative w-[220px] h-[60px] mb-8">
                                <div className="absolute left-[0.46px] top-[4.46px] w-[217px] h-[50px] rounded-[100px] bg-[rgb(247,216,13)]" />
                                <Image
                                    src="/images/green border.svg"
                                    alt=""
                                    fill
                                    className="pointer-events-none object-contain"
                                />
                                <div className="absolute inset-0 flex items-center justify-center gap-2 px-4">
                                    <div className="relative w-[18px] h-[18px] shrink-0" style={{ filter: 'brightness(0) invert(30%) sepia(35%) saturate(1048%) hue-rotate(97deg) brightness(93%) contrast(92%)' }}>
                                        <Image
                                            src="/images/leaf.svg"
                                            alt="Leaf"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <span className="font-bomstad font-medium tracking-tight text-[18px]" style={{ color: 'rgb(21, 107, 54)' }}>
                                        Fresh & Flavorful
                                    </span>
                                </div>
                            </div>

                            {/* Title */}
                            <div className="mb-6 uppercase">
                                <h1 className="font-kura leading-[0.95] text-[65px] m-0 p-0 uppercase" style={{ color: 'rgb(21, 107, 54)' }}>
                                    ONE GRAVY
                                </h1>
                                <h1 className="font-kura leading-[0.95] text-[65px] m-0 p-0 whitespace-nowrap uppercase" style={{ color: 'rgb(247, 0, 52)' }}>
                                    ENDLESS POSSIBILITIES
                                </h1>
                            </div>

                            {/* Features Bar */}
                            <div className="mb-12 flex items-center gap-3 text-[18px] font-normal font-bomstad whitespace-nowrap" style={{ color: 'rgb(21, 107, 54)' }}>
                                <span>Onion & Tomato</span>
                                <span>•</span>
                                <span>Slow Cooked</span>
                                <span>•</span>
                                <span>Zero Preservatives</span>
                            </div>

                            {/* Pack Size Section */}
                            <div className="w-full mb-6 flex flex-col gap-4">
                                <span className="uppercase tracking-widest font-medium font-bomstad" style={{ color: 'rgb(21, 107, 54)', fontSize: '20px' }}>PACK SIZE</span>
                                <div className="flex flex-row flex-nowrap gap-4 items-center mb-2">
                                    <button className="px-8 py-3 rounded-[12px] font-normal transition-all shadow-sm flex items-center justify-center min-w-[120px] bg-[rgb(206,219,205)] font-bomstad whitespace-nowrap" style={{ color: 'rgb(21, 107, 54)', fontSize: '18px' }}>
                                        750g
                                    </button>
                                    <button className="px-8 py-3 rounded-[12px] font-normal border transition-all shadow-sm flex items-center justify-center min-w-[160px] bg-[rgb(206,219,205)] font-bomstad whitespace-nowrap" style={{ borderColor: 'rgb(207, 219, 204)', color: 'rgb(21, 107, 54)', fontSize: '18px' }}>
                                        1.5 kg (2-pack)
                                    </button>
                                    <button className="px-8 py-3 rounded-[12px] font-normal border transition-all shadow-sm flex items-center justify-center min-w-[160px] bg-[rgb(206,219,205)] font-bomstad whitespace-nowrap" style={{ borderColor: 'rgb(207, 219, 204)', color: 'rgb(21, 107, 54)', fontSize: '18px' }}>
                                        3 kg (4-pack)
                                    </button>
                                    <button className="px-8 py-3 rounded-[12px] font-normal border transition-all shadow-sm flex items-center justify-center min-w-[200px] bg-[rgb(206,219,205)] font-bomstad whitespace-nowrap" style={{ borderColor: 'rgb(207, 219, 204)', color: 'rgb(21, 107, 54)', fontSize: '18px' }}>
                                        Bulk Order
                                    </button>
                                </div>
                                <div className="w-full h-[1px] bg-[rgb(21,107,54)] opacity-20 mb-2" />
                            </div>

                            {/* Guarantee Banner */}
                            <div className="w-full p-4 rounded-[15px] flex items-center gap-4 shadow-sm mb-16" style={{ backgroundColor: 'rgb(207, 219, 204)' }}>
                                <div className="shrink-0 w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-[rgb(21,107,54)]/20 shadow-sm relative overflow-hidden">
                                    <Image src="/images/badge.svg" alt="Badge" fill className="p-1 object-contain" />
                                </div>
                                <p className="leading-snug font-bomstad" style={{ color: 'rgb(12, 61, 27)', fontSize: '16px', letterSpacing: '0.05em' }}>
                                    <span className="font-medium" style={{ color: 'rgb(21, 106, 55)' }}>100% freshness guaranteed.</span>
                                    <span className="font-normal opacity-90"> If you're not happy with your order, we'll replace it or refund - no questions asked.</span>
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* Collapsible Sections */}
                    <div className="w-full flex flex-col pt-4 mb-10">
                        {[
                            { title: "Product Details" },
                            { title: "How to Use" },
                            { title: "Ingredients" },
                            { title: "Delivery & Storage" }
                        ].map((section, idx) => (
                            <div key={idx} className="w-full border-t py-6 flex items-center justify-between cursor-pointer group" style={{ borderColor: 'rgb(207, 219, 204)' }}>
                                <span className="font-normal font-bomstad" style={{ color: 'rgb(21, 107, 54)', fontSize: '25px' }}>{section.title}</span>
                                <div className="w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="rgb(21, 107, 54)" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7 10L12 15L17 10H7Z" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                        <div className="w-full border-t" style={{ borderColor: 'rgb(207, 219, 204)' }} />
                    </div>

                    {/* Explore More Products Section */}
                    <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] px-8 pt-10 pb-4 mb-4" style={{ backgroundColor: 'rgb(239, 239, 231)' }}>
                        <div className="max-w-[1440px] mx-auto flex flex-col items-start">
                            <h2 className="font-kura leading-none mb-12 uppercase text-[65px] whitespace-nowrap">
                                <span style={{ color: 'rgb(21, 107, 54)' }}>Explore </span>
                                <span style={{ color: 'rgb(247, 0, 52)' }}>More Products</span>
                            </h2>

                            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10">
                                {[
                                    { status: 'active', title: 'All Purpose Gravy (Onion & Tomato)' },
                                    { status: 'coming_soon', title: 'All Purpose Gravy (Onion & Tomato)' },
                                    { status: 'coming_soon', title: 'All Purpose Gravy (Onion & Tomato)' }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex flex-col items-center group">
                                        <div className="relative w-full aspect-[4/5] rounded-[20px] overflow-hidden mb-3 bg-transparent flex items-center justify-center">
                                            <Image
                                                src="/images/explore prod.svg"
                                                alt="Product"
                                                fill
                                                className={`object-contain transition-transform duration-500 group-hover:scale-105 ${item.status === 'coming_soon' ? 'grayscale opacity-60' : ''}`}
                                            />
                                            {/* Coming Soon Badge */}
                                            {item.status === 'coming_soon' && (
                                                <div className="absolute inset-0 flex items-center justify-center p-4">
                                                    <div className="bg-[rgb(247,0,52)] text-white px-8 py-3 rounded-[15px] text-[24px] font-bomstad font-bold shadow-lg">
                                                        Coming Soon
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Product Pill */}
                                        <div className="w-[85%] mx-auto px-4 py-2 rounded-[10px] mb-4" style={{ backgroundColor: 'rgb(228, 233, 223)' }}>
                                            <span className="text-[18px] font-normal font-bomstad leading-snug text-center block" style={{ color: 'rgb(21, 106, 55)' }}>
                                                {item.title}
                                            </span>
                                        </div>

                                        {/* View Product Button */}
                                        <Link
                                            href="/product1"
                                            className="w-[85%] mx-auto relative h-[72px] flex items-center justify-center hover:scale-[1.02] transition-all group/btn"
                                        >
                                            <div
                                                className="absolute inset-x-2 top-[10px] h-[55px] z-0 bg-[rgb(247,216,13)] rounded-[9px]"
                                                style={{ transform: 'rotate(-1.2deg)' }}
                                            />
                                            <div className="absolute inset-0 z-10 w-full h-full">
                                                <Image
                                                    src="/images/border7.svg"
                                                    alt="border"
                                                    fill
                                                    className="object-fill"
                                                />
                                            </div>
                                            <span className="relative z-20 text-[32px] font-kura font-normal text-[rgb(247,0,52)] uppercase">
                                                View Product
                                            </span>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Reviews Section from Landing Page */}
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
                            <h2 className="font-kura text-[85px] leading-[0.9] mb-4 text-center uppercase">
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
                    <h2 className="font-kura text-[70px] leading-tight mb-8 uppercase">
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

            {/* New Grid Footer Section from Landing Page */}
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
        </div>
    );
}

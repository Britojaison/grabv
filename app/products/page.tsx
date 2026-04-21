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
                        <Link href="#" className="hover:text-[rgb(247,216,13)] transition-colors text-[18px] whitespace-nowrap">Our Story</Link>
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
                <div className="w-full max-w-[1440px] mx-auto px-8 pt-6 pb-20">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-[16px] mb-10 font-normal tracking-wide font-bomstad" style={{ color: 'rgb(21, 107, 54)' }}>
                        <Link href="/" className="hover:opacity-75 transition-opacity">Home</Link>
                        <span>/</span>
                        <Link href="/products" className="hover:opacity-75 transition-opacity">Products</Link>
                        <span>/</span>
                        <span className="">All Purpose Gravy</span>
                    </div>

                    <div className="w-full flex flex-col lg:flex-row gap-16 lg:gap-24">

                        {/* Left: Image Gallery */}
                        <div className="w-full lg:w-[50%] flex flex-col">
                            <div className="relative w-full aspect-square rounded-[30px] overflow-hidden shadow-2xl mb-6 bg-white flex items-center justify-center">
                                <Image
                                    src="/images/product food 1.svg"
                                    alt="Product Main"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            {/* Thumbnails */}
                            <div className="grid grid-cols-5 gap-4">
                                {[
                                    "/images/product food 2.svg",
                                    "/images/product food 3.svg",
                                    "/images/product food 4.svg",
                                    "/images/product food 5.svg",
                                    "/images/product food 6.svg"
                                ].map((src, i) => (
                                    <div key={i} className="aspect-square rounded-[12px] bg-white overflow-hidden shadow-md cursor-pointer hover:ring-2 hover:ring-[rgb(21,107,54)] transition-all relative">
                                        <Image src={src} alt={`Thumb ${i}`} fill className="object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Product Details */}
                        <div className="w-full lg:w-[50%] flex flex-col items-start pt-4">

                            {/* Fresh & Flavorful Pill */}
                            <div
                                style={{ backgroundColor: 'rgb(247, 216, 13)' }}
                                className="px-6 py-2 rounded-full flex items-center justify-center gap-2 mb-8 shadow-sm"
                            >
                                <Image
                                    src="/images/leaf.svg"
                                    alt="Leaf"
                                    width={18}
                                    height={18}
                                    style={{ filter: 'brightness(0) invert(30%) sepia(35%) saturate(1048%) hue-rotate(97deg) brightness(93%) contrast(92%)' }}
                                />
                                <span className="font-bomstad font-medium tracking-wide" style={{ fontSize: '18px', color: 'rgb(21, 107, 54)' }}>
                                    Fresh & Flavorful
                                </span>
                            </div>

                            {/* Title */}
                            <div className="mb-6">
                                <h1 className="font-kura leading-[0.95] text-[65px] m-0 p-0" style={{ color: 'rgb(21, 107, 54)', textTransform: 'none' }}>
                                    One Gravy
                                </h1>
                                <h1 className="font-kura leading-[0.95] text-[65px] m-0 p-0" style={{ color: 'rgb(247, 0, 52)', textTransform: 'none' }}>
                                    Endless
                                </h1>
                                <h1 className="font-kura leading-[0.95] text-[65px] m-0 p-0" style={{ color: 'rgb(247, 0, 52)', textTransform: 'none' }}>
                                    Possibilities
                                </h1>
                            </div>

                            {/* Features Bar */}
                            <div className="mb-12 flex items-center gap-3 text-[22px] font-medium font-bomstad" style={{ color: 'rgb(21, 107, 54)' }}>
                                <span>Onion & Tomato</span>
                                <span>•</span>
                                <span>Slow Cooked</span>
                                <span>•</span>
                                <span>Zero Preservatives</span>
                            </div>

                            {/* Pack Size Section */}
                            <div className="w-full mb-10 flex flex-col gap-4">
                                <span className="uppercase tracking-widest font-medium font-bomstad" style={{ color: 'rgb(21, 107, 54)', fontSize: '25px' }}>PACK SIZE</span>
                                <div className="flex flex-wrap gap-4">
                                    <button className="px-8 py-3 rounded-[12px] font-normal transition-all shadow-sm flex items-center justify-center min-w-[120px] bg-[rgb(207,219,204)] font-bomstad" style={{ color: 'rgb(21, 107, 54)', fontSize: '25px' }}>
                                        750g
                                    </button>
                                    <button className="px-8 py-3 rounded-[12px] font-normal border transition-all shadow-sm flex items-center justify-center min-w-[160px] bg-white font-bomstad" style={{ borderColor: 'rgb(207, 219, 204)', color: 'rgb(21, 107, 54)', fontSize: '25px' }}>
                                        1.5 kg (2-pack)
                                    </button>
                                    <button className="px-8 py-3 rounded-[12px] font-normal border transition-all shadow-sm flex items-center justify-center min-w-[160px] bg-white font-bomstad" style={{ borderColor: 'rgb(207, 219, 204)', color: 'rgb(21, 107, 54)', fontSize: '25px' }}>
                                        3 kg (4-pack)
                                    </button>
                                </div>
                            </div>

                            {/* Bulk Order Button */}
                            <button className="px-10 py-4 rounded-[12px] font-normal border transition-all shadow-sm flex items-center justify-center w-fit bg-white mb-16 font-bomstad" style={{ borderColor: 'rgb(207, 219, 204)', color: 'rgb(21, 107, 54)', fontSize: '25px' }}>
                                For Bulk Order Quires
                            </button>

                            {/* Guarantee Banner */}
                            <div className="w-full p-4 rounded-[15px] flex items-center gap-4 shadow-sm mb-16" style={{ backgroundColor: 'rgb(207, 219, 204)' }}>
                                <div className="shrink-0 w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-[rgb(21,107,54)]/20 shadow-sm relative overflow-hidden">
                                    <Image src="/images/badge.svg" alt="Badge" fill className="p-1 object-contain" />
                                </div>
                                <p className="leading-snug font-normal font-bomstad" style={{ color: 'rgb(12, 61, 27)', fontSize: '16px', letterSpacing: '0.05em' }}>
                                    100% freshness guaranteed. If you're not happy with your order, we'll replace it or refund - no questions asked.
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* Collapsible Sections */}
                    <div className="w-full flex flex-col pt-16 mb-32">
                        {[
                            { title: "Product Details" },
                            { title: "How to Use" },
                            { title: "Ingredients" },
                            { title: "Delivery & Storage" }
                        ].map((section, idx) => (
                            <div key={idx} className="w-full border-t py-6 flex items-center justify-between cursor-pointer group" style={{ borderColor: 'rgb(207, 219, 204)' }}>
                                <span className="font-normal font-bomstad" style={{ color: 'rgb(21, 107, 54)', fontSize: '25px' }}>{section.title}</span>
                                <div className="w-8 h-8 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 9L12 15L18 9" stroke="rgb(21, 107, 54)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                        <div className="w-full border-t" style={{ borderColor: 'rgb(207, 219, 204)' }} />
                    </div>

                    {/* Explore More Products Section */}
                    <div className="w-full flex flex-col items-start mb-20 px-4">
                        <h2 className="font-kura leading-none mb-12">
                            <span className="block text-[65px]" style={{ color: 'rgb(21, 107, 54)' }}>Explore</span>
                            <span className="block text-[65px]" style={{ color: 'rgb(247, 0, 52)' }}>More Products</span>
                        </h2>

                        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10">
                            {[
                                { status: 'active', title: 'All Purpose Gravy (Onion & Tomato)' },
                                { status: 'coming_soon', title: 'All Purpose Gravy (Onion & Tomato)' },
                                { status: 'coming_soon', title: 'All Purpose Gravy (Onion & Tomato)' }
                            ].map((item, idx) => (
                                <div key={idx} className="flex flex-col items-center group">
                                    {/* Image Container - Wide Red accents on Top and Right */}
                                    <div className="relative w-full aspect-[4/5] rounded-[20px] overflow-hidden mb-12 border-t-4 border-r-[10px] border-[rgb(247,0,52)]">
                                        <Image
                                            src="/images/explore prod 1.svg"
                                            alt="Product"
                                            fill
                                            className={`object-cover transition-transform duration-500 group-hover:scale-105 ${item.status === 'coming_soon' ? 'grayscale opacity-60' : ''}`}
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
                                    <div className="px-6 py-2 rounded-[10px] mb-8" style={{ backgroundColor: 'rgb(228, 233, 223)' }}>
                                        <span className="text-[18px] font-bold font-bomstad leading-snug text-center block" style={{ color: 'rgb(99, 152, 117)' }}>
                                            {item.title}
                                        </span>
                                    </div>

                                    {/* View Product Button */}
                                    <button
                                        style={{ backgroundColor: 'rgb(247, 216, 13)' }}
                                        className="w-full py-2 rounded-[15px] text-[32px] font-kura font-normal text-[rgb(247,0,52)] shadow-sm hover:scale-[1.02] transition-all"
                                    >
                                        View Product
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Reviews Section with same background as Home */}
                < div className="w-full relative bg-[#efeee6] pt-10" >
                    <div className="w-full relative flex flex-col items-center">
                        {/* Green Header with Jagged Edge */}
                        <div className="w-full relative pt-20 pb-32 flex flex-col items-center text-center">
                            <div className="absolute inset-0 z-0 overflow-hidden">
                                <Image
                                    src="/images/bg%20green.svg"
                                    alt="Background"
                                    fill
                                    className="object-cover object-bottom"
                                    priority
                                />
                                {/* Fallback color */}
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
                </div >

                {/* Final CTA Box */}
                < div
                    className="w-full max-w-[1440px] mx-auto h-[635px] rounded-[15px] p-24 flex flex-col items-center justify-center text-center relative overflow-hidden mb-20"
                    style={{ backgroundColor: 'rgb(12, 61, 27)' }
                    }
                >
                    {/* Badge */}
                    < div
                        className="px-8 py-2 rounded-full mb-6"
                        style={{ backgroundColor: 'rgb(92, 113, 20)' }}
                    >
                        <span className="font-bold text-[22px] tracking-wide" style={{ color: 'rgb(247, 216, 13)' }}>
                            Get GrabV
                        </span>
                    </div >

                    {/* Heading */}
                    < h2 className="font-kura text-[85px] leading-[0.9] mb-6" >
                        <span style={{ color: 'rgb(247, 216, 13)' }}>Ready to cook </span><br />
                        <span className="text-white">smarter, Everyday?</span>
                    </h2 >

                    {/* Subtext */}
                    < p className="text-white text-[22px] font-medium opacity-90 mb-12 max-w-3xl leading-relaxed" >
                        Order 750g Or 250g pouch.A week of effortless dinners.Zero preservatives.Shipped cold, direct to your door.
                    </p >

                    {/* Buttons */}
                    < div className="flex flex-wrap items-center justify-center gap-6 mb-10" >
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
                    </div >

                    {/* Footer text */}
                    < div className="text-white text-[25px] font-medium tracking-wide flex items-center gap-4 opacity-80" >
                        <span>Free delivery on orders above ₹499</span>
                        <span className="mx-2">•</span>
                        <span>Ships within 48 hours</span>
                        <span className="mx-2">•</span>
                        <div className="h-14 w-36 relative invert brightness-0 -mx-6">
                            <Image src="/images/fssai%20text.svg" alt="FSSAI" fill className="object-contain" />
                        </div>
                        <span>Certified</span>
                    </div >
                </div >
            </main >

            {/* New Grid Footer Section */}
            < footer className="w-full py-16 px-8" style={{ backgroundColor: 'rgb(21, 107, 54)' }}>
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
            </footer >
        </div >
    );
}

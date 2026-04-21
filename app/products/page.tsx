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

            {/* Main Content */}
            <main className="w-full max-w-[1440px] mx-auto px-8 pt-6 pb-20 flex flex-col">

                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-[16px] mb-10 font-medium tracking-wide" style={{ color: 'rgb(21, 107, 54)' }}>
                    <Link href="/" className="hover:opacity-75 transition-opacity">Home</Link>
                    <span>/</span>
                    <Link href="/products" className="hover:opacity-75 transition-opacity">Products</Link>
                    <span>/</span>
                    <span className="font-bold">All Purpose Gravy</span>
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
                            <h1 className="font-kura leading-[0.95] text-[65px] m-0 p-0" style={{ color: 'rgb(12, 61, 27)', textTransform: 'none' }}>
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
                            <span className="text-[18px] uppercase tracking-widest font-bold" style={{ color: 'rgb(21, 107, 54)' }}>PACK SIZE</span>
                            <div className="flex flex-wrap gap-4">
                                <button className="px-8 py-3 rounded-[12px] text-[20px] font-medium transition-all shadow-sm flex items-center justify-center min-w-[120px] bg-[rgb(207,219,204)]" style={{ color: 'rgb(12, 61, 27)' }}>
                                    750g
                                </button>
                                <button className="px-8 py-3 rounded-[12px] text-[20px] font-medium border transition-all shadow-sm flex items-center justify-center min-w-[160px] bg-white" style={{ borderColor: 'rgb(207, 219, 204)', color: 'rgb(12, 61, 27)' }}>
                                    1.5 kg (2-pack)
                                </button>
                                <button className="px-8 py-3 rounded-[12px] text-[20px] font-medium border transition-all shadow-sm flex items-center justify-center min-w-[160px] bg-white" style={{ borderColor: 'rgb(207, 219, 204)', color: 'rgb(12, 61, 27)' }}>
                                    3 kg (4-pack)
                                </button>
                            </div>
                        </div>

                        {/* Bulk Order Button */}
                        <button className="px-10 py-4 rounded-[12px] text-[20px] font-medium border transition-all shadow-sm flex items-center justify-center w-fit bg-white mb-16" style={{ borderColor: 'rgb(207, 219, 204)', color: 'rgb(12, 61, 27)' }}>
                            For Bulk Order Quires
                        </button>

                        {/* Guarantee Banner */}
                        <div className="w-full p-4 rounded-[15px] flex items-center gap-4 shadow-sm mb-16" style={{ backgroundColor: 'rgb(207, 219, 204)' }}>
                            <div className="shrink-0 w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-[rgb(21,107,54)]/20 shadow-sm relative overflow-hidden">
                                <Image src="/images/badge.svg" alt="Badge" fill className="p-1 object-contain" />
                            </div>
                            <p className="text-[14px] leading-snug font-medium" style={{ color: 'rgb(12, 61, 27)' }}>
                                100% freshness guaranteed. If you're not happy with your order, we'll replace it or refund - no questions asked.
                            </p>
                        </div>

                    </div>
                </div>

                {/* Collapsible Sections (Full Width) */}
                <div className="w-full flex flex-col pt-16">
                    {[
                        { title: "Product Details" },
                        { title: "How to Use" },
                        { title: "Ingredients" },
                        { title: "Delivery & Storage" }
                    ].map((section, idx) => (
                        <div key={idx} className="w-full border-t py-6 flex items-center justify-between cursor-pointer group" style={{ borderColor: 'rgb(207, 219, 204)' }}>
                            <span className="text-[24px] font-bold" style={{ color: 'rgb(21, 107, 54)' }}>{section.title}</span>
                            <div className="w-8 h-8 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 9L12 15L18 9" stroke="rgb(21, 107, 54)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    ))}
                    <div className="w-full border-t" style={{ borderColor: 'rgb(207, 219, 204)' }} />
                </div>
            </main>

            {/* Footer (Simplified for brevity, or same as Home) */}
        </div>
    );
}

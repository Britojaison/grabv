import Image from "next/image";
import Link from "next/link";

export default function ProductsListPage() {
    return (
        <div className="flex flex-col min-h-screen w-full font-bomstad overflow-x-hidden" style={{ backgroundColor: 'rgb(239, 238, 230)' }}>

            {/* Navbar */}
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

                {/* Explore Products Section */}
                <div className="w-full max-w-[1440px] mx-auto px-8 pt-16 pb-20">
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
                                    {/* Image Container */}
                                    <div className={`relative w-full aspect-[4/5] rounded-[20px] overflow-hidden mb-12 border-t-4 border-r-[10px] border-[rgb(247,0,52)] ${item.status === 'active' ? 'cursor-pointer' : ''}`}>
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
                                        {/* Clickable overlay for active products */}
                                        {item.status === 'active' && (
                                            <Link href="/product1" className="absolute inset-0 z-10" aria-label="View product details" />
                                        )}
                                    </div>

                                    {/* Product Pill */}
                                    <div className="px-6 py-2 rounded-[10px] mb-8" style={{ backgroundColor: 'rgb(228, 233, 223)' }}>
                                        <span className="text-[18px] font-bold font-bomstad leading-snug text-center block" style={{ color: 'rgb(99, 152, 117)' }}>
                                            {item.title}
                                        </span>
                                    </div>

                                    {/* View Product Button */}
                                    <Link
                                        href="/product1"
                                        style={{ backgroundColor: 'rgb(247, 216, 13)' }}
                                        className="w-full py-2 rounded-[15px] text-[32px] font-kura font-normal text-[rgb(247,0,52)] shadow-sm hover:scale-[1.02] transition-all text-center block"
                                    >
                                        View Product
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full py-16 px-8" style={{ backgroundColor: 'rgb(21, 107, 54)' }}>
                <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* Column 1: Brand Box */}
                    <div className="rounded-[30px] p-10 flex flex-col h-full" style={{ backgroundColor: 'rgb(55, 122, 49)' }}>
                        <div className="w-[124px] h-[64px] relative mb-6">
                            <Image src="/images/logo.svg" alt="GrabV Logo" fill className="object-contain" />
                        </div>
                        <div className="flex flex-col gap-4 text-[18px] font-medium leading-relaxed font-bomstad" style={{ color: 'rgb(247, 216, 13)' }}>
                            <p>© 2026 GrabV. All rights reserved.</p>
                            <p>88gb Digital Marketing &amp; Technology Company</p>
                        </div>
                    </div>

                    {/* Column 2: Company Box */}
                    <div className="rounded-[30px] p-10 flex flex-col h-full" style={{ backgroundColor: 'rgb(55, 122, 49)' }}>
                        <h4 className="text-[28px] font-bold mb-8" style={{ color: 'rgb(247, 216, 13)' }}>Company</h4>
                        <div className="flex flex-col gap-4 text-[20px] font-medium font-bomstad" style={{ color: 'rgb(247, 216, 13)' }}>
                            <Link href="#" className="hover:opacity-80 transition-opacity">Our Story</Link>
                            <Link href="#" className="hover:opacity-80 transition-opacity">Process</Link>
                            <Link href="#" className="hover:opacity-80 transition-opacity">Quality Promise</Link>
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
                            <h4 className="text-[28px] font-bold mb-8" style={{ color: 'rgb(247, 216, 13)' }}>Order &amp; Policies</h4>
                            <div className="flex flex-col gap-4 text-[20px] font-medium font-bomstad" style={{ color: 'rgb(247, 216, 13)' }}>
                                <Link href="#" className="hover:opacity-80 transition-opacity">WhatsApp Order</Link>
                                <Link href="#" className="hover:opacity-80 transition-opacity">Exchange Order</Link>
                                <Link href="#" className="hover:opacity-80 transition-opacity">Privacy Policy</Link>
                            </div>
                        </div>

                        {/* Social Links */}
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
        </div>
    );
}

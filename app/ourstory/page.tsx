import Image from "next/image";
import Link from "next/link";

export default function OurStoryPage() {
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
                        <Link href="/products" className="hover:text-[rgb(247,216,13)] transition-colors text-[18px]">Products</Link>
                        <Link href="/ourstory" className="text-[rgb(247,216,13)] transition-colors text-[18px] whitespace-nowrap">Our Story</Link>
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

                {/* Hero Section - How it started */}
                <section className="w-full relative pt-24 pb-48 flex flex-col items-center overflow-visible">
                    {/* Background Layer - Inverted so straight side on top and torn edge on bottom */}
                    <div className="absolute inset-0 z-0 overflow-hidden">
                        <Image
                            src="/images/bg yellow.svg"
                            alt="Yellow Background"
                            fill
                            className="object-cover object-bottom"
                            priority
                        />
                    </div>

                    <div className="relative w-full max-w-[1440px] mx-auto px-8 z-10 flex flex-col lg:flex-row items-center gap-12">

                        {/* Left Content */}
                        <div className="w-full lg:w-[55%] flex flex-col items-start">
                            <h1 className="font-kura leading-[0.9] mb-10 uppercase">
                                <span className="block text-[100px]" style={{ color: 'rgb(21, 107, 54)' }}>A PROBLEM</span>
                                <span className="block text-[60px]" style={{ color: 'rgb(247, 0, 52)' }}>
                                    EVERY FAMILY KNOWS
                                </span>
                            </h1>

                            {/* Description Texts */}
                            <div className="flex flex-col gap-8 max-w-[800px]">
                                <p className="font-bomstad font-normal text-[18px] leading-[1.3]" style={{ color: 'rgb(21, 107, 54)' }}>
                                    Every evening, millions of Indian families face the same question<br />
                                    — what's for dinner, and who has 90 minutes to cook it? The<br />
                                    onion-tomato masala alone takes longer than most people<br />
                                    have after a full day of work.
                                </p>
                                <p className="font-bomstad font-normal text-[18px] leading-[1.3]" style={{ color: 'rgb(21, 107, 54)' }}>
                                    Our founder Priya was one of them. A working mother in<br />
                                    Bengaluru, she found herself choosing between quick but<br />
                                    unhealthy, or homemade but exhausting. There had to be a<br />
                                    better way.
                                </p>
                            </div>
                        </div>

                        {/* Right Content - Image */}
                        <div className="w-full lg:w-[45%] flex justify-center lg:justify-end">
                            <div className="relative w-full aspect-[581/424] max-w-[581px] rounded-[20px] overflow-hidden border-t-[10px] border-r-[10px] border-[rgb(247,0,52)] lg:-mt-16">
                                <Image
                                    src="/images/ourstory1.webp"
                                    alt="How it started"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>

                    </div>
                </section>

                {/* Made with love & slow heat sections */}
                <section className="w-full py-4 flex flex-col items-center gap-0">

                    {/* Top Sub-section: Image Left, Content Right */}
                    <div className="w-full max-w-[1440px] mx-auto px-8 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
                        {/* Left Content - Image */}
                        <div className="w-full lg:w-[50%] flex justify-center lg:justify-start">
                            <div className="relative w-full aspect-[581/593] max-w-[650px]">
                                <Image
                                    src="/images/ourstory2.svg"
                                    alt="Our Story 2"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        {/* Right Content - Text */}
                        <div className="w-full lg:w-[50%] flex flex-col items-start pt-2">
                            {/* Our Story Pill with Custom Border */}
                            <div className="relative mb-4 inline-block">
                                {/* Yellow Pill Background */}
                                <div
                                    style={{ backgroundColor: 'rgb(247, 216, 13)' }}
                                    className="px-8 py-2.5 rounded-full relative z-10"
                                >
                                    <span className="text-[rgb(21,107,54)] font-normal text-[25px] font-bomstad tracking-wider whitespace-nowrap uppercase">
                                        OUR STORY
                                    </span>
                                </div>

                                {/* Border SVG on Top */}
                                <div className="absolute -inset-2 z-20 pointer-events-none">
                                    <Image
                                        src="/images/border4.svg"
                                        alt="Pill Border"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>

                            {/* Heading */}
                            <h2 className="font-kura leading-[0.95] mb-6 uppercase">
                                <span className="block text-[60px]" style={{ color: 'rgb(21, 107, 54)' }}>MADE WITH</span>
                                <span className="block text-[60px]">
                                    <span style={{ color: 'rgb(21, 107, 54)' }}>LOVE & </span>
                                    <span style={{ color: 'rgb(247, 0, 52)' }}>SLOW HEAT</span>
                                </span>
                            </h2>

                            {/* Description text */}
                            <p className="font-bomstad font-normal text-[18px] leading-[1.3]" style={{ color: 'rgb(21, 107, 54)' }}>
                                Every evening, millions of Indian families face the same question – what’s for dinner, and who has 90 minutes to cook it? The onion-tomato masala alone takes longer than most people have after a full day of work.
                            </p>
                        </div>
                    </div>

                    {/* Bottom Sub-section: Content Left, Image Right */}
                    <div className="w-full max-w-[1440px] mx-auto px-8 flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-16 -mt-16 lg:-mt-24">
                        {/* Right Content - Image */}
                        <div className="w-full lg:w-[50%] flex justify-center lg:justify-end">
                            <div className="relative w-full aspect-[581/593] max-w-[700px]">
                                <Image
                                    src="/images/ourstory3.svg"
                                    alt="Our Story 3"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        {/* Left Content - Text */}
                        <div className="w-full lg:w-[50%] flex flex-col items-start pt-2">
                            {/* Our Story Pill with Custom Border */}
                            <div className="relative mb-4 inline-block">
                                {/* Yellow Pill Background */}
                                <div
                                    style={{ backgroundColor: 'rgb(247, 216, 13)' }}
                                    className="px-8 py-2.5 rounded-full relative z-10"
                                >
                                    <span className="text-[rgb(21,107,54)] font-normal text-[25px] font-bomstad tracking-wider whitespace-nowrap uppercase">
                                        OUR STORY
                                    </span>
                                </div>

                                {/* Border SVG on Top */}
                                <div className="absolute -inset-2 z-20 pointer-events-none">
                                    <Image
                                        src="/images/border4.svg"
                                        alt="Pill Border"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>

                            {/* Heading */}
                            <h2 className="font-kura leading-[0.95] mb-6 uppercase">
                                <span className="block text-[60px]" style={{ color: 'rgb(21, 107, 54)' }}>MADE WITH</span>
                                <span className="block text-[60px]">
                                    <span style={{ color: 'rgb(21, 107, 54)' }}>LOVE & </span>
                                    <span style={{ color: 'rgb(247, 0, 52)' }}>SLOW HEAT</span>
                                </span>
                            </h2>

                            {/* Description text */}
                            <p className="font-bomstad font-normal text-[18px] leading-[1.3]" style={{ color: 'rgb(21, 107, 54)' }}>
                                Every evening, millions of Indian families face the same question – what’s for dinner, and who has 90 minutes to cook it? The onion-tomato masala alone takes longer than most people have after a full day of work.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Green Features Section with Torn Edge */}
                <section className="w-full relative flex flex-col items-center overflow-visible">
                    {/* Background Layer */}
                    <div className="w-full relative pt-24 pb-16 flex flex-col items-center text-center overflow-hidden">
                        <div className="absolute inset-0 z-0 overflow-hidden">
                            <Image
                                src="/images/bg green2.svg"
                                alt="Background"
                                fill
                                className="object-cover object-top scale-x-[-1]"
                                priority
                            />
                            {/* Fallback pattern */}
                            <div className="absolute inset-0 -z-10" style={{ backgroundColor: 'rgb(239, 238, 230)' }} />
                        </div>

                        {/* Feature Pills Content */}
                        <div className="relative z-10 flex flex-col items-center gap-6 mt-4">
                            {/* Row 1 */}
                            <div className="flex flex-wrap justify-center items-center gap-6">
                                {[
                                    { icon: "/images/timer2.svg", text: "Ready in 10 min" },
                                    { icon: "/images/slow.svg", text: "Slow cooked" },
                                    { icon: "/images/fssai icon.svg", text: "FSSAI Certified" },
                                ].map((item, idx) => (
                                    <div key={idx} className="bg-white rounded-full px-8 py-3.5 flex items-center gap-4 shadow-md text-[rgb(21,106,55)]">
                                        <div className="w-8 h-8 relative flex items-center justify-center">
                                            <Image src={item.icon} alt={item.text} fill className="object-contain" />
                                        </div>
                                        <span className="font-bomstad font-normal text-[25px] whitespace-nowrap">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                            {/* Row 2 */}
                            <div className="flex flex-wrap justify-center items-center gap-6">
                                {[
                                    { icon: "/images/tick3.svg", text: "Zero Preservatives" },
                                    { icon: "/images/cold.svg", text: "Cold Chain Packed" },
                                ].map((item, idx) => (
                                    <div key={idx} className="bg-white rounded-full px-8 py-3.5 flex items-center gap-4 shadow-md text-[rgb(21,106,55)]">
                                        <div className="w-8 h-8 relative flex items-center justify-center">
                                            <Image src={item.icon} alt={item.text} fill className="object-contain" />
                                        </div>
                                        <span className="font-bomstad font-normal text-[25px] whitespace-nowrap">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Amit Shah Section */}
                <section className="w-full py-24 flex flex-col items-center">
                    <div className="w-full max-w-[1440px] mx-auto px-8 flex flex-col lg:flex-row items-start gap-16 lg:gap-24">

                        {/* Left Content - Image & Box */}
                        <div className="w-full lg:w-[45%] flex flex-col items-center">
                            {/* Portrait Image */}
                            <div className="relative w-full aspect-[430/480] max-w-[430px] rounded-[20px] overflow-hidden border-t-[10px] border-r-[10px] border-[rgb(247,0,52)]">
                                <Image
                                    src="/images/ourstory4.webp"
                                    alt="Amit Shah Portrait"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Name Box with Custom Border */}
                            <div className="relative inline-block lg:-mt-24 z-30">
                                {/* Straight Yellow Fill */}
                                <div
                                    style={{ backgroundColor: 'rgb(247, 216, 13)', width: '306px', height: '132px' }}
                                    className="rounded-[15px] relative z-10"
                                />

                                {/* Tilted Content Layer: Border and Text */}
                                <div
                                    className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center rotate-[1.5deg]"
                                >
                                    {/* Custom Border SVG */}
                                    <div className="absolute -inset-1 pointer-events-none">
                                        <Image
                                            src="/images/border5.svg"
                                            alt="Box Border"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>

                                    <span className="relative z-30 font-kura text-[32px] leading-tight mb-2 uppercase" style={{ color: 'rgb(247, 0, 52)' }}>
                                        AMIT SHAH
                                    </span>
                                    <span className="relative z-30 font-bomstad text-[18px] font-normal leading-tight" style={{ color: 'rgb(21, 107, 54)' }}>
                                        Every evening, millions<br />of Indian
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Right Content - Text */}
                        <div className="w-full lg:w-[55%] flex flex-col items-start pt-8">
                            <h2 className="font-kura leading-[0.95] mb-12 uppercase">
                                <span className="block text-[60px]" style={{ color: 'rgb(21, 107, 54)' }}>MADE WITH</span>
                                <span className="block text-[60px]">
                                    <span style={{ color: 'rgb(21, 107, 54)' }}>LOVE & </span>
                                    <span style={{ color: 'rgb(247, 0, 52)' }}>SLOW HEAT</span>
                                </span>
                            </h2>

                            <div className="flex flex-col gap-12">
                                <p className="font-bomstad font-normal text-[18px] leading-[1.3]" style={{ color: 'rgb(21, 107, 54)' }}>
                                    Our founder Priya was one of them. A working mother in Bengaluru, she found herself choosing between quick but unhealthy, or homemade but exhausting. There had to be a better way.
                                </p>

                                {/* Paragraph with red left border */}
                                <div className="pl-10 border-l-[4px]" style={{ borderColor: 'rgb(247, 0, 52)' }}>
                                    <p className="font-bomstad font-medium text-[20px] leading-[1.3]" style={{ color: 'rgb(21, 107, 54)' }}>
                                        Our founder Priya was one of them. A working mother in Bengaluru, she found herself choosing between quick but unhealthy, or homemade but exhausting. There had to be a better way.Our founder Priya was one of them. A working mother in Bengaluru, she found herself choosing between quick but unhealthy, or homemade but exhausting. There had to be a better way.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            {/* Grid Footer Section */}
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
                            <Link href="/products" className="hover:opacity-80 transition-opacity">All Purpose Gravy</Link>
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

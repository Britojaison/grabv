"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProductsPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openSection, setOpenSection] = useState<number | null>(null);
    const [selectedSize, setSelectedSize] = useState("250g");

    React.useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const size = params.get("size");
            if (size === "750g" || size === "250g") {
                setSelectedSize(size);
            }
        }
    }, []);
    return (
        <div className="flex flex-col min-h-screen w-full font-arpona overflow-x-hidden" style={{ backgroundColor: 'rgb(239, 238, 230)' }}>

            {/* Navbar */}
            <header
                style={{ backgroundColor: 'rgb(12, 61, 27)' }}
                className="sticky top-0 z-[100] w-full flex-shrink-0 shadow-md"
            >
                <div className="max-w-[1600px] mx-auto px-4 md:pl-4 md:pr-8 h-[70px] md:h-[80px] flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {/* Hamburger Menu - Mobile and Tablet */}
                        <div className="lg:hidden flex items-center">
                            <button
                                className="text-white focus:outline-none p-2"
                                onClick={() => setIsMenuOpen(true)}
                            >
                                <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <line x1="0" y1="2" x2="24" y2="2" stroke="white" strokeWidth="2.5" />
                                    <line x1="0" y1="8" x2="24" y2="8" stroke="white" strokeWidth="2.5" />
                                    <line x1="0" y1="14" x2="24" y2="14" stroke="white" strokeWidth="2.5" />
                                </svg>
                            </button>
                        </div>

                        <Link href="/" className="flex items-center">
                            <Image
                                src="/images/logo.svg"
                                alt="GrabV Logo"
                                width={110}
                                height={40}
                                className="w-auto h-8 md:h-12"
                                priority
                            />
                        </Link>
                    </div>

                    <nav className="hidden lg:flex items-center gap-8 xl:gap-12 text-white font-medium">
                        <Link href="/" className="hover:text-[rgb(247,216,13)] transition-colors text-[18px]">Home</Link>
                        <Link href="/recipes" className="hover:text-[rgb(247,216,13)] transition-colors text-[18px]">Recipes</Link>
                        <Link href="/products" className="text-[rgb(247,216,13)] transition-colors text-[18px]">Products</Link>
                        <Link href="/ourstory" className="hover:text-[rgb(247,216,13)] transition-colors text-[18px] whitespace-nowrap">Our Story</Link>
                        <Link href="/contact" className="hover:text-[rgb(247,216,13)] transition-colors text-[18px] whitespace-nowrap">Contact Us</Link>
                        <Link href="/faq" className="hover:text-[rgb(247,216,13)] transition-colors text-[18px]">FAQ</Link>
                    </nav>

                    <Link
                        href="/all-purposegravy"
                        style={{
                            borderRadius: '5px',
                            backgroundColor: 'rgb(247, 216, 13)',
                            color: 'rgb(12, 61, 27)',
                            letterSpacing: '0.05em'
                        }}
                        className="font-arpona font-medium flex items-center justify-center hover:bg-yellow-400 transition-colors shrink-0 text-[12px] md:text-[18px] w-[85px] md:w-[142px] h-[30px] md:h-[37px]"
                    >
                        Order Now
                    </Link>
                </div>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && (
                    <div className="fixed inset-0 z-[200] bg-[rgb(12,61,27)] flex flex-col items-center justify-center animate-in fade-in duration-300">
                        <button
                            className="absolute top-6 right-8 text-white p-2 hover:scale-110 transition-transform"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 5L25 25M25 5L5 25" stroke="white" strokeWidth="3" />
                            </svg>
                        </button>
                        <nav className="flex flex-col items-center gap-8 text-white font-arpona font-medium text-[24px]">
                            <Link href="/" onClick={() => setIsMenuOpen(false)} className="hover:text-[rgb(247,216,13)] transition-colors">Home</Link>
                            <Link href="/recipes" onClick={() => setIsMenuOpen(false)} className="hover:text-[rgb(247,216,13)] transition-colors">Recipes</Link>
                            <Link href="/products" onClick={() => setIsMenuOpen(false)} className="hover:text-[rgb(247,216,13)] transition-colors text-[rgb(247,216,13)]">Products</Link>
                            <Link href="/ourstory" onClick={() => setIsMenuOpen(false)} className="hover:text-[rgb(247,216,13)] transition-colors">Our Story</Link>
                            <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="hover:text-[rgb(247,216,13)] transition-colors">Contact Us</Link>
                            <Link href="/faq" onClick={() => setIsMenuOpen(false)} className="hover:text-[rgb(247,216,13)] transition-colors">FAQ</Link>
                            <Link
                                href="/all-purposegravy"
                                style={{ backgroundColor: 'rgb(247, 216, 13)', color: 'rgb(12, 61, 27)' }}
                                className="mt-4 px-10 py-3 rounded-full font-bold text-[18px] hover:bg-yellow-400 transition-colors flex items-center justify-center"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Order Now
                            </Link>
                        </nav>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="w-full relative flex flex-col items-center">

                {/* Content Wrapper for Product Info */}
                <div className="w-full max-w-[1600px] mx-auto px-4 md:pl-4 md:pr-8 pt-8 md:pt-16 pb-12 md:pb-20">


                    {/* Main Product Info Section */}
                    <div className="w-full flex flex-col pt-4 md:pt-2">

                        <div className="w-full flex flex-row md:flex-row gap-2 md:gap-24">

                            {/* Left: Product Image */}
                            <div className="w-[50%] md:w-[50%] flex flex-col items-center md:items-start pt-0 md:pt-4">
                                <div className="relative w-full aspect-[1/1.1] md:aspect-square rounded-[20px] md:rounded-[12px] overflow-hidden bg-[#e5e5e5]/40 md:bg-transparent flex items-center justify-center p-2 md:p-6 md:max-w-[640px]">
                                    <div className="relative w-full h-full">
                                        <Image
                                            src="/images/APGArtboard-1 (3).png"
                                            alt="Product Main"
                                            fill
                                            className="object-cover object-center scale-[1.34] md:scale-[1.24] rounded-[10px]"
                                            priority
                                        />
                                        {/* Pagination dots inside image area on desktop */}
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                                            <div className="w-2 h-2 rounded-full bg-white shadow-sm" />
                                            <div className="w-2 h-2 rounded-full bg-white/50" />
                                            <div className="w-2 h-2 rounded-full bg-white/50" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Product Details */}
                            <div className="w-[55%] md:w-[50%] flex flex-col items-start pt-0 md:pt-4">

                                {/* Fresh & Flavorful Pill */}
                                <div className="relative w-[130px] md:w-[240px] h-[35px] md:h-[65px] mb-4 md:mb-8">
                                    <div className="absolute left-[0.46px] top-[4.46px] w-[calc(100%-4px)] h-[calc(100%-8px)] rounded-[100px] bg-[rgb(247,216,13)]" />
                                    <Image
                                        src="/images/green border.svg"
                                        alt=""
                                        fill
                                        className="pointer-events-none object-contain"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center gap-1.5 px-3">
                                        <div className="relative w-[12px] md:w-[20px] h-[12px] md:h-[20px] shrink-0" style={{ filter: 'brightness(0) invert(30%) sepia(35%) saturate(1048%) hue-rotate(97deg) brightness(93%) contrast(92%)' }}>
                                            <Image
                                                src="/images/leaf.svg"
                                                alt="Leaf"
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                        <span className="font-arpona font-medium tracking-tight text-[11px] md:text-[18px] whitespace-nowrap" style={{ color: 'rgb(21, 107, 54)' }}>
                                            Freshly made
                                        </span>
                                    </div>
                                </div>

                                {/* Title */}
                                <div className="mb-3 md:mb-4 uppercase">
                                    <div className="md:hidden">
                                        <h1 className="font-kura leading-[0.95] text-[20px] uppercase whitespace-nowrap" style={{ color: 'rgb(21, 107, 54)' }}>
                                            Onion Tomato
                                        </h1>
                                        <h1 className="font-kura leading-[0.95] text-[20px] uppercase whitespace-nowrap" style={{ color: 'rgb(247, 0, 52)' }}>
                                            Gravy
                                        </h1>
                                    </div>
                                    <div className="hidden md:block">
                                        <h1 className="font-kura leading-[0.95] text-[50px] lg:text-[65px] uppercase" style={{ color: 'rgb(21, 107, 54)' }}>
                                            Onion Tomato
                                        </h1>
                                        <h1 className="font-kura leading-[0.95] text-[50px] lg:text-[65px] uppercase" style={{ color: 'rgb(247, 0, 52)' }}>
                                            Gravy
                                        </h1>
                                    </div>
                                </div>

                                {/* Features Bar */}
                                <div className="mb-4 md:mb-8 flex items-center gap-3 text-[14px] md:text-[22px] font-normal font-arpona" style={{ color: 'rgb(21, 107, 54)' }}>
                                    <span>Zero Added Preservatives | All Purpose Gravy | Slowly Cooked</span>
                                </div>

                                {/* Pack Size Section */}
                                <div className="w-full mb-4 md:mb-6 flex flex-col gap-2 md:gap-4">
                                    <span className="uppercase tracking-widest font-normal font-arpona text-[14px] md:text-[18px]" style={{ color: 'rgb(21, 107, 54)' }}>PACK SIZE</span>
                                    <div className="grid grid-cols-2 md:flex md:flex-row gap-2 md:gap-3 items-stretch md:items-center mb-0">
                                        {["250g", "750g"].map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`px-3 md:px-6 py-1.5 md:py-2.5 rounded-[6px] md:rounded-[8px] font-normal transition-all shadow-sm flex items-center justify-center font-arpona whitespace-nowrap text-[12px] md:text-[18px] ${selectedSize === size
                                                        ? 'bg-[rgb(21,107,54)] text-white'
                                                        : 'bg-[rgb(206,219,205)] text-[rgb(21,107,54)] hover:bg-[rgb(21,107,54)] hover:text-white'
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Light Grey Divider Line */}
                                <div className="hidden md:block w-full h-[1px] bg-neutral-300 mb-6" />

                                {/* Guarantee Banner (Inside Details for Desktop) */}
                                <div className="hidden md:flex w-full p-4 rounded-[10px] items-center gap-4" style={{ backgroundColor: 'rgb(207, 219, 204)' }}>
                                    <div className="shrink-0 w-12 h-12 relative">
                                        <Image src="/images/badge.svg" alt="Freshness Badge" fill className="object-contain" />
                                    </div>
                                    <p className="leading-tight font-arpona text-[18px]" style={{ color: 'rgb(21, 107, 54)' }}>
                                        Enjoy every bite with the confidence of <span className="font-bold">100% freshness</span>, carefully packed to deliver pure taste, quality and satisfaction.
                                    </p>
                                </div>

                            </div>
                        </div>

                        {/* Mobile Guarantee Banner (Full Width Below) */}
                        <div className="w-full md:hidden p-4 rounded-[8px] flex items-center gap-3 shadow-sm mb-8" style={{ backgroundColor: 'rgb(207, 219, 204)' }}>
                            <div className="shrink-0 w-8 h-8 relative">
                                <Image src="/images/badge.svg" alt="Freshness Badge" fill className="object-contain" />
                            </div>
                            <p className="leading-tight font-arpona text-[13px]" style={{ color: 'rgb(21, 107, 54)' }}>
                                <span className="font-bold">100% freshness guaranteed.</span>
                                <span className="font-normal opacity-90"> If you&apos;re not happy with your order, we&apos;ll replace it or refund – no questions asked.</span>
                            </p>
                        </div>

                        {/* Collapsible Sections */}
                        <div className="w-full flex flex-col pt-4 mb-16 md:mb-10">
                            {[
                                {
                                    id: "product-details",
                                    title: "Product Details",
                                    content: (
                                        <div className="flex flex-col gap-2">
                                            <p>A rich onion tomato gravy, slow cooked to bring out deep, comforting flavours.</p>
                                            <p>Your everyday curry base is ready in minutes, without added preservatives.</p>
                                        </div>
                                    )
                                },
                                {
                                    id: "how-to-use",
                                    title: "How to Use",
                                    content: (
                                        <ul className="list-disc pl-5 flex flex-col gap-1">
                                            <li>Add your tempering (tadka) in oil</li>
                                            <li>Sauté veggies or paneer of your choice</li>
                                            <li>Pour gravy & adjust consistency</li>
                                            <li>Sprinkle spices & salt to taste</li>
                                            <li>Cook for 10 mins and enjoy!</li>
                                        </ul>
                                    )
                                },
                                {
                                    id: "ingredients",
                                    title: "Ingredients",
                                    content: (
                                        <p className="leading-relaxed">
                                            Onion, Tomato, Refined Sunflower Oil, Ginger Paste, Garlic Paste, Green Chilli Paste, Whole Spice Blend (Cumin, Cinnamon, Clove, Bay Leaf), Powdered Spice Blend (Red Chilli Powder, Turmeric Powder, Coriander Powder, Cumin Powder, Black Pepper), Salt, Cashew, RO Water
                                        </p>
                                    )
                                },
                                {
                                    title: "Storage Instruction",
                                    content: (
                                        <ul className="list-disc pl-5 flex flex-col gap-1">
                                            <li>Refrigerate after opening (do not freeze)</li>
                                            <li>Consume within 7 days of opening</li>
                                            <li>Always seal the pack tightly after use</li>
                                            <li>Use a clean, dry spatula every time</li>
                                        </ul>
                                    )
                                }
                            ].map((section, idx) => (
                                <div key={idx} id={section.id} className="w-full border-t flex flex-col" style={{ borderColor: 'rgb(207, 219, 204)' }}>
                                    <div
                                        className="w-full py-5 md:py-6 flex items-center justify-between cursor-pointer group"
                                        onClick={() => setOpenSection(openSection === idx ? null : idx)}
                                    >
                                        <span className="font-medium md:font-normal font-arpona text-[20px] md:text-[25px]" style={{ color: openSection === idx ? 'rgb(247, 0, 52)' : 'rgb(21, 107, 54)' }}>{section.title}</span>
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 ${openSection === idx ? 'rotate-180' : ''}`}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill={openSection === idx ? 'rgb(247, 0, 52)' : 'rgb(21, 107, 54)'} xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7 10L12 15L17 10H7Z" />
                                            </svg>
                                        </div>
                                    </div>
                                    {openSection === idx && (
                                        <div className="pb-6 text-[14px] md:text-[18px] font-arpona animate-fadeIn" style={{ color: 'rgb(21, 107, 54)' }}>
                                            {section.content}
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div className="w-full border-t" style={{ borderColor: 'rgb(207, 219, 204)' }} />
                        </div>

                        {/* Explore More Products Section */}
                        <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] px-4 md:pl-4 md:pr-8 pt-10 pb-8 md:pb-4 mb-4" style={{ backgroundColor: 'rgb(239, 239, 231)' }}>
                            <div className="max-w-[1600px] mx-auto flex flex-col items-center md:items-start">
                                <h2 className="font-kura leading-none mb-10 md:mb-12 uppercase text-[32px] md:text-[50px] lg:text-[65px] text-center md:text-left lg:whitespace-nowrap">
                                    <span style={{ color: 'rgb(21, 107, 54)' }}>Explore </span>
                                    <span style={{ color: 'rgb(247, 0, 52)' }}>More Products</span>
                                </h2>

                                <div className="w-full flex lg:grid lg:grid-cols-3 overflow-x-auto lg:overflow-visible gap-4 md:gap-10 pb-4 lg:pb-0 no-scrollbar px-4 md:px-0">
                                    {[
                                        { status: 'active', title: 'Onion Tomato Gravy', image: '/images/APGArtboard-1 (3).png' },
                                        { status: 'coming_soon', title: 'Smoked Makhani Gravy', image: '/images/smoked makani.png' },
                                        { status: 'coming_soon', title: 'Smoked Makhani Gravy', image: '/images/smoked makani.png' }
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex flex-col items-center group shrink-0 w-[190px] md:w-[300px] lg:w-auto">
                                            {/* Image Container */}
                                            <div className={`relative w-full aspect-[4/5] rounded-[20px] overflow-hidden mb-5 bg-[#F5F5F5] ${item.status === 'active' ? 'cursor-pointer' : ''}`}>
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    className={`object-cover transition-transform duration-500 ${
                                                        item.status === 'coming_soon'
                                                            ? 'object-bottom scale-[1.45] group-hover:scale-[1.48] grayscale opacity-60'
                                                            : 'object-center scale-[1.36] -translate-y-[16px] group-hover:scale-[1.38] md:object-bottom md:scale-[1.34] md:-translate-y-[28px] md:group-hover:scale-[1.37]'
                                                        }`}
                                                />
                                                {/* Coming Soon Badge */}
                                                {item.status === 'coming_soon' && (
                                                    <div className="absolute inset-0 flex items-center justify-center p-4">
                                                        <div className="bg-[rgb(247,0,52)] text-white px-3 md:px-6 py-1 md:py-2 rounded-[8px] md:rounded-[10px] text-[14px] md:text-[18px] font-arpona font-normal shadow-lg">
                                                            Coming Soon
                                                        </div>
                                                    </div>
                                                )}
                                                {/* Clickable overlay for active products */}
                                                {item.status === 'active' && (
                                                    <Link href="/all-purposegravy" className="absolute inset-0 z-10" aria-label="View product details" />
                                                )}
                                            </div>

                                            {/* Product Pill */}
                                            <div className="px-2 md:px-6 py-1.5 md:py-2 rounded-[8px] md:rounded-[10px] mb-3 w-full md:w-auto" style={{ backgroundColor: 'rgb(228, 233, 223)' }}>
                                                <span className="text-[14px] md:text-[20px] font-arpona font-normal leading-snug text-center block" style={{ color: 'rgb(21, 106, 55)' }}>
                                                    {item.title}
                                                </span>
                                            </div>

                                            {/* View Product Button */}
                                            <Link
                                                href="/all-purposegravy"
                                                className="w-full lg:w-[353px] relative h-[60px] md:h-[72px] flex items-center justify-center hover:scale-[1.02] transition-all group/btn"
                                            >
                                                <div
                                                    className="absolute w-[calc(100%-10px)] lg:w-[349px] h-[calc(100%-28px)] md:h-[60px] top-[14px] left-[5px] lg:left-[0.75px] z-0 bg-[rgb(247,216,13)] rounded-[9px]"
                                                    style={{ transform: 'rotate(-0.8deg)' }}
                                                />
                                                <div className="absolute inset-0 z-10 w-full h-full">
                                                    <Image
                                                        src="/images/border7.svg"
                                                        alt="border"
                                                        fill
                                                        className="object-fill"
                                                    />
                                                </div>
                                                <span className="relative z-20 text-[20px] md:text-[32px] font-kura font-medium text-[rgb(247,0,52)] uppercase">
                                                    View Product
                                                </span>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="w-full relative flex flex-col items-center">
                        {/* Green Header with Jagged Edge */}
                        <div className="w-full relative pt-12 md:pt-20 pb-16 md:pb-32 flex flex-col items-center text-center">
                            <div className="absolute inset-0 z-0 overflow-hidden">
                                <Image
                                    src="/images/bg green3.svg"
                                    alt="Background"
                                    fill
                                    className="object-cover object-bottom scale-x-[-1]"
                                    priority
                                />
                                <div className="absolute inset-0 -z-10" style={{ backgroundColor: 'rgb(239, 238, 230)' }} />
                            </div>

                            <div className="relative z-10 flex flex-col items-center px-4">
                                {/* What people are saying Pill - Mobile */}
                                <div className="md:hidden relative w-[210px] h-[55px] mb-6">
                                    <div className="absolute top-[6px] bottom-[6px] left-[4px] right-[4px] rounded-full bg-[rgb(247,216,13)]" />
                                    <Image src="/images/red border.svg" alt="" fill className="pointer-events-none object-contain" />
                                    <span className="absolute inset-0 flex items-center justify-center font-arpona font-bold text-[14px] leading-none tracking-normal text-[#156b36]">
                                        What people are saying
                                    </span>
                                </div>

                                {/* What people are saying Pill - Desktop */}
                                <div className="hidden md:block relative w-[315px] h-[83px] mb-10">
                                    <div className="absolute left-[0.76px] top-[7.36px] w-[310px] h-[67px] rounded-[100px] bg-[rgb(247,216,13)]" />
                                    <Image src="/images/red border.svg" alt="" fill className="pointer-events-none object-contain" />
                                    <span className="absolute inset-0 flex items-center justify-center font-arpona font-semibold text-[18px] leading-none tracking-normal" style={{ color: 'rgb(21, 107, 54)' }}>
                                        What people are saying
                                    </span>
                                </div>

                                {/* Heading */}
                                <h2 className="font-kura text-[32px] md:text-[55px] lg:text-[85px] leading-tight mb-0 md:mb-4 text-center uppercase">
                                    <span className="text-white">The GrabV </span>
                                    <span style={{ color: 'rgb(247, 216, 13)' }}>Experience</span>
                                </h2>
                            </div>
                        </div>

                        {/* Review Cards - Horizontal scroll on mobile and tablet */}
                        <div className="w-full flex flex-col items-center">
                            <div className="w-full max-w-[1600px] mx-auto px-4 md:pl-4 md:pr-8 pt-4 md:py-8 lg:py-20 flex overflow-x-auto no-scrollbar lg:grid lg:grid-cols-3 gap-6 md:gap-8 pb-8 md:pb-16">
                            {[
                                {
                                    name: "Sneha Mehta",
                                    location: "Bengaluru",
                                    text: "I recently shifted to Bengaluru, and I was craving for the home cooked flavour and that's when GrabV’s onion tomato gravy saved me!!! It was absolutely delicious.",
                                    rating: 5,
                                    image: "/images/cheerful-traditional-indian-woman-white-background-studio-shot.jpg"
                                },
                                {
                                    name: "Harshitha",
                                    location: "Bengaluru",
                                    text: "Oh mahn!! What a flavourrr… made me feel like a real chef!!",
                                    rating: 4.5,
                                    image: "/images/indian-woman-posing-cute-stylish-outfit-camera-smiling.jpg"
                                },
                                {
                                    name: "Chetana Gowda",
                                    location: "Bengaluru",
                                    text: "It is an absolute saviour to my busy days, so quick and so easy. Am stocking this up again for sure!!",
                                    rating: 4,
                                    image: "/images/stylish-indian-beard-model-man-casual-clothes-posed-outdoor-street-india.jpg"
                                }
                            ].map((item, idx) => (
                                <div key={idx} className="relative p-4 md:p-6 rounded-[20px] bg-white flex flex-col gap-2 md:gap-4 shrink-0 w-[211px] md:w-[350px] lg:w-auto min-h-[150px] h-auto pb-4 lg:h-auto shadow-sm">
                                    {/* Mobile Card Borders (Double yellow border effect per request) */}
                                    <div className="absolute -inset-1 md:hidden pointer-events-none">
                                        <Image src="/images/card border phone.svg" alt="" fill className="object-fill" />
                                    </div>
                                    <div className="absolute -inset-1.5 md:hidden pointer-events-none rotate-[1.5deg] scale-[1.02] opacity-70">
                                        <Image src="/images/card border phone.svg" alt="" fill className="object-fill" />
                                    </div>

                                    {/* Desktop Card Borders (Double yellow border effect per request) */}
                                    <div className="absolute -inset-2.5 hidden md:block pointer-events-none">
                                        <Image src="/images/card border web.svg" alt="" fill className="object-fill" />
                                    </div>
                                    <div className="absolute -inset-3 hidden md:block pointer-events-none -rotate-[0.8deg] scale-[1.01] opacity-70">
                                        <Image src="/images/card border web.svg" alt="" fill className="object-fill" />
                                    </div>

                                    <div className="flex items-center gap-3 md:gap-4 relative z-10">
                                        <div className="w-10 h-10 md:w-16 md:h-16 rounded-full overflow-hidden relative border border-neutral-100">
                                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[14px] md:text-[20px] font-bold" style={{ color: 'rgb(21, 107, 54)' }}>{item.name}</span>
                                            <span className="text-[11px] md:text-[16px] text-neutral-400">{item.location}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-0.5 relative z-10">
                                        {[1, 2, 3, 4, 5].map((s) => {
                                            const isFull = s <= Math.floor(item.rating);
                                            const isHalf = s === Math.ceil(item.rating) && item.rating % 1 !== 0;
                                            return (
                                                <div key={s} className="relative text-[15px] md:text-[24px] leading-none">
                                                    <span style={{ color: 'rgb(210, 210, 210)' }}>★</span>
                                                    {isFull && (
                                                        <span className="absolute inset-0" style={{ color: 'rgb(247, 216, 13)' }}>★</span>
                                                    )}
                                                    {isHalf && (
                                                        <span className="absolute inset-0 overflow-hidden w-[50%]" style={{ color: 'rgb(247, 216, 13)' }}>★</span>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <p className="text-[12px] md:text-[22px] leading-relaxed font-medium relative z-10 md:line-clamp-none" style={{ color: 'rgb(21, 107, 54)' }}>
                                        &quot;{item.text}&quot;
                                    </p>
                                </div>
                            ))}
                            </div>
                        </div>

                    {/* Ready to Cook Section */}
                    <div className="w-full flex flex-col items-center">
                        <div
                            className="w-[calc(100%-32px)] md:w-full max-w-[1600px] mx-auto min-h-[280px] md:min-h-[450px] lg:h-[550px] rounded-[8px] px-4 md:px-12 lg:px-24 py-8 md:py-16 lg:py-24 flex flex-col items-center justify-center text-center relative overflow-hidden mb-10 shadow-xl"
                            style={{ backgroundColor: 'rgb(21, 106, 55)' }}
                        >

                            {/* Heading - Single line for mobile */}
                            <h2 className="font-kura text-[19px] md:text-[46px] lg:text-[70px] leading-tight mb-4 md:mb-8 lg:whitespace-nowrap">
                                <span style={{ color: 'rgb(247, 216, 13)' }}>Ready to cook smarter </span>
                                <span className="text-white">every day?</span>
                            </h2>

                            {/* Subtext */}
                            <p className="text-white text-[16px] md:text-[20px] lg:text-[28px] font-arpona font-normal tracking-wide opacity-90 mb-8 md:mb-12 max-w-4xl px-2 md:px-0 leading-relaxed md:leading-[1.3]">
                                Reclaim your time with our preservative free gravy pouches.<br className="hidden md:block" /> Freshly chilled, FSSAI certified, and delivered to your door.
                            </p>

                            {/* Buttons */}
                            <div className="flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-4 lg:gap-6 mb-8 md:mb-12 w-full max-w-[1000px]">
                                {/* Order 750g */}
                                <button
                                    onClick={() => {
                                        setSelectedSize("750g");
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className="bg-white text-[#f70034] min-w-[150px] md:min-w-[240px] lg:min-w-[260px] py-2.5 md:py-4 lg:py-5 rounded-full font-arpona font-normal text-[14px] md:text-[18px] lg:text-[24px] shadow-xl hover:scale-105 hover:bg-[#f70034] hover:text-white transition-all group flex items-center justify-center gap-2 md:gap-4 shrink-0"
                                >
                                    <div className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 relative group-hover:brightness-0 group-hover:invert transition-all">
                                        <Image src="/images/whatsapp.svg" alt="WhatsApp" fill className="object-contain" />
                                    </div>
                                    <span className="whitespace-nowrap">Order 750g</span>
                                </button>

                                {/* Order 250g */}
                                <button
                                    onClick={() => {
                                        setSelectedSize("250g");
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className="bg-white text-[#f70034] min-w-[150px] md:min-w-[240px] lg:min-w-[260px] py-2.5 md:py-4 lg:py-5 rounded-full font-arpona font-normal text-[14px] md:text-[18px] lg:text-[24px] shadow-xl hover:scale-105 hover:bg-[#f70034] hover:text-white transition-all group flex items-center justify-center gap-2 md:gap-4 shrink-0"
                                >
                                    <div className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 relative group-hover:brightness-0 group-hover:invert transition-all">
                                        <Image src="/images/whatsapp.svg" alt="WhatsApp" fill className="object-contain" />
                                    </div>
                                    <span className="whitespace-nowrap">Order 250g</span>
                                </button>

                                {/* WhatsApp - Tertiary */}
                                <button className="bg-white text-[#f70034] min-w-[150px] md:min-w-[240px] lg:min-w-[260px] py-2.5 md:py-4 lg:py-5 rounded-full font-arpona font-normal text-[14px] md:text-[18px] lg:text-[24px] shadow-xl hover:scale-105 hover:bg-[#f70034] hover:text-white transition-all group flex items-center justify-center gap-2 md:gap-4 shrink-0">
                                    <div className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 relative group-hover:brightness-0 group-hover:invert transition-all">
                                        <Image src="/images/whatsapp.svg" alt="WhatsApp" fill className="object-contain" />
                                    </div>
                                    <span className="whitespace-nowrap">WhatsApp us</span>
                                </button>
                            </div>

                            {/* Footer text */}

                        </div>
                    </div>
                </div>
            </main>

            {/* Footer Section */}
            <footer className="w-full py-12 md:py-16 px-6 md:px-8 lg:px-10" style={{ backgroundColor: 'rgb(21, 107, 54)' }}>
                <div className="max-w-[1600px] mx-auto">
                    {/* Mobile Footer (Matching Figma) */}
                    <div className="md:hidden grid grid-cols-2 gap-x-8 gap-y-10">
                        <div className="flex flex-col gap-10">
                            <div className="flex flex-col gap-4">
                                <div className="w-[70px] h-[35px] relative">
                                    <Image src="/images/logo.svg" alt="GrabV Logo" fill className="object-contain" />
                                </div>
                                <div className="flex flex-col gap-0 text-[11px] font-medium leading-tight font-arpona" style={{ color: 'rgb(247, 216, 13)' }}>
                                    <p>© 2026 GrabV. All rights reserved.</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <h4 className="text-[16px] font-bold" style={{ color: 'rgb(247, 216, 13)' }}>Company</h4>
                                <div className="flex flex-col gap-0 text-[14px] font-medium font-arpona leading-relaxed" style={{ color: 'rgb(247, 216, 13)' }}>
                                    <Link href="/ourstory">Our Story</Link>
                                    <Link href="/#process">Process</Link>
                                    <Link href="/#quality">Quality Promise</Link>
                                    <Link href="/contact">Contact Us</Link>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-10">
                            <div className="flex flex-col gap-1">
                                <h4 className="text-[16px] font-bold" style={{ color: 'rgb(247, 216, 13)' }}>Order & Policies</h4>
                                <div className="flex flex-col gap-0 text-[14px] font-medium font-arpona leading-relaxed" style={{ color: 'rgb(247, 216, 13)' }}>
                                    <Link href="#">WhatsApp Order</Link>
                                    <Link href="#">Exchange Order</Link>
                                    <Link href="#">Privacy Policy</Link>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <h4 className="text-[16px] font-bold" style={{ color: 'rgb(247, 216, 13)' }}>Product</h4>
                                <div className="flex flex-col gap-0 text-[14px] font-medium font-arpona leading-relaxed" style={{ color: 'rgb(247, 216, 13)' }}>
                                    <Link href="/all-purposegravy">All Purpose Gravy</Link>
                                    <Link href="/all-purposegravy#ingredients">Ingredients</Link>
                                    <Link href="/all-purposegravy#how-to-use">How to Use</Link>
                                    <Link href="/recipes">Recipes</Link>
                                </div>
                                <div className="flex flex-col gap-1 mt-2">
                                    <span className="text-[11px] font-bold font-arpona text-white">Follow Us</span>
                                    <div className="flex items-center gap-3">
                                        <Link href="#" className="w-4 h-4 relative brightness-0 invert">
                                            <Image src="/images/facebook.svg" alt="Facebook" fill className="object-contain" />
                                        </Link>
                                        <Link href="#" className="w-4 h-4 relative brightness-0 invert">
                                            <Image src="/images/whatsapp1.svg" alt="WhatsApp" fill className="object-contain" />
                                        </Link>
                                        <Link href="https://www.instagram.com/grab__v/" target="_blank" rel="noopener noreferrer" className="w-4 h-4 relative brightness-0 invert">
                                            <Image src="/images/insta.svg" alt="Instagram" fill className="object-contain" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Footer Section (Unchanged) */}
                    <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                        {/* Column 1: Brand & Socials (No Box) */}
                        <div className="p-0 flex flex-col w-full h-auto md:h-[234px] justify-start gap-12">
                            <div className="flex flex-col">
                                <div className="w-[110px] h-[55px] relative mb-4">
                                    <Image src="/images/logo.svg" alt="GrabV Logo" fill className="object-contain object-left" />
                                </div>
                                <div className="flex flex-col gap-1 text-[14px] md:text-[16px] font-medium leading-tight font-arpona" style={{ color: 'rgb(247, 216, 13)' }}>
                                    <p>© 2026 GrabV. All rights reserved.</p>
                                </div>
                            </div>

                            <div className="flex flex-col items-start gap-3">
                                <span className="text-[14px] md:text-[16px] font-bold font-arpona text-white">Follow Us</span>
                                <div className="flex items-center gap-5">
                                    <Link href="#" className="w-5 h-5 md:w-6 md:h-6 relative hover:scale-110 transition-transform brightness-0 invert">
                                        <Image src="/images/facebook.svg" alt="Facebook" fill className="object-contain" />
                                    </Link>
                                    <Link href="#" className="w-5 h-5 md:w-6 md:h-6 relative hover:scale-110 transition-transform brightness-0 invert">
                                        <Image src="/images/whatsapp1.svg" alt="WhatsApp" fill className="object-contain" />
                                    </Link>
                                    <Link href="https://www.instagram.com/grab__v/" target="_blank" rel="noopener noreferrer" className="w-5 h-5 md:w-6 md:h-6 relative hover:scale-110 transition-transform brightness-0 invert">
                                        <Image src="/images/insta.svg" alt="Instagram" fill className="object-contain" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-[20px] md:rounded-[30px] p-6 flex flex-col w-full h-auto md:h-[234px]" style={{ backgroundColor: 'rgb(55, 122, 49)' }}>
                            <h4 className="text-[18px] md:text-[22px] font-bold mb-3 md:mb-4" style={{ color: 'rgb(247, 216, 13)' }}>Company</h4>
                            <div className="flex flex-col gap-2 text-[16px] md:text-[18px] font-medium font-arpona leading-tight" style={{ color: 'rgb(247, 216, 13)' }}>
                                <Link href="/ourstory" className="hover:opacity-80 transition-opacity">Our Story</Link>
                                <Link href="/#process" className="hover:opacity-80 transition-opacity">Process</Link>
                                <Link href="/#quality" className="hover:text-[rgb(247,216,13)] transition-colors">Quality Promise</Link>
                                <Link href="/contact" className="hover:opacity-80 transition-opacity">Contact Us</Link>
                            </div>
                        </div>
                        <div className="rounded-[20px] md:rounded-[30px] p-6 flex flex-col w-full h-auto md:h-[234px]" style={{ backgroundColor: 'rgb(55, 122, 49)' }}>
                            <h4 className="text-[18px] md:text-[22px] font-bold mb-3 md:mb-4" style={{ color: 'rgb(247, 216, 13)' }}>Product</h4>
                            <div className="flex flex-col gap-2 text-[16px] md:text-[18px] font-medium font-arpona leading-tight" style={{ color: 'rgb(247, 216, 13)' }}>
                                <Link href="/all-purposegravy" className="hover:opacity-80 transition-opacity">All Purpose Gravy</Link>
                                <Link href="/all-purposegravy#ingredients" className="hover:opacity-80 transition-opacity">Ingredients</Link>
                                <Link href="/all-purposegravy#how-to-use" className="hover:opacity-80 transition-opacity">How to Use</Link>
                                <Link href="/recipes" className="hover:opacity-80 transition-opacity">Recipes</Link>
                            </div>
                        </div>
                        <div className="rounded-[20px] md:rounded-[30px] p-6 flex flex-col w-full h-auto md:h-[234px]" style={{ backgroundColor: 'rgb(55, 122, 49)' }}>
                            <h4 className="text-[18px] md:text-[22px] font-bold mb-3 md:mb-4" style={{ color: 'rgb(247, 216, 13)' }}>Order & Policies</h4>
                            <div className="flex flex-col gap-2 text-[16px] md:text-[18px] font-medium font-arpona leading-tight" style={{ color: 'rgb(247, 216, 13)' }}>
                                <Link href="#" className="hover:opacity-80 transition-opacity">WhatsApp Order</Link>
                                <Link href="#" className="hover:opacity-80 transition-opacity">Exchange Order</Link>
                                <Link href="#" className="hover:opacity-80 transition-opacity">Privacy Policy</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

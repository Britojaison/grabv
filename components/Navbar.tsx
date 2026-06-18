"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      style={{ backgroundColor: '#156B37' }}
      className="fixed top-0 z-[100] w-full flex-shrink-0 shadow-md font-arpona"
    >
      <div className="w-full px-4 md:px-[120px] h-[70px] md:h-[110px] flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center md:-ml-4">
          <Link href="/">
            <Image
              src="/images/logo.svg"
              alt="GrabV Logo"
              width={200}
              height={80}
              className="w-[90px] md:w-[125px] h-auto object-contain cursor-pointer"
              priority
            />
          </Link>
        </div>

        {/* Desktop Nav - Hidden on Mobile and Tablet */}
        <nav className="hidden lg:flex flex-1 justify-center items-center gap-12 xl:gap-[80px] text-white font-medium px-12 lg:ml-12">
          <Link href="/" className="hover:text-[rgb(247,216,13)] transition-colors text-[22px]">Home</Link>
          <Link href="/recipes" className="hover:text-[rgb(247,216,13)] transition-colors text-[22px]">Recipes</Link>
          <Link href="/products" className="hover:text-[rgb(247,216,13)] transition-colors text-[22px]">Products</Link>
          <Link href="/ourstory" className="hover:text-[rgb(247,216,13)] transition-colors text-[22px] whitespace-nowrap">Our Story</Link>
          <Link href="/contact" className="hover:text-[rgb(247,216,13)] transition-colors text-[22px] whitespace-nowrap">Contact Us</Link>
          <Link href="/faq" className="hover:text-[rgb(247,216,13)] transition-colors text-[22px]">FAQ</Link>
        </nav>

        <div className="flex items-center gap-4">
          {/* Order Now Button - Hidden on Mobile */}
          <Link href="/products" className="hidden md:block">
            <button
              style={{
                borderRadius: '5px',
                backgroundColor: 'rgb(247, 216, 13)',
                color: '#0D3D1B',
                letterSpacing: '-0.06em'
              }}
              className="font-medium flex items-center justify-center hover:bg-yellow-400 transition-colors shrink-0 text-[12px] md:text-[22px] w-[110px] md:w-[180px] h-[30px] md:h-[48px]"
            >
              Order Now
            </button>
          </Link>

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
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[200] bg-[#156B37] flex flex-col items-center justify-center animate-in fade-in duration-300">
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
            <Link href="/products" onClick={() => setIsMenuOpen(false)} className="hover:text-[rgb(247,216,13)] transition-colors">Products</Link>
            <Link href="/ourstory" onClick={() => setIsMenuOpen(false)} className="hover:text-[rgb(247,216,13)] transition-colors">Our Story</Link>
            <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="hover:text-[rgb(247,216,13)] transition-colors">Contact Us</Link>
            <Link href="/faq" onClick={() => setIsMenuOpen(false)} className="hover:text-[rgb(247,216,13)] transition-colors">FAQ</Link>
            <Link href="/products" onClick={() => setIsMenuOpen(false)}>
              <button
                style={{ backgroundColor: 'rgb(247, 216, 13)', color: '#156B37' }}
                className="mt-4 px-14 py-3 rounded-full font-arpona font-medium text-[18px] hover:bg-yellow-400 transition-colors"
              >
                Order Now
              </button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

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
      <div className="mx-auto flex h-[4.375rem] w-full max-w-[100rem] items-center justify-between px-4 sm:px-6 lg:h-[5.75rem] lg:px-10 xl:px-14 2xl:px-20">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/images/logo.svg"
              alt="GrabV Logo"
              width={200}
              height={80}
              className="h-auto w-[5.625rem] cursor-pointer object-contain sm:w-[6.5625rem] lg:w-[7.375rem] xl:w-[7.8125rem]"
              priority
            />
          </Link>
        </div>

        {/* Desktop Nav - Hidden on Mobile and Tablet */}
        <nav className="hidden flex-1 items-center justify-center gap-6 px-6 text-white font-medium lg:flex xl:gap-10 2xl:gap-14">
          <Link href="/" className="text-[1.125rem] transition-colors hover:text-[rgb(247,216,13)] xl:text-[1.25rem] 2xl:text-[1.375rem]">Home</Link>
          <Link href="/recipes" className="text-[1.125rem] transition-colors hover:text-[rgb(247,216,13)] xl:text-[1.25rem] 2xl:text-[1.375rem]">Recipes</Link>
          <Link href="/products" className="text-[1.125rem] transition-colors hover:text-[rgb(247,216,13)] xl:text-[1.25rem] 2xl:text-[1.375rem]">Products</Link>
          <Link href="/ourstory" className="whitespace-nowrap text-[1.125rem] transition-colors hover:text-[rgb(247,216,13)] xl:text-[1.25rem] 2xl:text-[1.375rem]">Our Story</Link>
          <Link href="/contact" className="whitespace-nowrap text-[1.125rem] transition-colors hover:text-[rgb(247,216,13)] xl:text-[1.25rem] 2xl:text-[1.375rem]">Contact Us</Link>
          <Link href="/faq" className="text-[1.125rem] transition-colors hover:text-[rgb(247,216,13)] xl:text-[1.25rem] 2xl:text-[1.375rem]">FAQ</Link>
        </nav>

        <div className="flex items-center gap-4">
          {/* Order Now Button - Hidden on Mobile */}
          <Link href="/products" className="hidden md:block">
            <button
              style={{
                borderRadius: '0.3125rem',
                backgroundColor: 'rgb(247, 216, 13)',
                color: '#0D3D1B',
                letterSpacing: '-0.06em'
              }}
              className="flex h-10 w-[8.25rem] shrink-0 items-center justify-center font-medium text-[1.125rem] transition-colors hover:bg-yellow-400 xl:h-11 xl:w-[9.75rem] xl:text-[1.25rem] 2xl:h-12 2xl:w-[11.25rem] 2xl:text-[1.375rem]"
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
          <nav className="flex flex-col items-center gap-8 text-white font-arpona font-medium text-[1.5rem]">
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="hover:text-[rgb(247,216,13)] transition-colors">Home</Link>
            <Link href="/recipes" onClick={() => setIsMenuOpen(false)} className="hover:text-[rgb(247,216,13)] transition-colors">Recipes</Link>
            <Link href="/products" onClick={() => setIsMenuOpen(false)} className="hover:text-[rgb(247,216,13)] transition-colors">Products</Link>
            <Link href="/ourstory" onClick={() => setIsMenuOpen(false)} className="hover:text-[rgb(247,216,13)] transition-colors">Our Story</Link>
            <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="hover:text-[rgb(247,216,13)] transition-colors">Contact Us</Link>
            <Link href="/faq" onClick={() => setIsMenuOpen(false)} className="hover:text-[rgb(247,216,13)] transition-colors">FAQ</Link>
            <Link href="/products" onClick={() => setIsMenuOpen(false)}>
              <button
                style={{ backgroundColor: 'rgb(247, 216, 13)', color: '#156B37' }}
                className="mt-4 px-14 py-3 rounded-full font-arpona font-medium text-[1.125rem] hover:bg-yellow-400 transition-colors"
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

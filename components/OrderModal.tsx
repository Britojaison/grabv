"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderModal({ isOpen, onClose }: OrderModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [packageSize, setPackageSize] = useState('250g');
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const isWhitefield = pincode === '560066';
  const showDeliveryError = pincode.length >= 6 && !isWhitefield;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isWhitefield) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, packageSize, quantity, pincode, address }),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          onClose();
        }, 3000);
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#0D3D1B]/60 backdrop-blur-md p-4 sm:p-6 font-arpona overflow-y-auto">
      <div className="bg-white rounded-[2rem] w-full max-w-4xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row border border-gray-100 animate-in zoom-in-95 duration-200 md:min-h-[600px] my-auto">
        
        {/* Left Side: Product Showcase */}
        <div className="w-full md:w-[45%] bg-gradient-to-br from-[#156B37] to-[#0D3D1B] p-8 flex flex-col justify-between relative overflow-hidden hidden md:flex">
          {/* Background styling elements */}
          <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-[rgb(247,216,13)]/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10">
            <Image src="/images/logo.svg" alt="GrabV Logo" width={120} height={48} className="h-12 w-auto object-contain drop-shadow-md" />
          </div>

          <div className="relative z-10 flex-grow flex flex-col items-center justify-center mt-4">
            <div className="relative w-full max-w-[280px] aspect-square drop-shadow-2xl hover:scale-105 transition-transform duration-500">
              <Image src="/images/HomePage/product1.webp" alt="Onion Tomato Gravy" fill className="object-contain" priority />
            </div>
            <div className="text-center mt-8 space-y-2">
              <div className="inline-block bg-[rgb(247,216,13)] text-[#0D3D1B] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-2 shadow-sm">Bestseller</div>
              <h2 className="text-3xl font-kura text-white uppercase leading-none tracking-wide drop-shadow-sm">Onion Tomato<br/>Gravy</h2>
              <p className="text-white/80 font-medium text-sm mt-3">Zero Preservatives • Slow Cooked</p>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-[55%] p-6 sm:p-10 bg-[#FAFAFA] relative flex flex-col max-h-[90vh] md:max-h-none overflow-y-auto">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-800 transition-transform hover:scale-110 p-2 bg-white rounded-full shadow-sm border border-gray-100 z-10"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Mobile header */}
          <div className="md:hidden flex items-center gap-4 mb-6 pb-6 border-b border-gray-200 mt-2">
            <div className="w-20 h-20 relative shrink-0 drop-shadow-lg">
              <Image src="/images/HomePage/product1.webp" alt="Onion Tomato Gravy" fill className="object-contain" />
            </div>
            <div>
              <div className="inline-block bg-[rgb(247,216,13)] text-[#0D3D1B] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest mb-1 shadow-sm">Bestseller</div>
              <h2 className="text-xl font-kura text-[#156B37] uppercase leading-none">Onion Tomato Gravy</h2>
            </div>
          </div>

          <div className="hidden md:block mb-8 mt-2">
            <h2 className="text-3xl font-kura text-[#156B37] uppercase tracking-wide">Complete Order</h2>
            <p className="text-gray-500 mt-1 font-medium">Fill in your details below to place your order.</p>
          </div>

          {success ? (
            <div className="flex-grow flex flex-col items-center justify-center text-center py-12 animate-in fade-in zoom-in-95 duration-500">
              <div className="mx-auto w-24 h-24 bg-[#156B37]/10 rounded-full flex items-center justify-center mb-6">
                <div className="text-[#156B37] text-6xl animate-bounce">✓</div>
              </div>
              <h3 className="text-3xl font-bold text-[#0D3D1B] mb-2 font-kura">Order Placed!</h3>
              <p className="text-gray-600 text-lg">Thank you for choosing GrabV.</p>
              <p className="text-gray-500 text-sm mt-1">We will reach out to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 flex-grow">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-2 border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#156B37] focus:ring-4 focus:ring-[#156B37]/10 transition-all text-gray-800 font-medium placeholder-gray-400 bg-white shadow-sm"
                    placeholder="John Doe"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border-2 border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#156B37] focus:ring-4 focus:ring-[#156B37]/10 transition-all text-gray-800 font-medium placeholder-gray-400 bg-white shadow-sm"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Package Size</label>
                  <div className="flex gap-3">
                    {['250g', '750g'].map((size) => (
                      <label key={size} className={`flex-1 flex items-center justify-center gap-2 cursor-pointer border-2 rounded-xl py-2.5 font-bold text-md transition-all shadow-sm ${
                        packageSize === size 
                          ? 'border-[#156B37] bg-[#156B37]/5 text-[#156B37]' 
                          : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50 bg-white'
                      }`}>
                        <input 
                          type="radio" 
                          name="packageSize" 
                          value={size} 
                          checked={packageSize === size} 
                          onChange={(e) => setPackageSize(e.target.value)}
                          className="hidden"
                        />
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${packageSize === size ? 'border-[#156B37]' : 'border-gray-300'}`}>
                          {packageSize === size && <div className="w-2 h-2 rounded-full bg-[#156B37]" />}
                        </div>
                        {size}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Quantity</label>
                  <div className="relative shadow-sm rounded-xl overflow-hidden flex">
                    <button 
                      type="button" 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 shrink-0 flex items-center justify-center bg-gray-50 text-xl text-gray-500 hover:text-[#156B37] hover:bg-gray-100 transition-colors font-medium border-y-2 border-l-2 border-gray-200 rounded-l-xl"
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      required
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                      className="w-full border-y-2 border-x-0 border-gray-200 px-2 py-2.5 text-center outline-none focus:ring-0 transition-all text-gray-800 font-bold text-lg bg-white"
                    />
                    <button 
                      type="button" 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 shrink-0 flex items-center justify-center bg-gray-50 text-xl text-gray-500 hover:text-[#156B37] hover:bg-gray-100 transition-colors font-medium border-y-2 border-r-2 border-gray-200 rounded-r-xl"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest flex justify-between">
                  <span>Pincode</span>
                  {isWhitefield && <span className="text-[#156B37] flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> Valid Delivery Area</span>}
                </label>
                <input 
                  type="text" 
                  required
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className={`border-2 rounded-xl px-4 py-3 outline-none focus:ring-4 transition-all text-gray-800 font-bold text-lg tracking-widest placeholder:text-sm placeholder:tracking-normal placeholder-gray-400 bg-white shadow-sm ${
                    showDeliveryError 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10 bg-red-50' 
                      : isWhitefield 
                        ? 'border-[#156B37] focus:border-[#156B37] focus:ring-[#156B37]/10'
                        : 'border-gray-200 focus:border-[#156B37] focus:ring-[#156B37]/10'
                  }`}
                  placeholder="e.g. 560066"
                />
              </div>

              {showDeliveryError && (
                <div className="bg-red-50 text-red-600 p-3.5 rounded-xl text-sm border border-red-200 flex items-start gap-3 font-medium animate-in slide-in-from-top-2">
                  <svg className="w-5 h-5 shrink-0 mt-0.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Currently not delivering outside Whitefield Blr.
                </div>
              )}

              <div className={`flex flex-col gap-2 transition-all duration-500 overflow-hidden ${isWhitefield ? 'max-h-[200px] opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Delivery Address</label>
                <textarea 
                  required={isWhitefield}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="border-2 border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#156B37] focus:ring-4 focus:ring-[#156B37]/10 transition-all text-gray-800 font-medium placeholder-gray-400 min-h-[90px] resize-none bg-white shadow-sm"
                  placeholder="Enter your complete address..."
                />
              </div>

              <div className="mt-auto pt-4">
                <button 
                  type="submit"
                  disabled={!isWhitefield || isSubmitting}
                  className={`w-full py-4 rounded-xl font-bold text-xl transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-3 ${
                    !isWhitefield || isSubmitting 
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                      : 'bg-[rgb(247,216,13)] hover:bg-[#E5C90A] hover:shadow-lg text-[#0D3D1B]'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-6 w-6 text-[#0D3D1B]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      Complete Purchase
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
                <p className="text-center text-[10px] text-gray-400 mt-3 uppercase tracking-widest font-bold">Secure Checkout</p>
              </div>
              
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderModal({ isOpen, onClose }: OrderModalProps) {
  const [name, setName] = useState('');
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
        body: JSON.stringify({ name, packageSize, quantity, pincode, address }),
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
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#0D3D1B]/40 backdrop-blur-md p-4 font-arpona">
      <div className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl relative overflow-hidden flex flex-col border border-gray-100 animate-in zoom-in-95 duration-200">
        
        {/* Header Section */}
        <div className="bg-[#156B37] pt-8 pb-6 px-6 text-center relative border-b-[6px] border-[rgb(247,216,13)] shadow-sm z-10">
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 text-white/80 hover:text-white transition-transform hover:scale-110 p-1"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <div className="flex justify-center mb-4">
            <div className="bg-white/10 p-2 rounded-2xl backdrop-blur-sm">
              <Image
                src="/images/logo.svg"
                alt="GrabV Logo"
                width={160}
                height={64}
                className="h-14 w-auto object-contain drop-shadow-md"
              />
            </div>
          </div>
          <h2 className="text-[1.35rem] font-bold text-white tracking-wider uppercase font-kura drop-shadow-sm">Place Your Order</h2>
        </div>

        {/* Content Section */}
        <div className="p-7 bg-[#FAFAFA]">
          {success ? (
            <div className="text-center py-12 animate-in fade-in zoom-in-95 duration-500">
              <div className="mx-auto w-24 h-24 bg-[#156B37]/10 rounded-full flex items-center justify-center mb-6">
                <div className="text-[#156B37] text-6xl animate-bounce">✓</div>
              </div>
              <h3 className="text-3xl font-bold text-[#0D3D1B] mb-2 font-kura">Order Placed!</h3>
              <p className="text-gray-600 text-lg">Thank you for choosing GrabV.</p>
              <p className="text-gray-500 text-sm mt-1">We will reach out to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-[#0D3D1B] uppercase tracking-wider">Name</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-2 border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#156B37] focus:ring-4 focus:ring-[#156B37]/10 transition-all text-gray-800 font-medium placeholder-gray-400 bg-white shadow-sm"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-[#0D3D1B] uppercase tracking-wider">Package Size</label>
                <div className="flex gap-4">
                  {['250g', '750g'].map((size) => (
                    <label key={size} className={`flex-1 flex items-center justify-center gap-3 cursor-pointer border-2 rounded-xl py-3 font-bold text-lg transition-all shadow-sm ${
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
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${packageSize === size ? 'border-[#156B37]' : 'border-gray-300'}`}>
                        {packageSize === size && <div className="w-2.5 h-2.5 rounded-full bg-[#156B37]" />}
                      </div>
                      {size}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-[#0D3D1B] uppercase tracking-wider">Quantity</label>
                <div className="relative shadow-sm rounded-xl overflow-hidden">
                  <button 
                    type="button" 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="absolute left-0 top-0 bottom-0 w-14 flex items-center justify-center bg-gray-100 text-2xl text-gray-500 hover:text-[#156B37] hover:bg-gray-200 transition-colors font-medium border-r-2 border-gray-200"
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    required
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-full border-2 border-gray-200 rounded-xl px-14 py-3 text-center outline-none focus:border-[#156B37] focus:ring-4 focus:ring-[#156B37]/10 transition-all text-gray-800 font-bold text-xl bg-white"
                  />
                  <button 
                    type="button" 
                    onClick={() => setQuantity(quantity + 1)}
                    className="absolute right-0 top-0 bottom-0 w-14 flex items-center justify-center bg-gray-100 text-2xl text-gray-500 hover:text-[#156B37] hover:bg-gray-200 transition-colors font-medium border-l-2 border-gray-200"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-[#0D3D1B] uppercase tracking-wider flex justify-between">
                  <span>Pincode</span>
                  {isWhitefield && <span className="text-[#156B37] flex items-center gap-1"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> Valid Area</span>}
                </label>
                <input 
                  type="text" 
                  required
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className={`border-2 rounded-xl px-4 py-3 outline-none focus:ring-4 transition-all text-gray-800 font-bold text-lg tracking-widest placeholder-gray-400 bg-white shadow-sm ${
                    showDeliveryError 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10 bg-red-50' 
                      : isWhitefield 
                        ? 'border-[#156B37] focus:border-[#156B37] focus:ring-[#156B37]/10'
                        : 'border-gray-200 focus:border-[#156B37] focus:ring-[#156B37]/10'
                  }`}
                  placeholder="560066"
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

              {isWhitefield && (
                <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-4 duration-500">
                  <label className="text-sm font-bold text-[#0D3D1B] uppercase tracking-wider">Delivery Address</label>
                  <textarea 
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="border-2 border-[#156B37]/30 rounded-xl px-4 py-3 outline-none focus:border-[#156B37] focus:ring-4 focus:ring-[#156B37]/10 transition-all text-gray-800 font-medium placeholder-gray-400 min-h-[90px] resize-none bg-white shadow-sm"
                    placeholder="Enter your full address in Whitefield"
                  />
                </div>
              )}

              <div className="mt-2 pt-2 border-t border-gray-200">
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
                      Placing Order...
                    </>
                  ) : (
                    <>
                      Place Order Now
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
              
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

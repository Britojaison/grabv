import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative z-10 mt-auto w-full bg-[#FBF5E1] pt-24 pb-12 sm:pt-20 sm:pb-24 font-arpona md:pt-32 md:pb-20">
      {/* Solid green background starting far enough below the wave so the straight edge is hidden */}
      <div className="absolute top-20 sm:top-20 bottom-[-20px] md:bottom-[-50px] left-0 -z-10 w-full bg-[#156B37] pointer-events-none md:top-44"></div>
      
      {/* The green wavy background image */}
      <div className="absolute inset-0 bg-no-repeat -z-10 pointer-events-none" style={{ backgroundImage: "url('/images/HomePage/green%20bg.png')", backgroundSize: "105% auto", backgroundPosition: "center top" }}></div>
      
      <div className="relative z-10 mx-auto grid w-full max-w-[100rem] grid-cols-[1.3fr_1fr_1fr] gap-4 px-2 sm:grid-cols-2 sm:gap-10 sm:px-6 md:-mt-12 lg:grid-cols-[1.1fr_1fr_1fr] lg:px-10 xl:px-14 2xl:px-20">
        
        {/* Column 1: Logo & Copyright */}
        <div className="flex flex-col items-start sm:col-span-2 lg:col-span-1">
          <Image src="/images/logo.svg" alt="GrabV" width={350} height={140} className="h-auto w-[90px] min-[400px]:w-[100px] mb-8 sm:mb-5 sm:w-[13.125rem] lg:mb-8 lg:w-[17.5rem] xl:w-[20.625rem]" />
          <p className="text-[9px] min-[400px]:text-[10px] leading-[1.35] text-white sm:text-[1rem] lg:text-[1.375rem] xl:text-[1.625rem] 2xl:text-[1.875rem]">
            © 2026 GrabV. All rights reserved.<br/>
            88gb Digital Mraketing &<br/>
            Technology Company
          </p>
        </div>

        {/* Column 2: Product & Order */}
        <div className="flex flex-col items-start gap-6 sm:gap-8">
          <div>
            <h3 className="mb-2 sm:mb-3 font-kura text-[13px] min-[400px]:text-[15px] font-normal uppercase tracking-[0.02em] text-[#F7D80C] sm:text-[2.5rem] lg:text-[3rem] xl:text-[3.5rem]">PRODUCT</h3>
            <ul className="flex flex-col gap-1 sm:gap-1 leading-[1.25]">
              <li><a href="/all-purposegravy" className="block text-[11px] min-[400px]:text-[12px] text-white transition-colors hover:text-[#F7D80C] sm:text-[1.1875rem] lg:text-[1.375rem] xl:text-[1.625rem]">All Purpose Gravy</a></li>
              <li><a href="/all-purposegravy#ingredients" className="block text-[11px] min-[400px]:text-[12px] text-white transition-colors hover:text-[#F7D80C] sm:text-[1.1875rem] lg:text-[1.375rem] xl:text-[1.625rem]">Ingredients</a></li>
              <li><a href="/all-purposegravy#how-to-use" className="block text-[11px] min-[400px]:text-[12px] text-white transition-colors hover:text-[#F7D80C] sm:text-[1.1875rem] lg:text-[1.375rem] xl:text-[1.625rem]">How to Use</a></li>
              <li><a href="/recipes" className="block text-[11px] min-[400px]:text-[12px] text-white transition-colors hover:text-[#F7D80C] sm:text-[1.1875rem] lg:text-[1.375rem] xl:text-[1.625rem]">Recipes</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 sm:mb-3 font-kura text-[10px] min-[400px]:text-[12px] font-normal uppercase tracking-[0.02em] text-[#F7D80C] sm:text-[2.5rem] lg:text-[3rem] xl:text-[3.5rem] whitespace-nowrap">ORDER & POLICIES</h3>
            <ul className="flex flex-col gap-1 sm:gap-1 leading-[1.25]">
              <li><a href="#" className="block text-[11px] min-[400px]:text-[12px] text-white transition-colors hover:text-[#F7D80C] sm:text-[1.1875rem] lg:text-[1.375rem] xl:text-[1.625rem]">WhatsApp Order</a></li>
              <li><a href="#" className="block text-[11px] min-[400px]:text-[12px] text-white transition-colors hover:text-[#F7D80C] sm:text-[1.1875rem] lg:text-[1.375rem] xl:text-[1.625rem]">Exchange Order</a></li>
              <li><a href="#" className="block text-[11px] min-[400px]:text-[12px] text-white transition-colors hover:text-[#F7D80C] sm:text-[1.1875rem] lg:text-[1.375rem] xl:text-[1.625rem]">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Column 3: Follow Us & Company */}
        <div className="flex flex-col items-start gap-6 sm:gap-8">
          <div>
            <h3 className="mb-2 sm:mb-3 font-kura text-[13px] min-[400px]:text-[15px] font-normal uppercase tracking-[0.02em] text-[#F7D80C] sm:text-[2.5rem] lg:text-[3rem] xl:text-[3.5rem]">COMPANY</h3>
            <ul className="flex flex-col gap-1 sm:gap-1 leading-[1.25]">
              <li><a href="/ourstory" className="block text-[11px] min-[400px]:text-[12px] text-white transition-colors hover:text-[#F7D80C] sm:text-[1.1875rem] lg:text-[1.375rem] xl:text-[1.625rem]">Our Story</a></li>
              <li><a href="#" className="block text-[11px] min-[400px]:text-[12px] text-white transition-colors hover:text-[#F7D80C] sm:text-[1.1875rem] lg:text-[1.375rem] xl:text-[1.625rem]">Process</a></li>
              <li><a href="#" className="block text-[11px] min-[400px]:text-[12px] text-white transition-colors hover:text-[#F7D80C] sm:text-[1.1875rem] lg:text-[1.375rem] xl:text-[1.625rem]">Quality Promise</a></li>
              <li><a href="/contact" className="block text-[11px] min-[400px]:text-[12px] text-white transition-colors hover:text-[#F7D80C] sm:text-[1.1875rem] lg:text-[1.375rem] xl:text-[1.625rem]">Contact Us</a></li>
            </ul>
          </div>
          <div className="max-[639px]:mt-6">
            <h3 className="mb-2 sm:mb-3 font-kura text-[12px] min-[400px]:text-[14px] font-normal tracking-[0.02em] text-white sm:text-[2.25rem] lg:text-[2.625rem] xl:text-[3rem]">Follow Us</h3>
            <div className="flex items-center">
              <a href="#" className="hover:opacity-80 transition-opacity">
                <Image src="/images/HomePage/footer%20logo.png" alt="Social Links" width={280} height={70} className="h-auto w-[90px] min-[400px]:w-[100px] sm:w-[11.875rem] lg:w-[14.375rem] xl:w-[16.875rem]" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}

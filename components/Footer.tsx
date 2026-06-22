import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative z-10 mt-auto w-full pt-24 pb-12 xl:pt-32 xl:pb-20 font-arpona xl:-mt-[160px] 2xl:-mt-[200px] bg-transparent">
      {/* Solid green background starting far enough below the wave so the straight edge is hidden */}
      <div className="absolute top-20 xl:top-44 bottom-[-20px] xl:bottom-[-50px] left-0 -z-10 w-full bg-[#156B37] pointer-events-none"></div>
      
      {/* The green wavy background image */}
      <div className="absolute inset-0 bg-no-repeat -z-10 pointer-events-none" style={{ backgroundImage: "url('/images/HomePage/green%20bg.png')", backgroundSize: "105% auto", backgroundPosition: "center top" }}></div>
      
      <div className="relative z-10 mx-auto grid w-full grid-cols-[1.3fr_1fr_1fr] gap-4 px-2 xl:gap-10 xl:px-[100px] 2xl:px-[100px] xl:-mt-12">
        
        {/* Column 1: Logo & Copyright */}
        <div className="flex flex-col items-start xl:col-span-1 md:translate-x-[18px] lg:translate-x-[30px] xl:translate-x-0">
          <Image src="/images/logo.svg" alt="GrabV" width={350} height={140} className="h-auto w-[90px] min-[400px]:w-[100px] md:w-[150px] lg:w-[200px] xl:w-[20.625rem] mb-8 xl:mb-8" />
          <p className="text-[9px] min-[400px]:text-[10px] md:text-[14px] lg:text-[18px] xl:text-[1.5rem] 2xl:text-[1.75rem] leading-[1.35] text-white">
            © 2026 GrabV. All rights reserved.<br/>
            88gb Digital Mraketing &<br/>
            Technology Company
          </p>
        </div>

        {/* Column 2: Product & Order */}
        <div className="flex flex-col items-start gap-6 xl:gap-8">
          <div>
            <h3 className="mb-2 xl:mb-3 font-kura text-[13px] min-[400px]:text-[15px] md:text-[20px] lg:text-[26px] xl:text-[3.5rem] font-normal uppercase tracking-[0.02em] text-[#F7D80C]">PRODUCT</h3>
            <ul className="flex flex-col gap-1 xl:gap-1 leading-[1.25]">
              <li><a href="/all-purposegravy" className="block text-[11px] min-[400px]:text-[12px] md:text-[16px] lg:text-[20px] xl:text-[1.5rem] text-white transition-colors hover:text-[#F7D80C]">All Purpose Gravy</a></li>
              <li><a href="/all-purposegravy#ingredients" className="block text-[11px] min-[400px]:text-[12px] md:text-[16px] lg:text-[20px] xl:text-[1.5rem] text-white transition-colors hover:text-[#F7D80C]">Ingredients</a></li>
              <li><a href="/all-purposegravy#how-to-use" className="block text-[11px] min-[400px]:text-[12px] md:text-[16px] lg:text-[20px] xl:text-[1.5rem] text-white transition-colors hover:text-[#F7D80C]">How to Use</a></li>
              <li><a href="/recipes" className="block text-[11px] min-[400px]:text-[12px] md:text-[16px] lg:text-[20px] xl:text-[1.5rem] text-white transition-colors hover:text-[#F7D80C]">Recipes</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 xl:mb-3 font-kura text-[10px] min-[400px]:text-[12px] md:text-[16px] lg:text-[22px] xl:text-[3.5rem] font-normal uppercase tracking-[0.02em] text-[#F7D80C] whitespace-nowrap">ORDER & POLICIES</h3>
            <ul className="flex flex-col gap-1 xl:gap-1 leading-[1.25]">
              <li><a href="#" className="block text-[11px] min-[400px]:text-[12px] md:text-[16px] lg:text-[20px] xl:text-[1.5rem] text-white transition-colors hover:text-[#F7D80C]">WhatsApp Order</a></li>
              <li><a href="#" className="block text-[11px] min-[400px]:text-[12px] md:text-[16px] lg:text-[20px] xl:text-[1.5rem] text-white transition-colors hover:text-[#F7D80C]">Exchange Order</a></li>
              <li><a href="#" className="block text-[11px] min-[400px]:text-[12px] md:text-[16px] lg:text-[20px] xl:text-[1.5rem] text-white transition-colors hover:text-[#F7D80C]">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Column 3: Follow Us & Company */}
        <div className="flex flex-col items-start gap-6 xl:gap-8 xl:ml-auto 2xl:ml-auto">
          <div>
            <h3 className="mb-2 xl:mb-3 font-kura text-[13px] min-[400px]:text-[15px] md:text-[20px] lg:text-[26px] xl:text-[3.5rem] font-normal uppercase tracking-[0.02em] text-[#F7D80C]">COMPANY</h3>
            <ul className="flex flex-col gap-1 xl:gap-1 leading-[1.25]">
              <li><a href="/ourstory" className="block text-[11px] min-[400px]:text-[12px] md:text-[16px] lg:text-[20px] xl:text-[1.5rem] text-white transition-colors hover:text-[#F7D80C]">Our Story</a></li>
              <li><a href="#" className="block text-[11px] min-[400px]:text-[12px] md:text-[16px] lg:text-[20px] xl:text-[1.5rem] text-white transition-colors hover:text-[#F7D80C]">Process</a></li>
              <li><a href="#" className="block text-[11px] min-[400px]:text-[12px] md:text-[16px] lg:text-[20px] xl:text-[1.5rem] text-white transition-colors hover:text-[#F7D80C]">Quality Promise</a></li>
              <li><a href="/contact" className="block text-[11px] min-[400px]:text-[12px] md:text-[16px] lg:text-[20px] xl:text-[1.5rem] text-white transition-colors hover:text-[#F7D80C]">Contact Us</a></li>
            </ul>
          </div>
          <div className="mt-6 xl:mt-0">
            <h3 className="mb-2 xl:mb-3 font-kura text-[12px] min-[400px]:text-[14px] md:text-[20px] lg:text-[26px] xl:text-[3rem] font-normal tracking-[0.02em] text-white">Follow Us</h3>
            <div className="flex items-center">
              <a href="#" className="hover:opacity-80 transition-opacity">
                <Image src="/images/HomePage/footer%20logo.png" alt="Social Links" width={280} height={70} className="h-auto w-[90px] min-[400px]:w-[100px] md:w-[150px] lg:w-[180px] xl:w-[16.875rem]" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}

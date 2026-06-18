export default function Footer() {
  return (
    <footer className="relative w-full bg-[#FBF5E1] pt-[80px] md:pt-[150px] pb-28 md:pb-24 font-arpona mt-auto z-10">
      {/* Solid green background starting far enough below the wave so the straight edge is hidden */}
      <div className="absolute top-[80px] md:top-[200px] bottom-0 left-0 w-full bg-[#156B37] -z-10 pointer-events-none"></div>
      
      {/* The green wavy background image */}
      <div className="absolute inset-0 bg-no-repeat -z-10 pointer-events-none" style={{ backgroundImage: "url('/images/HomePage/green%20bg.png')", backgroundSize: "105% auto", backgroundPosition: "center top" }}></div>
      
      <div className="relative z-10 w-full mx-auto px-4 md:px-[110px] flex flex-row justify-between items-start gap-2 md:gap-0 -mt-8 md:-mt-20">
        
        {/* Column 1: Logo & Copyright */}
        <div className="flex flex-col items-start w-[30%] md:w-auto">
          <img src="/images/logo.svg" alt="GrabV" className="w-[140px] md:w-[350px] mb-4 md:mb-12" />
          <p className="text-white text-[8px] md:text-[34px] tracking-[-0.03em] leading-[1.3] font-normal">
            © 2026 GrabV. All rights reserved.<br/>
            88gb Digital Mraketing &<br/>
            Technology Company
          </p>
        </div>

        {/* Column 2: Product & Order */}
        <div className="flex flex-col items-start w-[30%] md:w-auto mt-2 md:mt-6">
          <div className="mb-6 md:mb-10">
            <h3 className="text-[#F7D80C] font-kura uppercase text-[22px] md:text-[70px] tracking-[0.02em] font-normal mb-2 md:mb-6">PRODUCT</h3>
            <ul className="flex flex-col space-y-0 leading-[1.2] md:leading-[1.3]">
              <li><a href="/all-purposegravy" className="text-white text-[12px] md:text-[35px] tracking-[-0.03em] hover:text-[#F7D80C] transition-colors block py-[2px] md:py-0">All Purpose Gravy</a></li>
              <li><a href="/all-purposegravy#ingredients" className="text-white text-[12px] md:text-[35px] tracking-[-0.03em] hover:text-[#F7D80C] transition-colors block py-[2px] md:py-0">Ingredients</a></li>
              <li><a href="/all-purposegravy#how-to-use" className="text-white text-[12px] md:text-[35px] tracking-[-0.03em] hover:text-[#F7D80C] transition-colors block py-[2px] md:py-0">How to Use</a></li>
              <li><a href="/recipes" className="text-white text-[12px] md:text-[35px] tracking-[-0.03em] hover:text-[#F7D80C] transition-colors block py-[2px] md:py-0">Recipes</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-[#F7D80C] font-kura uppercase text-[22px] md:text-[70px] tracking-[0.02em] font-normal mb-2 md:mb-6">ORDER & POLICIES</h3>
            <ul className="flex flex-col space-y-0 leading-[1.2] md:leading-[1.3]">
              <li><a href="#" className="text-white text-[12px] md:text-[35px] tracking-[-0.03em] hover:text-[#F7D80C] transition-colors block py-[2px] md:py-0">WhatsApp Order</a></li>
              <li><a href="#" className="text-white text-[12px] md:text-[35px] tracking-[-0.03em] hover:text-[#F7D80C] transition-colors block py-[2px] md:py-0">Exchange Order</a></li>
              <li><a href="#" className="text-white text-[12px] md:text-[35px] tracking-[-0.03em] hover:text-[#F7D80C] transition-colors block py-[2px] md:py-0">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Column 3: Follow Us & Company */}
        <div className="flex flex-col items-start w-[30%] md:w-auto mt-2 md:mt-6">
          <div className="mb-10 md:mb-16">
            <h3 className="text-[#F7D80C] font-kura uppercase text-[22px] md:text-[70px] tracking-[0.02em] font-normal mb-2 md:mb-6">COMPANY</h3>
            <ul className="flex flex-col space-y-0 leading-[1.2] md:leading-[1.3]">
              <li><a href="/ourstory" className="text-white text-[12px] md:text-[35px] tracking-[-0.03em] hover:text-[#F7D80C] transition-colors block py-[2px] md:py-0">Our Story</a></li>
              <li><a href="#" className="text-white text-[12px] md:text-[35px] tracking-[-0.03em] hover:text-[#F7D80C] transition-colors block py-[2px] md:py-0">Process</a></li>
              <li><a href="#" className="text-white text-[12px] md:text-[35px] tracking-[-0.03em] hover:text-[#F7D80C] transition-colors block py-[2px] md:py-0">Quality Promise</a></li>
              <li><a href="/contact" className="text-white text-[12px] md:text-[35px] tracking-[-0.03em] hover:text-[#F7D80C] transition-colors block py-[2px] md:py-0">Contact Us</a></li>
            </ul>
          </div>
          <div className="mt-2 md:mt-4">
            <h3 className="text-white font-kura text-[18px] md:text-[50px] tracking-[0.02em] font-normal mb-2 md:mb-4">Follow Us</h3>
            <div className="flex items-center">
              <a href="#" className="hover:opacity-80 transition-opacity">
                <img src="/images/HomePage/footer%20logo.png" alt="Social Links" className="w-[110px] md:w-[280px]" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}

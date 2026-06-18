export default function Footer() {
  return (
    <footer className="relative w-full pt-[80px] md:pt-[150px] pb-24 font-arpona mt-auto z-10">
      {/* Solid green background starting far enough below the wave so the straight edge is hidden */}
      <div className="absolute top-[80px] md:top-[200px] bottom-0 left-0 w-full bg-[#156B37] -z-10 pointer-events-none"></div>
      
      {/* The green wavy background image */}
      <div className="absolute inset-0 bg-no-repeat -z-10 pointer-events-none" style={{ backgroundImage: "url('/images/HomePage/green%20bg.png')", backgroundSize: "105% auto", backgroundPosition: "center top" }}></div>
      
      <div className="relative z-10 w-full mx-auto px-8 md:px-[110px] flex flex-col md:flex-row md:justify-between items-start gap-12 md:gap-0">
        
        {/* Column 1: Logo & Copyright */}
        <div className="flex flex-col items-start">
          <img src="/images/logo.svg" alt="GrabV" className="w-[180px] mb-8" />
          <p className="text-[#F7D80C] text-[16px] md:text-[26px] tracking-[-0.03em] leading-[1.3] font-normal">
            © 2026 GrabV. All rights<br/>
            reserved. 88gb Digital<br/>
            Mraketing & Technology<br/>
            Company
          </p>
        </div>

        {/* Column 2: Company */}
        <div className="flex flex-col items-start">
          <h3 className="text-[#F7D80C] text-[16px] md:text-[26px] tracking-[-0.03em] font-normal mb-6">Company</h3>
          <ul className="flex flex-col space-y-0 leading-[1.1] md:leading-[1.2]">
            <li><a href="/ourstory" className="text-[#F7D80C] text-[16px] md:text-[26px] tracking-[-0.03em] hover:text-white transition-colors block py-1 md:py-0">Our Story</a></li>
            <li><a href="#" className="text-[#F7D80C] text-[16px] md:text-[26px] tracking-[-0.03em] hover:text-white transition-colors block py-1 md:py-0">Process</a></li>
            <li><a href="#" className="text-[#F7D80C] text-[16px] md:text-[26px] tracking-[-0.03em] hover:text-white transition-colors block py-1 md:py-0">Quality Promise</a></li>
            <li><a href="/contact" className="text-[#F7D80C] text-[16px] md:text-[26px] tracking-[-0.03em] hover:text-white transition-colors block py-1 md:py-0">Contact Us</a></li>
          </ul>
        </div>

        {/* Column 3: Product */}
        <div className="flex flex-col items-start">
          <h3 className="text-[#F7D80C] text-[16px] md:text-[26px] tracking-[-0.03em] font-normal mb-6">Product</h3>
          <ul className="flex flex-col space-y-0 leading-[1.1] md:leading-[1.2]">
            <li><a href="/all-purposegravy" className="text-[#F7D80C] text-[16px] md:text-[26px] tracking-[-0.03em] hover:text-white transition-colors block py-1 md:py-0">All Purpose Gravy</a></li>
            <li><a href="/all-purposegravy#ingredients" className="text-[#F7D80C] text-[16px] md:text-[26px] tracking-[-0.03em] hover:text-white transition-colors block py-1 md:py-0">Ingredients</a></li>
            <li><a href="/all-purposegravy#how-to-use" className="text-[#F7D80C] text-[16px] md:text-[26px] tracking-[-0.03em] hover:text-white transition-colors block py-1 md:py-0">How to Use</a></li>
            <li><a href="/recipes" className="text-[#F7D80C] text-[16px] md:text-[26px] tracking-[-0.03em] hover:text-white transition-colors block py-1 md:py-0">Recipes</a></li>
          </ul>
        </div>

        {/* Column 4: Order & Policies & Follow Us */}
        <div className="flex flex-col items-start">
          <h3 className="text-[#F7D80C] text-[16px] md:text-[26px] tracking-[-0.03em] font-normal mb-6">Order & Policies</h3>
          <ul className="flex flex-col space-y-0 leading-[1.1] md:leading-[1.2] mb-10">
            <li><a href="#" className="text-[#F7D80C] text-[16px] md:text-[26px] tracking-[-0.03em] hover:text-white transition-colors block py-1 md:py-0">WhatsApp Order</a></li>
            <li><a href="#" className="text-[#F7D80C] text-[16px] md:text-[26px] tracking-[-0.03em] hover:text-white transition-colors block py-1 md:py-0">Exchange Order</a></li>
            <li><a href="#" className="text-[#F7D80C] text-[16px] md:text-[26px] tracking-[-0.03em] hover:text-white transition-colors block py-1 md:py-0">Privacy Policy</a></li>
          </ul>
          
          <h3 className="text-white text-[16px] md:text-[26px] tracking-[-0.03em] font-normal mb-4">Follow Us</h3>
          <div className="flex items-center space-x-3">
            <a href="#" className="hover:opacity-80 transition-opacity">
              <img src="/images/facebook.svg" alt="Facebook" className="w-6 h-6 md:w-7 md:h-7 brightness-0 invert" />
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity">
              <img src="/images/whatsapp.svg" alt="WhatsApp" className="w-6 h-6 md:w-7 md:h-7 brightness-0 invert" />
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity">
              <img src="/images/insta.svg" alt="Instagram" className="w-6 h-6 md:w-7 md:h-7 brightness-0 invert" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

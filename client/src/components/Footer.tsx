import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-[#2a1048] text-white py-16 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ffd700] via-transparent to-[#ffd700]"></div>
      <div className="absolute -left-20 -top-20 w-40 h-40 rounded-full bg-[#8F45CF] opacity-5"></div>
      <div className="absolute right-10 bottom-10 w-60 h-60 rounded-full bg-[#ffd700] opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand / About column */}
          <div className="">
            <div className="flex items-center mb-5">
              <div className="mr-3 flex items-center justify-center w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full border border-[#ffd700]/30">
                <span className="text-[#ffd700] font-cinzel text-xl">D</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-cinzel text-xl font-bold tracking-wide">Dzyner Thoughts</span>
                <span className="text-xs text-[#ffd700]/80 font-josefin tracking-widest uppercase -mt-1">Interior Excellence</span>
              </div>
            </div>
            
            <p className="font-josefin text-white mb-6 leading-relaxed">
              We transform ordinary spaces into extraordinary experiences through thoughtful design, meticulous attention to detail, and a passion for creating interiors that inspire, comfort, and delight.
            </p>
            
            <div className="flex space-x-4 mb-6">
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#ffd700] hover:border-[#ffd700] hover:text-[#2a1048] transition-all"
                aria-label="Instagram"
              >
                <i className="bi bi-instagram"></i>
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#ffd700] hover:border-[#ffd700] hover:text-[#2a1048] transition-all"
                aria-label="Facebook"
              >
                <i className="bi bi-facebook"></i>
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#ffd700] hover:border-[#ffd700] hover:text-[#2a1048] transition-all"
                aria-label="Pinterest"
              >
                <i className="bi bi-pinterest"></i>
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#ffd700] hover:border-[#ffd700] hover:text-[#2a1048] transition-all"
                aria-label="LinkedIn"
              >
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>
          
          {/* Quick Links column */}
          <div className="">
            <h6 className="font-cinzel text-lg mb-5 text-white relative inline-block pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-[#ffd700]">
              Quick Links
            </h6>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-white hover:text-[#ffd700] transition-colors font-josefin flex items-center">
                  <i className="bi bi-chevron-right text-xs mr-2 text-[#ffd700]/70"></i>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white hover:text-[#ffd700] transition-colors font-josefin flex items-center">
                  <i className="bi bi-chevron-right text-xs mr-2 text-[#ffd700]/70"></i>
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white hover:text-[#ffd700] transition-colors font-josefin flex items-center">
                  <i className="bi bi-chevron-right text-xs mr-2 text-[#ffd700]/70"></i>
                  <span>Services</span>
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-white hover:text-[#ffd700] transition-colors font-josefin flex items-center">
                  <i className="bi bi-chevron-right text-xs mr-2 text-[#ffd700]/70"></i>
                  <span>Projects</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white hover:text-[#ffd700] transition-colors font-josefin flex items-center">
                  <i className="bi bi-chevron-right text-xs mr-2 text-[#ffd700]/70"></i>
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Services column */}
          <div className="">
            <h6 className="font-cinzel text-lg mb-5 text-white relative inline-block pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-[#ffd700]">
              Services
            </h6>
            <ul className="space-y-3">
              <li>
                <Link href="/services" className="text-white hover:text-[#ffd700] transition-colors font-josefin flex items-center">
                  <i className="bi bi-chevron-right text-xs mr-2 text-[#ffd700]/70"></i>
                  <span>Space Planning</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white hover:text-[#ffd700] transition-colors font-josefin flex items-center">
                  <i className="bi bi-chevron-right text-xs mr-2 text-[#ffd700]/70"></i>
                  <span>Color Consultation</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white hover:text-[#ffd700] transition-colors font-josefin flex items-center">
                  <i className="bi bi-chevron-right text-xs mr-2 text-[#ffd700]/70"></i>
                  <span>Furniture Selection</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white hover:text-[#ffd700] transition-colors font-josefin flex items-center">
                  <i className="bi bi-chevron-right text-xs mr-2 text-[#ffd700]/70"></i>
                  <span>3D Visualization</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white hover:text-[#ffd700] transition-colors font-josefin flex items-center">
                  <i className="bi bi-chevron-right text-xs mr-2 text-[#ffd700]/70"></i>
                  <span>Project Management</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter column */}
          <div className="">
            <h6 className="font-cinzel text-lg mb-5 text-white relative inline-block pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-[#ffd700]">
              Newsletter
            </h6>
            <p className="text-white mb-4 font-josefin">
              Subscribe to our newsletter for design tips, trends, and exclusive inspiration.
            </p>
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Your Email Address" 
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:border-[#ffd700]/70 text-white placeholder:text-gray-400 font-josefin pr-28"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1.5 bg-[#ffd700] text-[#2a1048] rounded-md font-cinzel text-xs uppercase tracking-wider hover:shadow-lg transition-all font-medium">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-white/80 font-josefin">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </div>
          </div>
        </div>
        
        {/* Divider with decorative element */}
        <div className="relative flex items-center py-2 mb-6">
          <div className="flex-grow h-px bg-white/10"></div>
          <div className="mx-4 text-[#ffd700]">
            <i className="bi bi-diamond-fill"></i>
          </div>
          <div className="flex-grow h-px bg-white/10"></div>
        </div>
        
        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-2">
          <p className="text-white/80 text-sm mb-4 md:mb-0 font-josefin">
            &copy; {new Date().getFullYear()} Dzyner Thoughts. All rights reserved.
          </p>
          <div className="flex space-x-6 text-xs text-white/80 font-josefin">
            <a href="#" className="hover:text-[#ffd700] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#ffd700] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#ffd700] transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

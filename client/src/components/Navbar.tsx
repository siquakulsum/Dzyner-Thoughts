import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import logo from "@/Assets/logo-1.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  // Handle navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo - Responsive version */}
          <Link href="/" className="flex items-center group">
              <img src={logo} alt="Dzyner Thoughts Logo" className="mr-2 h-10 sm:h-12 md:h-16 w-auto object-contain transition-all duration-300"/>
            <div className="flex flex-col">
              <span className="text-royal-DEFAULT font-cinzel text-sm sm:text-lg md:text-xl font-bold tracking-wide group-hover:text-gradient">
                Dzyner Thoughts
              </span>
              <span className="text-xs text-gray-500 font-josefin tracking-wider uppercase -mt-1 hidden sm:block">Interior Excellence</span>
            </div>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden z-50"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md">
              {isOpen ? (
                <i className="bi bi-x-lg text-royal-DEFAULT"></i>
              ) : (
                <i className="bi bi-list text-royal-DEFAULT"></i>
              )}
            </div>
          </button>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            <ul className="flex space-x-6">
              <li>
                <Link 
                  href="/" 
                  className={`nav-link px-2 py-1 ${isActive('/') ? 'active' : ''}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className={`nav-link px-2 py-1 ${isActive('/about') ? 'active' : ''}`}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/services" 
                  className={`nav-link px-2 py-1 ${isActive('/services') ? 'active' : ''}`}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link 
                  href="/projects" 
                  className={`nav-link px-2 py-1 ${isActive('/projects') ? 'active' : ''}`}
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className={`nav-link px-2 py-1 ${isActive('/contact') ? 'active' : ''}`}
                >
                  Contact
                </Link>
              </li>

            </ul>
            <Link 
              href="/contact" 
              className="ml-8 px-6 py-2.5 btn-royal rounded-full"
            >
              Get In Touch
            </Link>
          </div>
        </div>
        
        {/* Mobile menu - Full Screen Overlay */}
        <div 
          className={`fixed inset-0 bg-white/98 backdrop-blur-md transition-all duration-500 flex flex-col justify-center items-center md:hidden ${
            isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          <ul className="flex flex-col space-y-5 text-center">
            <li>
              <Link 
                href="/"
                className={`nav-link block px-2 py-1 text-xl ${isActive('/') ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/about"
                className={`nav-link block px-2 py-1 text-xl ${isActive('/about') ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link 
                href="/services"
                className={`nav-link block px-2 py-1 text-xl ${isActive('/services') ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
            </li>
            <li>
              <Link 
                href="/projects"
                className={`nav-link block px-2 py-1 text-xl ${isActive('/projects') ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                Projects
              </Link>
            </li>
            <li>
              <Link 
                href="/contact"
                className={`nav-link block px-2 py-1 text-xl ${isActive('/contact') ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </li>
            <li className="pt-6">
              <Link 
                href="/contact" 
                className="inline-block px-8 py-3 btn-royal rounded-full"
                onClick={() => setIsOpen(false)}
              >
                Get In Touch
              </Link>
            </li>
          </ul>
          
          {/* Social Media Links in Mobile Menu */}
          <div className="mt-12 flex space-x-4">
            <a 
              href="#" 
              className="w-10 h-10 rounded-full bg-royal-light/10 flex items-center justify-center text-royal-DEFAULT hover:bg-royal-DEFAULT hover:text-white transition-all"
            >
              <i className="bi bi-instagram"></i>
            </a>
            <a 
              href="#" 
              className="w-10 h-10 rounded-full bg-royal-light/10 flex items-center justify-center text-royal-DEFAULT hover:bg-royal-DEFAULT hover:text-white transition-all"
            >
              <i className="bi bi-facebook"></i>
            </a>
            <a 
              href="#" 
              className="w-10 h-10 rounded-full bg-royal-light/10 flex items-center justify-center text-royal-DEFAULT hover:bg-royal-DEFAULT hover:text-white transition-all"
            >
              <i className="bi bi-pinterest"></i>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
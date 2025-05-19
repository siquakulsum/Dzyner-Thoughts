import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center pt-5" style={{ marginTop: '70px' }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 hero-text">
            <h1 className="text-4xl md:text-5xl font-bold text-royal-DEFAULT mb-3 font-playfair">
              Transform Your Space Into a Masterpiece
            </h1>
            <p className="text-lg mb-6 font-raleway">
              We create thoughtful, elegant interiors that reflect your personality and enhance your lifestyle.
            </p>
            <div className="flex flex-wrap gap-3">
              <a 
                href="#projects" 
                className="px-4 py-2 bg-[hsl(var(--royal-DEFAULT))] text-white rounded-full text-sm font-medium transition-all duration-300 hover:bg-[hsl(var(--royal-dark))] hover:transform hover:-translate-y-0.5 hover:shadow-md"
              >
                View Our Work
              </a>
              <a 
                href="#services" 
                className="px-4 py-2 border border-gray-800 rounded-full text-sm font-medium transition-all duration-300 hover:bg-gray-100 hover:transform hover:-translate-y-0.5"
              >
                Our Services
              </a>
            </div>
            <div className="mt-10 text-center lg:hidden">
              <a href="#about" className="text-royal-DEFAULT inline-block">
                <div className="scroll-indicator">
                  <i className="bi bi-chevron-down text-2xl"></i>
                </div>
              </a>
            </div>
          </div>
          
          <div className="lg:w-1/2 hero-img mt-8 lg:mt-0">
            <img 
              src="https://images.unsplash.com/photo-1615529182904-14819c35db37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800" 
              alt="Elegant interior design showcase" 
              className="w-full object-cover rounded-lg shadow-xl"
            />
            <div className="mt-6 hidden lg:block text-center">
              <a href="#about" className="text-royal-DEFAULT inline-block">
                <div className="scroll-indicator">
                  <i className="bi bi-chevron-down text-2xl"></i>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

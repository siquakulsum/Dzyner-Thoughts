import { useEffect } from "react";
import { Link } from "wouter";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Helmet } from "react-helmet";

const Home = () => {
  const { ref } = useIntersectionObserver();

  // Add scroll animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
      observer.observe(section);
    });
    
    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Dzyner Thoughts - Interior Design Excellence</title>
        <meta name="description" content="Transform your space with Dzyner Thoughts - Premier interior design studio crafting elegant, personalized spaces that inspire and enhance your lifestyle." />
      </Helmet>

      {/* Hero Section - Luxurious and Dynamic Design */}
      <section className="min-h-screen relative overflow-hidden" ref={ref}>
        {/* Decorative Elements */}
        <div className="absolute left-0 top-20 w-32 h-32 md:w-56 md:h-56 rounded-full bg-gradient-to-r from-[hsl(var(--royal-light)/0.05)] to-[hsl(var(--royal-DEFAULT)/0.1)] blur-3xl"></div>
        <div className="absolute right-0 bottom-10 w-32 h-32 md:w-64 md:h-64 rounded-full bg-gradient-to-l from-[hsl(var(--gold-light)/0.05)] to-[hsl(var(--gold)/0.1)] blur-3xl"></div>
        
        <div className="container mx-auto px-4 pt-24 pb-10 md:py-16 h-full flex items-center">
          <div className="flex flex-col lg:flex-row items-center justify-between w-full z-10 relative">
            {/* Left Content */}
            <div className="lg:w-5/12 hero-text">
              <div className="flex items-center mb-4">
                <div className="h-px w-16 bg-gradient-to-r from-[hsl(var(--gold))] to-transparent"></div>
                <span className="ml-4 text-royal-DEFAULT font-cinzel tracking-widest uppercase text-sm">Exquisite Interiors</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-cinzel leading-tight mb-6">
                <span className="text-royal-DEFAULT">Transform Your</span> <br />
                <span className="text-gradient">Space Into Art</span>
              </h1>
              
              <p className="text-lg mb-8 font-josefin text-gray-700 max-w-xl leading-relaxed">
                We blend timeless elegance with modern sophistication to create interiors that evoke emotion, inspire living, and reflect your unique personality.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/projects" 
                  className="px-6 py-3 btn-royal rounded-full"
                >
                  Explore Portfolio
                </Link>
                <Link 
                  href="/services" 
                  className="px-6 py-3 btn-gold rounded-full"
                >
                  Our Services
                </Link>
              </div>
              
              {/* Decorative Pattern */}
              <div className="hidden lg:block absolute -left-20 bottom-0 w-32 h-32 opacity-10">
                <div className="w-full h-full border-8 border-[hsl(var(--royal-DEFAULT))] rounded-full"></div>
                <div className="w-1/2 h-1/2 border-8 border-[hsl(var(--gold))] rounded-full absolute top-1/4 left-1/4"></div>
              </div>
            </div>
            
            {/* Right Content - Layered Images */}
            <div className="lg:w-6/12 hero-img mt-12 lg:mt-0 relative">
              <div className="relative">
                {/* Main Image with Frame */}
                <div className="relative z-20 rounded-lg overflow-hidden border-8 border-white shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1615529182904-14819c35db37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800" 
                    alt="Elegant interior design showcase" 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Gold accent */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[hsl(var(--gold))] to-transparent"></div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -top-5 -left-5 w-32 h-32 border-8 border-[hsl(var(--royal-DEFAULT))] rounded-lg z-10 opacity-20"></div>
                <div className="absolute -bottom-5 -right-5 w-36 h-36 border-8 border-[hsl(var(--gold))] rounded-lg z-10 opacity-20"></div>
                
                {/* Floating accents */}
                <div className="absolute -top-10 right-20 w-20 h-20 bg-[hsl(var(--royal-light))] rounded-full opacity-10 animate-pulse"></div>
                <div className="absolute -bottom-8 left-20 w-14 h-14 bg-[hsl(var(--gold))] rounded-full opacity-10 animate-pulse"></div>
              </div>
              
              {/* Stats overlay - Adding credibility */}
              <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md p-5 rounded-lg shadow-xl border border-[hsl(var(--gold-light)/0.3)] z-30 hidden md:block">
                <div className="flex items-center space-x-4">
                  <div className="text-center px-4 border-r border-gray-200">
                    <div className="text-2xl font-cinzel text-royal-DEFAULT">10+</div>
                    <div className="text-xs uppercase tracking-wider text-gray-500">Years</div>
                  </div>
                  <div className="text-center px-4 border-r border-gray-200">
                    <div className="text-2xl font-cinzel text-royal-DEFAULT">200+</div>
                    <div className="text-xs uppercase tracking-wider text-gray-500">Projects</div>
                  </div>
                  <div className="text-center px-4">
                    <div className="text-2xl font-cinzel text-royal-DEFAULT">98%</div>
                    <div className="text-xs uppercase tracking-wider text-gray-500">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 hidden md:block">
          <div className="scroll-indicator text-royal-DEFAULT">
            <i className="bi bi-chevron-down text-3xl"></i>
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="py-16 bg-neutral-light page-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h6 className="uppercase font-bold text-royal-DEFAULT mb-2 font-montserrat">
              What We Do
            </h6>
            <h2 className="text-3xl md:text-4xl mb-3 font-playfair">
              Our Core Services
            </h2>
            <p className="text-lg mx-auto font-raleway" style={{ maxWidth: '700px' }}>
              We provide comprehensive design solutions to create spaces that are both beautiful and functional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="service-card bg-white p-6 rounded-lg shadow-sm h-full">
              <div className="flex items-center mb-3">
                <div className="bg-royal-DEFAULT p-2 rounded-full text-white mr-3">
                  <i className="bi bi-layout-text-window text-xl"></i>
                </div>
                <h3 className="text-xl font-playfair">Space Planning</h3>
              </div>
              <p className="font-raleway">Optimize your living or working environment with thoughtful space planning that maximizes functionality and flow.</p>
            </div>

            <div className="service-card bg-white p-6 rounded-lg shadow-sm h-full">
              <div className="flex items-center mb-3">
                <div className="bg-royal-DEFAULT p-2 rounded-full text-white mr-3">
                  <i className="bi bi-palette text-xl"></i>
                </div>
                <h3 className="text-xl font-playfair">Color Consultation</h3>
              </div>
              <p className="font-raleway">Select the perfect palette to create the desired ambiance and psychological effect in your space.</p>
            </div>

            <div className="service-card bg-white p-6 rounded-lg shadow-sm h-full">
              <div className="flex items-center mb-3">
                <div className="bg-royal-DEFAULT p-2 rounded-full text-white mr-3">
                  <i className="bi bi-box text-xl"></i>
                </div>
                <h3 className="text-xl font-playfair">3D Visualization</h3>
              </div>
              <p className="font-raleway">Experience your space before it's built with photorealistic 3D rendering and visualization services.</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link 
              href="/services" 
              className="inline-block px-4 py-2 bg-[hsl(var(--royal-DEFAULT))] text-white rounded-full text-sm font-medium transition-all duration-300 hover:bg-[hsl(var(--royal-dark))] hover:transform hover:-translate-y-0.5 hover:shadow-md"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-16 page-section">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <img 
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800" 
                alt="About Dzyner Thoughts" 
                className="w-full object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="lg:w-1/2 lg:pl-12">
              <h6 className="uppercase font-bold text-royal-DEFAULT mb-2 font-montserrat">
                About Us
              </h6>
              <h2 className="text-3xl md:text-4xl mb-4 font-playfair">
                Creating Spaces That Inspire
              </h2>
              <p className="text-lg mb-4 font-raleway">
                Dzyner Thoughts is a premier interior design studio dedicated to crafting bespoke spaces that reflect our clients' unique personalities and needs.
              </p>
              <p className="mb-6 font-raleway">
                With over a decade of experience in transforming homes and commercial spaces, our team of passionate designers brings creativity, precision, and innovation to every project.
              </p>
              <Link 
                href="/about" 
                className="inline-block px-4 py-2 bg-[hsl(var(--royal-DEFAULT))] text-white rounded-full text-sm font-medium transition-all duration-300 hover:bg-[hsl(var(--royal-dark))] hover:transform hover:-translate-y-0.5 hover:shadow-md"
              >
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 bg-neutral-light page-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h6 className="uppercase font-bold text-royal-DEFAULT mb-2 font-montserrat">
              Featured Work
            </h6>
            <h2 className="text-3xl md:text-4xl mb-3 font-playfair">
              Recent Projects
            </h2>
            <p className="text-lg mx-auto font-raleway" style={{ maxWidth: '700px' }}>
              Explore some of our recent transformations and get inspired for your own space.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="project-card rounded-lg overflow-hidden shadow-md">
              <div className="overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                  alt="Luxury Penthouse" 
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-4 bg-white">
                <h3 className="font-playfair text-xl mb-2">Luxury Penthouse</h3>
                <p className="text-gray-600 mb-3 font-raleway">High-end finishes and custom details for elevated living.</p>
                <Link 
                  href="/projects" 
                  className="inline-block px-3 py-1.5 bg-[hsl(var(--royal-DEFAULT))] text-white rounded-full text-sm font-medium hover:bg-[hsl(var(--royal-dark))]"
                >
                  View Details
                </Link>
              </div>
            </div>

            <div className="project-card rounded-lg overflow-hidden shadow-md">
              <div className="overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                  alt="Tech Startup Office" 
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-4 bg-white">
                <h3 className="font-playfair text-xl mb-2">Tech Startup Office</h3>
                <p className="text-gray-600 mb-3 font-raleway">Dynamic workspace designed for collaboration and creativity.</p>
                <Link 
                  href="/projects" 
                  className="inline-block px-3 py-1.5 bg-[hsl(var(--royal-DEFAULT))] text-white rounded-full text-sm font-medium hover:bg-[hsl(var(--royal-dark))]"
                >
                  View Details
                </Link>
              </div>
            </div>

            <div className="project-card rounded-lg overflow-hidden shadow-md">
              <div className="overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                  alt="Contemporary Kitchen" 
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-4 bg-white">
                <h3 className="font-playfair text-xl mb-2">Contemporary Kitchen</h3>
                <p className="text-gray-600 mb-3 font-raleway">Functional design with premium materials and smart features.</p>
                <Link 
                  href="/projects" 
                  className="inline-block px-3 py-1.5 bg-[hsl(var(--royal-DEFAULT))] text-white rounded-full text-sm font-medium hover:bg-[hsl(var(--royal-dark))]"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link 
              href="/projects" 
              className="inline-block px-4 py-2 bg-[hsl(var(--royal-DEFAULT))] text-white rounded-full text-sm font-medium transition-all duration-300 hover:bg-[hsl(var(--royal-dark))] hover:transform hover:-translate-y-0.5 hover:shadow-md"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 page-section" style={{ 
        background: `linear-gradient(rgba(95, 37, 159, 0.9), rgba(95, 37, 159, 0.9)), 
        url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=600')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl mb-4 font-playfair">Ready to Transform Your Space?</h2>
          <p className="text-lg mx-auto mb-8 font-raleway" style={{ maxWidth: '700px' }}>
            Contact us today to schedule a consultation and take the first step towards your dream space.
          </p>
          <Link 
            href="/contact" 
            className="inline-block px-6 py-3 bg-white text-royal-DEFAULT rounded-full text-lg font-medium transition-all duration-300 hover:bg-gray-100 hover:transform hover:-translate-y-0.5 hover:shadow-md"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 page-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h6 className="uppercase font-bold text-royal-DEFAULT mb-2 font-montserrat">
              Testimonials
            </h6>
            <h2 className="text-3xl md:text-4xl mb-3 font-playfair">
              What Our Clients Say
            </h2>
            <p className="text-lg mx-auto font-raleway" style={{ maxWidth: '700px' }}>
              Don't just take our word for it - hear from our satisfied clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-royal-DEFAULT mb-4">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
              </div>
              <p className="italic mb-4 font-raleway">
                "Dzyner Thoughts transformed our outdated living room into a stunning space that perfectly reflects our style. The attention to detail was impressive!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                  <img 
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" 
                    alt="Client" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h5 className="font-playfair">Amanda Lewis</h5>
                  <p className="text-sm text-gray-600">Residential Client</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-royal-DEFAULT mb-4">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
              </div>
              <p className="italic mb-4 font-raleway">
                "Working with Dzyner Thoughts on our office redesign was a seamless experience. They understood our brand and created a space that inspires creativity."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" 
                    alt="Client" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h5 className="font-playfair">Robert Chen</h5>
                  <p className="text-sm text-gray-600">Business Owner</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-royal-DEFAULT mb-4">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
              </div>
              <p className="italic mb-4 font-raleway">
                "I was impressed by the level of professionalism and creativity. They transformed my space while staying within budget and timeline. Highly recommend!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                  <img 
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" 
                    alt="Client" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h5 className="font-playfair">Sarah Johnson</h5>
                  <p className="text-sm text-gray-600">Homeowner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Preview Section */}
      <section className="py-16 bg-neutral-light page-section">
        <div className="container mx-auto px-4 text-center">
          <h6 className="uppercase font-bold text-royal-DEFAULT mb-2 font-montserrat">
            Get In Touch
          </h6>
          <h2 className="text-3xl md:text-4xl mb-3 font-playfair">
            Let's Discuss Your Project
          </h2>
          <p className="text-lg mx-auto mb-8 font-raleway" style={{ maxWidth: '700px' }}>
            Ready to transform your space? We're here to help bring your vision to life.
          </p>
          <Link 
            href="/contact" 
            className="inline-block px-6 py-3 bg-[hsl(var(--royal-DEFAULT))] text-white rounded-full text-md font-medium transition-all duration-300 hover:bg-[hsl(var(--royal-dark))] hover:transform hover:-translate-y-0.5 hover:shadow-md"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
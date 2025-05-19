import { useState, useRef, useEffect } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Service } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { motion } from "framer-motion";

const Services = () => {
  const { ref } = useIntersectionObserver();
  const [activeService, setActiveService] = useState<number | null>(null);
  const [activeProcess, setActiveProcess] = useState<number>(1);
  const serviceDetailsRef = useRef<HTMLDivElement>(null);
  
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });

  // Helper function to select a service
  const selectService = (id: number) => {
    setActiveService(id);
    
    // Scroll to service details if on mobile
    if (window.innerWidth < 1024 && serviceDetailsRef.current) {
      serviceDetailsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Set first service as active on initial load
    if (services && services.length > 0 && activeService === null) {
      setActiveService(services[0].id);
    }
  }, [services, activeService]);

  // Get the selected service
  const selectedService = services?.find(service => service.id === activeService);

  return (
    <>
      <Helmet>
        <title>Our Services | Dzyner Thoughts - Interior Design Excellence</title>
        <meta name="description" content="Explore our comprehensive interior design services - from space planning and color consultation to 3D visualization and project management." />
      </Helmet>

      {/* Elegant Hero Banner with Decorative Elements */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-r from-[#3c1867] via-[#2a1048] to-[#3c1867]">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold opacity-5 rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold opacity-5 rounded-full -translate-x-1/2 translate-y-1/2"></div>
          
          {/* Diagonal lines */}
          <div className="absolute top-0 left-0 w-full h-full opacity-5">
            <div className="absolute top-0 left-0 w-full h-full border-t-2 border-r-2 border-white transform rotate-6 origin-top-left"></div>
            <div className="absolute top-0 left-0 w-full h-full border-b-2 border-l-2 border-white transform -rotate-6 origin-bottom-right"></div>
          </div>
          
          {/* Pattern overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBtLTI4IDBhMjggMjggMCAxIDAgNTYgMCAyOCAyOCAwIDEgMC01NiAwIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iLjUiIHN0cm9rZS1vcGFjaXR5PSIuMSIvPjxwYXRoIGQ9Ik0zMCAzMG0tMjQgMGEyNCAyNCAwIDEgMCA0OCAwIDI0IDI0IDAgMSAwLTQ4IDAiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIuNSIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PHBhdGggZD0iTTMwIDMwbS0yMCAwYTIwIDIwIDAgMSAwIDQwIDAgMjAgMjAgMCAxIDAtNDAgMCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9Ii41IiBzdHJva2Utb3BhY2l0eT0iLjEiLz48cGF0aCBkPSJNMzAgMzBtLTE2IDBhMTYgMTYgMCAxIDAgMzIgMCAxNiAxNiAwIDEgMC0zMiAwIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iLjUiIHN0cm9rZS1vcGFjaXR5PSIuMSIvPjxwYXRoIGQ9Ik0zMCAzMG0tMTIgMGExMiAxMiAwIDEgMCAyNCAwIDEyIDEyIDAgMSAwLTI0IDAiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIuNSIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PHBhdGggZD0iTTMwIDMwbS04IDBhOCA4IDAgMSAwIDE2IDAgOCA4IDAgMSAwLTE2IDAiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIuNSIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PHBhdGggZD0iTTMwIDMwbS00IDBhNCA0IDAgMSAwIDggMCA0IDQgMCAxIDAtOCAwIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iLjUiIHN0cm9rZS1vcGFjaXR5PSIuMSIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center max-w-3xl mx-auto text-center">
            {/* Label */}
            <div className="inline-flex items-center mb-5">
              <span className="h-px w-8 bg-[#ffd700]"></span>
              <span className="mx-3 text-[#ffd700] font-cinzel tracking-widest text-sm uppercase">Design Excellence</span>
              <span className="h-px w-8 bg-[#ffd700]"></span>
            </div>
            
            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-cinzel text-white font-bold mb-6 leading-tight">
              Our <span className="text-[#ffd700]">Services</span>
            </h1>
            
            {/* Description */}
            <p className="text-white text-lg max-w-2xl mx-auto font-josefin leading-relaxed mb-8">
              Discover our comprehensive suite of thoughtfully crafted interior design services, tailored to transform ordinary spaces into extraordinary environments that inspire and delight.
            </p>
            
            {/* Decorative element */}
            <div className="w-24 h-1.5 mt-2 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent"></div>
          </div>
        </div>
        
        {/* Subtle scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/50"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <i className="bi bi-chevron-down text-2xl"></i>
        </motion.div>
      </section>

      {/* Interactive Services Section */}
      <motion.section 
        className="py-24 bg-[#faf8f2]"
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-16 h-16 relative">
                <div className="absolute inset-0 rounded-full border-4 border-[#ffd700]/20 animate-ping"></div>
                <div className="absolute inset-0 rounded-full border-t-4 border-[#ffd700] animate-spin"></div>
              </div>
            </div>
          ) : (
            <div className="lg:grid lg:grid-cols-5 gap-12">
              {/* Service Navigation - Interactive Side Panel */}
              <div className="lg:col-span-2 mb-12 lg:mb-0 lg:sticky lg:top-24 lg:self-start">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white p-6 rounded-2xl shadow-xl border border-[#ffd700]/10 relative overflow-hidden"
                >
                  {/* Gold accent */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ffd700] via-[#ffd700]/80 to-transparent"></div>
                  
                  <h2 className="text-3xl font-cinzel text-[#2a1048] mb-10 relative inline-block">
                    Our Services
                    <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#ffd700]"></div>
                  </h2>
                  
                  <div className="space-y-2">
                    {services?.map((service) => (
                      <motion.div
                        key={service.id}
                        className={`p-4 rounded-xl transition-all cursor-pointer ${
                          activeService === service.id 
                            ? 'bg-[#3c1867] shadow-lg shadow-[#3c1867]/10 transform -translate-x-1' 
                            : 'bg-white hover:bg-[#faf8f2]'
                        }`}
                        onClick={() => selectService(service.id)}
                        whileHover={{ x: activeService === service.id ? -4 : -2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                            activeService === service.id 
                              ? 'bg-[#ffd700]/20' 
                              : 'bg-[#3c1867]/10'
                          }`}>
                            <i className={`bi ${service.icon} ${
                              activeService === service.id 
                                ? 'text-[#ffd700]' 
                                : 'text-[#3c1867]'
                            }`}></i>
                          </div>
                          <h3 className={`font-cinzel text-lg ${
                            activeService === service.id 
                              ? 'text-white' 
                              : 'text-[#2a1048]'
                          }`}>
                            {service.title}
                          </h3>
                        </div>
                        
                        {activeService === service.id && (
                          <motion.p 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-3 text-white/80 font-josefin pl-14 text-sm"
                          >
                            {service.description.substring(0, 85)}...
                          </motion.p>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
              
              {/* Service Details - Animated Content Panel */}
              <div className="lg:col-span-3" ref={serviceDetailsRef}>
                {selectedService && (
                  <motion.div
                    key={selectedService.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden"
                  >
                    {/* Hero Image with Parallax Effect */}
                    <div className="relative h-80 overflow-hidden">
                      <motion.div
                        initial={{ scale: 1.1 }}
                        animate={{ y: 0 }}
                        style={{ 
                          backgroundImage: `url(${selectedService.id === 1
  ? 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' // Cozy living room with sofa
  : selectedService.id === 2
    ? 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=800&q=80' // Modern wooden chairs and table
    : selectedService.id === 3
      ? 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80' // Minimalist bedroom furniture
      : selectedService.id === 4
        ? 'https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&w=800&q=80' // Stylish office furniture setup
        : selectedService.id === 5
          ? 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80' // Elegant dining room furniture
          : selectedService.id === 6
            ? 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80' // New: Stylish sofa and rug setup
            : 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=800&q=80' // Warm living room corner
})`
,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          height: '100%',
                          width: '100%'
                        }}
                        className="absolute inset-0 transform"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a0833]/80 to-transparent"></div>
                      
                      {/* Service Title Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        <motion.h2 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className="text-4xl font-cinzel text-white mb-2"
                        >
                          {selectedService.title}
                        </motion.h2>
                      </div>
                    </div>
                    
                    {/* Service Content */}
                    <div className="p-8">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 rounded-full bg-[#3c1867]/10 flex items-center justify-center mr-4">
                          <i className={`bi ${selectedService.icon} text-2xl text-[#3c1867]`}></i>
                        </div>
                        <div>
                          <h4 className="font-cinzel text-[#3c1867] text-lg">What We Offer</h4>
                          <div className="w-12 h-0.5 bg-[#ffd700]/40 mt-1"></div>
                        </div>
                      </div>
                      
                      <p className="font-josefin text-gray-700 leading-relaxed mb-8">
                        {selectedService.description}
                      </p>
                      
                      {/* Key Benefits */}
                      <div className="mb-8">
                        <h4 className="font-cinzel text-[#3c1867] text-lg mb-4">Key Benefits</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          {[1, 2, 3, 4].map((item) => (
                            <motion.div 
                              key={item}
                              className="flex items-start"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.1 * item }}
                            >
                              <div className="w-6 h-6 rounded-full bg-[#ffd700]/20 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                                <i className="bi bi-check text-[#ffd700] text-lg"></i>
                              </div>
                              <p className="font-josefin text-gray-700">
                                {selectedService.id === 1 && item === 1 && "Maximize functionality of available space"}
                                {selectedService.id === 1 && item === 2 && "Improve traffic flow and spatial harmony"}
                                {selectedService.id === 1 && item === 3 && "Create zones that enhance daily activities"}
                                {selectedService.id === 1 && item === 4 && "Optimize layouts for both aesthetics and function"}
                                
                                {selectedService.id === 2 && item === 1 && "Select colors that evoke desired emotions"}
                                {selectedService.id === 2 && item === 2 && "Create harmonious color schemes throughout spaces"}
                                {selectedService.id === 2 && item === 3 && "Consider lighting effects on color perception"}
                                {selectedService.id === 2 && item === 4 && "Balance trending colors with timeless appeal"}
                                
                                {selectedService.id === 3 && item === 1 && "Source high-quality pieces matching your style"}
                                {selectedService.id === 3 && item === 2 && "Balance comfort, durability and aesthetics"}
                                {selectedService.id === 3 && item === 3 && "Access exclusive designer collections"}
                                {selectedService.id === 3 && item === 4 && "Ensure proper scale and proportion"}
                                
                                {selectedService.id === 4 && item === 1 && "Visualize design concepts before implementation"}
                                {selectedService.id === 4 && item === 2 && "Experience spaces virtually before committing"}
                                {selectedService.id === 4 && item === 3 && "Make informed decisions about materials and layouts"}
                                {selectedService.id === 4 && item === 4 && "Reduce costly design changes during implementation"}
                                
                                {selectedService.id === 5 && item === 1 && "Save time with expert contractor coordination"}
                                {selectedService.id === 5 && item === 2 && "Ensure quality execution of design vision"}
                                {selectedService.id === 5 && item === 3 && "Adhere to timelines and budgets"}
                                {selectedService.id === 5 && item === 4 && "Resolve issues promptly with minimal disruption"}
                                
                                {selectedService.id > 5 && item === 1 && "Expertise in specialized design areas"}
                                {selectedService.id > 5 && item === 2 && "Personalized approach to unique challenges"}
                                {selectedService.id > 5 && item === 3 && "Integration with overall design vision"}
                                {selectedService.id > 5 && item === 4 && "Professional guidance throughout the process"}
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      
                      {/* CTA Button */}
                      <div className="mt-8 flex justify-center">
                        <Link 
                          href="/contact" 
                          className="group relative px-8 py-4 bg-[#3c1867] text-white font-cinzel text-sm uppercase tracking-wider rounded-full overflow-hidden"
                        >
                          <span className="relative z-10">Request This Service</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-[#3c1867] to-[#6930c3] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="absolute top-0 right-full w-full h-full bg-[#ffd700]/20 transform translate-x-0 group-hover:translate-x-full transition-transform duration-500"></div>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          )}

          {/* Interactive Process Section */}
<motion.div 
  className="mt-16 md:mt-24 lg:mt-32 px-4 sm:px-6 lg:px-8"
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.7 }}
>
  <motion.div className="text-center mb-8 md:mb-12 lg:mb-16">
    <h2 className="text-3xl md:text-4xl font-cinzel text-[#2a1048] relative inline-block pb-3 mb-4 md:mb-6">
      Our Creative Process
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 md:w-24 h-0.5 bg-[#ffd700]"></div>
    </h2>
    
    <p className="text-gray-700 max-w-3xl mx-auto font-josefin text-base md:text-lg px-4">
      Our approach combines artistic vision with technical precision to create spaces 
      that elevate your everyday experience.
    </p>
  </motion.div>
  
  {/* Interactive Process Timeline */}
  <div className="relative">
    {/* Timeline track - Hidden on mobile, visible on tablets and up */}
    <div className="hidden sm:block absolute top-14 left-0 right-0 h-1 bg-[#ffd700]/20"></div>
    
    {/* Process steps with interaction */}
    <div className="flex flex-col sm:flex-row justify-between relative">
      {[
        { step: 1, title: "Discovery", description: "Understanding your needs and vision" },
        { step: 2, title: "Concept", description: "Creating initial design directions" },
        { step: 3, title: "Design", description: "Refining the perfect solution" },
        { step: 4, title: "Execution", description: "Bringing the vision to life" },
        { step: 5, title: "Reveal", description: "Unveiling your transformed space" }
      ].map((process, index, array) => (
        <div key={process.step} className={`flex-1 relative ${index < array.length - 1 ? 'mb-6 sm:mb-0' : ''}`}>
          {/* Vertical timeline for mobile */}
          {index < array.length - 1 && (
            <div className="sm:hidden absolute left-6 top-12 bottom-0 w-0.5 bg-[#ffd700]/20"></div>
          )}
          
          {/* Timeline point */}
          <div className="flex items-center sm:block">
            <motion.div 
              className={`w-12 h-12 rounded-full z-10 mx-0 sm:mx-auto cursor-pointer flex items-center justify-center ${
                activeProcess === process.step 
                  ? 'bg-[#3c1867] text-[#ffd700]' 
                  : 'bg-white text-[#3c1867] border-2 border-[#ffd700]/30'
              }`}
              onClick={() => setActiveProcess(process.step)}
              whileHover={{ scale: 1.1 }}
              animate={{ 
                scale: activeProcess === process.step ? [1, 1.1, 1] : 1,
                transition: { 
                  duration: 1.5, 
                  repeat: activeProcess === process.step ? Infinity : 0,
                  repeatType: 'mirror'
                }
              }}
            >
              <span className="font-cinzel font-bold">{process.step}</span>
            </motion.div>
            
            <div className="ml-4 sm:ml-0 sm:text-center sm:mt-4">
              <h4 className={`font-cinzel text-base sm:text-lg mb-0 sm:mb-1 ${
                activeProcess === process.step ? 'text-[#3c1867]' : 'text-gray-500'
              }`}>{process.title}</h4>
              <p className={`text-xs sm:text-sm transition-opacity duration-300 hidden sm:block ${
                activeProcess === process.step ? 'opacity-100' : 'opacity-50'
              }`}>{process.description}</p>
            </div>
          </div>
          
          {/* Progress bar fill - only shown on non-mobile */}
          <div className={`hidden sm:block absolute top-14 left-0 right-1/2 h-1 bg-[#ffd700] ${
            activeProcess >= process.step ? 'opacity-100' : 'opacity-0'
          }`}></div>
        </div>
      ))}
    </div>
    
    {/* Detailed process description */}
    <motion.div 
      key={activeProcess}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="mt-8 md:mt-16 bg-white p-4 md:p-8 rounded-xl shadow-lg border border-[#ffd700]/10"
    >
      <div className="flex flex-col md:flex-row items-start">
        <div className="hidden md:flex w-14 h-14 rounded-full bg-[#3c1867]/10 items-center justify-center mr-6 flex-shrink-0">
          <span className="text-[#3c1867] font-cinzel text-2xl font-bold">{activeProcess}</span>
        </div>
        
        <div>
          <h3 className="text-xl md:text-2xl font-cinzel text-[#3c1867] mb-3 md:mb-4">
            {activeProcess === 1 && "Discovery & Consultation"}
            {activeProcess === 2 && "Concept Development"}
            {activeProcess === 3 && "Design Refinement"}
            {activeProcess === 4 && "Implementation & Coordination"}
            {activeProcess === 5 && "Final Styling & Reveal"}
          </h3>
          
          <p className="font-josefin text-gray-700 text-sm md:text-base leading-relaxed mb-4 md:mb-6">
            {activeProcess === 1 && "Our process begins with a thorough consultation to understand your vision, needs, and lifestyle. We explore your aesthetic preferences, functional requirements, and budget considerations to establish a clear direction for your design. This phase includes site visits, measurements, and detailed discussions to capture the essence of what you want to achieve."}
            {activeProcess === 2 && "Based on our discovery phase, we create preliminary design concepts that reflect your vision. This includes mood boards, material samples, space planning ideas, and initial sketches to visualize different design directions. You'll have the opportunity to review these concepts and provide feedback, allowing us to refine our approach before moving forward."}
            {activeProcess === 3 && "Once the design direction is established, we develop detailed plans and specifications for your project. This includes finalized floor plans, elevation drawings, material selections, furniture specifications, lighting plans, and custom element designs. Every detail is carefully considered to ensure cohesion and alignment with your vision."}
            {activeProcess === 4 && "During this phase, our team coordinates the implementation of your design, working with contractors, artisans, and vendors to bring the vision to life. We manage procurement, oversee installations, and ensure quality control throughout the process. Regular site visits and progress updates keep you informed as your space transforms."}
            {activeProcess === 5 && "The final phase is where the magic happens – we add those special styling touches that elevate your space from beautiful to extraordinary. This includes arranging accessories, artwork, plants, and other decorative elements to create a cohesive, lived-in feel. The reveal day is when you experience the full transformation of your space, seeing how all the elements come together to create a harmonious environment that reflects your unique style."}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-[#faf8f2] p-3 md:p-4 rounded-lg">
                <h5 className="font-cinzel text-[#3c1867] text-xs sm:text-sm mb-1 md:mb-2">
                  {activeProcess === 1 && item === 1 && "Personal Consultation"}
                  {activeProcess === 1 && item === 2 && "Site Assessment"}
                  {activeProcess === 1 && item === 3 && "Needs Analysis"}
                  
                  {activeProcess === 2 && item === 1 && "Mood Boards"}
                  {activeProcess === 2 && item === 2 && "Material Selections"}
                  {activeProcess === 2 && item === 3 && "Concept Sketches"}
                  
                  {activeProcess === 3 && item === 1 && "Detailed Plans"}
                  {activeProcess === 3 && item === 2 && "3D Visualizations"}
                  {activeProcess === 3 && item === 3 && "Material Specifications"}
                  
                  {activeProcess === 4 && item === 1 && "Contractor Coordination"}
                  {activeProcess === 4 && item === 2 && "Installation Management"}
                  {activeProcess === 4 && item === 3 && "Quality Control"}
                  
                  {activeProcess === 5 && item === 1 && "Accessory Placement"}
                  {activeProcess === 5 && item === 2 && "Styling Touches"}
                  {activeProcess === 5 && item === 3 && "Final Reveal"}
                </h5>
                <p className="font-josefin text-xs md:text-sm text-gray-600">
                  {activeProcess === 1 && item === 1 && "In-depth discussion of your style preferences, needs, and vision."}
                  {activeProcess === 1 && item === 2 && "Evaluation of your space to identify opportunities and constraints."}
                  {activeProcess === 1 && item === 3 && "Understanding your lifestyle, budget, and timeline requirements."}
                  
                  {activeProcess === 2 && item === 1 && "Visual representations of color schemes, textures, and style direction."}
                  {activeProcess === 2 && item === 2 && "Curated selections of fabrics, finishes, and materials."}
                  {activeProcess === 2 && item === 3 && "Preliminary drawings to illustrate spatial concepts."}
                  
                  {activeProcess === 3 && item === 1 && "Comprehensive plans including dimensions and specifications."}
                  {activeProcess === 3 && item === 2 && "Realistic renderings of your future space."}
                  {activeProcess === 3 && item === 3 && "Detailed documentation of all selected materials and finishes."}
                  
                  {activeProcess === 4 && item === 1 && "Managing all trades to ensure seamless execution."}
                  {activeProcess === 4 && item === 2 && "Overseeing delivery and placement of all elements."}
                  {activeProcess === 4 && item === 3 && "Ensuring all work meets our exacting standards."}
                  
                  {activeProcess === 5 && item === 1 && "Strategic arrangement of decorative elements."}
                  {activeProcess === 5 && item === 2 && "Adding the final details that make a space sing."}
                  {activeProcess === 5 && item === 3 && "Presenting your completely transformed space."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  </div>
</motion.div>

          {/* Testimonial Section */}
          <motion.div 
            className="mt-32 bg-white rounded-2xl shadow-xl overflow-hidden relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiLz48cGF0aCBkPSJNMTAgMTBoMnYyaC0yek0zMCAxMGgydjJoLTJ6TTIwIDIwaDJ2MmgtMnoiIGZpbGw9IiNmZmQ3MDAiIGZpbGwtb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-20"></div>
            
            <div className="md:grid md:grid-cols-5 relative z-10">
              <div className="md:col-span-2">
                <img 
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=1000" 
                  alt="Happy client" 
                  className="h-full w-full object-cover"
                />
              </div>
              
              <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-center">
                <div className="mb-8">
                  <i className="bi bi-quote text-[#ffd700] text-6xl opacity-30"></i>
                </div>
                
                <blockquote className="text-xl md:text-2xl font-cinzel text-[#2a1048] mb-6 leading-relaxed">
                  Working with Dzyner Thoughts transformed not just our space, but how we live in it. Their attention to detail and ability to capture our vision was truly remarkable.
                </blockquote>
                
                <div className="mt-6">
                  <p className="font-josefin text-[#3c1867] font-semibold">— Sarah Johnson</p>
                  <p className="text-gray-600 font-josefin">Residential Client, Premium Home Redesign</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Section with Animation */}
          <div className="mt-32 relative">
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#3c1867] to-[#2a1048] opacity-95"></div>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBtLTI4IDBhMjggMjggMCAxIDAgNTYgMCAyOCAyOCAwIDEgMC01NiAwIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iLjUiIHN0cm9rZS1vcGFjaXR5PSIuMSIvPjxwYXRoIGQ9Ik0zMCAzMG0tMjQgMGEyNCAyNCAwIDEgMCA0OCAwIDI0IDI0IDAgMSAwLTQ4IDAiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIuNSIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PHBhdGggZD0iTTMwIDMwbS0yMCAwYTIwIDIwIDAgMSAwIDQwIDAgMjAgMjAgMCAxIDAtNDAgMCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9Ii41IiBzdHJva2Utb3BhY2l0eT0iLjEiLz48cGF0aCBkPSJNMzAgMzBtLTE2IDBhMTYgMTYgMCAxIDAgMzIgMCAxNiAxNiAwIDEgMC0zMiAwIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iLjUiIHN0cm9rZS1vcGFjaXR5PSIuMSIvPjxwYXRoIGQ9Ik0zMCAzMG0tMTIgMGExMiAxMiAwIDEgMCAyNCAwIDEyIDEyIDAgMSAwLTI0IDAiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIuNSIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PHBhdGggZD0iTTMwIDMwbS04IDBhOCA4IDAgMSAwIDE2IDAgOCA4IDAgMSAwLTE2IDAiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIuNSIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PHBhdGggZD0iTTMwIDMwbS00IDBhNCA0IDAgMSAwIDggMCA0IDQgMCAxIDAtOCAwIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iLjUiIHN0cm9rZS1vcGFjaXR5PSIuMSIvPjwvZz48L3N2Zz4=')] opacity-20"></div>
            </div>
            
            {/* Animated particles */}
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 15 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white/10"
                  style={{
                    width: `${Math.random() * 8 + 2}px`,
                    height: `${Math.random() * 8 + 2}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -Math.random() * 100 - 50],
                    opacity: [0, 0.8, 0]
                  }}
                  transition={{
                    duration: Math.random() * 10 + 10,
                    repeat: Infinity,
                    ease: "linear",
                    delay: Math.random() * 5
                  }}
                />
              ))}
            </div>
            
            <div className="relative z-10 py-16 px-8 md:px-16 text-center">
              <motion.h2 
                className="text-3xl md:text-5xl font-cinzel text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Ready to Transform Your Space?
              </motion.h2>
              
              <motion.p 
                className="text-white text-lg max-w-2xl mx-auto mb-10 font-josefin"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Let's collaborate to create interiors that reflect your unique style and enhance your daily living experience.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link 
                  href="/contact" 
                  className="group relative inline-block px-10 py-5 bg-[#ffd700] text-[#1a0833] font-cinzel tracking-wider uppercase text-sm rounded-full overflow-hidden shadow-xl"
                >
                  <span className="relative z-10">Schedule a Consultation</span>
                  <div className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="absolute top-0 -right-4 w-12 h-full bg-white/20 transform skew-x-[30deg] translate-x-20 group-hover:-translate-x-32 transition-transform duration-1000 ease-in-out"></div>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default Services;
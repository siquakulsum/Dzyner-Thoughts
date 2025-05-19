import { useState } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Project } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import ProjectModal from "@/components/ProjectModal";
import { Helmet } from "react-helmet";

const Projects = () => {
  const { ref } = useIntersectionObserver();
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  const categories = [
    { id: "all", label: "All" },
    { id: "residential", label: "Residential" },
    { id: "commercial", label: "Commercial" },
    { id: "modern", label: "Modern" },
    { id: "traditional", label: "Traditional" }
  ];

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects?.filter(project => project.categories.includes(activeFilter));

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300); // Clear data after closing animation
  };

  return (
    <>
      <Helmet>
        <title>Our Projects | Dzyner Thoughts - Interior Design Excellence</title>
        <meta name="description" content="Explore our portfolio of interior design projects - from residential spaces to commercial establishments, each with our signature elegant touch." />
      </Helmet>

      {/* Elegant Hero Banner with Decorative Elements */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-r from-[#3c1867] via-[#2a1048] to-[#3c1867]">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ffd700] opacity-5 rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ffd700] opacity-5 rounded-full -translate-x-1/2 translate-y-1/2"></div>
          
          {/* Pattern overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBtLTI4IDBhMjggMjggMCAxIDAgNTYgMCAyOCAyOCAwIDEgMC01NiAwIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iLjUiIHN0cm9rZS1vcGFjaXR5PSIuMSIvPjxwYXRoIGQ9Ik0zMCAzMG0tMjQgMGEyNCAyNCAwIDEgMCA0OCAwIDI0IDI0IDAgMSAwLTQ4IDAiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIuNSIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PHBhdGggZD0iTTMwIDMwbS0yMCAwYTIwIDIwIDAgMSAwIDQwIDAgMjAgMjAgMCAxIDAtNDAgMCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9Ii41IiBzdHJva2Utb3BhY2l0eT0iLjEiLz48cGF0aCBkPSJNMzAgMzBtLTE2IDBhMTYgMTYgMCAxIDAgMzIgMCAxNiAxNiAwIDEgMC0zMiAwIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iLjUiIHN0cm9rZS1vcGFjaXR5PSIuMSIvPjxwYXRoIGQ9Ik0zMCAzMG0tMTIgMGExMiAxMiAwIDEgMCAyNCAwIDEyIDEyIDAgMSAwLTI0IDAiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIuNSIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PHBhdGggZD0iTTMwIDMwbS04IDBhOCA4IDAgMSAwIDE2IDAgOCA4IDAgMSAwLTE2IDAiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIuNSIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PHBhdGggZD0iTTMwIDMwbS00IDBhNCA0IDAgMSAwIDggMCA0IDQgMCAxIDAtOCAwIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iLjUiIHN0cm9rZS1vcGFjaXR5PSIuMSIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center max-w-3xl mx-auto text-center">
            {/* Label */}
            <div className="inline-flex items-center mb-5">
              <span className="h-px w-8 bg-[#ffd700]"></span>
              <span className="mx-3 text-[#ffd700] font-cinzel tracking-widest text-sm uppercase">Portfolio</span>
              <span className="h-px w-8 bg-[#ffd700]"></span>
            </div>
            
            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-cinzel text-white font-bold mb-6 leading-tight">
              Our <span className="text-[#ffd700]">Projects</span>
            </h1>
            
            {/* Description */}
            <p className="text-white text-lg max-w-2xl mx-auto font-josefin leading-relaxed mb-8">
              Explore our portfolio of meticulously crafted interiors that embody sophistication, 
              functionality, and our signature attention to detail.
            </p>
            
            {/* Decorative element */}
            <div className="w-24 h-1.5 mt-2 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Projects Gallery Section */}
      <section 
        className="py-24 page-section"
        ref={ref}
      >
        <div className="container mx-auto px-4">
          {/* Filtering categories */}
          <div className="mb-16 text-center">
            <div className="inline-flex flex-wrap justify-center gap-3">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`filter-btn px-6 py-2.5 rounded-full font-cinzel tracking-wider text-sm uppercase transition-all ${
                    activeFilter === category.id 
                      ? 'active bg-[hsl(var(--royal-DEFAULT))] text-white border-transparent shadow-royal' 
                      : 'bg-white border border-gray-200 hover:border-[hsl(var(--gold))] shadow-sm'
                  }`}
                  onClick={() => setActiveFilter(category.id)}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-16 h-16 relative">
                <div className="absolute inset-0 rounded-full border-4 border-gold/20 animate-ping"></div>
                <div className="absolute inset-0 rounded-full border-t-4 border-gold animate-spin"></div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects?.map((project) => (
                <div 
                  key={project.id} 
                  className="project-card group rounded-lg overflow-hidden shadow-xl cursor-pointer hover-lift"
                  onClick={() => openModal(project)}
                >
                  <div className="overflow-hidden relative">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-72 object-cover"
                    />
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-royal-DEFAULT/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-6 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="font-cinzel text-xl text-white mb-2">{project.title}</h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.categories.split(',').map((category, index) => (
                            <span 
                              key={index} 
                              className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-josefin"
                            >
                              {category.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* View button that appears on hover */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      <button 
                        className="px-6 py-2.5 bg-white rounded-full font-cinzel text-royal-DEFAULT text-sm tracking-wider uppercase shadow-xl hover:bg-gold hover:text-white transition-all"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                  
                  {/* Content visible on mobile */}
                  <div className="p-6 bg-white md:hidden">
                    <h3 className="font-cinzel text-xl mb-2">{project.title}</h3>
                    <p className="text-gray-700 mb-3 font-josefin">{project.description.substring(0, 80)}...</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.categories.split(',').slice(0, 2).map((category, index) => (
                        <span 
                          key={index} 
                          className="bg-royal-DEFAULT/10 text-royal-DEFAULT text-xs px-3 py-1 rounded-full font-josefin"
                        >
                          {category.trim()}
                        </span>
                      ))}
                      {project.categories.split(',').length > 2 && (
                        <span className="text-xs px-2 py-1 text-gray-500">+{project.categories.split(',').length - 2} more</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Luxurious CTA Section */}
          <div className="mt-32 relative">
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#3c1867] to-[#2a1048] opacity-95"></div>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBtLTI4IDBhMjggMjggMCAxIDAgNTYgMCAyOCAyOCAwIDEgMC01NiAwIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iLjUiIHN0cm9rZS1vcGFjaXR5PSIuMSIvPjxwYXRoIGQ9Ik0zMCAzMG0tMjQgMGEyNCAyNCAwIDEgMCA0OCAwIDI0IDI0IDAgMSAwLTQ4IDAiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIuNSIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PHBhdGggZD0iTTMwIDMwbS0yMCAwYTIwIDIwIDAgMSAwIDQwIDAgMjAgMjAgMCAxIDAtNDAgMCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9Ii41IiBzdHJva2Utb3BhY2l0eT0iLjEiLz48cGF0aCBkPSJNMzAgMzBtLTE2IDBhMTYgMTYgMCAxIDAgMzIgMCAxNiAxNiAwIDEgMC0zMiAwIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iLjUiIHN0cm9rZS1vcGFjaXR5PSIuMSIvPjxwYXRoIGQ9Ik0zMCAzMG0tMTIgMGExMiAxMiAwIDEgMCAyNCAwIDEyIDEyIDAgMSAwLTI0IDAiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIuNSIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PHBhdGggZD0iTTMwIDMwbS04IDBhOCA4IDAgMSAwIDE2IDAgOCA4IDAgMSAwLTE2IDAiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIuNSIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PHBhdGggZD0iTTMwIDMwbS00IDBhNCA0IDAgMSAwIDggMCA0IDQgMCAxIDAtOCAwIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iLjUiIHN0cm9rZS1vcGFjaXR5PSIuMSIvPjwvZz48L3N2Zz4=')] opacity-20"></div>
            </div>
            
            <div className="relative z-10 py-16 px-6 text-center">
              <h2 className="text-3xl md:text-4xl font-cinzel text-white mb-6">Envision Your Perfect Space</h2>
              <p className="text-white text-lg max-w-2xl mx-auto mb-10 font-josefin">
                Let us transform your vision into reality. Our expert designers are ready to collaborate 
                with you to create a space that reflects your unique style and enhances your lifestyle.
              </p>
              <a 
                href="/contact" 
                className="px-8 py-4 bg-[#ffd700] text-[#2a1048] font-cinzel tracking-wider uppercase text-xs transition-all duration-300 hover:bg-[#b39700] hover:text-white hover:shadow-lg hover:transform hover:-translate-y-1 rounded-full"
              >
                Start Your Project
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          isOpen={isModalOpen} 
          onClose={closeModal} 
        />
      )}
    </>
  );
};

export default Projects;
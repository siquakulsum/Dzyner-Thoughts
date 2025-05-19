import { useState } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Project } from "@shared/schema";
import ProjectModal from "@/components/ProjectModal";

interface ProjectsSectionProps {
  projects: Project[];
}

const ProjectsSection = ({ projects }: ProjectsSectionProps) => {
  const { ref } = useIntersectionObserver();
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    { id: "all", label: "All" },
    { id: "residential", label: "Residential" },
    { id: "commercial", label: "Commercial" },
    { id: "modern", label: "Modern" },
    { id: "traditional", label: "Traditional" }
  ];

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter(project => project.categories.includes(activeFilter));

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300); // Clear data after closing animation
  };

  return (
    <section 
      id="projects" 
      className="py-16 my-8 page-section"
      ref={ref}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h6 className="uppercase font-bold text-royal-DEFAULT mb-2 font-montserrat">
            Our Recent Projects
          </h6>
          <h2 className="text-3xl md:text-4xl mb-3 font-playfair">
            Spaces We've Transformed
          </h2>
          <p className="text-lg mx-auto font-raleway" style={{ maxWidth: '700px' }}>
            Browse through our portfolio of recent interior design projects spanning residential and commercial spaces.
          </p>
        </div>

        <div className="mb-8 text-center">
          <div className="inline-flex flex-wrap justify-center gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                className={`filter-btn px-4 py-1.5 rounded-full text-sm border ${
                  activeFilter === category.id 
                    ? 'active bg-[hsl(var(--royal-DEFAULT))] text-white border-transparent' 
                    : 'border-gray-300 hover:border-[hsl(var(--royal-DEFAULT))]'
                }`}
                onClick={() => setActiveFilter(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="project-card rounded-lg overflow-hidden shadow-md h-full"
            >
              <div className="overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-4 bg-white">
                <h5 className="font-playfair text-xl mb-2">{project.title}</h5>
                <p className="text-gray-600 mb-0 font-raleway">{project.description}</p>
                <button 
                  className="mt-3 px-3 py-1.5 bg-[hsl(var(--royal-DEFAULT))] text-white rounded-full text-sm font-medium hover:bg-[hsl(var(--royal-dark))]"
                  onClick={() => openModal(project)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          isOpen={isModalOpen} 
          onClose={closeModal} 
        />
      )}
    </section>
  );
};

export default ProjectsSection;

import { Project } from "@shared/schema";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="modal-content max-w-4xl rounded-xl overflow-hidden p-0 border-gold/20">
        {/* Custom Header with gold accents */}
        <div className="modal-header relative py-4 px-6 bg-gradient-to-r from-royal-DEFAULT to-royal-dark text-white">
          <h2 className="font-cinzel text-2xl">{project.title}</h2>
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 text-white/80 hover:text-white focus:outline-none transition-colors"
            aria-label="Close dialog"
          >
            <X className="h-6 w-6" />
          </button>
          
          {/* Decorative gold line */}
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-gold via-gold/80 to-transparent"></div>
        </div>
        
        {/* Main image with enhancements */}
        <div className="modal-img-container relative">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full object-cover"
            style={{ maxHeight: '500px' }}
          />
          
          {/* Image overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60"></div>
          
          {/* Project categories in overlay */}
          <div className="absolute bottom-4 left-6 right-6 flex flex-wrap gap-2">
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
        
        {/* Content area */}
        <div className="p-8">
          {/* Project Overview */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="h-px w-6 bg-gold mr-3"></div>
              <h3 className="text-xl font-cinzel text-royal-DEFAULT">Project Overview</h3>
            </div>
            <p className="font-josefin text-gray-700 leading-relaxed">{project.details}</p>
          </div>
          
          {/* Two-column info section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Scope of Work */}
            <div className="bg-cream/30 p-6 rounded-lg border border-gold/10">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-royal-DEFAULT/10 flex items-center justify-center mr-3">
                  <i className="bi bi-list-check text-royal-DEFAULT"></i>
                </div>
                <h4 className="font-cinzel text-lg">Scope of Work</h4>
              </div>
              <ul className="space-y-2.5">
                {project.scope.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <i className="bi bi-check2-circle text-gold mr-2.5 text-lg"></i>
                    <span className="font-josefin text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Project Details */}
            <div className="bg-cream/30 p-6 rounded-lg border border-gold/10">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-royal-DEFAULT/10 flex items-center justify-center mr-3">
                  <i className="bi bi-info-circle text-royal-DEFAULT"></i>
                </div>
                <h4 className="font-cinzel text-lg">Project Details</h4>
              </div>
              <ul className="space-y-3 font-josefin">
                <li className="flex items-start">
                  <span className="w-24 text-royal-DEFAULT/80 font-semibold">Location:</span>
                  <span className="text-gray-700">{project.location}</span>
                </li>
                <li className="flex items-start">
                  <span className="w-24 text-royal-DEFAULT/80 font-semibold">Size:</span>
                  <span className="text-gray-700">{project.size}</span>
                </li>
                <li className="flex items-start">
                  <span className="w-24 text-royal-DEFAULT/80 font-semibold">Duration:</span>
                  <span className="text-gray-700">{project.duration}</span>
                </li>
                <li className="flex items-start">
                  <span className="w-24 text-royal-DEFAULT/80 font-semibold">Style:</span>
                  <span className="text-gray-700">{project.style}</span>
                </li>
                <li className="flex items-start">
                  <span className="w-24 text-royal-DEFAULT/80 font-semibold">Year:</span>
                  <span className="text-gray-700">{project.year}</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Call to action */}
          <div className="mt-8 text-center">
            <a 
              href="/contact" 
              className="inline-block px-6 py-3 btn-royal rounded-full"
            >
              Start Your Project
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;

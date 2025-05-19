import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Service } from "@shared/schema";
import { Button } from "@/components/ui/button";

interface ServicesSectionProps {
  services: Service[];
}

const ServicesSection = ({ services }: ServicesSectionProps) => {
  const { ref } = useIntersectionObserver();

  return (
    <section 
      id="services" 
      className="py-16 my-8 bg-neutral-light page-section"
      ref={ref}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h6 className="uppercase font-bold text-royal-DEFAULT mb-2 font-montserrat">
            Our Services
          </h6>
          <h2 className="text-3xl md:text-4xl mb-3 font-playfair">
            Comprehensive Design Solutions
          </h2>
          <p className="text-lg mx-auto font-raleway" style={{ maxWidth: '700px' }}>
            From conceptualization to execution, we offer a full spectrum of interior design services tailored to your unique needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="service-card bg-white p-6 rounded-lg shadow-sm h-full">
              <div className="flex items-center mb-3">
                <div className="bg-royal-DEFAULT p-2 rounded-full text-white mr-3">
                  <i className={`bi ${service.icon} text-xl`}></i>
                </div>
                <h4 className="text-xl font-playfair">{service.title}</h4>
              </div>
              <p className="font-raleway">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a 
            href="#contact" 
            className="inline-block px-4 py-2 bg-[hsl(var(--royal-DEFAULT))] text-white rounded-full text-sm font-medium transition-all duration-300 hover:bg-[hsl(var(--royal-dark))] hover:transform hover:-translate-y-0.5 hover:shadow-md"
          >
            Request a Service
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

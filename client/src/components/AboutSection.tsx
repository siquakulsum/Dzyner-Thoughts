import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const AboutSection = () => {
  const { ref } = useIntersectionObserver();

  return (
    <section 
      id="about" 
      className="py-16 my-8 page-section"
      ref={ref}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row mb-12">
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <img 
              src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800" 
              alt="Design process" 
              className="w-full object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="lg:w-1/2 lg:pl-12 flex flex-col justify-center">
            <h6 className="uppercase font-bold text-royal-DEFAULT mb-3 font-montserrat">About Us</h6>
            <h2 className="text-3xl md:text-4xl mb-4 font-playfair">Creating Spaces That Inspire</h2>
            <p className="text-lg mb-4 font-raleway">
              Dzyner Thoughts is a premier interior design studio dedicated to crafting bespoke spaces that reflect our clients' unique personalities and needs.
            </p>
            <p className="mb-4 font-raleway">
              With over a decade of experience in transforming homes and commercial spaces, our team of passionate designers brings creativity, precision, and innovation to every project.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-sm h-full">
            <div className="flex items-center mb-3">
              <div className="bg-royal-light p-2 rounded-full text-white mr-3">
                <i className="bi bi-lightbulb text-xl"></i>
              </div>
              <h4 className="text-xl font-playfair">What We Offer</h4>
            </div>
            <p className="font-raleway">
              We provide comprehensive interior design services from concept to completion, with a focus on creating spaces that are both beautiful and functional for your lifestyle.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm h-full">
            <div className="flex items-center mb-3">
              <div className="bg-royal-light p-2 rounded-full text-white mr-3">
                <i className="bi bi-eye text-xl"></i>
              </div>
              <h4 className="text-xl font-playfair">Our Vision</h4>
            </div>
            <p className="font-raleway">
              To transform ordinary spaces into extraordinary experiences through thoughtful design, innovation, and a deep understanding of how people interact with their environments.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm h-full">
            <div className="flex items-center mb-3">
              <div className="bg-royal-light p-2 rounded-full text-white mr-3">
                <i className="bi bi-flag text-xl"></i>
              </div>
              <h4 className="text-xl font-playfair">Our Mission</h4>
            </div>
            <p className="font-raleway">
              To deliver exceptional design solutions that enhance our clients' lives, while maintaining the highest standards of creativity, sustainability, and professional integrity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

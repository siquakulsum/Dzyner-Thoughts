import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Helmet } from "react-helmet";
import nadeem from "@/Assets/nadeem.jpg"

const About = () => {
  const { ref } = useIntersectionObserver();

  return (
    <>
      <Helmet>
        <title>About Us | Dzyner Thoughts - Interior Design Excellence</title>
        <meta name="description" content="Learn about Dzyner Thoughts - our vision, mission, and passion for transforming spaces into extraordinary experiences with thoughtful interior design." />
      </Helmet>

      <section
        className="py-16 mt-8 page-section"
        ref={ref}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h6 className="uppercase font-bold text-royal-DEFAULT mb-2 font-montserrat">
              About Us
            </h6>
            <h1 className="text-3xl md:text-5xl mb-3 font-playfair">
              Creating Spaces That Inspire
            </h1>
            <p className="text-lg mx-auto font-raleway" style={{ maxWidth: '700px' }}>
              Dzyner Thoughts is a premier interior design studio dedicated to crafting bespoke spaces that reflect our clients' unique personalities and needs.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row mb-12">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <img
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800"
                alt="Design process"
                className="w-full object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="lg:w-1/2 lg:pl-12 flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl mb-4 font-playfair">Our Story</h2>
              <p className="text-lg mb-4 font-raleway">
                With over a decade of experience in transforming homes and commercial spaces, our team of passionate designers brings creativity, precision, and innovation to every project.
              </p>
              <p className="mb-4 font-raleway">
                Founded in 2012, Dzyner Thoughts has grown from a small studio to a respected name in interior design, known for our attention to detail and client-focused approach.
              </p>
              <p className="mb-4 font-raleway">
                We believe that great design should be accessible to everyone, which is why we offer a range of services to suit different needs and budgets.
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

          <div className="mt-16 bg-neutral-light p-8 rounded-lg">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl mb-4 font-playfair">
                Meet the Creative Mind Behind Dzyner Thoughts
              </h2>
              <p className="text-lg mx-auto font-raleway" style={{ maxWidth: '700px' }}>
                Crafting timeless interiors with passion, vision, and expert precision.
              </p>
            </div>

            {/* Center the profile card */}
            <div className="flex justify-center">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center max-w-sm">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                  <img
                    src={nadeem}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-xl font-playfair mb-1">Mohammed Nadeem</h4>
                <p className="text-royal-DEFAULT font-medium mb-2">Founder & Lead Interior Designer</p>
                <p className="font-raleway text-sm text-gray-700">
                  With 15+ years of experience, Nadeem brings vision and elegance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
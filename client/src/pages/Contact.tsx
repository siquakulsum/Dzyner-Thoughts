import { useState } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { contactFormSchema, type ContactFormValues } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Contact = () => {
  const { ref } = useIntersectionObserver();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  });
  
  const submitMutation = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      return await apiRequest("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });
    },
    onSuccess: (data) => {
      toast({
        title: "Success!",
        description: data.message || "Thank you for your message! We will contact you soon.",
      });
      form.reset();
      setIsSubmitting(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit form. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });
  
  const onSubmit = (data: ContactFormValues) => {
    setIsSubmitting(true);
    submitMutation.mutate(data);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Dzyner Thoughts - Interior Design Excellence</title>
        <meta name="description" content="Get in touch with Dzyner Thoughts for all your interior design needs. We're ready to transform your space with our expert design solutions." />
      </Helmet>

      <section 
        className="py-16 mt-8 page-section"
        ref={ref}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h6 className="uppercase font-bold text-royal-DEFAULT mb-2 font-montserrat">
              Contact Us
            </h6>
            <h1 className="text-3xl md:text-5xl mb-3 font-playfair">
              Let's Discuss Your Project
            </h1>
            <p className="text-lg mx-auto font-raleway" style={{ maxWidth: '700px' }}>
              Ready to transform your space? We're here to help bring your vision to life.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5">
              <div className="flex items-center mb-5">
                <div className="bg-royal-light p-2 rounded-full text-white mr-3">
                  <i className="bi bi-geo-alt text-lg"></i>
                </div>
                <p className="mb-0 font-raleway">123 Design Street, Creative City, 10001</p>
              </div>
              
              <div className="flex items-center mb-5">
                <div className="bg-royal-light p-2 rounded-full text-white mr-3">
                  <i className="bi bi-envelope text-lg"></i>
                </div>
                <p className="mb-0 font-raleway">info@dzynerthoughts.com</p>
              </div>
              
              <div className="flex items-center mb-8">
                <div className="bg-royal-light p-2 rounded-full text-white mr-3">
                  <i className="bi bi-telephone text-lg"></i>
                </div>
                <p className="mb-0 font-raleway">+1 (555) 123-4567</p>
              </div>
              
              <div className="mt-10">
                <h6 className="font-montserrat mb-3">Follow Us</h6>
                <div className="flex gap-3">
                  <a href="#" className="w-10 h-10 flex items-center justify-center bg-royal-DEFAULT text-white rounded-full hover:bg-royal-dark transition-colors">
                    <i className="bi bi-instagram"></i>
                  </a>
                  <a href="#" className="w-10 h-10 flex items-center justify-center bg-royal-DEFAULT text-white rounded-full hover:bg-royal-dark transition-colors">
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a href="#" className="w-10 h-10 flex items-center justify-center bg-royal-DEFAULT text-white rounded-full hover:bg-royal-dark transition-colors">
                    <i className="bi bi-pinterest"></i>
                  </a>
                  <a href="#" className="w-10 h-10 flex items-center justify-center bg-royal-DEFAULT text-white rounded-full hover:bg-royal-dark transition-colors">
                    <i className="bi bi-linkedin"></i>
                  </a>
                </div>
              </div>

              <div className="mt-10">
                <h4 className="font-playfair text-2xl mb-4">Our Office</h4>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400" 
                    alt="Dzyner Thoughts Office" 
                    className="w-full"
                  />
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-7">
              <div className="bg-white p-6 lg:p-8 rounded-lg shadow-sm">
                <h4 className="font-playfair text-2xl mb-6">Send Us a Message</h4>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Phone (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="+1 555-123-4567" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="service"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Service Interested In</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a service" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="space-planning">Space Planning</SelectItem>
                                <SelectItem value="color-consultation">Color Consultation</SelectItem>
                                <SelectItem value="furniture-selection">Furniture Selection</SelectItem>
                                <SelectItem value="3d-visualization">3D Visualization</SelectItem>
                                <SelectItem value="lighting-design">Lighting Design</SelectItem>
                                <SelectItem value="project-management">Project Management</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about your project..." 
                              className="min-h-[150px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full py-3 bg-[hsl(var(--royal-DEFAULT))] hover:bg-[hsl(var(--royal-dark))] text-white rounded-full transition-all"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <i className="bi bi-arrow-repeat animate-spin mr-2"></i>
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <div className="bg-neutral-light p-6 rounded-lg">
              <h4 className="font-playfair text-2xl mb-4 text-center">Frequently Asked Questions</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white p-5 rounded-lg shadow-sm">
                  <h5 className="font-playfair text-lg mb-2">How does the design process work?</h5>
                  <p className="font-raleway">Our design process starts with a consultation to understand your needs, followed by concept development, detailed design, implementation, and final styling.</p>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-sm">
                  <h5 className="font-playfair text-lg mb-2">What is your pricing structure?</h5>
                  <p className="font-raleway">We offer various pricing options including hourly rates, flat fees for specific services, and comprehensive design packages tailored to your project scope.</p>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-sm">
                  <h5 className="font-playfair text-lg mb-2">How long does a typical project take?</h5>
                  <p className="font-raleway">Project timelines vary based on scope and complexity, ranging from a few weeks for simple consultations to several months for complete renovations.</p>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-sm">
                  <h5 className="font-playfair text-lg mb-2">Do you work with client-provided items?</h5>
                  <p className="font-raleway">Yes! We're happy to incorporate your existing furniture, artwork, or sentimental pieces into our designs to create a space that feels personal and meaningful.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
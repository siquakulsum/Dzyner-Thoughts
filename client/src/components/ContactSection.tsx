import { useState } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { contactFormSchema, type ContactFormValues } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
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

const ContactSection = () => {
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
      const response = await apiRequest("POST", "/api/contact", {
        ...data
      });
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Success!",
        description: data.message || "Thank you for your message! We will contact you soon.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit form. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  const onSubmit = (data: ContactFormValues) => {
    setIsSubmitting(true);
    submitMutation.mutate(data);
  };

  return (
    <section 
      id="contact" 
      className="py-16 my-8 bg-neutral-light page-section"
      ref={ref}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <h6 className="uppercase font-bold text-royal-DEFAULT mb-2 font-montserrat">
              Contact Us
            </h6>
            <h2 className="text-3xl md:text-4xl mb-4 font-playfair">
              Let's Discuss Your Project
            </h2>
            <p className="text-lg mb-6 font-raleway">
              Ready to transform your space? We're here to help bring your vision to life.
            </p>
            
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
      </div>
    </section>
  );
};

export default ContactSection;

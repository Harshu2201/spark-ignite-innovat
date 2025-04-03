
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ArrowLeft, Sparkles, Users } from "lucide-react";

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define form schema
const formSchema = z.object({
  teamName: z.string().min(3, { message: "Team name must be at least 3 characters" }),
  leaderName: z.string().min(2, { message: "Leader name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
  college: z.string().min(2, { message: "College name is required" }),
  city: z.string().min(2, { message: "City name is required" }),
  year: z.string({ required_error: "Please select your year" }),
  branch: z.string({ required_error: "Please select your branch" }),
  teamMembers: z.string().optional(),
  projectIdea: z.string().min(10, { message: "Please describe your project idea (min 10 characters)" }),
});

type FormValues = z.infer<typeof formSchema>;

const Register = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teamName: "",
      leaderName: "",
      email: "",
      phone: "",
      college: "",
      city: "",
      year: "",
      branch: "",
      teamMembers: "",
      projectIdea: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, you'd send this data to your backend
      console.log("Form submission:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store in localStorage for demo purposes (in a real app, this would go to a database)
      const existingRegistrations = JSON.parse(localStorage.getItem('registrations') || '[]');
      const updatedRegistrations = [...existingRegistrations, { ...data, id: Date.now(), date: new Date().toISOString() }];
      localStorage.setItem('registrations', JSON.stringify(updatedRegistrations));
      
      toast.success("Registration successful!", {
        description: "Your team has been registered for InnovatExpo!",
      });
      
      // Redirect to homepage after success
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed", {
        description: "Please try again later or contact support.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-expo-bg">
      <Navbar />
      
      <main className="flex-grow py-16 relative">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-radial from-expo-purple/5 via-transparent to-transparent opacity-40 z-0"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-expo-cyan/5 rounded-full filter blur-3xl z-0"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-expo-purple/5 rounded-full filter blur-3xl z-0"></div>
        
        <div className="container max-w-3xl mx-auto px-4 relative z-10">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span>Back to Home</span>
            </Link>
            
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-4">Register Your Team</h1>
              <p className="text-white/70 max-w-xl mx-auto">
                Complete the form below to register your team for InnovatExpo. Bring your innovative ideas to life!
              </p>
            </div>
          </div>
          
          <div className="bg-expo-darkBlue/60 backdrop-blur-sm rounded-xl border border-expo-cyan/20 p-6 md:p-8 shadow-lg animate-fade-in">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-expo-cyan to-expo-purple px-4 py-2 rounded-full">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-6">
                    <Users className="w-5 h-5 text-expo-cyan" />
                    <h2 className="text-xl font-semibold text-white">Team Information</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="teamName"
                      render={({ field }) => (
                        <FormItem className="relative group">
                          <FormLabel className="text-white">Team Name</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              className="border-expo-cyan/30 bg-expo-darkBlue/60 text-white focus:border-expo-cyan"
                              placeholder="Dream Innovators"
                            />
                          </FormControl>
                          <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-expo-cyan to-expo-purple group-focus-within:w-full transition-all duration-300"></div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="leaderName"
                      render={({ field }) => (
                        <FormItem className="relative group">
                          <FormLabel className="text-white">Team Leader Name</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              className="border-expo-cyan/30 bg-expo-darkBlue/60 text-white focus:border-expo-cyan"
                              placeholder="John Doe"
                            />
                          </FormControl>
                          <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-expo-cyan to-expo-purple group-focus-within:w-full transition-all duration-300"></div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="relative group">
                          <FormLabel className="text-white">Email</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="email"
                              className="border-expo-cyan/30 bg-expo-darkBlue/60 text-white focus:border-expo-cyan"
                              placeholder="you@example.com"
                            />
                          </FormControl>
                          <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-expo-cyan to-expo-purple group-focus-within:w-full transition-all duration-300"></div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem className="relative group">
                          <FormLabel className="text-white">Phone Number</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              className="border-expo-cyan/30 bg-expo-darkBlue/60 text-white focus:border-expo-cyan"
                              placeholder="9876543210"
                            />
                          </FormControl>
                          <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-expo-cyan to-expo-purple group-focus-within:w-full transition-all duration-300"></div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="college"
                      render={({ field }) => (
                        <FormItem className="relative group">
                          <FormLabel className="text-white">College</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              className="border-expo-cyan/30 bg-expo-darkBlue/60 text-white focus:border-expo-cyan"
                              placeholder="Wadia College of Engineering"
                            />
                          </FormControl>
                          <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-expo-cyan to-expo-purple group-focus-within:w-full transition-all duration-300"></div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem className="relative group">
                          <FormLabel className="text-white">City</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              className="border-expo-cyan/30 bg-expo-darkBlue/60 text-white focus:border-expo-cyan"
                              placeholder="Mumbai"
                            />
                          </FormControl>
                          <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-expo-cyan to-expo-purple group-focus-within:w-full transition-all duration-300"></div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem className="relative group">
                          <FormLabel className="text-white">Year of Study</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="border-expo-cyan/30 bg-expo-darkBlue/60 text-white focus:border-expo-cyan">
                                <SelectValue placeholder="Select Year" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-expo-darkBlue border-expo-cyan/30">
                              <SelectItem value="First Year" className="text-white hover:bg-expo-cyan/20">First Year</SelectItem>
                              <SelectItem value="Second Year" className="text-white hover:bg-expo-cyan/20">Second Year</SelectItem>
                              <SelectItem value="Third Year" className="text-white hover:bg-expo-cyan/20">Third Year</SelectItem>
                              <SelectItem value="Fourth Year" className="text-white hover:bg-expo-cyan/20">Fourth Year</SelectItem>
                            </SelectContent>
                          </Select>
                          <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-expo-cyan to-expo-purple group-focus-within:w-full transition-all duration-300"></div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="branch"
                      render={({ field }) => (
                        <FormItem className="relative group">
                          <FormLabel className="text-white">Branch</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="border-expo-cyan/30 bg-expo-darkBlue/60 text-white focus:border-expo-cyan">
                                <SelectValue placeholder="Select Branch" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-expo-darkBlue border-expo-cyan/30">
                              <SelectItem value="Computer Science" className="text-white hover:bg-expo-cyan/20">Computer Science</SelectItem>
                              <SelectItem value="Electronics" className="text-white hover:bg-expo-cyan/20">Electronics</SelectItem>
                              <SelectItem value="Mechanical" className="text-white hover:bg-expo-cyan/20">Mechanical</SelectItem>
                              <SelectItem value="Electrical" className="text-white hover:bg-expo-cyan/20">Electrical</SelectItem>
                              <SelectItem value="Civil" className="text-white hover:bg-expo-cyan/20">Civil</SelectItem>
                              <SelectItem value="Information Technology" className="text-white hover:bg-expo-cyan/20">Information Technology</SelectItem>
                              <SelectItem value="Other" className="text-white hover:bg-expo-cyan/20">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-expo-cyan to-expo-purple group-focus-within:w-full transition-all duration-300"></div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="teamMembers"
                    render={({ field }) => (
                      <FormItem className="relative group">
                        <FormLabel className="text-white">Team Members (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            className="border-expo-cyan/30 bg-expo-darkBlue/60 text-white focus:border-expo-cyan min-h-[80px]"
                            placeholder="List names of other team members (if any)"
                          />
                        </FormControl>
                        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-expo-cyan to-expo-purple group-focus-within:w-full transition-all duration-300"></div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="projectIdea"
                    render={({ field }) => (
                      <FormItem className="relative group">
                        <FormLabel className="text-white">Project Idea</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            className="border-expo-cyan/30 bg-expo-darkBlue/60 text-white focus:border-expo-cyan min-h-[100px]"
                            placeholder="Briefly describe your innovation or project idea"
                          />
                        </FormControl>
                        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-expo-cyan to-expo-purple group-focus-within:w-full transition-all duration-300"></div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="pt-4 flex justify-center">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-expo-cyan to-expo-purple hover:shadow-lg hover:shadow-expo-cyan/20 text-white px-8 py-6 relative overflow-hidden group w-full max-w-md"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? 'Registering...' : 'Submit Registration'}
                      <Sparkles className="w-5 h-5" />
                    </span>
                    <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;

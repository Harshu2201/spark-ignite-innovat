
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  useEffect(() => {
    // Create particles for background effect
    const particlesContainer = document.querySelector('.particles-container');
    if (particlesContainer) {
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random particle
        const size = Math.random() * 10 + 5;
        const type = Math.random() > 0.5 ? 'circle' : 'square';
        
        // Random position
        const xPos = Math.random() * 100;
        const yPos = Math.random() * 100;
        
        // Random animation delay
        const animationDelay = Math.random() * 10;
        
        // Random color from our theme
        const colors = ['#00F0FF', '#7B42F6', '#FF2E63'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${xPos}%`;
        particle.style.top = `${yPos}%`;
        particle.style.backgroundColor = color;
        particle.style.opacity = `${Math.random() * 0.5 + 0.1}`;
        particle.style.borderRadius = type === 'circle' ? '50%' : '0';
        particle.style.animationDelay = `${animationDelay}s`;
        
        // Add the particle to the container with animation
        particle.classList.add('animate-particle-move');
        particlesContainer.appendChild(particle);
      }
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Particles background */}
      <div className="particles-container"></div>
      
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-expo-darkBlue bg-opacity-70 z-0"></div>
      
      {/* Animated glow elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-expo-purple rounded-full filter blur-[100px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-expo-cyan rounded-full filter blur-[100px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="container mx-auto px-4 z-10 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
          <span className="block text-white">Where Ideas </span>
          <span className="text-gradient neon-glow">Spark, Innovation Ignites!</span>
        </h1>
        
        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8">
          Join Wadia College of Engineering's premier innovation showcase event and turn your ideas into reality with industry mentorship and amazing cash prizes.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button className="bg-gradient-to-r from-expo-cyan to-expo-purple text-white hover:shadow-lg hover:shadow-expo-cyan/50 px-8 py-6 text-lg relative overflow-hidden group">
            <span className="relative z-10">Register Now</span>
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
          </Button>
          
          <Button variant="outline" className="border-expo-cyan text-expo-cyan hover:bg-expo-cyan/10 px-8 py-6 text-lg">
            Learn More
          </Button>
        </div>
        
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <span className="text-white/70 mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

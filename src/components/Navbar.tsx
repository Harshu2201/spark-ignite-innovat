
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-expo-darkBlue/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white mr-10">
              <span className="text-gradient">Innovat</span>
              <span className="text-white">Expo</span>
            </h1>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-white hover:text-expo-cyan transition-colors">About</a>
              <a href="#prizes" className="text-white hover:text-expo-cyan transition-colors">Prizes</a>
              <a href="#register" className="text-white hover:text-expo-cyan transition-colors">Register</a>
              <a href="#contact" className="text-white hover:text-expo-cyan transition-colors">Contact</a>
            </div>
          </div>
          
          <div className="hidden md:block">
            <Button className="bg-gradient-to-r from-expo-cyan to-expo-purple text-white hover:from-expo-purple hover:to-expo-cyan transition-all duration-300 shadow-lg hover:shadow-expo-cyan/20">
              Register Now
            </Button>
          </div>
          
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-expo-darkBlue/95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a 
              href="#about" 
              className="text-white hover:text-expo-cyan transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#prizes" 
              className="text-white hover:text-expo-cyan transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Prizes
            </a>
            <a 
              href="#register" 
              className="text-white hover:text-expo-cyan transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Register
            </a>
            <a 
              href="#contact" 
              className="text-white hover:text-expo-cyan transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
            <Button 
              className="bg-gradient-to-r from-expo-cyan to-expo-purple text-white hover:from-expo-purple hover:to-expo-cyan transition-all duration-300 shadow-lg hover:shadow-expo-cyan/20 w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              Register Now
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

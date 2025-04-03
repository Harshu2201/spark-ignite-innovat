
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import InfoCards from '@/components/InfoCards';
import PrizesSection from '@/components/PrizesSection';
import CountdownTimer from '@/components/CountdownTimer';
import RegisterSection from '@/components/RegisterSection';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Update the document title
    document.title = 'InnovatExpo - Where Ideas Spark, Innovation Ignites!';
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <InfoCards />
        <PrizesSection />
        <CountdownTimer />
        <RegisterSection />
      </main>
      <Footer />
      
      {/* Admin link - subtle in the corner */}
      <div className="fixed bottom-4 right-4 z-10">
        <Link 
          to="/admin/login" 
          className="text-white/30 hover:text-white/70 text-xs transition-colors duration-300"
        >
          Admin
        </Link>
      </div>
    </div>
  );
};

export default Index;


import React, { useEffect } from 'react';
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
    </div>
  );
};

export default Index;

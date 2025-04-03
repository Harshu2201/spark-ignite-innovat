
import React from 'react';
import { Calendar, Lightbulb, Trophy, Gift } from 'lucide-react';

const InfoCards = () => {
  const cards = [
    {
      title: "Event Date",
      icon: <Calendar className="w-12 h-12 text-expo-cyan" />,
      frontContent: "Mark Your Calendar",
      backContent: "May 15-16, 2025 at Wadia College of Engineering Campus",
    },
    {
      title: "Cash Prizes",
      icon: <Trophy className="w-12 h-12 text-expo-pink" />,
      frontContent: "Win Big",
      backContent: "Total prize pool of ₹1,50,000 with ₹55,000 for 1st place",
    },
    {
      title: "Innovation Categories",
      icon: <Lightbulb className="w-12 h-12 text-expo-purple" />,
      frontContent: "Show Your Skills",
      backContent: "Software, Hardware, AI/ML, Sustainability, and Open Innovation",
    },
    {
      title: "Industry Exposure",
      icon: <Gift className="w-12 h-12 text-expo-cyan" />,
      frontContent: "Connect With Leaders",
      backContent: "Mentorship, internship opportunities, and industry recognition",
    },
  ];

  return (
    <section id="about" className="py-24 bg-expo-darkBlue">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">About InnovatExpo</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            InnovatExpo is Wadia College of Engineering's flagship innovation showcase event, bringing together bright minds, cutting-edge technology, and industry experts.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, index) => (
            <div key={index} className="flip-card h-64">
              <div className="flip-card-inner w-full h-full">
                {/* Front of card */}
                <div className="flip-card-front absolute w-full h-full bg-expo-bg border border-expo-cyan/20 rounded-lg p-6 flex flex-col items-center justify-center text-center transition-all hover:border-expo-cyan">
                  <div className="mb-4">{card.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
                  <p className="text-expo-cyan">{card.frontContent}</p>
                  <div className="mt-4 text-white/50 text-sm">Hover to learn more</div>
                </div>
                
                {/* Back of card */}
                <div className="flip-card-back absolute w-full h-full bg-gradient-to-b from-expo-bg to-expo-darkBlue border border-expo-cyan rounded-lg p-6 flex flex-col items-center justify-center text-center">
                  <h3 className="text-xl font-bold text-expo-cyan mb-4">{card.title}</h3>
                  <p className="text-white">{card.backContent}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoCards;

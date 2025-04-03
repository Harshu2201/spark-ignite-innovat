
import React, { useState } from 'react';
import { Trophy } from 'lucide-react';

const PrizesSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const prizes = [
    {
      place: "1st",
      amount: "₹55,000",
      extras: "Industry Mentorship & Internship Opportunity",
      color: "from-yellow-300 to-yellow-500"
    },
    {
      place: "2nd",
      amount: "₹35,000",
      extras: "Industry Mentorship & Product Development Support",
      color: "from-gray-300 to-gray-500"
    },
    {
      place: "3rd",
      amount: "₹20,000",
      extras: "Product Development Support",
      color: "from-amber-700 to-amber-900"
    },
    {
      place: "Special Mentions",
      amount: "₹10,000",
      extras: "For Most Innovative Idea & Best Technical Implementation",
      color: "from-expo-cyan to-expo-purple"
    }
  ];

  return (
    <section id="prizes" className="py-24 bg-expo-bg relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-expo-purple/20 via-transparent to-transparent opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Exciting Prizes</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Win big with our amazing prize pool and get recognized for your innovative ideas.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {prizes.map((prize, index) => (
            <div
              key={index}
              className="bg-expo-darkBlue p-6 rounded-lg border border-transparent hover:border-expo-cyan/50 transition-all duration-300 transform hover:-translate-y-2"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex justify-center mb-6">
                <div className={`relative ${hoveredIndex === index ? 'animate-shake' : ''}`}>
                  <Trophy size={48} className={`text-transparent bg-gradient-to-b ${prize.color} bg-clip-text`} />
                  <div className={`absolute inset-0 blur-lg bg-gradient-to-b ${prize.color} opacity-30 rounded-full scale-150 ${hoveredIndex === index ? 'animate-pulse' : ''}`}></div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-white text-center mb-2">{prize.place} Place</h3>
              <div className="text-center mb-4">
                <span className={`text-3xl font-bold bg-gradient-to-r ${prize.color} text-transparent bg-clip-text`}>
                  {prize.amount}
                </span>
              </div>
              <p className="text-white/70 text-center text-sm">{prize.extras}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-white/80 font-medium">
            All participants will receive certificates and merchandize from our sponsors.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrizesSection;

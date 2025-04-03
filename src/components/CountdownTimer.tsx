
import React, { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = () => {
  // Set the event date (example: May 15, 2025)
  const eventDate = new Date('2025-05-15T09:00:00');
  
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = eventDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [eventDate]);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <section className="py-16 bg-expo-darkBlue">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 text-white">Event Starts In</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-expo-cyan to-expo-purple mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {timeUnits.map((unit, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-full aspect-square bg-expo-bg rounded-lg flex items-center justify-center border border-expo-cyan/30 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-expo-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="text-4xl md:text-5xl font-bold text-gradient">{unit.value.toString().padStart(2, '0')}</span>
              </div>
              <span className="mt-2 text-white/70">{unit.label}</span>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <p className="text-white/80 animate-pulse">
            Registration closes in 7 days! Don't miss your chance.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CountdownTimer;

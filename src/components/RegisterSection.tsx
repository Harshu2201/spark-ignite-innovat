
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Mock QR code image URL
const qrCodeUrl = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjU2IDI1NiI+PHJlY3Qgd2lkdGg9IjI1NiIgaGVpZ2h0PSIyNTYiIGZpbGw9IiMwMGYwZmYiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PHJlY3QgeD0iMzIiIHk9IjMyIiB3aWR0aD0iMTkyIiBoZWlnaHQ9IjE5MiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDBmMGZmIiBzdHJva2Utd2lkdGg9IjQiLz48cmVjdCB4PSI2NCIgeT0iNjQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0iIzAwZjBmZiIvPjxyZWN0IHg9IjE1MiIgeT0iNjQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0iIzAwZjBmZiIvPjxyZWN0IHg9IjY0IiB5PSIxNTIiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0iIzAwZjBmZiIvPjxyZWN0IHg9IjEyMCIgeT0iOTYiIHdpZHRoPSIxNiIgaGVpZ2h0PSI2NCIgZmlsbD0iIzAwZjBmZiIvPjxyZWN0IHg9IjE1MiIgeT0iMTI4IiB3aWR0aD0iNDAiIGhlaWdodD0iMTYiIGZpbGw9IiMwMGYwZmYiLz48cmVjdCB4PSIxNTIiIHk9IjE2MCIgd2lkdGg9IjE2IiBoZWlnaHQ9IjMyIiBmaWxsPSIjMDBmMGZmIi8+PHJlY3QgeD0iMTc2IiB5PSIxNzYiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgZmlsbD0iIzAwZjBmZiIvPjwvc3ZnPg==";

const RegisterSection = () => {
  return (
    <section id="register" className="py-24 bg-expo-bg relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-expo-purple/10 via-transparent to-transparent opacity-40"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">Register Now</h2>
            <p className="text-white/80 mb-8 max-w-xl">
              Don't miss this opportunity to showcase your innovations, connect with industry experts, and win amazing prizes. Registration is free for all students of Wadia College of Engineering!
            </p>
            
            <div className="mb-10">
              <h3 className="text-xl font-semibold text-white mb-4">Registration Includes:</h3>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-expo-cyan mt-2 mr-2"></span>
                  <span>Access to all InnovatExpo events and workshops</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-expo-cyan mt-2 mr-2"></span>
                  <span>Opportunity to present your innovation to industry experts</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-expo-cyan mt-2 mr-2"></span>
                  <span>Certificate of participation and event merchandise</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-expo-cyan mt-2 mr-2"></span>
                  <span>Networking opportunities with potential employers</span>
                </li>
              </ul>
            </div>
            
            <Link to="/register">
              <Button variant="gradient" size="xl" className="w-full sm:w-auto">
                <span className="relative z-10 flex items-center justify-center">
                  Register Your Team
                  <ArrowRight className="ml-2" />
                </span>
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              </Button>
            </Link>
          </div>
          
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="bg-expo-darkBlue p-8 rounded-lg border border-expo-cyan/30 max-w-sm w-full">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">Scan QR Code</h3>
                <p className="text-white/60 text-sm">
                  Use your phone camera to scan the QR code for quick registration
                </p>
              </div>
              
              <div className="flex justify-center mb-6">
                <div className="p-2 bg-white rounded-lg relative group">
                  <img 
                    src={qrCodeUrl} 
                    alt="Registration QR Code" 
                    className="w-48 h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center bg-expo-cyan/10 rounded-lg">
                    <span className="text-expo-darkBlue font-medium">Tap to enlarge</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center text-white/70 text-sm">
                Or register by email at <span className="text-expo-cyan">innovatexpo@wadia.edu</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterSection;

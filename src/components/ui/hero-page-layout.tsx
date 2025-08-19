import React from 'react';
import { Scene } from "@/components/ui/hero-section";

interface HeroPageLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

const HeroPageLayout: React.FC<HeroPageLayoutProps> = ({ children, title, description }) => {
  return (
    <div className="relative w-full min-h-svh overflow-hidden bg-gradient-to-br from-[#000] to-[#1A2428]">
      {/* Background Animation Container */}
      <div className="fixed inset-0 z-0">
        <Scene className="w-full h-full" />
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 min-h-svh flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-6xl space-y-12">
          {/* Hero Section */}
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="space-y-6 flex items-center justify-center flex-col pt-16">
              <h1 className="text-3xl md:text-6xl font-semibold tracking-tight max-w-4xl text-white">
                {title}
              </h1>
              <p className="text-lg text-neutral-300 max-w-2xl">
                {description}
              </p>
            </div>
          </div>
          
          {/* Page Content */}
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroPageLayout;
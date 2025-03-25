
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const { width, height, left, top } = heroRef.current.getBoundingClientRect();
      
      const xPos = (clientX - left) / width;
      const yPos = (clientY - top) / height;
      
      const moveX = 30 * (xPos - 0.5);
      const moveY = 30 * (yPos - 0.5);
      
      heroRef.current.style.setProperty('--move-x', `${moveX}px`);
      heroRef.current.style.setProperty('--move-y', `${moveY}px`);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-4 sm:px-6 lg:px-8"
      style={{ 
        '--move-x': '0px', 
        '--move-y': '0px'
      } as React.CSSProperties}
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-background to-purple-900/20 animate-move-background z-0"></div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-30 z-0"></div>
      
      {/* Floating orbs */}
      <div 
        className="absolute w-64 h-64 rounded-full bg-blue-500/10 blur-3xl animate-pulse-glow z-0"
        style={{ 
          top: '20%', 
          left: '15%',
          transform: 'translate(calc(var(--move-x) * -0.5), calc(var(--move-y) * -0.5))'
        }}
      ></div>
      <div 
        className="absolute w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl animate-pulse-glow z-0"
        style={{ 
          bottom: '15%', 
          right: '10%',
          animationDelay: '1s',
          transform: 'translate(calc(var(--move-x) * 0.5), calc(var(--move-y) * 0.5))'
        }}
      ></div>
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="inline-block animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <span className="inline-flex items-center rounded-full px-4 py-1 text-sm font-medium bg-primary/10 text-primary mb-6">
            The Future of Finance
          </span>
        </div>
        
        <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <span className="text-gradient">Secure. Decentralized.</span>
          <br />
          <span>Revolutionary Crypto</span>
        </h1>
        
        <p className="mt-6 text-lg md:text-xl text-white/70 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.6s' }}>
          Experience the next generation of cryptocurrency with advanced security features, 
          lightning-fast transactions, and a truly decentralized architecture built for the future.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-lg py-6 px-8">
            Get Started
          </Button>
          <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10 hover:text-white text-lg py-6 px-8">
            View Documentation <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
        
        <div className="mt-16 flex justify-center space-x-8 md:space-x-16 animate-fade-in" style={{ animationDelay: '1s' }}>
          <div className="glass-card p-6 rounded-lg w-24 h-24 flex flex-col items-center justify-center">
            <div className="text-xl font-bold text-white">45k+</div>
            <div className="text-sm text-white/70">Users</div>
          </div>
          <div className="glass-card p-6 rounded-lg w-24 h-24 flex flex-col items-center justify-center">
            <div className="text-xl font-bold text-white">$2B+</div>
            <div className="text-sm text-white/70">Volume</div>
          </div>
          <div className="glass-card p-6 rounded-lg w-24 h-24 flex flex-col items-center justify-center">
            <div className="text-xl font-bold text-white">99.9%</div>
            <div className="text-sm text-white/70">Uptime</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

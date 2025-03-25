
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-background/80 backdrop-blur-xl shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-xl font-semibold text-white">Quantum<span className="text-primary">Crypto</span></span>
            </a>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <a href="#features" className="text-white/80 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="text-white/80 hover:text-white transition-colors">How it Works</a>
              <a href="#stats" className="text-white/80 hover:text-white transition-colors">Stats</a>
              <div className="relative group">
                <button className="flex items-center text-white/80 hover:text-white transition-colors">
                  Resources
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-background border border-white/10 backdrop-blur-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right">
                  <a href="#" className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5">Documentation</a>
                  <a href="#" className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5">Whitepaper</a>
                  <a href="#" className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5">Blog</a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block">
            <Button variant="outline" className="mr-4 text-white border-white/20 hover:bg-white/10 hover:text-white">
              Log In
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-white">
              Get Started
            </Button>
          </div>
          
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-1"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        mobileMenuOpen ? 'max-h-screen opacity-100 visible' : 'max-h-0 opacity-0 invisible'
      } overflow-hidden bg-background/95 backdrop-blur-xl`}>
        <div className="px-4 pt-2 pb-4 space-y-3">
          <a href="#features" className="block text-white/80 hover:text-white py-2 transition-colors">Features</a>
          <a href="#how-it-works" className="block text-white/80 hover:text-white py-2 transition-colors">How it Works</a>
          <a href="#stats" className="block text-white/80 hover:text-white py-2 transition-colors">Stats</a>
          <a href="#" className="block text-white/80 hover:text-white py-2 transition-colors">Resources</a>
          <div className="pt-2 flex flex-col space-y-2">
            <Button variant="outline" className="w-full justify-center text-white border-white/20 hover:bg-white/10 hover:text-white">
              Log In
            </Button>
            <Button className="w-full justify-center bg-primary hover:bg-primary/90 text-white">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

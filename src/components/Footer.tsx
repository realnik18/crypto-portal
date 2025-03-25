
import React from 'react';
import { Github, Twitter, Linkedin, Instagram, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-background py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div>
            <a href="/" className="inline-block mb-6">
              <span className="text-2xl font-bold text-white">Quantum<span className="text-primary">Crypto</span></span>
            </a>
            <p className="text-white/70 mb-6">
              A revolutionary cryptocurrency platform built for security, speed, and accessibility.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="h-10 w-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors">
                <Github size={18} />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Product</h3>
            <ul className="space-y-4">
              {['Features', 'Security', 'Roadmap', 'Pricing', 'FAQ'].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Resources</h3>
            <ul className="space-y-4">
              {['Documentation', 'Whitepaper', 'API', 'Status', 'Blog'].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Company</h3>
            <ul className="space-y-4">
              {['About', 'Team', 'Careers', 'Contact', 'Partners'].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10">
          <p className="text-white/50 text-sm mb-4 md:mb-0">
            © 2023 QuantumCrypto. All rights reserved.
          </p>
          
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">Cookie Policy</a>
          </div>
          
          <button 
            onClick={scrollToTop}
            className="mt-6 md:mt-0 h-10 w-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

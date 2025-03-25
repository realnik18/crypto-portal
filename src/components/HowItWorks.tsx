
import React from 'react';
import { Wallet, ArrowRight, BarChart3, ShieldCheck } from 'lucide-react';

const steps = [
  {
    icon: Wallet,
    title: 'Create Your Wallet',
    description: 'Set up your secure digital wallet in minutes with our user-friendly interface.',
    delay: '0.2s',
    color: 'from-blue-500 to-blue-700'
  },
  {
    icon: ArrowRight,
    title: 'Purchase Tokens',
    description: 'Buy tokens using multiple payment methods with competitive exchange rates.',
    delay: '0.4s',
    color: 'from-indigo-500 to-indigo-700'
  },
  {
    icon: BarChart3,
    title: 'Trade & Stake',
    description: 'Trade with other cryptocurrencies or stake to earn passive income.',
    delay: '0.6s',
    color: 'from-purple-500 to-purple-700'
  },
  {
    icon: ShieldCheck,
    title: 'Secure & Monitor',
    description: 'Advanced security keeps your assets safe while real-time analytics track performance.',
    delay: '0.8s',
    color: 'from-pink-500 to-pink-700'
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-black/30">
      <div className="absolute inset-0 bg-dots"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <span className="inline-block text-primary font-medium mb-2 animate-fade-in">HOW IT WORKS</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Simple & Secure Process
          </h2>
          <p className="text-white/70 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Our straightforward process ensures that anyone, regardless of technical background,
            can easily get started with cryptocurrency.
          </p>
        </div>
        
        <div className="relative mt-20">
          {/* Connection line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/50 via-indigo-500/50 to-purple-500/50 transform -translate-y-1/2 hidden md:block"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center text-center animate-fade-in"
                style={{ animationDelay: step.delay }}
              >
                <div className={`relative z-10 w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-lg`}>
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-xl font-semibold text-white mb-3">{index + 1}. {step.title}</div>
                <p className="text-white/70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 p-6 sm:p-8 rounded-xl border border-white/5 animate-fade-in" style={{ animationDelay: '1s' }}>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">Ready to get started?</h3>
              <p className="text-white/70">Join thousands of users already using our platform</p>
            </div>
            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;


import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Mail } from 'lucide-react';

const Newsletter = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-background to-purple-900/30 z-0"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="glass-card p-8 md:p-12 rounded-2xl border border-white/10 backdrop-blur-xl relative overflow-hidden">
          {/* Background elements */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/10 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-t from-blue-500/10 to-transparent"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <Mail className="h-12 w-12 text-primary mb-6" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                Stay Updated on Latest News
              </h2>
              <p className="text-white/70 mb-6 max-w-lg">
                Subscribe to our newsletter to receive updates on new features, security enhancements, 
                market insights, and exclusive offers.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-primary"
                />
                <Button className="bg-primary hover:bg-primary/90 text-white shrink-0">
                  Subscribe <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              <p className="text-white/50 text-sm mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
            
            <div className="hidden md:block w-px h-64 bg-white/10"></div>
            
            <div className="flex-1 md:pl-6">
              <h3 className="text-xl font-semibold text-white mb-6">Benefits of Joining</h3>
              
              <ul className="space-y-4">
                {[
                  'Exclusive market insights and analysis',
                  'Early access to new features and products',
                  'Educational content on blockchain technology',
                  'Community events and webinar invitations',
                  'Special promotions and partnership announcements'
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 mr-3 shrink-0">
                      <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;


import React from 'react';
import { Shield, Zap, Globe, Lock, RefreshCw, Users } from 'lucide-react';

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  delay 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string; 
  delay: string;
}) => {
  return (
    <div 
      className="glass-card glass-card-hover p-6 rounded-xl animate-fade-in"
      style={{ animationDelay: delay }}
    >
      <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-5">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-white/70">{description}</p>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: 'Advanced Security',
      description: 'Military-grade encryption and multi-signature technology to secure your digital assets.',
      delay: '0.2s'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Transaction speeds of 5,000+ per second with near-zero confirmation times.',
      delay: '0.3s'
    },
    {
      icon: Globe,
      title: 'Globally Accessible',
      description: 'Available in 150+ countries with localized support and integrations.',
      delay: '0.4s'
    },
    {
      icon: Lock,
      title: 'Privacy First',
      description: 'Zero-knowledge proofs ensure your transactions remain private and secure.',
      delay: '0.5s'
    },
    {
      icon: RefreshCw,
      title: 'Sustainable',
      description: 'Eco-friendly consensus mechanism that uses minimal energy resources.',
      delay: '0.6s'
    },
    {
      icon: Users,
      title: 'Community Governed',
      description: 'Transparent, decentralized governance giving power back to users.',
      delay: '0.7s'
    }
  ];

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-primary font-medium mb-2 animate-fade-in">FEATURES</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Cutting Edge Technology
          </h2>
          <p className="text-white/70 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Our platform combines innovative blockchain technology with user-friendly interfaces,
            delivering a seamless experience that redefines digital finance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index} 
              icon={feature.icon} 
              title={feature.title} 
              description={feature.description} 
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Features;

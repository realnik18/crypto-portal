
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import Stats from '@/components/Stats';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

const Index = () => {
  console.log("Index component rendering");
  
  useEffect(() => {
    console.log("Index component mounted");
    
    // Add smooth reveal animation for sections as they come into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    const sections = document.querySelectorAll('section');
    console.log("Found sections:", sections.length);
    
    sections.forEach(section => {
      section.classList.add('opacity-0');
      observer.observe(section);
    });
    
    return () => {
      if (sections) {
        sections.forEach(section => observer.unobserve(section));
      }
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-background text-white overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Stats />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import HeroSection from './components/HeroSection';
import BenefitsSection from './components/BenefitsSection';
import FeaturesShowcase from './components/FeaturesShowcase';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

const LandingPage = () => {
  useEffect(() => {
    // Smooth scroll behavior for anchor links
    const handleSmoothScroll = (e) => {
      const target = e?.target?.getAttribute('href');
      if (target && target?.startsWith('#')) {
        e?.preventDefault();
        const element = document.querySelector(target);
        if (element) {
          element?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  return (
    <>
      <Helmet>
        <title>Students Attendance Hub - QR Code Attendance Management System</title>
        <meta 
          name="description" 
          content="Transform your educational institution with cutting-edge QR code attendance tracking. Real-time reporting, administrative control, and mobile-optimized design." 
        />
        <meta name="keywords" content="attendance management, QR code, education, student tracking, school administration" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Students Attendance Hub - QR Code Attendance Management" />
        <meta property="og:description" content="Revolutionize attendance tracking with QR code technology" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/landing-page" />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* Hero Section */}
        <HeroSection />

        {/* Benefits Section */}
        <BenefitsSection />

        {/* Features Showcase */}
        <FeaturesShowcase />

        {/* Call to Action Section */}
        <CTASection />

        {/* Footer */}
        <Footer />

        {/* Background Animation Elements */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-32 bg-gradient-to-b from-primary/20 to-transparent animate-pulse transform rotate-12 opacity-30"></div>
          <div className="absolute top-3/4 right-1/4 w-2 h-24 bg-gradient-to-b from-accent/20 to-transparent animate-pulse delay-500 transform -rotate-12 opacity-20"></div>
          <div className="absolute top-1/2 right-1/3 w-1 h-20 bg-gradient-to-b from-primary/30 to-transparent animate-pulse delay-1000 opacity-40"></div>
          <div className="absolute bottom-1/4 left-1/2 w-1 h-16 bg-gradient-to-b from-accent/25 to-transparent animate-pulse delay-1500 opacity-25"></div>
        </div>

        {/* Scroll to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center neon-hover lightning-transition z-50 opacity-80 hover:opacity-100"
          aria-label="Scroll to top"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default LandingPage;
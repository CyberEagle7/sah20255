import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const FeaturesShowcase = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      id: 0,
      title: "QR Code Generation",
      description: "Create unique QR codes for each student with customizable designs and batch processing capabilities.",
      image: "https://images.unsplash.com/photo-1606868306217-dbf5046868d2?w=600&h=400&fit=crop",
      highlights: [
        "Unique student identifiers",
        "Batch generation support",
        "PNG & PDF export options",
        "Custom branding available"
      ]
    },
    {
      id: 1,
      title: "Smart Scanning",
      description: "Lightning-fast QR code scanning with real-time validation and attendance marking.",
      image: "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?w=600&h=400&fit=crop",
      highlights: [
        "Instant scan recognition",
        "Duplicate prevention",
        "Offline capability",
        "Multi-device support"
      ]
    },
    {
      id: 2,
      title: "Analytics Dashboard",
      description: "Comprehensive reporting and analytics with visual charts and exportable data.",
      image: "https://images.pixabay.com/photo/2016/11/27/21/42/stock-1863880_960_720.jpg",
      highlights: [
        "Real-time statistics",
        "Custom date ranges",
        "Visual charts & graphs",
        "Export to Excel/PDF"
      ]
    },
    {
      id: 3,
      title: "Student Management",
      description: "Complete student profile management with photo uploads and detailed information tracking.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop",
      highlights: [
        "Profile management",
        "Photo uploads",
        "Bulk import/export",
        "Search & filtering"
      ]
    }
  ];

  return (
    <section className="py-24 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-slate-900 to-background"></div>
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl transform -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl transform -translate-y-1/2"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-glow mb-6">
            Powerful Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the comprehensive tools that make attendance management effortless
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Feature Navigation */}
          <div className="space-y-6">
            {features?.map((feature, index) => (
              <div
                key={feature?.id}
                className={`glass rounded-xl p-6 cursor-pointer lightning-transition neon-hover ${
                  activeFeature === index 
                    ? 'border border-primary/30 bg-primary/10' :'hover:bg-muted/10'
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center lightning-transition ${
                    activeFeature === index
                      ? 'bg-gradient-to-br from-primary to-accent' :'bg-muted/20'
                  }`}>
                    <Icon 
                      name={index === 0 ? "QrCode" : index === 1 ? "Scan" : index === 2 ? "BarChart3" : "Users"} 
                      size={24} 
                      color={activeFeature === index ? "white" : "currentColor"}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-bold mb-2 lightning-transition ${
                      activeFeature === index ? 'text-primary text-glow' : 'text-foreground'
                    }`}>
                      {feature?.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature?.description}
                    </p>
                    {activeFeature === index && (
                      <div className="mt-4 space-y-2">
                        {feature?.highlights?.map((highlight, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-sm text-accent">
                            <Icon name="Check" size={14} className="text-primary flex-shrink-0" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Feature Image */}
          <div className="relative">
            <div className="glass rounded-2xl p-8 neon-hover">
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src={features?.[activeFeature]?.image}
                  alt={features?.[activeFeature]?.title}
                  className="w-full h-80 object-cover lightning-transition"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
                
                {/* Overlay Content */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h4 className="text-xl font-bold text-foreground text-glow mb-2">
                    {features?.[activeFeature]?.title}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Experience the power of modern attendance tracking
                  </p>
                </div>
              </div>

              {/* Feature Indicators */}
              <div className="flex justify-center space-x-2 mt-6">
                {features?.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveFeature(index)}
                    className={`w-3 h-3 rounded-full lightning-transition ${
                      activeFeature === index
                        ? 'bg-primary' :'bg-muted/30 hover:bg-muted/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent rounded-full animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary rounded-full animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesShowcase;
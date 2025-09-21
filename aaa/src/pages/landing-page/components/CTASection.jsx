import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CTASection = () => {
  const stats = [
    { label: "Active Institutions", value: "500+", icon: "Building" },
    { label: "Students Tracked", value: "50K+", icon: "Users" },
    { label: "QR Codes Generated", value: "1M+", icon: "QrCode" },
    { label: "Uptime Guarantee", value: "99.9%", icon: "Shield" }
  ];

  return (
    <section className="py-24 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA */}
        <div className="text-center mb-16">
          <div className="glass rounded-3xl p-12 max-w-4xl mx-auto neon-hover">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-glow mb-6">
              Ready to Transform Your
              <span className="block text-primary text-glow-accent">Attendance Management?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Join the revolution in educational technology. Start tracking attendance with precision and ease today.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link to="/admin-login">
                <Button 
                  variant="default" 
                  size="xl"
                  iconName="Rocket"
                  iconPosition="left"
                  className="neon-hover text-lg px-10 py-5 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                >
                  Get Started Now
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="xl"
                iconName="MessageCircle"
                iconPosition="left"
                className="text-lg px-10 py-5 border-primary/30 text-primary hover:bg-primary/10"
              >
                Contact Sales
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-accent">
              <div className="flex items-center space-x-2">
                <Icon name="Check" size={16} className="text-primary" />
                <span>Free 30-day trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Check" size={16} className="text-primary" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Check" size={16} className="text-primary" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats?.map((stat, index) => (
            <div
              key={index}
              className="glass rounded-xl p-6 text-center neon-hover lightning-transition group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 lightning-transition">
                <Icon name={stat?.icon} size={24} color="white" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-primary text-glow mb-2">
                {stat?.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat?.label}
              </div>
            </div>
          ))}
        </div>

        {/* Security Badge */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-3 glass rounded-full px-6 py-3">
            <Icon name="Shield" size={20} className="text-primary" />
            <span className="text-sm text-muted-foreground">
              Enterprise-grade security & GDPR compliant
            </span>
            <Icon name="Lock" size={16} className="text-accent" />
          </div>
        </div>
      </div>
      {/* Floating Animation Elements */}
      <div className="absolute top-1/4 left-10 w-4 h-4 bg-primary rounded-full animate-ping opacity-30"></div>
      <div className="absolute top-3/4 right-10 w-3 h-3 bg-accent rounded-full animate-ping opacity-20 delay-1000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-primary rounded-full animate-ping opacity-40 delay-500"></div>
    </section>
  );
};

export default CTASection;
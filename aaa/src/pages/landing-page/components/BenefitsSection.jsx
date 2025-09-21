import React from 'react';
import Icon from '../../../components/AppIcon';

const BenefitsSection = () => {
  const benefits = [
    {
      id: 1,
      icon: "QrCode",
      title: "QR Code Attendance",
      description: "Generate unique QR codes for each student and track attendance with lightning-fast scanning technology.",
      features: ["Instant generation", "Unique identifiers", "Batch processing"]
    },
    {
      id: 2,
      icon: "BarChart3",
      title: "Real-time Reporting",
      description: "Access comprehensive attendance reports and analytics with real-time data visualization and insights.",
      features: ["Live dashboards", "Custom reports", "Data export"]
    },
    {
      id: 3,
      icon: "Shield",
      title: "Administrative Control",
      description: "Complete administrative oversight with user management, security controls, and system configuration.",
      features: ["User roles", "Access control", "Audit trails"]
    },
    {
      id: 4,
      icon: "Smartphone",
      title: "Mobile Optimized",
      description: "Fully responsive design that works seamlessly across all devices and screen sizes.",
      features: ["Touch-friendly", "Offline support", "Cross-platform"]
    },
    {
      id: 5,
      icon: "Clock",
      title: "Time Efficiency",
      description: "Reduce attendance tracking time from minutes to seconds with automated processes.",
      features: ["Bulk operations", "Auto-sync", "Quick setup"]
    },
    {
      id: 6,
      icon: "Database",
      title: "Data Management",
      description: "Secure data storage with backup capabilities and seamless integration options.",
      features: ["Cloud backup", "Data migration", "API access"]
    }
  ];

  return (
    <section className="py-24 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-slate-900/50"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-glow mb-6">
            Why Choose Our Platform?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the future of attendance management with cutting-edge technology and intuitive design
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits?.map((benefit) => (
            <div
              key={benefit?.id}
              className="glass rounded-2xl p-8 neon-hover lightning-transition group"
            >
              {/* Icon */}
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center group-hover:scale-110 lightning-transition">
                  <Icon name={benefit?.icon} size={32} color="white" />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground text-glow">
                  {benefit?.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit?.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2">
                  {benefit?.features?.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm text-accent">
                      <Icon name="Check" size={16} className="text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 lightning-transition pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground text-glow mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of educational institutions already using our platform
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center space-x-2 text-accent">
                <Icon name="Users" size={20} className="text-primary" />
                <span className="text-sm">Trusted by 500+ institutions</span>
              </div>
              <div className="flex items-center space-x-2 text-accent">
                <Icon name="Star" size={20} className="text-primary" />
                <span className="text-sm">4.9/5 user rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
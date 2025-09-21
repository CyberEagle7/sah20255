import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerLinks = {
    product: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Security", href: "#security" },
      { label: "Integrations", href: "#integrations" }
    ],
    company: [
      { label: "About Us", href: "#about" },
      { label: "Careers", href: "#careers" },
      { label: "Press", href: "#press" },
      { label: "Contact", href: "#contact" }
    ],
    support: [
      { label: "Help Center", href: "#help" },
      { label: "Documentation", href: "#docs" },
      { label: "API Reference", href: "#api" },
      { label: "Status", href: "#status" }
    ],
    legal: [
      { label: "Privacy Policy", href: "#privacy" },
      { label: "Terms of Service", href: "#terms" },
      { label: "Cookie Policy", href: "#cookies" },
      { label: "GDPR", href: "#gdpr" }
    ]
  };

  const socialLinks = [
    { name: "Twitter", icon: "Twitter", href: "#twitter" },
    { name: "LinkedIn", icon: "Linkedin", href: "#linkedin" },
    { name: "Facebook", icon: "Facebook", href: "#facebook" },
    { name: "Instagram", icon: "Instagram", href: "#instagram" }
  ];

  return (
    <footer className="relative bg-gradient-to-t from-slate-900 to-background border-t border-border">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link to="/landing-page" className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <Icon name="GraduationCap" size={24} color="white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground text-glow">
                    Students Attendance Hub
                  </h3>
                </div>
              </Link>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Revolutionizing educational attendance management with cutting-edge QR code technology and real-time analytics.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks?.map((social) => (
                  <a
                    key={social?.name}
                    href={social?.href}
                    className="w-10 h-10 glass rounded-lg flex items-center justify-center neon-hover lightning-transition hover:bg-primary/20"
                    aria-label={social?.name}
                  >
                    <Icon name={social?.icon} size={18} className="text-muted-foreground hover:text-primary lightning-transition" />
                  </a>
                ))}
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="text-foreground font-semibold mb-4 text-glow">Product</h4>
              <ul className="space-y-3">
                {footerLinks?.product?.map((link) => (
                  <li key={link?.label}>
                    <a
                      href={link?.href}
                      className="text-muted-foreground hover:text-primary lightning-transition text-sm"
                    >
                      {link?.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-foreground font-semibold mb-4 text-glow">Company</h4>
              <ul className="space-y-3">
                {footerLinks?.company?.map((link) => (
                  <li key={link?.label}>
                    <a
                      href={link?.href}
                      className="text-muted-foreground hover:text-primary lightning-transition text-sm"
                    >
                      {link?.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="text-foreground font-semibold mb-4 text-glow">Support</h4>
              <ul className="space-y-3">
                {footerLinks?.support?.map((link) => (
                  <li key={link?.label}>
                    <a
                      href={link?.href}
                      className="text-muted-foreground hover:text-primary lightning-transition text-sm"
                    >
                      {link?.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-foreground font-semibold mb-4 text-glow">Legal</h4>
              <ul className="space-y-3">
                {footerLinks?.legal?.map((link) => (
                  <li key={link?.label}>
                    <a
                      href={link?.href}
                      className="text-muted-foreground hover:text-primary lightning-transition text-sm"
                    >
                      {link?.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="py-8 border-t border-border">
          <div className="glass rounded-xl p-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div>
                <h4 className="text-lg font-semibold text-foreground text-glow mb-2">
                  Stay Updated
                </h4>
                <p className="text-muted-foreground text-sm">
                  Get the latest updates on new features and educational insights.
                </p>
              </div>
              <div className="flex space-x-3">
                <div className="flex items-center space-x-2 px-4 py-2 glass rounded-lg">
                  <Icon name="Mail" size={16} className="text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-transparent border-none outline-none text-foreground placeholder-muted-foreground text-sm w-48"
                  />
                </div>
                <button className="px-6 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-lg neon-hover lightning-transition font-medium text-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <span>© {currentYear} Students Attendance Hub. All rights reserved.</span>
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={14} className="text-primary" />
                <span>SOC 2 Compliant</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>All systems operational</span>
              </div>
              <span>Version 2.1.0</span>
            </div>
          </div>
        </div>
      </div>
      {/* Floating Elements */}
      <div className="absolute bottom-10 left-10 w-3 h-3 bg-primary rounded-full animate-ping opacity-20"></div>
      <div className="absolute bottom-20 right-20 w-2 h-2 bg-accent rounded-full animate-ping opacity-30 delay-1000"></div>
    </footer>
  );
};

export default Footer;
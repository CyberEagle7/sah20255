import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Brand Logo */}
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center lightning-glow">
              <span className="text-white font-bold text-3xl">NF</span>
            </div>
          </div>

          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground text-glow">
              NOVA FORGE
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-primary">
              Students Attendance Hub
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Modern, production-ready college attendance management system with 
              <span className="text-primary font-semibold"> QR technology</span>, 
              <span className="text-accent font-semibold"> real-time analytics</span>, and 
              <span className="text-success font-semibold"> SMS notifications</span>
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass rounded-xl p-6 border border-border"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Icon name="QrCode" size={24} className="text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">QR Technology</h3>
              <p className="text-sm text-muted-foreground">Unique QR codes for each student with secure lecture-wise attendance</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="glass rounded-xl p-6 border border-border"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Icon name="BarChart3" size={24} className="text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Live Analytics</h3>
              <p className="text-sm text-muted-foreground">Real-time insights and performance tracking from actual data</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="glass rounded-xl p-6 border border-border"
            >
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Icon name="Bell" size={24} className="text-success" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">SMS Alerts</h3>
              <p className="text-sm text-muted-foreground">Automated notifications for low attendance (&lt;75%)</p>
            </motion.div>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/admin-login">
              <Button
                size="lg"
                iconName="ArrowRight"
                iconPosition="right"
                className="neon-hover text-lg px-8 py-4"
              >
                Access Dashboard
              </Button>
            </Link>
            <Link to="#features">
              <Button
                variant="outline"
                size="lg"
                iconName="Play"
                iconPosition="left"
                className="neon-hover text-lg px-8 py-4"
              >
                Watch Demo
              </Button>
            </Link>
          </motion.div>

          {/* System Status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex items-center justify-center space-x-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
              <span>System Online</span>
            </div>
            <div className="w-px h-4 bg-border"></div>
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={14} className="text-primary" />
              <span>Secure & Production Ready</span>
            </div>
            <div className="w-px h-4 bg-border"></div>
            <div className="flex items-center space-x-2">
              <Icon name="Zap" size={14} className="text-accent" />
              <span>Real-time Processing</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center space-y-2 text-muted-foreground animate-bounce">
          <span className="text-sm">Explore Features</span>
          <Icon name="ChevronDown" size={20} />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
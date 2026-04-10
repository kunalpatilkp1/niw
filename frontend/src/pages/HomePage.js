import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle, Sparkles, TrendingUp, Users, Zap, Instagram, Mail, MessageSquare, Globe, BarChart3, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import Marquee from 'react-fast-marquee';
import Service3DCard from '../components/Service3DCard';
import Pricing3DCard from '../components/Pricing3DCard';

const HomePage = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const services = [
    { icon: Instagram, title: 'Social Media Marketing', desc: 'Engage your audience across all platforms' },
    { icon: Sparkles, title: 'Content Creation', desc: 'AI-powered content that converts' },
    { icon: Globe, title: 'Google My Business', desc: 'Dominate local search results' },
    { icon: TrendingUp, title: 'SEO', desc: 'Rank higher, get more traffic' },
    { icon: MessageSquare, title: 'WhatsApp Marketing', desc: 'Direct connection with customers' },
    { icon: Mail, title: 'Email Marketing', desc: 'Automated campaigns that work' },
    { icon: BarChart3, title: 'Ads Management', desc: 'Google & Meta ads that perform' },
    { icon: Zap, title: 'AI Chatbots & CRM', desc: 'Automate lead capture & follow-up' },
  ];

  const packages = [
    {
      name: 'Silver',
      price: '₹3,990',
      period: '/week',
      fit: 'Perfect for starting digital presence',
      features: ['2 Social Platforms', '8 Posts/Month', 'Basic SEO', 'GMB Setup', 'Monthly Reports'],
      popular: false,
    },
    {
      name: 'Gold',
      price: '₹5,990',
      period: '/week',
      fit: 'Best for lead generation & growth',
      features: ['4 Social Platforms', '16 Posts/Month', 'Advanced SEO', 'WhatsApp Marketing', 'AI Chatbot', 'Weekly Reports'],
      popular: true,
    },
    {
      name: 'Diamond',
      price: '₹9,900',
      period: '/week',
      fit: 'For scale + automation',
      features: ['All Platforms', 'Unlimited Posts', 'Full SEO Suite', 'Email + WhatsApp', 'CRM Integration', 'Ads Management', 'Daily Reports'],
      popular: false,
    },
  ];

  const industries = [
    { name: 'Restaurants & Cafes', emoji: '🍴' },
    { name: 'Furniture & Interiors', emoji: '🛋️' },
    { name: 'Retail Shops', emoji: '🛒' },
    { name: 'Salons & Clinics', emoji: '💇' },
    { name: 'Real Estate', emoji: '🏠' },
    { name: 'Education', emoji: '🏫' },
    { name: 'Ecommerce', emoji: '💻' },
    { name: 'Gift Shops', emoji: '🎁' },
  ];

  const trustBadges = ['AI Marketing', 'Google Partner', 'Growth Systems', 'Social Media', 'CRM', 'WhatsApp Automation', 'Lead Funnels'];

  return (
    <div className="content-overlay" data-testid="home-page">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-32" data-testid="hero-section">
        <motion.div
          style={{ y, opacity }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.h1 
              className="text-6xl sm:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-8 text-gradient" 
              data-testid="hero-heading"
              style={{ textShadow: '0 0 80px rgba(102, 126, 234, 0.5)' }}
            >
              AI-Powered Digital Marketing That Brings More Customers
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl sm:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed" 
              data-testid="hero-subheading"
            >
              Smart marketing systems that generate leads, boost sales, and grow your business — powered by AI, guided by strategy.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.08, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-3d px-10 py-5 rounded-full font-bold text-xl text-white flex items-center gap-3"
                  data-testid="hero-get-started-btn"
                >
                  Get Started <ArrowRight size={24} />
                </motion.button>
              </Link>
              <Link to="/pricing">
                <motion.button
                  whileHover={{ scale: 1.08, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass px-10 py-5 rounded-full font-bold text-xl text-white border border-white/30"
                  data-testid="hero-view-packages-btn"
                >
                  View Packages
                </motion.button>
              </Link>
            </motion.div>
            <motion.div 
              className="flex flex-wrap justify-center gap-10 text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              {[
                { icon: CheckCircle, text: 'Starting from ₹3,990/week' },
                { icon: CheckCircle, text: 'Setup in 48 Hours' },
                { icon: CheckCircle, text: 'Built for Local Businesses' },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  className="flex items-center gap-3 glass px-6 py-3 rounded-full"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <item.icon size={24} className="text-purple-400" />
                  <span className="text-white/90 font-semibold">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Trust Strip */}
      <section className="py-12 bg-white" data-testid="trust-strip">
        <Marquee gradient={false} speed={50}>
          {trustBadges.map((badge, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.1, y: -5 }}
              className="mx-12 px-8 py-4 glass-effect rounded-2xl font-bold text-sky-600 text-lg"
            >
              {badge}
            </motion.div>
          ))}
        </Marquee>
      </section>

      {/* Services Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8" data-testid="services-section">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-slate-900">
              Everything Your Business Needs to Grow
            </h2>
            <p className="text-lg text-slate-600">In One Place</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <Service3DCard
                key={idx}
                icon={service.icon}
                title={service.title}
                desc={service.desc}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why NIW Works */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-sky-50/50" data-testid="why-niw-section">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-slate-900">
              Why Businesses Choose NIW
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: TrendingUp, title: 'Affordable Plans', desc: 'Growth marketing that fits your budget' },
              { icon: Zap, title: 'AI-Assisted Speed', desc: 'Launch campaigns in days, not months' },
              { icon: BarChart3, title: 'Transparent Reporting', desc: 'Real-time insights into your growth' },
              { icon: Users, title: 'Lead-Focused Systems', desc: 'Every campaign is built to convert' },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl p-8 shadow-xl"
              >
                <feature.icon className="text-sky-500 mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-2 text-slate-900">{feature.title}</h3>
                <p className="text-slate-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-32 px-4 sm:px-6 lg:px-8" data-testid="pricing-preview">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-slate-900">
              Simple Plans. Serious Growth.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, idx) => (
              <Pricing3DCard key={idx} pkg={pkg} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-sky-50/50" data-testid="industries-section">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-slate-900">
              Built for Different Industries
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {industries.map((industry, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.1, y: -10 }}
                className="glass-effect rounded-2xl p-6 text-center cursor-pointer"
              >
                <div className="text-5xl mb-3">{industry.emoji}</div>
                <p className="font-semibold text-slate-900">{industry.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" data-testid="cta-banner">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-gradient-to-br from-sky-500 to-sky-600 rounded-3xl p-12 text-center text-white shadow-2xl"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">Ready to Grow with NIW?</h2>
          <p className="text-xl mb-8 text-sky-100">Let's build a marketing system that brings real results</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-sky-600 rounded-full font-semibold text-lg"
                data-testid="cta-book-consultation"
              >
                Book Free Consultation
              </motion.button>
            </Link>
            <motion.a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-colors"
              data-testid="cta-whatsapp"
            >
              WhatsApp Us
            </motion.a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;

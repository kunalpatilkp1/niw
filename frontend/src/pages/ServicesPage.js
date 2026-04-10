import { motion } from 'framer-motion';
import { Instagram, Globe, TrendingUp, MessageSquare, Mail, BarChart3, Zap, Target, Award, Users, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServicesPage = () => {
  const services = [
    {
      icon: Instagram,
      title: 'Social Media Marketing',
      description: 'Build a strong presence across Instagram, Facebook, LinkedIn, and more with content that engages and converts.',
      features: ['Content Strategy', 'Post Scheduling', 'Community Management', 'Reels & Stories', 'Growth Analytics'],
      color: 'bg-pink-100 text-pink-600',
    },
    {
      icon: Sparkles,
      title: 'Content Creation',
      description: 'AI-powered content creation that matches your brand voice and resonates with your audience.',
      features: ['Graphic Design', 'Video Editing', 'Copywriting', 'Brand Guidelines', 'Content Calendar'],
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: TrendingUp,
      title: 'SEO & Google My Business',
      description: 'Rank higher on Google and dominate local search results with comprehensive SEO strategies.',
      features: ['Keyword Research', 'On-Page SEO', 'Technical SEO', 'GMB Optimization', 'Local Citations'],
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: Target,
      title: 'Lead Generation',
      description: 'Generate qualified leads through strategic campaigns and optimized conversion funnels.',
      features: ['Landing Pages', 'Lead Magnets', 'Form Optimization', 'CRM Setup', 'Lead Nurturing'],
      color: 'bg-orange-100 text-orange-600',
    },
    {
      icon: Globe,
      title: 'Websites & Landing Pages',
      description: 'Beautiful, fast, and conversion-optimized websites built for modern businesses.',
      features: ['Responsive Design', 'Fast Loading', 'SEO Friendly', 'Mobile Optimized', 'Analytics Integration'],
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp Marketing',
      description: 'Direct customer engagement through automated WhatsApp campaigns and chatbots.',
      features: ['Broadcast Messages', 'Automated Responses', 'Customer Support', 'Order Updates', 'Campaign Analytics'],
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: Mail,
      title: 'Email Marketing',
      description: 'Build relationships and drive sales with personalized email campaigns that convert.',
      features: ['Email Design', 'Automation Workflows', 'Segmentation', 'A/B Testing', 'Performance Tracking'],
      color: 'bg-red-100 text-red-600',
    },
    {
      icon: BarChart3,
      title: 'Google & Meta Ads',
      description: 'Drive targeted traffic and conversions with expertly managed ad campaigns.',
      features: ['Campaign Strategy', 'Ad Creation', 'Audience Targeting', 'Budget Optimization', 'ROI Reporting'],
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      icon: Zap,
      title: 'AI Chatbots & Automation',
      description: 'Automate customer interactions and streamline operations with intelligent AI systems.',
      features: ['24/7 Support', 'Lead Qualification', 'Appointment Booking', 'FAQ Handling', 'CRM Integration'],
      color: 'bg-sky-100 text-sky-600',
    },
  ];

  return (
    <div className="pt-32 pb-24" data-testid="services-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6 text-gradient-sky">
            Digital Marketing Services
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Comprehensive marketing solutions designed to grow your business, generate leads, and boost sales.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="space-y-24">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
              data-testid={`service-block-${idx}`}
            >
              {/* Icon/Visual Side */}
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="lg:w-1/3"
              >
                <div className={`${service.color} w-32 h-32 rounded-3xl flex items-center justify-center shadow-2xl mx-auto`}>
                  <service.icon size={64} />
                </div>
              </motion.div>

              {/* Content Side */}
              <div className="lg:w-2/3 glass-effect rounded-3xl p-12">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">{service.title}</h2>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">{service.description}</p>
                <h3 className="text-sm font-semibold text-sky-600 uppercase tracking-wide mb-3">What's Included:</h3>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-sky-500 rounded-full" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-sky-500 text-white rounded-full font-semibold inline-flex items-center gap-2 shadow-lg"
                    data-testid={`service-cta-${idx}`}
                  >
                    Get This Service <ArrowRight size={20} />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 glass-effect rounded-3xl p-12 text-center"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Need a bundled package instead?</h2>
          <p className="text-lg text-slate-600 mb-6">Check out our comprehensive growth plans</p>
          <Link to="/pricing">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-sky-500 text-white rounded-full font-semibold text-lg shadow-lg"
              data-testid="services-pricing-btn"
            >
              View Pricing
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ServicesPage;

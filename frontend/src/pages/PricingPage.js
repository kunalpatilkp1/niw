import { motion } from 'framer-motion';
import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState('weekly'); // 'weekly' or 'monthly'

  const packages = [
    {
      name: 'Silver',
      weeklyPrice: 3990,
      monthlyPrice: 12990,
      fit: 'Perfect for starting digital presence',
      features: [
        '2 Social Platforms (Instagram + Facebook)',
        '8 Posts per Month',
        'Basic SEO Setup',
        'Google My Business Optimization',
        'Monthly Performance Reports',
        'Email Support',
        'Content Calendar',
        'Brand Guidelines',
      ],
      popular: false,
    },
    {
      name: 'Gold',
      weeklyPrice: 5990,
      monthlyPrice: 23990,
      fit: 'Best for lead generation & growth',
      features: [
        '4 Social Platforms',
        '16 Posts + 4 Reels per Month',
        'Advanced SEO Strategy',
        'WhatsApp Marketing Campaign',
        'AI Chatbot Integration',
        'Weekly Reports with Insights',
        'Landing Page Design',
        'Email Marketing (2 campaigns/month)',
        'Priority Support',
      ],
      popular: true,
    },
    {
      name: 'Diamond',
      weeklyPrice: 9900,
      monthlyPrice: 39990,
      fit: 'For scale + automation',
      features: [
        'All Social Platforms',
        'Unlimited Posts & Reels',
        'Full SEO Suite with Backlinks',
        'Advanced Email + WhatsApp Automation',
        'CRM Integration & Management',
        'Google Ads + Meta Ads Management',
        'Custom Website Development',
        'Daily Reports & Analytics',
        'Dedicated Account Manager',
        'Influencer Collaboration Support',
      ],
      popular: false,
    },
  ];

  return (
    <div className="pt-32 pb-24" data-testid="pricing-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6 text-gradient-sky">
            Choose the Right Growth Plan
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Flexible weekly and monthly plans for businesses at every stage
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-effect rounded-full p-2 inline-flex gap-2"
            data-testid="billing-toggle"
          >
            <button
              onClick={() => setBillingCycle('weekly')}
              className={`px-8 py-3 rounded-full font-semibold transition-all ${
                billingCycle === 'weekly' ? 'bg-sky-500 text-white' : 'text-slate-600 hover:text-sky-500'
              }`}
              data-testid="toggle-weekly"
            >
              Weekly
            </button>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-8 py-3 rounded-full font-semibold transition-all ${
                billingCycle === 'monthly' ? 'bg-sky-500 text-white' : 'text-slate-600 hover:text-sky-500'
              }`}
              data-testid="toggle-monthly"
            >
              Monthly
            </button>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {packages.map((pkg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
              whileHover={{ scale: pkg.popular ? 1.08 : 1.05, y: -10 }}
              className={`relative rounded-3xl p-8 ${
                pkg.popular ? 'bg-sky-500 text-white shadow-2xl shadow-sky-500/40 scale-105' : 'glass-effect'
              }`}
              data-testid={`pricing-card-${pkg.name.toLowerCase()}`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-slate-900 px-6 py-2 rounded-full text-sm font-bold">
                  ⭐ Most Popular
                </div>
              )}
              <h3 className={`text-3xl font-bold mb-2 ${pkg.popular ? 'text-white' : 'text-slate-900'}`}>
                {pkg.name}
              </h3>
              <div className="mb-4">
                <span className={`text-5xl font-extrabold ${pkg.popular ? 'text-white' : 'text-sky-500'}`}>
                  ₹{billingCycle === 'weekly' ? pkg.weeklyPrice.toLocaleString() : pkg.monthlyPrice.toLocaleString()}
                </span>
                <span className={`text-lg ml-2 ${pkg.popular ? 'text-sky-100' : 'text-slate-600'}`}>
                  /{billingCycle === 'weekly' ? 'week' : 'month'}
                </span>
              </div>
              <p className={`mb-6 text-sm ${pkg.popular ? 'text-sky-100' : 'text-slate-600'}`}>{pkg.fit}</p>
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle size={20} className={`flex-shrink-0 mt-0.5 ${pkg.popular ? 'text-sky-200' : 'text-sky-500'}`} />
                    <span className={`text-sm ${pkg.popular ? 'text-white' : 'text-slate-700'}`}>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-4 rounded-full font-semibold text-lg ${
                    pkg.popular ? 'bg-white text-sky-500' : 'bg-sky-500 text-white'
                  }`}
                  data-testid={`pricing-cta-${pkg.name.toLowerCase()}`}
                >
                  Choose {pkg.name}
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center glass-effect rounded-3xl p-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-slate-900">Not sure which plan is right?</h2>
          <p className="text-lg text-slate-600 mb-6">Let's discuss your goals and find the perfect fit</p>
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-sky-500 text-white rounded-full font-semibold text-lg shadow-lg"
              data-testid="pricing-consultation-btn"
            >
              Get Free Consultation
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingPage;

import { motion } from 'framer-motion';
import { Sparkles, Zap, MessageSquare, TrendingUp, Clock, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const AIMarketingPage = () => {
  const features = [
    { icon: Sparkles, title: 'AI Content Generation', desc: 'Create engaging posts, captions, and copy in seconds' },
    { icon: MessageSquare, title: 'AI Chatbot Conversations', desc: '24/7 customer support that never sleeps' },
    { icon: Zap, title: 'AI Lead Qualification', desc: 'Automatically identify and prioritize hot leads' },
    { icon: TrendingUp, title: 'AI WhatsApp Follow-up', desc: 'Automated nurturing sequences that convert' },
    { icon: Target, title: 'AI Campaign Optimization', desc: 'Continuously improve ad performance' },
    { icon: Clock, title: 'AI Reporting', desc: 'Instant insights and actionable recommendations' },
  ];

  const benefits = [
    { title: 'Less Manual Work', desc: 'Focus on strategy while AI handles execution' },
    { title: 'Faster Response Times', desc: 'Instant replies to customer inquiries 24/7' },
    { title: 'Better Consistency', desc: 'Maintain brand voice across all channels' },
    { title: 'Improved Scale', desc: 'Handle 10x more leads without hiring' },
    { title: 'Data-Driven Decisions', desc: 'AI-powered insights for smarter marketing' },
  ];

  return (
    <div className="pt-32 pb-24" data-testid="ai-marketing-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6 text-gradient-sky">
            AI Marketing Systems for Faster Growth
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Smart content, faster lead response, automated follow-up, and better reporting.
          </p>
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-sky-500 text-white rounded-full font-semibold text-lg shadow-lg"
              data-testid="ai-book-demo-btn"
            >
              Book AI Demo
            </motion.button>
          </Link>
        </motion.div>

        {/* What AI Means */}
        <section className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-slate-900 mb-6">What AI Means at NIW</h2>
              <p className="text-lg text-slate-600 mb-4 leading-relaxed">
                We use AI to automate repetitive tasks, speed up content creation, and improve customer interactions. This means you get more done in less time, with better results.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                From generating social media posts to qualifying leads and sending follow-up messages, AI handles the heavy lifting while you focus on growing your business.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-effect rounded-3xl p-12"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Lead Captured</p>
                    <p className="text-sm text-slate-600">Via website, social, or ads</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">AI Qualifies</p>
                    <p className="text-sm text-slate-600">Scores and prioritizes leads</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Automated Follow-up</p>
                    <p className="text-sm text-slate-600">WhatsApp/email nurturing</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Conversion</p>
                    <p className="text-sm text-slate-600">Booking or purchase</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What We Automate */}
        <section className="mb-32">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-slate-900 text-center mb-16"
          >
            What We Automate
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="glass-effect rounded-3xl p-8 text-center"
                data-testid={`ai-feature-${idx}`}
              >
                <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="text-sky-500" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-32 bg-sky-50/50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-24 rounded-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-slate-900 text-center mb-16"
          >
            Why AI Helps Businesses Grow Faster
          </motion.h2>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                <p className="text-slate-600">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-effect rounded-3xl p-12 text-center"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Want AI-powered growth for your business?</h2>
          <p className="text-lg text-slate-600 mb-6">Let's discuss how AI can transform your marketing</p>
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-sky-500 text-white rounded-full font-semibold text-lg shadow-lg"
              data-testid="ai-talk-to-niw-btn"
            >
              Talk to NIW
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default AIMarketingPage;

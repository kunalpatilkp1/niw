import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const HowItWorksPage = () => {
  const steps = [
    {
      number: '1',
      title: 'Discovery Call',
      client: 'Share your business goals, challenges, and current marketing efforts',
      niw: 'Understand your needs and propose the right strategy',
      outcome: 'Clear plan aligned with your goals',
    },
    {
      number: '2',
      title: 'Setup & Strategy',
      client: 'Provide brand assets, access to platforms, and preferences',
      niw: 'Build accounts, set up systems, create content calendar',
      outcome: 'Everything ready to launch',
    },
    {
      number: '3',
      title: 'Launch',
      client: 'Review and approve initial content',
      niw: 'Go live with campaigns, ads, and automation',
      outcome: 'Marketing running on all channels',
    },
    {
      number: '4',
      title: 'Optimize',
      client: 'Provide feedback and insights',
      niw: 'Continuously improve based on data and results',
      outcome: 'Better performance every week',
    },
    {
      number: '5',
      title: 'Report & Scale',
      client: 'Review reports and discuss growth opportunities',
      niw: 'Provide insights, recommendations, and scaling options',
      outcome: 'Data-driven growth trajectory',
    },
  ];

  return (
    <div className="pt-32 pb-24" data-testid="how-it-works-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6 text-gradient-sky">
            Our Process Is Simple, Clear, and Built for Results
          </h1>
        </motion.div>

        <div className="space-y-12">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-effect rounded-3xl p-12"
              data-testid={`step-${idx}`}
            >
              <div className="flex items-start gap-8">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 bg-sky-500 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0"
                >
                  {step.number}
                </motion.div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">{step.title}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm font-semibold text-sky-600 uppercase tracking-wide mb-2">You Provide</p>
                      <p className="text-slate-700">{step.client}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-sky-600 uppercase tracking-wide mb-2">NIW Does</p>
                      <p className="text-slate-700">{step.niw}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-green-600 uppercase tracking-wide mb-2">Outcome</p>
                      <p className="text-slate-700 font-semibold">{step.outcome}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 glass-effect rounded-3xl p-12 text-center"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to get started?</h2>
          <a href="/contact" className="inline-block px-8 py-4 bg-sky-500 text-white rounded-full font-semibold text-lg shadow-lg hover:bg-sky-600 transition-colors">
            Book Consultation
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorksPage;

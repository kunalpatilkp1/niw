import { motion } from 'framer-motion';
import { Award, Target, Users } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="pt-32 pb-24" data-testid="about-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6 text-gradient-sky">
            About Next In Wave
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            AI-powered digital marketing built for practical growth
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-effect rounded-3xl p-12 mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Story</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-4">
            NIW was founded with a simple belief: every business deserves access to world-class marketing, not just big corporations with massive budgets.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            We combine AI technology with strategic thinking to deliver affordable, scalable, and results-driven marketing for local businesses. Our focus is on what matters most — more customers, more leads, and more sales.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: Target, title: 'Our Mission', desc: 'Democratize digital marketing and make growth accessible to every business' },
            { icon: Users, title: 'Our Vision', desc: 'Be the most trusted AI marketing partner for businesses across industries' },
            { icon: Award, title: 'Our Values', desc: 'Transparency, results-driven approach, and client success above all' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass-effect rounded-3xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <item.icon className="text-sky-500" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-slate-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-effect rounded-3xl p-12 text-center"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Work with NIW</h2>
          <p className="text-lg text-slate-600 mb-6">Let's build something amazing together</p>
          <a href="/contact" className="inline-block px-8 py-4 bg-sky-500 text-white rounded-full font-semibold text-lg shadow-lg hover:bg-sky-600 transition-colors">
            Get Started
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;

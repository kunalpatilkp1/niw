import { motion } from 'framer-motion';
import { useState } from 'react';
import axios from 'axios';
import { Award, TrendingUp, Users, DollarSign } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AffiliatePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API}/affiliate`, formData);
      setResult(response.data);
      setFormData({ name: '', email: '', phone: '', experience: '' });
    } catch (error) {
      alert('Failed to register. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="pt-32 pb-24" data-testid="affiliate-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6 text-gradient-sky">
            Join NIW's Affiliate Program
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Free to join, built to earn. Promote NIW services and earn passive income.
          </p>
        </motion.div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {[
            { icon: Award, title: 'Free to Join', desc: 'No upfront costs or fees' },
            { icon: DollarSign, title: 'Earn Per Conversion', desc: 'Generous commission structure' },
            { icon: TrendingUp, title: 'Dashboard Tracking', desc: 'Real-time performance insights' },
            { icon: Users, title: 'Dedicated Support', desc: 'Your success is our success' },
          ].map((benefit, idx) => (
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
                <benefit.icon className="text-sky-500" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">{benefit.title}</h3>
              <p className="text-slate-600">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Registration Form */}
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-effect rounded-3xl p-8"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Register as Affiliate</h2>
            {result ? (
              <div className="text-center py-12" data-testid="affiliate-success">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Welcome to NIW Affiliate Program!</h3>
                <p className="text-slate-600 mb-2">Your referral code:</p>
                <p className="text-3xl font-bold text-sky-500 mb-6">{result.referral_code}</p>
                <p className="text-slate-600">Check your email for login details and next steps.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" data-testid="affiliate-form">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                    data-testid="affiliate-name-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                    data-testid="affiliate-email-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Phone *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                    data-testid="affiliate-phone-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Marketing Experience (Optional)</label>
                  <textarea
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                    data-testid="affiliate-experience-input"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-sky-500 text-white rounded-full font-semibold text-lg shadow-lg disabled:opacity-50"
                  data-testid="affiliate-submit-btn"
                >
                  {loading ? 'Registering...' : 'Join Now'}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AffiliatePage;

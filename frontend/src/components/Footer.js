import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await axios.post(`${API}/newsletter`, { email });
      setMessage('Successfully subscribed!');
      setEmail('');
    } catch (error) {
      setMessage(error.response?.data?.detail || 'Failed to subscribe');
    }
    setLoading(false);
  };

  return (
    <footer className="relative bg-slate-900 text-white mt-32" data-testid="footer-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-extrabold text-gradient-sky mb-4"
            >
              NIW
            </motion.div>
            <p className="text-slate-400 mb-6 leading-relaxed">
              AI-powered digital marketing built for practical growth. We help businesses get more customers, more leads, and more sales through smart, scalable marketing systems.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, idx) => (
                <motion.a
                  key={idx}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 bg-sky-500/20 rounded-full flex items-center justify-center hover:bg-sky-500 transition-colors"
                  data-testid={`social-link-${idx}`}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Services', 'AI Marketing', 'Pricing', 'How It Works', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(/ /g, '-')}`} className="text-slate-400 hover:text-sky-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className="font-bold text-lg mb-4">Industries</h3>
            <ul className="space-y-2">
              {['Restaurants', 'Furniture', 'Retail', 'Salons', 'Real Estate', 'Education', 'Ecommerce'].map((item) => (
                <li key={item}>
                  <Link to="/industries" className="text-slate-400 hover:text-sky-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-slate-400 text-sm mb-4">Get marketing tips & updates</p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3" data-testid="newsletter-form">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="w-full px-4 py-2 rounded-full bg-slate-800 border border-slate-700 focus:border-sky-500 focus:outline-none text-white"
                data-testid="newsletter-email-input"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 bg-sky-500 rounded-full font-medium hover:bg-sky-600 transition-colors disabled:opacity-50"
                data-testid="newsletter-submit-btn"
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </motion.button>
              {message && <p className="text-sm text-sky-400">{message}</p>}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © 2026 Next In Wave. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/privacy" className="text-slate-400 hover:text-sky-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-slate-400 hover:text-sky-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { motion } from 'framer-motion';
import { useState } from 'react';
import axios from 'axios';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const BACKEND_URL = (process.env.REACT_APP_BACKEND_URL || '').replace(/\/$/, '');
const API = BACKEND_URL ? `${BACKEND_URL}/api` : '/api';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    business_name: '',
    industry: '',
    city: '',
    phone: '',
    email: '',
    website: '',
    services_needed: [],
    preferred_package: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const services = [
    'Social Media Marketing',
    'Content Creation',
    'SEO',
    'Google My Business',
    'WhatsApp Marketing',
    'Email Marketing',
    'Ads Management',
    'Website Development',
    'AI Chatbot',
  ];

  const industries = [
    'Restaurants & Cafes',
    'Furniture & Interiors',
    'Retail Shops',
    'Salons & Clinics',
    'Real Estate',
    'Education',
    'Ecommerce',
    'Other',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    try {
      await axios.post(`${API}/contact`, formData);
      setStatus('success');
      setFormData({
        name: '',
        business_name: '',
        industry: '',
        city: '',
        phone: '',
        email: '',
        website: '',
        services_needed: [],
        preferred_package: '',
        message: '',
      });
    } catch (error) {
      setStatus('error');
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceToggle = (service) => {
    setFormData((prev) => ({
      ...prev,
      services_needed: prev.services_needed.includes(service)
        ? prev.services_needed.filter((s) => s !== service)
        : [...prev.services_needed, service],
    }));
  };

  return (
    <div className="pt-32 pb-24" data-testid="contact-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6 text-gradient-sky">
            Let's Talk About Your Growth Plan
          </h1>
          <p className="text-xl text-slate-600">Get a free consultation and custom strategy for your business</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="glass-effect rounded-3xl p-8 space-y-6" data-testid="contact-form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                    data-testid="contact-name-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Business Name</label>
                  <input
                    type="text"
                    name="business_name"
                    value={formData.business_name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                    data-testid="contact-business-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Industry</label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                    data-testid="contact-industry-select"
                  >
                    <option value="">Select Industry</option>
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                    data-testid="contact-city-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                    data-testid="contact-phone-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                    data-testid="contact-email-input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Current Website/Social Handles</label>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  data-testid="contact-website-input"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Services Needed</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {services.map((service) => (
                    <motion.button
                      key={service}
                      type="button"
                      onClick={() => handleServiceToggle(service)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        formData.services_needed.includes(service)
                          ? 'bg-sky-500 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-sky-100'
                      }`}
                      data-testid={`service-${service.toLowerCase().replace(/ /g, '-')}`}
                    >
                      {service}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Preferred Package</label>
                <select
                  name="preferred_package"
                  value={formData.preferred_package}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  data-testid="contact-package-select"
                >
                  <option value="">Select Package</option>
                  <option value="Silver">Silver</option>
                  <option value="Gold">Gold</option>
                  <option value="Diamond">Diamond</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  data-testid="contact-message-textarea"
                />
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-sky-500 text-white rounded-full font-semibold text-lg shadow-lg shadow-sky-500/30 hover:bg-sky-600 transition-colors disabled:opacity-50"
                data-testid="contact-submit-btn"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </motion.button>

              {status === 'success' && (
                <div className="p-4 bg-green-100 text-green-700 rounded-2xl" data-testid="contact-success-message">
                  Thank you! We'll get back to you within 24 hours.
                </div>
              )}
              {status === 'error' && (
                <div className="p-4 bg-red-100 text-red-700 rounded-2xl" data-testid="contact-error-message">
                  Something went wrong. Please try again.
                </div>
              )}
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="glass-effect rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Get in Touch</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Phone className="text-sky-500" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Phone</p>
                    <p className="text-slate-600">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Mail className="text-sky-500" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Email</p>
                    <p className="text-slate-600">hello@nextinwave.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Clock className="text-sky-500" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Business Hours</p>
                    <p className="text-slate-600">Mon - Sat: 9AM - 7PM</p>
                  </div>
                </div>
              </div>
            </div>

            <motion.a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -5 }}
              className="block glass-effect rounded-3xl p-8 text-center hover:shadow-xl transition-shadow"
              data-testid="contact-whatsapp-card"
            >
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </div>
              <p className="text-lg font-semibold text-slate-900 mb-2">WhatsApp Us</p>
              <p className="text-slate-600">Get instant response</p>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

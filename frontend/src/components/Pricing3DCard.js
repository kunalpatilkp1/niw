import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, Sparkles } from 'lucide-react';

export const Pricing3DCard = ({ pkg, idx }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      whileHover={{ scale: 1.05, y: -15 }}
      className={`relative glass rounded-3xl p-8 card-3d ${
        pkg.popular ? 'border-2 border-cyan-400 scale-105' : ''
      }`}
      data-testid={`pricing-card-${pkg.name.toLowerCase()}`}
    >
      {pkg.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full text-sm font-bold flex items-center gap-2">
          <Sparkles size={16} fill="currentColor" />
          <span>MOST POPULAR</span>
          <Sparkles size={16} fill="currentColor" />
        </div>
      )}
      
      <div className="text-center mb-6">
        <h3 className="text-3xl font-bold mb-3 text-white">{pkg.name}</h3>
        <div className="mb-2">
          <span className={`text-5xl font-extrabold ${pkg.popular ? 'text-cyan-400' : 'text-white'}`}>{pkg.price}</span>
          <span className="text-white/60 text-lg">{pkg.period}</span>
        </div>
        <p className="text-sm text-white/70">{pkg.fit}</p>
      </div>

      <ul className="space-y-3 mb-8">
        {pkg.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <CheckCircle size={20} className="flex-shrink-0 mt-0.5 text-cyan-400" />
            <span className="text-sm text-white/90">{feature}</span>
          </li>
        ))}
      </ul>

      <Link to="/pricing">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full py-3 rounded-full font-bold text-lg ${
            pkg.popular ? 'btn-primary' : 'btn-secondary'
          } text-white`}
          data-testid={`pricing-cta-${pkg.name.toLowerCase()}`}
        >
          Choose {pkg.name}
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default Pricing3DCard;

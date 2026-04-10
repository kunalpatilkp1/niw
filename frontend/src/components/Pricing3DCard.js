import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, Star } from 'lucide-react';

export const Pricing3DCard = ({ pkg, idx }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: -20 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: idx * 0.15 }}
      whileHover={{ 
        scale: 1.08, 
        rotateY: 3,
        y: -20,
        transition: { duration: 0.3 }
      }}
      className={`relative glass-card rounded-3xl p-8 ${
        pkg.popular ? 'border-2 border-white/50 scale-105' : ''
      }`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      data-testid={`pricing-card-${pkg.name.toLowerCase()}`}
    >
      {pkg.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-white text-purple-600 rounded-full text-sm font-bold flex items-center gap-2">
          <Star size={16} fill="currentColor" />
          <span>MOST POPULAR</span>
          <Star size={16} fill="currentColor" />
        </div>
      )}
      
      <div className="text-center mb-6" style={{ transform: 'translateZ(20px)' }}>
        <h3 className="text-3xl font-bold mb-3 text-white">{pkg.name}</h3>
        <div className="mb-2">
          <span className="text-5xl font-extrabold text-white">{pkg.price}</span>
          <span className="text-white/70 text-lg">{pkg.period}</span>
        </div>
        <p className="text-sm text-white/70">{pkg.fit}</p>
      </div>

      <ul className="space-y-3 mb-8">
        {pkg.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <CheckCircle size={20} className="flex-shrink-0 mt-0.5 text-white/80" />
            <span className="text-sm text-white/90">{feature}</span>
          </li>
        ))}
      </ul>

      <Link to="/pricing">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full py-4 rounded-full font-bold text-lg ${
            pkg.popular ? 'bg-white text-purple-600' : 'btn-secondary text-white'
          }`}
          style={{ transform: 'translateZ(30px)' }}
          data-testid={`pricing-cta-${pkg.name.toLowerCase()}`}
        >
          Choose {pkg.name}
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default Pricing3DCard;

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, Sparkles } from 'lucide-react';

export const Pricing3DCard = ({ pkg, idx }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, rotateX: -30, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.9, 
        delay: idx * 0.2,
        ease: [0.16, 1, 0.3, 1]
      }}
      whileHover={{ 
        scale: 1.08, 
        rotateY: 5,
        y: -30,
        transition: { duration: 0.4 }
      }}
      className={`relative glass-strong rounded-3xl p-10 card-3d overflow-hidden ${
        pkg.popular ? 'border-2 border-pink-500/50 scale-110 glow' : ''
      }`}
      style={{
        transformStyle: 'preserve-3d',
      }}
      data-testid={`pricing-card-${pkg.name.toLowerCase()}`}
    >
      {/* Morphing background blob */}
      {pkg.popular && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-cyan-600/20 opacity-50 blob"></div>
      )}
      
      {pkg.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-8 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-bold flex items-center gap-2 glow" style={{ transform: 'translateZ(60px)' }}>
          <Sparkles size={16} fill="currentColor" className="animate-pulse" />
          <span>MOST POPULAR</span>
          <Sparkles size={16} fill="currentColor" className="animate-pulse" />
        </div>
      )}
      
      <div className="relative z-10 text-center mb-8" style={{ transform: 'translateZ(40px)' }}>
        <h3 className="text-4xl font-extrabold mb-4 text-gradient">{pkg.name}</h3>
        <div className="mb-3">
          <span className="text-6xl font-extrabold text-white">{pkg.price}</span>
          <span className="text-white/60 text-xl ml-2">{pkg.period}</span>
        </div>
        <p className="text-sm text-white/70">{pkg.fit}</p>
      </div>

      <ul className="space-y-4 mb-10 relative z-10">
        {pkg.features.map((feature, i) => (
          <motion.li 
            key={i} 
            className="flex items-start gap-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <CheckCircle size={22} className="flex-shrink-0 mt-0.5 text-purple-400" />
            <span className="text-sm text-white/90">{feature}</span>
          </motion.li>
        ))}
      </ul>

      <Link to="/pricing">
        <motion.button
          whileHover={{ scale: 1.08, y: -5 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full py-4 rounded-full font-bold text-lg btn-3d text-white relative overflow-hidden ${
            pkg.popular ? 'bg-gradient-to-r from-purple-600 to-pink-600' : ''
          }`}
          style={{ transform: 'translateZ(50px)' }}
          data-testid={`pricing-cta-${pkg.name.toLowerCase()}`}
        >
          <span className="relative z-10">Choose {pkg.name}</span>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default Pricing3DCard;

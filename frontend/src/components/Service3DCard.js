import { motion } from 'framer-motion';

export const Service3DCard = ({ icon: Icon, title, desc, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ 
        scale: 1.05, 
        rotateY: 5,
        rotateX: 5,
        z: 50,
        transition: { duration: 0.3 }
      }}
      className="glass-card rounded-2xl p-6 cursor-pointer group"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      data-testid={`service-card-${index}`}
    >
      <div className="flex flex-col items-center text-center">
        <motion.div
          whileHover={{ rotateY: 360 }}
          transition={{ duration: 0.6 }}
          className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-4 icon-3d"
        >
          <Icon className="text-white" size={32} />
        </motion.div>
        <h3 className="text-lg font-bold mb-2 text-white">{title}</h3>
        <p className="text-sm text-white/80">{desc}</p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ transform: 'translateZ(10px)' }}></div>
    </motion.div>
  );
};

export default Service3DCard;

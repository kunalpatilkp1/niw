import { motion } from 'framer-motion';

export const Service3DCard = ({ icon: Icon, title, desc, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80, rotateX: -20, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      whileHover={{ 
        scale: 1.1, 
        rotateY: 10,
        rotateX: 10,
        z: 100,
        transition: { duration: 0.4 }
      }}
      className="glass rounded-3xl p-8 cursor-pointer group relative overflow-hidden card-3d"
      style={{
        transformStyle: 'preserve-3d',
      }}
      data-testid={`service-card-${index}`}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ transform: 'translateZ(-10px)' }}></div>
      
      {/* Morphing blob background */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 rounded-full blur-3xl transition-opacity duration-700 blob"></div>
      
      <div className="relative z-10 flex flex-col items-center text-center" style={{ transform: 'translateZ(30px)' }}>
        <motion.div
          whileHover={{ rotateY: 360, scale: 1.2 }}
          transition={{ duration: 0.6 }}
          className="w-20 h-20 glass-strong rounded-2xl flex items-center justify-center mb-5 icon-3d glow"
          style={{ transform: 'translateZ(50px)' }}
        >
          <Icon className="text-white" size={36} />
        </motion.div>
        <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
        <p className="text-sm text-white/70 leading-relaxed">{desc}</p>
      </div>
      
      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
    </motion.div>
  );
};

export default Service3DCard;

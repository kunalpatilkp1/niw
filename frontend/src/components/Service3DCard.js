import { motion } from 'framer-motion';

export const Service3DCard = ({ icon: Icon, title, desc, index }) => {
  const colors = [
    'from-cyan-500 to-blue-500',
    'from-purple-500 to-pink-500',
    'from-pink-500 to-rose-500',
    'from-blue-500 to-cyan-500',
    'from-violet-500 to-purple-500',
    'from-fuchsia-500 to-pink-500',
    'from-cyan-400 to-teal-500',
    'from-indigo-500 to-purple-500',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ scale: 1.05, y: -10 }}
      className="glass rounded-2xl p-8 cursor-pointer group card-3d"
      data-testid={`service-card-${index}`}
    >
      <div className="flex flex-col items-center text-center">
        <motion.div
          whileHover={{ rotateY: 180 }}
          transition={{ duration: 0.6 }}
          className={`w-16 h-16 bg-gradient-to-br ${colors[index % colors.length]} rounded-xl flex items-center justify-center mb-4 icon-3d`}
        >
          <Icon className="text-white" size={32} />
        </motion.div>
        <h3 className="text-lg font-bold mb-2 text-white">{title}</h3>
        <p className="text-sm text-white/70">{desc}</p>
      </div>
    </motion.div>
  );
};

export default Service3DCard;

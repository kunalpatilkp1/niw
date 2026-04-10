import { motion } from 'framer-motion';
import { MessageCircle, Bot } from 'lucide-react';

const FloatingButtons = () => {
  return (
    <>
      {/* WhatsApp Floating Button */}
      <motion.a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-2xl glow-sky cursor-pointer"
        data-testid="floating-whatsapp-btn"
      >
        <MessageCircle size={28} className="text-white" />
      </motion.a>

      {/* AI Chat Floating Button */}
      <motion.button
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-28 right-6 z-50 w-16 h-16 bg-sky-500 rounded-full flex items-center justify-center shadow-2xl glow-sky cursor-pointer"
        data-testid="floating-ai-chat-btn"
      >
        <Bot size={28} className="text-white" />
      </motion.button>
    </>
  );
};

export default FloatingButtons;

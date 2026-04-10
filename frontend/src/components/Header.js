import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 100], [0, -5]);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', path: '/services' },
    { name: 'AI Marketing', path: '/ai-marketing' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Industries', path: '/industries' },
    { name: 'Results', path: '/results' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'About', path: '/about' },
  ];

  return (
    <>
      {/* Top Bar */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white py-2.5 px-4"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <span className="font-medium">📞 Call/WhatsApp: +91 98765 43210</span>
            <span className="hidden md:block text-white/90">AI-Powered Digital Marketing for Growing Businesses</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-purple-600 px-5 py-1.5 rounded-full font-bold text-sm glow-purple"
            data-testid="top-book-consultation-btn"
          >
            Book Free Consultation
          </motion.button>
        </div>
      </motion.div>

      {/* Main Header */}
      <motion.header
        style={{ y: headerY }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass-effect shadow-2xl' : 'bg-black/50 backdrop-blur-xl'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center"
                data-testid="logo-link"
              >
                <div className="text-3xl font-extrabold text-gradient-rich tracking-tighter">
                  NIW
                </div>
                <div className="ml-2 text-xs text-gray-300 hidden sm:block font-semibold">
                  Next In Wave
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path}>
                  <motion.span
                    whileHover={{ scale: 1.05, color: '#a78bfa' }}
                    className={`text-sm font-semibold transition-colors ${
                      location.pathname === link.path ? 'text-purple-400' : 'text-gray-200 hover:text-purple-300'
                    }`}
                    data-testid={`nav-${link.name.toLowerCase().replace(/ /g, '-')}`}
                  >
                    {link.name}
                  </motion.span>
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-premium px-6 py-2.5 rounded-full font-bold text-sm text-white"
                  data-testid="header-get-started-btn"
                >
                  Get Started
                </motion.button>
              </Link>
              <motion.a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 border-2 border-purple-400 text-purple-300 rounded-full font-bold text-sm hover:bg-purple-500/20 transition-colors"
                data-testid="header-whatsapp-btn"
              >
                WhatsApp Us
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white"
              data-testid="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ height: isMobileMenuOpen ? 'auto' : 0 }}
          className="lg:hidden overflow-hidden bg-black/95 backdrop-blur-xl border-t border-purple-500/30"
        >
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} onClick={() => setIsMobileMenuOpen(false)}>
                <div className="text-gray-200 hover:text-purple-400 font-semibold transition-colors">
                  {link.name}
                </div>
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-4">
              <Link to="/contact">
                <button className="w-full btn-premium px-6 py-3 rounded-full font-bold text-white" data-testid="mobile-get-started-btn">
                  Get Started
                </button>
              </Link>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-6 py-3 border-2 border-purple-400 text-purple-300 rounded-full font-bold text-center hover:bg-purple-500/20 transition-colors"
                data-testid="mobile-whatsapp-btn"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </motion.div>
      </motion.header>
    </>
  );
};

export default Header;

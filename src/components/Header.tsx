import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, Menu, X, Shield, Calendar, MapPin, Sparkles } from 'lucide-react';
import { Page } from '../types';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

export default function Header({ currentPage, setCurrentPage }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; id: Page }[] = [
    { label: 'Home', id: 'home' },
    { label: 'Services', id: 'services' },
    { label: 'Ottawa ↔ Toronto', id: 'ottawa-toronto' },
    { label: 'Fleet', id: 'fleet' },
    { label: 'About Us', id: 'about' },
    { label: 'Service Areas', id: 'areas' },
    { label: 'FAQ', id: 'faq' },
    { label: 'Contact', id: 'contact' }
  ];

  const handleNavClick = (pageId: Page) => {
    setCurrentPage(pageId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Contact & Utility Bar */}
      <div className="bg-[#0d0d0d] border-b border-white/10 text-xs text-gray-300 py-2 px-6 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a 
              href="tel:4167200366" 
              className="flex items-center gap-1.5 hover:text-brand-gold transition-colors duration-200"
            >
              <Phone className="w-3.5 h-3.5 text-brand-gold" />
              <span className="font-mono font-medium">416-720-0366</span>
            </a>
            <a 
              href="mailto:info@torontocarservice.ca" 
              className="flex items-center gap-1.5 hover:text-brand-gold transition-colors duration-200"
            >
              <Mail className="w-3.5 h-3.5 text-brand-gold" />
              <span>info@torontocarservice.ca</span>
            </a>
          </div>
          
          <div className="flex items-center gap-6 text-[11px]">
            <span className="flex items-center gap-1 text-gray-400">
              <Shield className="w-3 h-3 text-brand-gold" />
              Licensed & Insured
            </span>
            <span className="flex items-center gap-1 text-gray-400">
              <MapPin className="w-3 h-3 text-brand-gold" />
              Based in Mississauga, ON
            </span>
            <span className="text-brand-gold font-medium bg-brand-gold/5 px-2 py-0.5 border border-brand-gold/10">
              24/7 Professional Chauffeurs
            </span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation Bar */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 bg-[#111111] border-b border-white/10 ${
          isScrolled 
            ? 'py-3 bg-[#111111]/95 backdrop-blur-md shadow-lg' 
            : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Brand Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left cursor-pointer group"
          >
            <div className="w-8 h-8 bg-[#D4AF37] flex items-center justify-center font-bold text-[#111111] text-base transition-colors">
              O
            </div>
            <div>
              <span className="font-sans font-bold text-base md:text-lg text-white tracking-tight flex items-center uppercase">
                Ottawa<span className="text-brand-gold">Car</span>Service
              </span>
              <span className="text-[9px] text-gray-400 tracking-widest font-mono block uppercase">
                Premium Ontario Chauffeur
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-4 py-2 text-xs font-sans font-medium tracking-wider uppercase transition-colors duration-200 cursor-pointer ${
                  currentPage === item.id 
                    ? 'text-brand-gold font-semibold' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
                {currentPage === item.id && (
                  <motion.div 
                    layoutId="activeNavLine"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-brand-gold"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Action CTA Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('quote')}
              className="hidden sm:flex items-center gap-2 bg-[#D4AF37] text-[#111111] px-6 py-2.5 font-bold uppercase text-xs tracking-widest hover:bg-white hover:text-[#111111] transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Get a Quote</span>
            </button>
            
            <a
              href="tel:4167200366"
              className="lg:hidden bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-brand-gold p-2.5 flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition-colors"
              title="Call OttawaCarService"
            >
              <Phone className="w-4 h-4" />
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-gray-300 hover:text-white p-2"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#111111] border-b border-white/10 overflow-hidden z-30 fixed top-[74px] left-0 w-full backdrop-blur-lg"
          >
            <div className="px-6 py-6 space-y-4 flex flex-col">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-sm font-sans font-semibold tracking-wider uppercase py-2 text-left border-b border-white/5 transition-colors cursor-pointer ${
                    currentPage === item.id ? 'text-brand-gold pl-2 border-brand-gold/30' : 'text-gray-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-4 flex flex-col gap-3">
                <button
                  onClick={() => handleNavClick('quote')}
                  className="w-full bg-[#D4AF37] text-[#111111] py-3 font-bold uppercase text-xs tracking-widest text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  Get a Free Quote
                </button>
                <a
                  href="tel:4167200366"
                  className="w-full bg-transparent border border-[#D4AF37] text-brand-gold py-3 font-bold uppercase text-xs tracking-widest text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  Call 416-720-0366
                </a>
              </div>

              <div className="pt-4 border-t border-white/10 text-center space-y-1">
                <p className="text-xs text-gray-400">Mississauga, Ontario, Canada</p>
                <p className="text-[10px] text-gray-500 font-mono">info@torontocarservice.ca</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

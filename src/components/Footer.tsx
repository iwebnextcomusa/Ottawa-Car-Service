import { Shield, Phone, Mail, MapPin, ExternalLink, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Page } from '../types';

interface FooterProps {
  setCurrentPage: (page: Page) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const handleNavClick = (pageId: Page) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0d0d0d] border-t border-white/10 text-gray-400 text-sm pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Company Info column */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#D4AF37] flex items-center justify-center font-bold text-[#111111] text-sm">
              O
            </div>
            <span className="font-sans font-bold text-white text-lg tracking-tight uppercase">
              Ottawa<span className="text-brand-gold">Car</span>Service
            </span>
          </div>
          
          <p className="text-xs text-gray-400 leading-relaxed">
            Premium luxury private chauffeur and executive airport transportation across Ontario. Specializing in reliable, pristine door-to-door connections between Ottawa and Toronto.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <a href="#" className="w-8 h-8 border border-white/10 flex items-center justify-center hover:border-brand-gold text-brand-gold transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 border border-white/10 flex items-center justify-center hover:border-brand-gold text-brand-gold transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 border border-white/10 flex items-center justify-center hover:border-brand-gold text-brand-gold transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 border border-white/10 flex items-center justify-center hover:border-brand-gold text-brand-gold transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 className="font-sans text-white text-xs font-bold tracking-widest uppercase mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <button onClick={() => handleNavClick('home')} className="hover:text-brand-gold transition-colors cursor-pointer text-left">
                Home Page
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('about')} className="hover:text-brand-gold transition-colors cursor-pointer text-left">
                About Our Company
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('fleet')} className="hover:text-brand-gold transition-colors cursor-pointer text-left">
                Our Luxury Fleet
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('areas')} className="hover:text-brand-gold transition-colors cursor-pointer text-left">
                Ontario Service Areas
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('faq')} className="hover:text-brand-gold transition-colors cursor-pointer text-left">
                Frequently Asked Questions
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('quote')} className="hover:text-brand-gold transition-colors cursor-pointer text-left text-brand-gold font-medium">
                Get a Free Quote &rarr;
              </button>
            </li>
          </ul>
        </div>

        {/* Primary Services Column */}
        <div>
          <h4 className="font-sans text-white text-xs font-bold tracking-widest uppercase mb-4">
            Elite Services
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <button onClick={() => handleNavClick('airport')} className="hover:text-brand-gold transition-colors cursor-pointer text-left">
                Toronto Pearson Airport Transfers
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('ottawa-toronto')} className="hover:text-brand-gold transition-colors cursor-pointer text-left">
                Ottawa ↔ Toronto Car Service
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('corporate')} className="hover:text-brand-gold transition-colors cursor-pointer text-left">
                Corporate Transportation
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('services')} className="hover:text-brand-gold transition-colors cursor-pointer text-left">
                Hourly Private Chauffeurs
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('services')} className="hover:text-brand-gold transition-colors cursor-pointer text-left">
                Special Event & Wedding Transport
              </button>
            </li>
          </ul>
        </div>

        {/* Contact Information Column */}
        <div>
          <h4 className="font-sans text-white text-xs font-bold tracking-widest uppercase mb-4">
            Contact Concierge
          </h4>
          <ul className="space-y-3.5 text-xs">
            <li className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-brand-gold mt-0.5 flex-shrink-0" />
              <div>
                <span className="block text-gray-500 font-mono text-[10px]">RESERVATIONS & HELPLINE</span>
                <a href="tel:4167200366" className="font-mono text-white hover:text-brand-gold transition-colors text-sm font-semibold">
                  416-720-0366
                </a>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="w-4 h-4 text-brand-gold mt-0.5 flex-shrink-0" />
              <div>
                <span className="block text-gray-500 font-mono text-[10px]">EMAIL COMMUNICATIONS</span>
                <a href="mailto:info@torontocarservice.ca" className="text-white hover:text-brand-gold transition-colors">
                  info@torontocarservice.ca
                </a>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-brand-gold mt-0.5 flex-shrink-0" />
              <div>
                <span className="block text-gray-500 font-mono text-[10px]">BUSINESS LOCATION</span>
                <span className="text-white block">
                  Mississauga, Ontario, Canada
                </span>
                <span className="text-gray-500 text-[10px]">Servicing Ontario province-wide</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start">
          <span>&copy; {new Date().getFullYear()} OttawaCarService.net. All rights reserved.</span>
          <span className="text-gray-600">|</span>
          <a href="#" className="hover:text-brand-gold transition-colors">Privacy Policy</a>
          <span className="text-gray-600">|</span>
          <a href="#" className="hover:text-brand-gold transition-colors">Terms & Conditions</a>
        </div>
        
        {/* Attributions and Developed By Link */}
        <div className="text-center md:text-right font-display text-xs text-gray-400">
          Developed by <a 
            href="https://iwebnext.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-brand-gold font-bold hover:underline inline-flex items-center gap-0.5"
          >
            iWebNext
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}

import React, { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  ChevronRight, 
  Star, 
  ArrowRight, 
  Car, 
  Users, 
  Briefcase, 
  Award, 
  Clock, 
  Calendar, 
  Compass, 
  Send,
  Check,
  Map,
  Plus,
  Minus
} from 'lucide-react';

import Header from './components/Header';
import Footer from './components/Footer';
import QuoteForm from './components/QuoteForm';
import AIChatbot from './components/AIChatbot';

import { Page, ContactMessage } from './types';
import { FLEET_DATA, SERVICES_DATA, TESTIMONIALS_DATA, FAQ_DATA, ONTARIO_SERVICE_AREAS } from './data';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [activeFAQ, setActiveFAQ] = useState<string | null>('faq1');
  const [contactForm, setContactForm] = useState<ContactMessage>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Handle contact form submit
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactForm({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 1500);
  };

  // Page Switcher renderer
  const renderPageContent = () => {
    switch (currentPage) {
      case 'about':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0 }}
            className="py-16 max-w-5xl mx-auto px-6 space-y-16"
          >
            {/* Hero Header */}
            <div className="text-center space-y-4">
              <span className="text-xs font-mono text-brand-gold uppercase tracking-widest block">Who We Are</span>
              <h1 className="text-3xl md:text-5xl font-sans font-bold text-white tracking-tight uppercase">
                Luxury Chauffeur Service in Ontario
              </h1>
              <p className="text-gray-400 text-sm max-w-2xl mx-auto">
                Founded on the principles of extreme reliability, pristine presentation, and absolute client discretion.
              </p>
            </div>

            {/* About Split section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="relative overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  src="/src/assets/images/professional_chauffeur_1783538516107.jpg" 
                  alt="Professional Chauffeur in Ontario" 
                  referrerPolicy="no-referrer"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-5 bg-[#111111]/90 border border-white/10 text-xs">
                  <span className="text-brand-gold font-bold block uppercase tracking-wider mb-1">Our Safety Guarantee</span>
                  <p className="text-gray-300">All vehicles are fully commercially licensed, insured up to $5M, and operated by background-checked professional chauffeurs.</p>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-sans font-bold text-white uppercase tracking-tight">Our Story & Standards</h2>
                <p className="text-sm text-gray-300 leading-relaxed font-sans">
                  OttawaCarService.net has grown to become Ontario’s most trusted private chauffeur provider, serving Mississauga, Toronto, and Ottawa. We cater primarily to busy executives, diplomatic entourages, corporate fleets, and families who demand punctual travel.
                </p>
                <p className="text-sm text-gray-300 leading-relaxed font-sans">
                  We specialize in the long-distance express corridor between Toronto and Ottawa. By prioritizing a door-to-door, stress-free alternative to commercial regional airlines and rail, we give executives a quiet, private office to answer emails and rest.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="bg-[#0d0d0d] border border-white/10 p-5">
                    <span className="text-brand-gold font-serif text-2xl font-bold block italic">100%</span>
                    <span className="text-xs text-gray-400 uppercase tracking-wider">On-Time Dispatch</span>
                  </div>
                  <div className="bg-[#0d0d0d] border border-white/10 p-5">
                    <span className="text-brand-gold font-serif text-2xl font-bold block italic">24/7</span>
                    <span className="text-xs text-gray-400 uppercase tracking-wider">Live flight monitoring</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Values Bento */}
            <div className="space-y-8 pt-8">
              <div className="text-center">
                <h3 className="text-2xl font-sans font-bold text-white uppercase tracking-tight">Our Core Commitments</h3>
                <p className="text-xs text-gray-400 mt-1">Four pillars of premium chauffeured service quality.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-[#0d0d0d] border border-white/10 p-6 space-y-3">
                  <Shield className="w-8 h-8 text-brand-gold" />
                  <h4 className="font-sans font-bold text-white text-sm uppercase">Discreet Privacy</h4>
                  <p className="text-xs text-gray-400">Vetted chauffeurs signed under strict NDA guidelines to guarantee board-level privacy.</p>
                </div>
                <div className="bg-[#0d0d0d] border border-white/10 p-6 space-y-3">
                  <Clock className="w-8 h-8 text-brand-gold" />
                  <h4 className="font-sans font-bold text-white text-sm uppercase">Strict Punctuality</h4>
                  <p className="text-xs text-gray-400">Chauffeurs arrive at least 15 minutes prior to your scheduled pickup time, always.</p>
                </div>
                <div className="bg-[#0d0d0d] border border-white/10 p-6 space-y-3">
                  <Car className="w-8 h-8 text-brand-gold" />
                  <h4 className="font-sans font-bold text-white text-sm uppercase">Immaculate Clean</h4>
                  <p className="text-xs text-gray-400">Vehicles undergo extensive multi-point cleaning and sanitization prior to every booking.</p>
                </div>
                <div className="bg-[#0d0d0d] border border-white/10 p-6 space-y-3">
                  <Award className="w-8 h-8 text-brand-gold" />
                  <h4 className="font-sans font-bold text-white text-sm uppercase">Fixed Rates</h4>
                  <p className="text-xs text-gray-400">Upfront billing coordinates with absolutely no surges, peak multipliers, or hidden fees.</p>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'services':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0 }}
            className="py-16 max-w-6xl mx-auto px-6 space-y-16"
          >
            <div className="text-center space-y-4">
              <span className="text-xs font-mono text-brand-gold uppercase tracking-widest block">Premium Offerings</span>
              <h1 className="text-3xl md:text-5xl font-sans font-bold text-white tracking-tight uppercase">Our Chauffeur Services</h1>
              <p className="text-gray-400 text-sm max-w-2xl mx-auto">
                Tailored private transportation solutions built for corporate executives, tourists, and discerning individuals across Ontario.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SERVICES_DATA.map((srv) => (
                <div 
                  key={srv.id} 
                  className="bg-[#0d0d0d] border border-white/10 p-8 flex flex-col justify-between hover:border-[#D4AF37]/50 transition-all duration-300 shadow-xl group"
                >
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono text-brand-gold tracking-widest uppercase">Executive service</span>
                    <h3 className="text-xl font-sans font-bold text-white group-hover:text-brand-gold transition-colors uppercase tracking-tight">{srv.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">{srv.shortDesc}</p>
                    <p className="text-xs text-gray-300 leading-relaxed bg-[#111111] p-4 border border-white/10">{srv.fullDesc}</p>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/10 space-y-2">
                    <span className="text-[10px] font-mono text-gray-500 uppercase block">Includes:</span>
                    {srv.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                        <Check className="w-3.5 h-3.5 text-brand-gold" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Call to Action */}
            <div className="bg-[#0d0d0d] border border-white/10 p-10 text-center space-y-6 max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-sans font-bold text-white uppercase">Need a Specialized Transport Itinerary?</h3>
              <p className="text-xs text-gray-300 max-w-xl mx-auto leading-relaxed">
                We handle multi-day corporate roadshows, diplomatic security transport, and specialized cross-border logistics across Ontario. Contact our live dispatch at 416-720-0366 to discuss your details.
              </p>
              <div className="flex justify-center gap-4">
                <button 
                  onClick={() => setCurrentPage('quote')}
                  className="bg-brand-gold text-[#111111] px-6 py-3 text-xs font-sans font-bold uppercase tracking-widest hover:bg-white hover:text-[#111111] transition-colors cursor-pointer"
                >
                  Request a Formal Quote
                </button>
                <a 
                  href="tel:4167200366" 
                  className="border border-brand-gold text-brand-gold px-6 py-3 text-xs font-sans font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-brand-gold hover:text-black transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call 416-720-0366
                </a>
              </div>
            </div>
          </motion.div>
        );

      case 'ottawa-toronto':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0 }}
            className="py-16 max-w-6xl mx-auto px-6 space-y-16"
          >
            <div className="text-center space-y-4">
              <span className="text-xs font-mono text-brand-gold uppercase tracking-widest block">Premier Express Route</span>
              <h1 className="text-3xl md:text-5xl font-sans font-bold text-white tracking-tight uppercase">
                Ottawa ↔ Toronto Car Service
              </h1>
              <p className="text-gray-400 text-sm max-w-2xl mx-auto">
                Avoid regional flight delays and busy train terminals. Travel direct door-to-door in your own secure, quiet, chauffeured cabin.
              </p>
            </div>

            {/* Route explanation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start pt-8">
              <div className="space-y-6 bg-[#0d0d0d] p-8 border border-white/10">
                <h3 className="text-xl font-sans font-bold text-white uppercase tracking-tight">
                  Why Choose Road over Regional Air?
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-brand-gold/10 border border-white/10 flex items-center justify-center mt-1 flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-brand-gold" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase">Absolute Time Efficiency</h4>
                      <p className="text-xs text-gray-400 mt-1">Flying requires 1 hour driving to YOW, 2 hours security checks, 1 hour flight, and 1 hour luggage wait. Our door-to-door transit is a continuous 4.5 hours of stress-free workspace.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-brand-gold/10 border border-white/10 flex items-center justify-center mt-1 flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-brand-gold" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase">Quiet Office Cabin</h4>
                      <p className="text-xs text-gray-400 mt-1">Equipped with stable Wi-Fi and power hookups, our executive sedans and SUVs serve as a private office to hold conference calls and prepare materials in total privacy.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-brand-gold/10 border border-white/10 flex items-center justify-center mt-1 flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-brand-gold" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase">No Baggage Caps</h4>
                      <p className="text-xs text-gray-400 mt-1">Travel with presentation boards, luggage, or corporate merchandise. Our spacious SUVs handle any cargo requirements effortlessly.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quote widget inline */}
              <div className="bg-[#0d0d0d] border border-white/10 p-8 space-y-6">
                <div>
                  <h3 className="text-lg font-sans font-bold text-white uppercase tracking-tight">Calculate Ottawa ↔ Toronto Rate</h3>
                  <p className="text-xs text-gray-400 mt-1">Select your fleet option and view pricing instantly.</p>
                </div>

                <div className="space-y-4 font-mono text-xs">
                  {FLEET_DATA.map((f) => {
                    const price = f.basePrice + (450 * f.perKmPrice);
                    return (
                      <div key={f.id} className="flex justify-between items-center bg-[#111111] border border-white/10 p-4">
                        <div>
                          <span className="text-white block font-bold uppercase">{f.name}</span>
                          <span className="text-[10px] text-gray-500">Max {f.capacity} passengers, direct transit</span>
                        </div>
                        <div className="text-right">
                          <span className="text-brand-gold block font-semibold text-sm">${price} CAD</span>
                          <span className="text-[9px] text-gray-500">All-Inclusive</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button 
                  onClick={() => setCurrentPage('quote')}
                  className="w-full bg-brand-gold text-black py-4 text-xs font-sans font-bold uppercase tracking-widest text-center block hover:bg-white transition-colors cursor-pointer"
                >
                  Book This Route Online &rarr;
                </button>
              </div>
            </div>
          </motion.div>
        );

      case 'fleet':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0 }}
            className="py-16 max-w-6xl mx-auto px-6 space-y-16"
          >
            <div className="text-center space-y-4">
              <span className="text-xs font-mono text-brand-gold uppercase tracking-widest block">Elite Fleet</span>
              <h1 className="text-3xl md:text-5xl font-sans font-bold text-white tracking-tight uppercase">Luxury Vehicles</h1>
              <p className="text-gray-400 text-sm max-w-2xl mx-auto">
                Explore our meticulously maintained fleet of late-model executive sedans, spacious SUVs, and group passenger vans.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {FLEET_DATA.map((fleet) => (
                <div key={fleet.id} className="bg-[#0d0d0d] border border-white/10 overflow-hidden shadow-2xl flex flex-col justify-between">
                  <div>
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={fleet.image} 
                        alt={fleet.name} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-4 left-4 bg-[#111111] border border-white/10 text-brand-gold px-3 py-1 text-[10px] font-mono tracking-widest uppercase font-bold">
                        {fleet.category}
                      </span>
                    </div>

                    <div className="p-6 md:p-8 space-y-4">
                      <h3 className="text-xl font-sans font-bold text-white uppercase tracking-tight">{fleet.name}</h3>
                      <p className="text-xs text-gray-400 leading-relaxed font-sans">{fleet.description}</p>
                      
                      <div className="flex gap-4 text-xs font-mono text-gray-300 border-y border-white/10 py-3">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-brand-gold" />
                          {fleet.capacity} Passengers
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4 text-brand-gold" />
                          {fleet.luggage} Bags Max
                        </span>
                      </div>

                      <div className="space-y-1.5 pt-2">
                        <span className="text-[10px] font-mono text-brand-gold uppercase block font-semibold">Vehicle Features:</span>
                        {fleet.features.map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-gray-300 font-sans">
                            <Check className="w-3.5 h-3.5 text-brand-gold" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 md:p-8 pt-0 border-t border-white/10 mt-auto flex justify-between items-center bg-[#111111]/30">
                    <div>
                      <span className="text-[9px] font-mono text-gray-500 block uppercase">Base Rate</span>
                      <span className="text-white text-lg font-bold">${fleet.basePrice} <span className="text-xs text-gray-400 font-normal">CAD</span></span>
                    </div>
                    <button 
                      onClick={() => setCurrentPage('quote')}
                      className="bg-brand-gold text-[#111111] px-5 py-2.5 text-xs font-sans font-bold uppercase tracking-widest hover:bg-white transition-colors cursor-pointer"
                    >
                      Book Class
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case 'faq':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0 }}
            className="py-16 max-w-4xl mx-auto px-6 space-y-12"
          >
            <div className="text-center space-y-4">
              <span className="text-xs font-mono text-brand-gold uppercase tracking-widest block">Client Help</span>
              <h1 className="text-3xl md:text-5xl font-sans font-bold text-white tracking-tight uppercase">Frequently Asked Questions</h1>
              <p className="text-gray-400 text-sm max-w-2xl mx-auto">
                Detailed information regarding airport meet & greets, payment models, cancelation flexibility, and vehicle coordination.
              </p>
            </div>

            {/* Accordion list */}
            <div className="space-y-4">
              {FAQ_DATA.map((faq) => {
                const isOpen = activeFAQ === faq.id;
                return (
                  <div 
                    key={faq.id} 
                    className="border border-white/10 bg-[#0d0d0d]"
                  >
                    <button
                      onClick={() => setActiveFAQ(isOpen ? null : faq.id)}
                      className="w-full text-left p-5 md:p-6 flex justify-between items-center hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <div>
                        <span className="text-[9px] font-mono text-brand-gold uppercase tracking-wider block font-semibold mb-1">
                          {faq.category}
                        </span>
                        <h3 className="text-sm md:text-base font-sans font-bold text-white uppercase tracking-wide">
                          {faq.question}
                        </h3>
                      </div>
                      <div className="w-7 h-7 bg-[#111111] flex items-center justify-center text-brand-gold border border-white/10">
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div className="p-5 md:p-6 pt-0 border-t border-white/10 text-xs md:text-sm text-gray-300 leading-relaxed bg-[#111111]/30 font-sans">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        );

      case 'areas':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0 }}
            className="py-16 max-w-5xl mx-auto px-6 space-y-16"
          >
            <div className="text-center space-y-4">
              <span className="text-xs font-mono text-brand-gold uppercase tracking-widest block">Geographic Coverage</span>
              <h1 className="text-3xl md:text-5xl font-sans font-bold text-white tracking-tight uppercase">Ontario Service Areas</h1>
              <p className="text-gray-400 text-sm max-w-2xl mx-auto">
                We provide point-to-point transfers and luxury chauffeur hire throughout major Southern and Eastern Ontario cities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {ONTARIO_SERVICE_AREAS.map((area, idx) => (
                <div key={idx} className="bg-[#0d0d0d] border border-white/10 p-6 md:p-8 shadow-xl space-y-4">
                  <h3 className="text-sm md:text-base font-sans font-bold text-white border-b border-white/10 pb-3 uppercase tracking-widest">
                    {area.region}
                  </h3>
                  
                  <ul className="space-y-2.5">
                    {area.cities.map((city, cIdx) => (
                      <li key={cIdx} className="flex items-center gap-2 text-xs text-gray-300 font-sans">
                        <MapPin className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                        <span>{city}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Simulated Travel Route Visual Map */}
            <div className="bg-[#0d0d0d] border border-white/10 p-6 md:p-10 text-center space-y-6">
              <h3 className="text-xl font-sans font-bold text-white uppercase tracking-tight">Toronto ↔ Ottawa Express Corridor Coverage</h3>
              <p className="text-xs text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Our corridor service covers continuous pickups and dropoffs along the entire Highway 401 & 416 corridor, including Kingston, Belleville, Brockville, and Cornwall. Perfect for governmental commutes and academic relocations.
              </p>
              
              <div className="flex justify-center flex-wrap gap-2 text-[10px] font-mono text-brand-gold">
                {['Toronto', 'Pickering', 'Oshawa', 'Cobourg', 'Belleville', 'Kingston', 'Brockville', 'Kemptville', 'Ottawa'].map((node, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="bg-[#111111] px-3 py-1.5 border border-white/10 text-white font-medium">{node}</span>
                    {i < 8 && <span className="text-gray-600">&rarr;</span>}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 'contact':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0 }}
            className="py-16 max-w-5xl mx-auto px-6 space-y-16"
          >
            <div className="text-center space-y-4">
              <span className="text-xs font-mono text-brand-gold uppercase tracking-widest block">Get In Touch</span>
              <h1 className="text-3xl md:text-5xl font-sans font-bold text-white tracking-tight uppercase">Contact Our Dispatch</h1>
              <p className="text-gray-400 text-sm max-w-2xl mx-auto">
                Have questions about billing, fleet capabilities, or corporate accounts? Message us or call our 24/7 client helpline.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Contact Form */}
              <div className="lg:col-span-7 bg-[#0d0d0d] border border-white/10 p-6 md:p-8 shadow-xl">
                {contactSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 space-y-4"
                  >
                    <div className="w-12 h-12 bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6 text-brand-gold" />
                    </div>
                    <h3 className="text-lg font-sans font-bold text-white uppercase">Message Logged Successfully!</h3>
                    <p className="text-xs text-gray-400 max-w-xs mx-auto">Our logistics coordinators will reply via email within 15 minutes. For immediate changes, call us.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] text-gray-400 block mb-1">Your Name</label>
                        <input 
                          type="text" 
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          placeholder="Johnathan Sterling"
                          className="w-full bg-[#111111] text-white border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-brand-gold/40"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-gray-400 block mb-1">Email Address</label>
                        <input 
                          type="email" 
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          placeholder="j.sterling@firm.com"
                          className="w-full bg-[#111111] text-white border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-brand-gold/40"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] text-gray-400 block mb-1">Phone Number</label>
                        <input 
                          type="tel" 
                          required
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          placeholder="416-720-0366"
                          className="w-full bg-[#111111] text-white border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-brand-gold/40"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-gray-400 block mb-1">Subject</label>
                        <input 
                          type="text" 
                          required
                          value={contactForm.subject}
                          onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                          placeholder="e.g. Corporate Account Registration"
                          className="w-full bg-[#111111] text-white border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-brand-gold/40"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] text-gray-400 block mb-1">Inquiry Details</label>
                      <textarea 
                        required
                        rows={4}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Detail your transport scheduling questions or special requests..."
                        className="w-full bg-[#111111] text-white border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-brand-gold/40"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-brand-gold text-black py-4 text-xs font-sans font-bold uppercase tracking-widest hover:bg-white transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Dispatch Message</span>
                    </button>
                  </form>
                )}
              </div>

              {/* Contact Sidebar Details */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-[#0d0d0d] border border-white/10 p-6 space-y-6">
                  <h3 className="text-base font-sans font-bold text-white uppercase tracking-widest">Direct Contacts</h3>
                  
                  <div className="space-y-4 text-xs font-mono">
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-gray-500 block text-[10px]">RESERVATION HELPLINE</span>
                        <a href="tel:4167200366" className="text-white font-bold hover:text-brand-gold text-sm block mt-0.5">
                          416-720-0366
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-gray-500 block text-[10px]">EMAIL DESK</span>
                        <a href="mailto:info@torontocarservice.ca" className="text-white hover:text-brand-gold text-sm block mt-0.5">
                          info@torontocarservice.ca
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-gray-500 block text-[10px]">HEADQUARTERS</span>
                        <span className="text-white block mt-0.5">
                          Mississauga, Ontario, Canada
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#111111] border border-white/10 p-6 text-xs text-gray-400">
                  <span className="text-brand-gold font-sans font-bold uppercase block mb-2 tracking-wider">Corporate Registrations</span>
                  Are you an executive assistant booking for corporate roadshows? We setup unified billing profiles, monthly credit accounts, and direct dispatch privileges. Email info@torontocarservice.ca with subject line "Corporate Account Request" to begin.
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'quote':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0 }}
            className="py-12"
          >
            <div className="text-center space-y-4 mb-8">
              <span className="text-xs font-mono text-brand-gold uppercase tracking-widest block">Interactive Billing</span>
              <h1 className="text-3xl md:text-5xl font-sans font-bold text-white tracking-tight uppercase">Request an Upfront Quote</h1>
              <p className="text-gray-400 text-sm max-w-2xl mx-auto">
                No surprises. No peak pricing. Submit your pickup details below for a fixed private car quote instantly.
              </p>
            </div>
            <QuoteForm />
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Dynamic Navigation Header */}
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Main Dynamic View Content */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {currentPage === 'home' ? (
            <motion.div
              key="home-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-24"
            >
              {/* Full-width Luxury Hero Section */}
              <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-brand-dark">
                {/* Background Hero Image with Dark Gradient overlays */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src="/src/assets/images/luxury_sedan_hero_1783538488375.jpg" 
                    alt="Ottawa Car Service Black Sedan" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter brightness-[0.3]"
                  />
                  {/* Grid overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-[#050d17]/80" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#111111]/70 to-[#111111]" />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8 py-20">
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="inline-flex items-center gap-2 bg-brand-gold/5 border border-[#D4AF37]/30 px-4 py-1.5 text-brand-gold text-xs font-mono uppercase tracking-widest"
                  >
                    <Shield className="w-3.5 h-3.5 animate-pulse" />
                    <span>Premier Chauffeur Fleet & Airport Transit Ontario</span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-4"
                  >
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-sans font-bold tracking-tight text-white leading-none uppercase">
                      Executive Travel <br />
                      <span className="text-brand-gold font-normal font-serif italic lowercase block pt-2">redefined.</span>
                    </h1>
                    
                    <p className="text-gray-300 text-sm md:text-lg max-w-3xl mx-auto font-sans leading-relaxed">
                      Experience executive reliability across Ontario. Specializing in direct, door-to-door luxury transfers between Ottawa and Toronto with live flight monitoring and transparent upfront pricing.
                    </p>
                  </motion.div>

                  {/* CTA Buttons row */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                  >
                    <button
                      onClick={() => {
                        setCurrentPage('quote');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full sm:w-auto bg-brand-gold text-black px-8 py-4 text-xs font-sans font-bold uppercase tracking-widest hover:bg-white transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Get an Instant Quote</span>
                    </button>
                    
                    <a
                      href="tel:4167200366"
                      className="w-full sm:w-auto bg-transparent border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-[#111111] px-8 py-4 text-xs font-sans font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4 animate-bounce" />
                      <span>Call Concierge: 416-720-0366</span>
                    </a>
                  </motion.div>

                  {/* Trust Signals bar */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 max-w-4xl mx-auto border-t border-white/10 text-xs text-gray-300 font-mono"
                  >
                    <div className="flex items-center gap-2 justify-center bg-[#0d0d0d] p-4 border border-white/10">
                      <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                      <span>Fixed Honest Rates</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center bg-[#0d0d0d] p-4 border border-white/10">
                      <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                      <span>Licensed & Insured</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center bg-[#0d0d0d] p-4 border border-white/10">
                      <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                      <span>24/7 Dispatch Desk</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center bg-[#0d0d0d] p-4 border border-white/10">
                      <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                      <span>100% Punctual Guarantee</span>
                    </div>
                  </motion.div>
                </div>

                {/* Ambient Bottom Fade */}
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#111111] to-transparent pointer-events-none" />
              </section>

              {/* Services Overview Section */}
              <section className="bg-[#0d0d0d] py-20 border-y border-white/10">
                <div className="max-w-7xl mx-auto px-6 space-y-12">
                  <div className="text-center space-y-3">
                    <span className="text-xs font-mono text-brand-gold uppercase tracking-widest block">Professional Logistics</span>
                    <h2 className="text-2xl md:text-4xl font-sans font-bold text-white uppercase tracking-tight">Elite Ground Services</h2>
                    <p className="text-gray-400 text-sm max-w-xl mx-auto">
                      Premium private transportation designed specifically to coordinate with your executive schedule.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {SERVICES_DATA.slice(0, 3).map((srv) => (
                      <div 
                        key={srv.id} 
                        className="bg-[#111111] border border-white/10 hover:border-brand-gold/50 p-8 flex flex-col justify-between transition-all duration-300 group cursor-pointer shadow-lg"
                        onClick={() => {
                          if (srv.id === 'ottawa-toronto') {
                            setCurrentPage('ottawa-toronto');
                          } else {
                            setCurrentPage('services');
                          }
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      >
                        <div className="space-y-4">
                          <span className="text-[9px] font-mono text-brand-gold uppercase tracking-widest">Ontario Travel</span>
                          <h3 className="text-lg font-sans font-bold text-white uppercase tracking-tight group-hover:text-brand-gold transition-colors">{srv.title}</h3>
                          <p className="text-xs text-gray-400 leading-relaxed">{srv.shortDesc}</p>
                        </div>
                        
                        <div className="mt-6 flex items-center gap-1 text-xs text-brand-gold font-bold uppercase tracking-wider group-hover:gap-2 transition-all">
                          <span>Read Full Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center pt-4">
                    <button 
                      onClick={() => {
                        setCurrentPage('services');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-[#111111] px-8 py-3 text-xs font-sans font-bold uppercase tracking-widest transition-colors cursor-pointer"
                    >
                      View All Services &rarr;
                    </button>
                  </div>
                </div>
              </section>

              {/* Fleet Preview Section */}
              <section className="max-w-7xl mx-auto px-6 space-y-12">
                <div className="text-center space-y-3">
                  <span className="text-xs font-mono text-brand-gold uppercase tracking-widest block">Executive Cabins</span>
                  <h2 className="text-2xl md:text-4xl font-sans font-bold text-white uppercase tracking-tight">Our Executive Fleet</h2>
                  <p className="text-gray-400 text-sm max-w-xl mx-auto">
                    Meticulously cleaned, late-model luxury vehicles to guarantee complete comfort and high road safety.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {FLEET_DATA.map((fleet) => (
                    <div 
                      key={fleet.id} 
                      className="bg-[#0d0d0d] overflow-hidden border border-white/10 flex flex-col justify-between hover:border-[#D4AF37]/50 transition-all shadow-xl cursor-pointer"
                      onClick={() => {
                        setCurrentPage('fleet');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      <div>
                        <div className="h-48 overflow-hidden relative">
                          <img 
                            src={fleet.image} 
                            alt={fleet.name} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute top-4 left-4 bg-[#111111] border border-white/10 text-brand-gold text-[9px] font-mono px-2.5 py-1 uppercase">
                            {fleet.category}
                          </span>
                        </div>
                        <div className="p-6 space-y-3">
                          <h3 className="text-lg font-sans font-bold text-white uppercase tracking-tight">{fleet.name}</h3>
                          <p className="text-xs text-gray-400 truncate-2-lines">{fleet.description}</p>
                          <div className="flex gap-4 text-[11px] font-mono text-gray-300 pt-2">
                            <span className="flex items-center gap-1">
                              <Users className="w-3.5 h-3.5 text-brand-gold" />
                              {fleet.capacity} passengers
                            </span>
                            <span className="flex items-center gap-1">
                              <Briefcase className="w-3.5 h-3.5 text-brand-gold" />
                              {fleet.luggage} bags
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 pt-0 border-t border-white/5 mt-4 flex justify-between items-center">
                        <span className="text-xs text-gray-400">View features &rarr;</span>
                        <span className="text-brand-gold text-xs font-semibold">From ${fleet.basePrice} CAD</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Trust signals / Why Choose Us */}
              <section className="bg-[#0d0d0d] py-20 border-y border-white/10">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                  <div className="space-y-6">
                    <div>
                      <span className="text-xs font-mono text-brand-gold uppercase tracking-widest block">Core Commitments</span>
                      <h2 className="text-2xl md:text-4xl font-sans font-bold text-white uppercase mt-1">Why Travel with OttawaCarService.net?</h2>
                    </div>
                    
                    <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                      We operate a premium logistics coordination desk. Beyond pristine cars, we manage complex travel timelines, ensuring complete peace of mind.
                    </p>

                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 bg-[#111111] border border-white/10 flex items-center justify-center text-brand-gold flex-shrink-0">
                          <Clock className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white uppercase">Professional Chauffeurs Only</h4>
                          <p className="text-xs text-gray-400 mt-1">Our elite drivers undergo extensive background screening, drug-testing, and rigorous defensive drive certifications.</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="w-10 h-10 bg-[#111111] border border-white/10 flex items-center justify-center text-brand-gold flex-shrink-0">
                          <Compass className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white uppercase">24/7 Auto Flight Tracking</h4>
                          <p className="text-xs text-gray-400 mt-1">We synchronize with global aviation databases. Delayed or early flights trigger automatic pickup time recalibration.</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="w-10 h-10 bg-[#111111] border border-white/10 flex items-center justify-center text-brand-gold flex-shrink-0">
                          <Shield className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white uppercase">Secure Fixed Upfront Estimates</h4>
                          <p className="text-xs text-gray-400 mt-1">No billing surprises. Lock in your exact private car transit rate before departure, completely free of peak hourly charges.</p>
                        </div>
                      </div>
                    </div>
                  </div>


                </div>
              </section>

              {/* Dynamic Testimonials Carousel */}
              <section className="max-w-4xl mx-auto px-6 space-y-10">
                <div className="text-center space-y-3">
                  <span className="text-xs font-mono text-brand-gold uppercase tracking-widest block">Client Feedback</span>
                  <h2 className="text-2xl md:text-4xl font-sans font-bold text-white uppercase">Executive Endorsements</h2>
                </div>

                <div className="bg-[#0d0d0d] border border-white/10 p-8 md:p-12 relative shadow-2xl">
                  {/* Rating stars */}
                  <div className="flex gap-1 justify-center mb-6 text-brand-gold">
                    {[...Array(TESTIMONIALS_DATA[testimonialIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>

                  <blockquote className="text-center text-sm md:text-base text-gray-200 italic leading-relaxed">
                    "{TESTIMONIALS_DATA[testimonialIndex].text}"
                  </blockquote>

                  <div className="text-center mt-6">
                    <span className="block font-sans font-bold text-white text-sm uppercase">
                      {TESTIMONIALS_DATA[testimonialIndex].name}
                    </span>
                    <span className="block text-[11px] text-gray-400 font-mono mt-0.5 uppercase tracking-wider">
                      {TESTIMONIALS_DATA[testimonialIndex].role} &middot; {TESTIMONIALS_DATA[testimonialIndex].company}
                    </span>
                  </div>

                  {/* Carousel Indicators */}
                  <div className="flex justify-center gap-2 mt-8">
                    {TESTIMONIALS_DATA.map((_, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setTestimonialIndex(idx)}
                        className={`w-2.5 h-2.5 transition-all cursor-pointer border border-white/25 ${
                          testimonialIndex === idx ? 'bg-brand-gold w-6' : 'bg-gray-600'
                        }`}
                        title={`Slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </section>

              {/* Interactive FAQ Preview */}
              <section className="max-w-4xl mx-auto px-6 space-y-8">
                <div className="text-center space-y-3">
                  <span className="text-xs font-mono text-brand-gold uppercase tracking-widest block">Common Concerns</span>
                  <h2 className="text-2xl md:text-4xl font-sans font-bold text-white uppercase">Frequently Asked Questions</h2>
                </div>

                <div className="space-y-4">
                  {FAQ_DATA.slice(0, 3).map((faq) => {
                    const isOpen = activeFAQ === faq.id;
                    return (
                      <div key={faq.id} className="border border-white/10 bg-[#0d0d0d] overflow-hidden">
                        <button
                          onClick={() => setActiveFAQ(isOpen ? null : faq.id)}
                          className="w-full text-left p-5 flex justify-between items-center cursor-pointer"
                        >
                          <span className="text-xs md:text-sm font-sans font-bold text-white uppercase tracking-wider">{faq.question}</span>
                          <span className="text-brand-gold">{isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}</span>
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                            >
                              <div className="p-5 pt-0 border-t border-white/5 text-xs text-gray-400 leading-relaxed">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                <div className="text-center pt-4">
                  <button 
                    onClick={() => {
                      setCurrentPage('faq');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-[#111111] px-6 py-2.5 text-xs font-sans font-bold uppercase tracking-widest transition-colors cursor-pointer"
                  >
                    Read All FAQ Accordions &rarr;
                  </button>
                </div>
              </section>

              {/* Final Bottom Call to Action Section */}
              <section className="bg-[#0d0d0d] py-20 border-t border-white/10 text-center">
                <div className="max-w-3xl mx-auto px-6 space-y-6">
                  <h2 className="text-3xl md:text-5xl font-sans font-bold text-white tracking-tight leading-tight uppercase">
                    Ready to commute in <br />
                    <span className="text-brand-gold font-normal font-serif italic lowercase block pt-2">absolute luxury & comfort?</span>
                  </h2>
                  <p className="text-xs md:text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">
                    Reserve your executive black-car sedan, SUV, or group sprinter van today. No deposit required for standard airport bookings.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-4">
                    <button
                      onClick={() => {
                        setCurrentPage('quote');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full sm:w-auto bg-brand-gold text-[#111111] font-sans font-bold uppercase tracking-widest px-8 py-4 text-xs hover:bg-white hover:text-[#111111] transition-colors cursor-pointer"
                    >
                      Book Car Online
                    </button>
                    <a
                      href="tel:4167200366"
                      className="w-full sm:w-auto bg-transparent border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-[#111111] px-8 py-4 text-xs font-sans font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Dispatch: 416-720-0366</span>
                    </a>
                  </div>
                </div>
              </section>
            </motion.div>
          ) : (
            // Inner Pages
            <div className="bg-[#111111] min-h-[70vh]">
              {renderPageContent()}
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating AI Chatbot Widget (Bottom-Right corner) */}
      <AIChatbot />

      {/* Floating Scroll to Top button (Optional but requested: "Add a floating scroll-to-top button. Show button after user scrolls down. Smooth scroll back to top. Include hover animation.") */}
      <ScrollToTop />

      {/* Professional Footer */}
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

// Inline Sub-component: Floating Scroll to Top Button
function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-24 left-6 z-40 bg-[#0B1F3A]/90 border border-brand-gold/20 text-brand-gold w-11 h-11 rounded-full flex items-center justify-center shadow-xl hover:text-white hover:border-brand-gold transition-colors cursor-pointer backdrop-blur-md"
          title="Scroll back to top"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

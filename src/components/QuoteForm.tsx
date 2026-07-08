import React, { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, Users, Car, MapPin, User, Mail, Phone, FileText, CheckCircle2, DollarSign, History, Trash2, ShieldCheck, HelpCircle } from 'lucide-react';
import { QuoteRequest } from '../types';
import { FLEET_DATA } from '../data';

export default function QuoteForm() {
  const [formData, setFormData] = useState<QuoteRequest>({
    pickupLocation: '',
    dropoffLocation: '',
    date: '',
    time: '',
    passengers: 1,
    vehicleType: 'luxury-sedan',
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  const [distance, setDistance] = useState<number>(0);
  const [estimatedPrice, setEstimatedPrice] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [savedQuotes, setSavedQuotes] = useState<QuoteRequest[]>([]);

  // Calculate simulated distance & price
  useEffect(() => {
    let simDistance = 45; // Default average trip distance in km
    
    const pickupLower = formData.pickupLocation.toLowerCase();
    const dropoffLower = formData.dropoffLocation.toLowerCase();

    // Specific route: Ottawa <-> Toronto
    if (
      (pickupLower.includes('ottawa') && dropoffLower.includes('toronto')) ||
      (pickupLower.includes('toronto') && dropoffLower.includes('ottawa'))
    ) {
      simDistance = 450;
    } else if (pickupLower.includes('pearson') || dropoffLower.includes('pearson')) {
      // Local airport trip from Mississauga/GTA
      if (pickupLower.includes('mississauga') || dropoffLower.includes('mississauga')) {
        simDistance = 18;
      } else if (pickupLower.includes('oakville') || dropoffLower.includes('oakville')) {
        simDistance = 35;
      } else {
        simDistance = 40;
      }
    } else if (formData.pickupLocation && formData.dropoffLocation) {
      // Standard local trip
      simDistance = 32;
    } else {
      simDistance = 0;
    }

    setDistance(simDistance);

    const vehicle = FLEET_DATA.find((v) => v.id === formData.vehicleType);
    if (vehicle && simDistance > 0) {
      const calculated = vehicle.basePrice + (simDistance * vehicle.perKmPrice);
      setEstimatedPrice(Math.round(calculated));
    } else {
      setEstimatedPrice(0);
    }
  }, [formData.pickupLocation, formData.dropoffLocation, formData.vehicleType]);

  // Load saved quotes from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('ottawa_chauffeur_quotes');
      if (stored) {
        setSavedQuotes(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const ref = 'OCS-' + Math.floor(100000 + Math.random() * 900000);
    setReferenceId(ref);

    const newQuote: QuoteRequest = {
      ...formData,
      id: ref,
      status: 'pending',
      priceEstimate: estimatedPrice,
      createdAt: new Date().toLocaleDateString()
    };

    const updatedQuotes = [newQuote, ...savedQuotes];
    setSavedQuotes(updatedQuotes);
    
    try {
      localStorage.setItem('ottawa_chauffeur_quotes', JSON.stringify(updatedQuotes));
    } catch (e) {
      console.error(e);
    }

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      pickupLocation: '',
      dropoffLocation: '',
      date: '',
      time: '',
      passengers: 1,
      vehicleType: 'luxury-sedan',
      name: '',
      email: '',
      phone: '',
      notes: ''
    });
    setIsSubmitted(false);
  };

  const deleteQuote = (id: string) => {
    const filtered = savedQuotes.filter((q) => q.id !== id);
    setSavedQuotes(filtered);
    try {
      localStorage.setItem('ottawa_chauffeur_quotes', JSON.stringify(filtered));
    } catch (e) {
      console.error(e);
    }
  };

  const selectedVehicle = FLEET_DATA.find((v) => v.id === formData.vehicleType) || FLEET_DATA[0];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form Panel */}
        <div className="lg:col-span-7 bg-[#0d0d0d] border border-white/10 p-6 md:p-8 shadow-xl">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form-entry"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="mb-6">
                  <h3 className="text-xl md:text-2xl font-sans font-bold text-white uppercase tracking-tight">
                    Request an Executive Quote
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Fill out the form below for an transparent, instant fixed-rate estimate. Our dispatchers will review and confirm within 15 minutes.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Step 1: Routing Info */}
                  <div className="bg-[#111111] p-4 space-y-4 border border-white/10">
                    <span className="text-[10px] font-mono text-brand-gold uppercase tracking-wider block font-semibold">
                      1. Route Details
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative">
                        <label className="text-[11px] text-gray-400 block mb-1">Pickup Address / Airport Terminal</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-brand-gold" />
                          <input
                            type="text"
                            required
                            placeholder="e.g. Toronto Pearson Airport Post 15"
                            value={formData.pickupLocation}
                            onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                            className="w-full bg-[#0d0d0d] text-white border border-white/10 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-brand-gold/40 transition-colors"
                          />
                        </div>
                      </div>

                      <div className="relative">
                        <label className="text-[11px] text-gray-400 block mb-1">Dropoff Address / Destination</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-brand-gold" />
                          <input
                            type="text"
                            required
                            placeholder="e.g. Westin Hotel, Ottawa, ON"
                            value={formData.dropoffLocation}
                            onChange={(e) => setFormData({ ...formData, dropoffLocation: e.target.value })}
                            className="w-full bg-[#0d0d0d] text-white border border-white/10 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-brand-gold/40 transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[11px] text-gray-400 block mb-1">Date of Service</label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-brand-gold" />
                          <input
                            type="date"
                            required
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full bg-[#0d0d0d] text-white border border-white/10 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-brand-gold/40 transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] text-gray-400 block mb-1">Pickup Time</label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-3.5 w-4 h-4 text-brand-gold" />
                          <input
                            type="time"
                            required
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            className="w-full bg-[#0d0d0d] text-white border border-white/10 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-brand-gold/40 transition-colors"
                          />
                        </div>
                      </div>

                      <div className="col-span-2 md:col-span-1">
                        <label className="text-[11px] text-gray-400 block mb-1">Passengers</label>
                        <div className="relative">
                          <Users className="absolute left-3 top-3.5 w-4 h-4 text-brand-gold" />
                          <select
                            value={formData.passengers}
                            onChange={(e) => setFormData({ ...formData, passengers: parseInt(e.target.value) })}
                            className="w-full bg-[#0d0d0d] text-white border border-white/10 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-brand-gold/40 transition-colors appearance-none"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((num) => (
                              <option key={num} value={num} className="bg-brand-dark text-white">
                                {num} Passenger{num > 1 ? 's' : ''}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Vehicle Selection */}
                  <div className="bg-[#111111] p-4 space-y-3 border border-white/10">
                    <span className="text-[10px] font-mono text-brand-gold uppercase tracking-wider block font-semibold">
                      2. Select Chauffeur Fleet Class
                    </span>
                    
                    <div className="grid grid-cols-3 gap-3">
                      {FLEET_DATA.map((fleet) => (
                        <button
                          key={fleet.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, vehicleType: fleet.id })}
                          className={`p-3 border text-left transition-all flex flex-col justify-between ${
                            formData.vehicleType === fleet.id
                              ? 'border-brand-gold bg-brand-gold/10 text-white'
                              : 'border-white/15 bg-[#0d0d0d] text-gray-300 hover:border-white/30'
                          }`}
                        >
                          <span className="text-xs font-semibold block">{fleet.name.split(' ')[1] || fleet.name}</span>
                          <span className="text-[10px] text-gray-400 mt-1 block">Max {fleet.capacity} passengers</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 3: Contact Info */}
                  <div className="bg-[#111111] p-4 space-y-4 border border-white/10">
                    <span className="text-[10px] font-mono text-brand-gold uppercase tracking-wider block font-semibold">
                      3. Contact Details
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[11px] text-gray-400 block mb-1">Your Full Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-3.5 w-4 h-4 text-brand-gold" />
                          <input
                            type="text"
                            required
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-[#0d0d0d] text-white border border-white/10 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-brand-gold/40 transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] text-gray-400 block mb-1">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3.5 w-4 h-4 text-brand-gold" />
                          <input
                            type="email"
                            required
                            placeholder="name@company.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-[#0d0d0d] text-white border border-white/10 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-brand-gold/40 transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] text-gray-400 block mb-1">Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3.5 w-4 h-4 text-brand-gold" />
                          <input
                            type="tel"
                            required
                            placeholder="416-555-0199"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full bg-[#0d0d0d] text-white border border-white/10 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-brand-gold/40 transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] text-gray-400 block mb-1">Special Instructions / Flight Number (Optional)</label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-3.5 w-4 h-4 text-brand-gold" />
                        <textarea
                          placeholder="Please provide flight number for tracking, or describe complex multi-stop pickup requests..."
                          rows={2}
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          className="w-full bg-[#0d0d0d] text-white border border-white/10 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-brand-gold/40 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-[#D4AF37] text-[#111111] py-4 text-xs font-sans font-bold uppercase tracking-widest hover:bg-white hover:text-[#111111] transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Submit Formal Quote Request &rarr;</span>
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="form-submitted"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-10"
              >
                <div className="w-16 h-16 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-brand-gold animate-bounce" />
                </div>
                
                <h3 className="text-2xl font-display font-bold text-white tracking-tight">
                  Quote Request Submitted Successfully!
                </h3>
                
                <p className="text-xs text-gray-300 max-w-md mx-auto mt-3 leading-relaxed">
                  Your luxury travel request has been logged. Our dispatchers are reviewing flight times and route coordinates. A formal confirmation has been sent to <span className="text-white font-semibold">{formData.email}</span>.
                </p>

                {/* Reservation Summary Card */}
                <div className="max-w-md mx-auto bg-brand-dark/60 rounded-xl border border-brand-gold/15 p-5 my-8 text-left space-y-3 font-mono text-xs">
                  <div className="flex justify-between border-b border-white/5 pb-2 text-brand-gold">
                    <span>REFERENCE ID:</span>
                    <span className="font-bold">{referenceId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">CHAUFFEUR CLASS:</span>
                    <span className="text-white">{selectedVehicle.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">PICKUP:</span>
                    <span className="text-white truncate max-w-[240px]" title={formData.pickupLocation}>
                      {formData.pickupLocation}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">DATE & TIME:</span>
                    <span className="text-white">{formData.date} @ {formData.time}</span>
                  </div>
                  <div className="flex justify-between border-t border-white/5 pt-2 font-display text-sm font-semibold">
                    <span className="text-brand-gold">ESTIMATED TOTAL:</span>
                    <span className="text-white">${estimatedPrice} CAD</span>
                  </div>
                </div>

                <div className="space-y-4 max-w-sm mx-auto">
                  <button
                    onClick={handleReset}
                    className="w-full bg-brand-navy border border-brand-gold/30 text-brand-gold py-3 rounded-lg text-xs font-display font-semibold uppercase tracking-wider hover:bg-brand-navy/80 cursor-pointer"
                  >
                    Calculate Another Route
                  </button>
                  <a
                    href="tel:4167200366"
                    className="block bg-brand-gold text-black font-display py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-center"
                  >
                    Call Dispatch for Instant Confirmation
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Live Invoice Preview Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0d0d0d] border border-white/10 p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/5 rounded-full filter blur-xl" />
            
            <h4 className="font-display font-bold text-white tracking-wider text-sm uppercase mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-gold" />
              Luxury Travel Estimate
            </h4>

            {/* Visual Invoice representation */}
            <div className="space-y-4">
              <div className="flex justify-between items-start text-xs border-b border-white/5 pb-3">
                <div>
                  <span className="text-gray-400 block">SELECTED VEHICLE</span>
                  <span className="text-white font-semibold text-sm block mt-0.5">{selectedVehicle.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-gray-400 block">BASE RATE</span>
                  <span className="text-brand-gold font-mono font-medium block mt-0.5">${selectedVehicle.basePrice} CAD</span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Estimated Distance:</span>
                  <span className="text-white font-mono">{distance > 0 ? `${distance} km` : 'Enter route details...'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Kilometer Fee Rate:</span>
                  <span className="text-white font-mono">${selectedVehicle.perKmPrice.toFixed(2)}/km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Fuel & Toll Surcharge:</span>
                  <span className="text-green-400 font-mono">Included (Fixed)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Chauffeur Service Gratuity:</span>
                  <span className="text-white font-mono">At your discretion</span>
                </div>
              </div>

              <div className="h-[1px] bg-white/10 my-4" />

              {/* Huge Live Price Display */}
              <div className="text-center py-4 bg-[#111111] border border-white/10">
                <span className="text-[10px] font-mono text-brand-gold uppercase tracking-widest block font-medium">
                  Estimated Pricing
                </span>
                <div className="flex items-center justify-center text-white mt-1.5">
                  <DollarSign className="w-5 h-5 text-brand-gold" />
                  <span className="text-3xl font-sans font-extrabold tracking-tight">
                    {estimatedPrice > 0 ? estimatedPrice : '---'}
                  </span>
                  <span className="text-xs text-gray-400 font-semibold ml-1">CAD</span>
                </div>
                <span className="text-[9px] text-gray-500 block mt-1">Includes all taxes, flight tracking & airport wait time</span>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-2 gap-3 text-[10px] text-gray-400 pt-2 font-mono">
                <div className="flex items-center gap-1.5 bg-brand-dark/50 p-2 rounded border border-white/5">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                  <span>No Surge Rates</span>
                </div>
                <div className="flex items-center gap-1.5 bg-brand-dark/50 p-2 rounded border border-white/5">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                  <span>Free Flight Track</span>
                </div>
              </div>
            </div>
          </div>

          {/* Saved Quotes / Bookings History Section */}
          {savedQuotes.length > 0 && (
            <div className="bg-[#050b13] border border-white/5 rounded-2xl p-5 shadow-xl">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-display font-semibold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5 text-brand-gold" />
                  Your Quote History
                </h4>
                <button
                  onClick={() => {
                    localStorage.removeItem('ottawa_chauffeur_quotes');
                    setSavedQuotes([]);
                  }}
                  className="text-gray-500 hover:text-red-400 transition-colors text-[10px] font-mono uppercase flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  Clear All
                </button>
              </div>

              <div className="space-y-3 max-h-[180px] overflow-y-auto no-scrollbar">
                {savedQuotes.map((quote) => (
                  <div key={quote.id} className="bg-brand-dark/50 p-3 rounded-lg border border-brand-gold/10 flex items-center justify-between text-xs font-mono relative">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-bold">{quote.id}</span>
                        <span className="text-[10px] bg-brand-navy text-brand-gold px-1.5 py-0.2 rounded">Pending</span>
                      </div>
                      <span className="text-gray-500 text-[10px] block mt-1">{quote.pickupLocation.split(',')[0]} &rarr; {quote.dropoffLocation.split(',')[0]}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-brand-gold block font-semibold">${quote.priceEstimate} CAD</span>
                      <button
                        onClick={() => quote.id && deleteQuote(quote.id)}
                        className="text-gray-600 hover:text-red-400 p-1 mt-1 inline-block cursor-pointer"
                        title="Delete Quote"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

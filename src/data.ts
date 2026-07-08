import { FleetItem, Testimonial, FAQItem } from './types';

export const FLEET_DATA: FleetItem[] = [
  {
    id: 'luxury-sedan',
    name: 'Executive Luxury Sedan',
    category: 'Sedan Class',
    description: 'Immaculate late-model flagship sedans like the Mercedes-Benz S-Class, BMW 7 Series, or Lexus LS. Ideal for corporate travelers, VIPs, and business executives seeking absolute comfort and privacy.',
    capacity: 3,
    luggage: 3,
    features: [
      'Heated & ventilated reclining rear seats',
      'Rear climate controls & privacy shades',
      'High-speed premium Wi-Fi connectivity',
      'Complimentary bottled spring water & chargers',
      'Spacious leather interior with ambient lighting'
    ],
    image: '/src/assets/images/luxury_sedan_hero_1783538488375.jpg',
    basePrice: 150,
    perKmPrice: 2.20
  },
  {
    id: 'executive-suv',
    name: 'Elite Executive SUV',
    category: 'SUV Class',
    description: 'Commanding and spacious full-size luxury SUVs including the Cadillac Escalade, Lincoln Navigator, and Chevrolet Suburban. Offers ultimate road presence, legroom, and maximum luggage space.',
    capacity: 6,
    luggage: 6,
    features: [
      'Captain-chair seating with soft premium leather',
      'Generous cargo volume for large airport bags',
      'Individual climate zones & sound system',
      'Complementary refreshments & device docks',
      'All-wheel drive for superior Canadian winter safety'
    ],
    image: '/src/assets/images/luxury_suv_fleet_1783538502973.jpg',
    basePrice: 195,
    perKmPrice: 2.75
  },
  {
    id: 'executive-van',
    name: 'Mercedes-Benz Sprinter',
    category: 'Van Class',
    description: 'The standard of luxury group travel. Outfitted as an executive coach for corporate teams, wedding parties, or family groups seeking premium coordination and high-headroom comfort.',
    capacity: 14,
    luggage: 14,
    features: [
      'Standing height clearance & wide entry step',
      'Leather conference-style seating layout',
      'Dedicated massive rear luggage hold',
      'LCD screens, USB outlets at every seat row',
      'Ideal for group corporate events & airport transfers'
    ],
    image: '/src/assets/images/luxury_sprinter_van_1783540272301.jpg',
    basePrice: 275,
    perKmPrice: 3.50
  }
];

export const SERVICES_DATA = [
  {
    id: 'airport-transfers',
    title: 'Airport Transfers',
    shortDesc: 'Stress-free executive transfers to Toronto Pearson (YYZ), Ottawa Airport (YOW), Billy Bishop, and Hamilton with full flight tracking.',
    fullDesc: 'We provide specialized private airport pickup and drop-off services across Ontario. Our advanced reservation system integrates live FAA flight monitoring to guarantee your chauffeur is waiting the exact moment you land. We offer both curbside pickup and meet-and-greet services inside Terminal 1 & 3 at Pearson Airport, helping you bypass long taxi lines and proceed straight to your destination.',
    features: ['24/7 Live flight tracking', '60 Minutes complimentary wait time', 'Professional meet-and-greet interior service', 'Luggage assistance from carousel to vehicle']
  },
  {
    id: 'ottawa-toronto',
    title: 'Ottawa ↔ Toronto Car Service',
    shortDesc: 'Premium point-to-point private chauffeured travel between Ottawa and Toronto. The elegant, stress-free alternative to flights and trains.',
    fullDesc: 'Skip the security lines, delays, and transfers of commercial flying or rail travel. Our dedicated Ottawa-to-Toronto (and Toronto-to-Ottawa) express service connects the nation’s capital to Ontario’s economic hub in seamless luxury. Relax, answer emails over high-speed Wi-Fi, or rest in the reclining leather cabin of a luxury Sedan or SUV. Available for direct door-to-door transit, round-trips, or same-day business turnarounds.',
    features: ['Direct door-to-door executive travel', 'Flexible departure times', 'Private, quiet work-conducive cabins', 'Professional stops along Hwy 401 & 416 on demand']
  },
  {
    id: 'corporate-transportation',
    title: 'Corporate Transportation',
    shortDesc: 'Dedicated black-car services for corporate teams, roadshows, board members, and executive itineraries with corporate account billing.',
    fullDesc: 'For businesses demanding reliability, we offer seamless corporate ground transportation solutions. From executive roadshows to airport shuttles for international board members, our immaculate fleet and vetted chauffeurs project the highest degree of professionalism. We provide centralized invoicing, priority bookings, and custom corporate billing accounts with detailed travel reporting.',
    features: ['Dedicated corporate account managers', 'Discreet, background-checked elite chauffeurs', 'Corporate monthly invoicing & priority dispatch', 'Flexible hourly charter or point-to-point options']
  },
  {
    id: 'hourly-chauffeur',
    title: 'Hourly Chauffeur Service',
    shortDesc: 'Have a private chauffeur at your disposal for business meetings, shopping sprees, city tours, or complex multi-stop schedules.',
    fullDesc: 'With our highly adaptable hourly charter service, you enjoy maximum flexibility. Your professional chauffeur and luxury vehicle remain dedicated to your exclusive instruction for the duration of the booking. Direct your chauffeur to multiple locations, have them wait during meetings or dining, and adjust your itinerary in real-time. Minimum 3-hour booking requirement.',
    features: ['Absolute freedom of itinerary', 'Unlimited stops and route adjustments', 'Chauffeur remains on-site standby', 'Highly optimized for VIP schedules']
  },
  {
    id: 'special-events',
    title: 'Weddings & Special Events',
    shortDesc: 'Arrive in immaculate luxury and timeless sophistication for weddings, galas, red-carpet events, and special anniversaries.',
    fullDesc: 'Make your grand entrance unforgettable. Our luxury wedding and event chauffeur services ensure your transportation is flawless. We coordinate perfectly with event planners to handle precise arrivals, bridal party transfers, and late-night guest departures. Red carpet service, pristine vehicle detailing, and customized refreshments are available upon request.',
    features: ['Impeccably detailed vehicles', 'Bridal party coordination', 'Red carpet & white-glove service available', 'Flexible group shuttles for guests']
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't1',
    name: 'David Jenkins',
    role: 'VP of Global Logistics',
    company: 'TechGlobal Inc.',
    rating: 5,
    text: 'OttawaCarService.net has redefined our corporate travel between Ottawa and Toronto. Our executives skip YOW/YYZ flights entirely now. The door-to-door transit is quiet, comfortable, has stable Wi-Fi, and lets us work productively. Highly professional.',
    date: 'June 18, 2026'
  },
  {
    id: 't2',
    name: 'Sarah Montgomery',
    role: 'Private Client',
    company: 'Government of Canada Affairs',
    rating: 5,
    text: 'I booked the Executive SUV from Mississauga to Ottawa for my family. The Cadillac Escalade was pristine, stocked with cold water, and the ride was incredibly smooth. Our chauffeur, Marcus, was polite, punctual, and drove excellently through some difficult weather. Highly recommend!',
    date: 'May 04, 2026'
  },
  {
    id: 't3',
    name: 'Robert Sterling',
    role: 'Senior Partner',
    company: 'Sterling & Co. Legal',
    rating: 5,
    text: 'Outstanding airport service. They monitored my flight from London, which was delayed by two hours. As soon as I cleared customs at Pearson Airport, my chauffeur was right there at the designated post. Flawless execution every time.',
    date: 'April 29, 2026'
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq1',
    category: 'Reservations',
    question: 'How do I book a luxury chauffeur or get an accurate quote?',
    answer: 'You can easily request an upfront fixed quote using our online "Get a Quote" form. Alternatively, you can call us directly at 416-720-0366 or email info@torontocarservice.ca. We recommend booking at least 24 hours in advance, but we accommodate last-minute bookings subject to fleet availability.'
  },
  {
    id: 'faq2',
    category: 'Airport Pickups',
    question: 'How does the airport pickup and flight monitoring work?',
    answer: 'We require your flight number during reservation. We track your flight in real-time, adjusting the pickup schedule automatically for early arrivals or delays. For standard pickups, your chauffeur will text you upon landing and coordinate a prompt curbside pickup at the designated post. For meet-and-greet services, your chauffeur will wait inside the terminal arrivals hall holding a professional nameboard.'
  },
  {
    id: 'faq3',
    category: 'Pricing',
    question: 'Are your prices fixed or do they change with traffic/surges?',
    answer: 'Unlike ridesharing apps, our pricing is fully transparent and fixed. Once your quote is locked in and confirmed, you will pay that exact agreed price. There are no surprise surge rates, peak hour increases, or hidden traffic fees. Gratuity and standard highway tolls (like 407, on request) are fully detailed upfront.'
  },
  {
    id: 'faq4',
    category: 'Ottawa ↔ Toronto',
    question: 'How long does the drive between Ottawa and Toronto take?',
    answer: 'The direct chauffeur drive between Ottawa and Toronto spans approximately 450 km and typically takes between 4.5 to 5 hours, depending on traffic and weather conditions. We coordinate departure times to optimize your schedule and avoid rush-hour delays in Toronto and Ottawa.'
  },
  {
    id: 'faq5',
    category: 'Safety',
    question: 'Are your vehicles insured and are the chauffeurs licensed?',
    answer: 'Absolutely. Safety is our ultimate priority. Every vehicle in our fleet carries high-limit commercial passenger transportation insurance, undergoes strict weekly mechanical inspections, and is detailed daily. Our chauffeurs are fully certified, background-checked, and trained in defensive driving techniques.'
  }
];

export const ONTARIO_SERVICE_AREAS = [
  {
    region: 'Greater Toronto Area (GTA) & Surrounding',
    cities: ['Mississauga (Primary Base)', 'Toronto', 'Oakville', 'Brampton', 'Vaughan', 'Markham', 'Richmond Hill', 'Milton', 'Burlington', 'Hamilton', 'Niagara Falls']
  },
  {
    region: 'Eastern Ontario & Capital Region',
    cities: ['Ottawa (Capital Base)', 'Kanata', 'Nepean', 'Orleans', 'Gloucester', 'Gatineau', 'Kingston', 'Belleville', 'Cornwall', 'Brockville', 'Peterborough']
  },
  {
    region: 'Corridor Express Routes',
    cities: ['Ottawa to Toronto Direct Chauffeur', 'Toronto to Ottawa Direct Chauffeur', 'Pearson Airport to Ottawa private transfer', 'Ottawa Airport to GTA executive shuttle']
  }
];

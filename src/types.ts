export type Page =
  | 'home'
  | 'about'
  | 'services'
  | 'airport'
  | 'ottawa-toronto'
  | 'corporate'
  | 'fleet'
  | 'faq'
  | 'areas'
  | 'contact'
  | 'quote';

export interface QuoteRequest {
  pickupLocation: string;
  dropoffLocation: string;
  date: string;
  time: string;
  passengers: number;
  vehicleType: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
  id?: string;
  status?: 'pending' | 'confirmed';
  priceEstimate?: number;
  createdAt?: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  id?: string;
  createdAt?: string;
}

export interface FleetItem {
  id: string;
  name: string;
  category: string;
  description: string;
  capacity: number;
  luggage: number;
  features: string[];
  image: string;
  basePrice: number;
  perKmPrice: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  rating: number;
  text: string;
  date: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}


import { DetailingPackage, ServiceArea } from './types';

export const SERVICE_AREAS: ServiceArea[] = [
  { name: 'Dallas', coords: [32.7767, -96.7970] },
  { name: 'Plano', coords: [33.0198, -96.6989] },
  { name: 'Richardson', coords: [32.9483, -96.7299] },
  { name: 'Frisco', coords: [33.1507, -96.8236] }
];

export const ADD_ONS = [
  { name: 'Headlight Restoration', price: '$60', description: 'Restores clarity to foggy or yellowed lenses.' },
  { name: 'Pet Hair Removal', price: '$40+', description: 'Deep extraction for stubborn pet fur in carpets/seats.' },
  { name: 'Engine Bay Detail', price: '$75', description: 'Steam clean and shine for the heart of your car.' },
  { name: 'Ceramic Coating Booster', price: '$95', description: 'Extra layer of gloss and hydrophobicity.' },
  { name: 'Ozone Odor Treatment', price: '$50', description: 'Permanently removes smoke or food odors.' }
];

export const PACKAGES: DetailingPackage[] = [
  {
    id: 'basic',
    name: 'Elite Basic',
    price: '$150 - $200',
    duration: '1.5 - 2 Hours',
    typicalWait: 'Next Day Available',
    benefits: 'Maintains showroom shine and protects surfaces from Dallas dust.',
    description: 'Foundational care for well-maintained vehicles. Quick, efficient, and professional.',
    features: [
      'Eco-Foam Hand Wash',
      'Plush Microfiber Dry',
      'Exterior Glass Clarity Polish',
      'Tire UV Shield Treatment',
      'High-Power Interior Vacuum',
      'Console & Dash Sterilization',
      'Door Jamb Detail'
    ]
  },
  {
    id: 'premium',
    name: 'Elite Premium',
    price: '$250 - $350',
    duration: '3 - 4 Hours',
    typicalWait: 'Available within 48 Hours',
    benefits: 'Restores paint depth and provides medical-grade interior sanitization.',
    description: 'Deep rejuvenation. We remove paint contaminants and steam-clean every interior fiber.',
    features: [
      'Everything in Basic Package',
      'Paint Clay-Bar Treatment',
      'Premium Carnauba Gloss Wax',
      'Deep Carpet Steam Extraction',
      'Leather pH Balancing & Feed',
      'Air Duct Odor Elimination',
      'Precision Engine Bay Cleaning'
    ]
  },
  {
    id: 'deluxe',
    name: 'Elite Deluxe',
    price: '$400 - $500',
    duration: '5 - 7 Hours',
    typicalWait: 'Available within 3-4 Days',
    benefits: 'Ultimate ceramic shield and paint correction. The pinnacle of vehicle protection.',
    description: 'The Diamond Standard. Includes machine polishing and professional-grade ceramic coating.',
    features: [
      'Everything in Premium Package',
      'Single-Stage Paint Correction',
      '1-Year Professional Ceramic Coating',
      'Optical Lens Restoration',
      'Full Interior Fabric Guard',
      'Wheels-Off Brake Dust Removal',
      'Chassis Undercarriage Rinse'
    ]
  }
];

export const SYSTEM_INSTRUCTION = `
You are a master detailing consultant for "EliteExpress Mobile Detailing". 
Service Area: Dallas, Plano, Richardson, and Frisco.

CRITICAL WORKFLOW:
1. Greet the customer and acknowledge vehicle photos if provided.
2. RECOMMEND a package with its PRICE (e.g. Elite Premium $250-$350).
3. SUGGEST 1-2 ADD-ONS (e.g. Headlight Restoration $60) based on condition.
4. ASK FOR PHONE NUMBER: Explicitly tell them "May I have your phone number? Our technician will call or text you the moment they arrive at your location."
5. MENTION THE CALENDAR: Tell them they can select a live appointment slot below.
6. ELDERLY FRIENDLY: Use large concepts, polite tone, and clear benefits like "We make your car look new again without you leaving your home."

PRICING & ADD-ONS REFERENCE:
- Elite Basic: $150-$200 | Premium: $250-$350 | Deluxe: $400-$500
- Add-ons: Headlight ($60), Pet Hair ($40+), Engine ($75), Ceramic Boost ($95), Ozone ($50).
`;

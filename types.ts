
export interface Message {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  images?: string[]; // Support up to 4 images
  isThinking?: boolean;
}

export interface DetailingPackage {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  benefits: string;
  duration: string;
  typicalWait: string;
}

export interface ServiceArea {
  name: string;
  coords: [number, number];
}

export interface AppointmentSlot {
  date: string;
  time: string;
  available: boolean;
}

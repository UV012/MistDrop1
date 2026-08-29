export type PageId = 'home' | 'catalog' | 'contact';

export interface ProductSKU {
  id: string;
  name: string;
  capacity: string;
  shape: string;
  description: string;
  idealFor: string;
  image: string;
  minOrder: string;
  features: string[];
  specs: {
    tds: string;
    ph: string;
    shelfLife: string;
    packaging: string;
  };
}

export interface Founder {
  name: string;
  role: string;
  quote: string;
  image: string;
}

export interface ValueProp {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ClientSector {
  id: string;
  title: string;
  description: string;
  image: string;
  tag: string;
}

export interface EnquiryFormData {
  contactName: string;
  businessName: string;
  businessType: string;
  city: string;
  phone: string;
  email: string;
  interestedSku: string;
  monthlyQuantity: string;
  requirements: string;
}

export interface ContactFormData {
  fullName: string;
  businessType: string;
  email: string;
  phone: string;
  message: string;
}

export interface Franchise {
  id?: string;
  name: string;
  category?: string;
  cat?: string;
  catKey?: string;
  tag?: string;
  rating: number;
  location?: string;
  city?: string;
  investment?: number;
  invest?: string;
  investNum?: number;
  roi: string;
  monthlyRevenue?: string;
  omzet?: string;
  partners?: number;
  mitra?: string;
  imageUrl?: string;
  img?: string;
  alt?: string;
  badge?: string;
  badgeColor?: string;
  isPopular?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  avatar: string;
  franchiseType: string;
  avatarBg: string;
}

export interface NavLink {
  href: string;
  label: string;
}

export interface FilterButton {
  label: string;
  value: string;
}

export interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

export interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
  city: string;
  franchise: string;
  category: string;
}

export interface AIAdvisorStep {
  id: string;
  q: string;
  icon: any;
  options: string[];
}
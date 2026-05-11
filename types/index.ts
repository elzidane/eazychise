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
  mitra?: string | number;
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

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  is_read: boolean;
  type?: string;
  metadata?: {
    lead_id?: string;
    requester_name?: string;
    franchise_name?: string;
    [key: string]: any;
  };
  created_at: string;
}
export interface DbFranchise {
  id: string;
  name: string;
  cat: string;
  cat_key: string;
  city: string;
  rating: number;
  invest_text: string;
  invest_num: number;
  roi: string;
  omzet: string;
  mitra_count: number;
  badge: string;
  badge_color: string;
  img: string;
  created_at?: string;
}

export interface DbReview {
  id: string;
  franchise_id: string;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
}

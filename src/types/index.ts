export type BusinessType = "saas" | "ecommerce" | "brick-and-mortar" | "service" | "manufacturing" | "franchise" | "content" | "marketplace";
export type BusinessStatus = "active" | "under-offer" | "sold" | "draft";
export type DealStatus = "pending" | "loi-submitted" | "due-diligence" | "negotiation" | "signed" | "closed" | "cancelled";
export type EscrowStatus = "not-started" | "deposit-held" | "due-diligence" | "funds-released" | "disputed" | "completed";
export type UserRole = "buyer" | "seller" | "both" | "admin";
export type OfferStatus = "pending" | "accepted" | "rejected" | "countered" | "withdrawn";
export type NotificationType = "offer" | "message" | "escrow" | "document" | "deal" | "system";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  verified: boolean;
  createdAt: Date;
}

export interface Business {
  id: string;
  title: string;
  slug: string;
  description: string;
  type: BusinessType;
  status: BusinessStatus;
  industry: string;
  location: string;
  askingPrice: number;
  revenue: number;
  ebitda: number;
  sde: number;
  multiple: number;
  yearEstablished: number;
  employees: number;
  seller: User;
  images: string[];
  highlights: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  viewCount: number;
  isSaved?: boolean;
}

export interface Offer {
  id: string;
  businessId: string;
  business: Business;
  buyerId: string;
  buyer: User;
  amount: number;
  status: OfferStatus;
  message?: string;
  expiresAt?: Date;
  createdAt: Date;
}

export interface Deal {
  id: string;
  businessId: string;
  business: Business;
  offerId: string;
  offer: Offer;
  status: DealStatus;
  escrowStatus: EscrowStatus;
  milestones: Milestone[];
  documents: DealDocument[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Milestone {
  id: string;
  dealId: string;
  title: string;
  description: string;
  amount: number;
  status: "pending" | "in-progress" | "completed";
  completedAt?: Date;
  dueDate?: Date;
}

export interface DealDocument {
  id: string;
  dealId: string;
  name: string;
  type: "loi" | "nda" | "purchase-agreement" | "tax-return" | "financial-statement" | "other";
  url: string;
  signedAt?: Date;
  uploadedBy: User;
  createdAt: Date;
}

export interface Message {
  id: string;
  dealId: string;
  senderId: string;
  sender: User;
  content: string;
  createdAt: Date;
  readAt?: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  read: boolean;
  link?: string;
  createdAt: Date;
}

export interface SearchFilters {
  query?: string;
  type?: BusinessType;
  industry?: string;
  location?: string;
  minRevenue?: number;
  maxRevenue?: number;
  minAskingPrice?: number;
  maxAskingPrice?: number;
  minEbitda?: number;
  maxEbitda?: number;
  minMultiple?: number;
  maxMultiple?: number;
  sortBy?: "newest" | "price-asc" | "price-desc" | "revenue-desc" | "ebitda-desc";
}

export interface FinancialProjection {
  year: number;
  revenue: number;
  expenses: number;
  ebitda: number;
  netProfit: number;
  roi: number;
}

export interface ValuationResult {
  low: number;
  mid: number;
  high: number;
  multiple: number;
  method: string;
}

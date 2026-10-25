export type ServiceOption =
  | "Website or web app"
  | "Mobile app"
  | "Automation or integration"
  | "Not sure yet";

export type BudgetOption =
  | "Under ₹1,00,000"
  | "₹1,00,000 - ₹3,00,000"
  | "₹3,00,000 - ₹5,00,000"
  | "₹5,00,000+"
  | "Not sure yet";

export interface EnquiryInput {
  name: string;
  email: string;
  country?: string;
  phone?: string;
  service: ServiceOption;
  budget?: BudgetOption;
  message: string;
  honeypot?: string;
}

export interface EnquiryRecord {
  id: string;
  created_at: string;
  name: string;
  email: string;
  country?: string | null;
  phone: string | null;
  service: string;
  budget: string;
  message: string;
}

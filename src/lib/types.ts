export interface User {
  uid: string;
  role: "admin" | "staff" | "customer";
  loyaltyTier: "Bronze" | "Silver" | "Gold" | "Platinum";
  points: number;
  linkedOwner?: string; // uid of staff/admin for customer, or admin for staff
  email?: string | null;
  displayName?: string | null;
  photoURL?: string | null;
}

export interface Vehicle {
  id: string; // Changed from vehicleId for consistency
  ownerUid: string;
  plateNumber: string;
  make: string;
  model: string;
  year: number;
  archived: boolean;
  ownerName?: string; // Denormalized for display
}

export interface Policy {
  id: string; // Changed from policyId for consistency
  ownerUid: string;
  vehicleId: string;
  type: "Comprehensive" | "ThirdParty";
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  pdfUrl?: string;
  totalPrice: number;
  status: "active" | "expired" | "pendingRenewal";
  customerName?: string; // Denormalized for display
  vehiclePlate?: string; // Denormalized for display
}

export interface Payment {
  id: string; // Changed from paymentId for consistency
  policyId: string;
  amountPaid: number;
  datePaid: string; // ISO date string
  receiptUrl?: string;
}

export interface Report {
  id: string; // Changed from reportId for consistency
  month: string; // e.g., "2023-10"
  generatedDate: string; // ISO date string
  pdfUrl: string;
  totalSales: number;
}

export type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
  active?: boolean;
  disabled?: boolean;
};

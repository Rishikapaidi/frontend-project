export interface Service {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    rating: number;
    cost: number;
    distance: number;
    category: string;
  }
  
  export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";
  
  export interface Booking {
    id: string;
    serviceId: string;
    serviceName: string;
    date: string;
    time: string;
    comments: string;
    status: BookingStatus;
    createdAt?: string;
  }
  
import { ReactElement, ReactNode } from "react";

export interface DateRange {
  startDate: string;
  endDate: string;
}
export interface InstructorsSearch {
  option: string;
  value: boolean;
}
export interface InstructorFull {
  archived: boolean;
  bioText?: string;
  contactInfo?: string;
  id?: number;
  name?: string;
  profileImage?: string;
}
export interface ToursOptions {
  option?: string;
  optionValue?: number | string;
  total?: boolean;
}
export interface TourData {
  available: boolean;
  category: string;
  created_at?: string;
  currentParticipants: number;

  description: string;
  difficultyLevel: string;
  discount: number | string;
  endDate: string;
  id?: number;
  images: (string | File)[];
  instructorId: number;
  instructors?: { id: number; name: string; bioText: string };

  itinerary: string;
  location: string;
  maxParticipants: number;
  regularPrice: number;
  startDate: string;
  title: string;
}

export interface Sertificate {
  dateIssue: Date | string;
  description: string;
  expirationDate: Date | string;
  instructorId: number;
  organization: string;
  title: string;
}
export enum ButtonVariation {
  Primary = "primary",
  Secondary = "secondary",
  Danger = "danger",
}
export interface ConfirmProps {
  resourceName: string;
  onConfirm: () => void;
  disabled: boolean;
  onCloseModal?: () => void;
}
export interface Children {
  children: ReactNode | ReactElement;
}
export enum ButtonSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
}
export interface Review {
  id: number;
  comment: string;
  created_at: string;
  rating: number;
  status: "Одобрено" | "Отклонено" | "Ожидает";
  rejectionReason?: string;
  tourId: number;
  tours: {
    endDate: string;
    images: (string | File)[];
    instructors: {
      id: number;
      name: string;
      profileImage: string;
    };
    startDate: string;
    title: string;
  };
  users: {
    fullName: string;
  };
}

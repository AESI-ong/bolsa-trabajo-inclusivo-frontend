import { User } from "./User";

export interface Applicant {
  id: number;
  phone_number: string;
  cv_url: string | null;
  created_at: string;
  updated_at: string;
  user: User;
}
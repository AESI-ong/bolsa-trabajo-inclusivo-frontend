import { User } from "./User";

export interface Applicant {
  id: number;
  phone_number: string;
  cv_path: string | null;
  created_at: string;
  updated_at: string;
  user: User;
}
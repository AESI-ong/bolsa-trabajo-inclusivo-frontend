export interface Job {
  id: number;
  title: string; 
  location: string;
  description: string;
  token: string; 
  job_type: string;
  responsibilities: string[];
  skills: string[];
  sector: string;
  active: boolean;
  creator_id: number;
  total_applicants: number;
  created_at: string; // ISO 8601 date string
  updated_at: string; // ISO 8601 date string
}
import { Applicant } from './Applicant';
import { Job } from './Job';
export interface Application {
    id: number;
    application_date: string;
    status: string; // 'viewed' | 'not_viewed'
    updated_at: string;
    applicant: Applicant;
    job_offer: Job;
}
import { Applicant } from './Applicant';
import { Job } from './Job';
export interface Application {
    id: number;
    application_date: string;
    status: 'submitted' | 'in_review' | 'accepted' | 'rejected';
    created_at: string;
    updated_at: string;
    applicant: Applicant;
    job_offer: Job;
}
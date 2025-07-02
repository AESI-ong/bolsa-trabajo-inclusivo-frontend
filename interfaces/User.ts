export interface User{
id: string;
first_name: string;
last_name: string;
email: string;
token: string;
role: string;
active: boolean;
created_at: string; // ISO 8601 date string
updated_at: string; // ISO 8601 date string
};
import { Grid } from '@mui/material';
import homeIcon from '../../assets/applicantInfo/home.svg';
import userIcon from '../../assets/ApplicantInfo/user_blue.svg';


import pinIcon from '../../assets/applicantInfo/pin.svg';
import React from 'react';

type JobCardProps = {
  title: string;
  status: string;
  location: string;
  company: string;
  date?: string;
  candidates?: number;
};

const ApplicationCard: React.FC<JobCardProps> = ({ title, status, location, company,date, candidates }) => {
  return (
   <div  className='border-2 border-[#2C6CB6] rounded-lg p-6 mb-4'> 
    <Grid container spacing={2} className="flex items-end">
        <Grid size={8}>
            <div className="flex items-center gap-2 mb-2">
                <img
                    src={userIcon}
                    alt="usuario"
                    className="w-20 h-20"
                />
                <h2 className="text-2xl font-bold">{title}</h2>
            </div>
            
            <div className="flex items-center">
            <p className="flex items-center mr-4">
                <img
                src={homeIcon}
                width={20}
                height={20}
                className="mr-2"
                alt="company"
                />
                {company}
            </p>

            <p className="flex items-center">
                <img
                src={pinIcon}
                width={20}
                height={20}
                className="mr-2"
                alt="pin"
                />
                {location}
            </p>
            </div>
        </Grid>
        <Grid size={4}>
            <p className="text-2xl font-bold mb-2 flex items-center text-[#2164B0]">{status}</p>
            <p className="text-lg mb-2">{date}</p>
            <p className="text-lg">{candidates} Candidatos postulando</p>

        </Grid>
    </Grid>
    </div>
  );
};

export default ApplicationCard;
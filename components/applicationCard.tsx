'use client';

import React from 'react';
import { Grid } from '@mui/material';

type JobCardProps = {
  title: string;
  status: 'submitted' | 'in_review' | 'accepted' | 'rejected';
  location: string;
  date?: string;
  candidates?: number;
};

const statusTranslations: Record<JobCardProps['status'], string> = {
  submitted: 'Postulado',
  in_review: 'CV visto',
  accepted: 'Aceptado',
  rejected: 'Rechazado',
};

const ApplicationCard: React.FC<JobCardProps> = ({ title, status, location, date, candidates }) => {
  return (
    <div className="border-2 border-[#2C6CB6] rounded-lg p-6 mb-4">
      <Grid container spacing={2} className="flex items-end">
        
        {/* Columna izquierda */}
        <Grid size={6} className="text-left">
          <div className="flex items-center gap-2 mb-2">
            <img
              src="/assets/ApplicantInfo/user_blue.svg"
              alt="usuario"
              className="w-20 h-20"
            />
            <h2 className="text-2xl font-bold">{title}</h2>
          </div>

          <div className="flex items-center flex-wrap">
            <p className="flex items-center">
              <img
                src="/assets/ApplicantInfo/pin.svg"
                width={20}
                height={20}
                className="mr-2"
                alt="location"
              />
              {location}
            </p>
          </div>
        </Grid>

        {/* Columna derecha */}
        <Grid size={4} className="text-right">
          <p className="text-2xl font-bold mb-2 text-[#2164B0]">{statusTranslations[status]}</p>
          {date && <p className="text-lg mb-2">{date}</p>}
          {candidates !== undefined && (
            <p className="text-lg">{candidates} candidatos postulando</p>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default ApplicationCard;

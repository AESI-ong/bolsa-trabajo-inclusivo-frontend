"use client";

import { Briefcase } from "lucide-react";
import React from "react";

type JobCardProps = {
  title: string;
  status: "submitted" | "in_review" | "accepted" | "rejected" | "viewed";
  location: string;
  date?: string;
  candidates?: number;
};

const statusTranslations: Record<JobCardProps["status"], string> = {
  submitted: "Postulado",
  viewed: "Visto",
  in_review: "CV visto",
  accepted: "Aceptado",
  rejected: "Rechazado",
};

const ApplicationCard: React.FC<JobCardProps> = ({
  title,
  status,
  location,
  date,
  candidates,
}) => {
  return (
    <div className="border-2 border-[#2C6CB6] rounded-xl p-6 mb-4 bg-white flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm hover:shadow-md transition-shadow duration-200 min-h-[140px]">
      {/* Columna izquierda */}
      <div className="flex items-center gap-4 w-full md:w-auto mb-2 md:mb-0">
        <div className="bg-blue-100 rounded-full p-3 flex items-center justify-center">
          <Briefcase className="text-[#2C6CB6]" size={40} />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            {title}
          </h2>
          <div className="flex items-center flex-wrap mt-1 text-gray-600 text-sm gap-4">
            <span className="flex items-center gap-1">
              <img
                src="/assets/applicantInfo/pin.svg"
                width={20}
                height={20}
                className="mr-1"
                alt="location"
              />
              {location}
            </span>
          </div>
        </div>
      </div>
      {/* Columna derecha */}
      <div className="flex flex-col items-end w-full md:w-auto text-right">
        <p className="text-lg md:text-xl font-bold mb-1 text-[#2164B0]">
          {statusTranslations[status]}
        </p>
        {date && <p className="text-base md:text-md mb-1">{date}</p>}
        {candidates !== undefined && (
          <p className="text-base md:text-lg">
            {candidates} candidatos postulando
          </p>
        )}
      </div>
    </div>
  );
};

export default ApplicationCard;

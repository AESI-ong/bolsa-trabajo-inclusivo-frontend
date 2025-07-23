"use client";

import { useEffect, useState } from "react";

import type { Application } from "../interfaces/Application";
import { Briefcase } from "lucide-react";
import type { Job } from "../interfaces/Job";
import api from "../utils/axiosInstance";
import { useRouter } from "next/navigation";

type Props = {
  job: Job;
  isDetail?: boolean;
};

const JobCard = ({ job, isDetail = false }: Props) => {
  const router = useRouter();
  const [hasApplied, setHasApplied] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsLoggedIn(true);

      // Solo verificamos si ya aplicó si está logueado y en la vista de detalle
      if (isDetail) {
        const checkIfApplied = async () => {
          try {
            const res = await api.get("/applicants/applications");
            const applications: Application[] = res.data;
            const alreadyApplied = applications.some(
              (app) => app.job_offer.token === job.token
            );
            setHasApplied(alreadyApplied);
          } catch (error) {
            console.error("Error verificando si ya se postuló:", error);
          }
        };

        checkIfApplied();
      }
    }
  }, [isDetail, job.token]);

  const handleClick = () => {
    if (isDetail) {
      if (!isLoggedIn) {
        router.push("/login");
      } else if (!hasApplied) {
        router.push(`/job/${job.token}/apply/`);
      }
    } else {
      router.push(`/job/${job.token}`);
    }
  };

  const renderButtonText = () => {
    if (!isDetail) return "Detalles del Trabajo";
    if (!isLoggedIn) return "Inicia sesión para postular";
    if (hasApplied) return "Ya te postulaste";
    return "Postular a la oferta";
  };

  return (
    <div className="bg-white p-6 rounded-xl border-2 flex flex-col md:flex-row justify-between items-start md:items-center min-h-[160px] border-[#2C6DB6] shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center gap-4 mb-1">
          <div className="bg-blue-100 rounded-full p-3 flex items-center justify-center">
            <Briefcase className="text-[#2C6DB6]" size={40} />
            {/* <img
              src="/assets/Home/persona.png"
              alt="Trabajo"
              className="w-8 h-8"
              loading="lazy"
            /> */}
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">
              {job.title}
            </h3>
          </div>
        </div>
        <div className="flex gap-4 text-sm items-center flex-wrap text-gray-600 mb-2">
          <span className="flex items-center gap-1">
            <img
              src="/assets/Home/clock.png"
              alt="Tiempo"
              className="w-4 h-4"
            />
            {job.job_type === "part_time" ? "Medio tiempo" : "Tiempo completo"}
          </span>
          <span className="flex items-center gap-1">
            <img
              src="/assets/Home/map-pin.png"
              alt="Ubicación"
              className="w-4 h-4"
            />
            {job.location}
          </span>
        </div>
      </div>
      <button
        className={`mt-4 md:mt-0 px-6 py-2 rounded-lg font-semibold shadow-sm transition whitespace-nowrap ${
          hasApplied
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-[#2C6DB6] text-white hover:bg-[#1E4B8C]"
        }`}
        onClick={handleClick}
        disabled={hasApplied}
      >
        {renderButtonText()}
      </button>
    </div>
  );
};

export default JobCard;

'use client';

import { useRouter } from 'next/navigation';
import type { Job } from "../interfaces/Job";
import type { Application } from "../interfaces/Application";
import { useEffect, useState } from "react";
import api from "../utils/axiosInstance";

type Props = {
  job: Job;
  isDetail?: boolean;
};

const JobCard = ({ job, isDetail = false }: Props) => {
  const router = useRouter();
  const [hasApplied, setHasApplied] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsLoggedIn(true);

      // Solo verificamos si ya aplicó si está logueado y en la vista de detalle
      if (isDetail) {
        const checkIfApplied = async () => {
          try {
            const res = await api.get('/applicants/applications');
            const applications: Application[] = res.data;
            const alreadyApplied = applications.some(
              (app) => app.job_offer.token === job.token
            );
            setHasApplied(alreadyApplied);
          } catch (error) {
            console.error('Error verificando si ya se postuló:', error);
          }
        };

        checkIfApplied();
      }
    }
  }, [isDetail, job.token]);

  const handleClick = () => {
    if (isDetail) {
      if (!isLoggedIn) {
        router.push('/login');
      } else if (!hasApplied) {
        router.push(`/job/${job.token}/apply`);
      }
    } else {
      router.push(`/job/${job.token}`);
    }
  };

  const renderButtonText = () => {
    if (!isDetail) return 'Detalles del Trabajo';
    if (!isLoggedIn) return 'Inicia sesión para postular';
    if (hasApplied) return 'Ya te postulaste';
    return 'Postular a la oferta';
  };

  return (
    <div className="bg-white p-6 rounded border flex justify-between items-center min-h-[160px] border-[#3862af]">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <img src="/assets/Home/persona.png" alt="Trabajo" className="w-20 h-20" />
          <h3 className="text-2xl font-bold">{job.title}</h3>
        </div>

        <div className="flex gap-3 text-sm items-center flex-wrap">
          <img src="/assets/Home/clock.png" alt="Tiempo" className="w-4 h-4" />
          <span>{job.job_type === "part_time" ? "Medio tiempo" : "Tiempo completo"}</span>
          <img src="/assets/Home/map-pin.png" alt="Ubicación" className="w-4 h-4" />
          <span>{job.location}</span>
        </div>
      </div>

      <button
        className={`px-4 py-2 rounded transition ${
          hasApplied
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#3862af] text-white hover:bg-blue-700"
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






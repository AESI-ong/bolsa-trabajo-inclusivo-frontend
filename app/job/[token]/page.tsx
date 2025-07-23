'use client';

import { useEffect, useState } from 'react';

import HeroSection from '../../../components/Home/HeroSection';
import type { Job } from '../../../interfaces/Job';
import JobCard from '../../../components/JobCard';
import JobDescriptionSection from '../../../components/JobDescriptionSection';
import api from '../../../utils/axiosInstance';
import { useParams } from 'next/navigation';

export default function JobDetailPage() {
  const { token } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!token) return;

    const fetchJob = async () => {
      try {
        const response = await api.get(`/job-offers/${token}`);
        setJob(response.data);
      } catch {
        setError(true);
      }
    };

    fetchJob();
  }, [token]);

  if (error) return <p className="p-10 text-red-500">Trabajo no encontrado</p>;
  if (!job) return <p className="p-10">Cargando trabajo...</p>;

  return (
    <main>
      <HeroSection />
      <section className="bg-white py-10 px-8 md:px-30 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Trabajo inclusivo</h2>
        <JobCard job={job} isDetail />
        <JobDescriptionSection job={job} />
      </section>
    </main>
  );
}

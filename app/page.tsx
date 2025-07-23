// app/page.tsx o donde esté tu HomePage
'use client';

import { useEffect, useState } from 'react';

import CategoriesSection from '../components/Home/CategoriesSection';
import HeroSection from '../components/Home/HeroSection';
import type { Job } from '../interfaces/Job';
import JobListSection from '../components/Home/JobListSection';
import api from '../utils/axiosInstance';
import { useSearchParams } from 'next/navigation';
import withRoleRedirect from '../utils/withRoleRedirect'; // ✅ importa el wrapper

function HomePage() {
  const searchParams = useSearchParams();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get('/job-offers');
        const allJobs: Job[] = res.data;

        const title = searchParams.get('title')?.toLowerCase() || '';
        const location = searchParams.get('location') || '';
        const sector = searchParams.get('sector') || '';

        const filteredJobs = allJobs.filter((job) =>
          (!title || job.title.toLowerCase().includes(title)) &&
          (!location || job.location === location) &&
          (!sector || job.sector === sector)
        );

        setJobs(filteredJobs);
      } catch (error) {
        console.error("Error al cargar trabajos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [searchParams]);

  if (loading) return <p className="text-center py-10">Cargando...</p>;

  return (
    <main className='min-h-screen bg-gray-50'>
      <HeroSection />
      <JobListSection jobs={jobs} />
      <CategoriesSection />
    </main>
  );
}

// 🔐 Bloquea a los admins: si es admin, redirige a /admin-dashboard y a los postulantes al inicio
export default withRoleRedirect(HomePage, 'admin', '/admin-dashboard');

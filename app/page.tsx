'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import HeroSection from '../components/Home/HeroSection';
import JobListSection from '../components/Home/JobListSection';
import CategoriesSection from '../components/Home/CategoriesSection';
import type { Job } from '../interfaces/Job';
import api from '../utils/axiosInstance';

export default function HomePage() {
  const searchParams = useSearchParams();
  const [jobs, setJobs] = useState<Job[]>([]);

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
      }
    };

    fetchJobs();
  }, [searchParams]);

  return (
    <main>
      <HeroSection />
      <JobListSection jobs={jobs} />
      <CategoriesSection />
    </main>
  );
}

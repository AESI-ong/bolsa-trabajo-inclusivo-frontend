'use client';

import Badge from "../ui/Badge";
import type { Job } from "../../interfaces/Job";
import JobCard from "../JobCard";
import { useState } from "react";

interface JobListSectionProps {
  jobs: Job[];
}

const JobListSection = ({ jobs }: JobListSectionProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const currentJobs = jobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Trabajos inclusivos</h2>
            <Badge color="bg-blue-100" textColor="text-blue-800">
              {jobs.length} empleos disponibles
            </Badge>
        </div>
        <div className="space-y-4">
          {currentJobs.length > 0 ? (
            currentJobs.map((job) => (
              <JobCard key={job.token} job={job} />
            ))
          ) : (
            <p className="text-center text-gray-500">No se encontraron trabajos.</p>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded border ${
                  currentPage === i + 1 ? "bg-blue-600 text-white" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default JobListSection;


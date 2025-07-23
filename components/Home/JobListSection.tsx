'use client';
import { useState } from "react";
import JobCard from "../JobCard";
import type { Job } from "../../interfaces/Job";

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
    <section className="bg-white py-10 px-8 md:px-30">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">Trabajos inclusivos</h2>
      <div className="space-y-4">
        {currentJobs.length > 0 ? (
          currentJobs.map((job) => (
            <JobCard key={job.token} job={job} />
          ))
        ) : (
          <p className="text-center text-gray-500 mb-9 md:text-2xl">No se encontraron trabajos.</p>
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
    </section>
  );
};

export default JobListSection;


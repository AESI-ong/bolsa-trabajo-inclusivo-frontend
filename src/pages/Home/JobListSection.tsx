import { useState } from "react";
import JobCard from "../../components/JobCard"; // Ajusta según tu estructura

const JobListSection = () => {
  const jobs = [
    { title: "Operario de Almacén", location: "Comas, Lima", type: "Tiempo completo", categoria: "Comercio" },
    { title: "Asesor/a de Atención al Cliente", location: "Comas, Lima", type: "Medio tiempo", categoria: "Comercio"},
    { title: "Auxiliar de Producción", location: "Comas, Lima", type: "Tiempo completo", categoria: "Comercio"},
    { title: "Asesor/a de Atención al Cliente", location: "Comas, Lima", type: "Medio tiempo", categoria: "Comercio" },
    { title: "Auxiliar de Producción", location: "Comas, Lima", type: "Tiempo completo", categoria: "Comercio" },
    { title: "Reponedor/a de Supermercado", location: "Lima", type: "Tiempo completo", categoria: "Ventas" },
    { title: "Cajero/a", location: "Lima", type: "Medio tiempo", categoria: "Ventas" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className="bg-white py-10 px-8 md:px-30">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">Trabajos inclusivos</h2>

      <div className="space-y-4">
        {currentJobs.map((job, i) => (
          <JobCard
            key={i}
            title={job.title}
            location={job.location}
            type={job.type}
          />
        ))}
      </div>

      {/* Paginación */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageClick(i + 1)}
            className={`px-3 py-1 rounded border ${
              currentPage === i + 1 ? "bg-blue-600 text-white" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </section>
  );
};

export default JobListSection;


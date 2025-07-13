// components/JobDescriptionSection.tsx
import type { Job } from "../interfaces/Job";
import PersonIcon from "../assets/icons/person.svg?react";
import TimeIcon from "../assets/icons/time.svg?react";
import WorkIcon from "../assets/icons/workbag.svg?react";

type Props = {
  job: Job;
};

const JobDescriptionSection = ({ job }: Props) => {
  return (
    <section className="pt-12">
      <div className="flex items-start justify-between">

        {/* Columna izquierda */}
        <div className="w-full max-w-10/19">

          {/* Descripción del puesto */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold py-6 flex items-center gap-2">
              Descripción del puesto
            </h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {job.description}
            </p>
          </div>

          {/* Responsabilidades clave */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold py-6 flex items-center gap-2">
              Responsabilidades clave
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {job.responsibilities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Habilidades */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold py-6 flex items-center gap-2">
              Habilidades
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {job.habilities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Columna derecha */}
        <aside className="w-full max-w-5/19 bg-azul-claro-aesi bg-opacity-40 px-6 pb-6 rounded-xl shadow-md text-gray-800">
          <h3 className="text-xl font-semibold py-6">Descripción general</h3>
          <div className="space-y-2">
            <div className="flex gap-3">
              <PersonIcon className="w-full max-w-6 h-6 text-white" />
              <div className="flex flex-col gap-2">
                <span className="font-medium">Puesto:</span>
                <span>{job.title}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <TimeIcon className="w-full max-w-6 h-6 text-white" />
              <div className="flex flex-col gap-2">
                <span className="font-medium">Tipo de Jornada:</span>
                <span>{job.type}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <WorkIcon className="w-full max-w-6 h-6 text-white" />
              <div className="flex flex-col gap-2">
                <span className="font-medium">Sector:</span>
                <span>{job.sector}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default JobDescriptionSection;

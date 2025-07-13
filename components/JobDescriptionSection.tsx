// components/JobDescriptionSection.tsx
import type { Job } from "../interfaces/Job";

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
              {job.skills.map((item, index) => (
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
              <img src="/assets/icons/person.svg" alt="Puesto" className="w-6 h-6" />
              <div className="flex flex-col gap-2">
                <span className="font-medium">Puesto:</span>
                <span>{job.title}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <img src="/assets/icons/time.svg" alt="Tiempo" className="w-6 h-6" />

              <div className="flex flex-col gap-2">
                <span className="font-medium">Tipo de Jornada:</span>
                <span>{job.job_type=="part_time"?"Medio tiempo":"Tiempo completo"}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <img src="/assets/icons/workbag.svg" alt="Workbag" className="w-6 h-6" />
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

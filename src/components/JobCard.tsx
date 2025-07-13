// components/JobCard.tsx
import { useNavigate } from "react-router-dom";
import type { Job } from "../interfaces/Job";

type Props = {
  job: Job;
};

const JobCard = ({ job }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-6 rounded border flex justify-between items-center min-h-[160px] border-[#3862af]">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <img src="/assets/Home/persona.png" alt="Trabajo" className="w-20 h-20" />
          <h3 className="text-2xl font-bold">{job.title}</h3>
        </div>

        <div className="flex gap-3 text-sm items-center flex-wrap">
          <img src="/assets/Home/clock.png" alt="Tiempo" className="w-4 h-4" />
          <span>{job.type}</span>
          <img src="/assets/Home/map-pin.png" alt="Ubicación" className="w-4 h-4" />
          <span>{job.location}</span>
        </div>
      </div>

      <button
        className="bg-[#3862af] text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        onClick={() => navigate(`/job/${job.id}`)}
      >
        Detalles del Trabajo
      </button>
    </div>
  );
};

export default JobCard;


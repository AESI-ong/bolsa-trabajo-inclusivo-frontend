// pages/JobDetailPage.tsx
import { useParams } from "react-router-dom";
import HeroSection from "./Home/HeroSection";
import JobCard from "../components/JobCard";
import JobDescriptionSection from "../components/JobDescriptionSection";
import { mockJobs } from "../data/mockJobs";

const JobDetailPage = () => {
  const { id } = useParams();
  const job = mockJobs.find((j) => j.id === Number(id));

  if (!job) return <p>Trabajo no encontrado</p>;

  return (
    <main>
      <HeroSection />
      <section className="bg-white py-10 px-8 md:px-30">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Trabajo inclusivo</h2>
        <JobCard job={job} />
        <JobDescriptionSection job={job} />
      </section>
    </main>
  );
};

export default JobDetailPage;

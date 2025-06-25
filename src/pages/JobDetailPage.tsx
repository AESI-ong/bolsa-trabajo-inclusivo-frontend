import JobCard from '../components/JobCard';
import JobDescriptionSection from '../components/JobDescriptionSection';
import HeroSection from './Home/HeroSection';

const JobDetailPage = () => {
  return (
    <main>
      <HeroSection />
      <section className="bg-white py-10 px-8 md:px-30">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Trabajo inclusivo</h2>
        <JobCard title='Operario de Almacén' location='Comas, Lima' type='Tiempo completo' />
        <JobDescriptionSection />
      </section>
    </main>
  );
};

export default JobDetailPage;
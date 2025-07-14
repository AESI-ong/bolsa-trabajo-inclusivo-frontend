'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ApplicantMenu from "./ApplicantMenu";
import HeroSection from "../../components/Home/HeroSection";
import ApplicantProfile from "./ApplicantProfile";
import MyApplications from "./MyApplications";
import { useUser } from "../../interfaces/UserContext";

export default function Applicant() {
  const [selectedComponent, setSelectedComponent] = useState('profile');
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace('/login');
      } else if (user.role !== 'applicant') {
        router.replace('/not-authorized'); // o a otra vista que tengas para accesos no válidos
      }
    }
  }, [user, loading, router]);

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'postulaciones':
        return <MyApplications />;
      default:
        return <ApplicantProfile />;
    }
  };

  if (loading || !user || user.role !== 'applicant') {
    return null; // o un spinner de carga si prefieres
  }

  return (
    <div className="w-full bg-white justify-center">
      <HeroSection />
      <ApplicantMenu onSelect={setSelectedComponent} />
      {renderComponent()}
    </div>
  );
}

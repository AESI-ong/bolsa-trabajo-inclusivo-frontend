'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../../interfaces/UserContext";

import ApplicantMenu from "../../components/ApplicantInfo/ApplicantMenu";
import HeroSection from "../../components/Home/HeroSection";
import ApplicantProfile from "../../components/ApplicantInfo/ApplicantProfile";
import MyApplications from "../../components/ApplicantInfo/MyApplications";
import { withRoleProtection } from "../../utils/withRoleProtection";

function ApplicantPage() {
  const router = useRouter();
  const { user, loading } = useUser();
  const [selectedComponent, setSelectedComponent] = useState("profile");

  // Redirigir si no está logueado o si no es applicant
  useEffect(() => {
    if (!loading) {
      if (!user || user?.role !== "applicant") {
        router.push("/login"); // o una página de error como "/not-authorized"
      }
    }
  }, [user, loading]);

  const renderComponent = () => {
    switch (selectedComponent) {
      case "postulaciones":
        return <MyApplications />;
      default:
        return <ApplicantProfile />;
    }
  };

  // ⏳ Mientras se carga, no renderices nada
  if (loading || !user || user?.role !== "applicant") return null;

  return (
    <div className="w-full bg-white justify-center">
      <HeroSection />
      <ApplicantMenu onSelect={setSelectedComponent} />
      {renderComponent()}
    </div>
  );
}
export default withRoleProtection(ApplicantPage, ['applicant']);

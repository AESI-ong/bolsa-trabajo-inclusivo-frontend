"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import ApplicantMenu from "../../components/ApplicantInfo/ApplicantMenu";
import ApplicantProfile from "../../components/ApplicantInfo/ApplicantProfile";
import HeroSection from "../../components/Home/HeroSection";
import MyApplications from "../../components/ApplicantInfo/MyApplications";
import { useUser } from "../../interfaces/UserContext";
import { withRoleProtection } from "../../utils/withRoleProtection";

function ApplicantPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading } = useUser();
  // Default to 'cv' (curriculum) tab
  const initialTab =
    searchParams.get("tab") === "postulaciones" ? "postulaciones" : "cv";
  const [selectedTab, setSelectedTab] = useState(initialTab);

  // Keep selectedTab in sync with URL
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (
      tab &&
      tab !== selectedTab &&
      (tab === "cv" || tab === "postulaciones")
    ) {
      setSelectedTab(tab);
    }
    // If tab param is missing, default to 'cv'
    if (!tab && selectedTab !== "cv") {
      setSelectedTab("cv");
    }
  }, [searchParams, selectedTab]);

  // Update URL when tab changes
  const handleTabChange = useCallback(
    (tab: string) => {
      setSelectedTab(tab);
      // Update the URL query param
      router.replace(`?tab=${tab}`);
    },
    [router]
  );

  // Redirigir si no está logueado o si no es applicant
  useEffect(() => {
    if (!loading) {
      if (!user || user?.role !== "applicant") {
        router.push("/login");
      }
    }
  }, [user, loading, router]);

  const renderComponent = () => {
    switch (selectedTab) {
      case "postulaciones":
        return <MyApplications />;
      case "cv":
      default:
        return <ApplicantProfile />;
    }
  };

  if (loading || !user || user?.role !== "applicant") return null;

  return (
    <div className="w-full bg-white justify-center">
      <HeroSection />
      <ApplicantMenu onSelect={handleTabChange} />
      {renderComponent()}
    </div>
  );
}

const ProtectedApplicantPage = withRoleProtection(ApplicantPage, ["applicant"]);
export default ProtectedApplicantPage;

import { useState } from "react";
import ApplicantMenu from "./ApplicantMenu";
import HeroSection from "../Home/HeroSection";
import ApplicantProfile from "./ApplicantProfile";
import MyApplications from "./MyApplications";


export default function Applicant() {
    const [selectedComponent, setSelectedComponent] = useState('profile'); 

    const renderComponent = () => {
        switch (selectedComponent) {
            case 'postulaciones':
                return <MyApplications />;
            default:
                return <ApplicantProfile />;
        }
    };

    return (
        <div className="w-full bg-white justify-center">
            <HeroSection />
            <ApplicantMenu onSelect={setSelectedComponent} />
            {renderComponent()}
        </div>
    );
}

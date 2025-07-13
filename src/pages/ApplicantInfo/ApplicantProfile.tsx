import React from 'react';
import userIcon from '../../assets/ApplicantInfo/user_blue.svg';
import mailIcon from '../../assets/ApplicantInfo//mail.svg';
import phoneIcon from '../../assets/ApplicantInfo/phone.svg';
import footerImage from '../../assets/ApplicantInfo/trabajo-de-oficina.svg';

const ApplicantInfo: React.FC = () => {
    return (
        <div className="px-30 py-10">
            <div className="bg-white border-2 border-[#2C6CB6] rounded-lg shadow-md w-full p-6">
                <div className="flex items-center gap-2 mb-2">
                    <img
                        src={userIcon}
                        alt="usuario"
                        className="w-20 h-20"
                    />
                    <h2 className="text-2xl font-bold">Joel Aroni</h2>
                </div>
                <div className="flex items-center space-x-4 mb-4">
                    <p className="text-gray-700 flex items-center">
                        <img
                            src={mailIcon}
                            width={20}
                            height={20}
                            className="mr-2"
                            alt="Email Icon"
                        />
                        joel.aroni@gmail.com
                    </p>
                    
                    <p className="text-gray-700 flex items-center">
                        <img
                            src={phoneIcon}
                            width={20}
                            height={20}
                            className="mr-2"
                            alt="telefono"
                        />
                        999720123
                    </p>
                    <div className="ml-auto">
                        <button className="bg-[#3862af] text-white w-32 py-2 rounded hover:bg-blue-700 transition">
                            Editar
                        </button>
                    </div>
                </div>

                <div className="border-b-2 border-[#2C6CB6] mb-4"></div>
                <h2 className="text-2xl font-bold mb-8">No olvides tu CV</h2>
                <p className="text-gray-600">Te enviamos un correo para que puedas adjuntarlo</p>
                <div className="flex justify-center mt-4">
                    <button className="bg-[#3862af] text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                        Seleccionar archivo
                    </button>
                </div>
            </div>
        </div>
    );
};

const FooterDecoration: React.FC = () => {
    return (
        <div className="w-full">
            <img
                src={footerImage}
                alt="Footer Decoration"
                className="w-full h-auto"
            />
        </div>
    );
};

const ApplicantProfile: React.FC = () => {
    return (
        <div>
            <ApplicantInfo />
            <FooterDecoration />
        </div>
    );
};

export default ApplicantProfile;

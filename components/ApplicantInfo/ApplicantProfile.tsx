'use client';

import React from 'react';
import { useUser } from '../../interfaces/UserContext'; // Asegúrate de que la ruta es correcta

const ApplicantInfo: React.FC = () => {
    const { user } = useUser();

    if (!user) return null; // O un loader si prefieres

    return (
        <div className="px-30 py-10">
            <div className="bg-white border-2 border-[#2C6CB6] rounded-lg shadow-md w-full p-6">
                <div className="flex items-center gap-2 mb-2">
                    <img
                        src={'/assets/ApplicantInfo/user_blue.svg'}
                        alt="usuario"
                        className="w-20 h-20"
                    />
                    <h2 className="text-2xl font-bold">{user?.first_name} {user?.last_name}</h2>
                </div>
                <div className="flex items-center space-x-4 mb-4">
                    <p className="text-gray-700 flex items-center">
                        <img
                            src={'/assets/ApplicantInfo/mail.svg'}
                            width={20}
                            height={20}
                            className="mr-2"
                            alt="Email Icon"
                        />
                        {user?.email}
                    </p>

                    {user?.applicant_profile?.phone_number && (
                        <p className="text-gray-700 flex items-center">
                            <img
                                src={'/assets/ApplicantInfo/phone.svg'}
                                width={20}
                                height={20}
                                className="mr-2"
                                alt="telefono"
                            />
                            {user?.applicant_profile?.phone_number}
                        </p>
                    )}

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

export default ApplicantInfo;


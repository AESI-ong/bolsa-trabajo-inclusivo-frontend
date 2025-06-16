import * as React from 'react';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';

export default function ApplicantInfo() {
  return (
  <section className="w-full bg-white justify-center">
    <div className="p-12">
      <Stack spacing={2} direction="row" className="mb-8">
        <Link to="/mi_perfil">
          <button className="bg-[#8AAFD9] text-[#2164B0] px-6 py-3 rounded hover:bg-[#4A90E2] transition font-bold md:px-8 md:py-4">
        Mi curriculum
      </button>
        </Link>
       <Link to="/mi_perfil">
        <button className="bg-[#8AAFD9] text-[#2164B0] px-6 py-3 rounded hover:bg-[#4A90E2] transition font-bold md:px-8 md:py-4">
        Mis postulaciones
      </button>
      </Link>
      </Stack>
    
        <div className="bg-white border-2 border-[#2C6CB6] rounded-lg shadow-md p-6 w-full">
        <h2 className="text-2xl font-semibold mb-8 flex items-center">
            <img
                src="../../src/assets/applicantInfo/user_blue.svg"
                alt="usuario"
                width={30}
                height={30}
                className="mr-2"
            />
            Joel Aroni
        </h2>
        <div className="flex items-center space-x-4 mb-4">
            <p className="text-gray-700 flex items-center">
                <img
                    src="../../src/assets/applicantInfo/mail.svg"
                    width={20}
                    height={20}
                    className="mr-2"
                    alt="Email Icon"
                />
                joel.aroni@gmail.com
            </p>
            <p className="text-gray-700 flex items-center">
                <img
                    src="../../src/assets/applicantInfo/phone.svg"
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
      <h2 className="text-2xl font-semibold mb-8 flex items-center">
        No olvides tu CV
      </h2>
      <p className="text-gray-600">Te enviamos un correo para que puedas adjuntarlo</p>
          <div className="flex justify-center mt-4">
            <button className="bg-[#3862af] text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Seleccionar archivo
            </button>
          </div>
      </div>    
     </div>
    <div className="w-full">
    <img
        src="../../src/assets/applicantInfo/trabajo-de-oficina.svg"
        alt="Footer Decoration"
       className="w-full h-auto" 
                />
  </div>

</section>
  );
}
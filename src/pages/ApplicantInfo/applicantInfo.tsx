import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function ApplicantInfo() {
  return (
  <section className="w-full bg-white justify-center">
    <div className="p-12">
      <Stack spacing={2} direction="row" className="px-4 mb-8">
        <Button variant="outlined" aria-label="View my curriculum">Mi curriculum</Button>
        <Button variant="outlined" aria-label="View my applications">Mis postulaciones</Button>
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
                    src="../../src/assets/applicantInfo/clock.svg"
                    width={20}
                    height={20}
                    className="mr-2"
                    alt="Email Icon"
                />
                joel.aroni@gmail.com
            </p>
            <p className="text-gray-700 flex items-center">
                <img
                    src="../../src/assets/applicantInfo/map_pin.svg"
                    width={20}
                    height={20}
                    className="mr-2"
                    alt="Phone Icon"
                />
                999720123
            </p>
            <div className="ml-auto">
                <Button variant="contained">Editar</Button>
            </div>
        </div>

      <div className="border-b-2 border-[#2C6CB6] mb-4"></div>
      <h2 className="text-2xl font-semibold mb-8 flex items-center">
        No olvides tu CV
      </h2>
      <p className="text-gray-600">Te enviamos un correo para que puedas adjuntarlo</p>
          <div className="flex justify-center mt-4">
            <Button variant="contained">Seleccionar archivo</Button>
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
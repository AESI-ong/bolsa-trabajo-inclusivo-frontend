import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ApplicationCard from '../../components/MyApplications/ApplicationCard';
import Stack from '@mui/material/Stack';

type Application = {
    id: number;
    title: string;
    company: string;
    status: string;
    date: string;
    location?: string; 
    candidates?: number;
};

const applications: Application[] = [
    {
        id: 1,
        title: 'Operario de Almacen',
        company: 'Manpower',
        status: 'Postulado',
        date: 'Ayer',
        location: 'San Isidro, Lima, Peru',
        candidates: 5, 
    },
    {
        id: 2,
        title: 'Auxiliar de Producción',
        company: 'Manpower',
        status: 'CV visto',
        date: 'Ayer',
        location: 'San Isidro, Lima, Peru',
        candidates: 3,
    },
    {
        id: 3,
        title: 'Auxiliar de Producción',
        company: 'Manpower',
        status: 'CV visto',
        date: 'Ayer',
        location: 'San Isidro, Lima, Peru',
        candidates: 3,
    },
    {
        id: 4,
        title: 'Auxiliar de Producción',
        company: 'Manpower',
        status: 'CV visto',
        date: 'Ayer',
        location: 'San Isidro, Lima, Peru',
        candidates: 3,
    },
    {
        id: 5,
        title: 'Auxiliar de Producción',
        company: 'Manpower',
        status: 'CV visto',
        date: 'Ayer',
        location: 'San Isidro, Lima, Peru',
        candidates: 3,
    },
];

const itemsPerPage = 3;

const MyApplications: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageClick = (page: number) => {
        setCurrentPage(page);
    };

    const totalPages = Math.ceil(applications.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentApplications = applications.slice(startIndex, startIndex + itemsPerPage);

    return (
        <section className="w-full bg-white justify-center px-30 pt-6 pb-10">
            <Box>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Mis Postulaciones
                </h2>
                <Stack direction="row" spacing={2} sx={{ marginBottom: 5,  marginTop: 5 }}>
                    <Button
                        variant="outlined"
                        sx={{
                            borderColor: "#F6D70E", 
                            borderWidth: "3px",
                            color: "black", 
                            '&:hover': {
                                backgroundColor: "rgba(255, 255, 0, 0.1)",
                            },
                            fontWeight: "bold",
                            padding: "12px 20px", 
                        }}
                    >
                        Postulado
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{
                            borderColor: "#F6D70E", 
                            borderWidth: "3px",
                            color: "black", 
                            '&:hover': {
                                backgroundColor: "rgba(255, 255, 0, 0.1)",
                            },
                            fontWeight: "bold",
                            padding: "12px 20px", 
                        }}
                    >
                        CV visto
                    </Button>
                </Stack>
                <Box>
                    {currentApplications.map((job) => (
                        <ApplicationCard key={job.id} {...job} location={job.location ?? ''} />
                    ))}
                </Box>
                 <div className="flex justify-center mt-6 space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => handlePageClick(i + 1)}
                        className={`px-3 py-1 rounded border ${
                        currentPage === i + 1 ? "bg-[#2164B0] text-white" : ""
                        }`}
                    >
                        {i + 1}
                    </button>
                    ))}
                </div>
            </Box>
        </section>
    );
};

export default MyApplications;

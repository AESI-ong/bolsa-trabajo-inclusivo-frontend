import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ApplicationCard from '../../components/MyApplications/applicationCard';
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
];

const itemsPerPage = 5;

const MyApplications: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageClick = (page: number) => {
        setCurrentPage(page);
    };

    const totalPages = Math.ceil(applications.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentApplications = applications.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div>
            <Box>
                <h2  className="text-3xl font-bold mb-8 flex items-center">
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
                            padding: "10px 20px", 
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
                            padding: "10px 20px", 
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

                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <Button 
                            key={i} 
                            variant={currentPage === i + 1 ? "contained" : "outlined"} 
                            onClick={() => handlePageClick(i + 1)}
                            sx={{ marginRight: 1 }}
                        >
                            {i + 1}
                        </Button>
                    ))}
                </Box>
            </Box>
        </div>
    );
};

export default MyApplications;

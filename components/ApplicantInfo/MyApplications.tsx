'use client';

import React, { useEffect, useState } from 'react';

import type { Application } from '../../interfaces/Application';
import ApplicationCard from '../applicationCard';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import api from '../../utils/axiosInstance';

const itemsPerPage = 3;

const MyApplications: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const fetchApplications = async (status?: string | null) => {
    try {
      const res = await api.get('/applicants/applications', {
        params: status ? { status_filter: status } : {},
      });
      setApplications(res.data);
      setCurrentPage(1); // Reinicia a la página 1 cada vez que cambie el filtro
    } catch (error) {
      console.error('Error al cargar las postulaciones:', error);
    }
  };

  useEffect(() => {
    fetchApplications(statusFilter);
  }, [statusFilter]);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilter = (status: string | null) => {
    setStatusFilter(status);
  };

  const totalPages = Math.ceil(applications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentApplications = applications.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className="w-full bg-white justify-center px-30 pt-6 p-8">
      <Box>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Mis Postulaciones</h2>

        {/* Botones de filtro */}
        <Stack direction="row" spacing={2} sx={{ marginBottom: 5, marginTop: 5 }}>
          <Button
            onClick={() => handleFilter('submitted')}
            variant={statusFilter === 'submitted' ? 'contained' : 'outlined'}
            sx={{
              borderColor: '#F6D70E',
              borderWidth: '3px',
              color: 'black',
              backgroundColor: statusFilter === 'submitted' ? '#F6D70E' : 'transparent',
              '&:hover': { backgroundColor: 'rgba(255, 255, 0, 0.1)' },
              fontWeight: 'bold',
              padding: '12px 20px',
            }}
          >
            Postulado
          </Button>

          <Button
            onClick={() => handleFilter('viewed')}
            variant={statusFilter === 'viewed' ? 'contained' : 'outlined'}
            sx={{
              borderColor: '#F6D70E',
              borderWidth: '3px',
              color: 'black',
              backgroundColor: statusFilter === 'viewed' ? '#F6D70E' : 'transparent',
              '&:hover': { backgroundColor: 'rgba(255, 255, 0, 0.1)' },
              fontWeight: 'bold',
              padding: '12px 20px',
            }}
          >
            CV visto
          </Button>

          <Button
            onClick={() => handleFilter(null)}
            variant={statusFilter === null ? 'contained' : 'outlined'}
            sx={{
              borderColor: '#F6D70E',
              borderWidth: '3px',
              color: 'black',
              backgroundColor: statusFilter === null ? '#F6D70E' : 'transparent',
              '&:hover': { backgroundColor: 'rgba(255, 255, 0, 0.1)' },
              fontWeight: 'bold',
              padding: '12px 20px',
            }}
          >
            Todos
          </Button>
        </Stack>

        {/* Lista de postulaciones */}
        <Box>
          {currentApplications.map((app) => (
            <ApplicationCard
              key={app.id}
              title={app.job_offer.title}
              status={app.status as 'submitted' | 'viewed' | 'accepted' | 'rejected'}
              date={new Date(app.application_date).toLocaleDateString()}
              location={app.job_offer.location || ''}
              candidates={undefined}
            />
          ))}
        </Box>

        {/* Paginación */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageClick(i + 1)}
              className={`px-3 py-1 rounded border ${
                currentPage === i + 1 ? 'bg-[#2164B0] text-white' : ''
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


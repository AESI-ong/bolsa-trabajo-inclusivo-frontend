'use client';

import {
  Box,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  MenuItem,
  Select,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Job } from '../../interfaces/Job';
import api from '../../utils/axiosInstance';
import { withRoleProtection } from '../../utils/withRoleProtection';

function AdminDashboard() {
  const router = useRouter();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/job-offers/')
      .then((res) => setJobs(res.data))
      .catch((err) => console.error('Error al obtener ofertas:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (token: string, newStatus: 'Activo' | 'Inactivo') => {
    // 1. Optimistic update
    setJobs((prev) =>
      prev.map((j) => (j.token === token ? { ...j, active: newStatus === 'Activo' } : j)),
    );

    try {
      await api.patch(`/job-offers/${token}`, {
        active: newStatus === 'Activo', // 👈 único campo requerido
      });
    } catch (err) {
      console.error('Error al actualizar estado:', err);
      // 2. Revertir si falla
      setJobs((prev) =>
        prev.map((j) => (j.token === token ? { ...j, active: newStatus !== 'Activo' } : j)),
      );
      alert('No se pudo actualizar el estado. Intenta de nuevo.');
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography align="center">Cargando ofertas…</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" align="center" fontWeight="bold" mb={3}>
        Panel de administrador
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography sx={{ color: '#1e56a0', fontWeight: 'bold' }}>Ofertas de Trabajo</Typography>
        <Button
          sx={{ color: '#c62828', fontWeight: 'bold' }}
          onClick={() => router.push('/admin-dashboard/nueva-oferta')}
        >
          + Nueva Oferta
        </Button>
      </Box>

      <Table sx={{ border: '1px solid #1e56a0' }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#1e56a0' }}>
            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Título</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Fecha</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Estado</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Ver postulantes</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {jobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4}>No hay ofertas disponibles</TableCell>
            </TableRow>
          ) : (
            jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>{job.title}</TableCell>
                <TableCell>
                  {new Date(job.created_at).toLocaleDateString('es-PE')}
                </TableCell>
                <TableCell>
                  <Select
                    size="small"
                    sx={{ backgroundColor: '#e3f2fd', minWidth: 100 }}
                    value={job.active ? 'Activo' : 'Inactivo'}
                    onChange={(e) =>
                      handleStatusChange(job.token, e.target.value as 'Activo' | 'Inactivo')
                    }
                  >
                    <MenuItem value="Activo">Activo</MenuItem>
                    <MenuItem value="Inactivo">Inactivo</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button
                    variant="text"
                    sx={{ color: '#1e56a0', fontWeight: 'bold', textTransform: 'none' }}
                    disabled={!job.total_applicants}
                    onClick={() =>
                      router.push(`/admin-dashboard/ver-postulantes/${job.token}`)
                    }
                  >
                    {job.total_applicants ?? '0'}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Box>
  );
}

const ProtectedAdminDashboard = withRoleProtection(AdminDashboard, ['admin']);
export default ProtectedAdminDashboard;

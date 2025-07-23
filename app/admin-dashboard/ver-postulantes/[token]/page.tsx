'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Select,
  MenuItem,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import api from '../../../../utils/axiosInstance';
import { useUser } from '../../../../interfaces/UserContext';
import CustomSnackbar from '../../../../components/CustomSnackbar';
import type { Application } from '../../../../interfaces/Application';

export default function VerPostulantesPorOferta() {
  const { token } = useParams();
  const router = useRouter();
  const { user, loading: userLoading } = useUser();

  const [applications, setApplications] = useState<Application[]>([]);
  const [jobTitle, setJobTitle] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  });

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const getFilenameFromUrl = (url: string) => {
    const parts = url.split('/');
    return parts[parts.length - 1];
  };

  const handleDownloadCV = async (filename: string) => {
    try {
      const res = await api.get(`/applicants/cv/download/${filename}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      setSnackbar({
        open: true,
        message: 'CV descargado exitosamente.',
        severity: 'success',
      });
    } catch (error) {
      console.error('Error al descargar el CV:', error);
      setSnackbar({
        open: true,
        message: 'No se pudo descargar el CV.',
        severity: 'error',
      });
    }
  };

  const handleStatusChange = async (applicationId: number, newStatus: string) => {
    try {
      await api.patch(`/applications/${applicationId}`, { status: newStatus });
      setApplications(prev =>
        prev.map(app =>
          app.id === applicationId ? { ...app, status: newStatus } : app
        )
      );
      setSnackbar({
        open: true,
        message: 'Estado actualizado exitosamente.',
        severity: 'success',
      });
    } catch (error) {
      console.error('Error al actualizar el estado:', error);
      setSnackbar({
        open: true,
        message: 'No se pudo actualizar el estado.',
        severity: 'error',
      });
    }
  };

  useEffect(() => {
    if (!userLoading && (!user || user.role !== 'admin')) {
      router.push('/login');
    }
  }, [user, userLoading, router]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await api.get(`/job-offers/${token}/applications`);
        setApplications(res.data || []);
        if (res.data.length > 0) {
          setJobTitle(res.data[0].job_offer.title);
        }
      } catch (error) {
        console.error('Error al obtener postulaciones:', error);
      }
    };

    if (token) fetchApplications();
  }, [token]);

  if (userLoading || !user || user.role !== 'admin') return null;

  return (
    <Box sx={{ padding: 4, minHeight: '80vh' }}>
      <Button
        onClick={() => router.push('/admin-dashboard')}
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Atrás
      </Button>

      <CustomSnackbar
        open={snackbar.open}
        onClose={handleSnackbarClose}
        message={snackbar.message}
        severity={snackbar.severity as 'success' | 'error' | 'warning' | 'info'}
      />

      <Typography variant="h5" align="center" fontWeight="bold" mt={1} mb={3}>
        Panel de administrador
      </Typography>

      <Typography variant="h6" color="#1e56a0" fontWeight="bold" mt={2}>
        Ver Postulantes
      </Typography>

      <Typography sx={{ mb: 2 }}>Puesto: {jobTitle}</Typography>

      <Table sx={{ border: '1px solid #1e56a0' }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#1e56a0' }}>
            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Nombre</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Fecha de postulación</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>CV</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Estado de Visualización</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {applications.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4}>No hay postulantes para esta oferta.</TableCell>
            </TableRow>
          ) : (
            applications.map((app, index) => {
              const fullName = `${app.applicant.user.first_name} ${app.applicant.user.last_name}`;
              const date = new Date(app.application_date);

              // Corrige la diferencia horaria manualmente: -5 horas
              date.setHours(date.getHours() - 5);

              const applicationDate = new Intl.DateTimeFormat('es-PE', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              }).format(date);
              const cvUrl = app.applicant.cv_url;
              const filename = cvUrl ? getFilenameFromUrl(cvUrl) : null;
              const rawStatus = app.status;
              console.log('rawStatus:', rawStatus);
              const currentStatus = rawStatus === 'viewed' || rawStatus === 'not_viewed'
                ? rawStatus
                : 'not_viewed';

              return (
                <TableRow key={index}>
                  <TableCell>{fullName}</TableCell>
                  <TableCell>{applicationDate}</TableCell>
                  <TableCell>
                    {filename ? (
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleDownloadCV(filename)}
                      >
                        Descargar
                      </Button>
                    ) : (
                      'Sin CV'
                    )}
                  </TableCell>
                  <TableCell>
                    <Select
                    value={currentStatus}
                    onChange={(e) => handleStatusChange(app.id, e.target.value)}
                    size="small"
                    sx={{ minWidth: 120 }}
                  >
                    <MenuItem value="viewed">Visto</MenuItem>
                    <MenuItem value="not_viewed">No visto</MenuItem>
                  </Select>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </Box>
  );
}


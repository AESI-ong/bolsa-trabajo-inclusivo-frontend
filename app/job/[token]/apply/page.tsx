'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '../../../../utils/axiosInstance';
import { useUser } from '../../../../interfaces/UserContext';
import type { Job } from '../../../../interfaces/Job';
import { withRoleProtection } from '../../../../utils/withRoleProtection';
import CustomSnackbar from '../../../../components/CustomSnackbar';

function ApplyPage() {
  const { token } = useParams(); // Obtener token desde la URL
  const router = useRouter();
  const { user, loading } = useUser();
  const [job, setJob] = useState<Job | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  });
  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  // Redirigir si no está logueado
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user, router]);

  // Obtener detalles del trabajo
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/job-offers/${token}`);
        setJob(res.data);
      } catch (err) {
        console.error(err);
        setSnackbar({
          open: true,
          message: 'Error al cargar la oferta de trabajo.',
          severity: 'error',
        });
      }
    };
    if (token) fetchJob();
  }, [token]);

  const handleApply = async () => {
    setIsSubmitting(true);
    try {
      await api.post('/applications/', {
        job_offer_token: token,
      });
      setSnackbar({
        open: true,
        message: 'Postulación exitosa',
        severity: 'success',
      });
      // esperar 1 segundo antes de redirigir
      await new Promise(resolve => setTimeout(resolve, 2000));
      router.push('/');
    } catch (err: unknown) {
      console.error(err);
      // Type guard para error de Axios
      interface AxiosError {
        response?: {
          status?: number;
          data?: { message?: string };
        };
      }
      const error = err as AxiosError;
      setSnackbar({
        open: true,
        message: error?.response?.data?.message || 'Error al postular. Intenta nuevamente.',
        severity: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!job) return <p className="text-center py-10">Cargando oferta...</p>;

  return (
    <>
    <div className="flex flex-col items-center justify-center align-center min-h-screen bg-gray-200">
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity as 'success' | 'error' | 'warning' | 'info'}
        onClose={handleSnackbarClose}
      />
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow ">
      <h1 className="text-2xl font-bold mb-4">{job.title}</h1>
      <p className="mb-2"><strong>Ubicación:</strong> {job.location}</p>
      <p className="mb-4"><strong>Tipo:</strong> {job.job_type === 'part_time' ? 'Medio tiempo' : 'Tiempo completo'}</p>
      <p className="mb-6">{job.description}</p>

      <button
        onClick={handleApply}
        disabled={isSubmitting}
        className="bg-[#3862af] text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        {isSubmitting ? 'Postulando...' : 'Confirmar postulación'}
      </button>
    </div>
    </div>
    </>
  );
}

const ProtectedApplyPage = withRoleProtection(ApplyPage, ['applicant']);
export default ProtectedApplyPage;

'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '../../../../utils/axiosInstance';
import { useUser } from '../../../../interfaces/UserContext';
import type { Job } from '../../../../interfaces/Job';

export default function ApplyPage() {
  const { token } = useParams(); // Obtener token desde la URL
  const router = useRouter();
  const { user, loading } = useUser();
  const [job, setJob] = useState<Job | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Redirigir si no está logueado
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user]);

  // Obtener detalles del trabajo
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/job-offers/${token}`);
        setJob(res.data);
      } catch (err) {
        setError("No se pudo cargar la oferta de trabajo.");
      }
    };
    if (token) fetchJob();
  }, [token]);

  const handleApply = async () => {
    setIsSubmitting(true);
    setError('');
    try {
      await api.post('/applications/', {
        job_offer_token: token,
      });
      alert('¡Postulación exitosa!');
      router.push('/');
    } catch (err: any) {
      console.error(err);
      setError("Error al postular. Intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!job) return <p className="text-center py-10">Cargando oferta...</p>;

  return (
    <>
    <div className="flex flex-col items-center justify-center align-center min-h-screen bg-gray-200">
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow ">
      <h1 className="text-2xl font-bold mb-4">{job.title}</h1>
      <p className="mb-2"><strong>Ubicación:</strong> {job.location}</p>
      <p className="mb-4"><strong>Tipo:</strong> {job.job_type === 'part_time' ? 'Medio tiempo' : 'Tiempo completo'}</p>
      <p className="mb-6">{job.description}</p>

      {error && <p className="text-red-600 mb-4">{error}</p>}

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

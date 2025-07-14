'use client';

import { Box, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Job } from "../../interfaces/Job";
import api from "../../utils/axiosInstance";
import { withRoleProtection } from "../../utils/withRoleProtection";
import { useUser } from "../../interfaces/UserContext";

function AdminDashboard() {
  const router = useRouter();
  const { user } = useUser();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/job-offers/')
      .then((res) => setJobs(res.data))
      .catch((err) => console.error("Error al obtener ofertas de trabajo:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (token: string, newStatus: string) => {
    const jobToUpdate = jobs.find((job) => job.token === token);
    if (!jobToUpdate) return;

    const updatedData = {
      title: jobToUpdate.title,
      location: jobToUpdate.location,
      description: jobToUpdate.description,
      job_type: jobToUpdate.job_type,
      responsibilities: jobToUpdate.responsibilities,
      skills: jobToUpdate.skills,
      sector: jobToUpdate.sector,
      active: newStatus === "Activo",
    };

    try {
      await api.patch(`/job-offers/${token}`, updatedData);

      const updatedJobs = jobs.map((job) =>
        job.token === token ? { ...job, active: newStatus === "Activo" } : job
      );
      setJobs(updatedJobs);
    } catch (err) {
      console.error("Error al actualizar estado:", err);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" align="center" fontWeight="bold" mt={4} mb={3}>
        Panel de administrador
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography sx={{ color: "#1e56a0", fontWeight: "bold" }}>
          Ofertas de Trabajo
        </Typography>
        <Button
          sx={{ color: "#c62828", fontWeight: "bold" }}
          onClick={() => router.push("/admin-dashboard/nueva-oferta")}
        >
          + Nueva Oferta
        </Button>
      </Box>

      <Table sx={{ border: "1px solid #1e56a0" }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#1e56a0" }}>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Título</TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Fecha</TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Estado</TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Ver postulantes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={4}>Cargando...</TableCell>
            </TableRow>
          ) : jobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4}>No hay ofertas disponibles</TableCell>
            </TableRow>
          ) : (
            jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>{job.title}</TableCell>
                <TableCell>{new Date(job.created_at).toLocaleDateString("es-PE")}</TableCell>
                <TableCell>
                  <Select
                    value={job.active ? "Activo" : "Inactivo"}
                    onChange={(e) => handleStatusChange(job.token, e.target.value)}
                    size="small"
                    sx={{ backgroundColor: "#e3f2fd", minWidth: 100 }}
                  >
                    <MenuItem value="Activo">Activo</MenuItem>
                    <MenuItem value="Inactivo">Inactivo</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button
                    variant="text"
                    sx={{ color: "#1e56a0", fontWeight: "bold", textTransform: "none" }}
                    disabled={!job.total_applicants}
                    onClick={() => router.push(`/admin-dashboard/ver-postulantes/${job.token}`)}
                  >
                    {job.total_applicants ?? "0"}
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

export default withRoleProtection(AdminDashboard, ['admin']);

"use client";

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
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Job } from "../../interfaces/Job";
import api from "../../utils/axiosInstance";
import { useUser } from "../../interfaces/UserContext";

export default function AdminDashboard() {
  const router = useRouter();
  const { user, loading: userLoading } = useUser(); // 👈 usa loading del contexto
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔐 Protección de ruta: si no es admin, redirige
  useEffect(() => {
    if (!userLoading) {
      if (!user || user?.role !== "admin") {
        router.push("/login"); // o /not-authorized si tienes una página especial
      }
    }
  }, [user, userLoading]);

  // 🧠 Obtener las ofertas solo si es admin
  useEffect(() => {
    if (user && user?.role === "admin") {
      api
        .get("/job-offers/")
        .then((res) => setJobs(res.data))
        .catch((err) => {
          console.error("Error al obtener ofertas de trabajo:", err);
        })
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleStatusChange = async (token: string, newStatus: string) => {
    try {
      await api.patch(`/job-offers/${token}`, {
        active: newStatus === "Activo",
      });
      const updatedJobs = jobs.map((job) =>
        job.token === token ? { ...job, active: newStatus === "Activo" } : job
      );
      setJobs(updatedJobs);
    } catch (err) {
      console.error("Error al actualizar estado:", err);
    }
  };

  // 🙅 Evita renderizar mientras no se cargue user o si no es admin
  if (userLoading || !user || user?.role !== "admin") return null;
  
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
                <TableCell>{job.total_applicants?job.total_applicants:"0"}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Box>
  );
}




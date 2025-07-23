"use client";

import {
  Box,
  Button,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import type { Job } from "../../interfaces/Job";
import api from "../../utils/axiosInstance";
import { useRouter } from "next/navigation";
import { withRoleProtection } from "../../utils/withRoleProtection";

function AdminDashboard() {
  const router = useRouter();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/job-offers/")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error("Error al obtener ofertas:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (
    token: string,
    newStatus: "Activo" | "Inactivo"
  ) => {
    // 1. Optimistic update
    setJobs((prev) =>
      prev.map((j) =>
        j.token === token ? { ...j, active: newStatus === "Activo" } : j
      )
    );

    try {
      await api.patch(`/job-offers/${token}`, {
        active: newStatus === "Activo", // 👈 único campo requerido
      });
    } catch (err) {
      console.error("Error al actualizar estado:", err);
      // 2. Revertir si falla
      setJobs((prev) =>
        prev.map((j) =>
          j.token === token ? { ...j, active: newStatus !== "Activo" } : j
        )
      );
      alert("No se pudo actualizar el estado. Intenta de nuevo.");
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
    <Box sx={{ p: { xs: 1, sm: 2, md: 4 } }} className="max-w-7xl mx-auto">
      <Typography variant="h5" align="center" fontWeight="bold" mb={3}>
        Panel de administrador
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "center" },
          mb: 2,
          gap: 2,
        }}
      >
        <Typography
          sx={{ color: "#1e56a0", fontWeight: "bold", mb: { xs: 1, sm: 0 } }}
        >
          Ofertas de Trabajo
        </Typography>
        <Button
          sx={{
            color: "#c62828",
            fontWeight: "bold",
            width: { xs: "100%", sm: "auto" },
          }}
          onClick={() => router.push("/admin-dashboard/nueva-oferta")}
        >
          + Nueva Oferta
        </Button>
      </Box>

      <Box
        sx={{
          width: "100%",
          overflowX: "auto",
          borderRadius: 2,
          boxShadow: { xs: 1, md: 0 },
          border: { xs: "1px solid #e0e0e0", md: "1px solid #1e56a0" },
          background: "#fff",
        }}
      >
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1e56a0" }}>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Título
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Fecha
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Estado
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Ver postulantes
              </TableCell>
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
                    {new Date(job.created_at).toLocaleDateString("es-PE")}
                  </TableCell>
                  <TableCell>
                    <Select
                      size="small"
                      sx={{ backgroundColor: "#e3f2fd", minWidth: 100 }}
                      value={job.active ? "Activo" : "Inactivo"}
                      onChange={(e) =>
                        handleStatusChange(
                          job.token,
                          e.target.value as "Activo" | "Inactivo"
                        )
                      }
                    >
                      <MenuItem value="Activo">Activo</MenuItem>
                      <MenuItem value="Inactivo">Inactivo</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="text"
                      sx={{
                        color: "#1e56a0",
                        fontWeight: "bold",
                        textTransform: "none",
                      }}
                      disabled={!job.total_applicants}
                      onClick={() =>
                        router.push(
                          `/admin-dashboard/ver-postulantes/${job.token}`
                        )
                      }
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
    </Box>
  );
}

const ProtectedAdminDashboard = withRoleProtection(AdminDashboard, ["admin"]);
export default ProtectedAdminDashboard;

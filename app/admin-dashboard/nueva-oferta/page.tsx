"use client";

import {
  Box,
  Button,
  IconButton,
  ListSubheader,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CustomSnackbar from "../../../components/CustomSnackbar";
import api from "../../../utils/axiosInstance";
import categories from "../../../assets/data/categories.json";
import locationsData from "../../../assets/data/locations.json";
import { useRouter } from "next/navigation";
import { useUser } from "../../../interfaces/UserContext";
import { withRoleProtection } from "../../../utils/withRoleProtection";

function NewJobForm() {
  const router = useRouter();
  const { user, loading } = useUser();

  const [job, setJob] = useState({
    title: "",
    location: "",
    description: "",
    job_type: "",
    responsibilities: [""],
    skills: [""],
    sector: "",
    active: true,
  });

  //const [loadingPost, setLoadingPost] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  // Protección de ruta
  useEffect(() => {
    if (!loading) {
      if (!user || user?.role !== "admin") {
        router.replace("/"); // redirige al home si no es admin
      }
    }
  }, [user, loading, router]);

  const handleChange = (field: keyof typeof job, value: string | boolean) => {
    setJob({ ...job, [field]: value });
  };

  const handleArrayChange = (
    field: "responsibilities" | "skills",
    index: number,
    value: string
  ) => {
    const updated = [...job[field]];
    updated[index] = value;
    setJob({ ...job, [field]: updated });
  };

  const addField = (field: "responsibilities" | "skills") => {
    setJob({ ...job, [field]: [...job[field], ""] });
  };

  const publishOffer = async () => {
    try {
      await api.post("/job-offers/", job);
      setSnackbar({
        open: true,
        message: "Oferta publicada exitosamente.",
        severity: "success",
      });
      //esperar 2 segundos antes de redirigir
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.push("/admin-dashboard");
    } catch (error) {
      console.error("Error al crear oferta:", error);
      setSnackbar({
        open: true,
        message: "Hubo un error al crear la oferta.",
        severity: "error",
      });
    }
  };
  //Guardar borrador es igual que publicar, pero el campo "active" se pone a false
  const saveDraft = async () => {
    try {
      await api.post("/job-offers/", { ...job, active: false });
      setSnackbar({
        open: true,
        message: "Borrador guardado exitosamente.",
        severity: "success",
      });
      //esperar 2 segundos antes de redirigir
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.push("/admin-dashboard");
    } catch (error) {
      console.error("Error al guardar borrador:", error);
      setSnackbar({
        open: true,
        message: "Hubo un error al guardar el borrador.",
        severity: "error",
      });
    }
  };

  if (loading || !user || user?.role !== "admin") {
    return null; // o un spinner si prefieres mientras carga
  }

  return (
    <div className="px-2 py-4 sm:px-4 md:px-8 lg:px-0 w-full max-w-7xl mx-auto">
      {/* 🔙 Botón Atrás */}
      <Button
        onClick={() => router.push("/admin-dashboard")}
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3, width: { xs: "100%", sm: "auto" } }}
      >
        Atrás
      </Button>
      <Box sx={{ padding: { xs: 1, sm: 2 }, maxWidth: 700, mx: "auto" }}>
        <Typography variant="h6" align="center" fontWeight="bold" mb={3}>
          Crear Nueva Oferta de Trabajo
        </Typography>

        <CustomSnackbar
          open={snackbar.open}
          onClose={handleSnackbarClose}
          message={snackbar.message}
          severity={
            snackbar.severity as "success" | "error" | "warning" | "info"
          }
        />

        <Box
          sx={{
            backgroundColor: "#90caf9",
            borderRadius: 2,
            p: { xs: 2, sm: 3 },
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2,
          }}
        >
          {/* Título */}
          <Box>
            <Typography fontWeight="bold">Título:</Typography>
            <TextField
              fullWidth
              value={job.title}
              onChange={(e) => handleChange("title", e.target.value)}
              sx={{ backgroundColor: "#fff", mt: 0.5 }}
            />
          </Box>

          {/* Ubicación */}
          <Box>
            <Typography fontWeight="bold">Ubicación:</Typography>
            <Select
              fullWidth
              value={job.location}
              onChange={(e) => handleChange("location", e.target.value)}
              sx={{ backgroundColor: "#fff", mt: 0.5 }}
              displayEmpty
              renderValue={(selected) => selected || "Seleccionar ubicación"}
            >
              <MenuItem value="" disabled>
                Seleccionar ubicación
              </MenuItem>
              <ListSubheader>Lima (distritos)</ListSubheader>
              {locationsData.lima.map((dist: string) => (
                <MenuItem key={dist} value={dist}>
                  {dist}
                </MenuItem>
              ))}
              <ListSubheader>──────────</ListSubheader>
              {locationsData.regiones.map((region: string) => (
                <MenuItem key={region} value={region}>
                  {region}
                </MenuItem>
              ))}
            </Select>
          </Box>

          {/* Descripción */}
          <Box sx={{ gridColumn: { xs: "span 1", sm: "span 2" } }}>
            <Typography fontWeight="bold">Descripción:</Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              value={job.description}
              onChange={(e) => handleChange("description", e.target.value)}
              sx={{ backgroundColor: "#fff", mt: 0.5 }}
            />
          </Box>

          {/* Tipo de jornada */}
          <Box>
            <Typography fontWeight="bold">Tipo de jornada:</Typography>
            <Select
              fullWidth
              value={job.job_type}
              onChange={(e) => handleChange("job_type", e.target.value)}
              sx={{ backgroundColor: "#fff", mt: 0.5 }}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Selecciona una opción
              </MenuItem>
              <MenuItem value="full_time">Tiempo completo</MenuItem>
              <MenuItem value="part_time">Medio tiempo</MenuItem>
            </Select>
          </Box>

          {/* Sector */}
          <Box>
            <Typography fontWeight="bold">Sector:</Typography>
            <Select
              fullWidth
              value={job.sector}
              onChange={(e) => handleChange("sector", e.target.value)}
              sx={{ backgroundColor: "#fff", mt: 0.5 }}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Seleccionar categoría
              </MenuItem>
              {categories.map((cat: string) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </Box>

          {/* Responsabilidades */}
          <Box sx={{ gridColumn: { xs: "span 1", sm: "span 2" } }}>
            <Typography fontWeight="bold">Responsabilidades:</Typography>
            {job.responsibilities.map((res, i) => (
              <TextField
                key={i}
                fullWidth
                value={res}
                onChange={(e) =>
                  handleArrayChange("responsibilities", i, e.target.value)
                }
                sx={{ backgroundColor: "#fff", mt: 1 }}
              />
            ))}
            <Box display="flex" justifyContent="center" mt={1}>
              <IconButton onClick={() => addField("responsibilities")}>
                <AddIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Habilidades */}
          <Box sx={{ gridColumn: { xs: "span 1", sm: "span 2" } }}>
            <Typography fontWeight="bold">Habilidades:</Typography>
            {job.skills.map((skill, i) => (
              <TextField
                key={i}
                fullWidth
                value={skill}
                onChange={(e) => handleArrayChange("skills", i, e.target.value)}
                sx={{ backgroundColor: "#fff", mt: 1 }}
              />
            ))}
            <Box display="flex" justifyContent="center" mt={1}>
              <IconButton onClick={() => addField("skills")}>
                <AddIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>

        {/* Botones */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
            mt: 3,
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#004ba0",
              width: { xs: "100%", sm: "auto" },
            }}
            onClick={publishOffer}
            disabled={loading}
          >
            {loading ? "Publicando..." : "Publicar oferta"}
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: "#c62828",
              borderColor: "#c62828",
              width: { xs: "100%", sm: "auto" },
            }}
            onClick={saveDraft}
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar borrador"}
          </Button>
        </Box>
      </Box>
    </div>
  );
}

const ProtectedNewJobForm = withRoleProtection(NewJobForm, ["admin"]);
export default ProtectedNewJobForm;

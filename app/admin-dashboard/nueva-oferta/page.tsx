'use client';

import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../../../interfaces/UserContext";
import api from "../../../utils/axiosInstance";
import CustomSnackbar from '../../../components/CustomSnackbar';
import { withRoleProtection } from "../../../utils/withRoleProtection";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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

  const [loadingPost, setLoadingPost] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  });

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
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
    setLoadingPost(true);
    try {
      await api.post("/job-offers/", job);
      setSnackbar({
        open: true,
        message: 'Oferta publicada exitosamente.',
        severity: 'success',
      });
      //esperar 2 segundos antes de redirigir
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.push("/admin-dashboard");
    } catch (error) {
      console.error("Error al crear oferta:", error);
      setSnackbar({
        open: true,
        message: 'Hubo un error al crear la oferta.',
        severity: 'error',
      });
    } finally {
      setLoadingPost(false);
    }
  };
  //Guardar borrador es igual que publicar, pero el campo "active" se pone a false
  const saveDraft = async () => {
    setLoadingPost(true);
    try {
      await api.post("/job-offers/", { ...job, active: false });
      setSnackbar({
        open: true,
        message: 'Borrador guardado exitosamente.',
        severity: 'success',
      });
      //esperar 2 segundos antes de redirigir
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.push("/admin-dashboard");
    } catch (error) {
      console.error("Error al guardar borrador:", error);
      setSnackbar({
        open: true,
        message: 'Hubo un error al guardar el borrador.',
        severity: 'error',
      });
    } finally {
      setLoadingPost(false);
    }
  };

  if (loading || !user || user?.role !== "admin") {
    return null; // o un spinner si prefieres mientras carga
  }

  return (
    <div style={{ padding: '2rem' }}>
      {/* 🔙 Botón Atrás */}
      <Button
        onClick={() => router.push('/admin-dashboard')}
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Atrás
      </Button>
    <Box sx={{ padding: 2, maxWidth: 700, mx: "auto" }}>
      <Typography variant="h6" align="center" fontWeight="bold" mb={3}>
        Crear Nueva Oferta de Trabajo
      </Typography>

      <CustomSnackbar
        open={snackbar.open}
        onClose={handleSnackbarClose}
        message={snackbar.message}
        severity={snackbar.severity as any}
      />

      <Box
        sx={{
          backgroundColor: "#90caf9",
          borderRadius: 2,
          p: 3,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
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
        >
          <MenuItem value="" disabled>Seleccionar ubicación</MenuItem>
          <MenuItem value="Ancón">Ancón</MenuItem>
          <MenuItem value="Ate">Ate</MenuItem>
          <MenuItem value="Barranco">Barranco</MenuItem>
          <MenuItem value="Breña">Breña</MenuItem>
          <MenuItem value="Carabayllo">Carabayllo</MenuItem>
          <MenuItem value="Chorrillos">Chorrillos</MenuItem>
          <MenuItem value="Comas">Comas</MenuItem>
          <MenuItem value="El Agustino">El Agustino</MenuItem>
          <MenuItem value="Independencia">Independencia</MenuItem>
          <MenuItem value="Jesús María">Jesús María</MenuItem>
          <MenuItem value="La Molina">La Molina</MenuItem>
          <MenuItem value="La Victoria">La Victoria</MenuItem>
          <MenuItem value="Lince">Lince</MenuItem>
          <MenuItem value="Los Olivos">Los Olivos</MenuItem>
          <MenuItem value="Lurigancho">Lurigancho</MenuItem>
          <MenuItem value="Lurín">Lurín</MenuItem>
          <MenuItem value="Magdalena del Mar">Magdalena del Mar</MenuItem>
          <MenuItem value="Miraflores">Miraflores</MenuItem>
          <MenuItem value="Pueblo Libre">Pueblo Libre</MenuItem>
          <MenuItem value="Puente Piedra">Puente Piedra</MenuItem>
          <MenuItem value="Rímac">Rímac</MenuItem>
          <MenuItem value="San Borja">San Borja</MenuItem>
          <MenuItem value="San Isidro">San Isidro</MenuItem>
          <MenuItem value="San Juan de Lurigancho">San Juan de Lurigancho</MenuItem>
          <MenuItem value="San Juan de Miraflores">San Juan de Miraflores</MenuItem>
          <MenuItem value="San Luis">San Luis</MenuItem>
          <MenuItem value="San Martín de Porres">San Martín de Porres</MenuItem>
          <MenuItem value="San Miguel">San Miguel</MenuItem>
          <MenuItem value="Santiago de Surco">Santiago de Surco</MenuItem>
          <MenuItem value="Surquillo">Surquillo</MenuItem>
          <MenuItem value="Villa El Salvador">Villa El Salvador</MenuItem>
          <MenuItem value="Villa María del Triunfo">Villa María del Triunfo</MenuItem>
          <MenuItem value="Callao">Callao</MenuItem>
        </Select>
      </Box>

        {/* Descripción */}
        <Box sx={{ gridColumn: "span 2" }}>
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
          <MenuItem value="" disabled>Selecciona una opción</MenuItem>
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
          <MenuItem value="" disabled>Seleccionar categoría</MenuItem>
          <MenuItem value="Agricultura">Agricultura</MenuItem>
          <MenuItem value="Comercio">Comercio</MenuItem>
          <MenuItem value="Construcción">Construcción</MenuItem>
          <MenuItem value="Hotelería y Turismo">Hotelería y Turismo</MenuItem>
          <MenuItem value="Educación">Educación</MenuItem>
          <MenuItem value="Servicios financieros">Servicios financieros</MenuItem>
          <MenuItem value="Transporte">Transporte</MenuItem>
          <MenuItem value="Ventas">Ventas</MenuItem>
        </Select>
      </Box>

        {/* Responsabilidades */}
        <Box sx={{ gridColumn: "span 2" }}>
          <Typography fontWeight="bold">Responsabilidades:</Typography>
          {job.responsibilities.map((res, i) => (
            <TextField
              key={i}
              fullWidth
              value={res}
              onChange={(e) => handleArrayChange("responsibilities", i, e.target.value)}
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
        <Box sx={{ gridColumn: "span 2" }}>
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
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3, gap: 2 }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#004ba0" }}
          onClick={publishOffer}
          disabled={loading}
        >
          {loading ? "Publicando..." : "Publicar oferta"}
        </Button>
        <Button variant="outlined"
        sx={{ color: "#c62828", borderColor: "#c62828" }}
          onClick={saveDraft}
          disabled={loading}
        >{loading?"Guardando...":"Guardar borrador"}
        </Button>
      </Box>
    </Box>
    </div>
  );
}

export default withRoleProtection(NewJobForm, ['admin']);
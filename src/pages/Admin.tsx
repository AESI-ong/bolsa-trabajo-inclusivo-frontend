import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

// Mock data for job listings
const mockJobs = [
  {
    id: 1,
    title: "Operario de Almacén",
    company: "Alicorp",
    date: "10/06/2025",
    status: "Activo",
    applicants: 50,
  },
  {
    id: 2,
    title: "Asistente de Ventas",
    company: "Metro",
    date: "08/06/2025",
    status: "Activo",
    applicants: 32,
  },
  {
    id: 3,
    title: "Cajero",
    company: "Tottus",
    date: "05/06/2025",
    status: "Inactivo",
    applicants: 18,
  },
];

function Admin() {
  const [jobs] = useState(mockJobs);
  const navigate = useNavigate();

  const handleNewOffer = () => {
    navigate("/admin/create-offer");
  };

  const handleViewApplicants = (jobId: number) => {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      navigate("/admin/applicants", { 
        state: { 
          jobId: job.id,
          jobTitle: job.title,
          company: job.company 
        } 
      });
    }
  };

  const handleStatusChange = (jobId: number, newStatus: string) => {
    // TODO: Update job status
    console.log("Update status for job:", jobId, "to:", newStatus);
  };

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log("Logging out");
  };

  return (
    <Box sx={{ minHeight: "100vh", p: 4 }}>
      {/* Header */}
      <Box 
        sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          mb: 4 
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src="/aesi-logo.svg"
            alt="AESI logo"
            style={{ height: 80, width: "auto" }}
          />
        </Box>
        <Button
          variant="text"
          onClick={handleLogout}
          sx={{
            color: "#CD2027",
            fontSize: "1.1rem",
            fontWeight: 500,
            "&:hover": {
              backgroundColor: "transparent",
              textDecoration: "underline",
            },
          }}
        >
          Cerrar sesión
        </Button>
      </Box>

      {/* Title */}
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          mb: 6,
          fontSize: "2.5rem",
        }}
      >
        Panel de administrador
      </Typography>

      {/* Section Header */}
      <Box 
        sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          mb: 3 
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#2164B0",
            fontWeight: "bold",
            fontSize: "1.8rem",
          }}
        >
          Ofertas de Trabajo
        </Typography>
        <Button
          variant="text"
          onClick={handleNewOffer}
          sx={{
            color: "#CD2027",
            fontSize: "1.2rem",
            fontWeight: 500,
            "&:hover": {
              backgroundColor: "transparent",
              textDecoration: "underline",
            },
          }}
        >
          + Nueva Oferta
        </Button>
      </Box>

      {/* Jobs Table */}
      <TableContainer 
        component={Paper} 
        sx={{ 
          border: "2px solid #2164B0",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#2164B0" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: "1.1rem" }}>
                Título
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: "1.1rem" }}>
                Empresa
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: "1.1rem" }}>
                Fecha
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: "1.1rem" }}>
                Estado
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: "1.1rem" }}>
                Ver postulantes
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id} sx={{ height: "80px" }}>
                <TableCell sx={{ fontSize: "1rem", borderRight: "1px solid #2164B0" }}>
                  {job.title}
                </TableCell>
                <TableCell sx={{ fontSize: "1rem", borderRight: "1px solid #2164B0" }}>
                  {job.company}
                </TableCell>
                <TableCell sx={{ fontSize: "1rem", borderRight: "1px solid #2164B0" }}>
                  {job.date}
                </TableCell>
                <TableCell sx={{ borderRight: "1px solid #2164B0" }}>
                  <FormControl size="small">
                    <Select
                      value={job.status}
                      onChange={(e) => handleStatusChange(job.id, e.target.value)}
                      sx={{
                        backgroundColor: job.status === "Activo" ? "#8AAFD9" : "#E0E0E0",
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                      }}
                    >
                      <MenuItem value="Activo">Activo</MenuItem>
                      <MenuItem value="Inactivo">Inactivo</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Button
                    variant="text"
                    onClick={() => handleViewApplicants(job.id)}
                    sx={{
                      color: "#000",
                      fontSize: "1rem",
                      textDecoration: "underline",
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    {job.applicants}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {/* Empty rows to match the design */}
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={`empty-${index}`} sx={{ height: "80px" }}>
                <TableCell sx={{ borderRight: "1px solid #2164B0" }}>&nbsp;</TableCell>
                <TableCell sx={{ borderRight: "1px solid #2164B0" }}>&nbsp;</TableCell>
                <TableCell sx={{ borderRight: "1px solid #2164B0" }}>&nbsp;</TableCell>
                <TableCell sx={{ borderRight: "1px solid #2164B0" }}>&nbsp;</TableCell>
                <TableCell>&nbsp;</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Admin; 
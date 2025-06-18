import { useState, useEffect } from "react";
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
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useLocation, useNavigate } from "react-router-dom";

// Mock data for applicants by job
const mockApplicantsByJob = {
  1: [ // Operario de Almacén
    {
      id: 1,
      name: "Juan Pedro Perez Villanueva",
      applicationDate: "10/06/2025",
    },
    {
      id: 2,
      name: "María Carmen López García",
      applicationDate: "09/06/2025",
    },
    {
      id: 3,
      name: "Carlos Alberto Mendoza Silva",
      applicationDate: "08/06/2025",
    },
  ],
  2: [ // Asistente de Ventas
    {
      id: 4,
      name: "Ana Sofia Rodriguez Martinez",
      applicationDate: "08/06/2025",
    },
    {
      id: 5,
      name: "Luis Fernando Castro Diaz",
      applicationDate: "07/06/2025",
    },
  ],
  3: [ // Cajero
    {
      id: 6,
      name: "Carmen Elena Vargas Lopez",
      applicationDate: "05/06/2025",
    },
  ],
};

function AdminApplicants() {
  const location = useLocation();
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState<any[]>([]);
  const [jobInfo, setJobInfo] = useState({
    jobId: 1,
    jobTitle: "Operario de Almacén",
    company: "Alicorp"
  });

  useEffect(() => {
    // Get job information from navigation state
    if (location.state) {
      const { jobId, jobTitle, company } = location.state;
      setJobInfo({ jobId, jobTitle, company });
      
      // Load applicants for this specific job
      const jobApplicants = mockApplicantsByJob[jobId as keyof typeof mockApplicantsByJob] || [];
      setApplicants(jobApplicants);
    }
  }, [location.state]);

  const handleBack = () => {
    navigate("/admin");
  };

  const handleForward = () => {
    // TODO: Navigate forward (if applicable)
    console.log("Navigate forward");
  };

  const handleDownloadCV = (applicantId: number) => {
    // TODO: Implement CV download
    console.log("Download CV for applicant:", applicantId);
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

      {/* Navigation */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <IconButton 
          onClick={handleBack}
          sx={{
            border: "2px solid #2164B0",
            borderRadius: "50%",
            width: 48,
            height: 48,
            color: "#2164B0",
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <IconButton 
          onClick={handleForward}
          sx={{
            border: "2px solid #2164B0",
            borderRadius: "50%",
            width: 48,
            height: 48,
            color: "#2164B0",
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
        >
          <ArrowForwardIcon />
        </IconButton>
      </Box>

      {/* Section Header */}
      <Typography
        variant="h4"
        sx={{
          color: "#2164B0",
          fontWeight: "bold",
          fontSize: "1.8rem",
          mb: 2,
        }}
      >
        Ver Postulantes
      </Typography>

      <Typography
        variant="h6"
        sx={{
          fontSize: "1.2rem",
          mb: 1,
          fontWeight: 500,
        }}
      >
        Puesto: {jobInfo.jobTitle}
      </Typography>

      <Typography
        variant="h6"
        sx={{
          fontSize: "1.1rem",
          mb: 4,
          fontWeight: 400,
          color: "#666",
        }}
      >
        Empresa: {jobInfo.company}
      </Typography>

      {/* Applicants Table */}
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
                Nombre
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: "1.1rem" }}>
                Fecha de postulación
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: "1.1rem" }}>
                Ver CV
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applicants.map((applicant) => (
              <TableRow key={applicant.id} sx={{ height: "80px" }}>
                <TableCell sx={{ fontSize: "1rem", borderRight: "1px solid #2164B0" }}>
                  {applicant.name}
                </TableCell>
                <TableCell sx={{ fontSize: "1rem", borderRight: "1px solid #2164B0" }}>
                  {applicant.applicationDate}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    onClick={() => handleDownloadCV(applicant.id)}
                    sx={{
                      backgroundColor: "#8AAFD9",
                      color: "#000",
                      fontWeight: 500,
                      px: 3,
                      py: 1,
                      "&:hover": {
                        backgroundColor: "#7a9fcf",
                      },
                    }}
                  >
                    Descargar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {/* Empty rows to match the design */}
            {Array.from({ length: Math.max(0, 5 - applicants.length) }).map((_, index) => (
              <TableRow key={`empty-${index}`} sx={{ height: "80px" }}>
                <TableCell sx={{ borderRight: "1px solid #2164B0" }}>&nbsp;</TableCell>
                <TableCell sx={{ borderRight: "1px solid #2164B0" }}>&nbsp;</TableCell>
                <TableCell>&nbsp;</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {applicants.length === 0 && (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="h6" sx={{ color: "#666" }}>
            No hay postulantes para esta oferta
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default AdminApplicants; 
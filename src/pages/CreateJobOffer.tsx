import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function CreateJobOffer() {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    workTime: "",
    sector: "",
  });
  const [responsibilities, setResponsibilities] = useState([""]);
  const [skills, setSkills] = useState([""]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleResponsibilityChange = (index: number, value: string) => {
    const updated = [...responsibilities];
    updated[index] = value;
    setResponsibilities(updated);
  };

  const addResponsibility = () => {
    setResponsibilities([...responsibilities, ""]);
  };

  const handleSkillChange = (index: number, value: string) => {
    const updated = [...skills];
    updated[index] = value;
    setSkills(updated);
  };

  const addSkill = () => {
    setSkills([...skills, ""]);
  };

  const handlePublish = () => {
    // TODO: Implement job offer publication
    console.log("Publishing job offer:", {
      ...formData,
      responsibilities: responsibilities.filter(r => r.trim() !== ""),
      skills: skills.filter(s => s.trim() !== ""),
    });
  };

  const handleSaveDraft = () => {
    // TODO: Implement save as draft
    console.log("Saving draft:", {
      ...formData,
      responsibilities: responsibilities.filter(r => r.trim() !== ""),
      skills: skills.filter(s => s.trim() !== ""),
    });
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
        Crear Nueva Oferta de Trabajo
      </Typography>

      {/* Form Container */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Paper
          sx={{
            backgroundColor: "#8AAFD9",
            p: 4,
            borderRadius: 3,
            width: "100%",
            maxWidth: 800,
          }}
        >
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
            {/* Left Column */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {/* Nombres */}
              <Box>
                <Typography sx={{ mb: 1, fontWeight: 500, color: "#000" }}>
                  Nombres:
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  sx={{
                    backgroundColor: "white",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#ccc",
                      },
                      "&:hover fieldset": {
                        borderColor: "#2164B0",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#2164B0",
                      },
                    },
                  }}
                />
              </Box>

              {/* Descripción */}
              <Box>
                <Typography sx={{ mb: 1, fontWeight: 500, color: "#000" }}>
                  Descripción:
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  sx={{
                    backgroundColor: "white",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#ccc",
                      },
                      "&:hover fieldset": {
                        borderColor: "#2164B0",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#2164B0",
                      },
                    },
                  }}
                />
              </Box>

              {/* Responsabilidades */}
              <Box>
                <Typography sx={{ mb: 1, fontWeight: 500, color: "#000" }}>
                  Responsabilidades:
                </Typography>
                {responsibilities.map((responsibility, index) => (
                  <TextField
                    key={index}
                    fullWidth
                    variant="outlined"
                    value={responsibility}
                    onChange={(e) => handleResponsibilityChange(index, e.target.value)}
                    sx={{
                      mb: 1,
                      backgroundColor: "white",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#ccc",
                        },
                        "&:hover fieldset": {
                          borderColor: "#2164B0",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#2164B0",
                        },
                      },
                    }}
                  />
                ))}
                <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
                  <IconButton
                    onClick={addResponsibility}
                    sx={{
                      backgroundColor: "white",
                      border: "2px solid #ccc",
                      width: 40,
                      height: 40,
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                  >
                    <AddIcon sx={{ color: "#666" }} />
                  </IconButton>
                </Box>
              </Box>
            </Box>

            {/* Right Column */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {/* Ubicación */}
              <Box>
                <Typography sx={{ mb: 1, fontWeight: 500, color: "#000" }}>
                  Ubicación:
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  sx={{
                    backgroundColor: "white",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#ccc",
                      },
                      "&:hover fieldset": {
                        borderColor: "#2164B0",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#2164B0",
                      },
                    },
                  }}
                />
              </Box>

              {/* Tiempo de jornada */}
              <Box>
                <Typography sx={{ mb: 1, fontWeight: 500, color: "#000" }}>
                  Tiempo de jornada:
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={formData.workTime}
                  onChange={(e) => handleInputChange("workTime", e.target.value)}
                  sx={{
                    backgroundColor: "white",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#ccc",
                      },
                      "&:hover fieldset": {
                        borderColor: "#2164B0",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#2164B0",
                      },
                    },
                  }}
                />
              </Box>

              {/* Sector */}
              <Box>
                <Typography sx={{ mb: 1, fontWeight: 500, color: "#000" }}>
                  Sector:
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={formData.sector}
                  onChange={(e) => handleInputChange("sector", e.target.value)}
                  sx={{
                    backgroundColor: "white",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#ccc",
                      },
                      "&:hover fieldset": {
                        borderColor: "#2164B0",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#2164B0",
                      },
                    },
                  }}
                />
              </Box>

              {/* Habilidades */}
              <Box>
                <Typography sx={{ mb: 1, fontWeight: 500, color: "#000" }}>
                  Habilidades:
                </Typography>
                {skills.map((skill, index) => (
                  <TextField
                    key={index}
                    fullWidth
                    variant="outlined"
                    value={skill}
                    onChange={(e) => handleSkillChange(index, e.target.value)}
                    sx={{
                      mb: 1,
                      backgroundColor: "white",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#ccc",
                        },
                        "&:hover fieldset": {
                          borderColor: "#2164B0",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#2164B0",
                        },
                      },
                    }}
                  />
                ))}
                <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
                  <IconButton
                    onClick={addSkill}
                    sx={{
                      backgroundColor: "white",
                      border: "2px solid #ccc",
                      width: 40,
                      height: 40,
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                  >
                    <AddIcon sx={{ color: "#666" }} />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mt: 4 }}>
        <Button
          variant="contained"
          onClick={handlePublish}
          sx={{
            backgroundColor: "#2164B0",
            color: "white",
            px: 4,
            py: 1.5,
            fontSize: "1.1rem",
            fontWeight: 500,
            "&:hover": {
              backgroundColor: "#1a5496",
            },
          }}
        >
          Publicar oferta
        </Button>
        <Button
          variant="outlined"
          onClick={handleSaveDraft}
          sx={{
            borderColor: "#2164B0",
            color: "#2164B0",
            px: 4,
            py: 1.5,
            fontSize: "1.1rem",
            fontWeight: 500,
            "&:hover": {
              borderColor: "#1a5496",
              color: "#1a5496",
              backgroundColor: "transparent",
            },
          }}
        >
          Guardar borrador
        </Button>
      </Box>
    </Box>
  );
}

export default CreateJobOffer; 
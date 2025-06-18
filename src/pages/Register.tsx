import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // TODO: Replace with real request logic
  const handleRegister = () => {
    // Placeholder for registration request
    console.log("register", { firstName, lastName, email, password, confirmPassword });
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        px: 4,
        py: 4,
      }}
    >
      {/* Logo - Top Left */}
      <Box sx={{ alignSelf: "flex-start", mb: 6 }}>
        <img
          src="/aesi-logo.svg"
          alt="AESI logo"
          style={{ height: 120, width: "auto" }}
        />
      </Box>

      {/* Content Container - Centered */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: "bold", 
            mb: 2,
            fontSize: "2.5rem",
            textAlign: "center"
          }}
        >
          Crear cuenta
        </Typography>
        <Typography 
          variant="h5" 
          sx={{ 
            mb: 6, 
            textAlign: "center",
            fontSize: "1.5rem",
            fontWeight: 400
          }}
        >
          Únete a nuestra comunidad
        </Typography>

        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
          sx={{ 
            width: "100%", 
            maxWidth: 500, 
            display: "flex", 
            flexDirection: "column", 
            gap: 4 
          }}
        >
          <TextField
            label="Nombres:"
            variant="outlined"
            fullWidth
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Escriba su nombre"
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#2164B0",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#2164B0",
              },
            }}
          />

          <TextField
            label="Apellidos:"
            variant="outlined"
            fullWidth
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Escriba su apellido"
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#2164B0",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#2164B0",
              },
            }}
          />

          <TextField
            label="Correo electrónico:"
            type="email"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail.com"
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#2164B0",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#2164B0",
              },
            }}
          />

          <TextField
            label="Contraseña:"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#2164B0",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#2164B0",
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    <img
                      src={showPassword ? "/assets/Login/eye-open.svg" : "/assets/Login/eye-closed.svg"}
                      alt={showPassword ? "Mostrar contraseña" : "Ocultar contraseña"}
                      style={{ width: 24, height: 24 }}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Confirmar contraseña:"
            type={showConfirmPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#2164B0",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#2164B0",
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
                    <img
                      src={showConfirmPassword ? "/assets/Login/eye-open.svg" : "/assets/Login/eye-closed.svg"}
                      alt={showConfirmPassword ? "Mostrar contraseña" : "Ocultar contraseña"}
                      style={{ width: 24, height: 24 }}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button 
              type="submit" 
              variant="contained" 
              sx={{ 
                py: 2,
                px: 6,
                backgroundColor: "#2164B0",
                fontSize: "1.1rem",
                fontWeight: 500,
                minWidth: "200px",
                maxWidth: "300px",
                "&:hover": {
                  backgroundColor: "#1a5496",
                },
              }}
            >
              Crear cuenta
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Register; 
import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // TODO: Replace with real request logic
  const handleLogin = () => {
    // Placeholder for authentication request
    console.log("login", { email, password });
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

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
          Inicio de Sesión
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
          Te damos la bienvenida a AESI
        </Typography>

        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
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
            label="Correo electrónico"
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
            label="Contraseña"
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

          <Link
            component={RouterLink}
            to="/forgot-password" // Placeholder route
            underline="hover"
            sx={{ 
              alignSelf: "flex-end", 
              fontSize: 16,
              color: "#2164B0",
              "&:hover": {
                color: "#1a5496",
              },
            }}
          >
            ¿Olvidaste tu contraseña?
          </Link>

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
              Iniciar sesión
            </Button>
          </Box>
        </Box>

        <Link
          component={RouterLink}
          to="/registro"
          underline="hover"
          sx={{ 
            mt: 6, 
            fontWeight: 600, 
            fontSize: 20, 
            color: "#2164B0",
            "&:hover": {
              color: "#1a5496",
            },
          }}
        >
          Crea tu cuenta
        </Link>
      </Box>
    </Box>
  );
}

export default Login; 
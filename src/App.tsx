import { Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Home from "./pages/Home/Home";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#ffffff",
          boxShadow: "none",
          padding: "10px 20px",
          display: "flex",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Izquierda: Logo AESI */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={`/assets/Home/Aesi logo.png`}
              alt="AESI"
              style={{
                height: "40px",
                width: "auto",
                maxWidth: "120px",
                objectFit: "contain",
              }}
            />
          </Box>

          {/* Centro: iconos1 + texto + iconos2 */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <img
              src={`/assets/Home/iconos1.png`}
              alt="Iconos izquierda"
              style={{
                height: "50px",
                width: "auto",
                maxWidth: "100px",
                objectFit: "contain",
                marginRight: "18px",
              }}
            />
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: "#000",
                textAlign: "center",
              }}
            >
              Bolsa de empleo inclusivo
            </Typography>
            <img
              src={`/assets/Home/iconos2.png`}
              alt="Iconos derecha"
              style={{
                height: "50px",
                width: "auto",
                maxWidth: "100px",
                objectFit: "contain",
                marginLeft: "18px",
              }}
            />
          </Box>

          {/* Derecha: Botones */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button
              color="inherit"
              component={Link}
              to="/login"
              sx={{
                backgroundColor: "#fff",
                color: "#000000",
                "&:hover": {
                  backgroundColor: "#fff",
                },
              }}
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/registro"
              sx={{
                backgroundColor: "#c62828",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#b71c1c",
                },
              }}
              variant="contained"
            >
              Regístrate
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ mt: 2 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
        </Routes>
      </Box>
      <Footer />
    </>
  );
}

function Login() {
  return (
    <Box>
      <Typography variant="h4">Iniciar sesión</Typography>
    </Box>
  );
}

function Registro() {
  return (
    <Box>
      <Typography variant="h4">Registro</Typography>
    </Box>
  );
}

export default App;

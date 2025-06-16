import { Routes, Route, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import ApplicantInfo from './pages/ApplicantInfo/applicantInfo';
import MyApplications from "./pages/MyApplications/myApplications";

function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Bolsa de Empleo
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Inicio
          </Button>
          <Button color="inherit" component={Link} to="/about">
            Sobre Nosotros
          </Button>
          <Button color="inherit" component={Link} to="/jobs">
            Empleos
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/mi_perfil" element={<ApplicantInfo />}/>
          <Route path="/mis_aplicaciones" element={<MyApplications />}/>
        </Routes>
      </Container>
    </>
  );
}

// Vistas simples
function Home() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Inicio
      </Typography>
      <Typography>Bienvenido a la plataforma de empleos.</Typography>
    </Box>
  );
}

function About() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Sobre Nosotros
      </Typography>
      <Typography>
        Somos una plataforma que conecta talento con oportunidades.
      </Typography>
    </Box>
  );
}

function Jobs() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Empleos Disponibles
      </Typography>
      <Typography>Explora las últimas ofertas laborales publicadas.</Typography>
    </Box>
  );
}

export default App;

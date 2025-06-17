import { AppBar, Toolbar, Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import UserMenu from '../../components/layout/UserMenu';
export default function Logged() {
  return (
    <div className="w-full bg-white justify-center">
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
            <UserMenu />
          </Box>
        </Toolbar>
      </AppBar>

      
    </div>
  );
}

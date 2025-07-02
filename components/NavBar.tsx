'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem, IconButton
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useUser } from '../interfaces/UserContext';
import api from '../utils/axiosInstance';

export default function NavBar() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, loading, setUser } = useUser();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await api.post('/logout');
      localStorage.removeItem('access_token');
      setUser(null);
      handleClose();
      router.push('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#ffffff", boxShadow: "none", padding: "10px 20px" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Link href="/" passHref>
          <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
            <img src="/assets/Home/Aesi logo.png" alt="AESI" style={{ height: "40px", width: "auto" }} />
          </Box>
        </Link>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <img src="/assets/Home/iconos1.png" alt="Iconos izquierda" style={{ height: "50px", marginRight: "18px" }} />
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "#000" }}>
            Bolsa de empleo inclusivo
          </Typography>
          <img src="/assets/Home/iconos2.png" alt="Iconos derecha" style={{ height: "50px", marginLeft: "18px" }} />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          {loading ? null : !user ? (
            <Link href="/login" passHref>
              <Button sx={{ backgroundColor: "#c62828", color: "#fff" }}>
                Iniciar Sesión
              </Button>
            </Link>
          ) : (
            <>
              <IconButton onClick={handleMenu} sx={{ color: "#000" }}>
                <AccountCircle />
                <Typography sx={{ ml: 1 }}>
                  {user?.first_name} {user?.last_name}
                </Typography>
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                {user?.role === 'applicant' && [
                  <MenuItem key="cv" onClick={handleClose}>
                    <Link href="/dashboard">Mi CV</Link>
                  </MenuItem>,
                  <MenuItem key="postulaciones" onClick={handleClose}>
                    <Link href="/dashboard">Mis Postulaciones</Link>
                  </MenuItem>
                ]}
                {user?.role === 'admin' && [
                  <MenuItem key="admin-dashboard" onClick={handleClose}>
                    <Link href="/admin-dashboard">Dashboard</Link>
                  </MenuItem>
                ]}
                <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

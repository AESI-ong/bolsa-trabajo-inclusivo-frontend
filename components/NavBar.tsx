"use client";

import { Menu, MenuItem } from "@mui/material";

import AccountCircle from "@mui/icons-material/AccountCircle";
import CustomSnackbar from "./CustomSnackbar";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import api from "../utils/axiosInstance";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUser } from "../interfaces/UserContext";

export default function NavBar() {
  const router = useRouter();
  const { user, loading, setUser } = useUser();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await api.post("/logout/");
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      setUser(null);
      handleClose();
      setSnackbar({
        open: true,
        message: "Sesión cerrada correctamente.",
        severity: "success",
      });
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.push("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <nav className="bg-white shadow-sm px-4 sm:px-6 lg:px-10 py-3 max-w-7xl mx-auto">
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity as "success" | "error" | "warning" | "info"}
        onClose={handleSnackbarClose}
      />
      <div className="flex flex-wrap justify-between items-center gap-y-3">
        {/* Logo */}
        <Link href="/" passHref>
          <div className="flex items-center cursor-pointer">
            <img
              src="/assets/Home/Aesi logo.png"
              alt="AESI"
              className="h-10 w-auto"
            />
          </div>
        </Link>

        {/* Título central (solo visible en sm+) */}
        <div className="hidden sm:flex items-center justify-center grow gap-2 text-center">
          <img
            src="/assets/Home/iconos1.png"
            alt="Iconos izquierda"
            className="h-8"
          />
          <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-black">
            Bolsa de empleo inclusivo
          </h1>
          <img
            src="/assets/Home/iconos2.png"
            alt="Iconos derecha"
            className="h-8"
          />
        </div>

        {/* Botón de login o usuario */}
        <div className="flex items-center gap-2">
          {loading ? null : !user ? (
            <Link href="/login" passHref>
              <button className="bg-[#CD2027] text-white text-sm sm:text-base px-3 py-2 sm:px-4 sm:py-2 rounded">
                Iniciar Sesión
              </button>
            </Link>
          ) : (
            <>
              <IconButton onClick={handleMenu} className="text-black">
                <AccountCircle />
                <span className="hidden sm:inline ml-1 text-sm sm:text-base">
                  {user.first_name} {user.last_name}
                </span>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {user.role === "applicant" && (
                  <>
                    <MenuItem onClick={handleClose}>
                      <Link href="/dashboard">Mi CV</Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Link href="/dashboard">Mis Postulaciones</Link>
                    </MenuItem>
                  </>
                )}
                {user.role === "admin" && (
                  <MenuItem onClick={handleClose}>
                    <Link href="/admin-dashboard">Dashboard</Link>
                  </MenuItem>
                )}
                <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
              </Menu>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

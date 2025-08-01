"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../../utils/axiosInstance";
import CustomSnackbar from "../../../components/CustomSnackbar";
import { useUser } from "../../../interfaces/UserContext";
import {withRoleProtection} from "../../../utils/withRoleProtection";

const AccountSettings: React.FC = () => {
  const router = useRouter();
  const { user } = useUser();

  const [formData, setFormData] = useState({
    email: "",
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  useEffect(() => {
    if (user?.email) {
      setFormData((prev) => ({ ...prev, email: user.email }));
    }
  }, [user]);

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { email, current_password, new_password, confirm_password } = formData;

    const payload: any = { email };

    const anyPasswordFieldFilled = current_password || new_password || confirm_password;

    if (anyPasswordFieldFilled) {
      const allFilled = current_password && new_password && confirm_password;

      if (!allFilled) {
        setSnackbar({
          open: true,
          message: "Si deseas cambiar tu contraseña, completa los 3 campos.",
          severity: "error",
        });
        return;
      }

      payload.current_password = current_password;
      payload.new_password = new_password;
      payload.confirm_password = confirm_password;
    }

    try {
      await api.patch("/applicants/me/", payload);

      setSnackbar({
        open: true,
        message: "Datos de cuenta actualizados. Por seguridad, vuelve a iniciar sesión.",
        severity: "success",
      });

      setTimeout(() => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      setSnackbar({
        open: true,
        message: err.response?.data?.detail || "Error al actualizar los datos.",
        severity: "error",
      });
    }
  };

  return (
    <div className="px-2 py-6 sm:px-4 md:px-8 lg:px-0 w-full max-w-2xl mx-auto">
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity as any}
        onClose={handleSnackbarClose}
      />

      <div className="bg-white border-2 border-[#2C6CB6] rounded-lg shadow-md w-full p-4 sm:p-6 flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Configuración de cuenta</h2>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Nuevo correo electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="border-2 border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Contraseña actual</label>
          <input
            type="password"
            name="current_password"
            value={formData.current_password}
            onChange={handleInputChange}
            className="border-2 border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Nueva contraseña</label>
          <input
            type="password"
            name="new_password"
            value={formData.new_password}
            onChange={handleInputChange}
            className="border-2 border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Confirmar nueva contraseña</label>
          <input
            type="password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleInputChange}
            className="border-2 border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-[#3862af] text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
};

const ProtectedAccountSettings = withRoleProtection(AccountSettings, ["applicant"]);
export default ProtectedAccountSettings;

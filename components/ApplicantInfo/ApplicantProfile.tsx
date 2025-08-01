"use client";

import React, { useRef, useState } from "react";

import CustomSnackbar from "../../components/CustomSnackbar";
import api from "../../utils/axiosInstance";
import { useUser } from "../../interfaces/UserContext";
import { useRouter } from "next/navigation";

const ApplicantInfo: React.FC = () => {
  const router = useRouter();
  const { user, setUser } = useUser();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
  first_name: user?.first_name || "",
  last_name: user?.last_name || "",
  phone_number: user?.applicant_profile?.phone_number || "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  if (!user) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData({
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      phone_number: user.applicant_profile?.phone_number || ""
    });
  };

  const handleSaveChanges = async () => {
    try {
      const payload: {
        first_name: string;
        last_name: string;
        phone_number: string;
      } = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone_number: formData.phone_number,
      };

      await api.patch("/applicants/me/", payload);

      const applicantRes = await api.get("/applicants/me/");
      setUser({
        ...user,
        first_name: formData.first_name,
        last_name: formData.last_name,
        applicant_profile: applicantRes.data,
      });
      setSnackbar({
        open: true,
        message: "Perfil actualizado exitosamente.",
        severity: "success",
      });
      setIsEditing(false);
    } catch (err) {
      console.error("Error al actualizar el perfil:", err);
      // mensaje de error en snackbar por error code 400
      if (err.response && err.response.status === 400) {
        setSnackbar({
          open: true,
          message:
            "Error al actualizar el perfil. Verifica los datos ingresados.",
          severity: "error",
        });
      } else {
        setSnackbar({
          open: true,
          message: "Error al actualizar el perfil.",
          severity: "error",
        });
      }
    }
  };

  const MAX_SIZE_MB = 5;
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type !== "application/pdf") {
        setSnackbar({
          open: true,
          message: "Solo se aceptan archivos PDF.",
          severity: "warning",
        });
        setSelectedFile(null);
        return;
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        setSnackbar({
          open: true,
          message: `El archivo supera el máximo permitido de ${MAX_SIZE_MB}MB.`,
          severity: "warning",
        });
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
    }
  };

  // Drag & Drop handlers
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type !== "application/pdf") {
        setSnackbar({
          open: true,
          message: "Solo se aceptan archivos PDF.",
          severity: "warning",
        });
        setSelectedFile(null);
        return;
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        setSnackbar({
          open: true,
          message: `El archivo supera el máximo permitido de ${MAX_SIZE_MB}MB.`,
          severity: "warning",
        });
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleClickUpload = () => {
    inputRef.current?.click();
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setSnackbar({
        open: true,
        message: "Por favor, selecciona un archivo válido para subir.",
        severity: "warning",
      });
      return;
    }

    const formData = new FormData();
    formData.append("cv_file", selectedFile);

    try {
      await api.post(`/applicants/me/cv/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const applicantRes = await api.get("/applicants/me/");

      if (user) {
        setUser({
          ...user,
          applicant_profile: applicantRes.data,
        });
      }

      setSnackbar({
        open: true,
        message: "CV subido con éxito.",
        severity: "success",
      });
      setSelectedFile(null); // Limpiar el archivo seleccionado después de subir
    } catch (error) {
      console.error("Error al subir el CV:", error);
      setSnackbar({
        open: true,
        message: "Error al subir el CV.",
        severity: "error",
      });
    }
  };

  const handleDownloadCV = async () => {
    try {
      const filename = user.applicant_profile.cv_url?.split("/").pop(); // Extrae solo el nombre del archivo
      const res = await api.get(`/applicants/cv/download/${filename}/`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", user.applicant_profile.cv_url);
      document.body.appendChild(link);
      link.click();
      link.remove();
      setSnackbar({
        open: true,
        message: "Descarga del CV iniciada.",
        severity: "success",
      });
    } catch (error) {
      console.error("Error al descargar el CV:", error);
      // Type guard para error de Axios
      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as { response?: unknown }).response === "object"
      ) {
        const response = (error as { response?: { data?: unknown } }).response;
        console.error("Error details:", response?.data ?? error);
      } else {
        console.error("Error details:", error);
      }
      setSnackbar({
        open: true,
        message: "Error al descargar el CV.",
        severity: "error",
      });
    }
  };

  return (
    <div className="px-2 py-6 sm:px-4 md:px-8 lg:px-0 w-full max-w-2xl mx-auto">
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity as "success" | "error" | "warning" | "info"}
        onClose={handleSnackbarClose}
      />
      <div className="bg-white border-2 border-[#2C6CB6] rounded-lg shadow-md w-full p-4 sm:p-6 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-2 mb-2">
          <img
            src={"/assets/applicantInfo/user_blue.svg"}
            alt="usuario"
            className="w-20 h-20"
          />
          <h2 className="text-2xl font-bold mt-2 sm:mt-0">
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  className="border-2 border-gray-300 rounded px-2 py-1 mb-2 sm:mb-2 ml-2"
                />
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  className="border-2 border-gray-300 rounded px-2 py-1 sm:ml-2"
                />
              </>
            ) : (
              `${user.first_name} ${user.last_name}`
            )}
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
          <div className="text-gray-700 flex items-center w-full sm:w-auto">
            {isEditing ? (
              <img
              />
            ) : (
              <img
              src={"/assets/applicantInfo/mail.svg"}
              width={20}
              height={20}
              className="mr-2"
              alt="Email Icon"
              />
            )}
            {isEditing ? (
              <div
              />
            ) : (
              user?.email
            )}
          </div>
          <p className="text-gray-700 flex items-center w-full sm:w-auto">
            {isEditing?(
              <img
                src={"/assets/applicantInfo/phone.svg"}
                width={20}
                height={20}
                className="mr-2"
                alt="Phone Icon"
              />
            ) : (
              <img
                src={"/assets/applicantInfo/phone.svg"}
                width={20}
                height={20}
                className="ml-10 mr-2"
                alt="Phone Icon"
              />
            )}
            {isEditing ? (
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                className="border-2 border-gray-300 rounded px-2 py-1 w-full"
              />
            ) : (
              user.applicant_profile?.phone_number
            )}
          </p>
          <div className="w-full sm:w-auto sm:ml-auto mt-2 sm:mt-0">
            {!isEditing ? (
              <button
                className="bg-[#3862af] text-white w-full sm:w-32 py-2 rounded hover:bg-blue-700 transition"
                onClick={handleEditClick}
              >
                Editar
              </button>
            ) : (
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={handleSaveChanges}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full sm:w-auto"
                >
                  Guardar
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition w-full sm:w-auto"
                >
                  Cancelar
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-1">¿Deseas cambiar tu correo o contraseña?</p>
          <button
            onClick={() => router.replace("/dashboard/account-settings")}
            className="text-sm text-blue-600 underline hover:text-blue-800 transition"
          >
            Ir a configuración de cuenta
          </button>
        </div>
        
        <div className="border-b-2 border-[#2C6CB6] mb-4"></div>

        <h2 className="text-2xl font-bold mb-4">No olvides tu CV</h2>

        {user?.applicant_profile?.cv_url && (
          <div className="flex justify-center mb-4">
            <button
              onClick={handleDownloadCV}
              className="bg-[#2164B0] text-white px-4 py-2 rounded hover:bg-[#1a4f8c] transition"
            >
              Descargar CV
            </button>
          </div>
        )}

        {/* Drop & Upload area for CV */}
        <div
          className={`w-full max-w-md mx-auto my-6 p-6 border-2 rounded-xl flex flex-col items-center justify-center transition-colors duration-200 cursor-pointer ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"}`}
          onClick={handleClickUpload}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          style={{ minHeight: 120 }}
        >
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="flex flex-col items-center">
            <span className="text-lg font-semibold mb-2 text-[#2164B0]">Sube tu CV (PDF, máx. 5MB)</span>
            <span className="text-sm text-gray-500 mb-2">Arrastra y suelta aquí o haz clic para seleccionar</span>
            {selectedFile ? (
              <span className="text-green-700 font-medium mt-2">{selectedFile.name} ({(selectedFile.size/1024/1024).toFixed(2)} MB)</span>
            ) : (
              <span className="text-gray-400 mt-2">Ningún archivo seleccionado</span>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleUpload}
            className="bg-[#3862af] text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Subir CV
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicantInfo;

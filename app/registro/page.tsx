"use client";

import Button from '@mui/material/Button';
import CustomSnackbar from '../../components/CustomSnackbar';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import api from '../../utils/axiosInstance';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    phone_number: ''
  });
  const [errors, setErrors] = useState({ first_name: '', last_name: '', email: '', password: '', confirm_password: '', phone_number: '' });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  });
  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Reset error for the field being edited
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newErrors = {
      first_name: formData.first_name.trim() === '' ? 'Este campo es obligatorio' : '',
      last_name: formData.last_name.trim() === '' ? 'Este campo es obligatorio' : '',
      email: formData.email.trim() === '' ? 'Este campo es obligatorio' : '',
      password: formData.password.trim() === '' ? 'Este campo es obligatorio' : '',
      confirm_password: formData.confirm_password.trim() === '' ? 'Este campo es obligatorio' : '',
      phone_number: formData.phone_number.trim() === '' || isNaN(Number(formData.phone_number.trim())) ? 'Este campo es obligatorio' : ''
    };

    setErrors(newErrors);
  
    if (Object.values(newErrors).some((error) => error !== '')) return;


    if (formData.password !== formData.confirm_password) {
      setSnackbar({
        open: true,
        message: 'Las contraseñas no coinciden',
        severity: 'error',
      });
      return;
    }

    try {
      await api.post('/users/register-applicant', formData);
      setSnackbar({
        open: true,
        message: 'Registro exitoso. Por favor, inicia sesión.',
        severity: 'success',
      });
      router.push('/login');
    } catch (error) {
      console.error('Error al registrar:', error);
      setSnackbar({
        open: true,
        message: 'Error al registrar. Por favor, inténtalo de nuevo.',
        severity: 'error',
      });
  }
  };

  return (
    <section className="w-full bg-white flex flex-col items-center justify-center px-2 sm:px-6 md:px-10 lg:px-32 xl:px-72 pt-6 pb-10 min-h-[100vh]">
      <div className="w-full max-w-xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-center">
          Crear Cuenta
        </h2>
        <p className="text-lg sm:text-2xl text-center mb-4">Únete a nuestra comunidad</p>

        <CustomSnackbar
          open={snackbar.open}
          onClose={handleSnackbarClose}
          message={snackbar.message}
          severity={snackbar.severity as 'success' | 'error' | 'warning' | 'info'}
        />

        <form className="bg-white rounded-xl shadow-lg p-4 sm:p-8 md:p-10" onSubmit={handleSubmit}>
          <div className="mb-4">
            <p className="text-base sm:text-lg font-bold">Nombres:</p>
            <TextField
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              margin="normal"
              placeholder="Escriba su nombre"
              error={!!errors.first_name}
              helperText={errors.first_name}
              sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#2164B0' } } }}
            />
          </div>
          <div className="mb-4">
            <p className="text-base sm:text-lg font-bold">Apellidos:</p>
            <TextField
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              margin="normal"
              placeholder="Escriba su apellido"
              error={!!errors.last_name}
              helperText={errors.last_name}
              sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#2164B0' } } }}
            />
          </div>
          <div className="mb-4">
            <p className="text-base sm:text-lg font-bold">Correo electrónico:</p>
            <TextField
              name="email"
              value={formData.email}
              type="email"
              onChange={handleChange}
              variant="outlined"
              fullWidth
              margin="normal"
              placeholder="example@gmail.com"
              error={!!errors.email}
              helperText={errors.email}
              sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#2164B0' } } }}
            />
          </div>
          <div className="mb-4">
            <p className="text-base sm:text-lg font-bold">Número de celular:</p>
            <TextField
              name="phone_number"
              value={formData.phone_number}
              type='number'
              onChange={handleChange}
              variant="outlined"
              fullWidth
              margin="normal"
              placeholder="987654321"
              error={!!errors.phone_number}
              helperText={errors.phone_number}
              sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#2164B0' } } }}
            />
          </div>
          <div className="mb-4">
            <p className="text-base sm:text-lg font-bold">Contraseña:</p>
            <TextField
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              fullWidth
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <img
                      src={showPassword ? '../../assets/RegisterForm/password_on.svg' : '../../assets/RegisterForm/password_off.svg'}
                      alt="Mostrar contraseña"
                      onClick={handleClickShowPassword}
                      style={{ width: '24px', height: '24px', cursor: 'pointer', marginLeft: '8px' }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#2164B0' } } }}
            />
          </div>
          <div className="mb-4">
            <p className="text-base sm:text-lg font-bold">Confirmar contraseña:</p>
            <TextField
              name="confirm_password"
              type={showPassword ? 'text' : 'password'}
              value={formData.confirm_password}
              onChange={handleChange}
              fullWidth
              error={!!errors.confirm_password}
              helperText={errors.confirm_password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <img
                      src={showPassword ? '../../assets/RegisterForm/password_on.svg' : '../../assets/RegisterForm/password_off.svg'}
                      alt="Mostrar contraseña"
                      onClick={handleClickShowPassword}
                      style={{ width: '24px', height: '24px', cursor: 'pointer', marginLeft: '8px' }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#2164B0' } } }}
            />
          </div>

          <div className="flex justify-center mt-6">
            <Button
              type="submit"
              sx={{ backgroundColor: "#3862af", color: "#fff", fontSize: '1rem', padding: '0.75rem 2.5rem', borderRadius: '0.75rem' }}
              variant="contained"
            >
              Crear Cuenta
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}


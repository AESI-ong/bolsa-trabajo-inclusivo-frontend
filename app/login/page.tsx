'use client';

import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '../../utils/axiosInstance';
import { useUser } from '../../interfaces/UserContext';

export default function Login() {
  const router = useRouter();
  const { user, loading, refreshUser } = useUser(); // ✅ usamos refreshUser

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  // Redirigir si ya está logueado
  useEffect(() => {
    if (!loading && user) {
      if (user.role === 'admin') {
        router.replace('/admin-dashboard');
      } else {
        router.replace('/');
      }
    }
  }, [user, loading]);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      email: credentials.email.trim() === '' ? 'Este campo es obligatorio' : '',
      password: credentials.password.trim() === '' ? 'Este campo es obligatorio' : '',
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== '')) return;

    try {
      setLoadingSubmit(true);
      const response = await api.post('/login', credentials);
      const { access_token, role } = response.data;

      // Guardar token
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('user', JSON.stringify({ role })); // solo para referencia rápida

      // ✅ Actualiza el usuario global desde el contexto
      await refreshUser();

      // Redireccionar según el rol
      if (role === 'admin') {
        router.push('/admin-dashboard');
      } else {
        router.push('/');
      }

    } catch (error: any) {
      console.error('Error al iniciar sesión:', error);
      if (error.response?.data?.message) {
        alert('Error al iniciar sesión: ' + error.response.data.message);
      } else {
        alert('Ocurrió un error inesperado.');
      }
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <div className="w-full bg-white justify-center px-72 pt-6 pb-10">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Inicio de sesión</h2>
      <p className="text-3xl text-center">Te damos la bienvenida a AESI</p>

      <form className="pt-20 pb-5 pr-20 pl-20" onSubmit={handleSubmit}>
        <div className="mb-4">
          <p className="text-lg font-bold">Correo electrónico:</p>
          <TextField
            name="email"
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="Escriba su correo"
            type="email"
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#2164B0' } } }}
          />
        </div>

        <div className="mb-4">
          <p className="text-lg font-bold">Contraseña:</p>
          <TextField
            name="password"
            margin="normal"
            onChange={handleChange}
            type={showPassword ? 'text' : 'password'}
            fullWidth
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <img
                    src={
                      showPassword
                        ? '../../assets/RegisterForm/password_on.svg'
                        : '../../assets/RegisterForm/password_off.svg'
                    }
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

        <button
          className="w-full bg-[#2164B0] text-white py-2 px-4 rounded-md hover:bg-[#1a4f8c] transition-colors duration-300"
          type="submit"
          disabled={loadingSubmit}
        >
          {loadingSubmit ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </button>
      </form>

      <div className="flex justify-center mt-6">
        <Link href="/registro" passHref className="font-bold hover:underline">
          Crea tu cuenta
        </Link>
      </div>
    </div>
  );
}


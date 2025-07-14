'use client';

import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useRouter } from 'next/navigation';
import api from '../../utils/axiosInstance';
import { useUser } from '../../interfaces/UserContext'; // ✅ 1. Importa el contexto


export default function Login() {
const router = useRouter();
const { refreshUser } = useUser(); // ✅ Obtenemos refreshUser del contexto

const [showPassword, setShowPassword] = useState(false);
const [errors, setErrors] = useState({ email: '', password: '' });
const [credentials, setCredentials] = useState({ email: '', password: '' });
const [loading, setLoading] = useState(false);

useEffect(() => {
  const accessToken = localStorage.getItem('access_token');
  const userData = localStorage.getItem('user');

  if (accessToken && userData) {
    const parsedUser = JSON.parse(userData);
    if (parsedUser.role == 'admin') {
      router.replace('/admin-dashboard');
    } else {
      router.replace('/');
    }
  }
}, []);

const handleClickShowPassword = () => setShowPassword((prev) => !prev);

const handleChange = (e) => {
  setCredentials({ ...credentials, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await api.post('/login', credentials);
    const { access_token, role } = res.data;

    localStorage.setItem('access_token', access_token);

    // ✅ Aquí haces la carga del usuario completo
    await refreshUser();

    // ✅ Redirección según rol
    if (role === 'admin') router.push('/admin-dashboard');
    else if (role === 'applicant') router.push('/');
  } catch (err) {
    alert('Login fallido');
  } finally {
    setLoading(false);
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
            id="password"
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

        <button
          className='w-full bg-[#2164B0] text-white py-2 px-4 rounded-md hover:bg-[#1a4f8c] transition-colors duration-300'
          type="submit"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}

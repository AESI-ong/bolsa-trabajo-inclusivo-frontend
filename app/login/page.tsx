'use client';

import { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Asegúrate de que estás importando useRouter correctamente
import Link from 'next/link';
import api from '../../utils/axiosInstance';

export default function Login() {
  const router = useRouter(); // Inicializa el router para redirección

  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      router.replace('/'); // Redirige al home o dashboard
    }
  }, []);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
  e.preventDefault();

  const newErrors = {
    email: credentials.email.trim() === '' ? 'Este campo es obligatorio' : '',
    password: credentials.password.trim() === '' ? 'Este campo es obligatorio' : ''
  };

  setErrors(newErrors);

  const hasErrors = Object.values(newErrors).some(error => error !== '');
  if (hasErrors) {
    return;
  }

  try {
    const response = await api.post('/login', credentials);
    console.log('Respuesta del servidor:', response);

    const { access_token,role } = response.data;
    localStorage.setItem('access_token', access_token);
    // Aquí podrías redirigir al usuario o mostrar su 
  
      if (role === 'admin') {
        router.push('/'); // Redirige al dashboard de admin
      } else if (role === 'applicant') {
        router.push('/'); // Redirige al dashboard de usuario
      } else {
        console.error('Rol no reconocido:', role);
      }
      console.log('Inicio de sesión exitoso');
      console.log('Token de acceso guardado:', access_token);
  } catch (error) {
    console.error('Error al iniciar sesión :', error);
    if (error.response) {
      alert('Error al iniciar sesión: ' + error.response.data.message);
    }
  }
};


  return (
    <div className="w-full bg-white justify-center px-72 pt-6 pb-10">
      {/*<img src="/aesi-logo.svg" alt="AESI Logo" className="w-28 mb-4 absolute top-10 left-10" />
      
      w-full bg-white justify-center px-72 pt-6 pb-10
      */}

      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
        Inicio de sesión
      </h2>
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

        <button className='w-full bg-[#2164B0] text-white py-2 px-4 rounded-md hover:bg-[#1a4f8c] transition-colors duration-300'
          type="submit">
          Iniciar sesión
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
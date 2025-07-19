// Tipo auxiliar para errores de Axios
'use client';
interface AxiosError {
  response?: {
    status?: number;
    data?: { message?: string };
  };
}

import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useRouter } from 'next/navigation';
import api from '../../utils/axiosInstance';
import { useUser } from '../../interfaces/UserContext'; 
import CustomSnackbar from '../../components/CustomSnackbar';
import Link from 'next/link';


export default function Login() {
const router = useRouter();
const { refreshUser } = useUser(); // ✅ Obtenemos refreshUser del contexto

const [showPassword, setShowPassword] = useState(false);
const [errors, setErrors] = useState({ email: '', password: '' });
const [credentials, setCredentials] = useState({ email: '', password: '' });

const [snackbar, setSnackbar] = useState({
  open: false,
  message: '',
  severity: 'info',
});

const handleSnackbarClose = () => {
  setSnackbar(prev => ({ ...prev, open: false }));
};

useEffect(() => {
  const accessToken = localStorage.getItem('access_token');
  const userData = localStorage.getItem('user');

  if (accessToken && userData) {
    const parsedUser = JSON.parse(userData);
    if (parsedUser.role == 'admin') {
      router.replace('/admin-dashboard');
    } else if (parsedUser.role == 'applicant') {
      router.replace('/');
    }else {
      router.replace('/login');
    }
  }
}, [router]);

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
    const res = await api.post('/login', credentials);
    const { access_token, role } = res.data;

    localStorage.setItem('access_token', access_token);

    setSnackbar({
      open: true,
      message: 'Inicio de sesión exitoso.',
      severity: 'success',
    });

    await refreshUser();

    setTimeout(() => {
      if (role === 'admin') router.push('/admin-dashboard');
      else if (role === 'applicant') router.push('/');
    }, 500); // espera breve para que se vea el mensaje
  } catch (error: unknown) {
    console.error('Error al iniciar sesión:', error);
    const err = error as AxiosError;
    if (err.response) {
      if (err.response.status === 401) {
        setSnackbar({
          open: true,
          message: 'El correo o la contraseña son incorrectos.',
          severity: 'error',
        });
      } else if (err.response.data?.message) {
        setSnackbar({
          open: true,
          message: err.response.data.message,
          severity: 'error',
        });
      } else {
        setSnackbar({
          open: true,
          message: 'Error al iniciar sesión. Por favor, inténtalo de nuevo.',
          severity: 'error',
        });
      }
    } else {
      setSnackbar({
        open: true,
        message: 'Error al iniciar sesión. Por favor, inténtalo de nuevo.',
        severity: 'error',
      });
    }
  } finally {
    // loading eliminado
  }
};

  return (
    <div className="w-full bg-white justify-center px-72 pt-8 pb-14">
      <CustomSnackbar
        open={snackbar.open}
        onClose={handleSnackbarClose}
        message={snackbar.message}
        severity={snackbar.severity as 'success' | 'error' | 'warning' | 'info'}
      />
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Inicio de sesión</h2>
      <p className="text-3xl text-center">Te damos la bienvenida a AESI</p>
      <form className="pt-20 p-20" onSubmit={handleSubmit}>
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
      <div className="flex justify-center mt-6">
        <Link href="/registro" passHref className="font-bold hover:underline">
          Crea tu cuenta
        </Link>
      </div>

    </div>
  );
}



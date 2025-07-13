"use client";

import { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import api from '../../utils/axiosInstance';

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

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (formData.password !== formData.confirm_password) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      await api.post('/users/register-applicant', formData);
      router.push('/login');
    } catch (error) {
      console.error('Error al registrar:', error);
      alert('Hubo un error al registrarse');
    }
  };

  return (
    <section className="w-full bg-white justify-center px-72 pt-6 pb-10">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
        Crear Cuenta
      </h2>
      <p className="text-3xl text-center">Únete a nuestra comunidad</p>

      <form className="p-20" onSubmit={handleSubmit}>
        <div className="mb-4">
          <p className="text-lg font-bold">Nombres:</p>
          <TextField
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="Escriba su nombre"
            sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#2164B0' } } }}
          />
        </div>
        <div className="mb-4">
          <p className="text-lg font-bold">Apellidos:</p>
          <TextField
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="Escriba su apellido"
            sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#2164B0' } } }}
          />
        </div>
        <div className="mb-4">
          <p className="text-lg font-bold">Correo electrónico:</p>
          <TextField
            name="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="example@gmail.com"
            sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#2164B0' } } }}
          />
        </div>
        <div className="mb-4">
          <p className="text-lg font-bold">Número de celular:</p>
          <TextField
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="987654321"
            sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#2164B0' } } }}
          />
        </div>
        <div className="mb-4">
          <p className="text-lg font-bold">Contraseña:</p>
          <TextField
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            fullWidth
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
          <p className="text-lg font-bold">Confirmar contraseña:</p>
          <TextField
            name="confirm_password"
            type={showPassword ? 'text' : 'password'}
            value={formData.confirm_password}
            onChange={handleChange}
            fullWidth
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
            sx={{ backgroundColor: "#3862af", color: "#fff" }}
            variant="contained"
          >
            Crear Cuenta
          </Button>
        </div>
      </form>
    </section>
  );
}


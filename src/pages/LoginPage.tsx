import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="h-screen flex flex-col items-center justify-center px-4 gap-10 pt-16 -mt-[16px]">
      <img src="/aesi-logo.svg" alt="AESI Logo" className="w-28 mb-4 absolute top-10 left-10" />

      <h2 className="text-xl font-medium text-center">Inicio de Sesión</h2>
      <h1 className="text-2xl font-bold text-center mb-6">Te damos la bienvenida a AESI</h1>

      <form className="w-full max-w-sm space-y-4">
        <div>
          <label className="block text-sm mb-1 font-medium">Correo electrónico:</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            className="w-full border border-azul-claro-aesi px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-azul-claro-aesi"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium">Contraseña:</label>
            <a href="#" className="text-sm text-azul-aesi hover:underline">¿Olvidaste tu contraseña?</a>
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full border border-azul-claro-aesi px-4 py-2 rounded-md pr-10 outline-none focus:ring-2 focus:ring-azul-claro-aesi"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-2.5 right-2 text-azul-aesi"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-azul-aesi hover:bg-azul-oscuro-aesi text-white font-bold py-2 rounded-md mt-16"
        >
          Iniciar sesión
        </button>
      </form>

      <a href="#" className="mt-6 text-azul-aesi font-bold hover:underline">Crea tu cuenta</a>
    </div>
  );
}
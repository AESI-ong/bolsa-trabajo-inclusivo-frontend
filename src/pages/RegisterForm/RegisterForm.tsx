import { useState } from 'react'; 
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import PasswordVisibilityOn from '../../assets/RegisterForm/password_on.svg';
import PasswordVisibilityOff from '../../assets/RegisterForm/password_off.svg';


export default function RegisterForm() {
   const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };


  return (
    <section className="w-full bg-white justify-center px-72 pt-6 pb-10">
    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
        Crear Cuenta
    </h2>
    <p className='text-3xl text-center'>Únete a nuestra comunidad</p>  
    <form className='p-20' 
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());
        console.log(formJson);
      }}
    >
        <div className="mb-4">
          <p className='text-lg font-bold'>Nombres:</p> 
          <TextField
            name="nombres"
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder='Escriba su nombre'
            sx={{
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: '#2164B0',
                    },
                },
            }}
          />
        </div>
        <div className="mb-4">
          <p className='text-lg font-bold'>Apellidos:</p> 
          <TextField
            name="apellidos"
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder='Escriba su apellido'
             sx={{
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: '#2164B0',
                    },
                },
            }}
          />
        </div>
        <div className="mb-4">
          <p className='text-lg font-bold'>Correo electrónico:</p> 
          <TextField
            name="email"
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder='example@gmail.com'
            sx={{
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: '#2164B0',
                    },
                },
            }}
          />
        </div>
        
        <div className="mb-4">
          <p className='text-lg font-bold'>Contraseña:</p> 
          <TextField
            id="password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <img
                    src={showPassword ? PasswordVisibilityOn : PasswordVisibilityOff}
                    alt="Toggle Password Visibility"
                    onClick={handleClickShowPassword}
                    style={{
                      width: '24px',
                      height: '24px',
                      cursor: 'pointer',
                      marginLeft: '8px',
                    }}
                  />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#2164B0', // Set the border color to blue
                },
              },
            }}
          />

        </div>

        <div className="mb-4">
          <p className='text-lg font-bold'>Confirmar contraseña:</p> 
          <TextField
            id="confirm-password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <img
                    src={showPassword ? PasswordVisibilityOn : PasswordVisibilityOff}
                    onClick={handleClickShowPassword}
                    style={{
                      width: '24px',
                      height: '24px',
                      cursor: 'pointer',
                      marginLeft: '8px',
                    }}
                  />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#2164B0',
                },
              },
            }}
          />
        </div>
     
    </form>
     <div className="flex justify-center">
          <button className="bg-[#3862af] text-white w-32 py-2 rounded hover:bg-blue-700 transition">
            Crear Cuenta
          </button>
      </div>
    </section>
  );
}
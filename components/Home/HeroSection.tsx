'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; 

const HeroSection = () => {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [sector, setCategory] = useState('');

  const handleSearch = () => {
    const query = new URLSearchParams();

    if (title) query.append('title', title);
    if (location) query.append('location', location);
    if (sector) query.append('sector', sector);

    router.push(`/?${query.toString()}`);
  };

  return (
    <section
      className="bg-cover bg-center text-white text-center py-40 px-4"
      style={{ backgroundImage: "url('/assets/Home/Foto.png')" }}
    >
      <h1 className="text-3xl md:text-5xl font-bold mb-4">
        ¡Encuentra el trabajo de tus sueños hoy!
      </h1>
      <p className="text-2xl md:text-3xl mb-8">
        Conectando el talento con la oportunidad: su puerta de entrada al éxito profesional
      </p>

      <div className="flex justify-center">
        <div className="flex bg-white rounded overflow-hidden">
          <input
            type="text"
            placeholder="Puesto laboral"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="py-8 px-6 text-black w-44 md:w-56 focus:outline-none rounded-l-md text-center"
          />
          <div className="w-[2px] h-[60%] my-auto bg-[#3862af]"></div>

          <div className="relative w-50 md:w-56">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="py-8 px-3 pr-10 text-black bg-white w-full focus:outline-none appearance-none text-center rounded-none"
            >
              <option value="">Seleccionar ubicación</option>
              <option value="Ancón">Ancón</option>
              <option value="Ate">Ate</option>
              <option value="Barranco">Barranco</option>
              <option value="Breña">Breña</option>
              <option value="Carabayllo">Carabayllo</option>
              <option value="Cercado de Lima">Cercado de Lima</option>
              <option value="Chaclacayo">Chaclacayo</option>
              <option value="Chorrillos">Chorrillos</option>
              <option value="Cieneguilla">Cieneguilla</option>
              <option value="Comas">Comas</option>
              <option value="El Agustino">El Agustino</option>
              <option value="Independencia">Independencia</option>
              <option value="Jesús María">Jesús María</option>
              <option value="La Molina">La Molina</option>
              <option value="La Victoria">La Victoria</option>
              <option value="Lince">Lince</option>
              <option value="Los Olivos">Los Olivos</option>
              <option value="Lurigancho">Lurigancho</option>
              <option value="Lurín">Lurín</option>
              <option value="Magdalena del Mar">Magdalena del Mar</option>
              <option value="Miraflores">Miraflores</option>
              <option value="Pachacámac">Pachacámac</option>
              <option value="Pucusana">Pucusana</option>
              <option value="Pueblo Libre">Pueblo Libre</option>
              <option value="Puente Piedra">Puente Piedra</option>
              <option value="Punta Hermosa">Punta Hermosa</option>
              <option value="Punta Negra">Punta Negra</option>
              <option value="Rímac">Rímac</option>
              <option value="San Bartolo">San Bartolo</option>
              <option value="San Borja">San Borja</option>
              <option value="San Isidro">San Isidro</option>
              <option value="San Juan de Lurigancho">San Juan de Lurigancho</option>
              <option value="San Juan de Miraflores">San Juan de Miraflores</option>
              <option value="San Luis">San Luis</option>
              <option value="San Martín de Porres">San Martín de Porres</option>
              <option value="San Miguel">San Miguel</option>
              <option value="Santa Anita">Santa Anita</option>
              <option value="Santa María del Mar">Santa María del Mar</option>
              <option value="Santa Rosa">Santa Rosa</option>
              <option value="Santiago de Surco">Santiago de Surco</option>
              <option value="Surquillo">Surquillo</option>
              <option value="Villa El Salvador">Villa El Salvador</option>
              <option value="Villa María del Triunfo">Villa María del Triunfo</option>
              <option value="Callao">Callao</option>
            </select>
            <img
              src="/assets/Home/dropdown.png"
              alt="Dropdown"
              className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
            />
          </div>

          <div className="w-[2px] h-[60%] my-auto bg-[#3862af]"></div>

          <div className="relative w-50 md:w-56">
            <select
              value={sector}
              onChange={(e) => setCategory(e.target.value)}
              className="py-8 px-3 pr-10 text-black bg-white w-full focus:outline-none appearance-none text-center rounded-none"
            >
              <option value="">Seleccionar categoría</option>
              <option value="Agricultura">Agricultura</option>
              <option value="Comercio">Comercio</option>
              <option value="Construcción">Construcción</option>
              <option value="Hotelería y Turismo">Hotelería y Turismo</option>
              <option value="Educación">Educación</option>
              <option value="Servicios financieros">Servicios financieros</option>
              <option value="Transporte">Transporte</option>
              <option value="Ventas">Ventas</option>
            </select>
            <img
              src="/assets/Home/dropdown.png"
              alt="Dropdown"
              className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
            />
          </div>

          <button
            onClick={handleSearch}
            className="flex items-center gap-2 px-4 py-2 bg-[#3862af] text-white rounded-r-md hover:bg-blue-700 transition"
          >
            <img src="/assets/Home/lupa.png" alt="Buscar" className="w-4 h-4" />
            Buscar trabajo
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;



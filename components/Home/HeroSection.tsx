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
              className="py-8 px-6 pr-10 text-black bg-white w-full focus:outline-none appearance-none text-center rounded-none"
            >
              <option value="">Seleccionar ubicación</option>
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
              className="py-8 px-6 pr-10 text-black bg-white w-full focus:outline-none appearance-none text-center rounded-none"
            >
              <option value="">Seleccionar categoría</option>
              <option value="Retail">Comercio</option>
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



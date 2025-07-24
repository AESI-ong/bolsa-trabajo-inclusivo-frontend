"use client";

import { Briefcase, ChartBarStacked, MapPinned } from "lucide-react";

import categories from "../../assets/data/categories.json";
import locations from "../../assets/data/locations.json";
import { useRouter } from "next/navigation";
import { useState } from "react";

const HeroSection = () => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [sector, setCategory] = useState("");

  const handleSearch = () => {
    const query = new URLSearchParams();

    if (title) query.append("title", title);
    if (location) query.append("location", location);
    if (sector) query.append("sector", sector);

    router.push(`/?${query.toString()}`);
  };

  return (
    <section
      className="bg-[#101626] bg-cover bg-center text-white text-center min-h-[60vh] flex flex-col justify-center items-center px-4 py-16 md:py-32"
      style={{ backgroundImage: "url('/assets/Home/Foto.png')" }}
    >
      <h1 className="text-3xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
        ¡Encuentra el trabajo de tus sueños hoy!
      </h1>
      <p className="text-lg md:text-2xl mb-10 text-gray-200 max-w-2xl mx-auto">
        Conectando el talento con la oportunidad: tu puerta de entrada al éxito
        profesional
      </p>

      <form
        className="w-full  max-w-5xl mx-auto bg-white/95 rounded-xl shadow-lg flex flex-col md:flex-row items-stretch gap-3 md:gap-0 px-6 py-6 md:px-5 md:py-5"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <div className="flex items-center bg-white rounded-xl border border-gray-200 flex-1 min-w-0">
          <Briefcase className="w-5 h-5 ml-3 text-[#2c6db6]" />
          <input
            type="text"
            placeholder="Puesto laboral"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="py-3 px-3 text-black w-full bg-transparent focus:outline-none rounded-xl text-base"
          />
        </div>
        <div className="flex items-center bg-white rounded-xl border border-gray-200 flex-1 min-w-0 md:ml-3">
          <MapPinned className="w-5 h-5 ml-3 text-[#2c6db6]" />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="py-3 px-3 pr-8 text-black bg-transparent w-full focus:outline-none rounded-xl text-base appearance-none"
          >
            <option value="">Seleccionar ubicación</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center bg-white rounded-xl border border-gray-200 flex-1 min-w-0 md:ml-3">
          <ChartBarStacked className="w-5 h-5 ml-3 text-[#2c6db6]" />
          <select
            value={sector}
            onChange={(e) => setCategory(e.target.value)}
            className="py-3 px-3 pr-8 text-black bg-transparent w-full focus:outline-none rounded-xl text-base appearance-none"
          >
            <option value="">Seleccionar categoría</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="flex items-center justify-center gap-2 px-6 py-2 bg-[#2c6db6] text-white font-semibold rounded-xl hover:bg-[#1e4f8c] transition text-sm md:ml-3 whitespace-nowrap"
        >
          <img src="/assets/Home/lupa.png" alt="Buscar" className="w-5 h-5" />
          Buscar trabajo
        </button>
      </form>
    </section>
  );
};

export default HeroSection;

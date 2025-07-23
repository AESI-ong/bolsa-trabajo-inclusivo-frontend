import { Instagram, LinkedIn, YouTube, MusicNote } from "@mui/icons-material";

const socials = {
  instagram: { icon: Instagram, url: "https://www.instagram.com/aesi.ong/" },
  linkedin: { icon: LinkedIn, url: "https://www.linkedin.com/company/aesiong/" },
  tiktok: { icon: MusicNote, url: "https://www.tiktok.com/@aesiong" },
  youtube: { icon: YouTube, url: "https://youtube.com/@aesiong" },
};

const Footer = () => {
  return (
    <footer className="bg-white text-black border-t-2 border-gray-400">
      {/* Colores 1 */}
      <div className="grid grid-cols-4">
        <div className="py-1 bg-rojo-aesi"></div>
        <div className="py-1 bg-amarillo-aesi"></div>
        <div className="py-1 bg-azul-aesi"></div>
        <div className="py-1 bg-verde-aesi"></div>
      </div>

      {/* Contenido */}
      <div className="max-w-screen-xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-11 gap-10">
        {/* Logo y derechos */}
        <div className="col-span-1 md:col-span-4 lg:col-span-3 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="relative w-40 aspect-[1.37] mb-4">
            <img
              src="/aesi-logo.svg"
              alt="AESI logo"
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-xs lg:text-base">
            © {new Date().getFullYear()} - Todos los derechos reservados AESI
          </p>
        </div>

        {/* Secciones */}
        <div className="col-span-1 md:col-span-4 lg:col-span-2">
          <h2 className="font-semibold text-xl lg:text-2xl mb-4">Secciones</h2>
          <div className="space-y-3 text-base">
            <p>Inicio</p>
            <p>Nosotros</p>
            <p>Contáctanos</p>
          </div>
        </div>

        {/* Contacto */}
        <div className="col-span-1 md:col-span-4 lg:col-span-3">
          <h2 className="font-semibold text-xl lg:text-2xl mb-4">Contáctanos</h2>
          <div className="space-y-3 text-base">
            <p>soytalento@aesiong.org</p>
            <p>(+51) 944 145 624</p>
          </div>
        </div>

        {/* Noticias y Redes */}
        <div className="col-span-1 md:col-span-4 lg:col-span-3">
          <h2 className="font-semibold text-xl lg:text-2xl mb-2">
            Recibe noticias de AESI
          </h2>
          <div className="mb-6">
            <button className="bg-red-600 text-white px-6 py-2 text-sm sm:text-base rounded-xl shadow-md hover:bg-red-700 transition">
              Suscríbete
            </button>
          </div>

          <h2 className="font-semibold text-xl lg:text-2xl mb-4">Síguenos</h2>
          <div className="flex flex-wrap gap-4">
            {["linkedin", "instagram", "tiktok", "youtube"].map((social) => {
              const { url, icon } = socials[social as keyof typeof socials];
              const Icon = icon;
              return (
                <a
                  key={social}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 sm:w-14 sm:h-14 bg-red-100 text-rojo-aesi rounded-full flex items-center justify-center hover:bg-red-200 transition"
                >
                  <Icon style={{ fontSize: "1.5rem" }} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

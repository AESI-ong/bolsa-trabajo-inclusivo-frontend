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
      {/* Colores */}
      <div className="grid grid-cols-4">
        <div className="py-1 bg-rojo-aesi"></div>
        <div className="py-1 bg-amarillo-aesi"></div>
        <div className="py-1 bg-azul-aesi"></div>
        <div className="py-1 bg-verde-aesi"></div>
      </div>

      {/* Contenido */}
      <div className="mx-auto p-12 grid grid-cols-11 ">
        {/* Logo y derechos */}
        <div className="mx-0 flex flex-col max-w-56 text-center col-span-3">
          <div className="relative w-full aspect-[1.37] mb-2 md:mb-4">
            <img
              src="/aesi-logo.svg"
              alt="AESI logo"
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-[0.565rem] lg:text-base">
            © {new Date().getFullYear()} - Todos los derechos reservados AESI
          </p>
        </div>

        {/* Secciones */}
        <div className="col-span-2 text-left w-full">
          <h2 className="font-semibold text-2xl mb-4">Secciones</h2>
          <div className="text-lg space-y-4">
            <p>Inicio</p>
            <p>Nosotros</p>
            <p>Contáctanos</p>
          </div>
        </div>

        {/* Contacto */}
        <div className="col-span-3 text-left w-full">
          <h2 className="font-semibold text-2xl mb-4">Contáctanos</h2>
          <div className="text-lg space-y-4">
            <p>soytalento@aesiong.org</p>
            <p>(+51) 944 145 624</p>
          </div>
        </div>

        {/* Noticias + Redes */}
        <div className="col-span-3 pl-4">
          <h2 className="font-semibold text-2xl mb-2 text-left">
            Recibe noticias de AESI
          </h2>
          <div className="flex mb-8">
            <button className="cursor-pointer bg-rojo-aesi text-white px-10 py-2 font-medium transition-colors shadow-lg rounded-xl">
              Suscríbete
            </button>
          </div>

          <h2 className="font-semibold text-2xl text-left mb-6">
            Síguenos
          </h2>
          <div className="flex space-x-8 justify-start">
            {["linkedin", "instagram", "tiktok", "youtube"].map((social) => {
              const { url, icon } = socials[social as keyof typeof socials];
              const Icon = icon;
              return (
                <a
                  key={social}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-red-100 text-rojo-aesi rounded-full flex items-center justify-center hover:bg-red-200"
                >
                  <Icon style={{ fontSize: "1.75rem" }} />
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
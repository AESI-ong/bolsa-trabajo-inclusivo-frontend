import { Instagram, LinkedIn, MusicNote, YouTube } from "@mui/icons-material";

const socials = {
  instagram: { icon: Instagram, url: "https://www.instagram.com/aesi.ong/" },
  linkedin: {
    icon: LinkedIn,
    url: "https://www.linkedin.com/company/aesiong/",
  },
  tiktok: { icon: MusicNote, url: "https://www.tiktok.com/@aesiong" },
  youtube: { icon: YouTube, url: "https://www.youtube.com/@AESI-ONG" },
};

const Footer = () => {
  return (
    <footer className="bg-white text-black">
      {/* Línea superior degradada de 4 colores */}
      <div
        className="w-full h-2"
        style={{
          background:
            "linear-gradient(90deg, #cd2027 0%, #f6d70e 33%, #2c6db6 66%, #55b948 100%)",
        }}
      />

      {/* Contenido responsive */}
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col gap-10 md:gap-0 md:grid md:grid-cols-12 md:py-16">
        {/* Logo y derechos */}
        <div className="flex flex-col items-center md:items-start md:col-span-3 mb-2 md:mb-0">
          <div className="w-32 h-auto mb-2 md:mb-4">
            <img
              src="/aesi-logo.svg"
              alt="AESI logo"
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-xs md:text-sm text-center md:text-left">
            © {new Date().getFullYear()} - Todos los derechos reservados AESI
          </p>
        </div>

        {/* Secciones */}
        <nav
          className="md:col-span-2 flex flex-col items-center md:items-start mb-1 md:mb-0"
          aria-label="Secciones"
        >
          <h2 className="font-semibold text-xl md:text-2xl mb-3 md:mb-4">
            Secciones
          </h2>
          <ul className="text-base md:text-lg space-y-2 md:space-y-4">
            <li>
              <a href="#" className="hover:underline">
                Inicio
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Nosotros
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contáctanos
              </a>
            </li>
          </ul>
        </nav>

        {/* Contacto */}
        <address className="not-italic md:col-span-3 flex flex-col items-center md:items-start mb-1 md:mb-0">
          <h2 className="font-semibold text-xl md:text-2xl mb-3 md:mb-4">
            Contáctanos
          </h2>
          <ul className="text-base md:text-lg space-y-2 md:space-y-4">
            <li>
              <a
                href="mailto:soytalento@aesiong.org"
                className="hover:underline"
              >
                soytalento@aesiong.org
              </a>
            </li>
            <li>
              <a href="tel:+51967972857" className="hover:underline">
                (+51) 967 972 857
              </a>
            </li>
          </ul>
        </address>

        {/* Noticias + Redes */}
        <div className="md:col-span-4 flex flex-col items-center md:items-start">

          <h2 className="font-semibold text-xl md:text-2xl text-center md:text-start mb-8 w-full">
            Síguenos
          </h2>
          <div className="flex space-x-6 md:space-x-8 justify-center md:justify-start w-full">
            {["linkedin", "instagram", "tiktok", "youtube"].map((social) => {
              const { url, icon } = socials[social as keyof typeof socials];
              const Icon = icon;
              return (
                <a
                  key={social}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 md:w-14 md:h-14 bg-red-100 text-rojo-aesi rounded-full flex items-center justify-center hover:bg-red-200"
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

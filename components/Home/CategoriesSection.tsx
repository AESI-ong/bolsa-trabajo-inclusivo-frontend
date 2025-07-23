import CategoryCard from "../CategoryCard";

const categories = [
  { name: "Agricultura", icon: "agriculture 3.png" },
  { name: "Comercio", icon: "comercio.png" },
  { name: "Construcción", icon: "construccion.png" },
  { name: "Hotelería y Turismo", icon: "maleta.png" },
  { name: "Educación", icon: "educacion.png" },
  { name: "Servicios financieros", icon: "finanzas.png" },
  { name: "Transporte", icon: "transporte.png" },
];

const CategoriesSection = () => {
  return (
    <section
      className="py-16 relative overflow-hidden "
      style={{ backgroundImage: "url('/assets/Home/Fondo página 1.png')" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Categorías
        </h2>

        <div className="flex flex-wrap justify-center gap-6 mx-auto">
          {categories.map((cat, i) => (
            <div key={i} className="w-full xs:w-[220px] sm:w-[220px]">
              <CategoryCard name={cat.name} icon={cat.icon} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;

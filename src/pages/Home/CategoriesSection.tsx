import CategoryCard from "../../components/CategoryCard";

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
      className="py-10 px-4 bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/Home/Fondo página 1.png')" }}
    >
      <h2 className="text-3xl font-bold text-center mb-6 text-black">Categorías</h2>

      <div className="mx-auto max-w-[800px] flex flex-wrap justify-center gap-x-6 gap-y-6">
        {categories.map((cat, i) => (
          <CategoryCard key={i} name={cat.name} icon={cat.icon} />
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;



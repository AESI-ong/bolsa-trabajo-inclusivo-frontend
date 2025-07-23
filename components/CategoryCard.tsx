type CategoryProps = {
  name: string;
  icon: string;
};

const CategoryCard = ({ name, icon }: CategoryProps) => {
  return (
    <div className="bg-[#FCFAF4] rounded-xl shadow text-center w-full py-8 px-2 flex flex-col items-center">
      <div
        className="flex items-center justify-center w-20 h-20 rounded-full mb-4"
        style={{ background: "rgba(44, 109, 182, 0.08)" }}
      >
        <img src={`/assets/Home/${icon}`} alt={name} className="w-10 h-10" />
      </div>
      <p className="text-lg font-bold text-gray-800 mt-1">{name}</p>
    </div>
  );
};

export default CategoryCard;

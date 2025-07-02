type CategoryProps = {
  name: string;
  icon: string;
};

const CategoryCard = ({ name, icon }: CategoryProps) => {
  return (
    <div className="bg-white p-4 rounded shadow text-center w-full max-w-[180px] py-6">
      <img
        src={`/assets/Home/${icon}`}
        alt={name}
        className="w-16 h-16 mx-auto mb-2"
      />
      <p className="text-xl font-bold text-sm">{name}</p>
    </div>
  );
};

export default CategoryCard;

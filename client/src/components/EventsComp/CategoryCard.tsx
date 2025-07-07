import React from "react";

interface CategoryProps {
  name: string;
  icon: React.ElementType;
  gradient: string;
  count: string;
}

const CategoryCard: React.FC<{ category: CategoryProps }> = ({ category }) => {
  const Icon = category.icon;
  return (
    <button className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-xl">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-90 group-hover:opacity-100 transition-opacity`}
      ></div>
      <div className="relative p-8 text-center text-white">
        <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-10 h-10 mx-auto" />
        </div>
        <h3 className="text-xl font-bold mb-2">{category.name}</h3>
        <p className="text-sm text-white/80">{category.count}</p>
      </div>
    </button>
  );
};

export default CategoryCard;

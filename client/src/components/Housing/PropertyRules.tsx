export const PropertyRules = () => {
  const rules = [
    { icon: "🚬", label: "No Smoking" },
    { icon: "🍺", label: "No Drinking" },
    { icon: "👥", label: "No Parties" },
  ];

  return (
    <div className=" bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
      <h2 className="text-2xl font-semibold text-gray-900 mb-8 font-sans tracking-tight">
        PG Rules
      </h2>
      <div className="flex justify-center gap-16">
        {rules.map((rule, index) => (
          <div 
            key={index} 
            className="text-center group cursor-pointer p-6 rounded-xl hover:bg-red-50 transition-colors duration-300"
          >
            <div className="text-4xl mb-3 transform group-hover:scale-110  transition-transform duration-200">
              {rule.icon}
            </div>
            <p className="text-base font-medium text-gray-900">{rule.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
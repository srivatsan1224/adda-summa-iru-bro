export const Services = () => {
  const services = [
    { icon: "🔑", label: "Key", subLabel: "Move in Ready" },
    { icon: "📝", label: "Create", subLabel: "Agreement" },
    { icon: "🏠", label: "Facilitate", subLabel: "Moving Cost" },
    { icon: "🔧", label: "Book", subLabel: "Home Services" },
    { icon: "🏡", label: "Rent/Buy", subLabel: "Furniture" },
  ];

  return (
    <div className=" rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
      <h2 className="text-2xl font-semibold text-gray-900 mb-8 font-sans tracking-tight">
        Our Services
      </h2>
      <div className="grid grid-cols-5 gap-8">
        {services.map((service, index) => (
          <div 
            key={index} 
            className="text-center group cursor-pointer p-4 rounded-xl hover:bg-green-50 transition-colors duration-300"
          >
            <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-200">
              {service.icon}
            </div>
            <p className="font-semibold text-gray-900 mb-1">{service.label}</p>
            <p className="text-sm text-gray-600">{service.subLabel}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
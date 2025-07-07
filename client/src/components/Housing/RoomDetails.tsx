interface RoomDetailsProps {
  type: "double" | "triple";
  rent: number;
  deposit: number;
}

export const RoomDetails: React.FC<RoomDetailsProps> = ({
  type,
  rent,
  deposit,
}) => {
  const amenities = [
    { icon: "🚽", label: "Attached bathroom" },
    { icon: "❄️", label: "Air conditioner" },
    { icon: "🗄️", label: "Cupboard" },
    { icon: "🛏️", label: "Bedding" },
    { icon: "🛋️", label: "Geyser" },
  ];

  return (
    <div className="p-6 rounded-xl bg-gradient-to-br from-white to-emerald-50/30 border border-emerald-100 hover:shadow-md transition-shadow duration-300">
      <h3 className="text-xl font-semibold text-gray-900 tracking-tight mb-4">
        {type === "double" ? "Double" : "Triple"} Sharing Room
      </h3>
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-sm font-medium text-gray-500">Monthly Rent</p>
          <p className="text-2xl font-semibold text-emerald-600">₹ {rent.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Security Deposit</p>
          <p className="text-2xl font-semibold text-gray-900">₹ {deposit.toLocaleString()}</p>
        </div>
      </div>
      <div className="flex gap-8 justify-between">
        {amenities.map((amenity, index) => (
          <div key={index} className="text-center group cursor-pointer">
            <div className="text-3xl mb-2 transform group-hover:scale-110 transition-transform duration-200">{amenity.icon}</div>
            <p className="text-sm text-gray-600 group-hover:text-emerald-600 transition-colors">{amenity.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
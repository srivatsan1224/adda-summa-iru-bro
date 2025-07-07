
import h1 from "../../assets/HousingHome/H1.jpg";
import h2 from "../../assets/HousingHome/H2.jpg";
import h3 from "../../assets/HousingHome/H3.jpg";

const HomesNearYou = () => {
  const homes = [
    {
      id: 1,
      image: h1,
      title: "ABC Apartment in Chromepet",
      address: "Flat No. 402, Green Valley Apartments ....",
      rent: "₹ 10,000",
      deposit: "₹40,000",
      area: "1,100 sqft",
      details: "Semi Furnished | 2BHK | Bachelor | Ready to Move",
      updated: "5 mins ago",
    },
    {
      id: 2,
      image: h2,
      title: "AJ Flats in Pallavaram",
      address: "Flat No. 402, Green Valley Apartments ....",
      rent: "₹ 10,000",
      deposit: "₹40,000",
      area: "1,100 sqft",
      details: "Semi Furnished | 2BHK | Bachelor | Ready to Move",
      updated: "10 mins ago",
    },
    {
      id: 3,
      image: h3,
      title: "Ruby Builders West Tambaram",
      address: "Flat No. 402, Green Valley Apartments ....",
      rent: "₹ 10,000",
      deposit: "₹40,000",
      area: "1,100 sqft",
      details: "Semi Furnished | 2BHK | Bachelor | Ready to Move",
      updated: "15 mins ago",
    },
  ];

  return (
    <div className="w-full bg-gradient-to-br from-white to-gray-50 py-12 md:py-16">
      {/* Title Section */}
      <div className="relative flex flex-col items-center justify-center mb-12 px-4">
        <div className="w-32 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full mb-6" />
        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-500 drop-shadow-lg tracking-tight text-center">
          Homes Near You
        </h2>
        <p className="mt-4 text-base md:text-xl text-gray-600 font-normal text-center max-w-2xl">
          Discover your perfect home in prime locations
        </p>
      </div>

      {/* Homes Horizontal Scroll */}
      <div className="w-full">
        <div className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory scrollbar-none px-4 md:px-8">
          {homes.map((home) => (
            <div
              key={home.id}
              className="group flex-shrink-0 w-[320px] md:w-[400px] snap-center overflow-hidden rounded-xl bg-white/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 first:ml-auto last:mr-auto"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-56">
                <img
                  src={home.image}
                  alt={home.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-emerald-400/20 text-emerald-700 backdrop-blur-sm">
                    {home.updated}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors duration-300">
                  {home.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{home.address}</p>

                {/* Pricing Grid */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Rent</p>
                    <p className="font-semibold text-gray-800">{home.rent}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Deposit</p>
                    <p className="font-semibold text-gray-800">{home.deposit}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Area</p>
                    <p className="font-semibold text-gray-800">{home.area}</p>
                  </div>
                </div>

                {/* Details */}
                <div className="py-3 px-4 bg-gray-50 rounded-lg mb-6">
                  <p className="text-sm text-gray-600">{home.details}</p>
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                  <button className="flex-1 bg-gradient-to-r from-emerald-400 to-teal-500 text-white text-sm py-3 rounded-lg hover:shadow-lg transition-all duration-300">
                    Contact Owner
                  </button>
                  <button className="flex-1 border-2 border-emerald-400 text-emerald-600 text-sm py-3 rounded-lg hover:bg-emerald-50 transition-all duration-300">
                    Schedule Visit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          .scrollbar-none::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-none {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </div>
  );
};

export default HomesNearYou;
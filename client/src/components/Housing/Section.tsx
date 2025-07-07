
  const FeaturesSection = () => {
    const features = [
      {
        id: 1,
        icon: "🧑‍💼",
        title: "Verifed Brokers",
        description: "Find verified brokers ",
      },
      {
        id: 2,
        icon: "🏠❤️",
        title: "Shortlist without Visit",
        description: "Extensive Information makes it easy",
      },
      {
        id: 3,
        icon: "📄",
        title: "Free Listing",
        description: "Easy listing process. Also using WhatsApp",
      },
      {
        id: 4,
        icon: "📜",
        title: "Rental Agreement",
        description: "Assistance in creating Rental agreement & Paperwork",
      },
    ];

    return (
      <div className="w-full bg-gradient-to-br from-white to-gray-50 py-12 md:py-16">
        {/* Title Section */}
        <div className="relative flex flex-col items-center justify-center mb-12 px-4">
          <div className="w-32 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-500 drop-shadow-lg tracking-tight text-center">
            Why Choose Us
          </h2>
          <p className="mt-4 text-base md:text-xl text-gray-600 font-normal text-center max-w-2xl">
            Experience seamless house hunting with our unique features
          </p>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="group relative p-8 rounded-xl bg-white/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Icon */}
                <div className="mb-6 transform group-hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center text-4xl shadow-sm group-hover:shadow-md transition-all duration-300">
                    {feature.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 group-hover:text-emerald-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Decorative Background Element */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/0 to-teal-100/0 group-hover:from-emerald-50/50 group-hover:to-teal-50/50 rounded-xl transition-colors duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  export default FeaturesSection;
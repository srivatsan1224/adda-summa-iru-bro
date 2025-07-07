import { motion } from "framer-motion";

const cities = [
  {
    name: "Mumbai",
    image: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f",
    properties: "2,345",
    rating: 4.8
  },
  {
    name: "Delhi",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5",
    properties: "3,121",
    rating: 4.7
  },
  {
    name: "Bangalore",
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2",
    properties: "2,879",
    rating: 4.9
  },
  {
    name: "Chennai",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220",
    properties: "1,998",
    rating: 4.6
  },
  {
    name: "Kolkata",
    image: "https://images.unsplash.com/photo-1558431382-27e303142255",
    properties: "1,765",
    rating: 4.7
  },
  {
    name: "Hyderabad",
    image: "https://images.unsplash.com/photo-1600577916048-804c9191e36c",
    properties: "2,234",
    rating: 4.8
  }
];

const CityShowcase = () => {
  return (
    <section className="py-8 md:py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">Popular Cities</h2>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-4">
            Explore properties in India's most sought-after cities
          </p>
        </motion.div>

        {/* Modified grid for better mobile display */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
          {cities.map((city, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-xl md:rounded-2xl">
                {/* Adjusted image height for mobile */}
                <div className="relative h-44 sm:h-56 md:h-72">
                  <img
                    src={city.image}
                    alt={city.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
                
                {/* Adjusted content padding and text sizes for mobile */}
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6">
                  <h3 className="text-lg md:text-2xl font-bold text-white mb-1 md:mb-2">{city.name}</h3>
                  <div className="flex items-center justify-between text-white/90 text-sm md:text-base">
                    <span>{city.properties} Properties</span>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">★</span>
                      <span>{city.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-emerald-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-8 md:mt-12"
        >
          <button className="px-6 py-3 md:px-8 md:py-4 bg-emerald-600 text-white rounded-full text-sm md:text-base font-medium hover:bg-emerald-700 transition-colors">
            View All Cities
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CityShowcase;
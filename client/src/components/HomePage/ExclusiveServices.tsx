import { motion } from "framer-motion";
import { BookOpen, Home, Utensils, Calendar, Briefcase, Laptop } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: <Home className="w-6 h-6 md:w-8 md:h-8" />,
    title: "Premium Housing Solutions",
    description:
      "Discover luxury living spaces with our curated selection of verified properties",
    color: "from-emerald-500 to-teal-600",
    hexColor: "#10B981",
    highlight: "2000+ Listings",
    route: "/housinghome",
    image:
      "https://images.unsplash.com/photo-1619542402915-dcaf30e4e2a1?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    icon: <Utensils className="w-6 h-6 md:w-8 md:h-8" />,
    title: "Gourmet Food Services",
    description:
      "Experience fine dining with our carefully selected food partners",
    color: "from-orange-500 to-red-600",
    hexColor: "#F97316",
    highlight: "500+ Restaurants",
    route: "/foodhome",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: <Calendar className="w-6 h-6 md:w-8 md:h-8" />,
    title: "Exclusive Events",
    description:
      "Access premium events and networking opportunities",
    color: "from-purple-500 to-indigo-600",
    hexColor: "#8B5CF6",
    highlight: "Weekly Updates",
    route: "/eventshome",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: <Briefcase className="w-6 h-6 md:w-8 md:h-8" />,
    title: "Elite Career Opportunities",
    description:
      "Connect with top employers for premium job positions",
    color: "from-blue-500 to-cyan-600",
    hexColor: "#3B82F6",
    highlight: "100+ Companies",
    route: "/parttime/home",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: <Laptop className="w-6 h-6 md:w-8 md:h-8" />,
    title: "Premium Tech Rentals",
    description:
      "Access the latest technology without the commitment",
    color: "from-pink-500 to-rose-600",
    hexColor: "#EC4899",
    highlight: "Latest Gadgets",
    route: "/rental/home",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: <BookOpen className="w-6 h-6 md:w-8 md:h-8" />,
    title: "Exclusive Discounts",
    description:
      "Get the best deals and offers tailored to your needs",
    color: "from-yellow-500 to-amber-600",
    hexColor: "#F59E0B",
    highlight: "Best Offers",
    route: "/discount",
    image:
      "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
];

const ServicesGrid = () => {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
      </div>

      {/* Content */}
      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-2 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs md:text-sm font-medium mb-2">
            Our Exclusive Services
          </span>
          <h2 className="text-xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Premium Solutions for Modern Living
          </h2>
          <p className="text-xs md:text-lg text-gray-600 max-w-2xl mx-auto">
            Experience unparalleled service quality with our carefully curated solutions designed for your lifestyle
          </p>
        </motion.div>

        {/* Grid: 2 columns on mobile, 3 columns on larger screens */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative rounded-lg overflow-hidden shadow-md"
            >
              <Link to={service.route} onClick={() => window.scrollTo(0, 0)}>
                <div className="relative group">
                  {/* Responsive Background Image */}
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-32 md:h-48 object-cover"
                  />
                  {/* Gradient Overlay */}
                  <div
                    className="absolute inset-0 flex flex-col justify-end p-2 md:p-3"
                    style={{
                      background: `linear-gradient(to top, ${service.hexColor}CC, transparent)`,
                    }}
                  >
                    {/* Icon in a circular, blurrecontainer */}
                    <div className="bg-white/20 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mb-1 backdrop-blur-sm">
                      {service.icon}
                    </div>
                    <h3 className="font-bold text-white text-xs md:text-lg">
                      {service.title}
                    </h3>
                    {/* Hide the description on mobile to reuce content */}
                    <p className="hidden md:block text-white/90 text-xs md:text-sm">
                      {service.description}
                    </p>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="inline-block px-2 py-1 rounded-full bg-white text-[10px] md:text-xs font-medium text-gray-900">
                        {service.highlight}
                      </span>
                      <span className="text-white font-medium text-[10px] md:text-xs">
                        Learn More →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-10"
        >
          <Link
            to="/services"
            onClick={() => window.scrollTo(0, 0)}
            className="px-3 py-2 md:px-8 md:py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full font-medium text-xs md:text-sm hover:shadow-lg hover:scale-105 active:scale-100 transition-all duration-300"
          >
            Explore All Services
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesGrid;

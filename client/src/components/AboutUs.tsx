import { motion } from "framer-motion";
import { Users, Building, Heart, Handshake, Info, User } from "lucide-react";
import Navbar from "./Navbar";

const AboutUs = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden bg-gradient-to-b from-emerald-50/50 to-white"
    >
      <Navbar />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb" 
              alt="Background" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/70 to-teal-900/70" />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(236,253,245,0.4),transparent_40%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(209,250,229,0.4),transparent_40%)]" />
          
          <div className="container relative z-10 mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 text-sm font-medium mb-4">
                Who We Are
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Our Story
              </h1>
              <p className="text-white/90 text-lg">
                We are on a mission to transform the way people experience modern living through technology and exceptional service.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 shadow-sm"
              >
                <div className="w-16 h-16 rounded-xl flex items-center justify-center text-white bg-gradient-to-r from-emerald-500 to-teal-600 mb-6">
                  <Info className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Our Vision</h2>
                <p className="text-gray-600 leading-relaxed">
                  To create a seamless platform where individuals can access premium living solutions that enhance their quality of life, all in one place. We envision a world where finding a home, accessing services, and building community is effortless and enjoyable.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 shadow-sm"
              >
                <div className="w-16 h-16 rounded-xl flex items-center justify-center text-white bg-gradient-to-r from-emerald-500 to-teal-600 mb-6">
                  <Heart className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Our Mission</h2>
                <p className="text-gray-600 leading-relaxed">
                  To simplify the living experience by providing verified, high-quality housing options and essential services through an intuitive platform. We are committed to transparency, reliability, and exceptional customer service in everything we do.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 bg-gray-50 relative">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0 opacity-10">
            <img 
              src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7" 
              alt="Background" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container relative z-10 mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Our Core Values
              </h2>
              <p className="text-gray-600">
                The principles that guide us in our mission to transform modern living
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Building className="w-8 h-8" />,
                  title: "Trust & Reliability",
                  description: "We verify every listing and service to ensure the highest standards of quality and reliability."
                },
                {
                  icon: <Handshake className="w-8 h-8" />,
                  title: "Exceptional Service",
                  description: "We are committed to providing outstanding customer service at every touchpoint."
                },
                {
                  icon: <Users className="w-8 h-8" />,
                  title: "Community Focus",
                  description: "We build solutions that foster connections and create thriving communities."
                },
                {
                  icon: <User className="w-8 h-8" />,
                  title: "User-Centric",
                  description: "Every feature and service is designed with our users' needs and experiences in mind."
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white bg-gradient-to-r from-emerald-500 to-teal-600 mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Meet Our Team
              </h2>
              <p className="text-gray-600">
                The passionate individuals behind our mission
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "CEO & Co-Founder",
                  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                  bio: "With 15+ years in real estate and tech, Sarah leads our vision to transform modern living experiences."
                },
                {
                  name: "Michael Chen",
                  role: "CTO & Co-Founder",
                  image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                  bio: "Michael oversees our technological innovation, ensuring we deliver seamless experiences across all platforms."
                },
                {
                  name: "Priya Sharma",
                  role: "Head of Operations",
                  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                  bio: "Priya manages our day-to-day operations, ensuring we consistently deliver exceptional service to our users."
                }
              ].map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                      <h3 className="text-xl font-bold text-white">{member.name}</h3>
                      <p className="text-emerald-300">{member.role}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600">{member.bio}</p>
                    <button className="mt-4 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full font-medium hover:shadow-lg transition-all">
                      Read Full Bio
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Milestones */}
        <section className="py-20 relative overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1501854140801-50d01698950b" 
              alt="Background" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gray-900/80" />
          </div>
          <div className="container relative z-10 mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-3xl font-bold mb-6 text-white">
                Our Journey
              </h2>
              <p className="text-gray-300">
                Key milestones that have shaped our growth
              </p>
            </motion.div>

            <div className="relative border-l-2 border-emerald-500 ml-4 md:ml-8 pl-8 space-y-12">
              {[
                {
                  year: "2018",
                  title: "Company Founded",
                  description: "Our journey began with a simple idea: to create a platform that makes finding quality housing easy and transparent."
                },
                {
                  year: "2019",
                  title: "First 1,000 Users",
                  description: "We reached our first major milestone of 1,000 active users, validating our mission and approach."
                },
                {
                  year: "2020",
                  title: "Expanded Services",
                  description: "We introduced food delivery, tech rentals, and event bookings to create a comprehensive lifestyle platform."
                },
                {
                  year: "2021",
                  title: "Mobile App Launch",
                  description: "Our mobile app was released, bringing our services to users' fingertips and expanding our reach."
                },
                {
                  year: "2022",
                  title: "Series A Funding",
                  description: "We secured $10M in Series A funding to accelerate our growth and enhance our technology."
                },
                {
                  year: "2023",
                  title: "National Expansion",
                  description: "We expanded our services to 50+ cities across the country, becoming a nationwide platform."
                }
              ].map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="absolute -left-14 w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center text-white text-sm">
                    {index + 1}
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-sm">
                    <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-sm font-medium mb-3">
                      {milestone.year}
                    </span>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-white relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-70"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-100 rounded-full translate-x-1/3 translate-y-1/3 opacity-70"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-10 shadow-xl relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <img 
                  src="https://images.unsplash.com/photo-1721322800607-8c38375eef04" 
                  alt="Pattern" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="max-w-3xl mx-auto text-center text-white relative z-10">
                <h2 className="text-3xl font-bold mb-6">Ready to Join Our Journey?</h2>
                <p className="text-white/90 text-lg mb-8">
                  Whether you're looking for premium housing, want to list your property, or simply have questions, we're here to help.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button className="px-8 py-3 bg-white text-emerald-600 rounded-full font-medium hover:shadow-lg hover:bg-gray-100 transition-all">
                    Contact Us
                  </button>
                  <button className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-medium hover:shadow-lg hover:bg-white/10 transition-all">
                    Join Our Team
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default AboutUs;
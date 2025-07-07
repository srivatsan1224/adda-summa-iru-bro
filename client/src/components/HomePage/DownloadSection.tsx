import { motion } from "framer-motion";

const DownloadApp = () => {
  // In your actual implementation, you can use these Unsplash URLs:
  const unsplashImages = {
    mainApp:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80", // Modern phone interface
    secondaryApp:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=400", // Smaller feature image
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-teal-600 font-semibold text-sm tracking-wider uppercase hover:text-teal-700 transition-colors">
            Download Now
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-gray-900">
            Experience Innovation
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Transform your daily routine with our cutting-edge mobile
            application. Designed for simplicity, built for excellence.
          </p>
        </motion.div>

        <div className="relative rounded-3xl overflow-hidden bg-white shadow-xl">
          {/* Subtle Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-teal-50 opacity-90" />

          {/* Main Content */}
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 p-8 md:p-16">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-gray-900 max-w-xl"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Your Digital Lifestyle Companion
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Access premium features, seamless integration, and personalized
                experiences. Join thousands of satisfied users who've elevated
                their daily routines.
              </p>

              <div className="flex flex-wrap gap-4">
                {/* App Store Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl transition-colors"
                >
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs opacity-90">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </motion.button>

                {/* Play Store Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl transition-colors"
                >
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs opacity-90">Get it on</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </motion.button>
              </div>
            </motion.div>

            {/* Phone Images & Stats */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative flex flex-col items-center"
            >
              <div className="relative w-full max-w-sm">
                {/* Main App Image */}
                <img
                  src={unsplashImages.mainApp}
                  alt="App Interface"
                  className="w-full rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300"
                />
                {/* Secondary App Image */}
                <img
                  src={unsplashImages.secondaryApp}
                  alt="App Usage"
                  className="mt-4 lg:mt-0 block lg:absolute lg:-bottom-10 lg:-left-10 w-32 lg:w-48 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Stats Cards */}
              <div className="mt-6 flex flex-col gap-4 lg:absolute lg:top-0 lg:right-0 lg:mt-0">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/80 backdrop-blur rounded-xl p-4 shadow-lg flex items-center gap-3"
                >
                  <div className="w-3 h-3 rounded-full bg-teal-500" />
                  <span className="font-medium text-gray-900">
                    50K+ Active Users
                  </span>
                </motion.div>

                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="bg-white/80 backdrop-blur rounded-xl p-4 shadow-lg flex items-center gap-3"
                >
                  <div className="w-3 h-3 rounded-full bg-teal-500" />
                  <span className="font-medium text-gray-900">
                    4.9 ★ Rating
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;

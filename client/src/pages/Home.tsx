// Home.tsx
import React from "react";
import HeroCarousel from "../components/HomePage/HeroCarousel";
import ExclusiveServices from "../components/HomePage/ExclusiveServices";
import HomeCard from "../components/HomePage/HomeCard";
import Testimonials from "../components/HomePage/Testimonials";
import DownloadSection from "../components/HomePage/DownloadSection";
import FAQ from "../components/HomePage/Faq";
import CityShowcase from "../components/HomePage/Cities";
import { motion } from "framer-motion";

const Home: React.FC = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden bg-gradient-to-b from-emerald-50/50 to-white"
      >
        <div className="pt-0"> 
          {/* Hero Section Start */}
          <HeroCarousel />
          {/* Hero Section end */}

          {/* Services Section Start */}
          <div id="exclusive-services">
            <ExclusiveServices />
          </div>
          {/* Services Section end */}

          {/* Nearby Homes */}
          <HomeCard />
          <CityShowcase/>
          {/* Nearby Homes */}

          <DownloadSection />
          <Testimonials />
          <FAQ />
        </div>
      </motion.div>
    </>
  );
};

export default Home;

import React from "react";
import Banner from "../../components/DiscountPage/Banner";
import TopDeals from "../../components/DiscountPage/TopDeals";
import Promotions from "../../components/DiscountPage/Promotions";
import AdSection from "../../components/DiscountPage/AdSection";
import DownloadBanner from "../../components/HomePage/DownloadSection";


const DiscountPage: React.FC = () => {
  return (
  <div className="bg-gray-50 mt-0">
    <Banner/>
    <TopDeals/>
    <Promotions/>
    <AdSection/>
    <DownloadBanner />
  </div>
  );
};

export default DiscountPage;

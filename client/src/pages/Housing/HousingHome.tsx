import DownloadApp from "../../components/HomePage/DownloadSection";
import Carousel from "../../components/Housing/Carousel";
import ExclusiveServices from "../../components/Housing/ExclusiveServices";
import HomesNearYou from "../../components/Housing/NearYou";
import PostPropertySection from "../../components/Housing/PostPropertyBanner";
import FeaturesSection from "../../components/Housing/Section";

export default function HousingHome() {
  return (
    <div>
        <Carousel/>
        <ExclusiveServices/>
        <PostPropertySection/>
        <HomesNearYou/>
        <DownloadApp/>
        <FeaturesSection/>
       
    </div>
  )
}

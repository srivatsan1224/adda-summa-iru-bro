
const AppDownloadSection = () => {
  return (
    <div className="bg-[#FFF5E6] rounded-lg p-8 flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto my-10 shadow-md">
      {/* Text and Buttons Section */}
      <div className="text-center md:text-left mb-6 md:mb-0">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 leading-relaxed">
          One App, Endless Possibilities – <br /> Download Now!
        </h3>
        <div className="flex justify-center md:justify-start items-center space-x-4">
          {/* App Store Button */}
          <a href="#" className="inline-block">
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="Download on App Store"
              className="h-12"
            />
          </a>
          {/* Google Play Button */}
          <a href="#" className="inline-block">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Get it on Google Play"
              className="h-12"
            />
          </a>
        </div>
      </div>

      {/* QR Code Section */}
      <div className="relative flex justify-center items-center">
        <div className="bg-yellow-300 rounded-full w-44 h-44 absolute"></div>
        <div className="relative bg-white border border-gray-200 rounded-lg p-4 shadow-lg flex flex-col items-center">
          <img
            src="https://via.placeholder.com/100x100.png?text=QR+Code"
            alt="QR Code"
            className="w-24 h-24"
          />
          <p className="text-center text-sm text-gray-600 mt-2 font-medium">
            Download <br /> Our New App
          </p>
        </div>
      </div>
    </div>
  );
};

export default AppDownloadSection;

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const HeroCarousel = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      {/* Carousel Container */}
      <div className="w-[80vw] h-[60vh] overflow-hidden rounded-lg shadow-lg">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          loop
          className="w-full h-full" // Ensures Swiper container fills the space
        >
          {/* Slide 1 */}
          <SwiperSlide>
          <div
  className="w-full h-full bg-cover bg-center"
  style={{
    backgroundImage:
      "url('https://th.bing.com/th/id/OIP.OF59vsDmwxPP1tw7b_8clQHaE8?rs=1&pid=ImgDetMain')",
  }}
>
  <div className="bg-black bg-opacity-50 w-full h-full flex flex-col items-center justify-center text-white px-4">
    <h1 className="text-4xl md:text-5xl font-bold">
      Safer Homes, Better Community
    </h1>
    <p className="text-center mt-4">
      The Bachelor's Housing Solution You Can Rely On!
    </p>

    {/* Search Section */}
    <div className="mt-8  bg-opacity-90 rounded-lg shadow-lg py-4 px-6 w-[90%] md:w-[60%] space-y-4">
      {/* Search Input */}
      <div className="w-full">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Dropdowns and Button */}
      <div className="flex flex-wrap md:flex-nowrap justify-between items-center w-full gap-4 px-4 py-4 bg-white bg-opacity-80 rounded-lg shadow-md">
  {/* Rent Dropdown */}
  <div className="flex-1 flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-white hover:shadow-md">
    <label className="mr-2 font-semibold text-gray-700">Rent</label>
    <select className="bg-transparent focus:outline-none w-full text-black font-medium">
      <option>PG/Hostel</option>
      <option>Apartment</option>
      <option>Shared Room</option>
    </select>
  </div>

  {/* BHK Dropdown */}
  <div className="flex-1 flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-white hover:shadow-md">
    <label className="mr-2 font-semibold text-gray-700">BHK Type</label>
    <select className="bg-transparent focus:outline-none w-full text-black font-medium">
      <option>1 BHK</option>
      <option>2 BHK</option>
      <option>3 BHK</option>
    </select>
  </div>

  {/* Location Dropdown */}
  <div className="flex-1 flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-white hover:shadow-md">
    <label className="mr-2 font-semibold text-gray-700">Location</label>
    <select className="bg-transparent focus:outline-none w-full text-black font-medium">
      <option>Chennai</option>
      <option>Bangalore</option>
      <option>Hyderabad</option>
    </select>
  </div>

  {/* Search Button */}
  <div className="flex-shrink-0">
    <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 w-full font-semibold shadow-md"  >
      Search
    </button>
  </div>
</div>

    </div>
  </div>
</div>


          </SwiperSlide>

          {/* Slide 2 */}
             {/* Slide 1 */}
             <SwiperSlide>
          <div
  className="w-full h-full bg-cover bg-center"
  style={{
    backgroundImage:
      "url('https://th.bing.com/th/id/OIP.OF59vsDmwxPP1tw7b_8clQHaE8?rs=1&pid=ImgDetMain')",
  }}
>
  <div className="bg-black bg-opacity-50 w-full h-full flex flex-col items-center justify-center text-white px-4">
    <h1 className="text-4xl md:text-5xl font-bold">
      Safer Homes, Better Community
    </h1>
    <p className="text-center mt-4">
      The Bachelor's Housing Solution You Can Rely On!
    </p>

    {/* Search Section */}
    <div className="mt-8  bg-opacity-90 rounded-lg shadow-lg py-4 px-6 w-[90%] md:w-[60%] space-y-4">
      {/* Search Input */}
      <div className="w-full">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Dropdowns and Button */}
      <div className="flex flex-wrap md:flex-nowrap justify-between items-center w-full gap-4 px-4 py-4 bg-white bg-opacity-80 rounded-lg shadow-md">
  {/* Rent Dropdown */}
  <div className="flex-1 flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-white hover:shadow-md">
    <label className="mr-2 font-semibold text-gray-700">Rent</label>
    <select className="bg-transparent focus:outline-none w-full text-black font-medium">
      <option>PG/Hostel</option>
      <option>Apartment</option>
      <option>Shared Room</option>
    </select>
  </div>

  {/* BHK Dropdown */}
  <div className="flex-1 flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-white hover:shadow-md">
    <label className="mr-2 font-semibold text-gray-700">BHK Type</label>
    <select className="bg-transparent focus:outline-none w-full text-black font-medium">
      <option>1 BHK</option>
      <option>2 BHK</option>
      <option>3 BHK</option>
    </select>
  </div>

  {/* Location Dropdown */}
  <div className="flex-1 flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-white hover:shadow-md">
    <label className="mr-2 font-semibold text-gray-700">Location</label>
    <select className="bg-transparent focus:outline-none w-full text-black font-medium">
      <option>Chennai</option>
      <option>Bangalore</option>
      <option>Hyderabad</option>
    </select>
  </div>

  {/* Search Button */}
  <div className="flex-shrink-0">
    <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 w-full font-semibold shadow-md">
      Search
    </button>
  </div>
</div>

    </div>
  </div>
</div>


          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default HeroCarousel;

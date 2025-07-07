import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Smartphone, Shirt, Watch, Home, Sparkles, Headphones, MoreHorizontal, ChevronRight, ChevronLeft, Menu } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { useIsMobile } from '../../hooks/use-mobile';

const Banner: React.FC = () => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleCategoryClick = (category: string) => {
    navigate(`/discountsearch?category=${category}`);
    setIsMenuOpen(false);
  };

  const bannerSlides = [
    {
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      tag: "New Season Arrivals",
      title: "Elevate Your Style Game",
      description: "Discover our curated collection with up to 50% off on selected premium items",
      accent: "blue"
    },
    {
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      tag: "Summer Collection",
      title: "Fashion Forward Trends",
      description: "Experience the latest in summer fashion with exclusive designer collections",
      accent: "pink"
    },
    {
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      tag: "Limited Time Offer",
      title: "Luxury Redefined",
      description: "Premium brands at unbeatable prices. Don't miss out on these exclusive deals",
      accent: "purple"
    }
  ];

  const categories = [
    { name: "Women's Fashion", count: "1.2k+" },
    { name: "Men's Fashion", count: "850+" },
    { name: "Electronics", count: "2.5k+" },
    { name: "Home & Lifestyle", count: "1.8k+" },
    { name: "Medicine", count: "450+" },
    { name: "Sports & Outdoor", count: "720+" },
    { name: "Baby's & Toys", count: "650+" },
    { name: "Groceries & Pets", count: "1.5k+" },
    { name: "Health & Beauty", count: "950+" }
  ];

  const categoryIcons = [
    { name: "Grocery", icon: ShoppingBag, color: "blue" },
    { name: "Mobile", icon: Smartphone, color: "purple" },
    { name: "Fashion", icon: Shirt, color: "pink" },
    { name: "Watch", icon: Watch, color: "amber" },
    { name: "Home", icon: Home, color: "emerald" },
    { name: "Beauty", icon: Sparkles, color: "rose" },
    { name: "Electronics", icon: Headphones, color: "indigo" },
    { name: "More", icon: MoreHorizontal, color: "gray" },
  ];

  return (
    <div className="w-[95%] md:w-[90%] mx-auto my-4 md:my-8">
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden mb-4 p-2 rounded-lg bg-white shadow-md"
      >
        <Menu className="h-6 w-6" />
      </button>

      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {/* Left Navigation - Responsive */}
        <div className={`${isMobile ? (isMenuOpen ? 'block' : 'hidden') : 'block'} w-full md:w-1/4 bg-white shadow-lg rounded-2xl p-4 md:p-8 backdrop-blur-lg bg-white/80 mb-4 md:mb-0`}>
          <h3 className="font-semibold text-lg md:text-xl mb-4 md:mb-6 text-gray-900 border-b pb-4">Browse Categories</h3>
          <ul className="space-y-2 md:space-y-4">
            {categories.map((category) => (
              <li
                key={category.name}
                onClick={() => handleCategoryClick(category.name)}
                className="group flex items-center justify-between text-gray-600 hover:text-blue-600 cursor-pointer transition-all duration-300 py-2 px-3 rounded-lg hover:bg-blue-50"
              >
                <span className="font-medium text-sm md:text-base">{category.name}</span>
                <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-400 group-hover:text-blue-500">
                  <span>{category.count}</span>
                  <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Content - Carousel */}
        <div className="w-full md:w-3/4 relative">
          <Swiper
            modules={[Navigation, Autoplay, EffectFade]}
            effect="fade"
            speed={1000}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            navigation={{
              prevEl: '.swiper-button-prev',
              nextEl: '.swiper-button-next',
            }}
            className="h-[300px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl"
            onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
          >
            {bannerSlides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="relative h-full">
                  <img
                    src={slide.image}
                    alt={`Banner ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent flex items-center">
                    <div className="text-white p-6 md:p-16">
                      <span className={`text-xs md:text-sm font-medium bg-${slide.accent}-600 px-3 md:px-4 py-1 md:py-1.5 rounded-full uppercase tracking-wider mb-4 md:mb-6 inline-block`}>
                        {slide.tag}
                      </span>
                      <h2 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                        {slide.title.split(' ').map((word, i) => (
                          <span key={i} className="block">
                            {word}
                          </span>
                        ))}
                      </h2>
                      <p className="text-sm md:text-xl mb-6 md:mb-10 max-w-md text-gray-300">
                        {slide.description}
                      </p>
                      <div className="flex space-x-3 md:space-x-4">
                        <button className={`bg-${slide.accent}-600 text-white px-4 md:px-8 py-2 md:py-4 rounded-xl text-sm md:text-base font-semibold hover:bg-${slide.accent}-700 transition-colors shadow-lg hover:shadow-${slide.accent}-500/30`}>
                          Shop Collection
                        </button>
                        <button className="bg-white/10 backdrop-blur-md text-white px-4 md:px-8 py-2 md:py-4 rounded-xl text-sm md:text-base font-semibold hover:bg-white/20 transition-colors">
                          Learn More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}

            {/* Custom Navigation */}
            <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 z-10 flex items-center space-x-2 md:space-x-4">
              <button className="swiper-button-prev w-8 md:w-12 h-8 md:h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors group">
                <ChevronLeft className="w-4 md:w-6 h-4 md:h-6 text-white group-hover:scale-110 transition-transform" />
              </button>
              <div className="flex space-x-1 md:space-x-2">
                {bannerSlides.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 md:w-2 h-1.5 md:h-2 rounded-full transition-all duration-300 ${
                      activeSlide === index ? 'w-6 md:w-8 bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
              <button className="swiper-button-next w-8 md:w-12 h-8 md:h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors group">
                <ChevronRight className="w-4 md:w-6 h-4 md:h-6 text-white group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </Swiper>
        </div>
      </div>

      {/* Category Icons - Responsive Grid */}
      <div className="grid grid-cols-4 md:grid-cols-8 gap-3 md:gap-6 mt-6 md:mt-12">
        {categoryIcons.map(({ name, icon: Icon, color }) => (
          <div
            key={name}
            onClick={() => handleCategoryClick(name)}
            className="relative group cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-50 rounded-xl md:rounded-2xl transform rotate-6 group-hover:rotate-0 transition-transform duration-300"></div>
            <div className="relative bg-white p-3 md:p-6 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className={`w-8 h-8 md:w-14 md:h-14 mx-auto bg-${color}-50 rounded-lg md:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-2 md:mb-4`}>
                <Icon className={`h-4 w-4 md:h-7 md:w-7 text-${color}-600`} />
              </div>
              <p className="font-medium text-gray-700 text-center text-xs md:text-base group-hover:text-gray-900 transition-colors">
                {name}
              </p>
              <div className="absolute inset-x-0 bottom-0 h-0.5 md:h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
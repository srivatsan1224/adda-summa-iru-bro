import React, { useEffect, useState } from 'react';
import { useFormContext } from './FormContext';
import { Link } from 'react-router-dom';
import { Building2, MapPin, Phone, Mail, User, Check } from 'lucide-react';

interface UserData {
  name: string;
  email: string;
  location: string;
  mobile: string;
}

const Main: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const [userData, setUserData] = useState<UserData>(formData.main?.userData || {
    name: '',
    email: '',
    location: '',
    mobile: '',
  });
  const [selectedType, setSelectedType] = useState('Rent');

  useEffect(() => {
    const fetchUserData = () => {
      const user = localStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        setUserData((prev) => ({
          ...prev,
          name: parsedUser.name,
          email: parsedUser.email,
        }));
      }
    };

    const detectLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            try {
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
              );
              const data = await response.json();

              const city =
                data?.address?.city ||
                data?.address?.town ||
                data?.address?.village ||
                'Unknown City';

              setUserData((prev) => ({
                ...prev,
                location: city,
              }));
            } catch (error) {
              console.error('Error fetching location:', error);
              setUserData((prev) => ({
                ...prev,
                location: 'Unknown City',
              }));
            }
          },
          (error) => {
            console.error('Geolocation error:', error);
            setUserData((prev) => ({
              ...prev,
              location: 'Location access denied',
            }));
          }
        );
      } else {
        setUserData((prev) => ({
          ...prev,
          location: 'Geolocation not supported',
        }));
      }
    };

    fetchUserData();
    detectLocation();
  }, []);

  const handleNext = () => {
    updateFormData('main', { userData });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <button
          className="mb-8 flex items-center space-x-2 bg-white text-teal-700 px-6 py-2 rounded-lg hover:bg-teal-50 transition-all shadow-sm"
          onClick={() => window.history.back()}
        >
          <span>← Back</span>
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left Section */}
            <div className="lg:w-1/2 bg-gradient-to-br from-teal-800 to-teal-900 p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal-600 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
              <div className="relative z-10 space-y-8">
                <div className="flex items-center space-x-3">
                  <Building2 className="w-8 h-8 text-teal-400" />
                  <h2 className="text-3xl font-bold text-white">Why List With Us?</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 bg-teal-800/40 p-4 rounded-xl animate-slide-in">
                    <div className="p-2 bg-teal-500/20 rounded-lg">
                      <Check className="w-6 h-6 text-teal-300" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Zero Brokerage</h3>
                      <p className="text-teal-200 text-sm">No hidden charges</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 bg-teal-800/40 p-4 rounded-xl animate-slide-in-delayed">
                    <div className="p-2 bg-teal-500/20 rounded-lg">
                      <Check className="w-6 h-6 text-teal-300" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Fast Tenants</h3>
                      <p className="text-teal-200 text-sm">Quick responses guaranteed</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 bg-teal-800/40 p-4 rounded-xl animate-slide-in-more-delayed">
                    <div className="p-2 bg-teal-500/20 rounded-lg">
                      <Check className="w-6 h-6 text-teal-300" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Trusted by 1 Lac+ bachelors</h3>
                      <p className="text-teal-200 text-sm">
                        BookHome is revolutionizing the rental scene for bachelors, making it easier than ever to find a
                        place to call home.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="lg:w-1/2 p-8">
              <h1 className="text-2xl font-bold text-teal-900 mb-8">Rent your Property For Free</h1>
              <form className="space-y-6">
                <div id="recaptcha-container"></div>
                
                <div className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="w-full pl-12 pr-4 py-3 border border-teal-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 bg-white"
                      value={userData.name}
                      readOnly
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500 w-5 h-5" />
                    <input
                      type="email"
                      placeholder="Enter your mail"
                      className="w-full pl-12 pr-4 py-3 border border-teal-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 bg-white"
                      value={userData.email}
                      readOnly
                    />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500 w-5 h-5" />
                    <input
                      type="tel"
                      placeholder="Enter mobile number"
                      className="w-full pl-12 pr-4 py-3 border border-teal-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 bg-white"
                      value={userData.mobile}
                      onChange={(e) => setUserData((prev) => ({ ...prev, mobile: e.target.value }))}
                    />
                  </div>

                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Enter your city"
                      className="w-full pl-12 pr-4 py-3 border border-teal-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 bg-white"
                      value={userData.location}
                      readOnly
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="whatsapp"
                    className="w-4 h-4 text-teal-600 border-teal-300 rounded focus:ring-teal-500"
                  />
                  <label htmlFor="whatsapp" className="text-teal-700">
                    Get updates on WhatsApp
                  </label>
                </div>

                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-teal-900">Residential</h2>
                  <div className="flex flex-wrap gap-3">
                    {['Rent', 'Resale', 'PG/Hostel', 'Flatmates'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setSelectedType(type)}
                        className={`px-6 py-2 rounded-lg transition-all ${
                          selectedType === type
                            ? 'bg-teal-600 text-white shadow-lg'
                            : 'bg-teal-50 text-teal-700 hover:bg-teal-100'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <Link to='/propertydetails'>
                  <button
                    type="submit"
                    onClick={handleNext}
                    className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white py-4 rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all transform hover:scale-[1.02] shadow-lg"
                  >
                    Start posting your property for FREE
                  </button>
                </Link>
              </form>

              <div className="mt-6 text-center">
                <a href="#" className="text-teal-600 hover:text-teal-700 hover:underline transition-colors">
                  Looking for a property? Click Here
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
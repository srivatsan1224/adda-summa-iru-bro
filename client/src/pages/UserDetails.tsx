import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, Mail, User, MapPin, Calendar,  Camera, 
  Home,  Ticket, ShoppingBag, Heart, Clock,
  Settings, Bell, CreditCard, Building, Utensils,
} from 'lucide-react';

const UserDetails: React.FC = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const serviceStats = [
    { icon: Building, label: 'Properties Listed', value: 5, color: 'from-rose-500 to-pink-600' },
    { icon: Utensils, label: 'Food Orders', value: 12, color: 'from-amber-500 to-orange-600' },
    { icon: Ticket, label: 'Events Booked', value: 8, color: 'from-violet-500 to-purple-600' },
    { icon: ShoppingBag, label: 'Discount Purchases', value: 15, color: 'from-cyan-500 to-sky-600' }
  ];

  const recentActivities = [
    { icon: Home, text: 'Listed a new property in San Francisco', time: '2 hours ago' },
    { icon: Utensils, text: 'Ordered from Golden Dragon Restaurant', time: '1 day ago' },
    { icon: Ticket, text: 'Booked tickets for Summer Music Festival', time: '3 days ago' },
    { icon: ShoppingBag, text: 'Purchased items with 30% discount', time: '1 week ago' }
  ];

  return (
    <div className="min-h-screen bg-[#1A1F2C] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Content Container */}
        <div className="bg-[#221F26]/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/5">
          {/* Header Section */}
          <div className="relative h-64 bg-gradient-to-r from-[#2C2A3C] to-[#1E1B26]">
            <div className="absolute top-4 right-4 flex space-x-4">
              <button className="p-2 bg-white/5 rounded-full text-white hover:bg-white/10 transition-all duration-300 shadow-lg">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 bg-white/5 rounded-full text-white hover:bg-white/10 transition-all duration-300 shadow-lg">
                <Settings className="h-5 w-5" />
              </button>
            </div>
            <div className="absolute -bottom-20 left-8 flex items-end space-x-6">
              <div className="relative group">
                <div className="h-40 w-40 rounded-full border-4 border-[#2C2A3C] bg-[#1E1B26] shadow-2xl overflow-hidden 
                  transition-transform duration-300 group-hover:scale-105">
                  <img
                    src={user.picture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                  <button className="absolute bottom-0 right-0 p-2 bg-[#1E1B26] rounded-full text-white 
                    hover:bg-[#2C2A3C] transition-all duration-300 shadow-lg">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-white mb-2">{user.name || 'John Doe'}</h1>
                <div className="flex items-center space-x-4">
                  <p className="text-gray-300 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    San Francisco, CA
                  </p>
                  <p className="text-gray-300 flex items-center">
                    <Mail className="h-4 w-4 mr-1" />
                    {user.email || 'john@example.com'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="mt-24 px-8 pb-8">
            {/* Service Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {serviceStats.map((stat, index) => (
                <div key={index} 
                  className={`bg-gradient-to-r ${stat.color} rounded-2xl p-6 text-white shadow-lg 
                    transform hover:scale-105 transition-all duration-300`}>
                  <stat.icon className="h-8 w-8 mb-4" />
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Personal Information */}
              <div className="space-y-6 lg:col-span-1">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Personal Information
                </h2>
                <div className="space-y-4">
                  {[
                    { label: 'Member Since', value: 'March 2024', icon: Calendar },
                    { label: 'Payment Method', value: '•••• 4242', icon: CreditCard },
                    { label: 'Preferences', value: 'Customized', icon: Heart }
                  ].map((item, index) => (
                    <div key={index} 
                      className="bg-[#2C2A3C] rounded-xl p-4 shadow-lg hover:bg-[#332F44] 
                        transition-all duration-300 border border-white/5">
                      <label className="block text-sm font-medium text-gray-300 mb-1">{item.label}</label>
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-semibold text-white">{item.value}</p>
                        <item.icon className="h-4 w-4 text-gray-300" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Recent Activity
                </h2>
                <div className="bg-[#2C2A3C] rounded-xl p-6 shadow-lg border border-white/5">
                  <div className="space-y-6">
                    {recentActivities.map((activity, index) => (
                      <div key={index} 
                        className="flex items-start space-x-4 hover:bg-[#332F44] p-4 rounded-lg 
                          transition-all duration-300">
                        <div className="bg-[#1E1B26] p-2 rounded-lg shadow-lg">
                          <activity.icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-medium">{activity.text}</p>
                          <p className="text-gray-400 text-sm">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="mt-8 bg-[#2C2A3C] text-white py-3 px-6 rounded-xl 
                hover:bg-[#332F44] transition-all duration-300 flex items-center justify-center 
                space-x-2 border border-white/5 shadow-lg transform hover:scale-105"
            >
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
import { Building2, Wallet, Clock, } from 'lucide-react';
import { Link } from 'react-router-dom';

function PropertyDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="flex justify-between items-center animate-fade-in">
          <div className="flex items-center space-x-2">
            <Building2 className="w-8 h-8 text-teal-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
              PropertyHub
            </span>
          </div>
          <a href="#" className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all transform hover:scale-105">
            Looking for property?
          </a>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section */}
          <div className="lg:col-span-1 bg-gradient-to-br from-teal-800 to-teal-900 text-white rounded-2xl p-8 relative overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-600 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="relative z-10 space-y-6">
              <h2 className="text-2xl font-bold">Why List With Us?</h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4 bg-teal-800/50 p-4 rounded-xl animate-slide-in">
                  <div className="p-3 bg-teal-600 rounded-lg">
                    <Wallet className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Zero Brokerage</h3>
                    <p className="text-sm text-teal-100">No hidden charges or fees</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 bg-teal-800/50 p-4 rounded-xl animate-slide-in-delayed">
                  <div className="p-3 bg-teal-600 rounded-lg">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Fast Tenants</h3>
                    <p className="text-sm text-teal-100">Find tenants faster</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold mb-3">Trusted by 1Lac+ bachelors</h3>
                <p className="text-sm leading-relaxed text-teal-100">
                  bachelor.com is revolutionizing the rental scene for bachelors,
                  making it easier than ever to find a place to call home. Gone are
                  the days of struggling with judgmental landlords and endless
                  searches for a roommate-friendly space. Bachelor.com offers a
                  wide range of options tailored to the needs of singles and young
                  professionals.
                </p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
              {/* Looking for a Property */}
              <div className="flex justify-end mb-4">
                <a
                  href="#"
                  className="text-sm text-teal-600 bg-teal-50 px-4 py-2 rounded-lg hover:bg-teal-100 transition"
                >
                  Looking for a property? <span className="font-bold">Click Here</span>
                </a>
              </div>

              <h2 className="text-xl font-bold mb-4">You have already posted 1 property</h2>

              {/* Tabs */}
              <div className="flex flex-wrap gap-3 mb-6">
                {[
                  "All",
                  "Rent",
                  "Sale",
                  "Commercial-Rent",
                  "Commercial-Sale",
                  "PG/Hostel",
                  "Flatmates",
                  "Land/Plot",
                ].map((tab) => (
                  <button
                    key={tab}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg border-2 border-teal-100 hover:border-teal-600 hover:bg-teal-50 transition-all"
                  >
                    <span className="text-sm font-medium">{tab}</span>
                  </button>
                ))}
              </div>

              {/* Property Card */}
              <div className="bg-gradient-to-r from-teal-50 to-teal-100 p-6 rounded-xl mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="px-3 py-1 bg-teal-600 text-white text-sm rounded-full">Inactive</span>
                  <span className="text-teal-600 font-semibold">For Rent</span>
                </div>
                <h3 className="text-xl font-bold text-teal-900 mb-2">1 BHK House for Rent in Chennai</h3>
                <p className="text-teal-600 mb-2">Independent House, 28/6, 16th cross road, Chennai</p>
                <p className="text-teal-600 mb-4">Rent: ₹22 · <span className="font-medium">Chennai</span></p>
                <div className="flex space-x-4">
                  <button className="px-4 py-2 bg-teal-200 text-teal-700 rounded-lg hover:bg-teal-300 transition-all">
                    Edit
                  </button>
                  <button className="px-4 py-2 bg-teal-200 text-teal-700 rounded-lg hover:bg-teal-300 transition-all">
                    Upload Media
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="relative text-center mb-8">
                <hr className="border-teal-200" />
                <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-sm text-teal-600">
                  OR
                </span>
              </div>

              {/* New Property Section */}
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-teal-900">New Property?</h3>
                <p className="text-teal-600">Post your property for free</p>
                <Link to='/propertyform'>
                  <button className="px-8 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg hover:from-teal-700 hover:to-teal-800 transition-all transform hover:scale-105 shadow-lg">
                    Post Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDashboard;
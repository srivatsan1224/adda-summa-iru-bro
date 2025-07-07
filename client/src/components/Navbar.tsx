import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Search, Bell, User, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [user, setUser] = useState<{ name?: string; picture?: string }>({});

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    setIsAuthenticated(!!storedUser?.name);
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);
  
  // Added function to toggle services dropdown
  const toggleServicesDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsServicesDropdownOpen(!isServicesDropdownOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (isDropdownOpen && !(event.target as HTMLElement).closest(".dropdown")) {
        closeDropdown();
      }
      if (isServicesDropdownOpen && !(event.target as HTMLElement).closest(".services-dropdown")) {
        setIsServicesDropdownOpen(false);
      }
    };
    
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isDropdownOpen, isServicesDropdownOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent">
                Bachelors
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 relative">
              <Link to="/" className="text-gray-600 hover:text-emerald-600 transition-colors">Home</Link>

              <div className="relative">
                <button
                  onClick={toggleServicesDropdown}
                  className="text-gray-600 hover:text-emerald-600 transition-colors"
                >
                  Services
                </button>
                {isServicesDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 services-dropdown">
                    <Link
                      to="/housing"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setIsServicesDropdownOpen(false)}
                    >
                      Housing
                    </Link>
                    <Link
                      to="/home-food"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setIsServicesDropdownOpen(false)}
                    >
                      Home Food
                    </Link>
                    <Link
                      to="/jobs"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setIsServicesDropdownOpen(false)}
                    >
                      Jobs
                    </Link>
                    <Link
                      to="/rental"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setIsServicesDropdownOpen(false)}
                    >
                      Property Rental
                    </Link>
                    <Link
                      to="/parttime"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setIsServicesDropdownOpen(false)}
                    >
                      Part-time Jobs
                    </Link>
                    <Link
                      to="/events"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setIsServicesDropdownOpen(false)}
                    >
                      Events
                    </Link>
                    <Link
                      to="/discount-bazaar"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setIsServicesDropdownOpen(false)}
                    >
                      Discount Bazaar
                    </Link>
                  </div>
                )}
              </div>
              
              <Link to="/properties" className="text-gray-600 hover:text-emerald-600 transition-colors">Properties</Link>
              <Link to="/rental/home" className="text-gray-600 hover:text-emerald-600 transition-colors">Rental</Link>
              <Link to="/parttime/home" className="text-gray-600 hover:text-emerald-600 transition-colors">Jobs</Link>
              <a
                href="/#exclusive-services"
                className="text-gray-600 hover:text-emerald-600 transition-colors"
              >
                Services
              </a>
              <Link to="/about" className="text-gray-600 hover:text-emerald-600 transition-colors">About</Link>
              <a href="/#footer" className="text-gray-600 hover:text-emerald-600 transition-colors">Contact</a>
            </div>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-emerald-600 transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-emerald-600 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-emerald-600 transition-colors">
                <ShoppingCart className="w-5 h-5" />
              </button>
              
              {!isAuthenticated ? (
                <Link to="/login" className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-full hover:shadow-lg transition-all">
                  <User className="w-4 h-4" />
                  <span>Sign In</span>
                </Link>
              ) : (
                <div className="relative dropdown">
                  <div 
                    className="cursor-pointer flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-full hover:shadow-lg transition-all" 
                    onClick={toggleDropdown}
                  >
                    {user?.picture ? (
                      <img
                        src={user.picture}
                        alt="User Profile"
                        className="w-6 h-6 rounded-full"
                      />
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                    <span>{user.name || "Profile"}</span>
                  </div>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        onClick={closeDropdown}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        onClick={closeDropdown}
                      >
                        Settings
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          closeDropdown();
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-600 hover:text-emerald-600 transition-colors"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <motion.div
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            variants={{
              open: { opacity: 1, height: "auto" },
              closed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" className="block px-3 py-2 rounded-md text-gray-600 hover:text-emerald-600 hover:bg-gray-50 transition-colors" onClick={() => setIsOpen(false)}>Home</Link>
              <div className="relative">
                <button
                  onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                  className="w-full text-left px-3 py-2 rounded-md text-gray-600 hover:text-emerald-600 hover:bg-gray-50 transition-colors"
                >
                  Services
                </button>
                {isServicesDropdownOpen && (
                  <div className="pl-4">
                    <Link
                      to="/housing"
                      className="block px-3 py-2 rounded-md text-gray-600 hover:text-emerald-600 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Housing
                    </Link>
                    <Link
                      to="/home-food"
                      className="block px-3 py-2 rounded-md text-gray-600 hover:text-emerald-600 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Home Food
                    </Link>
                    <Link
                      to="/jobs"
                      className="block px-3 py-2 rounded-md text-gray-600 hover:text-emerald-600 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Jobs
                    </Link>
                    <Link
                      to="/rental"
                      className="block px-3 py-2 rounded-md text-gray-600 hover:text-emerald-600 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Property Rental
                    </Link>
                    <Link
                      to="/parttime"
                      className="block px-3 py-2 rounded-md text-gray-600 hover:text-emerald-600 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Part-time Jobs
                    </Link>
                    <Link
                      to="/events"
                      className="block px-3 py-2 rounded-md text-gray-600 hover:text-emerald-600 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Events
                    </Link>
                    <Link
                      to="/discount-bazaar"
                      className="block px-3 py-2 rounded-md text-gray-600 hover:text-emerald-600 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Discount Bazaar
                    </Link>
                  </div>
                )}
              </div>
              <Link to="/properties" className="block px-3 py-2 rounded-md text-gray-600 hover:text-emerald-600 hover:bg-gray-50 transition-colors" onClick={() => setIsOpen(false)}>Properties</Link>
              <Link to="/rental/home" className="block px-3 py-2 rounded-md text-gray-600 hover:text-emerald-600 hover:bg-gray-50 transition-colors" onClick={() => setIsOpen(false)}>Rental</Link>
              <Link to="/parttime/home" className="block px-3 py-2 rounded-md text-gray-600 hover:text-emerald-600 hover:bg-gray-50 transition-colors" onClick={() => setIsOpen(false)}>Jobs</Link>
              <Link to="/about" className="block px-3 py-2 rounded-md text-gray-600 hover:text-emerald-600 hover:bg-gray-50 transition-colors" onClick={() => setIsOpen(false)}>About</Link>
              <a href="/#footer" className="block px-3 py-2 rounded-md text-gray-600 hover:text-emerald-600 hover:bg-gray-50 transition-colors" onClick={() => setIsOpen(false)}>Contact</a>
            </div>
            <div className="px-5 py-3 border-t border-gray-100">
              {!isAuthenticated ? (
                <Link to="/login" className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-full hover:shadow-lg transition-all">
                  <User className="w-4 h-4" />
                  <span>Sign In</span>
                </Link>
              ) : (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-full hover:shadow-lg transition-all"
                >
                  <User className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </nav>
      <div className="h-16" />
    </>
  );
};

export default Navbar;
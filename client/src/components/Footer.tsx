import { Link } from 'react-router-dom';
import { Facebook, Instagram, Globe, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10" id="footer">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Description */}
        <div>
          <div className="mb-4">
            <h1 className="text-3xl font-bold">BACHELORS</h1>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Your one-stop platform for housing, food, events, and more. Making bachelor life easier.
          </p>
          <p className="mt-4 text-sm text-gray-500">© {new Date().getFullYear()} All Rights Reserved</p>
        </div>

        {/* Housing Services */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Housing</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/housinghome" className="text-sm text-gray-400 hover:text-white transition-colors">
                Housing Home
              </Link>
            </li>
            <li>
              <Link to="/propertylist" className="text-sm text-gray-400 hover:text-white transition-colors">
                Find Properties
              </Link>
            </li>
            <li>
              <Link to="/propertydashboard" className="text-sm text-gray-400 hover:text-white transition-colors">
                Post Property
              </Link>
            </li>
            <li>
              <Link to="/housinghome/paintingandcleaning" className="text-sm text-gray-400 hover:text-white transition-colors">
                Painting & Cleaning
              </Link>
            </li>
            <li>
              <Link to="/housinghome/packersandmovers" className="text-sm text-gray-400 hover:text-white transition-colors">
                Packers & Movers
              </Link>
            </li>
            <li>
              <Link to="/housinghome/payrent" className="text-sm text-gray-400 hover:text-white transition-colors">
                Pay Rent
              </Link>
            </li>
          </ul>
        </div>

        {/* Food & Events */}
        <div>
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Food</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/foodhome" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Food Home
                </Link>
              </li>
              <li>
                <Link to="/restaurant" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Restaurants
                </Link>
              </li>
              <li>
                <Link to="/cart1" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Food Cart
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Events</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/eventshome" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Events Home
                </Link>
              </li>
              <li>
                <Link to="/explore-events" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Explore Events
                </Link>
              </li>
              <li>
                <Link to="/eventsForm" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Create Event
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
          <div className="flex items-center space-x-4 mb-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Globe size={20} />
            </a>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Phone size={16} />
            <a href="tel:+18008543680" className="hover:text-white transition-colors">
              +1 800 854-36-80
            </a>
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/profile" className="text-sm text-gray-400 hover:text-white transition-colors">
                  My Profile
                </Link>
              </li>
              <li>
                <Link to="/discount" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Discounts
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-gray-800 pt-6">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-gray-500">
          <Link to="/privacy-policy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-white transition-colors">
            Terms of Use
          </Link>
          <Link to="/refunds" className="hover:text-white transition-colors">
            Sales and Refunds
          </Link>
          <Link to="/legal" className="hover:text-white transition-colors">
            Legal
          </Link>
          <a href="#" className="hover:text-white transition-colors">
            Sitemap
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
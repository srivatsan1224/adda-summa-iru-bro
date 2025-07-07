import PropertyDashboard from '../../components/Housing/PropertyDashboard'
import { Link } from 'react-router-dom'

export default function PostProperty() {
  return (
    <div>
      <div className="max-w-7xl mx-auto p-6 pb-1">
        {/* Back Button */}
        <Link to='/housinghome'>
      <button className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-full mb-6 hover:bg-gray-800 transition">
        <span>Back</span>
      </button>
      </Link>

      {/* Page Title */}
      </div>
      <PropertyDashboard/>
      
    </div>
  )
}

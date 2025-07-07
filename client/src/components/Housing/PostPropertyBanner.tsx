import { Link } from "react-router-dom";

const PostPropertySection = () => {
  return (
    <div className="bg-yellow-50 rounded-lg p-6 flex items-center justify-between max-w-5xl mx-auto my-10 shadow-sm">
      {/* Text Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-800">
          Post your Property for{" "}
          <span className="font-bold italic text-black">free</span>
        </h3>
        <p className="text-sm text-gray-600">
          List it on Magicbricks and get genuine leads
        </p>
      </div>
      {/* Button Section */}
      <Link to='/propertydashboard'>
      <button className="flex items-center bg-yellow-400 text-black font-medium text-sm px-6 py-3 rounded-full hover:bg-yellow-500 transition">
        Post Property{" "}
        <span className="ml-2 text-xs bg-white text-yellow-500 font-bold py-1 px-2 rounded-full">
          FREE
        </span>
      </button>
      </Link>
    </div>
  );
};

export default PostPropertySection;

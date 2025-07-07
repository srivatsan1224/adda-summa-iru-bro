

const NewsletterSection = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-600 to-violet-700 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-6">Stay in the Loop</h2>
          <p className="text-xl text-indigo-100 mb-10">
            Get exclusive access to upcoming events and special offers directly in your inbox
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow max-w-md px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-lg"
            />
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-indigo-50 transition-all transform hover:scale-105 text-lg shadow-lg">
              Subscribe Now
            </button>
          </div>
          <p className="text-sm text-indigo-200 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSection;

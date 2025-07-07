import { testimonials } from "../../assets/HomePage/testimonials";
import { Star } from "lucide-react";

const Testimonials = () => {
  return (
    <div className="py-16 px-4 bg-white">
      <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-600">
        What Our Users Say
      </h2>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-emerald-200"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.designation}</p>
                </div>
              </div>
              
              <div className="flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, index) => (
                  <Star
                    key={index}
                    className="w-5 h-5 fill-emerald-500 text-emerald-500"
                  />
                ))}
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">{testimonial.content}</p>
            
            <div className="pt-4 border-t border-gray-100">
              <button className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors">
                Read full story →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
import { useState } from 'react';
import { MapPin, Star, Shield, Clock, Users, Check, X, Package, ChevronDown, ChevronUp } from 'lucide-react';

const PackersMovers = () => {
  const [selectedTab, setSelectedTab] = useState('Within City');
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const features = [
    {
      icon: <Shield className="w-8 h-8 text-white" />,
      title: "Bachelor Protect",
      description: "Household damage protection"    
    },
    {
      icon: <Star className="w-8 h-8 text-white" />,
      title: "4.8 / 5 Rating",
      description: "Timely Pickup & Delivery"
    },
    {
      icon: <Users className="w-8 h-8 text-white" />,
      title: "4.9 / 5",
      description: "Reliable Service"
    }
  ];

  const services = [
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Within City",
      discount: "Upto 25% off"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Between City",
      discount: "Upto 25% off"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "City Tempo",
      discount: "Upto 50% off"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Vehicle Shifting",
      discount: "Just Launched"
    }
  ];

  const steps = [
    {
      icon: <MapPin className="w-8 h-8 text-purple-600" />,
      title: "Share your Shifting Requirement",
      description: "Help us by providing when and where do you want to move"
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-600" />,
      title: "Receive Free Instant Quote",
      description: "Get guaranteed lowest priced quote for your shifting instantly"
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: "Assign Quality Service Expert",
      description: "To ensure safe relocation quality service expert will be allotted for your movement"
    },
    {
      icon: <Package className="w-8 h-8 text-purple-600" />,
      title: "Leave the Heavy Lifting to Us",
      description: "Enjoy hassle-free on time movement of your household goods"
    }
  ];

  const testimonials = [
    {
      name: "R K Mishra",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
      rating: 5,
      type: "Intercity Movement",
      review: "I am extremely happy with my experience with Bachelor movers and packers team. Being a senior citizen while shift from Hyderabad to Ranchi I was worried about my belongings but the team handled everything professionally."
    },
    {
      name: "Aman Trivedi",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces",
      rating: 5,
      type: "Intercity Movement",
      review: "Extraordinary services and customer support provided by Bachelor Packers and Movers for my shifting from Faridabad to Lucknow. Extremely happy with their service."
    },
    {
      name: "Priya Singh",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces",
      rating: 5,
      type: "Local Movement",
      review: "Very professional team and great service. They took care of all my belongings with utmost care. Highly recommended!"
    }
  ];

  const faqs = [
    {
      question: "Can I change my movement date?",
      answer: "Yes, we understand that plans can change at any time. This is why you get a Free Reschedule policy when you book with Bachelor Packers and Movers."
    },
    {
      question: "Is it possible to find a better price for packers and movers?",
      answer: "We guarantee the best market prices for our services. If you find a better price, we'll match it. Our focus is on providing quality service at competitive rates."
    },
    {
      question: "Why should I pay token in advance before the move?",
      answer: "The token amount helps us secure your booking and arrange the necessary resources for your move. It ensures commitment from both parties and helps us provide better service."
    },
    {
      question: "What safety measures do you take during COVID-19?",
      answer: "We follow all safety protocols including sanitization of equipment, temperature checks of staff, use of masks and gloves, and maintaining social distance wherever possible."
    }
  ];

  const comparisonData = [
    { service: "Vehicle Assurance", local: true, bachelor: true },
    { service: "Verified Professional Driver", local: false, bachelor: true },
    { service: "Regular Update", local: false, bachelor: true },
    { service: "Packaging & Unpacking Of household goods", local: true, bachelor: true },
    { service: "Dismantling & Re-Assemble Of Cot", local: true, bachelor: true },
    { service: "Labour", local: false, bachelor: true },
    { service: "Bubble/Foam Wrapping Of", local: false, bachelor: true },
    { service: "On Demand Warehouse Storage", local: false, bachelor: true },
    { service: "Damage Assurance", local: false, bachelor: true }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Logo */}
      <div className="bg-gradient-to-r from-purple-700 to-purple-900 text-white py-16">
        <div className="container mx-auto px-4">
          {/* Logo */}
          <div className="flex items-center mb-8">
            <div className="bg-white p-3 rounded-full">
              <Package className="w-8 h-8 text-purple-600" />
            </div>
            <span className="ml-3 text-2xl font-bold">Bachelor</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Best Packers And Movers In Mumbai
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            Affordable Packers & Movers in Mumbai! Fast and secure house shifting with guaranteed professionalism.
          </p>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 flex items-center space-x-4">
                <div className="bg-purple-500/20 p-3 rounded-lg">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm opacity-75">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="max-w-3xl mx-auto">
          <div className="relative w-full" style={{ paddingTop: '40%' }}>
            <iframe
              className="absolute top-0 left-0 right-0 bottom-0 m-auto"
              src="https://www.youtube.com/embed/p5jPznZHeP4?autoplay=1"
              title="Bachelor Packers and Movers"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ width: '90%', height: '90%' }}
            ></iframe>
          </div>
        </div>
      </div>



      {/* Form Section */}
      <div className="container mx-auto px-4 mt-16">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-semibold mb-6">Where are you going to relocate?</h2>
          
          {/* Tabs */}
          <div className="flex space-x-4 mb-6">
            {['Within City', 'Between Cities', 'City Tempo'].map((tab) => (
              <button
                key={tab}
                className={`px-6 py-2 rounded-full ${
                  selectedTab === tab
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
                onClick={() => setSelectedTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select City
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Bangalore">Bangalore</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Shifting From
              </label>
              <input
                type="text"
                placeholder="Enter locality"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Shifting To
              </label>
              <input
                type="text"
                placeholder="Enter locality"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number
              </label>
              <div className="flex">
                <select className="w-24 p-3 border border-gray-300 rounded-l-lg">
                  <option value="+91">+91</option>
                </select>
                <input
                  type="tel"
                  placeholder="Enter mobile number"
                  className="flex-1 p-3 border border-gray-300 rounded-r-lg"
                />
              </div>
            </div>

            <button className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors">
              Check Prices
            </button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-semibold mb-8">Services We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                {service.icon}
              </div>
              <h3 className="font-semibold mb-2">{service.title}</h3>
              <span className="inline-block bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full">
                {service.discount}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* How it Works */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-semibold mb-8">How Bachelor Packers and Movers Works?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-1/2 w-full border-t-2 border-dashed border-purple-200" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Happy Customers Section */}
      <div className="container mx-auto px-4 py-16 bg-gray-50">
        <h2 className="text-2xl font-semibold mb-8 text-center">Our Happy Customers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.type}</p>
                </div>
              </div>
              <div className="flex mb-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700">{testimonial.review}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-semibold mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <span className="font-medium">{faq.question}</span>
                {openFaq === index ? (
                  <ChevronUp className="w-5 h-5 text-purple-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-purple-600" />
                )}
              </button>
              {openFaq === index && (
                <div className="px-6 py-4 bg-gray-50">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-semibold mb-8">Service Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left">Services</th>
                <th className="px-6 py-4 text-center">Local Packers & Movers</th>
                <th className="px-6 py-4 text-center">Bachelor Packers & Movers</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="px-6 py-4">{item.service}</td>
                  <td className="px-6 py-4 text-center">
                    {item.local ? (
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-red-500 mx-auto" />
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {item.bachelor ? (
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-red-500 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PackersMovers;
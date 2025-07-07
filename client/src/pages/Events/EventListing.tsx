import  { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronDown, ChevronUp, Minus, Plus, MapPin, Calendar, Users, Clock, Star, Shield, Award } from 'lucide-react';

interface Highlight {
  title: string;
  description: string;
}

interface AgendaItem {
  id: number;
  title: string;
  time: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface Venue {
  name: string;
  address: string;
}

interface Event {
  id: number;
  title: string;
  image: string;
  date: string;
  location: string;
  price: string;
  rating: number;
  reviews: number;
  tag: string;
  time: string;
  enrolled: number;
  venue: Venue;
  highlights: Highlight[];
  agenda: AgendaItem[];
  faqs: FAQ[];
}

function EventListing() {
  const { id } = useParams(); // Use useParams first
  const navigate = useNavigate(); // Then use navigate
  console.log('EventListing', id);
  
  const [event, setEvent] = useState<Event | null>(null);
  const [relatedEvents, setRelatedEvents] = useState<Event[]>([]);
  const [ticketCount, setTicketCount] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/events/${id}`);
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };

    const fetchRelatedEvents = async () => {
      try {
        const response = await fetch('http://localhost:3000/events');
        const data = await response.json();
        // Filter out current event and limit to 3 events
        const filtered = data
          .filter((e: Event) => e.id !== Number(id))
          .slice(0, 3);
        setRelatedEvents(filtered);
      } catch (error) {
        console.error('Error fetching related events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
    fetchRelatedEvents();
  }, [id]);

  if (loading || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const priceNumber = parseInt(event.price.replace(/[^0-9]/g, ''));

  // Create highlights array only after we confirm event exists
  const highlights = event.highlights.map((highlight, index) => {
    const icons = [Star, Shield, Award];
    const Icon = icons[index] || Star; // Fallback to Star if index is out of bounds
    return {
      icon: Icon,
      title: highlight.title,
      description: highlight.description
    };
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="glass-effect sticky top-0 z-50 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200">
            <ChevronLeft className="w-5 h-5 mr-1" />
            <span>back</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Hero Image */}
            <div className="relative rounded-xl overflow-hidden card-shadow mb-8 group">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="text-white">
                    <h1 className="text-5xl font-bold mb-4">{event.title}</h1>
                    <div className="flex flex-wrap items-center gap-6 text-gray-200">
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 mr-2" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 mr-2" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 mr-2" />
                        <span>{event.enrolled.toLocaleString()}+ Enrolled</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {highlights.map(({ icon: Icon, title, description }, index) => (
                <div key={index} className="bg-white p-6 rounded-xl card-shadow hover-scale text-center">
                  <Icon className="w-8 h-8 mx-auto mb-3 text-indigo-600" />
                  <h3 className="font-semibold mb-1">{title}</h3>
                  <p className="text-sm text-gray-600">{description}</p>
                </div>
              ))}
            </div>

            {/* Venue Details */}
            <div className="bg-white p-6 rounded-xl card-shadow mb-8 hover-scale">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">{event.venue.name}</h2>
                  <p className="text-gray-600">{event.venue.address}</p>
                </div>
              </div>
            </div>

            {/* Agenda */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-6 gradient-text">Event Schedule</h2>
              <div className="space-y-3">
                {event.agenda.map((item) => (
                  <div key={item.id} className="agenda-item p-4 rounded-xl card-shadow hover:bg-gradient-to-r hover:from-white hover:to-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center text-white font-bold">
                        {item.id}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-500">{item.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQs */}
            <section className="bg-white p-8 rounded-xl card-shadow">
              <h2 className="text-2xl font-bold mb-6 gradient-text">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {event.faqs.map((faq, index) => (
                  <div key={index} className="faq-item border border-gray-100 rounded-lg overflow-hidden">
                    <button
                      className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    >
                      <span className="font-medium text-left">{faq.question}</span>
                      {openFaq === index ? (
                        <ChevronUp className="w-5 h-5 text-indigo-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    {openFaq === index && (
                      <div className="px-6 py-4 bg-gradient-to-br from-indigo-50 to-blue-50">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Ticket Selection and Related Events */}
          <div className="lg:col-span-1">
            {/* Ticket Selection */}
            <div className="glass-effect p-8 rounded-xl card-shadow mb-8 sticky top-24 z-50">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-bold gradient-text">{event.price}</h3>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  {event.tag}
                </span>
              </div>
              <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg">
                <span className="text-gray-600">Number of Passes</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                    className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-medium">{ticketCount}</span>
                  <button
                    onClick={() => setTicketCount(ticketCount + 1)}
                    className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center mb-6 p-4 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-lg">
                <span className="font-medium text-indigo-900">Total Amount</span>
                <span className="text-xl font-bold text-indigo-900">
                  ${(priceNumber * ticketCount).toLocaleString()}
                </span>
              </div>
              <button className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-4 rounded-lg font-medium hover:from-indigo-700 hover:to-blue-600 transition-all duration-200 shadow-md hover:shadow-lg">
                Reserve Your Spot
              </button>
            </div>

            {/* Related Events */}
            <div>
              <h3 className="text-xl font-bold mb-6 gradient-text">Similar Events You'll Love</h3>
              <div className="space-y-6">
                {relatedEvents.map((event) => (
                  <div key={event.id} className="bg-white rounded-xl overflow-hidden card-shadow hover-scale">
                    <div className="relative">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-green-600">
                        {event.rating} ★
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="font-bold text-lg mb-2">{event.title}</h4>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{event.date}</span>
                        </div>
                        <span className="text-green-600 font-bold">{event.price}</span>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-sm text-gray-500">{event.enrolled.toLocaleString()}+ Enrolled</span>
                        <button className="text-indigo-600 font-medium hover:text-indigo-700">
                          Learn More →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default EventListing;

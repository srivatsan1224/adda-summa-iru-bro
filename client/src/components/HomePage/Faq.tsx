import { useState } from "react";
import { ChevronDown, X } from "lucide-react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What services does the app provide?",
      answer: "Our app offers housing rentals, furniture and appliance rentals, and essential lifestyle services, all in one place."
    },
    {
      question: "How does the app ensure safety and reliability?",
      answer: "We verify all listings and provide customer support to ensure a secure experience."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept various payment methods including credit/debit cards, UPI, and net banking."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-16 px-4 animate-fade-in">
      <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-600">
        Frequently Asked Questions
      </h2>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="rounded-2xl border border-emerald-100 bg-white shadow-sm hover:shadow-md transition-all duration-300"
          >
            <button
              className="flex w-full items-center justify-between p-6 text-left"
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            >
              <span className="text-lg font-medium text-gray-900">{faq.question}</span>
              {activeIndex === index ? (
                <X className="h-5 w-5 text-emerald-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-emerald-500" />
              )}
            </button>

            {activeIndex === index && (
              <div className="px-6 pb-6 animate-fade-in">
                <p className="text-gray-600">{faq.answer}</p>
                <button className="mt-4 px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full font-medium hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
                  Learn More
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
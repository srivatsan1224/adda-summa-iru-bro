import React, { useState, useCallback, ChangeEvent, forwardRef, memo } from "react";
import {
  CalendarDays,
  MapPin,
  Clock,
  Users,
  Tag,
  Star,
  DollarSign,
  Building2,
  Plus,
  Send,
  Image,
  Info,
  Loader2,
} from "lucide-react";
import type { EventData } from '../data/eventData'
import { BlobServiceClient } from "@azure/storage-blob";

// Azure Storage configuration
const AZURE_STORAGE_ACCOUNT = "roshan";
const CONTAINER_NAME = "uploads";
const SAS_TOKEN =
  "sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2025-04-02T18:19:43Z&st=2025-02-08T10:19:43Z&spr=https&sig=4%2BMge9lZm1bQP7Zksl%2FgOsbL7oYNrXBiTkGOFlDJ0EY%3D";

// Memoized InputWithIcon component using forwardRef to help keep focus stable
const InputWithIcon = memo(
  forwardRef<
    HTMLInputElement,
    React.InputHTMLAttributes<HTMLInputElement> & { icon: any }
  >(({ icon: Icon, ...props }, ref) => (
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
      </div>
      <input
        ref={ref}
        {...props}
        className="pl-10 border-2 border-gray-200 rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300 bg-white shadow-sm"
      />
    </div>
  ))
);

export default function EventForm() {
  const [event, setEvent] = useState<EventData>({
    title: "",
    image: "",
    date: "",
    location: "",
    price: "",
    rating: "",
    reviews: "",
    tag: "",
    time: "",
    enrolled: "",
    venue: {
      name: "",
      address: "",
    },
    highlights: [{ title: "", description: "" }],
    agenda: [{ id: 1, title: "", time: "" }],
    faqs: [{ question: "", answer: "" }],
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      if (name.includes("-")) {
        const [field, index, key] = name.split("-");
        if (field === "highlight") {
          setEvent((prev) => {
            const updatedHighlights = [...prev.highlights];
            updatedHighlights[Number(index)] = {
              ...updatedHighlights[Number(index)],
              [key]: value,
            };
            return { ...prev, highlights: updatedHighlights };
          });
        } else if (field === "agenda") {
          setEvent((prev) => {
            const updatedAgenda = [...prev.agenda];
            updatedAgenda[Number(index)] = {
              ...updatedAgenda[Number(index)],
              [key]: value,
            };
            return { ...prev, agenda: updatedAgenda };
          });
        } else if (field === "faq") {
          setEvent((prev) => {
            const updatedFaqs = [...prev.faqs];
            updatedFaqs[Number(index)] = {
              ...updatedFaqs[Number(index)],
              [key]: value,
            };
            return { ...prev, faqs: updatedFaqs };
          });
        }
      } else {
        setEvent((prev) => ({ ...prev, [name]: value }));
      }
    },
    []
  );

  const handleVenueChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setEvent((prev) => ({
        ...prev,
        venue: { ...prev.venue, [name]: value },
      }));
    },
    []
  );

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const blobServiceClient = new BlobServiceClient(
        `https://${AZURE_STORAGE_ACCOUNT}.blob.core.windows.net?${SAS_TOKEN}`
      );
      const containerClient =
        blobServiceClient.getContainerClient(CONTAINER_NAME);
      const blobName = `${Date.now()}-${file.name}`;
      const blobClient = containerClient.getBlockBlobClient(blobName);
      const options = { blobHTTPHeaders: { blobContentType: file.type } };
      await blobClient.uploadBrowserData(file, options);
      setEvent((prev) => ({ ...prev, image: blobClient.url }));
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const addHighlight = useCallback(() => {
    setEvent((prev) => ({
      ...prev,
      highlights: [...prev.highlights, { title: "", description: "" }],
    }));
  }, []);

  const addAgenda = useCallback(() => {
    setEvent((prev) => ({
      ...prev,
      agenda: [
        ...prev.agenda,
        { id: prev.agenda.length + 1, title: "", time: "" },
      ],
    }));
  }, []);

  const addFAQ = useCallback(() => {
    setEvent((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: "", answer: "" }],
    }));
  }, []);

  const handleSubmit = useCallback(async () => {
    // Basic client-side validation
    if (!event.title.trim()) {
      alert("Event title is required");
      return;
    }
    if (!event.date) {
      alert("Event date is required");
      return;
    }
  
    try {
      // Optionally, you might show a loading indicator here
  
      // Post the event data to your backend API endpoint
      const response = await fetch("http://localhost:3000/events/createEvent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const result = await response.json();
      console.log("Event submitted successfully:", result);
  
      // Optionally clear the form or navigate to another page after success
      alert("Event submitted successfully!");
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Failed to submit event. Please try again.");
    }
  }, [event]);
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow-2xl rounded-2xl p-8 border border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Create New Event</h2>
          <Info className="h-6 w-6 text-blue-500" />
        </div>

        <div className="space-y-8">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <InputWithIcon
                icon={Tag}
                name="title"
                value={event.title}
                onChange={handleChange}
                placeholder="Event Title"
              />
            </div>
            <div className="col-span-2">
              <div className="relative group space-y-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Image className="h-5 w-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600">
                    Event Image
                  </span>
                </div>
                <input
                  type="file"
                  onChange={handleImageUpload}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600 text-sm text-gray-500 file:transition-colors file:cursor-pointer w-full
                  border-2 border-gray-200 rounded-xl p-2 hover:border-blue-300 transition-all duration-200"
                  accept="image/*"
                  disabled={uploading}
                />
                {uploading && (
                  <div className="flex items-center space-x-2 text-blue-500">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span className="text-sm">Uploading image...</span>
                  </div>
                )}
                {event.image && !uploading && (
                  <div className="space-y-2">
                    <p className="text-sm text-green-600 font-medium">
                      Image uploaded successfully!
                    </p>
                    <div className="relative w-full h-48 rounded-xl overflow-hidden border-2 border-gray-200">
                      <img
                        src={event.image}
                        alt="Event preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <InputWithIcon
              icon={CalendarDays}
              name="date"
              type="date"
              value={event.date}
              onChange={handleChange}
            />
            <InputWithIcon
              icon={MapPin}
              name="location"
              value={event.location}
              onChange={handleChange}
              placeholder="Location"
            />
            <InputWithIcon
              icon={DollarSign}
              name="price"
              value={event.price}
              onChange={handleChange}
              placeholder="Price"
              type="number"
              min="0"
              step="0.01"
            />
            <InputWithIcon
              icon={Star}
              name="rating"
              value={event.rating}
              onChange={handleChange}
              placeholder="Rating (1-5)"
              type="number"
              min="1"
              max="5"
              step="0.1"
            />
            <InputWithIcon
              icon={Users}
              name="reviews"
              value={event.reviews}
              onChange={handleChange}
              placeholder="Number of Reviews"
              type="number"
              min="0"
            />
            <InputWithIcon
              icon={Clock}
              name="time"
              value={event.time}
              onChange={handleChange}
              placeholder="Event Time"
              type="time"
            />
            <InputWithIcon
              icon={Users}
              name="enrolled"
              value={event.enrolled}
              onChange={handleChange}
              placeholder="Enrolled Count"
              type="number"
              min="0"
            />
          </div>

          {/* Venue Information */}
          <div className="border-t border-gray-100 pt-8">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
              <Building2 className="h-6 w-6 text-blue-500" />
              Venue Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputWithIcon
                icon={Building2}
                name="name"
                value={event.venue.name}
                onChange={handleVenueChange}
                placeholder="Venue Name"
              />
              <InputWithIcon
                icon={MapPin}
                name="address"
                value={event.venue.address}
                onChange={handleVenueChange}
                placeholder="Venue Address"
              />
            </div>
          </div>

          {/* Highlights */}
          <div className="border-t border-gray-100 pt-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-800">
                Highlights
              </h3>
              <button
                onClick={addHighlight}
                className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition-colors shadow-sm hover:shadow-md active:scale-95 transform transition-transform"
              >
                <Plus className="h-5 w-5" /> Add Highlight
              </button>
            </div>
            <div className="space-y-4">
              {event.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-gray-50 rounded-xl border-2 border-gray-100 hover:border-blue-200 transition-colors"
                >
                  <input
                    name={`highlight-${index}-title`}
                    value={highlight.title}
                    onChange={handleChange}
                    placeholder="Highlight Title"
                    className="border-2 border-gray-200 rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300"
                  />
                  <input
                    name={`highlight-${index}-description`}
                    value={highlight.description}
                    onChange={handleChange}
                    placeholder="Highlight Description"
                    className="border-2 border-gray-200 rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Agenda */}
          <div className="border-t border-gray-100 pt-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-800">Agenda</h3>
              <button
                onClick={addAgenda}
                className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition-colors shadow-sm hover:shadow-md active:scale-95 transform transition-transform"
              >
                <Plus className="h-5 w-5" /> Add Agenda Item
              </button>
            </div>
            <div className="space-y-4">
              {event.agenda.map((item, index) => (
                <div
                  key={item.id}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-gray-50 rounded-xl border-2 border-gray-100 hover:border-blue-200 transition-colors"
                >
                  <input
                    name={`agenda-${index}-title`}
                    value={item.title}
                    onChange={handleChange}
                    placeholder="Agenda Title"
                    className="border-2 border-gray-200 rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300"
                  />
                  <input
                    name={`agenda-${index}-time`}
                    value={item.time}
                    onChange={handleChange}
                    placeholder="Time (e.g., 9:00 AM)"
                    className="border-2 border-gray-200 rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="border-t border-gray-100 pt-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-800">FAQs</h3>
              <button
                onClick={addFAQ}
                className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition-colors shadow-sm hover:shadow-md active:scale-95 transform transition-transform"
              >
                <Plus className="h-5 w-5" /> Add FAQ
              </button>
            </div>
            <div className="space-y-6">
              {event.faqs.map((faq, index) => (
                <div
                  key={index}
                  className="p-6 bg-gray-50 rounded-xl border-2 border-gray-100 hover:border-blue-200 transition-colors space-y-4"
                >
                  <input
                    name={`faq-${index}-question`}
                    value={faq.question}
                    onChange={handleChange}
                    placeholder="Question"
                    className="border-2 border-gray-200 rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300"
                  />
                  <textarea
                    name={`faq-${index}-answer`}
                    value={faq.answer}
                    onChange={handleChange}
                    placeholder="Answer"
                    rows={3}
                    className="border-2 border-gray-200 rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300 resize-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="border-t border-gray-100 pt-8">
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-500 text-white px-8 py-4 rounded-xl hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl active:scale-98 transform transition-transform flex items-center justify-center gap-3 text-lg font-semibold"
            >
              <Send className="h-6 w-6" />
              Create Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

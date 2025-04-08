import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function Dashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const [aiImage, setAiImage] = useState('');
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Starting data fetch...');
        await Promise.all([fetchEvents(), fetchBookedDates()]);
        console.log('Data fetch completed successfully');
      } catch (error) {
        console.error('Error in fetchData:', error);
        setError('Failed to load data. Please check if the server is running and try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchEvents = async () => {
    try {
      console.log('Fetching events from server...');
      const response = await fetch('http://localhost:5000/api/events');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Events data received:', data);
      if (data.status === 'success') {
        setEvents(data.data);
      } else {
        throw new Error(data.message || 'Failed to fetch events');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  };

  const fetchBookedDates = async () => {
    try {
      console.log('Fetching booked dates from server...');
      const response = await fetch('http://localhost:5000/api/events/dates');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Booked dates data received:', data);
      if (data.status === 'success') {
        setBookedDates(data.data.map(date => new Date(date)));
      } else {
        throw new Error(data.message || 'Failed to fetch dates');
      }
    } catch (error) {
      console.error('Error fetching booked dates:', error);
      throw error;
    }
  };

  const generateEventImage = async (event) => {
    try {
      setImageLoading(true);
      setError(null);
      const response = await fetch('http://localhost:5000/api/events/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventTitle: event.title,
          eventDescription: event.description,
          eventType: event.type
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.status === 'success') {
        setAiImage(data.imageUrl);
        setSelectedEvent(event);
        setShowImageModal(true);
      } else {
        throw new Error(data.message || 'Failed to generate image');
      }
    } catch (error) {
      console.error('Error generating image:', error);
      setError('Failed to generate image. Please try again.');
    } finally {
      setImageLoading(false);
    }
  };

  const isDateAvailable = (date) => {
    return !bookedDates.some(bookedDate => 
      bookedDate.toDateString() === date.toDateString()
    );
  };

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pastEvents = events
    .filter(event => new Date(event.date) < new Date())
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Event Dashboard</h1>

      {/* Search and Date Picker Section */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <DatePicker
          selected={selectedDate}
          onChange={date => setSelectedDate(date)}
          filterDate={isDateAvailable}
          placeholderText="Select available date"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Stats Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Total Events</h2>
          <p className="text-4xl font-bold text-primary">{events.length}+</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Available Dates</h2>
          <p className="text-4xl font-bold text-primary">{events.length - bookedDates.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Past Events</h2>
          <p className="text-4xl font-bold text-primary">{pastEvents.length}</p>
        </div>
      </div>

      {/* Past Events Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Our Best Past Events</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {pastEvents.map(event => (
            <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <button
                  onClick={() => generateEventImage(event)}
                  className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition-colors"
                  disabled={imageLoading}
                >
                  {imageLoading ? 'Generating...' : 'Generate AI Image'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Available Events Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Available Events</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map(event => (
            <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-2">{event.description}</p>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Date:</span> {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Location:</span> {event.location}
                </p>
                <p className="text-gray-600 mb-4">
                  <span className="font-semibold">Price:</span> {event.price}
                </p>
                <button
                  onClick={() => generateEventImage(event)}
                  className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition-colors"
                  disabled={imageLoading}
                >
                  {imageLoading ? 'Generating...' : 'Generate AI Image'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">AI Generated Image for {selectedEvent?.title}</h3>
              <button
                onClick={() => setShowImageModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            {imageLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <img 
                src={aiImage} 
                alt="AI Generated Event" 
                className="w-full rounded-lg"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
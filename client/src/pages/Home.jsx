import { Link } from 'react-router-dom'
import { Calendar, Clock, MapPin, Users, ArrowRight, Star} from 'lucide-react'

const Home = () => {
  const events = [
    {
      title: "Wedding Events",
      description: "Make your special day unforgettable with our wedding services.",
      image: "https://images.pexels.com/photos/169193/pexels-photo-169193.jpeg",
      link: "/services"
    },
    {
      title: "Birthday Parties",
      description: "Celebrate your special day with style and fun.",
      image: "https://images.pexels.com/photos/1405528/pexels-photo-1405528.jpeg",
      link: "/services"
    },
    {
      title: "Corporate Events",
      description: "Professional event planning for your business needs.",
      image: "https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg",
      link: "/services"
    }
  ]

  const features = [
    {
      icon: <Calendar className="w-8 h-8 text-primary" />,
      title: "Expert Planning",
      description: "Professional event planners with years of experience"
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "Time Management",
      description: "Efficient timeline planning and execution"
    },
    {
      icon: <MapPin className="w-8 h-8 text-primary" />,
      title: "Venue Selection",
      description: "Access to premium venues and locations"
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Guest Management",
      description: "Seamless guest coordination and RSVP handling"
    }
  ]

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Wedding Client",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
      text: "The team made our wedding day absolutely perfect. Every detail was taken care of with precision and care."
    },
    {
      name: "Rahul Verma",
      role: "Corporate Client",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      text: "Our annual conference was a huge success thanks to their professional planning and execution."
    },
    {
      name: "Anjali Patel",
      role: "Birthday Client",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
      text: "My daughter's birthday party was magical! The decorations and entertainment were outstanding."
    }
  ]

  const handleImageError = (e) => {
    e.target.src = "https://images.pexels.com/photos/169193/pexels-photo-169193.jpeg";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        <img 
          src="https://images.pexels.com/photos/169193/pexels-photo-169193.jpeg"
          alt="Luxury Event Celebration"
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in text-white drop-shadow-lg">
              Create Unforgettable Moments
            </h1>
            <p className="text-xl md:text-2xl mb-8 animate-fade-in-up text-gray-100 drop-shadow-md">
              Professional event planning services for weddings, birthdays, and corporate events
            </p>
            <Link 
              to="/services" 
              className="inline-flex items-center bg-primary text-white py-4 px-8 rounded-lg text-lg font-semibold hover:bg-primary-dark transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md"
            >
              Explore Services
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="text-center p-8 rounded-lg bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="inline-block p-4 bg-primary/10 rounded-full mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Events Section */}
      <div className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <Link 
                key={index} 
                to={event.link}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative h-96">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/0 group-hover:from-black/90 transition-opacity duration-300 flex items-end justify-center p-8">
                    <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">{event.title}</h3>
                      <p className="text-lg drop-shadow-md">{event.description}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4 ring-2 ring-primary/20"
                    onError={handleImageError}
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{testimonial.name}</h3>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8 drop-shadow-lg">Ready to Plan Your Perfect Event?</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto text-gray-100 drop-shadow-md">
            Let us help you create unforgettable memories with our professional event planning services.
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center bg-white text-primary py-4 px-8 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md"
          >
            Get Started
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
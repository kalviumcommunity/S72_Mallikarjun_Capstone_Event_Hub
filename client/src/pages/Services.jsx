import { Cake, Music, Gift, Camera, Sparkles, Users, Pizza, IceCream, Trophy, Star, Crown, Flower, ChefHat, Hotel, Car, Diamond, PartyPopper, Building2, Presentation, Coffee, Briefcase, Globe, Target, Award, BarChart, Network, Mail, Calendar, Clock } from 'lucide-react';
import { useState } from 'react';

const Services = () => {
  const [activeTab, setActiveTab] = useState('birthday');

  const birthdayServices = [
    {
      icon: <Cake className="w-8 h-8 text-primary" />,
      title: "Custom Birthday Cakes",
      description: "Beautifully designed cakes in various themes and flavors to match your celebration.",
      price: "Starting from ₹2,000"
    },
    {
      icon: <Music className="w-8 h-8 text-primary" />,
      title: "Entertainment",
      description: "Professional DJs, live bands, and performers for all age groups.",
      price: "Starting from ₹5,000"
    },
    {
      icon: <Star className="w-8 h-8 text-primary" />,
      title: "Decorations",
      description: "Theme-based decorations with balloons, banners, and party props.",
      price: "Starting from ₹3,000"
    },
    {
      icon: <Gift className="w-8 h-8 text-primary" />,
      title: "Party Favors",
      description: "Customized goodie bags and party favors for guests.",
      price: "Starting from ₹200/piece"
    },
    {
      icon: <Camera className="w-8 h-8 text-primary" />,
      title: "Photography",
      description: "Professional photography to capture your special moments.",
      price: "Starting from ₹3,000"
    },
    {
      icon: <PartyPopper className="w-8 h-8 text-primary" />,
      title: "Party Games",
      description: "Fun activities and games suitable for all age groups.",
      price: "Starting from ₹2,000"
    },
    {
      icon: <Pizza className="w-8 h-8 text-primary" />,
      title: "Food & Beverages",
      description: "Customized menu with snacks, drinks, and main course options.",
      price: "Starting from ₹500/person"
    },
    {
      icon: <IceCream className="w-8 h-8 text-primary" />,
      title: "Dessert Bar",
      description: "Ice cream, candy, and dessert stations for sweet treats.",
      price: "Starting from ₹4,000"
    },
    {
      icon: <Trophy className="w-8 h-8 text-primary" />,
      title: "Competitions",
      description: "Organized competitions with prizes and certificates.",
      price: "Starting from ₹2,500"
    },
    {
      icon: <Sparkles className="w-8 h-8 text-primary" />,
      title: "Special Effects",
      description: "Lighting, smoke machines, and special effects for wow factor.",
      price: "Starting from ₹3,500"
    },
    {
      icon: <Star className="w-8 h-8 text-primary" />,
      title: "Theme Parties",
      description: "Complete theme-based party planning and execution.",
      price: "Starting from ₹8,000"
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Guest Management",
      description: "RSVP handling, seating arrangements, and guest coordination.",
      price: "Starting from ₹2,000"
    }
  ];

  const weddingServices = [
    {
      icon: <Crown className="w-8 h-8 text-primary" />,
      title: "Wedding Planning",
      description: "Complete wedding planning services including venue selection, vendor coordination, and timeline management.",
      price: "Starting from ₹50,000"
    },
    {
      icon: <Flower className="w-8 h-8 text-primary" />,
      title: "Floral Decorations",
      description: "Beautiful floral arrangements for ceremony, reception, and bridal bouquets.",
      price: "Starting from ₹25,000"
    },
    {
      icon: <ChefHat className="w-8 h-8 text-primary" />,
      title: "Catering Services",
      description: "Premium catering with multiple cuisine options and customized menus.",
      price: "Starting from ₹500/plate"
    },
    {
      icon: <Camera className="w-8 h-8 text-primary" />,
      title: "Photography & Videography",
      description: "Professional wedding photography and videography packages.",
      price: "Starting from ₹30,000"
    },
    {
      icon: <Music className="w-8 h-8 text-primary" />,
      title: "Entertainment",
      description: "Live bands, DJs, and cultural performances for your special day.",
      price: "Starting from ₹15,000"
    },
    {
      icon: <Cake className="w-8 h-8 text-primary" />,
      title: "Wedding Cake",
      description: "Custom-designed wedding cakes with multiple flavors and tiers.",
      price: "Starting from ₹10,000"
    },
    {
      icon: <Hotel className="w-8 h-8 text-primary" />,
      title: "Venue Booking",
      description: "Exclusive venue partnerships with premium locations.",
      price: "Varies by venue"
    },
    {
      icon: <Car className="w-8 h-8 text-primary" />,
      title: "Transportation",
      description: "Luxury vehicles for the wedding party and guests.",
      price: "Starting from ₹5,000/day"
    },
    {
      icon: <Gift className="w-8 h-8 text-primary" />,
      title: "Wedding Favors",
      description: "Customized wedding favors and return gifts for guests.",
      price: "Starting from ₹200/piece"
    },
    {
      icon: <Diamond className="w-8 h-8 text-primary" />,
      title: "Jewelry & Accessories",
      description: "Traditional and modern jewelry rental services.",
      price: "Starting from ₹10,000"
    },
    {
      icon: <Sparkles className="w-8 h-8 text-primary" />,
      title: "Lighting & Décor",
      description: "Professional lighting and decorative elements for venues.",
      price: "Starting from ₹25,000"
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Guest Management",
      description: "RSVP management, seating arrangements, and guest coordination.",
      price: "Starting from ₹15,000"
    }
  ];

  const birthdayPhotos = [
    {
      url: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      title: "Kids Birthday Party"
    },
    {
      url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      title: "Teen Birthday Celebration"
    },
    {
      url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      title: "Adult Birthday Party"
    },
    {
      url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      title: "Corporate Birthday"
    }
  ];

  const weddingPhotos = [
    {
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      title: "Elegant Wedding Ceremony"
    },
    {
      url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      title: "Beautiful Reception"
    },
    {
      url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      title: "Wedding Decorations"
    },
    {
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      title: "Wedding Catering"
    }
  ];

  const corporateServices = [
    {
      icon: <Building2 className="w-8 h-8 text-primary" />,
      title: "Venue Selection",
      description: "Professional venue selection for conferences, seminars, and corporate events.",
      price: "Starting from ₹15,000"
    },
    {
      icon: <Presentation className="w-8 h-8 text-primary" />,
      title: "Conference Planning",
      description: "Complete conference planning including agenda, speakers, and materials.",
      price: "Starting from ₹25,000"
    },
    {
      icon: <Coffee className="w-8 h-8 text-primary" />,
      title: "Corporate Catering",
      description: "Professional catering services for meetings and corporate events.",
      price: "Starting from ₹500/person"
    },
    {
      icon: <Briefcase className="w-8 h-8 text-primary" />,
      title: "Business Meetings",
      description: "Organized business meetings with all necessary equipment and setup.",
      price: "Starting from ₹10,000"
    },
    {
      icon: <Globe className="w-8 h-8 text-primary" />,
      title: "International Events",
      description: "Planning and coordination for international corporate events.",
      price: "Starting from ₹50,000"
    },
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "Team Building",
      description: "Organized team building activities and corporate retreats.",
      price: "Starting from ₹20,000"
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: "Award Ceremonies",
      description: "Professional award ceremonies and recognition events.",
      price: "Starting from ₹30,000"
    },
    {
      icon: <BarChart className="w-8 h-8 text-primary" />,
      title: "Annual Meetings",
      description: "Comprehensive planning for annual general meetings.",
      price: "Starting from ₹40,000"
    },
    {
      icon: <Network className="w-8 h-8 text-primary" />,
      title: "Networking Events",
      description: "Corporate networking events and business mixers.",
      price: "Starting from ₹15,000"
    },
    {
      icon: <Mail className="w-8 h-8 text-primary" />,
      title: "Corporate Communications",
      description: "Event communications and guest management services.",
      price: "Starting from ₹8,000"
    },
    {
      icon: <Calendar className="w-8 h-8 text-primary" />,
      title: "Event Scheduling",
      description: "Professional event scheduling and timeline management.",
      price: "Starting from ₹5,000"
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "Time Management",
      description: "Efficient time management and event coordination.",
      price: "Starting from ₹7,000"
    }
  ];

  const corporatePhotos = [
    {
      url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      title: "Corporate Conference"
    },
    {
      url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      title: "Business Meeting"
    },
    {
      url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      title: "Team Building"
    },
    {
      url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      title: "Award Ceremony"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Tab Navigation */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('birthday')}
              className={`py-4 px-6 text-lg font-semibold border-b-2 transition-colors duration-300 ${
                activeTab === 'birthday'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-primary'
              }`}
            >
              Birthday Services
            </button>
            <button
              onClick={() => setActiveTab('wedding')}
              className={`py-4 px-6 text-lg font-semibold border-b-2 transition-colors duration-300 ${
                activeTab === 'wedding'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-primary'
              }`}
            >
              Wedding Services
            </button>
            <button
              onClick={() => setActiveTab('corporate')}
              className={`py-4 px-6 text-lg font-semibold border-b-2 transition-colors duration-300 ${
                activeTab === 'corporate'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-primary'
              }`}
            >
              Corporate Services
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img 
          src={activeTab === 'birthday' 
            ? "https://images.pexels.com/photos/1405528/pexels-photo-1405528.jpeg"
            : activeTab === 'wedding'
            ? "https://images.pexels.com/photos/169193/pexels-photo-169193.jpeg"
            : "https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg"
          }
          alt={activeTab === 'birthday' ? "Birthday Celebration" : activeTab === 'wedding' ? "Wedding Celebration" : "Corporate Event"}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              {activeTab === 'birthday' ? 'Birthday Services' : activeTab === 'wedding' ? 'Wedding Services' : 'Corporate Services'}
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 drop-shadow-md">
              {activeTab === 'birthday' 
                ? 'Make your birthday celebration unforgettable'
                : activeTab === 'wedding'
                ? 'Make your special day unforgettable'
                : 'Professional event planning for your business needs'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Photo Gallery */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          {activeTab === 'birthday' ? 'Birthday Gallery' : activeTab === 'wedding' ? 'Wedding Gallery' : 'Corporate Gallery'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(activeTab === 'birthday' ? birthdayPhotos : activeTab === 'wedding' ? weddingPhotos : corporatePhotos).map((photo, index) => (
            <div key={index} className="relative group overflow-hidden rounded-lg shadow-lg">
              <img 
                src={photo.url} 
                alt={photo.title}
                className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
                <h3 className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg">
                  {photo.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Our {activeTab === 'birthday' ? 'Birthday' : activeTab === 'wedding' ? 'Wedding' : 'Corporate'} Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(activeTab === 'birthday' ? birthdayServices : activeTab === 'wedding' ? weddingServices : corporateServices).map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  {service.icon}
                  <h3 className="text-xl font-semibold ml-3 text-gray-800">{service.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <p className="text-primary font-semibold">{service.price}</p>
                <button className="mt-4 w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors duration-300">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">
            Ready to Plan Your Perfect {activeTab === 'birthday' ? 'Birthday' : activeTab === 'wedding' ? 'Wedding' : 'Corporate'} Event?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Contact us today to discuss your {activeTab === 'birthday' ? 'birthday' : activeTab === 'wedding' ? 'wedding' : 'corporate'} plans and get a personalized quote.
          </p>
          <button className="bg-primary text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-primary-dark transition-colors duration-300">
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;
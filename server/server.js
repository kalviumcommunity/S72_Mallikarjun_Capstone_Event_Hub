// Import required modules
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;
app.use(express.json());
app.use(cors());

// Sample data for events
const events = [
    {
        id: 1,
        title: "Royal Wedding Ceremony",
        date: "2024-06-15",
        location: "Bengaluru Palace",
        type: "Wedding",
        status: "Upcoming",
        description: "Luxury wedding event with traditional ceremonies",
        price: "₹5,00,000",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552"
    },
    {
        id: 2,
        title: "Tech Conference 2024",
        date: "2024-07-20",
        location: "Pune Convention Center",
        type: "Corporate",
        status: "Upcoming",
        description: "Annual technology conference with industry leaders",
        price: "₹2,50,000",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87"
    },
    {
        id: 3,
        title: "Birthday Bash",
        date: "2024-05-10",
        location: "Fun World",
        type: "Birthday",
        status: "Upcoming",
        description: "Themed birthday party for kids",
        price: "₹50,000",
        image: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84"
    }
];

// Sample data for services
const services = {
    wedding: [
        {
            id: 1,
            title: "Complete Wedding Planning",
            description: "End-to-end wedding planning services",
            price: "Starting from ₹3,00,000",
            includes: ["Venue Selection", "Decor", "Catering", "Photography"]
        },
        {
            id: 2,
            title: "Wedding Decoration",
            description: "Luxury wedding decoration services",
            price: "Starting from ₹1,00,000",
            includes: ["Floral Decor", "Lighting", "Stage Setup", "Seating Arrangement"]
        }
    ],
    birthday: [
        {
            id: 1,
            title: "Kids Birthday Package",
            description: "Complete birthday party planning for kids",
            price: "Starting from ₹25,000",
            includes: ["Theme Decoration", "Games", "Magic Show", "Cake"]
        },
        {
            id: 2,
            title: "Adult Birthday Package",
            description: "Elegant birthday celebrations for adults",
            price: "Starting from ₹50,000",
            includes: ["Venue Booking", "Catering", "Music", "Decor"]
        }
    ],
    corporate: [
        {
            id: 1,
            title: "Conference Package",
            description: "Professional conference planning services",
            price: "Starting from ₹2,00,000",
            includes: ["Venue", "AV Equipment", "Catering", "Registration"]
        },
        {
            id: 2,
            title: "Team Building Events",
            description: "Engaging team building activities",
            price: "Starting from ₹75,000",
            includes: ["Activities", "Venue", "Refreshments", "Coordination"]
        }
    ]
};

// GET Endpoints

// 1. Get all events
app.get('/api/events', (req, res) => {
    console.log('\n=== GET All Events ===');
    console.log('Total Events:', events.length);
    events.forEach(event => {
        console.log(`
Title: ${event.title}
Date: ${event.date}
Location: ${event.location}
Type: ${event.type}
Status: ${event.status}
-----------------`);
    });
    res.json({ status: "success", data: events });
});

// 2. Get event by ID
app.get('/api/events/:id', (req, res) => {
    const eventId = parseInt(req.params.id);
    const event = events.find(e => e.id === eventId);
    
    console.log('\n=== GET Event by ID ===');
    console.log('Requested ID:', eventId);
    if (event) {
        console.log(`
Found Event:
Title: ${event.title}
Date: ${event.date}
Location: ${event.location}
-----------------`);
    } else {
        console.log('Event not found');
    }
    
    if (!event) {
        return res.status(404).json({ status: "error", message: "Event not found" });
    }
    res.json({ status: "success", data: event });
});

// 3. Get events by type
app.get('/api/events/type/:type', (req, res) => {
    const eventType = req.params.type;
    const filteredEvents = events.filter(
        event => event.type.toLowerCase() === eventType.toLowerCase()
    );

    console.log('\n=== GET Events by Type ===');
    console.log('Type:', eventType);
    console.log('Found Events:', filteredEvents.length);
    filteredEvents.forEach(event => {
        console.log(`
Title: ${event.title}
Date: ${event.date}
-----------------`);
    });

    res.json({ status: "success", data: filteredEvents });
});

// 4. Get all services
app.get('/api/services', (req, res) => {
    console.log('\n=== GET All Services ===');
    console.log('Categories:', Object.keys(services));
    Object.entries(services).forEach(([category, serviceList]) => {
        console.log(`\n${category.toUpperCase()} Services:`, serviceList.length);
    });
    res.json({ status: "success", data: services });
});

// 5. Get services by category
app.get('/api/services/:category', (req, res) => {
    const category = req.params.category.toLowerCase();
    const categoryServices = services[category];

    console.log('\n=== GET Services by Category ===');
    console.log('Category:', category);
    if (categoryServices) {
        console.log('Found Services:', categoryServices.length);
        categoryServices.forEach(service => {
            console.log(`
Title: ${service.title}
Price: ${service.price}
-----------------`);
        });
    } else {
        console.log('Category not found');
    }

    if (!categoryServices) {
        return res.status(404).json({ 
            status: "error", 
            message: "Category not found" 
        });
    }
    res.json({ status: "success", data: categoryServices });
});

// 6. Search events
app.get('/api/search', (req, res) => {
    const { query } = req.query;
    
    console.log('\n=== Search Events ===');
    console.log('Search Query:', query);

    if (!query) {
        console.log('No search query provided');
        return res.json({ status: "success", data: events });
    }

    const searchResults = events.filter(event => 
        event.title.toLowerCase().includes(query.toLowerCase()) ||
        event.description.toLowerCase().includes(query.toLowerCase()) ||
        event.location.toLowerCase().includes(query.toLowerCase())
    );

    console.log('Search Results:', searchResults.length);
    searchResults.forEach(event => {
        console.log(`
Title: ${event.title}
Location: ${event.location}
-----------------`);
    });

    res.json({ status: "success", data: searchResults });
});

// Start the server
app.listen(PORT, () => {
    console.log('\n====== Event Hub Server ======');
    console.log(`Server is running on port ${PORT}`);
    console.log('\nAvailable Endpoints:');
    console.log('1. GET /api/events - Get all events');
    console.log('2. GET /api/events/:id - Get event by ID');
    console.log('3. GET /api/events/type/:type - Get events by type');
    console.log('4. GET /api/services - Get all services');
    console.log('5. GET /api/services/:category - Get services by category');
    console.log('6. GET /api/search?query=text - Search events');
    console.log('\n============================\n');
}); 
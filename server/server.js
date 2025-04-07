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
    res.json({ status: "success", data: events });
});

// 2. Get event by ID
app.get('/api/events/:id', (req, res) => {
    const eventId = parseInt(req.params.id);
    const event = events.find(e => e.id === eventId);
    
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
    res.json({ status: "success", data: filteredEvents });
});

// 4. Get all services
app.get('/api/services', (req, res) => {
    res.json({ status: "success", data: services });
});

// 5. Get services by category
app.get('/api/services/:category', (req, res) => {
    const category = req.params.category.toLowerCase();
    const categoryServices = services[category];

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

    if (!query) {
        return res.json({ status: "success", data: events });
    }

    const searchResults = events.filter(event => 
        event.title.toLowerCase().includes(query.toLowerCase()) ||
        event.description.toLowerCase().includes(query.toLowerCase()) ||
        event.location.toLowerCase().includes(query.toLowerCase())
    );

    res.json({ status: "success", data: searchResults });
});

// 7. Get upcoming events
app.get('/api/events/upcoming', (req, res) => {
    const today = new Date();
    const upcomingEvents = events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= today;
    });
    res.json({ status: "success", data: upcomingEvents });
});

// 8. Get events by date range
app.get('/api/events/range', (req, res) => {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).json({
            status: "error",
            message: "Start date and end date are required"
        });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const eventsInRange = events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= start && eventDate <= end;
    });

    res.json({ status: "success", data: eventsInRange });
});

// 9. Get event statistics
app.get('/api/events/stats', (req, res) => {
    const stats = {
        totalEvents: events.length,
        eventsByType: {},
        eventsByStatus: {},
        priceRange: {
            min: Infinity,
            max: 0,
            average: 0
        }
    };

    // Calculate statistics
    events.forEach(event => {
        // Count by type
        stats.eventsByType[event.type] = (stats.eventsByType[event.type] || 0) + 1;
        
        // Count by status
        stats.eventsByStatus[event.status] = (stats.eventsByStatus[event.status] || 0) + 1;
        
        // Price calculations
        const price = parseInt(event.price.replace(/[^0-9]/g, ''));
        stats.priceRange.min = Math.min(stats.priceRange.min, price);
        stats.priceRange.max = Math.max(stats.priceRange.max, price);
    });

    // Calculate average price
    const totalPrice = events.reduce((sum, event) => {
        return sum + parseInt(event.price.replace(/[^0-9]/g, ''));
    }, 0);
    stats.priceRange.average = totalPrice / events.length;

    res.json({ status: "success", data: stats });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 
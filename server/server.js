// Import required modules
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: "error",
        message: "Something went wrong!"
    });
});

// Sample data for events (temporary until MongoDB is fully set up)
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



// POST Endpoints

// 1. Create a new event
app.post('/api/events', (req, res) => {
    const newEvent = req.body;
    
    // Validate required fields
    if (!newEvent.title || !newEvent.date || !newEvent.location || !newEvent.type) {
        return res.status(400).json({
            status: "error",
            message: "Missing required fields: title, date, location, and type are required"
        });
    }

    // Generate new ID
    const newId = events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1;
    
    // Create event object with default values
    const event = {
        id: newId,
        title: newEvent.title,
        date: newEvent.date,
        location: newEvent.location,
        type: newEvent.type,
        status: newEvent.status || "Upcoming",
        description: newEvent.description || "",
        price: newEvent.price || "₹0",
        image: newEvent.image || ""
    };

    // Add to events array
    events.push(event);
    
    res.status(201).json({
        status: "success",
        message: "Event created successfully",
        data: event
    });
});

// 2. Create a new service
app.post('/api/services/:category', (req, res) => {
    const category = req.params.category.toLowerCase();
    const newService = req.body;

    // Validate category exists
    if (!services[category]) {
        return res.status(400).json({
            status: "error",
            message: "Invalid category. Must be one of: wedding, birthday, corporate"
        });
    }

    // Validate required fields
    if (!newService.title || !newService.description || !newService.price) {
        return res.status(400).json({
            status: "error",
            message: "Missing required fields: title, description, and price are required"
        });
    }

    // Generate new ID
    const newId = services[category].length > 0 
        ? Math.max(...services[category].map(s => s.id)) + 1 
        : 1;

    // Create service object
    const service = {
        id: newId,
        title: newService.title,
        description: newService.description,
        price: newService.price,
        includes: newService.includes || []
    };

    // Add to services array
    services[category].push(service);

    res.status(201).json({
        status: "success",
        message: "Service created successfully",
        data: service
    });
});

// 3. AI Image Generation Endpoint
app.post('/api/events/generate-image', (req, res) => {
    try {
        console.log('Generating image...');
        const { eventTitle, eventDescription, eventType } = req.body;
        
        // For now, using Unsplash as a placeholder
        const imageUrl = `https://source.unsplash.com/800x600/?${eventType},${eventTitle.split(' ').join(',')}`;
        
        res.json({
            status: "success",
            imageUrl: imageUrl
        });
    } catch (error) {
        console.error('Error in /api/events/generate-image:', error);
        res.status(500).json({
            status: "error",
            message: "Error generating image"
        });
    }
});

// PUT Endpoints

// 1. Update an existing event
app.put('/api/events/:id', (req, res) => {
    const eventId = parseInt(req.params.id);
    const updatedEvent = req.body;
    
    // Find the event index
    const eventIndex = events.findIndex(e => e.id === eventId);
    
    if (eventIndex === -1) {
        return res.status(404).json({
            status: "error",
            message: "Event not found"
        });
    }

    // Validate required fields if they are being updated
    if (updatedEvent.title === "" || updatedEvent.date === "" || 
        updatedEvent.location === "" || updatedEvent.type === "") {
        return res.status(400).json({
            status: "error",
            message: "Required fields cannot be empty"
        });
    }

    // Update the event with new values, keeping existing values if not provided
    const event = events[eventIndex];
    events[eventIndex] = {
        ...event,
        title: updatedEvent.title || event.title,
        date: updatedEvent.date || event.date,
        location: updatedEvent.location || event.location,
        type: updatedEvent.type || event.type,
        status: updatedEvent.status || event.status,
        description: updatedEvent.description || event.description,
        price: updatedEvent.price || event.price,
        image: updatedEvent.image || event.image
    };

    res.json({
        status: "success",
        message: "Event updated successfully",
        data: events[eventIndex]
    });
});

// 2. Update an existing service
app.put('/api/services/:category/:id', (req, res) => {
    const category = req.params.category.toLowerCase();
    const serviceId = parseInt(req.params.id);
    const updatedService = req.body;

    // Validate category exists
    if (!services[category]) {
        return res.status(400).json({
            status: "error",
            message: "Invalid category. Must be one of: wedding, birthday, corporate"
        });
    }

    // Find the service index
    const serviceIndex = services[category].findIndex(s => s.id === serviceId);
    
    if (serviceIndex === -1) {
        return res.status(404).json({
            status: "error",
            message: "Service not found"
        });
    }

    // Validate required fields if they are being updated
    if (updatedService.title === "" || updatedService.description === "" || 
        updatedService.price === "") {
        return res.status(400).json({
            status: "error",
            message: "Required fields cannot be empty"
        });
    }

    // Update the service with new values, keeping existing values if not provided
    const service = services[category][serviceIndex];
    services[category][serviceIndex] = {
        ...service,
        title: updatedService.title || service.title,
        description: updatedService.description || service.description,
        price: updatedService.price || service.price,
        includes: updatedService.includes || service.includes
    };

    res.json({
        status: "success",
        message: "Service updated successfully",
        data: services[category][serviceIndex]
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API available at http://localhost:${PORT}/api/events`);
});                    

// 10. Get event by date


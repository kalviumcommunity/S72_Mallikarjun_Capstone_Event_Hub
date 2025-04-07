const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Event title is required'],
        trim: true
    },
    date: {
        type: Date,
        required: [true, 'Event date is required']
    },
    location: {
        type: String,
        required: [true, 'Event location is required'],
        trim: true
    },
    type: {
        type: String,
        required: [true, 'Event type is required'],
        enum: ['Wedding', 'Birthday', 'Corporate', 'Other'],
        trim: true
    },
    status: {
        type: String,
        enum: ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'],
        default: 'Upcoming'
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: String,
        required: [true, 'Event price is required']
    },
    image: {
        type: String,
        default: ''
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
eventSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Create indexes for better query performance
eventSchema.index({ title: 'text', description: 'text', location: 'text' });
eventSchema.index({ date: 1 });
eventSchema.index({ type: 1 });
eventSchema.index({ status: 1 });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event; 
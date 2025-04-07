const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Service title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Service description is required'],
        trim: true
    },
    price: {
        type: String,
        required: [true, 'Service price is required']
    },
    category: {
        type: String,
        required: [true, 'Service category is required'],
        enum: ['wedding', 'birthday', 'corporate'],
        lowercase: true
    },
    includes: [{
        type: String,
        trim: true
    }],
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
serviceSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Create indexes for better query performance
serviceSchema.index({ title: 'text', description: 'text' });
serviceSchema.index({ category: 1 });

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service; 
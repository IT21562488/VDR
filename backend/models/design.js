// backend/models/design.js

const mongoose = require('mongoose');

const designSchema = new mongoose.Schema({
    designerName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    votes: {
        up: {
            type: Number,
            default: 0
        },
        down: {
            type: Number,
            default: 0
        }
    },
    comments: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User' // Assuming you have a User model for authentication
            },
            comment: String,
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

const Design = mongoose.model('Design', designSchema);

module.exports = Design;

const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema(
    {   
        publicId: {
            type: String,
            required: [true, "Public ID is required"],
            trim: true,
            unique: true,
            match: [/^[A-Za-z0-9]{6}$/, "Public ID must be characters, numbers and have 6 characters"]
        },
        name: {
            type: String,
            required: [true, "Last name is required"],
            trim: true,
            maxlength: [50, "Last name must be less than 50 characters"],
            match: [/^[A-Za-zÀ-ỹ\s]+$/, "Last name must contain only alphabetic characters, including accents"]
        },
        gender: {
            type: String,
            required: [true, "Gender is required"],
            enum: {
                values: ['Male', 'Female', 'Other'],
                message: "Gender must be 'Male', 'Female', or 'Other'"
            }
        },
        descripe: {
            type: String,
            trim: true,
            minlength: [10, "Description must be at least 10 characters"],
            maxlength: [500, "Description must be less than 500 characters"]
        }
    }
);

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
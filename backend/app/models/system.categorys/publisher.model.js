const mongoose = require('mongoose');

const publisherSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Publisher name is required'],
            trim: true,
            unique: true,
            minlength: [1, 'Publisher name must be at least 3 characters'],
            maxlength: [50, 'Publisher name must be less than 50 characters'],
            match: [/^[A-Za-zÀ-ỹ0-9\s]+$/, 'Publisher name can only contain alphabetic characters and spaces']
        },
        address: {
            type: String,
            required: [true, 'Publisher address is required'],
            trim: true,
            minlength: [1, 'Publisher address must be at least 10 characters'],
            maxlength: [100, 'Publisher address must be less than 100 characters'],
            match: [/^[A-Za-zÀ-ỹ0-9\s,.-]+$/, 'Publisher address can only contain alphanumeric characters, spaces, commas, periods, and hyphens']
        }
    }
);


const PublisherModel = mongoose.model('Publisher', publisherSchema);

module.exports = PublisherModel;
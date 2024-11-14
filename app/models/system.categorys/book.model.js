const mongoose = require('mongoose');
const validator = require('validator');
const ApiError = require('../../utils/api.error.util')
const obj = mongoose.Types.ObjectId;


const bookSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name of book is required"],
            trim: true,
            match: [/^[A-Za-zà-ỹ0-9\s]+$/, "Book name can only contain alphanumeric characters and spaces"]
        },
        idPublic: {
            type: String,
            trim: true,
            unique: true,
            match: [/^[A-Za-z0-9]{10}$/, "Public ID must be characters, numbers and have 10 characters"]
        },
        price: {
            type: Number,
            required: [true, "Price of book is required"],
            min: [0, "Price must be a non-negative number"]
        },
        year: {
            type: Number,
            required: [true, "Year of publish is required"],
            validate: {
                validator: (value) => validator.isInt(String(value),{ 
                    min: 1800,
                    max: new Date().getFullYear()
                }),
                message: 'Year must be an integer and within a valid range.'
            }
        },
        topics: {
            type: [String],
            required: [true, 'Topics is required']
        },
        numberOfLoans: {
            type: Number,
            default: 0,
            min: [0, 'Number of loans must be a non-negative number']
        },
        rating: {
            type: Number,
            default: -1,
        },
        authorIds: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Author',
                trim: true,
                required: [true, 'Author of book is required']
            }
        ],
        bookFieldId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'BookField',
            required: [true, 'Book fields of book is required']
        },
        publisherId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Publisher',
            required: [true, 'Publisher of book is required']
        },
        // images: { 
        //     type: mongoose.Schema.ObjectId, 
        //     ref: 'ImageModel'
        // },
    }
);

const BookModel = mongoose.model('Book', bookSchema);

module.exports = BookModel;
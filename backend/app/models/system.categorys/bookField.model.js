const mongoose = require('mongoose');
const validator = require('validator');

const bookFieldSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Book field name is required'],
            trim: true,
            minlength: [3, 'Book field name must be at least 3 characters'],
            maxlength: [50, 'Book field name must be less than 50 characters'],
            unique: true,
            match: [/^[A-Za-zÀ-ỹ\s]+$/, 'Book field name can only contain alphabetic characters and spaces']
        },
        number: {
            type: Number,
            required: [true, 'Number of books in book field is required'],
            min: [1, 'Number must be at least 1'],
            max: [1000, 'Number must be at most 1000'],
            unique: true,
            validate: {
                validator: function(value) {
                    return Number.isInteger(value); // Kiểm tra nếu giá trị là số nguyên
                },
                message: 'Number must be an integer.'
            },
            immutable: [true, 'Number not changeable']
        },   
    },
);

const BookField = mongoose.model('BookField', bookFieldSchema);

module.exports = BookField;

const mongoose = require('mongoose');
const validator = require('validator');

const staffSchema = new mongoose.Schema(
    {
        publicId: {
            type: String,
            required: [true, "Public ID is required"],
            trim: true,
            unique: true,
            match: [/^[A-Za-z0-9]{8}$/, "Public ID must be characters, numbers and have 8 characters"]
        },
        email: {
            type: String,
            required: [true, 'Email staff required'],
            trim: true,
            unique: [true, 'Email staff unique'],
            validate: {
                validator: validator.isEmail,
                message: 'Invalid email format.'
            }
        },
        password: {
            type: String,
            required: [true, 'Password staff required']
        },
        role: {
            type: String,
            enum: ['Admin', 'Librarian'],
            required: true
        },
        firstName: {
            type: String,
            required: [true, 'First name staff required'],
            trim: true,
            minlength: 1,
            maxlength: 20
        },
        lastName: {
            type: String,
            required: [true, 'Last name staff required'],
            trim: true,
            minlength: 1,
            maxlength: 50
        },
        phoneNumber: {
            type: String,
            required: [true, 'Phone number staff required'],
            trim: true,
            validate: {
                validator: function(value) {
                    return validator.isMobilePhone(value, 'vi-VN');
                },
                message: 'Invalid phone number format.'
            },
        },
        address: {
            type: String,
            required: [true, 'Address staff required'],
            trim: true,
            minlength: 5,
            maxlength: 100
        },
        birthDay: {
            type: Date,
            required: [true, 'Birthday staff required'],
            validate: {
                validator: validator.isDate,
                message: 'Invalid date format.'
            }
        },
        gender: {
            type: String,
            enum: ['Male', 'Female', 'Other'],
            required: [true, 'Gender staff required']
        },
    }
);

const StaffModel = mongoose.model('Staff', staffSchema);

module.exports = StaffModel;
const mongoose = require('mongoose');
const validator = require('validator');

const readerSchema = new mongoose.Schema(
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
            required: [true, 'Email reader required'],
            trim: true,
            unique: [true, 'Email reader unique'],
            validate: {
                validator: validator.isEmail,
                message: 'Invalid email format.'
            }
        },
        password: {
            type: String,
            required: [true, 'Password reader required']
        },
        firstName: {
            type: String,
            required: [true, 'First name reader required'],
            trim: true,
            minlength: 1,
            maxlength: 20
        },
        lastName: {
            type: String,
            required: [true, 'Last name reader required'],
            trim: true,
            minlength: 1,
            maxlength: 50
        },
        phoneNumber: {
            type: String,
            required: [true, 'Phone number reader required'],
            trim: true,
            validate: {
                validator: function(value) {
                    return validator.isMobilePhone(value, 'vi-VN'); // Kiểm tra số điện thoại theo định dạng Việt Nam
                },
                message: 'Invalid phone number format.'
            },
        },
        address: {
            type: String,
            required: [true, 'Address reader required'],
            trim: true,
            minlength: 5,
            maxlength: 100
        },
        birthDay: {
            type: Date,
            required: [true, 'Birthday reader required'],
            validate: {
                validator: validator.isDate,
                message: 'Invalid date format.'
            }
        },
        gender: {
            type: String,
            enum: {
                values: ['Male', 'Female', 'Other'],
                message: "Gender must be 'Male', 'Female', or 'Other'"
            },
            required: [true, 'Gender reader required']
        },
        maximumNumberOfBooksBorrowed: {
            type: Number,
            default: 5,
            min: 1,
            max: 10
        },
        currentNumberOfBooksBorrowed: {
            type: Number,
            default: 0,
            min: 0,
            max: 10
        }
    }
);

const ReaderModel = mongoose.model('Reader', readerSchema);

module.exports = ReaderModel;
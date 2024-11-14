const mongoose = require('mongoose');
const validator = require('validator');

const readerSchema = new mongoose.Schema(
    {
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
            required: [true, 'Password reader required'],
            minlength: 8,
            validate: {
                validator: validator.isPassportNumber,
                message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
            }
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
            enum: ['Male', 'Female', 'Other'],
            required: [true, 'Gender reader required']
        },
        maximumNumberOfBooksBorrowed: {
            type: Number,
            required: true,
            min: 1,
            max: 10
        },
        currentNumberOfBooksBorrowed: {
            type: Number,
            required: true,
            min: 0,
            max: 10
        },
        reputationScore: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        }
    }
);

const ReaderModel = mongoose.model('ReaderModel', readerSchema);

module.exports = ReaderModel;
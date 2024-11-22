const mongoose = require('mongoose');
const validator = require('validator');

const readerSchema = new mongoose.Schema(
    {
        publicId: {
            type: String,
            required: [true, "ID công khai là bắt buộc"],
            trim: true,
            unique: true,
            match: [/^[A-Za-z0-9]{8}$/, "ID công khai phải chứa 8 ký tự bao gồm chữ và số"]
        },
        email: {
            type: String,
            required: [true, 'Email là bắt buộc'],
            trim: true,
            unique: [true, 'Email phải là duy nhất'],
            validate: {
                validator: validator.isEmail,
                message: 'Định dạng email không hợp lệ.'
            }
        },
        password: {
            type: String,
            required: [true, 'Mật khẩu là bắt buộc']
        },
        firstName: {
            type: String,
            required: [true, 'Họ là bắt buộc'],
            trim: true,
            minlength: [1, 'Họ phải có ít nhất 1 ký tự'],
            maxlength: [20, 'Họ không được vượt quá 20 ký tự']
        },
        lastName: {
            type: String,
            required: [true, 'Tên là bắt buộc'],
            trim: true,
            minlength: [1, 'Tên phải có ít nhất 1 ký tự'],
            maxlength: [50, 'Tên không được vượt quá 50 ký tự']
        },
        phoneNumber: {
            type: String,
            required: [true, 'Số điện thoại là bắt buộc'],
            trim: true,
            validate: {
                validator: function(value) {
                    return validator.isMobilePhone(value, 'vi-VN'); // Kiểm tra số điện thoại theo định dạng Việt Nam
                },
                message: 'Định dạng số điện thoại không hợp lệ.'
            },
            unique: [true, 'Số điện thoại phải là duy nhất']
        },
        address: {
            type: String,
            required: [true, 'Địa chỉ là bắt buộc'],
            trim: true,
            minlength: [5, 'Địa chỉ phải có ít nhất 5 ký tự'],
            maxlength: [100, 'Địa chỉ không được vượt quá 100 ký tự']
        },
        birthDay: {
            type: Date,
            required: [true, 'Ngày sinh là bắt buộc'],
            validate: {
                validator: validator.isDate,
                message: 'Định dạng ngày tháng không hợp lệ.'
            }
        },
        gender: {
            type: String,
            enum: {
                values: ['Male', 'Female', 'Other'],
                message: "Giới tính phải là 'Male', 'Female', hoặc 'Other'"
            },
            required: [true, 'Giới tính là bắt buộc']
        },
        maximumNumberOfBooksBorrowed: {
            type: Number,
            default: 5,
            min: [1, 'Số sách tối đa mượn phải ít nhất là 1'],
            max: [10, 'Số sách tối đa mượn không được vượt quá 10']
        },
        currentNumberOfBooksBorrowed: {
            type: Number,
            default: 0,
            min: [0, 'Số sách hiện đang mượn không được nhỏ hơn 0'],
            max: [10, 'Số sách hiện đang mượn không được vượt quá 10']
        }
    }
);

const ReaderModel = mongoose.model('Reader', readerSchema);

module.exports = ReaderModel;

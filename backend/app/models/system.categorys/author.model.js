const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema(
    {   
        publicId: {
            type: String,
            required: [true, "Mã công khai là bắt buộc"],
            trim: true,
            unique: true,
            match: [/^[A-Za-z0-9]{6}$/, "Mã công khai chỉ được chứa chữ, số và phải có 6 ký tự"]
        },
        name: {
            type: String,
            required: [true, "Tên là bắt buộc"],
            trim: true,
            maxlength: [50, "Tên phải ít hơn 50 ký tự"],
            match: [/^[A-Za-zÀ-ỹ\s]+$/, "Tên chỉ được chứa ký tự chữ cái, bao gồm dấu"]
        },
        gender: {
            type: String,
            required: [true, "Giới tính là bắt buộc"],
            enum: {
                values: ['Male', 'Female'],
                message: "Giới tính phải là 'Male' hoặc 'Female'"
            }
        },
        descripe: {
            type: String,
            trim: true,
            minlength: [10, "Mô tả phải có ít nhất 10 ký tự"],
            maxlength: [500, "Mô tả phải ít hơn 500 ký tự"]
        }
    }
);

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;

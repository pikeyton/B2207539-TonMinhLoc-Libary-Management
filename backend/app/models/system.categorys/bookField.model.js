const mongoose = require('mongoose');
const validator = require('validator');

const bookFieldSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Tên lĩnh vực sách là bắt buộc'],
            trim: true,
            minlength: [3, 'Tên lĩnh vực sách phải có ít nhất 3 ký tự'],
            maxlength: [50, 'Tên lĩnh vực sách phải ít hơn 50 ký tự'],
            unique: true,
            match: [/^[A-Za-zÀ-ỹ\s]+$/, 'Tên lĩnh vực sách chỉ được chứa ký tự chữ và khoảng trắng']
        },
        number: {
            type: Number,
            required: [true, 'Số lượng sách trong lĩnh vực là bắt buộc'],
            min: [1, 'Số lượng phải ít nhất là 1'],
            max: [1000, 'Số lượng không được vượt quá 1000'],
            unique: true,
            validate: {
                validator: function(value) {
                    return Number.isInteger(value); // Kiểm tra nếu giá trị là số nguyên
                },
                message: 'Số lượng phải là số nguyên.'
            },
            immutable: [true, 'Số lượng không được phép thay đổi']
        },   
    },
);

const BookField = mongoose.model('BookField', bookFieldSchema);

module.exports = BookField;

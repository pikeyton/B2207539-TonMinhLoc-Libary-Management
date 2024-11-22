const mongoose = require('mongoose');

const publisherSchema = new mongoose.Schema(
    {
        publicId: {
            type: String,
            required: [true, 'Mã công khai là bắt buộc'],
            trim: true,
            unique: true,
            match: [/^[A-Za-z0-9]{6}$/, 'Mã công khai chỉ được chứa chữ, số và phải có 6 ký tự']
        },
        name: {
            type: String,
            required: [true, 'Tên nhà xuất bản là bắt buộc'],
            trim: true,
            unique: true,
            minlength: [3, 'Tên nhà xuất bản phải có ít nhất 3 ký tự'],
            maxlength: [50, 'Tên nhà xuất bản phải ít hơn 50 ký tự'],
            match: [/^[A-Za-zÀ-ỹ0-9\s]+$/, 'Tên nhà xuất bản chỉ được chứa chữ cái, số và khoảng trắng']
        },
        address: {
            type: String,
            required: [true, 'Địa chỉ nhà xuất bản là bắt buộc'],
            trim: true,
            minlength: [10, 'Địa chỉ nhà xuất bản phải có ít nhất 10 ký tự'],
            maxlength: [100, 'Địa chỉ nhà xuất bản phải ít hơn 100 ký tự'],
            match: [/^[A-Za-zÀ-ỹ0-9\s,.-]+$/, 'Địa chỉ nhà xuất bản chỉ được chứa chữ cái, số, khoảng trắng, dấu phẩy, dấu chấm và dấu gạch ngang']
        }
    }
);

const PublisherModel = mongoose.model('Publisher', publisherSchema);

module.exports = PublisherModel;

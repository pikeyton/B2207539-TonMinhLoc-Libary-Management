const mongoose = require('mongoose');

const BookBorrowRegistrationSchema = new mongoose.Schema({
    readerId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reader',
        required: [true, "ID độc giả là bắt buộc"]
    },
    bookPrintId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BookPrint',
        required: [true, "ID bản in sách là bắt buộc"]
    },
    borrowRegistryDate: { 
        type: Date,
        required: true,
        default: Date.now
    },
    expireAt: { 
        type: Date,
        required: true,
        default: () => new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // Mặc định là 3 ngày sau
    }
});

// Tạo chỉ mục để tự động xóa các bản ghi hết hạn
BookBorrowRegistrationSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const BookBorrowRegistration = mongoose.model('BookBorrowRegistration', BookBorrowRegistrationSchema);

module.exports = BookBorrowRegistration;

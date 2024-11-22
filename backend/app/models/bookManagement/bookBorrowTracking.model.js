const mongoose = require('mongoose');

const bookBorrowTrackingSchema = new mongoose.Schema({
    readerId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reader',
        required: [true, "ID độc giả là bắt buộc"]
    },
    staffId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff',
        required: [true, "ID nhân viên là bắt buộc"]
    },
    bookPrintId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BookPrint',
        required: [true, "ID bản in sách là bắt buộc"]
    },
    borrowDate: { 
        type: Date,
        required: [true, "Ngày mượn là bắt buộc"],
        default: Date.now
    },
    dueDate: { 
        type: Date,
        default: () => new Date(Date.now() + 2 * 7 * 24 * 60 * 60 * 1000) // Mặc định là 2 tuần sau
    },
    returnedDate: {
        type: Date,
        default: null
    }
});

const BookBorrowTracking = mongoose.model('BookBorrowTracking', bookBorrowTrackingSchema);

module.exports = BookBorrowTracking;

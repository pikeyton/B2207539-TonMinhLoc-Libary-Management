const mongoose = require('mongoose');

const bookBorrowTrackingSchema = new mongoose.Schema({
    readerId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reader',
        required: [true, "Reader id is required"]
    },
    staffId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff',
        required: [true, "Staff id is required"]
    },
    bookPrintId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BookPrint',
        required: [true, "Book print id is required"]
    },
    borrowDate: { 
        type: Date,
        required: [true, "Borrow date is required"],
        default: Date.now
    },
    dueDate: { 
        type: Date,
        default: () => new Date(Date.now() + 2 * 7 * 24 * 60 * 60 * 1000)
    },
    returnedDate: {
        type: Date,
        default: null
    }
})

const BookBorrowTracking = mongoose.model('BookBorrowTracking', bookBorrowTrackingSchema);

module.exports = BookBorrowTracking;
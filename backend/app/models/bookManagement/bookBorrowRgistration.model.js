const mongoose = require('mongoose');

const BookBorrowRegistrationSchema = new mongoose.Schema({
    readerId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reader',
        required: [true, "Reader id is required"]
    },
    bookPrintId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BookPrint',
        required: [true, "Book print id is required"]
    },
    borrowRegistryDate: { 
        type: Date,
        required: true,
        default: Date.now
    },
    expireAt: { 
        type: Date,
        required: true,
        default: () => new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) 
    }
});

BookBorrowRegistrationSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const BookBorrowRegistration = mongoose.model('BookBorrowRegistration', BookBorrowRegistrationSchema);

module.exports = BookBorrowRegistration;
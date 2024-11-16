const mongoose = require('mongoose');

const bookBurchaseRegistration = new mongoose.Schema({
    readerId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reader',
        required: [true, "Reader id is required"]
    },
    bookId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: [true, "Book print id is required"]
    },
    purchaseDate: { 
        type: Date,
        required: true,
        default: Date.now
    },
    state: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
})

const BookPurchaseRegistration = mongoose.model('BookPurchaseRegistration', bookBurchaseRegistration);

module.exports = BookPurchaseRegistration;
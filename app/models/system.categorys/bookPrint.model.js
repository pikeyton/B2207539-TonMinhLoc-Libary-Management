const mongoose = require('mongoose');

const bookPrintSchema = new mongoose.Schema({
    publicId: {
        type: String,
        unique: true,
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: [true, "Book Print ID is required"]
    },
    readerIdOwn: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref: 'Reader'
    },
    documentType: {
        type: String,
        enum: {
            values: ['Document Read', 'Document Borrow'],
            message: "Document type must be either 'Document Read' or 'Document Borrow'"
        },
        required: [true, "Document type is required"]
    },
    entryDate: {
        type: Date,
        default: Date.now
    },
    readerReturnDay: {
        type: Date,
        default: null
    }
});

bookPrintSchema.pre('save', async function(next){
    try {
        const models = require('../index.model');
        const book = await models.Book.findById(this.bookId);
        let numericalOrder = 1;
        let publicId = null;
        while (true){
            publicId = `${book.publicId}.${numericalOrder}`;
            let bookPrint = await models.BookPrint.findOne({publicId});
            if (!bookPrint) break;
            numericalOrder += 1;
        }
        this.publicId = publicId;
    }
    catch(error){
        next(error);
    }
    next();
});
const BookPrintModel = mongoose.model('BookPrint', bookPrintSchema);

module.exports = BookPrintModel;

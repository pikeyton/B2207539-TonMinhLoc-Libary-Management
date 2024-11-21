const mongoose = require('mongoose');
const validator = require('validator');

const bookSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name of book is required"],
            trim: true,
            match: [/^[A-Za-zà-ỹ0-9\s]+$/, "Book name can only contain alphanumeric characters and spaces"]
        },
        publicId: {
            type: String,
            unique: true
        },
        price: {
            type: Number,
            required: [true, "Price of book is required"],
            min: [0, "Price must be a non-negative number"]
        },
        year: {
            type: Number,
            required: [true, "Year of publish is required"],
            validate: {
                validator: (value) => validator.isInt(String(value),{ 
                    min: 1800,
                    max: new Date().getFullYear()
                }),
                message: 'Year must be an integer and within a valid range.'
            }
        },
        numberOfLoans: {
            type: Number,
            default: 0,
            min: [0, 'Number of loans must be a non-negative number']
        },
        authorIds: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Author',
                trim: true,
                required: [true, 'Author of book is required']
            }
        ],
        bookFieldId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'BookField',
            required: [true, 'Book fields of book is required']
        },
        publisherId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Publisher',
            required: [true, 'Publisher of book is required']
        },
        image: { 
            type: Buffer,
            required: [true, 'Image of book is required']
        },
    }
);
bookSchema.pre('save', async function (next) {
    try{
        const models = require('../index.model');
        author = await models.Author.findById(this.authorIds[0]);
        bookField = await models.BookField.findById(this.bookFieldId);
        let numericalOrder = 1;
        let publicId = null;
        while (true){
            publicId = `${bookField.number}-${author.publicId}.${numericalOrder}`;
            let book = await models.Book.findOne({publicId});
            if (!book) break;
            numericalOrder += 1;
        }
        this.publicId = publicId;
    }
    catch(error){
        next(error);
    }
    next();
})
const BookModel = mongoose.model('Book', bookSchema);

module.exports = BookModel;
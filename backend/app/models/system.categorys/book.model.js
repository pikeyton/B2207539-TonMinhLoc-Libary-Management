const mongoose = require('mongoose');
const validator = require('validator');

const bookSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Tên sách là bắt buộc"],
            trim: true,
            match: [/^[A-Za-zà-ỹ0-9\s]+$/, "Tên sách chỉ được chứa ký tự chữ, số và khoảng trắng"]
        },
        publicId: {
            type: String,
            unique: true
        },
        price: {
            type: Number,
            required: [true, "Giá của sách là bắt buộc"],
            min: [0, "Giá sách phải là số không âm"]
        },
        year: {
            type: Number,
            required: [true, "Năm xuất bản là bắt buộc"],
            validate: {
                validator: (value) => validator.isInt(String(value),{ 
                    min: 1800,
                    max: new Date().getFullYear()
                }),
                message: 'Năm xuất bản phải là số nguyên và nằm trong khoảng hợp lệ'
            }
        },
        numberOfLoans: {
            type: Number,
            default: 0,
            min: [0, 'Số lần mượn phải là số không âm']
        },
        authorIds: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Author',
                trim: true,
                required: [true, 'Tác giả của sách là bắt buộc']
            }
        ],
        bookFieldId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'BookField',
            required: [true, 'Lĩnh vực của sách là bắt buộc']
        },
        publisherId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Publisher',
            required: [true, 'Nhà xuất bản của sách là bắt buộc']
        },
        image: { 
            type: Buffer,
            required: [true, 'Hình ảnh của sách là bắt buộc']
        },
    }
);

bookSchema.pre('save', async function (next) {
    try {
        const models = require('../index.model');
        author = await models.Author.findById(this.authorIds[0]);
        bookField = await models.BookField.findById(this.bookFieldId);
        let numericalOrder = 1;
        let publicId = null;
        while (true) {
            publicId = `${bookField.number}-${author.publicId}.${numericalOrder}`;
            let book = await models.Book.findOne({ publicId });
            if (!book) break;
            numericalOrder += 1;
        }
        this.publicId = publicId;
    } catch (error) {
        next(error);
    }
    next();
});

const BookModel = mongoose.model('Book', bookSchema);

module.exports = BookModel;

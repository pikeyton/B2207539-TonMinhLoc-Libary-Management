const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, "Comment content is required"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    readerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reader',
        required: [true, "Reader ID is required"]
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: [true, "Book ID is required"]
    },
    evaluation: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, "Evaluation is required"]
    }
})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
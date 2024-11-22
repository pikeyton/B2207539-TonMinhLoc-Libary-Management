const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, "Nội dung bình luận là bắt buộc"]
    },
    readerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reader',
        required: [true, "ID độc giả là bắt buộc"]
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: [true, "ID sách là bắt buộc"]
    },
    evaluation: {
        type: Number,
        min: [1, "Đánh giá phải từ 1 đến 5"],
        max: [5, "Đánh giá phải từ 1 đến 5"],
        required: [true, "Đánh giá là bắt buộc"]
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;

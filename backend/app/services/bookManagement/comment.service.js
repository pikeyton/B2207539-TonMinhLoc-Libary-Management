const models = require('../../models/index.model');
const err = require('../../utils/service.error.util');
const foreignKey = require('../../utils/foreignKey.util');

async function validateReference(comment){
    await foreignKey.Reader(comment.readerId);
    await foreignKey.Book(comment.bookId);
}

exports.create = async (comment) => {
    await validateReference(comment);    
    const myComment = await models.Comment.findOne({
        readerId: comment.readerId,
        bookId: comment.bookId
    });
    if (myComment){
        return {message: "Comment already exists."};
    }

    try {
        const result = (await models.Comment.create(comment));
        data = await models.Comment.findById(result._id).populate("readerId");
        console.log(data);
        return {
            message: 'Comment created successfully',
            data: data,
        };
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

exports.findByBook = async (bookId) => {
    try {
        const result = await models.Comment.find({ bookId: bookId }).populate('readerId');
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

exports.update = async (id, comment) => {
    await validateReference(comment);
    try {
        const result = await models.Comment.findByIdAndUpdate(id, comment, { new: true, runValidators: true });
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}


exports.delete = async (id) => {
    try {
        const result = await models.Comment.findByIdAndDelete(id);
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}
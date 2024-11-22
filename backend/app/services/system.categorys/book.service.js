const models = require('../../models/index.model.js');
const foreignKeys = require('../../utils/foreignKey.util.js');
const err = require('../../utils/service.error.util.js');

async function validateReference(book){
    await foreignKeys.Author(book.authorIds);
    await foreignKeys.BookField(book.bookFieldId);
    await foreignKeys.Publisher(book.publisherId);
}




exports.create = async (book, file) => {
    let parsedAuthorIds;
    if (typeof book.authorIds === "string") {
      try {
        parsedAuthorIds = JSON.parse(book.authorIds);
      } catch (error) {
        return res.status(400).json({ message: "Invalid JSON format for authorIds." });
      }
    } else {
      parsedAuthorIds = book.authorIds;
    }
    book.authorIds = parsedAuthorIds
    await validateReference(book); 
    try {
        if (file) {
            book.image = file.buffer; 
        }

        const result = await models.Book.create(book);

        return result;
    } catch (error) {
        console.error(error);
        throw new Error('Error while creating book');
    }
};

exports.update = async (id, book, file) => {
    let parsedAuthorIds;
    if (typeof book.authorIds === "string") {
      try {
        parsedAuthorIds = JSON.parse(book.authorIds);
      } catch (error) {
        return res.status(400).json({ message: "Invalid JSON format for authorIds." });
      }
    } else {
      parsedAuthorIds = book.authorIds;
    }
    book.authorIds = parsedAuthorIds
    console.log(book)
    await validateReference(book); 
    if (file) {
        book.image = file.buffer; 
    }
    await validateReference(book);
    try {
        const result = await models.Book.findByIdAndUpdate(id, book, {new: true, runValidators: true});
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

exports.findOne = async (id) => {
    try {
        const result = await models.Book.findById(id)
            .populate('authorIds', 'name')
            .populate('bookFieldId', 'name')
            .populate('publisherId', 'name');

        // Chuyển đổi dữ liệu sang đối tượng và xử lý ảnh Base64
        const bookObj = result.toObject();

        if (bookObj.image) {
            bookObj.image = `data:image/jpeg;base64,${bookObj.image.toString('base64')}`;
        }

        return bookObj;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

exports.findByName = async (name) => {
    try {
        const result = await models.Book.find({name: {$regex: name, $options: "i" }});
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

exports.findByPublicId = async (publicId) => {
    try {
        const result = await models.Book.find({publicId: publicId})
            .populate('authorIds', 'name')
            .populate('bookFieldId', 'name')
            .populate('publisherId', 'name');
        const bookObj = result[0].toObject();

        if (bookObj.image) {
            bookObj.image = `data:image/jpeg;base64,${bookObj.image.toString('base64')}`;
        }
        return bookObj;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

exports.findByAuthor = async (authorName) => {
    try {
        const authors = await models.Author.find({ name: new RegExp(authorName, 'i') });
        const authorIds = authors.map(author => author._id);
        const result = await models.Book.find({ authorIds: { $in: authorIds } }).populate('authorIds');
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

exports.findAll = async () => {
    try {
        const result = await models.Book.find()
            .populate('authorIds', 'name')
            .populate('bookFieldId', 'name')
            .populate('publisherId', 'name');;
        const booksWithBase64Images = result.map((book) => {
            const bookObj = book.toObject();
            if (book.image) {
                bookObj.image = `data:image/jpeg;base64,${book.image.toString('base64')}`;
            }
            return bookObj;
        });
        return booksWithBase64Images;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}



exports.delete = async (id) => {
    try {
        const result = await models.Book.findByIdAndDelete(id);
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}


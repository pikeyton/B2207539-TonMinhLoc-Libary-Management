const models = require('../../models/index.model.js')
const ApiError = require('../../utils/api.error.util.js');
const err = require('../../utils/service.error.util.js');
const foreignKeys = require('../../utils/foreignKey.util.js');

async function validateReference(bookBorrowRegistration){
    await foreignKeys.BookPrint(bookBorrowRegistration.bookPrintId);
    await foreignKeys.Reader(bookBorrowRegistration.readerId);
}

exports.create = async (bookBorrowRegistration) => {
    await validateReference(bookBorrowRegistration);
    
    const bookPrint = await models.BookPrint.findById(bookBorrowRegistration.bookPrintId);
    if (bookPrint.readerReturnDate){
        return {message: "Bản in của sách đã được mượn bởi độc giả khác."};
    }
    if (bookPrint.documentType === "Document Read"){
        return {message: "Bản in của sách đang ở trạng thái chỉ đọc."};
    }

    const reader = await models.Reader.findById(bookBorrowRegistration.readerId);
    const numberOfRegistrations = await models.BookBorrowRegistration.countDocuments({ readerId: bookBorrowRegistration.readerId });
    if (numberOfRegistrations + reader.currentNumberOfBooksBorrowed >= reader.maximumNumberOfBooksBorrowed ){
        return {message: "Độc giả đã đạt đến giới hạn số lượng sách được mượn."};
    }

    const mySignUp = await models.BookBorrowRegistration.findOne({
        readerId: bookBorrowRegistration.readerId,
        bookPrintId: bookBorrowRegistration.bookPrintId,
    });
    if (mySignUp){
        return {message: "Độc giả đã đăng ký mượn sách này."};
    }

    const yourSignUp = await models.BookBorrowRegistration.findOne({bookPrintId: bookBorrowRegistration.bookPrintId});
    if (yourSignUp){
        return {message: "Sách đã được đăng ký mượn bởi độc giả khác."};
    }
    
    try {
        const result = await models.BookBorrowRegistration.create(bookBorrowRegistration);
        return {
            message: 'Đăng ký mượn sách thành công.',
            data: result,
        };
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

exports.findAll = async () => {
    try {
        const result = await models.BookBorrowRegistration.find();
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

exports.findByReader = async (readerId) => {
    try {
        const result = await models.BookBorrowRegistration.find({ readerId: readerId })
        .populate("readerId") 
        .populate({
            path: "bookPrintId",
            populate: {
              path: "bookId", 
              select: [
                "name", "publicId",
              ],  
            }
          });
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

exports.delete = async (id) => {
    try {
        const result = await models.BookBorrowRegistration.findByIdAndDelete(id);
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

const models = require('../../models/index.model');
const foreignKey = require('../../utils/foreignKey.util');
const err = require('../../utils/service.error.util');

async function validateReference(bookBorrowTracking) {
    await foreignKey.BookPrint(bookBorrowTracking.bookPrintId);
    await foreignKey.Reader(bookBorrowTracking.readerId);
    await foreignKey.Staff(bookBorrowTracking.staffId);
}

exports.create = async (bookBorrowTracking) => {
    await validateReference(bookBorrowTracking);

    const bookPrint = await models.BookPrint.findById(bookBorrowTracking.bookPrintId);
    if (bookPrint.readerReturnDate){
        return {message: "Bản in sách đã được mượn bởi độc giả khác."};
    }
    if (bookPrint.documentType === "Document Read"){
        return {message: "Bản in sách đang ở trạng thái chỉ đọc."};
    }

    const reader = await models.Reader.findById(bookBorrowTracking.readerId);
    if (reader.currentNumberOfBooksBorrowed == reader.maximumNumberOfBooksBorrowed ){
        return {message: "Độc giả đã đạt đến giới hạn số lượng sách được mượn."};
    }

    const yourSignUp = await models.BookBorrowRegistration.findOne({bookPrintId: bookBorrowTracking.bookPrintId});
    if (yourSignUp && yourSignUp.readerId != bookBorrowTracking.readerId){
        return {message: "Sách đã được đăng ký mượn bởi độc giả khác."};
    }

    try {
        const result = await models.BookBorrowTracking.create(bookBorrowTracking);
        if (result) {
            const bookBorrowRgistration = await models.BookBorrowRegistration.findOne({
                bookPrintId: bookBorrowTracking.bookPrintId,
                readerId: bookBorrowTracking.readerId,
            });
            if (bookBorrowRgistration){
                await models.BookBorrowRegistration.findByIdAndDelete(bookBorrowRgistration._id);
            }
            bookPrint.readerReturnDate = result.dueDate;
            await bookPrint.save();

            const book = await models.Book.findById(bookPrint.bookId);
            book.numberOfLoans += 1;
            await book.save();

            reader.currentNumberOfBooksBorrowed += 1;
            await reader.save();
        }
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
};

exports.findAll = async () => {
    try {
        const result = await models.BookBorrowTracking.find({returnedDate: null})
        .populate("readerId")  
        .populate("staffId")
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
};

exports.findByReader = async (readerId) => {
    try {
        const result = await models.BookBorrowTracking.find({ readerId: readerId })
        .populate("readerId")  
        .populate("staffId")
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
};

exports.findOverdueBooksByReader = async (readerId) => {
    await foreignKey.Reader(readerId);
    try {
        const overdueBooks = await models.BookBorrowTracking.find({
            readerId,                
            dueDate: { $lt: new Date() }, 
            returnedDate: null
        });
        return overdueBooks;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
};

exports.findOverdueBooks = async () => {
    try {
        const overdueBooks = await models.BookBorrowTracking.find({
            dueDate: { $lt: new Date() }, 
            returnedDate: null
        }).populate("readerId")  
        .populate("staffId")
        .populate({
            path: "bookPrintId",
            populate: {
              path: "bookId", 
              select: [
                "name", "publicId",
              ],  
            }
          });
        return overdueBooks;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
};

exports.returnBook = async (readerId, bookPrintId) => {
    await foreignKey.Reader(readerId);
    await foreignKey.BookPrint(bookPrintId);
    try {
        const bookBorrowTracking = await models.BookBorrowTracking.findOne({
            bookPrintId: bookPrintId,
            readerId: readerId,
            returnedDate: null
        });
        if (!bookBorrowTracking) {
            return {message: "Thông tin mượn sách không tồn tại."};
        }
        bookBorrowTracking.returnedDate = Date.now();
        await bookBorrowTracking.save();

        const bookPrint = await models.BookPrint.findById(bookPrintId);
        bookPrint.readerReturnDate = null;
        await bookPrint.save();

        const reader = await models.Reader.findById(readerId);
        reader.currentNumberOfBooksBorrowed -= 1;
        await reader.save();

        return {message: "Sách đã được trả."};
    }
    catch (error) {
        throw err.errorFormat(error);
    }
};

exports.renewBook = async (id) => {
    try {
        const bookBorrowTracking = await models.BookBorrowTracking.findById(id);
        if (!bookBorrowTracking) {
            return {message: "Thông tin mượn sách không tồn tại."};
        }
        bookBorrowTracking.dueDate = new Date(bookBorrowTracking.dueDate.getTime() + 7 * 24 * 60 * 60 * 1000);
        await bookBorrowTracking.save();

        const bookPrint = await models.BookPrint.findById(bookBorrowTracking.bookPrintId);
        bookPrint.readerReturnDate = bookBorrowTracking.dueDate;
        await bookPrint.save();
        return {message: "Bản in sách đã được gia hạn."};
    }
    catch (error) {
        throw err.errorFormat(error);
    }
};

exports.delete = async (id) => {
    try {
        const result = await models.BookBorrowTracking.findByIdAndDelete(id);
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
};

const services = require('../../services/index.service')

exports.create = async (req, res, next) => {
    try {
        const data = await services.BookBorrowTracking.create(req.body);
        res.json(data);
    }
    catch (error) {
        next(error);
    }
}

exports.findAll = async (req, res, next) => {
    try {
        const data = await services.BookBorrowTracking.findAll();
        res.json(data);
    }
    catch (error) {
        next(error);
    }
}

exports.findByReader = async (req, res, next) => {
    try {
        const data = await services.BookBorrowTracking.findByReader(req.params.id);
        if (!data) {
            return res.status(404).json({ message: 'Book borrow tracking not found' });
        }
        res.json(data);
    }
    catch (error) {
        next(error);
    }
}

exports.findOverdueBooksByReader = async (req, res, next) => {
    try {
        const data = await services.BookBorrowTracking.findOverdueBooksByReader(req.body.readerId);
        if (!data) {
            return res.status(404).json({ message: 'No overdue books found for this reader' });
        }
        res.json(data);
    }
    catch (error) {
        next(error);
    }
}

exports.findOverdueBooks = async (req, res, next) => {
    try {
        const data = await services.BookBorrowTracking.findOverdueBooks();
        if (!data) {
            return res.status(404).json({ message: 'No overdue books found' });
        }
        res.json(data);
    }
    catch (error) {
        next(error);
    }
}

exports.returnBook = async (req, res, next) => {
    try {
        const data = await services.BookBorrowTracking.returnBook(req.body.readerId, req.body.bookPrintId);
        if (!data) {
            return res.status(404).json({ message: 'Book not found or not borrowed by this reader' });
        }
        res.send({ message: 'Book returned successfully' });
    }
    catch (error) {
        next(error);
    }
}

exports.renewBook = async (req, res, next) => {
    try {
        const data = await services.BookBorrowTracking.renewBook(req.params.id);
        if (!data) {
            return res.status(404).json({ message: 'Book not found or not borrowed by this reader' });
        }
        res.send({ message: 'Book renewed successfully' });
    }
    catch (error) {
        next(error);
    }
}

exports.delete = async (req, res, next) => {
    try {
        const data = await services.BookBorrowTracking.delete(req.params.id);
        res.send({ message: 'Book borrow tracking deleted successfully' });
    }
    catch (error) {
        next(error);
    }
}
const models = require('../models/index.model');
const ApiError = require('./api.error.util');
const mongoose = require('mongoose');
const obj = mongoose.Types.ObjectId;

// Hàm chung kiểm tra id
async function validateId(model, id, entityName) {
    if (!obj.isValid(id)) {
        throw new ApiError(404, `${entityName} không tồn tại.`);
    }
    const idExists = await model.exists({ _id: id });
    if (!idExists) {
        throw new ApiError(404, `${entityName} không tồn tại.`);
    }
}

// Các hàm kiểm tra cụ thể
exports.Author = async (ids) => {
    for (const id of ids) {
        await validateId(models.Author, id, "Tác giả");
    }
};

exports.BookField = async (id) => {
    await validateId(models.BookField, id, "Lĩnh vực sách");
};

exports.Publisher = async (id) => {
    await validateId(models.Publisher, id, "Nhà xuất bản");
};

exports.Book = async (id) => {
    await validateId(models.Book, id, "Sách");
};

exports.BookPrint = async (id) => {
    await validateId(models.BookPrint, id, "Bản in sách");
};

exports.Reader = async (id) => {
    await validateId(models.Reader, id, "Độc giả");
};

exports.Staff = async (id) => {
    await validateId(models.Staff, id, "Nhân viên");
};

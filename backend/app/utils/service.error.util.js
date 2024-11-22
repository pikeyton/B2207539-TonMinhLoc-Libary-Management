const ApiError = require('./api.error.util');

exports.errorFormat = (error) => {
    if (error.code === 11000) { 
        // Xử lý lỗi trùng lặp
        const field = Object.keys(error.keyValue)[0];
        throw new ApiError(404, `Trường ${field} đã tồn tại.`);
    }

    if (error.name === 'ValidationError') { 
        // Xử lý lỗi xác thực
        const messages = Object.values(error.errors).map(err => err.message);
        throw new ApiError(404, `Lỗi xác thực: ${messages.join(', ')}`);
    }

    if (error.name === 'CastError') { 
        // Xử lý lỗi chuyển đổi kiểu dữ liệu
        const field = error.path;
        const value = error.value;
        throw new ApiError(404, `Giá trị không hợp lệ cho trường ${field}: ${value}`);
    }
    
    // Xử lý các lỗi khác
    throw new ApiError(500, `Đã xảy ra lỗi: ${error.message}`);
};

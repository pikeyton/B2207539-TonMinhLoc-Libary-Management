const ApiError = require('./api.error.util')

exports.errorFormat = (error) => {
    if (error.code === 11000) {
        const field = Object.keys(error.keyValue)[0];
        throw new ApiError(404, `The ${field} already exists`);
    }

    if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(err => err.message);
        throw new ApiError(404, `${messages.join(', ')}`);
    }
    if (error.name === 'CastError') {
        const field = error.path;
        const value = error.value;
        throw new ApiError(404, `Invalid ${field}: ${value}`);
    }
    
    throw new ApiError(500, error.message);
}
const jwt = require('jsonwebtoken');
const ApiError = require('./api.error.util');

const jwtSecret = process.env.JWT_SECRET
const adminRole = process.env.ADMIN_ROLE
const userRole = process.env.USER_ROLE

const getRole = (token) => {
    if (!token)
        return null
    const decoded = jwt.verify(token, jwtSecret)
    return decoded.role
}

const checkRole = (role, target, next) => {
    if (!role) {
        throw new ApiError(401, "Chưa được xác thực, vui lòng đăng nhập hoặc đăng ký.");
    }
    if (role !== target) {
        throw new ApiError(401, "Bạn không có quyền truy cập vào tài nguyên này.");
    }
    return next();
    
}

exports.staff = async (req, res, next) => {
    try {
        const role = getRole(req.cookies.jwt)
        return checkRole(role, adminRole, next)
    } catch (err) {
        next(err);
    }
};

exports.reader = async (req, res, next) => {
    try {
        const role = getRole(req.cookies.jwt)
        return checkRole(role, userRole, next)
    } catch (err) {
        next(err);
    }
};
const ApiError = require('../../utils/api.error.util.js');
const jwt = require('../../utils/jwt.util.js');
const {hashPassword, comparePassword} = require('../../utils/hashPassword.util.js');
const service = require('../../services/index.service.js');

const staffRole = process.env.ADMIN_ROLE
const readerRole = process.env.USER_ROLE

exports.registerReader = async (req, res, next) => {
    try {
        const body = {...req.body};
        if (await service.Reader.findByEmail(body.email) || await service.Staff.findByEmail(body.email)){
            throw new ApiError(400, "The reader\'s email already exists.");
        }
        body.password = await hashPassword(body.password)
        const data = await service.Reader.create(body);
        jwt.createJWT(
            {
                response: res,
                data: {
                    id: data.id, 
                    email: data.email, 
                    role: readerRole,
                },
            }
        )
        res.status(200).json({
            message: "Register successfully",
            data: data,
        });
    } catch (err) {
        next(err);
    }
};

exports.registerStaff = async (req, res, next) => {
    try {
        const body = {...req.body};
        if (await service.Reader.findByEmail(body.email) || await service.Staff.findByEmail(body.email)){
            throw new ApiError(400, "The staff\'s email already exists.");
        }
        body.password = await hashPassword(body.password)
        const data = await service.Staff.create(body);
        jwt.createJWT(
            {
                response: res,
                data: {
                    id: data.id, 
                    email: data.email, 
                    role: staffRole,
                },
            }
        )
        res.status(200).json({
            message: "Register successfully",
            data: data,
        });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const reader = await service.Reader.findByEmail(email);
        const staff = await service.Staff.findByEmail(email)
        const correctPassword = await comparePassword({
            password,
            hashPassword: reader ? reader.password : staff.password,
        })
        if (!correctPassword)
            throw new ApiError(400, "Password is wrong");
        jwt.createJWT(
            {
                response: res,
                data: {
                    id: reader ? reader.id : staff.id, 
                    email: reader ? reader.email : staff.email, 
                    role: reader ? readerRole : staffRole,
                },
            }
        )

        res.status(200).json({
            message: "Login successfully",
            data: reader ? reader : staff,
        });
    } catch (err) {
        next(err);
    }
};

exports.logout = async (req, res, next) => {
    try {
        jwt.resetJWT({ response: res })
        res.status(200).json({
            message: "Logout successfully",
        });
    } catch (err) {
        next(err);
    }
};
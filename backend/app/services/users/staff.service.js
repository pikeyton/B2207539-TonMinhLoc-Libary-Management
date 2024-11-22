const models = require('../../models/index.model.js');
const err = require('../../utils/service.error.util.js');

exports.create = async (staff) => {
    try {
        const result = await models.Staff.create(staff);
        return {
            message: 'Nhân viên đã được tạo thành công.',
            data: result,
        };
    } catch (error) {
        throw err.errorFormat(error);
    }
};

exports.findAll = async () => {
    try {
        const result = await models.Staff.find();
        return result;
    } catch (error) {
        throw err.errorFormat(error);
    }
};

exports.findOne = async (id) => {
    try {
        const result = await models.Staff.findById(id);
        if (!result) {
            return {
                message: 'Không tìm thấy nhân viên với ID được cung cấp.',
            };
        }
        return result;
    } catch (error) {
        throw err.errorFormat(error);
    }
};

exports.findByPublicId = async (publicId) => {
    try {
        const result = await models.Staff.find({ publicId: { $regex: publicId, $options: "i" } });
        if (!result || result.length === 0) {
            return {
                message: 'Không tìm thấy nhân viên với Public ID được cung cấp.',
            };
        }
        return result;
    } catch (error) {
        throw err.errorFormat(error);
    }
};

exports.findByEmail = async (email) => {
    try {
        const result = await models.Staff.findOne({ email: { $regex: email, $options: "i" } });
        return result;
    } catch (error) {
        throw err.errorFormat(error);
    }
};

exports.update = async (id, staff) => {
    try {
        const result = await models.Staff.findByIdAndUpdate(id, staff, { new: true, runValidators: true });
        if (!result) {
            return {
                message: 'Không tìm thấy nhân viên để cập nhật.',
            };
        }
        return {
            message: 'Thông tin nhân viên đã được cập nhật thành công.',
            data: result,
        };
    } catch (error) {
        throw err.errorFormat(error);
    }
};

exports.delete = async (id) => {
    try {
        const result = await models.Staff.findByIdAndDelete(id);
        if (!result) {
            return {
                message: 'Không tìm thấy nhân viên để xóa.',
            };
        }
        return {
            message: 'Nhân viên đã được xóa thành công.',
            data: result,
        };
    } catch (error) {
        throw err.errorFormat(error);
    }
};

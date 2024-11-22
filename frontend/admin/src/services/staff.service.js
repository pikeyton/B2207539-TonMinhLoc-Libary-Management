import createApiClient from "./api.service.js"

class NhanVienService {
    constructor(baseUrl = "/api/staffs") {
        this.api = createApiClient(baseUrl)
    }

    // Lấy thông tin nhân viên theo ID
    async getStaffById(id) {
        try {
            const data = (await this.api.get(`/${id}`)).data
            return {
                status: "success",
                message: "Thông tin nhân viên đã được lấy thành công",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response?.data?.message || "Không thể lấy thông tin nhân viên",
            }
        }
    }

    // Cập nhật thông tin nhân viên
    async update(id, data) {
        try {
            const response = (await this.api.put(`/${id}`, data)).data
            return {
                status: "success",
                message: response.message || "Cập nhật thông tin nhân viên thành công",
                updatedStaff: response.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response?.data?.message || "Cập nhật thông tin nhân viên thất bại",
            }
        }
    }
}

export default new NhanVienService()

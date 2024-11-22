import createApiClient from "./api.service.js"

class TacGiaService {
    constructor(baseUrl = "/api/authors") {
        this.api = createApiClient(baseUrl)
    }

    // Tạo tác giả mới
    async create(author) {
        try {
            const data = (await this.api.post("/", author)).data
            return {
                status: "success",
                message: data.message || "Tác giả đã được thêm thành công",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response?.data?.message || "Thêm tác giả thất bại",
            }
        }
    }

    // Lấy danh sách tất cả tác giả
    async findAll() {
        try {
            const data = (await this.api.get("/")).data
            return {
                status: "success",
                message: data.message || "Danh sách tác giả đã được lấy thành công",
                data: data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response?.data?.message || "Không thể lấy danh sách tác giả",
            }
        }
    }

    // Lấy thông tin một tác giả theo ID
    async findOne(id) {
        try {
            const data = (await this.api.get(`/${id}`)).data
            return {
                status: "success",
                message: data.message || "Thông tin tác giả đã được lấy thành công",
                data: data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response?.data?.message || "Không thể lấy thông tin tác giả",
            }
        }
    }

    // Cập nhật thông tin tác giả
    async update(id, author) {
        try {
            const data = (await this.api.put(`/${id}`, author)).data
            return {
                status: "success",
                message: data.message || "Tác giả đã được cập nhật thành công",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response?.data?.message || "Cập nhật tác giả thất bại",
            }
        }
    }

    // Xoá tác giả theo ID
    async delete(id) {
        try {
            const data = (await this.api.delete(`/${id}`)).data
            return {
                status: "success",
                message: data.message || "Tác giả đã bị xoá thành công",
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response?.data?.message || "Xoá tác giả thất bại",
            }
        }
    }
}

export default new TacGiaService()

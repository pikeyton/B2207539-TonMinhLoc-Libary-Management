import createApiClient from "./api.service.js"

class BinhLuanService {
    constructor(baseUrl = "/api/comments") {
        this.api = createApiClient(baseUrl)
    }

    // Tạo bình luận mới
    async create(comment) {
        try {
            const data = (await this.api.post("/", comment)).data
            return {
                status: "success",
                message: data.message || "Bình luận đã được thêm thành công",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response?.data?.message || "Thêm bình luận thất bại",
            }
        }
    }

    // Lấy danh sách bình luận theo sách
    async findByBook(id) {
        try {
            const input = { bookId: id }
            const data = (await this.api.post("/search", input)).data
            return {
                status: "success",
                message: data.message || "Danh sách bình luận đã được lấy thành công",
                data: data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response?.data?.message || "Không thể lấy danh sách bình luận",
            }
        }
    }

    // Lấy thông tin chi tiết một bình luận
    async findOne(id) {
        try {
            const data = (await this.api.get(`/${id}`)).data
            return {
                status: "success",
                message: data.message || "Thông tin bình luận đã được lấy thành công",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response?.data?.message || "Không thể lấy thông tin bình luận",
            }
        }
    }
}

export default new BinhLuanService()

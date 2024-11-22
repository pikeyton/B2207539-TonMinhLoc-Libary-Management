import createApiClient from "./api.service.js"

class DocGiaService {
    constructor(baseUrl = "/api/readers") {
        this.api = createApiClient(baseUrl)
    }

    // Lấy danh sách tất cả độc giả
    async findAll() {
        try {
            const data = (await this.api.get("/")).data
            return {
                status: "success",
                message: data.message || "Danh sách độc giả đã được lấy thành công",
                data: data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response?.data?.message || "Không thể lấy danh sách độc giả",
            }
        }
    }

    // Tìm độc giả theo Public ID
    async findByPublicId(id) {
        try {
            const input = { publicId: id };
            const data = (await this.api.post("/search", input)).data
            return {
                status: "success",
                message: data.message || "Thông tin độc giả đã được lấy thành công",
                data: data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response?.data?.message || "Không thể lấy thông tin độc giả",
            }
        }
    }
}

export default new DocGiaService()

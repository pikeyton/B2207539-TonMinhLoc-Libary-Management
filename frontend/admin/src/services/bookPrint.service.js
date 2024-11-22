import createApiClient from "./api.service.js"

class BanInSachService {
    constructor(baseUrl = "/api/bookPrints") {
        this.api = createApiClient(baseUrl)
    }

    // Tạo bản in sách mới
    async create(bookPrint) {
        try {
            const data = (await this.api.post("/", bookPrint)).data
            return {
                status: "success",
                message: data.message || "Tạo bản in sách thành công",
                data: data.data.publicId,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response?.data?.message || "Tạo bản in sách thất bại",
            }
        }
    }

    // Lấy danh sách tất cả các bản in sách
    async findAll() {
        try {
            const data = (await this.api.get("/")).data
            return {
                status: "success",
                message: data.message || "Danh sách bản in sách đã được lấy thành công",
                data: data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response?.data?.message || "Không thể lấy danh sách bản in sách",
            }
        }
    }

    // Tìm bản in sách theo ID sách
    async findByIdBook(id) {
        try {
            const input = { bookId: id }
            const data = (await this.api.post("/search", input)).data
            return {
                status: "success",
                message: data.message || "Thông tin bản in sách đã được lấy thành công",
                data: data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response?.data?.message || "Không thể lấy thông tin bản in sách",
            }
        }
    }
}

export default new BanInSachService()

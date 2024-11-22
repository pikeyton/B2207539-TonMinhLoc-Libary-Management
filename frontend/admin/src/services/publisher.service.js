import createApiClient from "./api.service.js"

class NhaXuatBanService {
    constructor(baseUrl = "/api/publishers") {
        this.api = createApiClient(baseUrl)
    }

    // Lấy danh sách tất cả nhà xuất bản
    async findAll() {
        try {
            const data = (await this.api.get("/")).data
            return {
                status: "success",
                message: data.message || "Danh sách nhà xuất bản đã được lấy thành công",
                data: data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response?.data?.message || "Không thể lấy danh sách nhà xuất bản",
            }
        }
    }
}

export default new NhaXuatBanService()

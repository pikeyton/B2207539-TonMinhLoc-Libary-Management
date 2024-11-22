import createApiClient from "./api.service.js"

class LinhVucSachService {
    constructor(baseUrl = "/api/bookFields") {
        this.api = createApiClient(baseUrl)
    }

    // Lấy tất cả lĩnh vực sách
    async findAll() {
        try {
            const data = (await this.api.get("/")).data
            return {
                status: "success",
                message: data.message || "Danh sách lĩnh vực sách đã được lấy thành công",
                data: data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response?.data?.message || "Không thể lấy danh sách lĩnh vực sách",
            }
        }
    }
}

export default new LinhVucSachService()

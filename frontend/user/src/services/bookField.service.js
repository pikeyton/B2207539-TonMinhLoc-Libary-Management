import createApiClient from "./api.service.js"

class BookFieldService {
    constructor(baseUrl = "/api/bookFields") {
        this.api = createApiClient(baseUrl)
    }

    async findAll() {
        try {
            const data = (await this.api.get("/")).data
            return {
                status: "success",
                message: data.message || "Books retrieved successfully",
                data: data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }
}

export default new BookFieldService()

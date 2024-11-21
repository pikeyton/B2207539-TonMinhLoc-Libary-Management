import createApiClient from "./api.service.js"

class ReaderService {
    constructor(baseUrl = "/api/readers") {
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

    async findByPublicId(id) {
        try {
            const input = {publicId: id};
            const data = (await this.api.post('/search', input)).data
            return {
                status: "success",
                message: data.message || "Book retrieved successfully",
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

export default new ReaderService()

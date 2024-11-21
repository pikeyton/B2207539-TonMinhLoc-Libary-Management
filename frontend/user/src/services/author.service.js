import createApiClient from "./api.service.js"

class AuthorService {
    constructor(baseUrl = "/api/authors") {
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

    async findOne(id) {
        try {
            const data = (await this.api.get(`/${id}`)).data
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

export default new AuthorService()

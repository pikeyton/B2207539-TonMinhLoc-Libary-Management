import createApiClient from "./api.service.js"

class CommentService {
    constructor(baseUrl = "/api/comments") {
        this.api = createApiClient(baseUrl)
    }

    async create(comment) {
        try {
            const data = (await this.api.post("/", comment)).data;
            return {
                status: "success",
                message: data.message || "Book created successfully",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async findByBook(id) {
        try {
            const input = {bookId: id}
            const data = (await this.api.post("/search", input)).data
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
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

}

export default new CommentService()

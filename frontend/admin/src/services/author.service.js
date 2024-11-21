import createApiClient from "./api.service.js"

class AuthorService {
    constructor(baseUrl = "/api/authors") {
        this.api = createApiClient(baseUrl)
    }

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
                message: err.response.data.message,
            }
        }
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
                message: err.response.data.message,
            }
        }
    }

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
                message: err.response.data.message,
            }
        }
    }
}

export default new AuthorService()

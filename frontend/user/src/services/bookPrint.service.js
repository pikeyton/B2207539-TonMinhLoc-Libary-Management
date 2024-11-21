import createApiClient from "./api.service.js"

class BookService {
    constructor(baseUrl = "/api/bookPrints") {
        this.api = createApiClient(baseUrl)
    }

    async create(bookPrint) {
        try {
            const data = (await this.api.post("/", bookPrint)).data
            return {
                status: "success",
                message: data.message || "Borrow successful",
                data: data.data.publicId,
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

    async findByIdBook(id) {
        try {
            const input = {"bookId": id}
            const data = (await this.api.post("/search", input)).data
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

export default new BookService()

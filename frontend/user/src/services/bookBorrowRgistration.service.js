import createApiClient from "./api.service.js"

class bookBorrowRgistrationService {
    constructor(baseUrl = "/api/bookBorrowRegistrations") {
        this.api = createApiClient(baseUrl)
    }

    async create(readerId, bookPrintId) {
        try {
            const input = {
                readerId: readerId,
                bookPrintId: bookPrintId
            };
            console.log(input);
            const data = (await this.api.post("/", input)).data
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

    async findByReader(readerId) {
        try {
            const data = (await this.api.get(`/search/${readerId}`)).data
            console.log(data)
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

export default new bookBorrowRgistrationService()

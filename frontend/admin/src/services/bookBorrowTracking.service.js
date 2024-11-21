import createApiClient from "./api.service.js"

class BookBorrowTrackingService {
    constructor(baseUrl = "/api/bookBorrowTrackings") {
        this.api = createApiClient(baseUrl)
    }

    async create(readerId, bookPrintId, staffId) {
        try {
            const input = {
                readerId: readerId,
                bookPrintId: bookPrintId,
                staffId: staffId,
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

    async findOverdueBooks(){
        try {
            const data = (await this.api.get("/overdue")).data
            return {
                status: "success",
                message: data.message || "Overdue books retrieved successfully",
                data: data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }
    async returnBook(tracking){
        try {
            console.log(tracking);
            const data = (await this.api.post(`/bookPrint`, tracking)).data
            return {
                status: "success",
                message: data.message || "Book returned successfully",
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

export default new BookBorrowTrackingService()

import createApiClient from "./api.service.js"

class TheoDoiMuonSachService {
    constructor(baseUrl = "/api/bookBorrowTrackings") {
        this.api = createApiClient(baseUrl)
    }

    // Tạo mới thông tin mượn sách
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
                message: data.message || "Mượn sách thành công",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response?.data?.message || "Mượn sách thất bại",
            }
        }
    }

    // Lấy tất cả danh sách theo dõi mượn sách
    async findAll() {
        try {
            const data = (await this.api.get("/")).data
            return {
                status: "success",
                message: data.message || "Danh sách mượn sách đã được lấy thành công",
                data: data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response?.data?.message || "Không thể lấy danh sách mượn sách",
            }
        }
    }

    // Lấy danh sách sách quá hạn
    async findOverdueBooks() {
        try {
            const data = (await this.api.get("/overdue")).data
            return {
                status: "success",
                message: data.message || "Danh sách sách quá hạn đã được lấy thành công",
                data: data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response?.data?.message || "Không thể lấy danh sách sách quá hạn",
            }
        }
    }

    // Trả sách
    async returnBook(tracking) {
        try {
            console.log(tracking);
            const data = (await this.api.post(`/bookPrint`, tracking)).data
            return {
                status: "success",
                message: data.message || "Trả sách thành công",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response?.data?.message || "Trả sách thất bại",
            }
        }
    }
}

export default new TheoDoiMuonSachService()

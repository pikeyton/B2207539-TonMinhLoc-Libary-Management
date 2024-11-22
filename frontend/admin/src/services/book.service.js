import createApiClient from "./api.service.js"

class BookService {
    constructor(baseUrl = "/api/books") {
        this.api = createApiClient(baseUrl)
    }

    async create(book) {
        try {
            console.log(book);
            const response = await this.api.post("/", book, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return {
                status: "success",
                message: response.data.message || "Cho mượn sách thành công",
                data: response.data.data,
            };
        } catch (err) {
            return {
                status: "error",
                message: err.response?.data?.message || "Đã xãy ra lỗi khi cho mượn sách",
                error: err.response?.data || err.message,
            };
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

    async findByPublicId(publicId) {
        try {
            console.log(publicId);
            const data = (await this.api.get(`/search/publicId?publicId=${publicId}`)).data;
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

    async update(id, book) {
        try {
            console.log(book);
            const data = await this.api.put(`/${id}`,  book, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return {
                status: "success",
                message: data.message || "Book updated successfully",
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
                message: data.message || "Book deleted successfully",
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

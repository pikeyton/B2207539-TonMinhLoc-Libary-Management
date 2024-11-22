import createApiClient from "./api.service.js"

class AuthService {
    constructor(baseUrl = "/api/auths") {
        this.api = createApiClient(baseUrl)
    }

    async login(user) {
        try {
            const data = (await this.api.post("/login", user)).data
            return {
                status: "success",
                message: data.message || "Đăng nhập thành công",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message || "Đăng nhập thất bại",
            }
        }
    }
    
    async register(user) {
        try {
            const data = (await this.api.post("/register/staff", user)).data
            return {
                status: "success",
                message: data.message || "Đăng ký thành công",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message || "Đăng ký thất bại",
            }
        }
    }

    async logout() {
        try {
            const data = (await this.api.post("/logout")).data
            return {
                status: "success",
                message: data.message || "Đăng xuất thành công",
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message || "Đăng xuất thất bại",
            }
        }
    }
}

export default new AuthService()

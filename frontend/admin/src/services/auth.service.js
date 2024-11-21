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
                message: data.message || "Staff logged in successfully",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }
    
    async register(user) {
        try {
            const data = (await this.api.post("/register/staff", user)).data
            return {
                status: "success",
                message: data.message || "Staff registered successfully",
                data: data.data,
            }

        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async logout() {
        try {
            const data = (await this.api.post("/logout")).data
            return {
                status: "success",
                message: data.message || "Staff logged out successfully",
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }
}

export default new AuthService()
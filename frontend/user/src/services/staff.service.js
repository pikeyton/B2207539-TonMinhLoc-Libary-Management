import createApiClient from "./api.service.js"

class StaffService {
    constructor(baseUrl = "/api/staffs") {
        this.api = createApiClient(baseUrl)
    }

    async getStaffById(id) {
        try {
            const data = (await this.api.get(`/${id}`)).data
            return {
                status: "success",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async update(id, data){
        try {
            const response = (await this.api.put(`/${id}`, data)).data
            return {
                status: "success",
                message: response.data.message,
                updatedStaff: response.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }
}

export default new StaffService()

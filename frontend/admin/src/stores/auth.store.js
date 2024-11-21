import { defineStore } from 'pinia'

const authStore = defineStore('auth', {
    state: () => ({
        role: "guest",
        user: null,
    }),
    getters: {
        getRole() {
            return this.role
        },
        getUser() {
            return this.user
        }
    },
    actions: {
        setRole(role) {
            this.role = role
        },
        removeRole() {
            this.role = "guest"
        },
        setUser(user) {
            this.user = user
        },
        resetUser() {
            this.user = null
        }
    },
})

export default authStore
import Login from "@/views/auth/LoginPage.vue";
import Register from "@/views/auth/RegisterPage.vue";

const routes = [
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/register",
        name: "register",
        component: Register,
    }
]

export default routes;
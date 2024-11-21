import { createWebHistory, createRouter } from "vue-router";
import useAuthStore from "@/stores/auth.store.js";
import Home from "@/views/HomePage.vue";
import authRoutes from "./auth.router.js";
import bookRoutes from "./book.router.js";
import authorRoutes from "./author.router.js";
import NotFound from "@/views/NotFound.vue";
import history from "./borrowedHistory.js";

const routes = [
    ...authRoutes,
    ...bookRoutes,
    ...authorRoutes,
    ...history,
    {
        path: '/home',
        alias: '/',
        name: 'home',
        component: Home,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: NotFound,
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    if (!to.meta.requiresAuth) {
        return next()
    }

    const authStore = useAuthStore()
    const role = authStore.getRole
    if (role != to.meta.role) {
        return next({ name: 'login' })
    }
    return next()
});

export default router;
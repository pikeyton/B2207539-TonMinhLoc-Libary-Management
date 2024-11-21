import ReturnBook from "@/views/ReturnBook.vue";
import EnRetard from "@/views/EnRetard.vue";

import Staff from "@/views/auth/ProfilePage.vue";


const routes = [
    {
        path: '',
        meta : {
            requiresAuth: true,
            role: 'staff'
        },
        prop: true,
        children: [
            {
                path: '/staff',
                name:'staff',
                component: Staff,
            },
            {
                path: '/return',
                name: 'return',
                component: ReturnBook,
            },
            {
                path: '/enRetard',
                name: 'enRetard',
                component: EnRetard,
            },

        ]
    }
]
    

export default routes;
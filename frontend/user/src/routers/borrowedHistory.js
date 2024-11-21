import BorrowedHistory from "@/views/borrowedHistory/BorrowedHistory.vue";

import Reader from "@/views/auth/ProfilePage.vue";


const routes = [
    {
        path: '',
        meta : {
            requiresAuth: true,
            role: 'reader'
        },
        prop: true,
        children: [
            {
                path: '/reader',
                name:'reader',
                component: Reader,
            },
            {
                path: '/history',
                name: 'history',
                component: BorrowedHistory,
            },

        ]
    }
]
    

export default routes;
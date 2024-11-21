import Book from "@/views/books/BookPage.vue";

import BookDetail from "@/views/books/BookDetail.vue";
import BookBorrow from "@/views/books/BookBorrow.vue";



const routes = [
    {
        path: '/book',
        meta : {
            requiresAuth: true,
            role: 'reader'
        },
        prop: true,
        children: [
            {   
                path:'',
                name:'book',
                component: Book,
            },
            {
                path:'/book/detail/:id',
                name:'book-detail',
                component: BookDetail,
            },
            {
                path:'/book/borrow/:id',
                name:'book-borrow',
                component: BookBorrow,
            }
        ]
    }
]

export default routes;
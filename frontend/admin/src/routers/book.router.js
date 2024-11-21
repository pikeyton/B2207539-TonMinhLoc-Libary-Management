import Book from "@/views/books/BookPage.vue";
import BookCreate from "@/views/books/BookCreate.vue";
import BookDetail from "@/views/books/BookDetail.vue";
import BookBorrow from "@/views/books/BookBorrow.vue";
import BookUpdate from "@/views/books/BookUpdate.vue";


const routes = [
    {
        path: '/book',
        meta : {
            requiresAuth: true,
            role: 'staff'
        },
        prop: true,
        children: [
            {   
                path:'',
                name:'book',
                component: Book,
            },
            {
                path:'/book/create',
                name:'book-create',
                component: BookCreate,
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
            },
            {
                path:'/book/edit/:id',
                name:'book-edit',
                component: BookUpdate,
            }
        ]
    }
]

export default routes;
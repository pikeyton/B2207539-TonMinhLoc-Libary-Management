import AuthorCreate from "@/views/author/AuthorCreate.vue";
import AuthorUpdate from "@/views/author/AuthorUpdate.vue";
import Author from "@/views/author/AuthorPage.vue";


const routes = [
    {
        path: '/author',
        meta : {
            requiresAuth: true,
            role: 'staff'
        },
        prop: true,
        children: [
             {   
                 path:'',
                 name:'author',
                 component: Author,
             },
             {
                 path: '/create',
                 name: 'author-create',
                 component: AuthorCreate,
             },
             {
                 path: '/:id/update',
                 name: 'author-update',
                 component: AuthorUpdate,
             }

        ]
    }
]
    

export default routes;
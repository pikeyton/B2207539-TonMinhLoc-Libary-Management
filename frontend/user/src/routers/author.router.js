import Author from "@/views/author/AuthorPage.vue";


const routes = [
    {
        path: '/author',
        meta : {
            requiresAuth: true,
            role: 'reader'
        },
        prop: true,
        children: [
             {   
                 path:'',
                 name:'author',
                 component: Author,
             }

        ]
    }
]
    

export default routes;
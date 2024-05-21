export const postModule =  {
    state: ()=>({
        posts: [],       
        isLoaded: false,
        selectedSort: '',
        searchQuery: '',
        limit: 10,
        page: 0,
        totalPages: 0,
        sortOptions: [
            {value: 'title', name: 'По названию'},
            {value: 'body', name: 'По описанию'},
        ]
    }),
    getters:{
        sortedPost(state) {
            return [...state.posts].sort((a,b)=>a[state.selectedSort]?.localeCompare(b[state.selectedSort]))
        },
        sortedAndSearchPosts(state, getters) {
            return getters.sortedPost.filter(post=>post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
        }
    },
    mutations: {
        setPosts(state, posts){
            state.posts = posts
        },       
        setLoaded(state, bool){
            state.isLoaded = bool
        },
        setSelectedSort(state, selectedSort){
            state.selectedSort = selectedSort
        },
        setSearchQuery(state, searchQuery){
            state.searchQuery = searchQuery
        },
        setPage(state, page){
            state.page = page
        },
        setTotalPages(state, totalPages){
            state.totalPages = totalPages
        },
    },
    actions: {
        async getPost({state, commit}){
            try {
                commit('setLoaded',true)  
                const url = 'https://jsonplaceholder.typicode.com/posts?'            
                const res = await fetch(`${url}_limit=${state.limit}&_page=${state.page}`)
                .then(res=>[...res.headers.entries()] )
                const count = res.filter(p=>p[0].toLowerCase()==='x-total-count')[0][1]          
            
                commit('setTotalPages', Math.ceil(count/state.limit))
                const resPost = await fetch(`${url}_limit=${state.limit}&_page=${state.page}`)
                commit('setPosts',await resPost.json())
                commit('setLoaded',false)
                
            } catch (error) {
                Promise.reject(error)
                console.log(error);
            }
                    
        },
        async loadMorePost({state, commit}){
            try {
                commit('setPage', state.page + 1)   
                const url = 'https://jsonplaceholder.typicode.com/posts?'            
                const res = await fetch(`${url}_limit=${state.limit}&_page=${state.page}`)
                .then(res=>[...res.headers.entries()] )
                const count = res.filter(p=>p[0].toLowerCase()==='x-total-count')[0][1]          
                
                commit('setTotalPages', Math.ceil(count/state.limit))
                const resPost = await fetch(`${url}_limit=${state.limit}&_page=${state.page}`)
                const postsRes = await resPost.json()
                commit('setPosts',[...state.posts, ...postsRes] )
            } catch (error) {
                Promise.reject(error)
                console.log(error);
            }

                 
        },
    },
    namespaced: true
}
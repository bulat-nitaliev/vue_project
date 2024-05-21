import { ref, computed } from 'vue'

export default function useLoadMorePosts(posts, limit=10){
    const page = ref(1)
    const totalPages = ref(0)
    const loadMorePost = async ()=>{
        page.value += 1  
        const url = 'https://jsonplaceholder.typicode.com/posts?'            
        const res = await fetch(`${url}_limit=${limit}&_page=${page.value}`)
        .then(res=>[...res.headers.entries()] )
        const count = res.filter(p=>p[0].toLowerCase()==='x-total-count')[0][1]          
        
        totalPages.value = Math.ceil(count/limit)
        const resPost = await fetch(`${url}_limit=${limit}&_page=${page.value}`)
        const postsRes = await resPost.json()
        posts.value =  [...posts.value, ...postsRes]  
    
    }   
    return { loadMorePost, page }

}
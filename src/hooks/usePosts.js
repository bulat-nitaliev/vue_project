import { onMounted, ref } from "vue"

export default function usePosts(limit=10, page=1){
    const posts = ref([])
    const isLoaded = ref(true)
    const totalPages = ref(0)
    const fetching = async ()=>{
        try { 
            const url = 'https://jsonplaceholder.typicode.com/posts?'            
            const res = await fetch(`${url}_limit=${limit}&_page=${page}`)
            .then(res=>[...res.headers.entries()] )
            const count = res.filter(p=>p[0].toLowerCase()==='x-total-count')[0][1]          
              
            totalPages.value = Math.ceil(count/limit)
            const resPost = await fetch(`${url}_limit=${limit}&_page=${page}`)
            posts.value = await resPost.json()
            isLoaded.value = false 
        } catch (error) {
           Promise.reject(error) 
           console.log(error);
        }
    }

    onMounted(fetching)
    return {
        posts, isLoaded, totalPages
    }
    
              
    
}


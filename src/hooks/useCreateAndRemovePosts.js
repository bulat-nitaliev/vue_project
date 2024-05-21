import { ref } from "vue"

export default function useCreateAndRemovePosts(posts){
    const isVasible = ref(false)
    const createPost = (post)=>{
        
        posts.value.push(post)
        isVasible.value = false
    }
    const removePost = (post)=>{
        posts.value = posts.value.filter(p=>p.id!==post.id)
    }
    const showDialog = ()=>{
        console.log(isVasible);
        isVasible.value = true
    }
    return { createPost, removePost, showDialog, isVasible }
}


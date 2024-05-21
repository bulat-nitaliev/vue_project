import { computed, ref } from "vue";

export default function useSortedPosts(posts){
    const selectedSort = ref('')
    const sortedPosts = computed(() => {
        return [...posts.value].sort((a,b)=>a[selectedSort.value]?.localeCompare(b[selectedSort.value]))
    })
    return { selectedSort, sortedPosts}
}
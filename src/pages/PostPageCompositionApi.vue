<template>
    <div >
        <h1>Список постов</h1>
        <my-input
            v-focus
            v-model="searchQuery"
            ></my-input>
        <div class="app__btns">
            <my-button @click='showDialog' >Создать пост</my-button>
            <my-select 
                v-model="selectedSort"
                :options="sortOptions"
                ></my-select>
        </div>
        
        <my-dialog v-model:show="isVasible" >           
            <post-form @create="createPost"/>
        </my-dialog>
        
        <post-list v-if="!isLoaded" :posts="sortedAndSearchPosts" @remove="removePost" />  
        <div v-else><h2>Идет загрузка ...</h2></div>
        <div v-intersection="loadMorePost" class="observer"></div>
        <!-- <div class="page__wrapper">
            <div 
                class="page"
                :class="{
                    'current-page': page===pageNumber
                }"
                v-for="pageNumber in totalPages"
                :key="pageNumber"
                @click="changePage(pageNumber)"
                >{{ pageNumber }}</div>
        </div> -->
    </div>
    
    
    
</template>

<script>
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import { ref } from 'vue'
import usePosts from '@/hooks/usePosts'
import useSortedPosts from '@/hooks/useSortedPosts'
import useSortedAndSearchPosts from '@/hooks/useSortedAndSearchPosts'
import useCreateAndRemovePosts from '@/hooks/useCreateAndRemovePosts'
import useLoadMorePosts from '@/hooks/useLoadMorePosts'


    
    
export default{
    components:{
        PostForm, PostList,
    },
    data() {
        return {
            page: 1,
            isVasible: false,
            sortOptions: [
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По описанию'},
            ]
        }
    },
    setup(props){
       const { posts, isLoaded, totalPages } = usePosts() 
       const { selectedSort, sortedPosts} = useSortedPosts(posts)
       const {searchQuery, sortedAndSearchPosts } = useSortedAndSearchPosts(sortedPosts)
       const { createPost, removePost, showDialog, isVasible } = useCreateAndRemovePosts(posts)
       const { loadMorePost, page } = useLoadMorePosts(posts)

       return {
        posts, isLoaded, totalPages, selectedSort, sortedPosts, searchQuery, sortedAndSearchPosts, createPost, removePost, showDialog, isVasible, loadMorePost, page
       }
    }
    
    }
    

</script>

<style >
   
    .app__btns {
        margin: 15px 0;
        display: flex;
        justify-content: space-between;
    }
    .page__wrapper {
        display: flex;
        margin-top: 15px;
    }
    .page {
        border: 1px solid black;
        padding: 10px;
    }
    .current-page {
        border: 2px solid teal;
        background: burlywood;
    }
    .observer {
        height: 30px;
        background: green;
    }
</style>
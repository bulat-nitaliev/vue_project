<template>
    <div >
        <h1>Список постов</h1>
        <my-input
            v-focus
            :model-value="searchQuery"
            @update:model-value='setSearchQuery'
            ></my-input>
        <div class="app__btns">
            <my-button @click='showDialog' >Создать пост</my-button>
            <my-select 
                :model-value="selectedSort"
                @update:model-value='setSelectedSort'
                :options="sortOptions"
                ></my-select>
        </div>
        
        <my-dialog 
            v-model:show='isVasible'
            
            >
        <!-- v-model:show="isVasible" >    -->
            <post-form @create="createPost"/>
        </my-dialog>
        
        <post-list v-if="!isLoaded" 
            :posts="sortedAndSearchPosts"
            @remove="removePost" />  
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
import { mapActions, mapGetters, mapMutations, mapState} from 'vuex'
    
    
export default{
    components:{
        PostForm, PostList,
    },
    data() {
        return {           
            isVasible: false,          
        }   
    },
    methods: {
            createPost(post){  
                this.posts.push(post)
                this.isVasible = false
            },
            removePost(post){           
                this.setPosts(this.posts.filter(p=>p.id!==post.id))             
            },
            showDialog(){
                this.isVasible = true
            },
            ...mapActions({
                getPost: 'post/getPost',
                loadMorePost: 'post/loadMorePost'
            }),
            ...mapMutations({
                setPage: 'post/setPage',
                setSelectedSort: 'post/setSelectedSort',
                setSearchQuery: 'post/setSearchQuery',
                setPosts: 'post/setPosts'
            }),
        },
        mounted(){
        //    this.getPost()
        },
        computed:{
           ...mapGetters({
                sortedPost: 'post/sortedPost',
                sortedAndSearchPosts: 'post/sortedAndSearchPosts'
            }),
            ...mapState({
                posts: state=>state.post.posts,       
                isLoaded: state=>state.post.isLoaded,
                selectedSort: state=>state.post.selectedSort,
                searchQuery: state=>state.post.searchQuery,
                limit: state=>state.post.limit,
                page: state=>state.post.page,
                totalPages: state=>state.post.totalPages,
                sortOptions:state=>state.post.sortOptions
            })
        },
        watch: {
            // page() {
            //     this.getPost()
            // }
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
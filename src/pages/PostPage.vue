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
    
    
export default{
    components:{
        PostForm, PostList,
    },
    data() {
        return {
            posts: [],
            isVasible: false,
            isLoaded: false,
            selectedSort: '',
            searchQuery: '',
            limit: 10,
            page: 1,
            totalPages: 0,
            sortOptions: [
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По описанию'},
            ]
        }
    },
    methods: {
            createPost(post){  
                this.posts.push(post)
                this.isVasible = false
            },
            removePost(post){
                this.posts = this.posts.filter(p=>p.id!==post.id)
            },
            showDialog(){
                this.isVasible = true
            },
            async getPost(){
                this.isLoaded = true  
                const url = 'https://jsonplaceholder.typicode.com/posts?'            
                const res = await fetch(`${url}_limit=${this.limit}&_page=${this.page}`)
                .then(res=>[...res.headers.entries()] )
                const count = res.filter(p=>p[0].toLowerCase()==='x-total-count')[0][1]          
                  
                this.totalPages = Math.ceil(count/this.limit)
                const resPost = await fetch(`${url}_limit=${this.limit}&_page=${this.page}`)
                this.posts = await resPost.json()
                this.isLoaded = false       
            },
            async loadMorePost(){
                this.page += 1  
                const url = 'https://jsonplaceholder.typicode.com/posts?'            
                const res = await fetch(`${url}_limit=${this.limit}&_page=${this.page}`)
                .then(res=>[...res.headers.entries()] )
                const count = res.filter(p=>p[0].toLowerCase()==='x-total-count')[0][1]          
                  
                this.totalPages = Math.ceil(count/this.limit)
                const resPost = await fetch(`${url}_limit=${this.limit}&_page=${this.page}`)
                const postsRes = await resPost.json()
                this.posts = [...this.posts, ...postsRes]      
            },
            // changePage(pageNumber) {
            //     this.page = pageNumber
                
            // }
            
        },
        mounted(){
            this.getPost();
            

        },
        computed:{
            sortedPost() {
                return [...this.posts].sort((a,b)=>a[this.selectedSort]?.localeCompare(b[this.selectedSort]))
            },
            sortedAndSearchPosts() {
                return this.sortedPost.filter(post=>post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
            }
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
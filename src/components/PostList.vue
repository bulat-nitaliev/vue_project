<template>
<div v-if="posts.length">
    <h3>Список Постов</h3>
    <transition-group name="post-list">
        <post-item  
        v-for="post in posts" 
        :post="post" 
        :key="post.id" 
        @remove="$emit('remove', post)"
    /> 
    </transition-group>

    
</div>
<h3 v-else style="color:red">Список Постов пуст</h3>
            
</template>

<script>
import PostItem from '@/components/PostItem'
export default {
  components: { PostItem },
    props: {
        posts:{
            type: Array,
            required: true,
        }
    },
    methods:{
       
    }
}
</script>

<style scoped>
.post-list-item {
  display: inline-block;
  margin-right: 10px;
}
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.4s ease;
}
.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}
.post-list-move {
  transition: transform 0.8s ease;
}
</style>

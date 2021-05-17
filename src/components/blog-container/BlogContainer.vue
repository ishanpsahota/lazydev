<template>
    <div class="row mx-0 p-3">
      <h1 class=""> {{title}} </h1>      
      <div class="row blog-collection-wrapper w-100 mx-0">                
        <div class="blog-item-wrapper" v-for="(blog, i) in blogs" :key="i">            
          <div v-if="blog.image" >            
            <blog-item :title="blog.title" :category="blog.category" :image="blog.image" :containerItem="true" />
          </div>
          <div v-else>              
            <glass-div :category="blog.category" :title="blog.title" :size="'md'" :animation="true" :containerItem="true" :ifBlogContainerItem="true" />
          </div>          
        </div>  
        <div class="blog-item-wrapper">          
          <glass-div  :title="null" :category="null" :animation="true"  :size="'md'" :containerItem="true" :ifBlogContainerItem="true" />
        </div>        
      </div>
    </div>
</template>

<script>

import BlogItem from '../blog-item-content/BlogItem.vue'
import GlassDiv from '../glass-item/GlassDiv.vue'

export default {
    name: 'BlogContainer',
    components: {
      GlassDiv,              
      BlogItem
    },
    props: {
        title: String,
        blogs: Array
    },
    methods: {

      

    }
}
</script>

<style>

</style>
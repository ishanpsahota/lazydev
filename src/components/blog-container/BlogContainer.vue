<template>
    <div class="row mx-0 p-3">
      <h1 class=""> {{title}} </h1>      
      <div class="row blog-collection-wrapper mx-0">                
        <div class="blog-item-wrapper" v-for="(blog, i) in blogs" :key="i">            
          <div v-if="blog.image" >
            
          </div>
          <div v-else>
              <GlassDiv :url="get_title(blog.title)" :category="toLowerCase(blog.category)" :title="blog.title" />
          </div>
        </div>             
      </div>
    </div>
</template>

<script>

import GlassDiv from '../glass-item/GlassDiv'

export default {
    name: 'BlogContainer',
    components: {
      GlassDiv
    },
    props: {
        title: String,
        blogs: Array
    },
    methods: {
        get_title(link) {
            return link.split(" ").join("-").toLowerCase();
        },

        toLowerCase(link) {
          return link.toLowerCase();
        }
    }
}
</script>

<style>

</style>
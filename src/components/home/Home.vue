<template>
  <section class="home" id="home">
    <SuggestionsPill :keywords="suggestions" />
    <div class="row mx-0 p-3 text-center d-flex" v-if="blogs == null">
      <b-spinner label="Spinning" class="m-auto"  ></b-spinner>    
    </div>    
    <BlogContainer title="trending articles" v-if="blogs" :blogs="blogs" />        
  </section>
</template>

<script>

import BlogContainer from '../blog-container/BlogContainer'
import SuggestionsPill from '../suggestions-pill/SuggestionsPill'
import GlassDiv from '../glass-item/GlassDiv';

import api from '../../api/index'

import { BSpinner } from 'bootstrap-vue'

export default {
    name: 'Home',
    components: {
      BlogContainer,
      SuggestionsPill,      
      GlassDiv,
      BSpinner
    },

    data() {
        return {                  
          blogs: null,
          error: {
            blogs: null
          },
          suggestions: [
            {
              word: 'Travel',
              type: 'category'
            },
            {
              word: 'Python',
              type: 'tags'
            },
            {
              word: 'CSS',
              type: 'tags'
            },
            {
              word: 'JS',
              type: 'tags'
            },          
          ]
        }
    },

    methods: {
      
        get_title(link) {
            return link.split(" ").join("-").toLowerCase();
        },

        getBlogs() {
          api.getBlogs()
          .then(res => {
            setTimeout(() => {
              this.blogs = res.data.blogs  
            }, 500);
            
          }).catch(err => {
            this.error.blogs = err;
            this.blogs = null
          })
        }

    },

    created() {

      this.getBlogs();
    },


}
</script>

<style>

</style>
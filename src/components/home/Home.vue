<template>
  <section class="home" id="home">
    <SuggestionsPill title="suggested categories" :keywords="suggestions" />
    <div class=" w-100 mx-0 p-2">
      <b-spinner class="" v-if="loading.trending" />
      <blog-container v-if="blogs.trending" title="trending articles" :blogs="blogs.trending" />
      <div v-if="error.trending" class="alert alert-primary" role="alert">
        <strong>{{error.trending}}</strong>
      </div> 
    </div>
    
  </section>
</template>

<script>

import BlogContainer from '../blogs-component/blog-container/BlogContainer'
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
      BSpinner,
        BlogContainer
    },

    data() {
        return {                  
          blogs: {
            trending: null
          },
          error: {
            blogs: {
              trending: false
            },
            suggestions: null
          },
          suggestions: null,
          loading: {
            trending: true
          }
        }
    },

    methods: {
      
        get_title(link) {
            return link.split(" ").join("-").toLowerCase();
        },

        getTrending() {
          api.getTrendingBlogs()
          .then(res => {
            setTimeout(() => {
              this.loading.trending = false
              this.blogs.trending = res.blogs
            }, 500);
            
          }).catch(err => {
            this.error.blogs.trending = err;
            this.blogs.trending = null
          })
        },

        getSuggestions() {
          api.getCategories()
          .then(res => {
            this.suggestions = res.categories
          }).catch(err => {
            this.error.suggestions = err;
          })
        }

    },

    created() {

      this.getTrending();
      this.getSuggestions()
    },


}
</script>

<style>

</style>
<template>
  <section class="home full-view" id="home">
    <!-- <div class="m-auto py-5 text-center col-12" v-if="loading">
      <flower-spinner
          :animation-duration="2500"
          :size="70"
          color="#ff1d5e"          
          class="m-auto"    
      />
    </div>
    <div v-else class="animation-fade-show">      
      <SuggestionsPill title="suggested categories" :keywords="suggestions" />
      <div class="row w-100 mx-0">        
        <blog-container v-if="blogs.trending" title="trending articles" :blogs="blogs.trending" />
        <div v-if="error.trending" class="alert alert-primary" role="alert">
          <strong>{{error.trending}}</strong>
        </div> 
      </div>
      <div class="row w-100 mx-0">        
        <blog-container v-if="blogs.new" title="new articles" :blogs="blogs.new" />
        <div v-if="error.new" class="alert alert-primary" role="alert">
          <strong>{{error.new}}</strong>
        </div> 
      </div> -->
      
    <!-- </div> -->
  </section>
</template>

<script>

import { FlowerSpinner } from 'epic-spinners'
import BlogContainer from '../blogs-component/blog-container/BlogContainer'
import SuggestionsPill from '../suggestions-pill/SuggestionsPill'
import GlassDiv from '../glass-item/GlassDiv';
import api from '../../api/index'



export default {
    name: 'Home',
    components: {
      BlogContainer,
      SuggestionsPill,      
      GlassDiv, 
      FlowerSpinner,
      BlogContainer
    },

    data() {
        return {                  
          blogs: {
            trending: null,
            new: null,
            similar: []
          },
          error: {
            blogs: {
              trending: false,
              new: null, 
              similar: null
            },
            suggestions: null
          },
          suggestions: null,
          loading: true
        }
    },

    methods: {
      
        get_title(link) {
            return link.split(" ").join("-").toLowerCase();
        },

        getTrending() {
          api.getTrendingBlogs(null, 10)
          .then(res => {
            // console.log(res)
            setTimeout(() => {
              this.loading = false
              this.blogs.trending = res.blogs
            }, 500);
            
          }).catch(err => {
            this.error.blogs.trending = err;
            this.blogs.trending = null
          })
        },

        async getSuggestions() {
          await api.getCategories()
          .then(res => {
            this.suggestions = res.categories
          }).catch(err => {
            this.error.suggestions = err;
          })
        },

        getNew() {
          api.getNew(10)
          .then(res => {
            setTimeout(() => {
              this.loading = false
              this.blogs.new = res.blogs
            }, 500);
            
          }).catch(err => {
            this.error.blogs.new = err;
            this.blogs.new = null
          })
        },
        
        getSimilarBlogs(phrase, limit) {
          api.getSimilarBlogs(phrase, null, limit )
          .then(res => {        
            setTimeout(() => {
              this.loading = false
              this.blogs.similar.push(res.blogs)
            }, 500);
          }).catch(err => {
            this.error.blogs.similar = err;
            this.blogs.similar = null
          })
        },


        getBlogs() {
          this.getSuggestions()
          this.getTrending()
          this.getNew()
          // this.getSimilarBlogs('music', null, 1)
        }

        

    },

    mounted() {

      this.getBlogs()
      
    },


}
</script>

<style>

</style>
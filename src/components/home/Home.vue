<template>
  <section class="home" id="home">
    <!-- <div class="row mx-0 p-3">
      <h1 class="">trending articles </h1>      
      <div class="row blog-collection-wrapper mx-0">                
        <div class="blog-item-wrapper" v-for="(blog, i) in blogs" :key="i">            
          <div class="blog-item-img">            
            <img :src="blog.image" class="">
          </div>
          <div class="blog-item-text">
            <router-link class="blog-visit" :to="'/blog/' + get_title(blog.title)">
              <h4>
                <strong> {{blog.title}} </strong>
              </h4>
            </router-link>
            <span class="badge badge-accent"> 
              <router-link :to="'/blogs/c/' + blog.category">
                {{blog.category}}
              </router-link>
            </span>
          </div>
        </div>             
      </div>
    </div> -->
    <SuggestionsPill :keywords="suggestions" />
    <BlogContainer title="trending articles" :blogs="blogs" />        
  </section>
</template>

<script>

import BlogContainer from '../blog-container/BlogContainer'
import SuggestionsPill from '../suggestions-pill/SuggestionsPill'
import GlassDiv from '../glass-item/GlassDiv';

export default {
    name: 'Home',
    components: {
      BlogContainer,
      SuggestionsPill,      
      GlassDiv
    },

    data() {
        return {        
          blogs: [
            {
              title: 'Sukhna Lake',
              image: 'https://res.cloudinary.com/ishanpsahota/image/upload/v1618941753/laazzzyyyy.dev/IMG20210204171458_wk2fct.jpg',
              category: 'Travel'
            },
            {
              title: 'Python',
              image: null,
              category: 'Programming'
            },
            {
              title: 'Music',
              image: null,
              category: 'Music'
            },
            {
              title: 'AirTags',
              image: null,
              category: 'Tech'
            },
            {
              title: 'Trends in CSS',
              image: null,
              category: 'Web Development'
            }
          ],
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
        }

    },

    created() {

      // console.log(this.blogs);
    }
}
</script>

<style>

</style>
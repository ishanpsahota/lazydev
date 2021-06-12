<template>
  <div class="row mx-0 p-2 mt-3 blogs-view-container">
    <div class="row w-100 mx-0 p-3 d-flex" v-if="loader.blog">
      <b-spinner label="Spinning" class="m-auto"/>
    </div>
    <div class="blogs-view-header col-12 p-0 m-0 no-gutters" v-if="blog">      
      <div class="col-xl-6 mx-auto col-12" >
        <div  class="blogs-view-hero-wrapper m-auto">
          <blog-item v-if="blog.image.url" :category="blog.category" :image="blog.image.url" :title="blog.title"  />          
          <glass-div v-else :title="blog.title" :category="blog.category" />          
        </div>                      
      </div>      
      <div class="col-12 my-2 text-center">        
        <h6> By 
          <router-link :to="'/authors/' + getAuthor(blog.author)" class="clickable">
            {{blog.author}}
          </router-link>
        </h6>        
        <small> <b-icon-calendar2 /> 
          <router-link :to="'/search?q=' + getDate(blog.date, true) + '&type=date'" class="clickable">
            &nbsp; {{getDate(blog.date, false)}}
          </router-link>
        </small>        
      </div>      
    </div>      
	  <div class="blog-view-main w-100" v-if="blog">
      <div class="row w-100 mx-0 ">
        <div class="col-md-3 col-lg-2 d-none sticky-top d-md-block  blog-view-index-wrapper ">         
          <div class="sticky-top pt-5">
            <ul class="index-list">
              <li class="index-list-item" v-for="(block, i) in blog.blocks" :key="i"> 
                <a :href="`#${getId(block.heading)}`" class="" @click="highlightHeading(getId(block.heading))">
                  {{block.heading}} 
                </a>
              </li>
            </ul>
            <div class="blog-view-icons p-3 text-center justify-content-center d-flex flex-column " style="background: transparent">                  
              <div class="like-icon mx-auto" style="background: transparent">              
                <b-icon-heart @click="triggerAction('liked', 1)" font-scale="2" :class="[blog.liked ? 'd-none' : 'd-block', 'm-1']" />
                <b-icon-heart-fill class="text-purple" font-scale="2" @click="triggerAction('liked', 0)" :class="[blog.liked ? 'd-block' : 'd-none', 'm-1']" />                        
              </div>
              <small v-if="!blog.liked"> Like this post! </small>
              <small v-else> Post Liked! </small>                  
            </div>   
            <b-alert dismissible fade :show="error.saveBlog" variant="danger"> Error saving blog!  </b-alert>        
          </div>                 
          <!-- <blog-index-list :blocks="blog.blocks" :liked="blog.liked" /> -->
        </div>
        <div class="col-md-6 col-lg-8 pt-5 blog-view-content-wrapper">
          <div class="block-wrapper" v-for="(block, i) in blog.blocks" :key="i" :id="getId(block.heading)" :ref="getId(block.heading)">
            <h2 class="">
              {{block.heading}}
            </h2>
            <blog-image v-if="block.image.url" :image="block.image.url" :size="block.imageSize" />
            <p class="text-sm-sm" v-html="renderText(block.text)">                        
            </p>
            <glass-div class="mx-auto" :size="'sm'" v-if="block.tip" :animation="false" :category="null" :containerItem="false" :ifBlogContainerItem="false" :title="block.tip" />            
            <div class="blog-view-icons justify-content-end text-right p-3 d-flex flex-row" style="background: transparent">
              <div class="bookmark-icon " style="background: transparent">
                <b-icon-bookmark @click="triggerAction('saved', 1, i)" :class="[block.saved ? 'd-none' : 'd-block', 'm-1']" />
                <b-icon-bookmark-fill @click="triggerAction('saved', 0, i)" :class="[block.saved ? 'd-block' : 'd-none', 'm-1']" />                                
              </div>              
              <b-alert dismissible fade :show="error.saveBlock" variant="danger"> Error saving block!  </b-alert>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-lg-2 blog-view-ad-wrapper">
          ads here
        </div>
      </div>
	  </div>
    <div v-if="error.blog" class="alert bg-blue-md col-12 col-md-3 text-center mx-auto  " role="alert">
        <strong>Can't find any blogs.</strong>
        <hr>
        <button class="btn bg-light  my-2" type="button" @click="getBlog()"> Try again </button>
    </div>
    <div class="blog-view-recommended w-100">
      <div class="row w-100 mx-0 p-3 d-flex" v-if="loader.similar">
        <b-spinner label="Spinning" class="m-auto"/>
      </div>
      <blog-container v-if="similar.length > 0" title="similar articles" :blogs="similar" />
      <div v-if="similar == null" class="alert bg-blue-md col-12 col-md-3 text-center mx-auto  " role="alert">
        <strong>Can't find any blogs similar to this.</strong>
        <button class="btn bg-light  my-2" type="button" @click="getSimilar()"> Try again </button>
      </div>
      <b-alert variant="danger" v-if="error.similar"> Can't find the blog. Try again! </b-alert>    
    </div>    
  </div>	
</template>

<script>
import { BIconCalendar2, BIconBookmark, BIconBookmarkFill, BIconHeart, BIconHeartFill, BSpinner, BAlert } from 'bootstrap-vue'
import BlogItem from '../../blog-item-content/BlogItem.vue'
import GlassDiv from '../../glass-item/GlassDiv.vue'
import BlogImage from '../BlogImage/BlogImage.vue'
import BlogIndexList from '../blog-index-list/BlogIndexList';

import api from '../../../api/index'
import BlogContainer from '../blog-container/BlogContainer'

export default {
  name: 'BlogView',
  components: { 
    GlassDiv, 
    BlogItem, 
    BIconCalendar2, 
    BlogImage, 
    BIconBookmark, BIconBookmarkFill, 
    BIconHeart, BIconHeartFill,
    BlogIndexList,    
    BSpinner,
    BAlert,
    BlogContainer
  },
  data() {
    return {
      blog: null,
      loader: {
        blog: false,
        similar: false
      },
      error: {
        blog: false,
        saveBlock: false,
        saveBlog: false,
        similarBlogs: false
      },
      similar: []
    }
  },
  methods: {
    getAuthor(author) {
      return author.toLowerCase().split(" ").join("")
    },    

    getDate(date, withoutHyphen) {
      // console.log(date)
      if(withoutHyphen)
        return date.split("T")[0].split("-").join("_");
      else return date.split("T")[0]
    },

    getId(heading) {
      var array = heading.split(" ");
      for(var i = 0; i < array.length; i++) {
        array[i] = array[i].split("-").join("")
        let str = array[i]        
        // console.log(str)
        let new_str = str[0].toUpperCase();
        for(var j = 1; j < str.length; j++) {
          new_str +=  str[j]
        }
        array[i] = new_str;
        // console.log(array[i])
      }

      return array.join("")
    },

    highlightHeading(heading) {
      this.$refs[heading][0].classList.add('highlight');
      // console.log(this.$refs[heading][0].classList)

      setTimeout(() => {
        this.$refs[heading][0].classList.remove('highlight');
      }, 2000 )
    },    

    triggerAction(type, status, i) {

      
      if(type == 'saved') {
        api.saveBlock(this.$route.params.title, i)
        .then(res => {
          this.blog.blocks[i].saved = res          
        }).catch(err => {
          this.error.saveBlock = true
        })
      }

      if(type == 'liked') {
        api.saveBlog(this.$route.params.title)
        .then(res => {          
          this.blog.liked = res;          
        }).catch(err => {
          this.error.saveBlog = true
        })
      }

    },

    getBlog() { 
      
      this.loader.blog = true

      api.getSingleBlog(this.$route.params.title)
      .then(res => {        
        if(res.blog == null)
        {
          this.loader.blog = false
          this.error.blog = true
          // console.log('h')
        }
        else {
          this.loader.blog = false
          this.blog = res.blog         
        }

         setTimeout(() => {
            this.getSimilar(this.blog ? this.blog.category : null)
          }, 1500);

      }).catch(err => {
        this.loader.blog = false
        this.error.blog = err
        this.blog = null
      })
    },

    getSimilar(category) {

      this.loader.similar = true

      if(!category || !this.$route.params.title) {
        api.getTrendingBlogs()
        .then(res => {
          this.loader.similar = false
          this.similar = res.blogs
        }).catch(err => {
          this.error.similarBlogs = err;
        })
      }
      else {
        api.getSimilarBlogs(category, this.$route.params.title)
        .then(res => {
          this.loader.similar = false
          if(res.blogs == []) this.similar = null
          else this.similar = res.blogs
          
        }).catch(err => {
          this.loader.similar = false
          
          this.error.similarBlogs = err
        })
      }      
    },

    renderText(text) {
      return text.replace(/\n/g, "<br />");
    }
    
  },

  created() {
    this.getBlog();
  },

  watch: {

     $route: {
        immediate: true,
        handler(to, from) {
          this.getBlog()
        }
      }
  }

}
</script>

<style>

</style>.
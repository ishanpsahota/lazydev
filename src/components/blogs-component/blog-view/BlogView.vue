<template>
  <div class="row mx-0 p-2 mt-3 blogs-view-container">
    <div class="row w-100 mx-0 p-3 d-flex" v-if="blog == null">
      <b-spinner label="Spinning" class="m-auto"/>
    </div>
    <div class="blog-view-header col-12 p-0 m-0 no-gutters" v-if="blog">      
      <div class="col-xl-6 mx-auto col-12" >
        <div  class="blog-view-hero-wrapper mx-auto">
          <blog-item v-if="blog.image" :category="blog.category" :image="blog.image" :title="blog.title" :containerItem="false"  />          
          <glass-div v-else :title="blog.title" :category="blog.category" :animation="false" :containerItem="false" :ifBlogContainerItem="false" :size="'md'" />
        </div>                      
      </div>      
      <div class="col-12 my-2 text-center">        
        <h6> By 
          <router-link :to="'/authors/' + getAuthor(blog.author.authorName)" class="clickable">
            {{blog.author.authorName}}
          </router-link>
        </h6>        
        <small> <b-icon-calendar2 /> 
          <router-link :to="'/blogs/d/' + getDate(blog.date, true)" class="clickable">
            &nbsp; {{getDate(blog.date, false)}}
          </router-link>
        </small>        
      </div>      
    </div>      
	  <div class="blog-view-main w-100" v-if="blog">
      <div class="row w-100 mx-0 ">
        <div class="col-md-2 d-none sticky-top d-md-block  blog-view-index-wrapper ">         
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
        <div class="col-md-8 pt-5 blog-view-content-wrapper">
          <div class="block-wrapper" v-for="(block, i) in blog.blocks" :key="i" :id="getId(block.heading)" :ref="getId(block.heading)">
            <h2 class="">
              {{block.heading}}
            </h2>
            <blog-image v-if="block.image" :image="block.image" :size="block.imageSize" />
            <p class="text-sm-sm">
              {{block.text}}
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
        <div class="col-md-2 blog-view-ad-wrapper">
          ads here
        </div>
      </div>
	  </div>
    <b-alert variant="danger" v-if="error.blog"> Can't find the blog. Try again! </b-alert>
    <div class="blog-view-recommended w-100">
      <blog-container title="similar articles" :blogs="similar" />
    </div>    
  </div>	
</template>

<script>
import { BIconCalendar2, BIconBookmark, BIconBookmarkFill, BIconHeart, BIconHeartFill, BSpinner, BAlert } from 'bootstrap-vue'
import BlogItem from '../../blog-item-content/BlogItem.vue'
import GlassDiv from '../../glass-item/GlassDiv.vue'
import BlogImage from '../BlogImage/BlogImage.vue'
import BlogIndexList from '../blog-index-list/BlogIndexList';
import BlogContainer from '../../blog-container/BlogContainer.vue'

import api from '../../../api/index'

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
    BlogContainer,
    BSpinner,
    BAlert
  },
  data() {
    return {
      blog: null,
      error: {
        blog: null,
        saveBlock: null,
        saveBlog: null
      },
      similar: [
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
        },
        {
          title: 'MEVN',
          image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwyNXx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          category: 'Web Development'
        },
        {
          title: 'Schitts Creek',
          image: 'https://th.bing.com/th/id/OIP.ks1accdV4kPRyPEYgRWhwwHaEK?w=317&h=180&c=7&o=5&dpr=1.25&pid=1.7',
          category: 'Netflix'
        }
      ]
    }
  },
  methods: {
    getAuthor(author) {
      return author.toLowerCase().split(" ").join("")
    },

    // getDate() {
    //   var d = new Date()
    //   // var s = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear()
    //   return d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear()
    // },

    getDate(date, withoutHyphen) {
      console.log(date)
      if(withoutHyphen)
        return date.split("T")[0].split("-").join("/");
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
      api.getSingleBlog(this.$route.params.title)
      .then(res => {
        if(res.blog == null)
          this.error.blog = "Can't find the blog"
        else this.blog = res.blog
      }).catch(err => {
        this.error.blog = err
        this.blog = null
      })
    },

    saveBlog() {
      api.saveBlog(this.$route.params.title)
      .then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },

    saveBlock() {

    }
    
    
  },

  mounted() {
      this.getBlog();
  }

}
</script>

<style>

</style>.
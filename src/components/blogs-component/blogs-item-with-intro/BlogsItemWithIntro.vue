<template>
    <div class="row mx-0 w-100 blogs-item-intro-container">
        <h1 class="mx-auto"> more on {{category}}  </h1>
        <div class="col-12 text-center py-5" v-if="blogs.length < 1">
            <flower-spinner
                :animation-duration="2500"
                :size="70"
                color="#ff1d5e"          
                class="m-auto"    
            />
        </div>
        <!-- {{blogs}} -->
        <div class="col-12 px-0 py-3 grid-blogs-intro-wrapper" v-if="blogs">
            <!-- <b-card-group columns class="animation-fade-show"> -->
                <b-card :class="['grid-blogs-intro-item']" v-for="(blog, i) in blogs" :key="i"
                    :img-alt="blog.title" :img-src="blog.image.url"
                >                                    
                    <!-- <b-card-title title-tag="h3" :title="blog.title" /> -->
                    <glass-div :category="null" :title="blog.title" v-if="!blog.image.url" :centre="true" />
                    
                    <router-link class="rt-link rt-link-light rt-link-primary-hover" v-if="blog.image.url" :to="'/blogs/v/' + getTitle(blog.title)"> 
                        <b-card-title :title="blog.title" />
                    </router-link>                    
                    <!-- <b-card-sub-title sub-title-tag="span" class="badge badge-pill badge-suggestions badge-black-light" sub-title-text-variant="light" :sub-title="blog.category" />                     -->
                    <!-- <b-card-sub-title sub-title-tag="span" :sub-title="getDate(blog.date, false)" /> -->
                    <b-card-text> {{blog.intro}} </b-card-text>
                </b-card>
            <!-- </b-card-group> -->
        </div>
        <b-alert v-if="error" title="Error!" variant="danger"> {{error}} </b-alert>
    </div>
</template>

<script>
import { getTitle, getDate } from '../../../utils/functions'
import api from '../../../api/index'
import { FlowerSpinner } from 'epic-spinners'
import { BAlert, BCard, BCardHeader, BCardFooter, 
            BCardBody, BCardImgLazy, BCardText, 
            BCardSubTitle, BCardTitle, BCardImg,
            BCardGroup
        } from 'bootstrap-vue'
import GlassDiv from '../../glass-item/GlassDiv.vue'

export default {
    name: 'BlogsItemIntroContainer',
    components: {
        BAlert, BCard, BCardHeader, BCardImg,
        BCardFooter, BCardBody, BCardImgLazy,
        BCardText, BCardSubTitle, BCardTitle,
        BCardGroup, FlowerSpinner,
        GlassDiv
    },
    props: {
        category: String,        
    },
    data() {
        return {
            
            blogs: [],
            error: '',            
        }
    },

    methods: {
        getBlogs() {

            // this.loading = true

            api.getTrendingBlogs(this.category, null)
            .then(res => {

                setTimeout(() => {
                    this.loading = false
                    this.blogs = res.blogs    
                }, 1500);                
            }).catch(err => {
                this.loading = false
                this.error = err
            })

            
        },

        getTitle(title) {
            return getTitle(title)
        },

        getDate(date) {
            return getDate(date)
        }
    },

    mounted() {
        this.getBlogs()
    }
}
</script>

<style>

</style>
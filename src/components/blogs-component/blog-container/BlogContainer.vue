<template>
    <div class="blogs-container justify-content-center row mx-0 my-4 p-2">                        
        <h1 class="px-1"> {{title}} </h1>                
        <div class="blogs-item-container row " v-if="blogs.length > 0">
            <div class="blogs-item-wrapper" v-for="(blog, i) in blogs" :key="i">
                <blog-container-item v-if="blog.image.url" :image="blog.image" :title="blog.title" :category="blog.category" />
                <glass-div-vue v-else size="xs" :category="blog.category" :title="blog.title" />
            </div>                                                  
        </div>   
        <div class="badge badge-suggestions my-3 badge-pill badge-purple mx-auto">
            <router-link class="" :to="'/blogs?t=' + title.split(' ')[0]"> See More <b-icon-arrow-down /> </router-link>
        </div>
    </div>
</template>

<script>

import BlogContainerItem from '../blog-container-item/blogContainerItem'
import GlassDivVue from '../../glass-item/GlassDiv'

import { BIconArrowDown } from 'bootstrap-vue'

export default {
    name: 'BlogItemsContainer',
    components: {
        BlogContainerItem, 
        GlassDivVue,
        BIconArrowDown
    },
    props: {
        title: String,
        blogs: Array        
    }
}
</script>

<style>

</style>
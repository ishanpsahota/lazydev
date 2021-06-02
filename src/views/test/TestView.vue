<template>
    <section class="test-section">
        <div class="row mx-0 p-3">
            <h1> Testing components </h1>
            <div class="row mx-0 w-100">                
                <div class="col-12">
                    <div class="blog-items-container row mx-0 p-2">                        
                        <b-spinner v-if="loading" />
                        <template v-if="blogs.length > 0">
                            <div class="blogs-item-wrapper" v-for="(blog, i) in blogs" :key="i">
                                <blog-container-item v-if="blog.image" :image="blog.image" :title="blog.title" :category="blog.category" />
                                <glass-div-vue v-else :category="blog.category" :title="blog.title" />
                            </div>                                                  
                        </template>
                        <div v-if="error" class="alert alert-primary" role="alert">
                            <strong>{{error}}</strong>
                        </div>  
                    </div>
                </div>                
            </div>            
        </div>
    </section>
</template>

<script>

import GlassDivVue from '../../components/glass-item/GlassDiv.vue'
import { BSpinner } from 'bootstrap-vue'
import axios from 'axios'
import BlogItemsInnerWrapper from '../../components/blogs-component/blog-items-inner-wrapper/BlogItemsInnerWrapper'
import BlogContainerItem from '../../components/blogs-component/blog-container-item/blogContainerItem'

import { getTitle, toLowerCase } from '../../utils/functions'

export default {
    name: 'test',
    components: {
        GlassDivVue,
        BSpinner,
        BlogItemsInnerWrapper,
        BlogContainerItem
    },
    data() {
        return {
            blogs: [],
            error: '',
            loading: true
        }
    },
    methods: {
        getBlog(title) {
            this.loading = true
            axios.get(`https://lazydevapi.herokuapp.com/api/v1/blogs/${title}`)
            .then(res => {
                // console.log(res)
                this.blogs.push(res.data.blog)
                this.loading = false
            }).catch(error => {
                this.error = error
                this.loading = false
            })
        },

        getImage(image) {
            var img = `background: url('${image}'); `
            // console.log(img)
            return img
        },

        getTitle(phrase) {
            return getTitle(phrase)
        },

        toLowerCase(phrase) {
            return toLowerCase(phrase)
        }
    },

    mounted() {
        this.getBlog('Kiss-Me-More')
        // this.getBlog('JSON-Doc');
        this.getBlog('JSON-Doc');

    }
}
</script>

<style lang="scss">

.blogs {

    &-item {

        &-wrapper {
            display: flex;
            border-radius: 10px;
            margin: 0.5rem;
            overflow: hidden;
        }
    }

    &-img {
        margin: 0.45rem;

        &-wrapper {

            background-attachment: fixed;
            background-size: contain;
            background-position: center;
            padding: 2rem;
            width: 100%;

        }

        &-container {
            
        }
    }
}

</style>
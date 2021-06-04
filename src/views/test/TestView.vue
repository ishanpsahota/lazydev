<template>
    <section class="test-section">
        <div class="row mx-0 p-3">
            <h1> Testing components </h1>
            <div class="row mx-0 w-100">                
                  
            </div>            
        </div>
    </section>
</template>

<script>

import axios from 'axios'

import { getTitle, toLowerCase } from '../../utils/functions'

export default {
    name: 'test',
    components: {
        
    },
    data() {
        return {
            blogs: []            
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



</style>
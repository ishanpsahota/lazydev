<template>
    <div class="glass-wrapper ">    
        <div v-if="!centre" :class="['glass-circle glass-circle-2 animation-rotate pos-bottom pos-left', `glass-circle-${size}` ]"></div>                                    
        <div v-if="!centre" :class="['glass-circle glass-circle-1 animation-rotate pos-top pos-right', `glass-circle-${size}`]"></div>                                    
        <div v-if="centre" :class="['glass-circle glass-circle-2 glass-circle-lg ', centre ? ' glass-circle-centre ' : '']"></div>                                    
        <div class="glass-inner d-flex flex-row" v-if="category || title">
            <blog-items-inner-wrapper :category="category" :title="title" />
        </div>
    </div>                                        
</template>

<script>

import BlogItemsInnerWrapper from '../blogs-component/blog-items-inner-wrapper/BlogItemsInnerWrapper.vue'

export default {
    name: 'GlassItem',
    components: {
        BlogItemsInnerWrapper
      
    },
    props: {        
        title: String,
        category: String,
        size: String,
        centre: Boolean
    },
    data() {
        return {
            
        }
    },

    methods: {
            

    }
}
</script>

<style>

</style>
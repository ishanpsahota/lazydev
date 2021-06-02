<template>
    <div class="glass-wrapper ">    
        <div class="glass-circle glass-circle-2 glass-circle-xs animation-rotate pos-bottom pos-left"></div>                                    
        <div class="glass-circle glass-circle-1 glass-circle-xs animation-rotate pos-top pos-right"></div>                                    
        <div class="glass-inner d-flex flex-row">
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
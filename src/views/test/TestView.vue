<template>
    <section class="test-section">
        <div class="row mx-0 p-3">
            <h1> Testing components </h1>
            <div class="row mx-0 w-100">                
                <blogs-item-with-intro  />          
            </div>            
        </div>
    </section>
</template>

<script>
import BlogsItemWithIntro from '../../components/blogs-component/blogs-item-with-intro/BlogsItemWithIntro.vue'


export default {
    name: 'test',
    components: {
        BlogsItemWithIntro
        
        
    },
    data() {
        return {
            
        }
    },
    methods: {
        
    },

    mounted() {        
        
    }
}
</script>

<style lang="scss">



</style>
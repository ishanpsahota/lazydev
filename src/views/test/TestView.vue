<template>
    <section class="test-section">
        <div class="row mx-0 p-3">
            <h1> Testing components </h1>
            <div class="row mx-0 w-100">                
                  <gradient-container />                      
            </div>            
        </div>
    </section>
</template>

<script>
import GradientContainer from '../../components/gradientContainer/gradientContainer.vue'

export default {
    name: 'test',
    components: {
        GradientContainer,
        
    },
    data() {
        return {
            rawHtml: ''
        }
    },
    methods: {
        
    },

    mounted() {
        this.rawHtml = '<h1> testing </h1>'
        
    }
}
</script>

<style lang="scss">



</style>
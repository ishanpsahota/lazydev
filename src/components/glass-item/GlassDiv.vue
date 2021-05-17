<template>
  <div :class="['glass', 'glass-wrapper', size == 'sm' ? 'glass-wrapper-sm' : 'glass-wrapper' ]">
      <img src="../../assets/glass/Ellipse02.png" :class="['glass-bg', size == 'sm' ? 'glass-bg-sm' : 'glass-bg-md',  animation ? ' animation-top-right animation-rotate ' : '', containerItem ? ' bg-right bg-top ' : ' bg-top-right ' ]"   />
      <img src="../../assets/glass/Ellipse04.png" :class="['glass-bg', size == 'sm' ? 'glass-bg-sm' : 'glass-bg-md',  animation ? ' animation-bottom-left animation-rotate ' : '', containerItem ? ' bg-left bg-bottom ' : ' bg-bottom-left ' ]" />
      <div class="glass-inner">
          <blog-item :category="category" :containerItem="ifBlogContainerItem" :image="null" :title="title" :wrapperColor="ifBlogContainerItem ? 'dark' : null" />
      </div>
  </div>
</template>

<script>
import BlogItem from '../blog-item-content/BlogItem.vue'



export default {
    name: 'GlassItem',
    components: {
      
        BlogItem
    },
    props: {        
        title: String,
        category: String,
        animation: Boolean,
        containerItem: Boolean,        
        ifBlogContainerItem: Boolean,
        size: String
    },
    data() {
        return {
            
        }
    },

    methods: {

        getPosition() {

            var hor = ['left', 'right']
            var vert = ['top', 'bottom']

            var h = hor[Math.floor(Math.random()*2)];
            if(h == 'left') {
                var v = 'bottom'
            } else v = 'top'

            return 'bg-' + h + ' bg-' + v

        }

    }
}
</script>

<style>

</style>
<template>
  <div class="glass glass-wrapper">
      <img src="../../assets/glass/Ellipse02.png" :class="'glass-bg bg-top bg-right animation-rotate animation-top-right'"  />
      <img src="../../assets/glass/Ellipse04.png" :class="'glass-bg bg-left bg-bottom animation-rotate animation-bottom-left'" />
      <div class="glass-inner">
        <div class="blog-item-text">
              <router-link class="blog-visit" :to="'/blog/' + url">
                <h4>
                  <strong> {{title}} </strong>
                </h4>
              </router-link>
              <span class="badge badge-accent"> 
                <router-link :to="'/blogs/c/' + category">
                  {{category}}
                </router-link>
              </span>
            </div>
      </div>
  </div>
</template>

<script>


export default {
    name: 'GlassItem',
    props: {
        url: String,
        title: String,
        category: String
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
<template>
  <div id="app" class="container-fluid root-wrapper">          
    <section class="app-wrapper">
      <Header />
      <div class="animation-fade-show">
        <router-view />     
        <Footer />
      </div>
    </section>    
  </div>
</template>

<script>
import Footer from './components/layout/footer.vue'
import Header from './components/layout/header.vue'


export default {
  name: 'App',
  components: {
    Header,
    Footer 
  }
}
</script>

<style>
  
</style>

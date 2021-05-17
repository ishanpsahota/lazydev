<template>
  <div id="app" class="container-fluid">   
    <Header />
    <router-view/>     
    <Footer />
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

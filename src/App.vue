<template>
  <div id="app" class="container-fluid">   
    <Header />
    <router-view/>    
  </div>
</template>

<script>
import Header from './components/layout/header.vue'


export default {
  name: 'App',
  components: {
    Header,
    
  }
}
</script>

<template>
  <section class="404-not-found">
      <div class="row mx-0 p-4">
            <!-- <breeding-rhombus-spinner v-if="!show" /> -->
            <h1 class="display-4 text-gradient"> {{count}} </h1>
            <h1 class="display-3 text-gradient fade" ref="not_found"> Not found </h1>
            <router-link to="/" class="fade" ref="go_to_home"> Go to Home </router-link>
      </div>
  </section>
</template>

<script>

import { BreedingRhombusSpinner } from 'epic-spinners'

export default {

    name: 'NotFound',
    components: {
        BreedingRhombusSpinner
    },
    data() {
        return {
            show: false,
            count: 999
        }
    },

    mounted() {

            

    }    

}
</script>

<style>

</style>
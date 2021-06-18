<template>
  <section class="404-not-found ">
      <div class="row mx-0 p-4 full-view ">
        <div class="m-auto text-center">
            <breeding-rhombus-spinner   
                :animation-duration="2000"
                :size="100"
                color="#ff1d5e"
                class="mx-auto"
                v-if="!show"
            />            
            <h1 v-if="show" class="animation-fade-show display-3 mb-4 text-gradient "> Are you lost? </h1>
            <h2 v-if="show" class="animation-fade-show mb-4 text-gradient "> This space might be a work in progress. Try again later! </h2>
            <h3 v-if="show" class="animation-fade-show ">
                <router-link to="/" class="text-warning btn btn-lg btn-warning" > Go to Home </router-link>
            </h3>
        </div>
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
        }
    },

    mounted() {

        setTimeout(() => {
            this.show = true
        }, 2500);

    }    

}
</script>

<style>

</style>
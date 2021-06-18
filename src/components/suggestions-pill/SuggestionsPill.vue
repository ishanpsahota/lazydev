<template>
    <div class="row suggestions-pill-container mx-0 px-3 pt-3">
        <h5 class="px-1"> {{title}} </h5>
        <div class="col-12 py-2 suggestions-pill-wrapper px-0">
            <div class="badge badge-suggestions badge-pill badge-blue-md m-1 " v-for="(suggestion, i) in keywords" :key="i">            
                <router-link :to="'/search?q=' + toLowerCase(suggestion.name)"
                    class="">
                    {{capitalize(suggestion.name)}}                    
                </router-link>
            </div>
        </div>        
    </div>
</template>

<script>

var colors = ['accent', 'primary', 'purple', 'danger', 'blue', 'blue-md'];

import { capitalize, randomColor } from '../../utils/functions'

export default {

    name:'SuggestionsPill',
    props: {
        keywords: Array,
        title: String
    },
    methods: {
       
        toLowerCase(link) {
            return link.toLowerCase();
        },

        randomBgColor(className) {
            var n = Math.floor(Math.random()*6);
            // console.log(n);
            return className + colors[n];
        },

        capitalize(phrase) {
            return capitalize(phrase)
        },

        randomColor() {
            return randomColor();
        }
    }

}
</script>

<style>

</style>
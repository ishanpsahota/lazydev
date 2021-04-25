<template>
    <div class="row suggestions-pill-container mx-0 px-2 pt-3">
        <div :class="' badge badge-suggestions badge-pill m-1  ' + randomColor(' badge-')" v-for="(suggestion, i) in keywords" :key="i">
            <router-link :to="'/search?q=' + toLowerCase(suggestion.word)"
                class="">
                {{suggestion.word}}
            </router-link>
        </div>
    </div>
</template>

<script>

var colors = ['accent', 'primary', 'purple', 'danger', 'blue', 'blue-md'];

export default {

    name:'SuggestionsPill',
    props: {
        keywords: Array
    },
    methods: {
       
        toLowerCase(link) {
            return link.toLowerCase();
        },

        randomColor(className) {
            var n = Math.floor(Math.random()*6);
            // console.log(n);
            return className + colors[n];
        }
    }

}
</script>

<style>

</style>
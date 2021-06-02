<template>
    <div class="row w-100 mx-0">
        <div class="border-bottom m-3 border-black-light">
            <h2> Search results for 
                <span class="text-gradient"> {{query}} </span>
            </h2>
        </div>        
        <div class="col-12">
            <b-spinner v-if="loader.results" />
            <template v-if="results.length > 0">
                {{results}}
            </template>
            <template v-if="results.length < 1">
                Can't find any results :(
            </template>
            <b-alert title="Error!" v-if="error.results" variant="danger"> Error fetching results. Try again later! </b-alert>
        </div>  
    </div>
</template>

<script>

import {BSpinner, BAlert} from 'bootstrap-vue'
import api from '../../api/index'

export default {
    name: 'SearchPage',
    components: {
        BSpinner, BAlert
    },
    data() {
        return {
            query: this.$route.query.q,
            results: null,
            loader: {
                results: true
            },
            error: {
                results: false
            }
        }
    },

    methods: {
        getResults() {
            api.search(this.query)
            .then(res => {
                this.loader.results = false
                // console.log(res)
                this.results = res.blogs
            }).catch(err => {
                this.loader.results = false
                this.error.results = err
            })
        }
    },

    mounted() {
        this.getResults()
    }
}
</script>

<style>

</style>
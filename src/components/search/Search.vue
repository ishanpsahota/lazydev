<template>
    <div class="row w-100 mx-0 p-3">
        <div class="search-bar col-12 col-md-6 mx-auto">
            <!-- <form @submit.prevent="search()" class=""> -->
                <b-form-group class="border border-purple rounded-pill p-2 ">
                    <b-input-group>
                        <b-form-input id="search_bar" type="text" v-model="search_query" @change="search()"  required class="form-create-field form-control-lg border-0 form-create-text`" name="q" placeholder="Search" />
                        <b-input-group-append>                                        
                            <label for="search_bar" class="my-auto">                                            
                                <button class="btn" type="submit">
                                    <b-icon-search class="form-icon-inner clickable" />                                    
                                </button>
                            </label>
                        </b-input-group-append>
                    </b-input-group>                    
                </b-form-group>
            <!-- </form> -->
        </div>
        <div class="row w-100 mx-0">
            <div class="border-bottom m-3 text-center text-md-left border-black-light">
                <h3 v-if="query"> Search results for 
                    <span class="text-gradient"> {{query}} </span>
                </h3>
                <h2 v-else> Showing all blogs </h2>
            </div>        
        </div>        
        <div class="col-12">
            <b-spinner v-if="loader.results" />
            <template v-if="results.length > 0">
                {{results}}
            </template>
            <template v-if="results.length < 1 && (!loader.results) ">
                Can't find any results :(
            </template>
            <b-alert title="Error!" v-if="error.results" variant="danger"> Error fetching results. Try again later! </b-alert>
        </div>  
    </div>
</template>

<script>

import {BSpinner, BAlert, BIconSearch, BFormGroup, BFormInput, BInputGroup, BInputGroupAppend} from 'bootstrap-vue'
import api from '../../api/index'

export default {
    name: 'SearchPage',
    components: {
        BSpinner, BAlert, BIconSearch,
        BFormGroup, BFormInput,
        BInputGroupAppend, BInputGroup
    },
    data() {
        return {
            search_query: null,
            query: this.$route.query.q ? this.$route.query.q : this.search_query,
            type: this.$route.query.type,
            results: '',
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
            api.search(this.query, this.type ? this.type : null)
            .then(res => {
                this.loader.results = false
                // console.log(res)
                this.results = res.blogs
            }).catch(err => {
                this.loader.results = false
                this.error.results = err
            })
        },

        search() {
            // this.$route.query.q = query
            this.query = this.search_query
            this.results = ''
            this.loader.results = true
            setTimeout(() => {
                this.getResults()    
            }, 2000);
            
            
        }
    },

    mounted() {
        this.getResults()
    }
}
</script>

<style>

</style>
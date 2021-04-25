<template>
    <div class="header py-1">
        <nav class="navbar navbar-expand-sm border-sm border-bottom border-black-light">
            <!-- <a class="navbar-brand text-gradient text-sm text-800" href="/"> laazzzyyyy.dev </a> -->
            <router-link to="/" class="navbar-brand text-gradient text-sm text-800"> laazzzyyyy.dev </router-link>
            <button class="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="collapsibleNavId">
                <ul class="navbar-nav ml-auto mt-lg-0">
                    <!-- <li class="nav-item"> -->
                        <!-- <a class="nav-link" href="#"><b-icon-house> </b-icon-house>       </a> -->
                        <!-- <router-link to="/home" class="nav-link"> 
                            <b-icon-house/>
                        </router-link> -->
                         <!-- <router-link to="/blogs" class="nav-link"  >  -->
                            <!-- <b-icon-grid/> -->
                        <!-- </router-link> -->
                    <!-- </li> -->
                    <li class="nav-item">
                        <a class="nav-link" target="_blank"  href="https://ishanpsahota.netlify.app">
                            <b-icon-person />

                        </a>                        
                    </li>
                    <li class="nav-item">
                        <!-- <a class="nav-link" href="#">Link</a> -->
                        <form action="/search" method="get" >
                            <div class="form-group form-wrapper">                                                                                  
                                <div class="form-input">
                                    <input type="text"
                                    class="form-control" name="q" v-model="search_query" @change="search()"  id="" aria-describedby="helpId" placeholder="Search"/>
                                </div>
                                <div class="form-icon-wrapper">                                    
                                    <b-icon-search class="form-icon-inner clickable" @click="search()" />                                    
                                </div>                                              
                            </div>
                        </form>                                                                        
                    </li>
                    <!-- <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="dropdownId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                        <div class="dropdown-menu" aria-labelledby="dropdownId">
                            <a class="dropdown-item" href="#">Action 1</a>
                            <a class="dropdown-item" href="#">Action 2</a>
                        </div>
                    </li> -->
                </ul>
                <!-- <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="text" placeholder="Search">
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form> -->
            </div>
        </nav>     
        
    </div>
</template>

<script>

import { BIconGrid, BIconGridFill, BIconSearch, BIconPerson } from 'bootstrap-vue'

export default {
    name: 'Header',
    components: {
        BIconGrid,
        BIconGridFill,
        BIconSearch,
        BIconPerson
    },

    data() {
        return {
            search_query: ""
        }
    },

    methods: {

        search() {
            console.log(this.search_query);
        }

    }
}
</script>

<style>

</style>
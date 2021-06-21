<template>
    <div class="header py-1 ">
        <nav class="navbar navbar-expand-sm border-sm border-bottom border-black-light">
            <!-- <a class="navbar-brand text-gradient text-sm text-800" href="/"> laazzzyyyy.dev </a> -->
            <router-link to="/" class="navbar-brand text-gradient text-sm text-800"> laazzzyyyy.dev </router-link>
            <button class="navbar-toggler d-lg-none bg-accent" type="button" data-toggle="collapse" data-target="#nav_dropdown" aria-controls="nav_dropdown"
                aria-expanded="false" aria-label="Toggle navigation"
                @click="nav_show = !nav_show"
                >
                <b-icon-caret-left :class="[nav_show ? 'rotate-right': '']" />
                
            </button>
            <div class="collapse navbar-collapse" id="nav_dropdown">
                <ul class="navbar-nav ml-auto text-center text-md-left mt-lg-0">
                    <!-- <li class="nav-item"> -->
                        <!-- <a class="nav-link" href="#"><b-icon-house> </b-icon-house>       </a> -->
                        <!-- <router-link to="/home" class="nav-link"> 
                            <b-icon-house/>
                        </router-link> -->
                         <!-- <router-link to="/blogs" class="nav-link"  >  -->
                            <!-- <b-icon-grid/> -->
                        <!-- </router-link> -->
                    <!-- </li> -->
                    <li class="nav-item clickable">
                        <router-link to="/blogs/create" class="nav-link"> 
                            <b-icon-pencil-square class="clickable" />  
                            <span class="d-block d-sm-none my-1"> New Blog </span>                          
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link clickable" target="_blank"  href="https://ishanpsahota.netlify.app">
                            <b-icon-emoji-laughing class="clickable" /> <span class="d-block d-sm-none my-1"> Creator </span>                          

                        </a>                        
                    </li>
                    <li class="nav-item d-flex justify-content-center">
                        <!-- <a class="nav-link" href="#">Link</a> -->
                        <form action="/search" method="get" >                        
                            <b-form-group class="m-auto">
                                <b-input-group class="border border-purple rounded-pill" >
                                    <b-form-input id="search" type="text" required class="form-create-field border-0 form-create-text`" name="q" placeholder="Search" />
                                    <b-input-group-append>                                        
                                        <label for="search" class="my-auto">                                            
                                            <button class="btn btn-sm" type="submit">
                                                <b-icon-search class="form-icon-inner clickable" />                                    
                                            </button>
                                        </label>
                                    </b-input-group-append>
                                </b-input-group>
                            </b-form-group>                                                            
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

import { BIconGrid, BIconGridFill, BIconSearch, 
        BIconPerson, BIconPencilSquare, BForm, 
        BFormGroup, BFormInput, BInputGroup,
        BInputGroupAppend, BIconCaretDown, BIconCaretDownFill,
        BIconCaretLeft, BIconCaretLeftFill, BIconEmojiLaughing
        } from 'bootstrap-vue'

export default {
    name: 'Header',
    components: {
        BIconGrid, BIconGridFill, BIconSearch,
        BIconPerson, BIconPencilSquare, BInputGroup,
        BInputGroupAppend, BForm, BFormGroup, 
        BFormInput, BIconCaretDown, BIconCaretDownFill,
        BIconCaretLeft, BIconCaretLeftFill,
        BIconEmojiLaughing
    },

    data() {
        return {
            search_query: "",
            nav_show: false
        }
    },

    methods: {       

    }
}
</script>

<style>

</style>
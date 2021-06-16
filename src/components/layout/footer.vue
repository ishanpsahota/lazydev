<template>
    <div class="footer row w-100 mx-0" id="footer">
        <div class="col-md-3 text-center py-3 text-md-left">
            <h5>
                Quick Links
            </h5>
            <ul class="footer-list list-group ">
                <li class="index-list-item">
                    <router-link to="/blogs"> Blogs </router-link>
                </li>
                <li class="index-list-item">
                    <router-link to="/fun"> Animation </router-link>
                </li>
                <li class="index-list-item">
                    <router-link to="/search"> Search </router-link>
                </li>
                <li class="index-list-item">
                    <a class="" target="_blank"  href="https://ishanpsahota.netlify.app"> Creator </a>                        
                </li>
            </ul>
        </div>
        <div class="col-md-6 text-center py-5 d-flex">
            <h2 class="text-gradient m-auto">
                <router-link to="/">
                    <strong>
                        laazzzyyyy.dev
                    </strong>
                </router-link>
            </h2>

        </div>
        <div class="col-md-3 text-center py-3 text-md-right">
            <h5>
                Made in <b-icon-heart-fill /> with
            </h5>
            <ul class="footer-list list-group list-inverted ">                
                <li class="index-list-item">
                    <a class="" target="_blank"  href="https://mongodb.com"> MongoDB </a>                        
                </li>
                <li class="index-list-item">
                    <a class="" target="_blank"  href="https://expressjs.com"> ExpressJS </a>                        
                </li>
                <li class="index-list-item">
                    <a class="" target="_blank"  href="https://vuejs.org"> VueJS </a>                        
                </li>
                <li class="index-list-item">
                    <a class="" target="_blank"  href="https://nodejs.org"> NodeJS </a>                        
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

import { BIconHeartFill } from 'bootstrap-vue'

export default {

    name: 'Footer',
    components: {
        BIconHeartFill
    }

}
</script>

<style>

</style>
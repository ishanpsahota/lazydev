<template>
    <div class="sticky-top pt-5">
        <ul class="index-list">
            <li class="index-list-item" v-for="(block, i) in blocks" :key="i"> 
            <a :href="`#${getId(block.heading)}`" class="" @click="highlightHeading(getId(block.heading))">
                {{block.heading}} 
            </a>
            </li>
        </ul>
        <div class="blog-view-icons p-3 text-center justify-content-center d-flex flex-column " style="background: transparent">                  
            <div class="like-icon mx-auto" style="background: transparent">              
            <b-icon-heart @click="triggerAction('liked', 1)" font-scale="2" :class="[liked ? 'd-none' : 'd-block', 'm-1']" />
            <b-icon-heart-fill class="text-purple" font-scale="2" @click="triggerAction('liked', 0)" :class="[liked ? 'd-block' : 'd-none', 'm-1']" />                        
            </div>
            <small v-if="!liked"> Like this post! </small>
            <small v-else> Post Liked! </small>            
        </div>   
    </div>  
</template>

<script>

import { BIconHeart, BIconHeartFill } from 'bootstrap-vue'

export default {
    name: 'IndexList',
    components: {
        BIconHeart, BIconHeartFill
    },
    props: {
        blocks: Array,
        liked: Boolean
    },

    methods: {
        triggerAction(type, status, i) {

            if(type == 'saved') {
                if(status == 0)
                this.blog.blocks[i].saved = false
                else this.blog.blocks[i].saved = true
            }

            if(type == 'liked') {
                if(status == 0)
                this.blog.liked = false
                else this.blog.liked = true
            }

        },

        getId(heading) {
            var array = heading.split(" ");
            for(var i = 0; i < array.length; i++) {
                array[i] = array[i].split("-").join("")
                let str = array[i]        
                // console.log(str)
                let new_str = str[0].toUpperCase();
                for(var j = 1; j < str.length; j++) {
                new_str +=  str[j]
                }
                array[i] = new_str;
                // console.log(array[i])
            }

            return array.join("")
        },

        highlightHeading(heading) {
            // this.$refs[heading][0].classList.add('highlight');            

            // setTimeout(() => {
            //     this.$refs[heading][0].classList.remove('highlight');
            // }, 2000 )
            console.log(heading)
            console.log(this.$refs[heading])
        },

    
    }
}
</script>

<style>

</style>
<template>
    <div class="blog-item" v-if="containerItem">
        <div class="blog-item-img" v-if="image">            
            <img :src="image" class="">
        </div>
        <div :class="['blog-item-text px-1', wrapperColor == 'light' ? 'text-wrapper-light' : 'text-wrapper-dark']" >
            <router-link v-if="title"  class="blog-visit" :to="'/blogs/v/' + get_title(title)">                
                    <h4 class="mx-auto text-center">
                        <strong> {{title}} </strong>
                    </h4>                
            </router-link>
            <router-link v-else to="/blogs" class="blog-visit">
                <h4> <strong> SEE MORE <b-icon-arrow-right />  </strong> </h4>
            </router-link>
            <span class="badge badge-accent" v-if="category"> 
                <router-link :to="'/search?q=' + get_title(toLowerCase(category))" class="text-capitalize">
                    {{category}}
                </router-link>
            </span>
        </div>
    </div>
    <div v-else class=" ">
        <div class="blog-view-hero-img-wrapper" v-if="image">
			  <img :src="image" class="" />
		</div>
        <div :class="['blog-view-hero-text-wrapper px-1', wrapperColor == 'light' ? 'text-wrapper-light' : 'text-wrapper-dark']" v-if="title">            
            <h4 :class="[ category ? 'mt-auto' : 'm-auto', 'mx-auto text-center ']">
                <strong> {{title}} </strong>
            </h4>                        
            <span v-if="category" class="badge badge-accent mt-1 mx-auto mt-auto mb-2" > 
                <router-link :to="'/search?q=' + get_title(toLowerCase(category))" class="text-capitalize">
                    {{category}}
                </router-link>
            </span>
		</div>
    </div>
</template>

<script>

import { BIconArrowRight } from 'bootstrap-vue'

export default {
    name: 'BlogItem',
    components: {
        BIconArrowRight
    },
    props: {
        title: String,
        category: String,
        image: String,
        containerItem: Boolean,
        wrapperColor: String
    },
    methods: {
        get_title(link) {
            return link.split(" ").join("-");
        },

        toLowerCase(link) {
          return link.toLowerCase();
        }
    }

}
</script>

<style>

</style>
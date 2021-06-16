<template>
    <!-- <div class="overlay"> -->
        <div class="text-wrapper text-center">
            <router-link class="mx-auto mt-auto blog-visit" :to="'/blogs/v/' + getTitle(title)">
                <h4 class="text-light">
                    <strong>                                    
                        {{title}}
                    </strong>
                </h4>
            </router-link>
            <span class="badge badge-accent mx-auto mt-auto mb-1" v-if="category"> 
                <router-link :to="'/search?q=' + getTitle(toLowerCase(category))" class="text-capitalize">
                    {{category}}
                </router-link>
            </span>
        </div>
    <!-- </div> -->
</template>

<script>

import { getTitle, toLowerCase } from '../../../utils/functions'

export default {
    name: 'BlogItemsInnerWrapper',
    props: {
        title: String,
        category: String
    },
    components: {
        getTitle, toLowerCase
    },
    methods: {
        getTitle(phrase) {
            return getTitle(phrase)
        },

        toLowerCase(phrase) {
            return toLowerCase(phrase)
        }
    }
}
</script>

<style>

</style>
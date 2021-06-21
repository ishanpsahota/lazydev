<template>
    <!-- <div class="overlay"> -->
        <div class="text-wrapper text-center">
            <router-link class="mx-auto mt-auto rt-link rt-link-light rt-link-blue-hover" :to="'/blogs/v/' + getTitle(title)">
                <h4 class="">
                    <strong>                                    
                        {{title}}
                    </strong>
                </h4>
            </router-link>
            <span class="badge badge-accent badge-category mx-auto mt-auto mb-1" v-if="category"> 
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
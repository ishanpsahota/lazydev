<template>
    <div class="blogs-view-hero-img-wrapper" :style="`background-image: url(${image.url})`">
        <blog-items-inner-wrapper :category="category" :title="title"/>
    </div>
</template>

<script>
import BlogItemsInnerWrapper from '../blog-items-inner-wrapper/BlogItemsInnerWrapper.vue'
export default {
    name: 'BlogHeroImage',
    components: { BlogItemsInnerWrapper },
    props: {
        category: String,
        title: String,
        image: Object
    }

}
</script>

<style>

</style>
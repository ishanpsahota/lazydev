<template>
    <div class="blogs-item-img-wrapper" :style="`background-image: url('${image.url}`">
        <blog-items-inner-wrapper :category="category" :title="title" />
    </div>
</template>

<script>
import BlogItemsInnerWrapper from '../blog-items-inner-wrapper/BlogItemsInnerWrapper.vue'
export default {
    name: 'BlogContainerItem',
    components: { BlogItemsInnerWrapper },
    props: {
        title: String,
        category: String,
        image: Object
    }
}
</script>

<style>

</style>
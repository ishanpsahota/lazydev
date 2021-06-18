<template>
    <div class="row mx-0 p-2 blogs-item-intro-container">
        <h1> {{title}} </h1>
        <div class="col-12 blogs-item-intro-grid">
            <div class="blogs-item-grid" v-for="(blog, i) in blogs" :key="i">
                
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BlogsItemIntroContainer',
    props: {
        title: String,
        blogs: Object
    }
}
</script>

<style>

</style>
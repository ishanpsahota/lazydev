<template>
    <div class="blog-item">
        <div class="blog-item-img">            
            <img :src="blog.image" class="">
        </div>
        <div class="blog-item-text">
            <router-link class="blog-visit" :to="'/blog/' + get_title(blog.title)">
                <h4>
                    <strong> {{blog.title}} </strong>
                </h4>
            </router-link>
            <span class="badge badge-accent"> 
                <router-link :to="'/blogs/c/' + toLowerCase(blog.category)">
                    {{blog.category}}
                </router-link>
            </span>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
<template>
  <div :class="`blog-img-wrapper blog-img-${size} `">
      <img :src="image" class="blog-img" />
  </div>
</template>

<script>
export default {

    name: 'BlogImg',
    props: {
        image: String,
        size: String
    }

}
</script>

<style>

</style>
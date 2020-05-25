<template>
  <div class="title-container">
      <span class="title">{{title}}</span>
  </div>
</template>

<script>
export default {
    props:{
        title: String,
    }
}
</script>

<style>
.title-container{
    border-bottom: #ccc solid 1px;
    border-radius: 2px;
    padding: 5px;
}
.title{
    font-size: 24px;
}
</style>
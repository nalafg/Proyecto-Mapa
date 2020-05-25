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
    text-align: center;
    width: 100%;
    margin: 7px 0;
}
.title{
    font-size: 27px;
}
</style>
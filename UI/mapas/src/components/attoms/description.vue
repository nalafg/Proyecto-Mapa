<template>
  <div class="description-div">
      {{text}}
  </div>
</template>

<script>
export default {
    props:{
        text: String
    }
}
</script>

<style>
.description-div{
    margin-top: 10px;
    padding: 0 15px;
}
</style>
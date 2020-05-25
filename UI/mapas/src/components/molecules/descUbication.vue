<template>
  <div>
      <description :text="data.description" />
  </div>
</template>

<script>
import description from '../attoms/description'

export default {
    components:{
        description,
    },
    props: ['data']
}
</script>

<style>
.stars{
    margin: 0 auto;
}
</style>
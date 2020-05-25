<template>
  <div class="map">
    <mapComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import mapComponent from '@/components/pages/mapComponent'

export default {
  name: 'Home',
  components: {
    mapComponent
  }
}
</script>

<style scoped>

</style>

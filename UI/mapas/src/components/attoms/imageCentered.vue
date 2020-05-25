<template>
  <div class="image-frame">
    <b-img
      center
      :height="heightImg"
      :src="'http://localhost:3000/' + (this.imagen ? this.imagen : 'no_image.png')"
      alt="Imágen de la ubicación"
    ></b-img>
  </div>
</template>

<script>
export default {
  props: {
    imagen: String,
    heightImg: {
      type: Number,
      default: 200,
    },
  },
  data() {
    return {};
  },
};
</script>

<style>
.image-frame {
  overflow: hidden;
}
</style>

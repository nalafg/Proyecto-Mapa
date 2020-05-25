<template>
  <div>
    <exitButton />
    <imageCentered :imagen="data.image" />
    <titleUbication :title="data.name" />
  </div>
</template>

<script>
import imageCentered from "../attoms/imageCentered";
import titleUbication from "../attoms/titleUbication";
import exitButton from "../attoms/exitButton";

export default {
  props:['data'],
  components: {
    imageCentered,
    titleUbication,
    exitButton,
  },
};
</script>

<style></style>

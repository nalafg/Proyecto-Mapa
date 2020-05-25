<template>
  <MglMap
    :accessToken="token"
    :mapStyle="style"
    :center="center"
    :zoom="zoom"
    :attributionControl="false"
    @load="onMapLoaded"
  >
    <slot></slot>
  </MglMap>
</template>

<script>
import { MglMap } from "vue-mapbox";
import { mapMutations } from "vuex";
import Mapbox from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default {
  props: ["center"],
  data() {
    return {
      token:
        "pk.eyJ1Ijoic2VyZ2lvbnciLCJhIjoiY2s3ZTJoOWh6MWxxOTNscXJjMHRoOXJreiJ9.vB1XKwOqtX0XvzVSiX07ig",
      style: "mapbox://styles/mapbox/streets-v11",
      zoom: 14,
    };
  },
  components: {
    MglMap,
  },
  created() {
    this.mapbox = Mapbox;
  },
  methods: {
    ...mapMutations(["setMapa"]),
    onMapLoaded(event) {
      this.setMapa(event);
    },
  },
};
</script>

<style></style>

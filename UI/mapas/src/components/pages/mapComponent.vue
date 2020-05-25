<template>
  <div class="map-container">
    <mapBoxComponent :center="center">
      <MglNavigationControl position="bottom-right" />
      <MglGeolocateControl position="bottom-right" />
      <MglMarker
        v-for="(item, index) in places"
        v-bind:key="index"
        :coordinates="item.coords"
        color="#17a2b8"
        @click="onMarkerPress(item)"
      />
      <searchBar />
      <descriptionInfo v-if="showInfoUbication" :data="data" />
    </mapBoxComponent>
    <loginModal />
    <placesModal />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Mapbox from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mapBoxComponent from "../attoms/mapBoxComponent";
import loginModal from "../organisms/loginModal";
import placesModal from "../organisms/placesModal";
import descriptionInfo from "../organisms/descriptionInfo";
import searchBar from "../organisms/searchBar";
import {
  MglNavigationControl,
  MglGeolocateControl,
  MglMarker,
} from "vue-mapbox";

export default {
  name: "mapComponent",
  data() {
    return {
      token:
        "pk.eyJ1Ijoic2VyZ2lvbnciLCJhIjoiY2s3ZTJoOWh6MWxxOTNscXJjMHRoOXJreiJ9.vB1XKwOqtX0XvzVSiX07ig",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-110.3112091, 24.140925],
      zoom: 14,
      data: {},
    };
  },
  components: {
    mapBoxComponent,
    MglNavigationControl,
    MglGeolocateControl,
    MglMarker,
    loginModal,
    descriptionInfo,
    searchBar,
    placesModal,
  },
  created() {
    this.mapbox = Mapbox;
  },
  methods: {
    ...mapMutations(["toggleInfo","setdataInfoUbication"]),
    onMarkerPress(data) {
      this.setdataInfoUbication(data);
      this.toggleInfo(true);
    },
    handleSearch(event) {
      console.log(event);
    },
  },
  computed: {
    ...mapState(["showInfoUbication", "places"]),
  },
};
</script>

<style scoped>
.map-container {
  height: 100vh;
}
</style>

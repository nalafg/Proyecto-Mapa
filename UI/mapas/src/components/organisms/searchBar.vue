<template>
  <b-container class="search-bar">
    <search />
    <userIcon />
    <div class="options" v-if="sesion.state && options">
      <menuOption option="Ver mis lugares" @action="toggleModalPlaces" />
      <menuOption option="Cerrar sesión" @action="logOut" />
    </div>
  </b-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import userIcon from "../attoms/userIcon";
import search from "../molecules/search";
import menuOption from "../attoms/menuOption";

export default {
  data() {
    return {};
  },
  components: {
    userIcon,
    search,
    menuOption,
  },
  methods:{
    ...mapMutations(['logOut','toggleModalPlaces'])
  },
  computed: {
    ...mapState(["sesion", "options"]),
  },
};
</script>

<style>
.search-bar {
  display: flex;
  position: absolute;
  top: 5px;
  right: 5px;
  height: 38px;
  background-color: white;
  box-shadow: 5px 0px 10px #888888;
  border-radius: 40px;
}
.options {
  position: absolute;
  right: 0;
  top: 45px;
}
</style>

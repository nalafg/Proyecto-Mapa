<template>
  <b-container class="search-input">
    <p class="h3 search-btn"><b-icon icon="search" @click="buscar" /></p>
    <b-form-input
      class="text-input"
      type="search"
      v-model="searchQuery"
      list="my-list-id"
      placeholder="Buscar lugar"
    ></b-form-input>
    <datalist id="my-list-id">
      <option v-for="(item, index) in places" v-bind:key="index">
        {{ item.name }}
      </option>
    </datalist>
  </b-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      searchQuery: null,
    };
  },
  methods: {
    ...mapMutations(["setdataInfoUbication", "toggleInfo"]),
    buscar: async function() {
      const data = this.places.find((e) => e.name == this.searchQuery);
      this.setdataInfoUbication(data);
      this.toggleInfo(true);
      const asyncActions = this.mapa.component.actions;
      await asyncActions.flyTo({
        center: [data.coords[0], data.coords[1]],
        zoom: 16,
        speed: 1,
      });
    },
  },
  computed: {
    ...mapState(["places", "mapa"]),
  },
};
</script>

<style>
.search-input {
  display: flex;
}
.text-input {
  margin-left: 15px;
  border-radius: 100px;
}
.search-btn {
  cursor: pointer;
}
.search-btn:hover {
  cursor: pointer;
  color: #17a2b8;
}
</style>

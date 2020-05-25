<template>
  <b-modal
    v-model="modalPlaces"
    hide-backdrop
    @show="showModal"
    button-size="sm"
    :no-close-on-backdrop="true"
  >
    <template v-slot:modal-header>
      <h5>Mis lugares</h5>
      <b-button
        size="sm"
        variant="outline-info"
        @click="$router.push('/addPlace')"
      >
        Añadir lugar
      </b-button>
    </template>
    <b-list-group v-for="(item, index) in myPlaces" v-bind:key="index">
      <placesList :data="item" />
    </b-list-group>
    <template v-slot:modal-footer>
      <b-button size="sm" variant="primary" @click="toggleModalPlaces">
        Aceptar
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import axios from "axios";
import placesList from "../molecules/placesList";
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      myPlaces: [],
    };
  },
  components: {
    placesList,
  },
  created() {},
  methods: {
    ...mapMutations(["toggleModalPlaces","logOut"]),
    showModal: async function() {
      await axios
        .get(`http://localhost:3000/lugares/getByUser/${this.sesion.id}`, {
          headers: {
            Authorization: this.sesion.key,
          },
        })
        .then((response) => {
          this.myPlaces = response.data.places;
        })
        .catch((error) => {
          console.log(error)
          this.logOut()
        });
    },
  },
  computed: {
    ...mapState(["sesion", "modalPlaces"]),
  },
};
</script>

<style></style>

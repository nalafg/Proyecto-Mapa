<template>
  <div>
    <b-list-group-item class="mb-1 item-list-place">
      {{ data.name }}
      <div>
        <b-button variant="info" class="mr-1" size="sm" @click="modifyPlace"
          ><b-icon icon="pencil"
        /></b-button>
        <b-button variant="danger" size="sm" @click="deletePlace"
          ><b-icon icon="trash"
        /></b-button>
      </div>
    </b-list-group-item>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  props: ["data"],
  methods: {
    ...mapMutations([
      "toggleModalPlaces",
      "fillDataPlace",
      "toggleModalPlaces",
      "logOut",
    ]),
    ...mapActions(["getPlaces"]),
    modifyPlace() {
      this.fillDataPlace({
        id: this.data.id,
        name: this.data.name,
        longitude: this.data.lon,
        latitude: this.data.lat,
        image: this.data.image,
        description: this.data.description,
      });
      this.toggleModalPlaces();
      this.$router.push("/addPlace");
    },
    deletePlace: async function() {
      await axios
        .delete(`http://localhost:3000/lugares/${this.data.id}`, {
          headers: {
            Authorization: this.sesion.key,
          },
        })
        .then(() => {
          this.toggleModalPlaces();
          this.getPlaces();
        })
        .catch((error) => {
          console.log(error);
          this.logOut()
        });
    },
  },
  computed: {
    ...mapState(["sesion"]),
  },
};
</script>

<style>
.item-list-place {
  display: flex !important;
  text-align: end;
  justify-content: space-between;
}
</style>

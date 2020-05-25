<template>
  <div class="add-container">
    <titleComponent :title="title" />
    <form ref="form">
      <div class="mt-3 mb-2">
        <b-form-file
          v-model="file"
          :state="Boolean(file)"
          accept=".jpg, .png, .gif"
          placeholder="Elija la imagen o suéltela aquí..."
          drop-placeholder="Suelte el archivo aquí..."
        ></b-form-file>
        <div class="mt-1">Imagen seleccionada: {{ file ? file.name : "" }}</div>
      </div>
      <inputComponent
        :valor.sync="name"
        id="name-label"
        placeholder="Nombre del lugar"
      />
      <b-form-textarea
        id="textarea"
        class="mb-3"
        v-model="description"
        placeholder="Descripción del lugar"
        rows="3"
        max-rows="6"
      ></b-form-textarea>
      <h6>Seleccione la ubicación</h6>
      <mapBoxComponent class="map-locate" :center="[dataPlace.longitude, dataPlace.latitude]">
        <MglMarker
          :coordinates="[dataPlace.longitude, dataPlace.latitude]"
          color="#28a745"
          :draggable="true"
          @dragend="newLocate"
        />
        <MglGeolocateControl
          position="bottom-right"
          @geolocate="changeLocation"
        />
      </mapBoxComponent>
      <errorMessage :message="message" />
    </form>
    <div class="buttons-div mt-2">
      <b-button variant="danger" @click="$router.push('/')">Cancelar</b-button>
      <b-button class="ml-2" variant="info" @click="addOrReplace"
        >Aceptar</b-button
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapMutations, mapActions } from "vuex";
import mapBoxComponent from "../attoms/mapBoxComponent";
import inputComponent from "../attoms/inputComponent";
import titleComponent from "../attoms/titleComponent";
import errorMessage from "../attoms/errorMesage";
import { MglGeolocateControl, MglMarker } from "vue-mapbox";

export default {
  name: "addPlaces",
  data() {
    return {
      file: null,
      name: null,
      description: null,
      message: "",
    };
  },
  components: {
    mapBoxComponent,
    MglGeolocateControl,
    MglMarker,
    inputComponent,
    titleComponent,
    errorMessage,
  },
  created() {
    this.name = this.dataPlace.name;
    this.description = this.dataPlace.description;
    this.image = this.dataPlace.image;
  },
  methods: {
    ...mapMutations([
      "fillDataPlace",
      "changeCoordDataPlace",
      "resetDataPlace",
      "logOut",
    ]),
    ...mapActions(["getPlaces"]),
    newLocate(event) {
      const coord = event.marker._lngLat;
      this.changeCoordDataPlace({
        latitude: coord.lat,
        longitude: coord.lng,
      });
    },
    changeLocation(event) {
      this.changeCoordDataPlace({
        longitude: event.mapboxEvent.coords.longitude,
        latitude: event.mapboxEvent.coords.latitude,
      });
    },
    addOrReplace() {
      if (this.file && this.name && this.description) {
          this.addReplacePlace()
      } else {
        this.message = "Todos los campos son obligatorios.";
      }
    },
    addReplacePlace: async function() {
      var data = new FormData();
      data.append("name", this.name);
      data.append("image", this.file);
      data.append("lat", this.dataPlace.latitude);
      data.append("lon", this.dataPlace.longitude);
      data.append("description", this.description);
      data.append("qualification", 0);
      data.append("userId", this.sesion.id);

      if(this.dataPlace.id == null){
        await axios
        .post("http://localhost:3000/lugares", data, {
          headers: {
            Authorization: this.sesion.key,
          },
        })
        .then(() => {
          this.getPlaces();
          this.resetDataPlace();
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
      }else{
        await axios
        .put(`http://localhost:3000/lugares/${this.dataPlace.id}`, data, {
          headers: {
            Authorization: this.sesion.key,
          },
        })
        .then(() => {
          this.getPlaces();
          this.resetDataPlace();
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
          this.logOut()
        });
      }
    },
  },
  computed: {
    ...mapState(["dataPlace", "sesion"]),
    title: function() {
      return "Añadir lugar";
    },
  },
};
</script>

<style>
.add-container {
  margin-top: 25px;
  text-align: start;
  border-bottom: #ccc solid 1px;
  border-radius: 25px;
  padding: 20px;
  box-shadow: 5px 5px 10px #888888;
}
.map-locate {
  height: 400px;
}
.buttons-div {
  text-align: end;
}
.mapboxgl-marker {
  z-index: 100;
}
.mapboxgl-user-location-accuracy-circle {
  z-index: 0;
}
.custom-file-input:lang(es) ~ .custom-file-label::after {
  content: "Buscar";
}
</style>

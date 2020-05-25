import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    showInfoUbication: false,
    dataInfoUbication: {},
    sesion: {
      state: false,
      key: null,
      id: null,
    },
    mapa: null,
    options: false,
    modalPlaces: false,
    places: [],
    dataPlace: {
      longitude: -110.3112091,
      latitude: 24.140925,
    },
  },
  mutations: {
    toggleInfo(state, payload) {
      state.showInfoUbication = payload;
    },
    toggleOptions(state) {
      state.options = !state.options;
    },
    toggleModalPlaces(state) {
      state.modalPlaces = !state.modalPlaces;
    },
    setdataInfoUbication(state, payload){
      state.dataInfoUbication = payload
    },
    setMapa(state, payload){
      state.mapa = payload
    },
    resetDataPlace(state) {
      state.dataPlace = {
        id: null, 
        name: null,
        longitude: -110.3112091,
        latitude: 24.140925,
        image: null,
        description: null,
      };
    },
    changeCoordDataPlace(state, payload) {
      state.dataPlace.longitude = payload.longitude.toFixed(6);
      state.dataPlace.latitude = payload.latitude.toFixed(6);
    },
    initialiseStore(state) {
      if (localStorage.getItem("sesion")) {
        state.sesion = JSON.parse(localStorage.getItem("sesion"));
      }
    },
    fillDataPlace(state, payload) {
      state.dataPlace = payload;
    },
    loginStore(state, payload) {
      console.log(payload.token);
      state.sesion.key = payload.token;
      state.sesion.id = payload.user.id;
      state.sesion.state = true;
      localStorage.setItem("sesion", JSON.stringify(state.sesion));
    },
    logOut(state) {
      localStorage.removeItem("sesion");
      state.sesion = {
        state: false,
        key: null,
        id: null,
      };
    },
    fillPlaces(state, payload) {
      state.places.push(payload);
    },
  },
  actions: {
    getPlaces: async function({ commit, state }) {
      state.places = [];
      await axios
        .get("http://localhost:3000/lugares")
        .then((response) => {
          response.data.places.forEach((element) => {
            const payload = {
              name: element.name,
              description: element.description,
              image: element.image,
              coords: [element.lon, element.lat],
              raiting: element.qualification,
            };
            commit("fillPlaces", payload);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  modules: {},
});

export default store;

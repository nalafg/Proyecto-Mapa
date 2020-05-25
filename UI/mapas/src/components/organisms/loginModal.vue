<template>
  <b-modal
    id="login-modal"
    hide-backdrop
    ref="modal"
    :title="modalTitle"
    @show="resetModal"
    @ok="handleOk"
  >
    <form ref="form">
      <inputComponent
        :valor.sync="name"
        id="name-label"
        placeholder="Nombre"
        v-if="!login"
      />
      <b-form-datepicker
        id="datepicker-sm"
        v-model="date"
        v-if="!login"
        :max="new Date()"
        placeholder="Fecha de nacimiento"
        locale="mx"
        :date-format-options="{
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        }"
        size="sm"
        local="en"
        class="mb-2"
      ></b-form-datepicker>
      <inputComponent
        :valor.sync="email"
        id="emai-label"
        placeholder="Correo"
        tipo="email"
      />
      <inputComponent
        :valor.sync="password"
        id="pass-label"
        placeholder="Contraseña"
        tipo="password"
      />
      <errorMessage :message="message" />
    </form>
    <template v-slot:modal-footer="{ ok, cancel }" class="modal-footer">
      <b-button size="sm" variant="outline-secondary" @click="changeMode()">
        {{ login ? "Registrarse" : "Iniciar sesión" }}
      </b-button>
      <div>
        <b-button class="mr-1" size="sm" variant="danger" @click="cancel()">
          Cancelar
        </b-button>
        <b-button size="sm" variant="success" @click="ok()">
          Aceptar
        </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
import inputComponent from "../attoms/inputComponent";
import errorMessage from "../attoms/errorMesage";
import { mapMutations } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      email: null,
      password: null,
      login: true,
      name: null,
      date: null,
      message: null,
    };
  },
  components: {
    inputComponent,
    errorMessage,
  },
  methods: {
    ...mapMutations(["loginStore"]),
    resetModal() {
      this.name = null;
      this.password = null;
      this.date = null;
      this.email = null;
      this.nameState = null;
      this.message = null;
    },
    checkFormValidity() {
      if (!this.email || !this.password) {
        return false;
      }
      if (!this.login && (!this.date || !this.name)) {
        return false;
      }
      return true;
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        this.message = "Por favor rellene todos los datos.";
        return;
      }
      if (this.login) {
        this.loginIn();
      } else {
        this.register();
      }
    },
    changeMode() {
      this.resetModal();
      this.login = !this.login;
    },
    loginIn: async function() {
      await axios
        .post("http://localhost:3000/usuarios/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log(response);
          this.loginStore(response.data.data);
          this.$bvModal.hide("login-modal");
        })
        .catch((error) => {
          console.log(error);
          this.message = error.message;
        });
    },
    register: async function() {
      await axios
        .post("http://localhost:3000/usuarios/register", {
          name: this.name,
          email: this.email,
          password: this.password,
          birthday: this.date,
        })
        .then(() => {
          (this.login = true), (this.message = "Usuario registrado con exito.");
        })
        .catch((e) => {
          console.log(e);
          this.message = "Ocurrio un error.";
        });
    },
  },
  computed: {
    modalTitle: function() {
      return this.login ? "Iniciar sesión" : "Registrarse";
    },
  },
};
</script>

<style>
.modal-footer {
  justify-content: space-between !important;
}
</style>

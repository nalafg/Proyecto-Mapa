<template>
  <b-form-group
    :label-for="id"
    class="mb-2"
    invalid-feedback="Este campo es obligatorio."
  >
    <b-form-input
      v-model="value_"
      @input="$emit('update:valor', value_)"
      :id="id"
      :type="tipo"
      :placeholder="placeholder"
    ></b-form-input>
  </b-form-group>
</template>

<script>
export default {
  data() {
    return {
      value_: null,
    };
  },
  props: {
    valor: String,
    id: String,
    tipo: {
      type: String,
      default: "text",
    },
    placeholder: String,
  },
  created() {
    this.value_ = this.valor;
  },
  methods: {},
  computed: {},
};
</script>

<style></style>

<template>
  <div class="user-data">
    <p class="h3">
      <b-icon
        style="cursor: pointer;"
        v-if="!sesion.state"
        icon="person"
        v-b-modal="'login-modal'"
      />
      <b-icon
        style="cursor: pointer;"
        v-if="sesion.state"
        :icon="iconGear"
        :variant="iconColor"
        @click="toggleOptions"
      />
    </p>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["toggleOptions"]),
  },
  computed: {
    ...mapState(["sesion","options"]),
    iconGear: function(){
      return this.options?'gear-fill':'gear'
    },
    iconColor: function(){
      return this.options?'info':''
    }
  },
};
</script>

<style></style>

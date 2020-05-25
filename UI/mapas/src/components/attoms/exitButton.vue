<template>
  <b-button pill class="px-2 py-0 btn-exit" variant="light" @click="toggleInfo(false)" >
    <p class="h3"><b-icon icon="x"></b-icon></p>
  </b-button>
</template>

<script>
import { mapMutations} from 'vuex'
export default {
    methods:{  
        ...mapMutations(['toggleInfo'])
    }
};
</script>

<style>
.btn-exit {
  position: absolute;
  top: 7px;
  right: 7px;
}
</style>

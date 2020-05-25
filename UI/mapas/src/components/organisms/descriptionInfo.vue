<template>
  <div class="description">
    <headerUbication :data="dataInfoUbication" />
    <descUbication :data="dataInfoUbication" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import headerUbication from "../molecules/headerUbication";
import descUbication from '../molecules/descUbication'

export default {
  components: {
    headerUbication,
    descUbication,
  },
  computed:{
    ...mapState(['dataInfoUbication'])
  }
};
</script>

<style>
.description {
  position: absolute;
  height: 100%;
  width: 350px;
  background-color: white;
  box-shadow: 5px 0px 10px #888888;
}
</style>

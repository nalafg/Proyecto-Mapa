<template>
  <div class="menuOption" @click="$emit('action')">
    <span>{{ option }}</span>
  </div>
</template>

<script>
export default {
  props: {
    option: String,
    action: Function,
  },
};
</script>

<style>
.menuOption {
  cursor: pointer;
  height: 30px;
  width: 220px;
  padding-top: 3px;
  margin-bottom: 5px;
  background-color: #17a2b8;
  color: white;
  border-radius: 30px;
}
</style>

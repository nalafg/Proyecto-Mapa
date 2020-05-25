<template>
  <span class="error-message">{{ message }}</span>
</template>

<script>
export default {
  props: {
    message: String,
  },
};
</script>

<style>
.error-message {
  color: red;
  font-size: 13px;
}
</style>

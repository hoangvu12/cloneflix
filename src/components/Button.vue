<template>
  <button
    @click="handleClick"
    class="flex items-center space-x-3 px-6 py-2 rounded-md hover:bg-opacity-80"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  methods: {
    handleClick(e) {
      this.$emit("click", e);
    },
  },
};
</script>

<style>
</style>
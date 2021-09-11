<template>
  <button
    @click="handleClick"
    class="
      flex
      items-center
      justify-center
      rounded-full
      p-2
      border border-secondary
      hover:border-gray-300
    "
  >
    <slot />
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
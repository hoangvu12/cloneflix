<template>
  <div class="infinite-scrolling">
    <slot />
  </div>
</template>

<script>
export default {
  mounted() {
    const options = {
      root: null,
      rootMargin: "-100px 0px 0px 0px",
      threshold: 1,
    };

    const callback = ([entry]) => {
      if (entry && entry.isIntersecting) {
        this.$emit("view");
      }
    };

    const observer = new IntersectionObserver(callback, options);

    observer.observe(this.$el);

    this.observer = observer;
  },
  destroyed() {
    this.observer.disconnect();
  },
};
</script>

<style>
</style>
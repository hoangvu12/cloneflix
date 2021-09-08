<template>
  <img :src="source" />
</template>

<script>
export default {
  props: {
    src: {
      type: String,
    },
    size: {
      type: [Number, String],
      default: "original",
    },
  },
  setup(props) {
    const { size, src } = props;

    return {
      source: `https://image.tmdb.org/t/p/${
        typeof size === "string" ? size : `w${size}`
      }${src}`,
    };
  },
};
</script>

<style>
</style>
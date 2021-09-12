<template>
  <img :src="source" v-lazy="source" />
</template>

<script>
import { computed } from "vue";

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

    const imageSize = computed(() =>
      typeof size === "string" ? size : `w${size}`
    );

    return {
      source: `https://image.tmdb.org/t/p/${imageSize.value}${src}`,
    };
  },
};
</script>

<style>
img[lazy="loaded"] {
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-name: fadeIn;
}
</style>
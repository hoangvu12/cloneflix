<template>
  <img v-bind="$attrs" :src="source" v-lazy="source" />
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

  data() {
    return {
      loaded: false,
    };
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
.image-loader {
  @apply relative;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
}

.image-loader--text {
  @apply absolute left-1/2 -translate-x-1/2 bottom-5 line-clamp-1 w-5/6;
}
</style>
<template>
  <img
    :class="[!loaded && 'hidden']"
    v-bind="$attrs"
    :src="source"
    @load="loaded = true"
  />
  <div
    v-if="!loaded"
    class="image-loader"
    :class="[$attrs.class, loadingClass]"
  >
    <p class="image-loader--text">{{ $attrs.alt || "Loading..." }}</p>
  </div>
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
    loadingClass: {
      type: String,
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
  @apply absolute left-1/2 -translate-x-1/2 bottom-5 line-clamp-1;
}
</style>
<template>
  <div class="w-full h-full md:pb-44">
    <Banner :type="type" v-if="isDesktop" />

    <div
      class="px-4 md:px-12 relative z-10 space-y-12"
      :class="[isDesktop ? '-mt-28' : 'mt-20']"
    >
      <SectionContainer :items="items" />
    </div>
  </div>
</template>
<script>
import SectionContainer from "../../components/SectionContainer.vue";
import Banner from "../../components/Banner.vue";
import useDevice from "../../hooks/useDevice";
import {
  BROWSE_ITEMS as MOVIES_BROWSE_ITEMS,
  POPULAR_BROWSE_ITEMS,
} from "../../services/movies";
import { BROWSE_ITEMS as TV_BROWSE_ITEMS } from "../../services/tv";

const ITEMS = {
  movies: MOVIES_BROWSE_ITEMS,
  tv: TV_BROWSE_ITEMS,
  home: [...TV_BROWSE_ITEMS, ...MOVIES_BROWSE_ITEMS],
  popular: POPULAR_BROWSE_ITEMS,
};

export default {
  components: {
    SectionContainer,
    Banner,
  },
  setup() {
    const { isDesktop } = useDevice();

    return { isDesktop };
  },
  computed: {
    type() {
      if (this.$route.path.includes("tv")) {
        return "tv";
      }

      if (this.$route.path.includes("movies")) {
        return "movies";
      }

      if (this.$route.path.includes("popular")) {
        return "popular";
      }

      return "home";
    },

    items() {
      return ITEMS[this.type];
    },
  },
};
</script>
<style>
</style>
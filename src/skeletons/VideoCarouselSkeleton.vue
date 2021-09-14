<template>
  <skeleton class="space-y-2">
    <div class="h-8 w-40"></div>

    <div
      class="
        grid
        gap-2
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-5
        xl:grid-cols-6
        w-full
        overflow-y-scroll
      "
    >
      <video-card-skeleton
        v-for="index in items"
        :key="index"
        class="col-span-1"
      />
    </div>
  </skeleton>
</template>

<script>
import Skeleton from "../components/Skeleton/index.vue";
import VideoCardSkeleton from "./VideoCardSkeleton.vue";

const breakpoints = {
  1280: {
    items: 6,
  },

  1024: {
    items: 5,
  },

  768: {
    items: 4,
  },

  640: {
    items: 3,
  },

  0: {
    items: 2,
  },
};

export default {
  components: { Skeleton, VideoCardSkeleton },
  computed: {
    items() {
      const screenWidth = window.screen.width;

      const breakpoint = Object.keys(breakpoints)
        .sort((a, b) => b - a)
        .find((breakpoint) => screenWidth >= breakpoint);

      const { items } = breakpoints[breakpoint];

      return items;
    },
  },
};
</script>

<style>
</style>
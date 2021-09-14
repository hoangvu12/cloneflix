<template>
  <skeleton>
    <div class="w-full h-[26rem]"></div>

    <div class="space-y-8 px-4 md:px-12 my-3">
      <div class="md:space-x-8 flex flex-col md:flex-row space-y-4">
        <div class="flex-1 flex-grow-[2] space-y-4">
          <div class="h-4 w-1/3"></div>
          <div class="h-4 w-1/4"></div>
          <div class="h-20 w-2/3"></div>
        </div>

        <div class="flex-1 space-y-2 text-sm">
          <div class="h-4 w-full"></div>
          <div class="h-4 w-full"></div>
          <div class="h-4 w-full"></div>
        </div>
      </div>

      <div class="h-8 w-40"></div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <poster-card-skeleton
          class="col-span-1"
          v-for="index in 6"
          :key="index"
        />
      </div>
    </div>
  </skeleton>
</template>

<script>
import Skeleton from "../components/Skeleton/index.vue";
import PosterCardSkeleton from "./PosterCardSkeleton.vue";

export default {
  components: {
    Skeleton,
    PosterCardSkeleton,
  },
};
</script>


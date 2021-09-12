<template>
  <skeleton class="space-y-2">
    <div class="h-8 w-40"></div>

    <div class="flex items-center w-full space-x-2">
      <video-card-skeleton
        v-for="(card, index) in 5"
        :key="index"
        class="w-1/5"
      />
    </div>
  </skeleton>
</template>

<script>
import Skeleton from "../components/Skeleton/index.vue";
import VideoCardSkeleton from "./VideoCardSkeleton.vue";
export default {
  components: { Skeleton, VideoCardSkeleton },
};
</script>

<style>
</style>
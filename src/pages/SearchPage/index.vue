<template>
  <div class="px-12 py-20 pb-44">
    <transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <skeleton v-if="isLoading" class="space-y-12">
        <div
          class="gap-1 grid grid-cols-5 w-full"
          v-for="index in 4"
          :key="index"
        >
          <video-card-skeleton
            class="col-span-1"
            v-for="index in 5"
            :key="index"
          />
        </div>
      </skeleton>

      <div class="space-y-12" v-else>
        <div
          v-for="(chunk, index) in chunks"
          :key="index"
          class="gap-1 grid grid-cols-5 w-full"
        >
          <video-card
            v-for="(card, index) in chunk"
            :class="[
              index !== 0 && index < chunk.length - 1
                ? 'origin-center'
                : index === 0
                ? 'origin-left'
                : 'origin-right',
            ]"
            :key="card.id"
            class="col-span-1"
            :data="card"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { computed } from "vue";
import useSearch from "../../hooks/useSearch";

import VideoCard from "../../components/VideoCard.vue";
import { chunk } from "../../utils";
import VideoCardSkeleton from "../../skeletons/VideoCardSkeleton.vue";
import Skeleton from "../../components/Skeleton/index.vue";

export default {
  components: { VideoCard, VideoCardSkeleton, Skeleton },
  setup() {
    const route = useRoute();

    const [data, isLoading, isError] = useSearch(route.query.q);

    const chunks = computed(
      () => !isLoading.value && chunk(data.value.results, 5)
    );

    return {
      chunks,
      isLoading,
      isError,
    };
  },
};
</script>

<style>
</style>
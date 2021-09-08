<template>
  <div class="px-12 py-20 space-y-12">
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
</template>

<script>
import VideoCard from "../../components/VideoCard.vue";
import search from "../../data/search.json";
import { chunk } from "../../utils";

export default {
  components: { VideoCard },
  setup() {
    const chunks = chunk(search, 5);

    return {
      chunks,
    };
  },
};
</script>

<style>
</style>
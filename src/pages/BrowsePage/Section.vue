<template>
  <div class="space-y-2">
    <h1 class="text-xl font-medium font-netflix_medium">
      {{ title }}
    </h1>

    <video-carousel :items="items" />
  </div>
</template>

<script>
import VideoCarousel from "../../components/VideoCarousel.vue";

export default {
  props: ["items", "title"],
  components: {
    VideoCarousel,
  },
};
</script>

<style>
</style>
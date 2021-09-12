<template>
  <video-carousel-skeleton v-if="isLoading" />

  <div class="space-y-2" v-else>
    <h1 class="text-xl font-medium font-netflix_medium">
      {{ title }}
    </h1>

    <video-carousel :items="data.results" />
  </div>
</template>

<script>
import useQuery from "../hooks/useQuery";
import VideoCarouselSkeleton from "../skeletons/VideoCarouselSkeleton.vue";
import VideoCarousel from "./VideoCarousel.vue";

export default {
  props: ["queryFn", "title", "name"],
  components: {
    VideoCarousel,
    VideoCarouselSkeleton,
  },
  setup(props) {
    const [data, isLoading, isError] = useQuery(props.name, props.queryFn);

    return { data, isLoading, isError };
  },
};
</script>

<style>
</style>
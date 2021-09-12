<template>
  <div class="w-full h-full pb-44">
    <!-- <h1 class="mt-28">Browse Page</h1> -->
    <!-- <div v-if="isLoading" class="mt-28">
      <p>Loading</p>
    </div> -->
    <div>
      <Banner :type="$route.path.includes('tv') ? 'tv' : 'movies'" />

      <div class="-mt-28 px-12 space-y-12">
        <video-carousel-skeleton v-for="(carousel, index) in 3" :key="index" />
      </div>

      <!-- <h1>Hello</h1> -->

      <!-- <div class="-mt-28 px-12 relative z-10 space-y-12">
        <SectionContainer :items="data.items" />
      </div> -->
    </div>
  </div>
</template>
<script>
import useMovies from "../../hooks/useMovies";

import SectionContainer from "../../components/SectionContainer.vue";
import Banner from "../../components/Banner.vue";
import BannerSkeleton from "../../skeletons/BannerSkeleton.vue";
import VideoCarouselSkeleton from "../../skeletons/VideoCarouselSkeleton.vue";

export default {
  components: {
    VideoCarouselSkeleton,
    SectionContainer,
    Banner,
    BannerSkeleton,
  },

  setup() {
    // const [data, isLoading, isError] = useMovies();
    // return {
    //   data,
    //   isLoading,
    //   isError,
    // };
  },
};
</script>
<style>
</style>
<template >
  <div class="relative w-full h-full pb-60">
    <!-- Banner -->
    <div class="relative w-full h-full banner__container">
      <Image
        :src="mostQuality(banner.backdrops).file_path"
        alt="banner"
        class="object-cover w-full h-full"
      />

      <div class="banner__overlay absolute inset-0 flex items-center px-12">
        <div class="banner__info space-y-6">
          <Image
            :src="mostQuality(banner.logos).file_path"
            alt="movie_logo"
            class="w-full object-contain movie__image mb-4"
          />

          <div class="space-y-2">
            <h1 class="text-xl font-bold line-clamp-2">
              {{ info.title }}
            </h1>

            <p class="text-lg line-clamp-4 font-medium">
              {{ info.overview }}
            </p>
          </div>

          <div class="flex items-center space-x-2">
            <button
              class="
                flex
                items-center
                space-x-3
                px-6
                py-2
                rounded-md
                text-black
                bg-white
                hover:bg-opacity-80
              "
            >
              <IconPlayFill />
              <p class="text-bold">Play</p>
            </button>
            <button
              class="
                flex
                items-center
                space-x-2
                px-6
                py-2
                rounded-md
                text-white
                bg-secondary bg-opacity-60
                hover:bg-opacity-40
                shadow-lg
              "
            >
              <IconInfoCircle />
              <p class="text-bold">More info</p>
            </button>
          </div>
        </div>
      </div>

      <div class="banner__overlay--down absolute bottom-0 h-32 w-full"></div>
    </div>

    <!-- Lists -->
    <div class="-mt-28 px-12 relative z-10">
      <div class="space-y-2">
        <h1 class="text-xl font-medium font-netflix_medium">
          Popular on Netflix
        </h1>

        <video-carousel :items="popularList" />
      </div>
    </div>
  </div>
</template>
<script>
import IconPlayFill from "~icons/ph/play-fill";
import IconInfoCircle from "~icons/bx/bx-info-circle";

import popular from "../../data/popular.json";
import banner from "../../data/banner.json";
import VideoCard from "../../components/VideoCard.vue";
import Image from "../../components/Image.vue";
import VideoCarousel from "../../components/VideoCarousel.vue";

export default {
  components: { VideoCard, Image, IconPlayFill, IconInfoCircle, VideoCarousel },
  setup() {
    const randomIndex = Math.floor(Math.random() * 5);

    return {
      info: popular[randomIndex],
      banner,
      popularList: popular,
    };
  },

  methods: {
    mostQuality(images) {
      return images.sort((a, b) => b.width - a.width)[0];
    },
  },
};
</script>
<style>
.banner__overlay--down {
  background-image: linear-gradient(
    to bottom,
    transparent 10%,
    rgba(var(--background-color-rgb), 0.8),
    rgba(var(--background-color-rgb), 1)
  );
}

.banner__overlay {
  background-image: linear-gradient(
    77deg,
    rgba(0, 0, 0, 0.6) 25%,
    transparent 85%
  );
}

.banner__info {
  width: 40%;
}

.movie__image {
  max-width: 25vw;
}
</style>
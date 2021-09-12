<template>
  <div class="w-[100vw] h-[120vh]">
    <banner-skeleton v-if="isLoading" />
    <div v-if="!isLoading" class="banner-container relative w-full h-full">
      <div class="min-w-full min-h-full">
        <Image
          :src="banner.backdrop_path"
          alt="banner"
          class="object-cover w-full h-full"
        />
      </div>

      <div class="banner__overlay absolute inset-0 flex items-center px-12">
        <transition
          appear
          enter-active-class="animate__animated animate__slideInUp"
          leave-active-class="animate__animated animate__slideInDown"
          mode="out-in"
        >
          <div class="w-[40%] space-y-6">
            <h1 class="text-3xl font-bold line-clamp-2">
              {{ banner.title || banner.name }}
            </h1>

            <p class="text-lg line-clamp-4 font-medium">
              {{ banner.overview }}
            </p>

            <div class="flex items-center space-x-2">
              <Button class="text-black bg-white">
                <IconPlayFill />
                <p class="text-bold">Play</p>
              </Button>
              <Button
                class="
                  text-white
                  bg-secondary bg-opacity-60
                  hover:bg-opacity-40
                  shadow-lg
                "
                @click="handleMoreInfoClick"
              >
                <IconInfoCircle />
                <p class="text-bold">More info</p>
              </Button>
            </div>
          </div>
        </transition>
      </div>

      <div class="banner__overlay--down absolute bottom-0 h-32 w-full"></div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { computed } from "vue";

import IconPlayFill from "~icons/ph/play-fill";
import IconInfoCircle from "~icons/bx/bx-info-circle";

import { getLatestMovies } from "../services/movies";
import { getLatestTVShows } from "../services/tv";

import Image from "./Image.vue";
import Button from "./Button.vue";

import useQuery from "../hooks/useQuery";
import { randomIndex } from "../utils";
import BannerSkeleton from "../skeletons/BannerSkeleton.vue";

export default {
  components: { Image, Button, IconPlayFill, IconInfoCircle, BannerSkeleton },
  props: ["type"],
  setup({ type }) {
    const router = useRouter();
    const queryFn = type === "tv" ? getLatestTVShows : getLatestMovies;

    const [data, isLoading, isError] = useQuery([`${type}_banner`], queryFn);

    const banner = computed(() => {
      if (isLoading.value) return;

      const validResults = data.value.results.filter(
        (item) => item.backdrop_path
      );

      const index = randomIndex(validResults.length);
      return validResults[index];
    });

    // const handleScrollPosition = (currentRoute) => {
    //     const container = document.querySelector(".banner-container");
    //     const scrollTop = currentRoute.query.scrollTop || 0;
    //     if (currentRoute.name === "Info") {
    //       container.style.marginTop = `-${scrollTop}px`;
    //     } else {
    //       container.style.marginTop = 0;
    //     }
    // };

    // router.afterEach(handleScrollPosition);

    const handleMoreInfoClick = () => {
      router.push({
        path: "info",
        query: {
          id: banner.id,
          scrollTop: document.documentElement.scrollTop,
        },
      });
    };

    return {
      handleMoreInfoClick,
      banner,
      isLoading,
      isError,
    };
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
</style>
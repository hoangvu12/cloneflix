<template>
  <div
    class="w-full h-full pb-60"
    v-bind="$attrs"
    :class="[currentRoute.name === 'Info' && 'fixed']"
  >
    <div v-if="!isLoading">
      <!-- Banner -->
      <div class="banner-container relative w-full h-full">
        <Image
          :src="data.banner.backdrop_path"
          alt="banner"
          class="object-cover w-full h-full"
          loadingClass="w-screen h-[120vh]"
        />

        <div class="banner__overlay absolute inset-0 flex items-center px-12">
          <div class="w-[40%] space-y-6">
            <h1 class="text-3xl font-bold line-clamp-2">
              {{ data.banner.title }}
            </h1>

            <div class="space-y-2">
              <p class="text-lg line-clamp-4 font-medium">
                {{ data.banner.overview }}
              </p>
            </div>

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
        </div>

        <div class="banner__overlay--down absolute bottom-0 h-32 w-full"></div>
      </div>

      <!-- Lists -->
      <div class="-mt-28 px-12 relative z-10 space-y-12">
        <Section
          v-for="(item, index) in data.items"
          :key="index"
          :title="item.title"
          :items="item.results"
        />
        <!-- <Section title="Popular on Netflix" :items="data.popular.results" />
        <Section title="Top rated" :items="data.top_rated.results" /> -->
        <!-- <Section title="Latest films" :items="latestList" /> -->
      </div>
    </div>
  </div>

  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>
<script>
import { useRouter } from "vue-router";
import { computed, onMounted, ref } from "vue";
import useMovies from "../../hooks/useMovies";

import IconPlayFill from "~icons/ph/play-fill";
import IconInfoCircle from "~icons/bx/bx-info-circle";

import VideoCard from "../../components/VideoCard.vue";
import Image from "../../components/Image.vue";
import VideoCarousel from "../../components/VideoCarousel.vue";
import Button from "../../components/Button.vue";
import Section from "./Section.vue";
import { randomIndex } from "../../utils";

export default {
  components: {
    VideoCard,
    Image,
    IconPlayFill,
    IconInfoCircle,
    VideoCarousel,
    Button,
    Section,
  },

  setup() {
    const [data, isLoading, isError] = useMovies();
    const router = useRouter();
    const currentRoute = router.currentRoute;

    const handleScrollPosition = (currentRoute) => {
      if (isLoading.value) return;

      const container = document.querySelector(".banner-container");
      const scrollTop = currentRoute.query.scrollTop || 0;

      if (currentRoute.name === "Info") {
        container.style.marginTop = `-${scrollTop}px`;
      } else {
        container.style.marginTop = 0;
      }
    };

    router.afterEach(handleScrollPosition);

    onMounted(() => {
      handleScrollPosition(currentRoute.value);
    });

    const handleMoreInfoClick = () => {
      router.push({
        path: "info",
        query: {
          id: latest.value.id,
          scrollTop: document.documentElement.scrollTop,
        },
      });
    };

    return {
      handleMoreInfoClick,
      currentRoute,
      data,
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
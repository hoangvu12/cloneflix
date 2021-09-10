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
          :src="bannerInfo.banner"
          alt="banner"
          class="object-cover w-full h-full"
          loadingClass="w-screen h-[120vh]"
        />

        <div class="banner__overlay absolute inset-0 flex items-center px-12">
          <div class="w-[40%] space-y-6">
            <Image
              :src="bannerInfo.logo"
              alt="movie_logo"
              class="min-h-[4rem] w-full object-contain max-w-[25vw] mb-4"
            />

            <div class="space-y-2">
              <h1 class="text-xl font-bold line-clamp-2">
                {{ bannerInfo.title }}
              </h1>

              <p class="text-lg line-clamp-4 font-medium">
                {{ bannerInfo.overview }}
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
        <Section title="Popular on Netflix" :items="data.popular.results" />
        <Section title="Top rated" :items="data.top_rated.results" />
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
import { computed, onMounted } from "vue";
import useMovies from "../../hooks/useMovies";

import IconPlayFill from "~icons/ph/play-fill";
import IconInfoCircle from "~icons/bx/bx-info-circle";

import VideoCard from "../../components/VideoCard.vue";
import Image from "../../components/Image.vue";
import VideoCarousel from "../../components/VideoCarousel.vue";
import Button from "../../components/Button.vue";
import Section from "./Section.vue";

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

    const mostQuality = (images) => {
      return [...images].sort((a, b) => b.width - a.width)[0];
    };

    onMounted(() => {
      handleScrollPosition(currentRoute.value);
    });

    const bannerInfo = computed(() => {
      if (isLoading.value) return;

      const images = data.value.images;

      return {
        banner: mostQuality(images?.backdrops).file_path,
        logo: mostQuality(images?.logos).file_path,
        ...data.value.popular.results.find((result) => result.id === images.id),
      };
    });

    return {
      currentRoute,
      data,
      bannerInfo,
      isLoading,
      isError,
    };
  },

  methods: {},
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
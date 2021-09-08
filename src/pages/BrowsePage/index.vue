<template>
  <div
    class="w-full h-full pb-60"
    v-bind="$attrs"
    :class="[currentRoute.name === 'Info' && 'fixed']"
  >
    <div>
      <!-- Banner -->
      <div class="banner-container relative w-full h-full">
        <Image
          :src="mostQuality(banner.backdrops).file_path"
          alt="banner"
          class="object-cover w-full h-full"
          loadingClass="w-screen h-[120vh]"
        />

        <div class="banner__overlay absolute inset-0 flex items-center px-12">
          <div class="w-[40%] space-y-6">
            <Image
              :src="mostQuality(banner.logos).file_path"
              alt="movie_logo"
              class="w-full object-contain max-w-[25vw] mb-4"
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
        <Section title="Popular on Netflix" :items="popularList" />
        <Section title="Top rated" :items="topRatedList" />
        <Section title="Latest films" :items="latestList" />
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
import { onMounted } from "vue";

import IconPlayFill from "~icons/ph/play-fill";
import IconInfoCircle from "~icons/bx/bx-info-circle";

import popular from "../../data/popular.json";
import topRated from "../../data/top-rated.json";
import latest from "../../data/latest.json";
import banner from "../../data/banner.json";
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
    const router = useRouter();
    const randomIndex = Math.floor(Math.random() * 5);
    const currentRoute = router.currentRoute;

    const handleScrollPosition = (currentRoute) => {
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

    return {
      info: popular[randomIndex],
      banner,
      popularList: popular,
      topRatedList: topRated,
      latestList: latest,
      currentRoute,
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
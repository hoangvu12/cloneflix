<template>
  <div class="banner-container relative w-full h-full">
    <Image
      :src="banner.backdrop_path"
      alt="banner"
      class="object-cover w-full h-full"
    />

    <div class="banner__overlay absolute inset-0 flex items-center px-12">
      <div class="w-[40%] space-y-6">
        <h1 class="text-3xl font-bold line-clamp-2">
          {{ banner.title || banner.original_name }}
        </h1>

        <div class="space-y-2">
          <p class="text-lg line-clamp-4 font-medium">
            {{ banner.overview }}
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
</template>

<script>
import { useRouter } from "vue-router";

import IconPlayFill from "~icons/ph/play-fill";
import IconInfoCircle from "~icons/bx/bx-info-circle";

import Image from "./Image.vue";
import Button from "./Button.vue";
export default {
  components: { Image, Button, IconPlayFill, IconInfoCircle },
  props: ["banner"],
  setup({ banner }) {
    const router = useRouter();

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
<template>
  <div
    ref="container"
    class="
      cursor-pointer
      video-card
      relative
      w-full
      transition-all
      duration-300
    "
    :class="{
      'animate-card-hover': isScaled && !isModal,
      'animate-card-unhover': !isScaled,
      modal: isModal,
    }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handleClick"
  >
    <div class="w-full h-full">
      <Image
        :src="data.backdrop_path"
        :size="185"
        class="w-full h-full object-cover rounded-md"
        :class="{ 'rounded-b-none shadow': isScaled }"
        :alt="data.title"
      />
    </div>

    <div
      v-if="isMouseEnter && isDesktop"
      class="
        absolute
        top-full
        w-full
        h-26
        bg-background
        rounded-b-md
        transition-all
        duration-300
        shadow
        p-3
        space-y-2
      "
      :class="[!isScaled ? 'invisible opacity-0' : 'visible opacity-100']"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <circle-button
            class="p-1 bg-white text-black border-white hover:bg-gray-300"
          >
            <IconPlayFill class="text-xs" />
          </circle-button>
          <circle-button class="p-1">
            <IconPlus class="text-xs" />
          </circle-button>
          <circle-button class="p-1">
            <IconThumbUp class="text-xs" />
          </circle-button>
          <circle-button class="p-1">
            <IconThumbDown class="text-xs" />
          </circle-button>
        </div>

        <circle-button class="p-1">
          <IconKeyboardArrowDown class="text-xs" />
        </circle-button>
      </div>

      <p class="line-clamp-1">{{ data.title || data.name }}</p>

      <p class="line-clamp-1 text-xs">
        {{ genres.join(" ● ") }}
      </p>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import IconPlayFill from "~icons/ph/play-fill";
import IconPlus from "~icons/ic/outline-plus";
import IconKeyboardArrowDown from "~icons/ic/outline-keyboard-arrow-down";
import IconThumbUp from "~icons/fluent/thumb-like-20-regular";
import IconThumbDown from "~icons/fluent/thumb-dislike-24-regular";
import { setModalActive, setModalData } from "../store";

import useDevice from "../hooks/useDevice";

import { GENRES } from "../constants";
import Image from "./Image.vue";
import CircleButton from "./CircleButton.vue";

export default {
  props: ["data"],
  components: {
    Image,
    IconPlayFill,
    IconThumbUp,
    IconThumbDown,
    CircleButton,
    IconKeyboardArrowDown,
    IconPlus,
  },
  setup({ data }) {
    const isScaled = ref(false);
    const isModal = ref(false);
    const timeout = ref(null);
    const container = ref(null);
    const isMouseEnter = ref(false);
    const mouseLeaveTimeout = ref(null);
    const { isDesktop } = useDevice();

    const handleMouseEnter = () => {
      if (timeout.value) {
        clearTimeout(timeout.value);
      }
      if (mouseLeaveTimeout.value) {
        clearTimeout(mouseLeaveTimeout.value);
      }

      isMouseEnter.value = true;

      timeout.value = setTimeout(() => {
        isScaled.value = true;
      }, 500);
    };

    const handleMouseLeave = () => {
      if (timeout.value) {
        clearTimeout(timeout.value);
      }

      isScaled.value = false;

      mouseLeaveTimeout.value = setTimeout(() => {
        isMouseEnter.value = false;
      }, 500);
    };

    const handleClick = () => {
      const isTVShow = !!data.first_air_date;

      setModalActive(true);
      setModalData({
        id: data.id,
        type: isTVShow ? "tv" : "movies",
      });
    };

    const genres = computed(() =>
      data.genre_ids
        .map((id) => GENRES.find((genre) => genre.id === id))
        .map((genre) => genre.name)
    );

    return {
      isDesktop,
      isScaled,
      isModal,
      isMouseEnter,
      genres,
      container,
      handleMouseEnter,
      handleMouseLeave,
      handleClick,
    };
  },
};
</script>

<style scoped>
.shadow {
  -webkit-box-shadow: 0px 0px 12px 0px #000000;
  box-shadow: 0px 0px 12px 0px #000000;
}

.video-card {
  aspect-ratio: 16 / 9;
}
</style>
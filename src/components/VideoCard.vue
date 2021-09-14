<template>
  <div
    ref="container"
    class="
      cursor-pointer
      video-card
      relative
      transition-all
      duration-300
      pt-[56.25%]
    "
    :class="{
      'animate-card-hover': isScaled,
      'animate-card-unhover': !isScaled,
    }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handleClick"
  >
    <Image
      :src="data.backdrop_path"
      :size="185"
      :class="{ 'rounded-b-none shadow': isScaled }"
      :alt="data.title"
    />

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

      <div class="flex items-center space-x-2 text-xs">
        <div class="flex items-center text-yellow-500">
          <IconStar />
          <p>{{ data.vote_average }}</p>
        </div>

        <p>{{ data.release_date || data.first_air_date }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import IconPlayFill from "~icons/ph/play-fill";
import IconPlus from "~icons/ic/outline-plus";
import IconStar from "~icons/ic/sharp-star-purple500";
import IconKeyboardArrowDown from "~icons/ic/outline-keyboard-arrow-down";
import IconThumbUp from "~icons/fluent/thumb-like-20-regular";
import IconThumbDown from "~icons/fluent/thumb-dislike-24-regular";
import { setModalActive, setModalData } from "../store";

import useDevice from "../hooks/useDevice";

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
    IconStar,
  },
  setup({ data }) {
    const isScaled = ref(false);
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

    return {
      isDesktop,
      isScaled,
      isMouseEnter,
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

.video-card img {
  @apply object-cover rounded-md absolute top-0 left-0 w-full h-full;
}
</style>
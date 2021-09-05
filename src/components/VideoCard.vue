<template>
  <div
    ref="container"
    class="relative w-60 transition duration-300"
    :class="[isScaled ? 'animate-card-hover' : 'animate-card-unhover']"
    :style="`transform-origin: ${transformOrigin}`"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="w-full h-32">
      <Image
        :src="data.backdrop_path"
        class="w-full h-full object-cover rounded-md"
        :class="[isScaled && 'rounded-b-none shadow']"
      />
    </div>

    <div
      class="
        absolute
        top-full
        w-full
        h-28
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

      <p>{{ data.title }}</p>

      <div class="flex items-center space-x-2 text-xs">
        <div class="flex items-center text-yellow-500">
          <IconStar />
          <p>{{ data.vote_average }}</p>
        </div>

        <p>{{ data.release_date }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Image from "./Image.vue";
import CircleButton from "./CircleButton.vue";
import IconPlayFill from "~icons/ph/play-fill";
import IconPlus from "~icons/ic/outline-plus";
import IconKeyboardArrowDown from "~icons/ic/outline-keyboard-arrow-down";
import IconStar from "~icons/ic/sharp-star-purple500";
import IconThumbUp from "~icons/fluent/thumb-like-20-regular";
import IconThumbDown from "~icons/fluent/thumb-dislike-24-regular";

const SCALE = 1.5;
const PADDING_HORIZONTAL = 48;

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
  setup() {
    const isScaled = ref(false);
    const timeout = ref();
    const transformOrigin = ref("center");
    const container = ref();

    onMounted(() => {
      const { width, left, right } = container.value.getBoundingClientRect();
      const scaledWidth = width - width * (SCALE / 2); // width left and right when card is scaled;

      const scaledOffsetLeft = left - scaledWidth;
      const scaledOffsetRight = right + scaledWidth;

      if (scaledOffsetLeft < PADDING_HORIZONTAL) {
        transformOrigin.value = "left";
      } else if (window.innerWidth - scaledWidth < scaledOffsetRight) {
        transformOrigin.value = "right";
      }
    });

    const handleMouseEnter = () => {
      if (timeout.value) {
        clearTimeout(timeout.value);
      }

      timeout.value = setTimeout(() => {
        isScaled.value = true;
      }, 500);
    };

    const handleMouseLeave = () => {
      if (timeout.value) {
        clearTimeout(timeout.value);
      }

      isScaled.value = false;
    };

    return {
      isScaled,
      container,
      handleMouseEnter,
      handleMouseLeave,
      transformOrigin,
    };
  },
};
</script>

<style scoped>
.shadow {
  -webkit-box-shadow: 0px 0px 12px 0px #000000;
  box-shadow: 0px 0px 12px 0px #000000;
}

.card {
  animation: leaves 300ms ease infinite;
}
</style>
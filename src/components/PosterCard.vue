<template>
  <div class="w-full group cursor-pointer">
    <div class="relative">
      <div class="relative pt-[56.25%]">
        <Image
          :src="data.backdrop_path"
          :alt="data.title || data.name"
          :size="300"
          class="poster-card w-full h-full absolute left-0 top-0 rounded-md"
        />
      </div>

      <div
        class="
          invisible
          opacity-0
          transition-all
          duration-300
          group-hover:opacity-100 group-hover:visible
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          p-4
          bg-black bg-opacity-80
          border border-gray-300
        "
      >
        <IconPlayFill />
      </div>
    </div>

    <div class="p-4 h-60 w-full bg-[#2F2F2F] space-y-2 rounded-b-md">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-lg font-netflix_medium line-clamp-1">
            {{ data.title || data.name }}
          </p>

          <div class="flex space-x-2">
            <div class="flex items-center text-yellow-500">
              <IconStar />
              <p>{{ data.vote_average.toFixed(1) }}</p>
            </div>

            <p>{{ data.release_date || data.first_air_date }}</p>
          </div>
        </div>
        <circle-button>
          <IconPlus />
        </circle-button>
      </div>

      <p class="text-sm text-gray-400 line-clamp-6">{{ data.overview }}</p>
    </div>
  </div>
</template>

<script>
import IconPlayFill from "~icons/ph/play-fill";
import IconPlus from "~icons/ic/outline-plus";
import IconStar from "~icons/ic/sharp-star-purple500";

import CircleButton from "./CircleButton.vue";
import Image from "./Image.vue";

export default {
  components: { Image, CircleButton, IconPlus, IconPlayFill, IconStar },
  props: ["data"],
};
</script>
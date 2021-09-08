<template>
  <div class="w-60 group cursor-pointer" @click="handleClick">
    <div class="relative">
      <Image
        :src="data.backdrop_path"
        :alt="movie"
        :size="300"
        class="w-full h-32 object-cover rounded-t-md"
      />

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
            {{ data.title }}
          </p>

          <div class="flex space-x-2">
            <p class="border border-gray-400 px-2">18+</p>

            <p>{{ data.release_date }}</p>
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

import CircleButton from "./CircleButton.vue";
import Image from "./Image.vue";

export default {
  components: { Image, CircleButton, IconPlus, IconPlayFill },
  props: ["data"],
  methods: {
    handleClick() {
      const currentRoute = this.$router.currentRoute.value;

      this.$router.push({
        path: "info",
        query: { id: this.data.id, scrollTop: currentRoute.query.scrollTop },
      });
    },
  },
};
</script>

<style>
</style>
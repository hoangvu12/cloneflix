<template >
  <div class="relative w-full h-screen">
    <div class="absolute inset-0">
      <div class="relative w-full h-full">
        <Image
          :src="mostQuality(banner.backdrops).file_path"
          alt="banner"
          class="object-cover w-full h-full"
        />

        <div class="banner__overlay absolute inset-0 flex items-center px-12">
          <div class="banner__info space-y-6">
            <Image
              :src="mostQuality(banner.logos).file_path"
              alt="movie_logo"
              class="w-full object-contain movie__image mb-4"
            />

            <div class="space-y-2">
              <h1 class="text-xl font-bold line-clamp-2">
                {{ popular[0].title }}
              </h1>

              <p class="text-lg line-clamp-4 font-medium">
                {{ popular[0].overview }}
              </p>
            </div>

            <div class="flex items-center space-x-2">
              <button
                class="
                  flex
                  items-center
                  space-x-3
                  px-6
                  py-2
                  rounded-md
                  text-black
                  bg-white
                  hover:bg-opacity-80
                "
              >
                <ph-play-fill />
                <p class="text-bold">Play</p>
              </button>
              <button
                class="
                  flex
                  items-center
                  space-x-2
                  px-6
                  py-2
                  rounded-md
                  text-white
                  bg-gray-600 bg-opacity-60
                  hover:bg-opacity-40
                  shadow-lg
                "
              >
                <bx-bx-info-circle />
                <p class="text-bold">More info</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import popular from "../../data/popular.json";
import banner from "../../data/banner.json";

export default {
  setup() {
    return {
      popular,
      banner,
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
.banner__overlay {
  background-image: linear-gradient(
    77deg,
    rgba(0, 0, 0, 0.6) 25%,
    transparent 85%
  );
}

.banner__info {
  width: 40%;
}

.movie__image {
  max-width: 25vw;
}
</style>
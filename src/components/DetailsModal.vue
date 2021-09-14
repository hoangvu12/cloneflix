<template>
  <div
    class="
      z-[60]
      bg-black bg-opacity-60
      top-0
      fixed
      h-screen
      w-full
      overflow-y-scroll
    "
    @click.self="handleCloseClick"
  >
    <div class="info-container">
      <details-modal-skeleton v-if="isLoading" />

      <div v-else>
        <div class="relative w-full h-[30rem]">
          <Image
            :src="data.details.backdrop_path"
            alt="info banner"
            class="w-full h-full object-cover"
          />

          <circle-button
            class="z-50 absolute top-5 right-5 bg-background text-white"
            @click="handleCloseClick"
          >
            <IconCross class="text-lg" />
          </circle-button>

          <div class="info__overlay">
            <h1 class="text-2xl font-netflix_medium mb-6">
              {{ data.details.title || data.details.name }}
            </h1>

            <div class="flex items-center space-x-2">
              <Button class="bg-white text-black">
                <IconPlayFill class="text-lg" />
                <p>Play</p>
              </Button>
              <circle-button>
                <IconPlus class="text-lg" />
              </circle-button>
              <circle-button>
                <IconThumbUp class="text-lg" />
              </circle-button>
              <circle-button>
                <IconThumbDown class="text-lg" />
              </circle-button>
            </div>
          </div>
        </div>

        <div class="space-y-8 px-4 md:px-12 my-3">
          <div class="md:space-x-8 flex flex-col md:flex-row space-y-4">
            <div class="flex-1 flex-grow-[2] space-y-4">
              <p class="text-base text-gray-300">{{ data.details.tagline }}</p>

              <div class="flex items-center space-x-2">
                <div class="flex items-center text-yellow-500">
                  <IconStar />
                  <p>{{ data.details.vote_average.toFixed(1) }}</p>
                </div>

                <p>
                  {{ data.details.release_date || data.details.first_air_date }}
                </p>

                <p
                  v-if="data.details.adult"
                  class="border border-gray-500 px-2"
                >
                  18+
                </p>
              </div>

              <p class="text-base">
                {{ data.details.overview }}
              </p>
            </div>

            <div class="mt-4 md:mt-0 flex-1 space-y-2 text-sm">
              <div class="space-x-2">
                <span class="text-gray-400">Genres:</span>
                <span class="text-white">
                  {{ data.details.genres.map(({ name }) => name).join(", ") }}
                </span>
              </div>

              <div class="space-x-2">
                <span class="text-gray-400">Companies:</span>
                <span class="text-white">
                  {{
                    data.details.production_companies
                      .map(({ name }) => name)
                      .join(", ")
                  }}
                </span>
              </div>

              <div class="space-x-2">
                <span class="text-gray-400">Countries:</span>
                <span class="text-white">
                  {{
                    data.details.production_countries
                      .map(({ name }) => name)
                      .join(", ")
                  }}
                </span>
              </div>
            </div>
          </div>

          <h1 class="text-2xl font-netflix_medium">More like this</h1>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <poster-card
              class="col-span-1"
              :data="card"
              v-for="card in data.similars.results"
              :key="card.id"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import IconPlayFill from "~icons/ph/play-fill";
import IconPlus from "~icons/ic/outline-plus";
import IconThumbUp from "~icons/fluent/thumb-like-20-regular";
import IconThumbDown from "~icons/fluent/thumb-dislike-24-regular";
import IconCross from "~icons/akar-icons/cross";
import IconStar from "~icons/ic/sharp-star-purple500";

import PosterCard from "./PosterCard.vue";
import Button from "./Button.vue";
import CircleButton from "./CircleButton.vue";
import Image from "./Image.vue";

import DetailsModalSkeleton from "../skeletons/DetailsModalSkeleton.vue";

import useMovieDetails from "../hooks/useMovieDetails";
import useTVDetails from "../hooks/useTVDetails";
import { state, setModalActive } from "../store";

const useFetch = {
  tv: useTVDetails,
  movies: useMovieDetails,
};

export default {
  setup() {
    const { id, type = "movies" } = state.modalData;
    const [data, isLoading, isError] = useFetch[type](id);
    return {
      data,
      isLoading,
      isError,
    };
  },
  components: {
    Image,
    CircleButton,
    IconPlayFill,
    IconPlus,
    IconThumbUp,
    IconThumbDown,
    IconCross,
    IconStar,
    Button,
    PosterCard,
    DetailsModalSkeleton,
  },
  methods: {
    handleCloseClick() {
      setModalActive(false);
    },
  },
};
</script>

<style scoped>
.info-container {
  @apply bg-background md:rounded-xl lg:w-[75vw] md:w-[80vw] w-full max-w-[54rem] min-h-screen md:mt-[2rem] shadow overflow-hidden mx-auto;
  -webkit-box-shadow: 0px 0px 12px 0px #000000;
  box-shadow: 0px 0px 12px 0px #000000;
}

.info__overlay {
  @apply p-4 md:p-12 absolute top-0 inset-0 flex flex-col justify-end space-y-2;
  background: linear-gradient(
    rgba(0, 0, 0, 0),
    rgba(var(--background-color-rgb), 1)
  );
}
</style>
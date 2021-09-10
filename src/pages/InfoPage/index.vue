<template>
  <div
    class="
      z-[60]
      bg-black bg-opacity-60
      top-0
      fixed
      h-screen
      w-screen
      overflow-y-scroll
    "
    @click.self="handleCloseClick"
  >
    <div class="info-container" v-if="!isLoading">
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
            {{ data.details.title }}
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

      <div class="space-y-8 px-12 my-3">
        <div class="space-x-8 flex space-y-2">
          <div class="flex-1 flex-grow-[2] space-y-4">
            <p class="text-base text-gray-300">{{ data.details.tagline }}</p>

            <div class="flex items-center space-x-2">
              <div class="flex items-center text-yellow-500">
                <IconStar />
                <p>{{ data.details.vote_average.toFixed(1) }}</p>
              </div>

              <p>{{ data.details.release_date }}</p>

              <p v-if="data.details.adult" class="border border-gray-500 px-2">
                18+
              </p>
            </div>

            <p class="text-base">
              {{ data.details.overview }}
            </p>
          </div>

          <div class="flex-1 space-y-2 text-sm">
            <div class="space-x-2">
              <span class="text-secondary">Genres:</span>
              <span class="text-white">
                {{ data.details.genres.map(({ name }) => name).join(", ") }}
              </span>
            </div>

            <div class="space-x-2">
              <span class="text-secondary">Companies:</span>
              <span class="text-white">
                {{
                  data.details.production_companies
                    .map(({ name }) => name)
                    .join(", ")
                }}
              </span>
            </div>

            <div class="space-x-2">
              <span class="text-secondary">Countries:</span>
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
        <div class="grid grid-cols-3 gap-4">
          <poster-card
            class="col-span-1"
            :data="card"
            v-for="card in data.similar_movies.results"
            :key="card.id"
          />
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

import PosterCard from "../../components/PosterCard.vue";
import Button from "../../components/Button.vue";
import CircleButton from "../../components/CircleButton.vue";
import Image from "../../components/Image.vue";

import useMovieDetails from "../../hooks/useMovieDetails";

import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const { id } = route.query;

    const [data, isLoading, isError] = useMovieDetails(id);

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
  },
  methods: {
    handleCloseClick() {
      const currentRoute = this.$router.currentRoute;

      this.$router.push({
        path: "/",
        query: { scrollTop: currentRoute.value.query.scrollTop },
      });
    },
  },
};
</script>

<style scoped>
.info-container {
  @apply bg-background rounded-xl w-[65vw] min-h-screen mt-[2rem] shadow overflow-hidden mx-auto;
  -webkit-box-shadow: 0px 0px 12px 0px #000000;
  box-shadow: 0px 0px 12px 0px #000000;
}

.info__overlay {
  @apply p-12 absolute top-0 inset-0 flex flex-col justify-end space-y-2;
  background: linear-gradient(
    rgba(0, 0, 0, 0),
    rgba(var(--background-color-rgb), 1)
  );
}
</style>
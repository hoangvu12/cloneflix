<template>
  <div ref="container" class="carousel-container">
    <Swiper
      :slides-per-view="5"
      :space-between="5"
      :modules="modules"
      :pagination="{ type: 'bullets' }"
      :slides-per-group="5"
      :speed="800"
      @swiper="onReady"
      @slideChange="handleToggleButton"
    >
      <SwiperSlide v-for="item in items" :key="item.id">
        <video-card :data="item" />
      </SwiperSlide>

      <template #container-end>
        <div
          class="
            swiper-button swiper-button-prev
            group
            cursor-pointer
            flex
            items-center
            justify-center
          "
        >
          <IconArrowLeft class="w-10 h-10 group-hover:w-12 group-hover:h-12" />
        </div>

        <div
          class="
            swiper-button
            group
            cursor-pointer
            swiper-button-next
            flex
            items-center
            justify-center
          "
        >
          <IconArrowRight class="w-10 h-10 group-hover:w-12 group-hover:h-12" />
        </div>
      </template>
    </Swiper>
  </div>
</template>

<script>
import IconArrowRight from "~icons/ic/outline-arrow-forward-ios";
import IconArrowLeft from "~icons/ic/outline-arrow-back-ios";

import { onMounted, ref } from "vue";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

import { chunk } from "../utils";
import VideoCard from "./VideoCard.vue";

export default {
  props: {
    slidesPerView: {
      default: 5,
      type: Number,
    },
    items: {
      type: Array,
    },
  },
  setup(props) {
    const { slidesPerView } = props;
    const container = ref(null);

    const handleToggleButton = (swiper) => {
      const prevButton = container.value.querySelector(".swiper-button-prev");
      const nextButton = container.value.querySelector(".swiper-button-next");

      if (swiper.isBeginning && !swiper.params.loop) {
        prevButton.classList.add("swiper-button-disabled");
      } else {
        prevButton.classList.remove("swiper-button-disabled");
      }

      if (swiper.isEnd && !swiper.params.loop) {
        nextButton.classList.add("swiper-button-disabled");
      } else {
        nextButton.classList.remove("swiper-button-disabled");
      }
    };

    const onReady = (swiper) => {
      const prevButton = container.value.querySelector(".swiper-button-prev");
      const nextButton = container.value.querySelector(".swiper-button-next");

      prevButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (swiper.isBeginning && !swiper.params.loop) return;
        swiper.slidePrev();
      });

      nextButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (swiper.isEnd && !swiper.params.loop) return;
        swiper.slideNext();
      });

      handleToggleButton(swiper);
    };

    onMounted(() => {
      const slides = [
        ...container.value.querySelectorAll(".swiper-slide .video-card"),
      ];

      const chunkedSlides = chunk(slides, slidesPerView);

      chunkedSlides.forEach((chunk) => {
        const firstElement = chunk[0];
        const lastElement = chunk[chunk.length - 1];

        firstElement.style.transformOrigin = "left center";
        lastElement.style.transformOrigin = "right center";
      });
    });

    return {
      modules: [Pagination],
      container,
      onReady,
      handleToggleButton,
    };
  },
  components: {
    VideoCard,
    Swiper,
    SwiperSlide,
    IconArrowRight,
    IconArrowLeft,
  },
};
</script>

<style>
.swiper {
  overflow: visible;
}

.swiper-button-disabled {
  display: none;
}

.swiper:hover .swiper-button svg,
.swiper:hover .swiper-pagination {
  visibility: visible;
}

.swiper-button svg {
  visibility: hidden;
}

.swiper-button-next,
.swiper-button-prev {
  @apply absolute h-full w-12 mt-0 top-0 bg-black bg-opacity-50;
  z-index: 2;
}

.swiper-button-prev {
  @apply -left-12;
}

.swiper-button-next {
  @apply -right-12;
}

.swiper-pagination {
  @apply space-x-1 w-24 h-0.5 absolute right-0 -top-4 flex invisible;
}

.swiper-pagination-bullet {
  @apply h-full bg-secondary;
  flex: 1 1 0%;
}

.swiper-pagination-bullet-active {
  @apply bg-white;
}
</style>


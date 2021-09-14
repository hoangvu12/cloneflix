<template>
  <div
    ref="container"
    class="carousel-container relative"
    :class="[childHovering ? 'animate-z-hover' : 'animate-z-unhover']"
  >
    <Swiper
      v-bind="options"
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

import { ref } from "vue";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

import VideoCard from "./VideoCard.vue";

export default {
  props: {
    items: {
      type: Array,
    },
  },
  setup() {
    const container = ref(null);
    const childHovering = ref(false);
    const options = {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 5,
      modules: [Pagination],
      pagination: {
        type: "bullets",
      },
      speed: 800,
      watchSlidesProgress: true,
      breakpoints: {
        1280: {
          slidesPerView: 6,
          slidesPerGroup: 6,
        },

        1024: {
          slidesPerView: 5,
          slidesPerGroup: 5,
        },

        768: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          spaceBetween: 3,
        },

        640: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 2,
        },
      },
    };

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

      handleSlideHover();
    };

    const listenCardHovering = () => {
      const config = {
        attributes: true,
        subtree: true,
      };

      const callback = function (mutations) {
        for (let mutation of mutations) {
          const { target } = mutation;

          if (target.classList.contains("animate-card-hover")) {
            childHovering.value = true;
          } else if (target.classList.contains("animate-card-unhover")) {
            childHovering.value = false;
          }
        }
      };

      const observer = new MutationObserver(callback);

      observer.observe(container.value, config);
    };

    const handleSlideHover = () => {
      const slides = [
        ...container.value.querySelectorAll(
          ".swiper-slide.swiper-slide-visible .video-card"
        ),
      ];

      const firstElement = slides[0];
      const lastElement = slides[slides.length - 1];

      firstElement.style.transformOrigin = "left center";
      lastElement.style.transformOrigin = "right center";
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
      listenCardHovering();
      handleSlideHover();
    };

    return {
      options,
      container,
      onReady,
      handleToggleButton,
      childHovering,
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
  @apply absolute h-full w-6 md:w-12 mt-0 top-0 bg-black bg-opacity-50;
  z-index: 2;
}

.swiper-button-prev {
  @apply -left-6 md:-left-12;
}

.swiper-button-next {
  @apply -right-6 md:-right-12;
}

.swiper-pagination {
  @apply space-x-1 w-24 h-0.5 absolute right-0 -top-4 flex invisible;
}

.swiper-pagination-bullet {
  @apply h-full bg-secondary hidden md:block;
  flex: 1 1 0%;
}

.swiper-pagination-bullet-active {
  @apply bg-white;
}
</style>


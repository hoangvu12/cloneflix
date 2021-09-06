<template>
  <div
    class="fixed z-50 w-screen h-16 transition duration-700"
    :class="[!isTop && 'bg-background']"
  >
    <div class="header__overlay absolute inset-0 w-full h-full"></div>
    <div
      class="
        relative
        z-10
        flex
        items-center
        justify-between
        w-full
        h-full
        p-5
        px-12
      "
    >
      <div class="flex items-center space-x-12">
        <img :src="logo" alt="logo" class="h-full w-24 object-cover" />

        <div class="flex items-center space-x-5">
          <router-link
            v-for="route in routes"
            :to="route.path"
            :key="route.path"
            class="
              hover:text-gray-300
              text-sm
              font-netflix_medium
              transition
              300ms
            "
            :class="[
              currentRoute.name === route.name
                ? 'text-white'
                : 'text-typography',
            ]"
          >
            {{ route.name }}
          </router-link>
        </div>
      </div>
      <icon-round-search class="w-6 h-6" />
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import IconRoundSearch from "~icons/ic/round-search";

import logo from "../assets/logo.png";

export default {
  setup() {
    const { currentRoute, getRoutes } = useRouter();
    const routes = getRoutes();
    const headerRoutes = routes.filter(({ props }) => props.default.isHeader);

    const isTop = ref(true);

    return {
      currentRoute,
      routes: headerRoutes,
      isTop,
    };
  },

  components: {
    IconRoundSearch,
  },

  data() {
    return { logo };
  },

  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isTop = window.scrollY === 0;
    },
  },
};
</script>
<style>
/* From Netflix */
.header__overlay {
  background-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(10%, rgba(0, 0, 0, 0.7)),
    color-stop(10%, rgba(0, 0, 0, 0))
  );
  background-image: -webkit-linear-gradient(
    top,
    rgba(0, 0, 0, 0.7) 10%,
    rgba(0, 0, 0, 0)
  );
  background-image: -o-linear-gradient(
    top,
    rgba(0, 0, 0, 0.7) 10%,
    rgba(0, 0, 0, 0)
  );
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.7) 10%,
    rgba(0, 0, 0, 0)
  );
}
</style>
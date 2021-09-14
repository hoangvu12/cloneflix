<template>
  <transition
    enter-active-class="animate-fadeIn"
    leave-active-class="animate-fadeOut"
  >
    <div
      class="fixed inset-0 top-16 z-0 bg-black bg-opacity-80"
      v-if="showMenu"
      @click.self="showMenu = false"
    ></div>
  </transition>
  <div v-bind="$attrs" class="relative z-10">
    <IconMenu class="w-6 h-6" @click="showMenu = !showMenu" />

    <transition
      enter-active-class="animate-slideInLeft"
      leave-active-class="animate-slideInRight"
    >
      <div
        class="
          py-6
          space-y-2
          fixed
          left-0
          top-16
          max-w-[17rem]
          w-[80vw]
          h-screen
          bg-black
        "
        v-if="showMenu"
      >
        <router-link
          v-for="route in routes"
          :to="route.path"
          :key="route.path"
          class="block text-base font-netflix_medium border-l-[3px] px-4"
          :class="[
            currentRoute.name === route.name
              ? 'text-white border-primary'
              : 'text-gray-400 border-black',
          ]"
        >
          {{ route.name }}
        </router-link>
      </div>
    </transition>
  </div>
</template>

<script>
import IconMenu from "~icons/ri/menu-fill";
import { ref } from "vue";
import useHeaderRoute from "../hooks/useHeaderRoute";

export default {
  components: {
    IconMenu,
  },
  setup() {
    const { currentRoute, routes } = useHeaderRoute();

    const showMenu = ref(false);

    return {
      showMenu,
      currentRoute,
      routes,
    };
  },
};
</script>

<script>
import { useQueryProvider } from "vue-query";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  components: {
    Header,
    Footer,
  },
  setup() {
    useQueryProvider({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          refetchOnMount: false,
        },
      },
    });
  },
};
</script>

<template>
  <Header />
  <div class="min-h-screen">
    <router-view v-slot="{ Component, route }">
      <transition name="fade" mode="out-in">
        <component class="min-h-screen" :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </div>
  <Footer />
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
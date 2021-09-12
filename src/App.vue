<script>
import { toRefs, watch } from "vue";
import { useQueryProvider } from "vue-query";
import "animate.css";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import DetailsModal from "./components/DetailsModal.vue";
import { state } from "./store";

export default {
  components: {
    Header,
    Footer,
    DetailsModal,
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

    watch(
      () => state.isModalActive,
      () => {
        setTimeout(function () {
          window.scrollTo({
            left: 0,
            top: state.scrollTop,
          });
        }, 0);
      }
    );
    return {
      ...toRefs(state),
    };
  },
};
</script>

<template>
  <Header />
  <div
    class="min-h-screen"
    :style="[isModalActive && `margin-top: -${scrollTop}px`]"
  >
    <router-view v-slot="{ Component, route }">
      <transition
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
        mode="out-in"
      >
        <component
          :is="Component"
          :class="[isModalActive && 'fixed']"
          :key="route.fullPath"
        />
      </transition>
    </router-view>
  </div>
  <transition
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
  >
    <DetailsModal v-if="isModalActive" />
  </transition>
  <Footer />
</template>

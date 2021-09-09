<script >
import { useQueryProvider } from "vue-query";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
export default {
  components: {
    Header,
    Footer,
  },
  setup() {
    useQueryProvider();
  },
};
</script>

<template>
  <Header />
  <router-view> </router-view>
  <Footer />
</template>


<script >
import Header from "./components/Header.vue";
export default {
  components: {
    AppHeader: Header,
  },
};
</script>

<template>
  <app-header />
  <router-view> </router-view>
</template>


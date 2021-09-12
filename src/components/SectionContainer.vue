<template>
  <Section v-for="(item, index) in itemsShown" :key="index" v-bind="item" />

  <InfiniteScroll @view="handleInView" />
</template>

<script>
import { ref, computed } from "vue";
import InfiniteScroll from "./InfiniteScroll.vue";
import Section from "./Section.vue";
import Button from "./Button.vue";

const SECTIONS_PER_VIEW = 3;

export default {
  props: ["items"],
  components: { InfiniteScroll, Section, Button },
  setup({ items }) {
    const numberOfSections = ref(2);
    const itemsShown = computed(() => items.slice(0, numberOfSections.value));
    const isEnd = computed(() => numberOfSections < items.length);

    return {
      numberOfSections,
      itemsShown,
      isEnd,
    };
  },
  methods: {
    handleInView() {
      if (this.isEnd) return;

      this.numberOfSections += SECTIONS_PER_VIEW;
    },
  },
};
</script>

<style>
</style>
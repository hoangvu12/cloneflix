<template>
  <suspense v-for="(item, index) in itemsShown" :key="index">
    <Section :title="item.title" :items="item.results" v-bind="$attrs" />
    <template #fallback>
      <div>LOADING...</div>
    </template>
  </suspense>

  <Button
    v-if="numberOfSections < items.length"
    @click="handleLoadMoreClick"
    class="bg-black text-white"
  >
    <p>Load more</p>
  </Button>

  <InfiniteScroll @view="handleInView" />
</template>

<script>
import { ref, computed } from "vue";
import InfiniteScroll from "./InfiniteScroll.vue";
import Section from "./Section.vue";
import Button from "./Button.vue";

const SECTIONS_PER_VIEW = 1;

export default {
  props: ["items"],
  components: { InfiniteScroll, Section, Button },
  setup({ items }) {
    const numberOfSections = ref(0);
    const itemsShown = computed(() => items.slice(0, numberOfSections.value));

    return {
      numberOfSections,
      itemsShown,
    };
  },
  methods: {
    handleInView() {
      this.numberOfSections += SECTIONS_PER_VIEW;
    },
    handleLoadMoreClick() {
      this.numberOfSections += SECTIONS_PER_VIEW;
    },
  },
};
</script>

<style>
</style>
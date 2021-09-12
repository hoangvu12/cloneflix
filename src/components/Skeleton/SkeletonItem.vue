<template>
  <div
    v-if="type === 'element'"
    :class="[
      !layout.isContainer && 'animate-pulse bg-white bg-opacity-20',
      layout.class,
    ]"
  >
    <SkeletonItem
      v-if="layout.isContainer"
      v-for="(childItem, index) in layout.children"
      :layout="childItem"
      :key="index"
    />
  </div>

  <SkeletonItem
    v-else-if="type === 'fragment'"
    v-for="(childItem, index) in layout.children"
    :layout="childItem"
    :key="index"
  />

  <component v-else :is="layout.type" v-bind="layout.props"></component>
</template>

<script>
import { computed } from "vue";

export default {
  props: ["layout"],
  setup({ layout }) {
    const type = computed(() => {
      if (layout.type === "div") {
        return "element";
      }

      if (typeof layout.type === "symbol") {
        return "fragment";
      }

      return "component";
    });

    return {
      type,
    };
  },
};
</script>

<style>
</style>
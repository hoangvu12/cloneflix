<template>
  <Section v-for="(item, index) in items" :key="index" v-bind="item" />
</template>

<script>
import Section from "./Section.vue";
import Button from "./Button.vue";

export default {
  props: ["items"],
  components: { Section, Button },
};
</script>

<style>
</style>
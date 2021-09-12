<template>
  <div>
    <SkeletonItem v-for="(item, index) in layout" :key="index" :layout="item" />
  </div>
</template>

<script>
import SkeletonItem from "./SkeletonItem.vue";
export default {
  components: { SkeletonItem },
  setup(_, { slots }) {
    const nodesToLayout = (nodes) => {
      return nodes.map((node) => ({
        class: node.props?.class,
        isContainer: !!node.children?.length,
        children: node.children?.length ? nodesToLayout(node.children) : [],
        type: node.type,
        props: node.props,
      }));
    };

    return { layout: nodesToLayout(slots.default()) };
  },
};
</script>

<style>
</style>
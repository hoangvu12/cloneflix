<template>
  <div
    class="w-full h-full pb-44"
    v-bind="$attrs"
    :class="[$route.name === 'Info' && 'fixed']"
  >
    <!-- <h1 class="mt-28">TV Page</h1> -->
    <div v-if="isLoading" class="mt-28">
      <p>Loading</p>
    </div>
    <div v-else>
      <Banner :banner="data.banner" />

      <div class="-mt-28 px-12 relative z-10 space-y-12">
        <SectionContainer :items="data.items" />
      </div>
    </div>
  </div>
</template>
<script>
import useTV from "../../hooks/useTV";

import SectionContainer from "../../components/SectionContainer.vue";
import Banner from "../../components/Banner.vue";

export default {
  components: {
    SectionContainer,
    Banner,
  },

  setup() {
    const [data, isLoading, isError] = useTV();

    return {
      data,
      isLoading,
      isError,
    };
  },
};
</script>

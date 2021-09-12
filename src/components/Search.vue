<template>
  <div
    class="fixed inset-0 opacity-0"
    :class="[showSearch ? 'visible' : 'invisible']"
    @click.self="showSearch = false"
  ></div>
  <div
    class="cursor-pointer px-2 py-1 flex"
    :class="[showSearch && 'space-x-2 bg-black border border-gray-300']"
    @click.stop="handleSearchClick"
  >
    <icon-round-search class="w-6 h-6" />
    <input
      placeholder="Movies, TV shows"
      ref="searchInput"
      class="
        bg-transparent
        focus:border-none
        focus:outline-none
        text-white
        placeholder-text-400
        transition-all
        duration-300
      "
      :class="showSearch ? 'w-[14rem]' : 'w-0'"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import IconRoundSearch from "~icons/ic/round-search";

export default {
  setup() {
    const searchInput = ref(null);
    const showSearch = ref(false);

    const handleSearchClick = () => {
      showSearch.value = true;

      searchInput.value.focus();
    };

    return {
      handleSearchClick,
      searchInput,
      showSearch,
    };
  },
  components: {
    IconRoundSearch,
  },
};
</script>

<style>
</style>
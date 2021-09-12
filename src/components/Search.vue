<template>
  <div
    class="fixed inset-0 opacity-0"
    :class="[showSearch ? 'visible' : 'invisible']"
    @click.self="showSearch = false"
  ></div>
  <div
    class="relative z-10 cursor-pointer px-2 py-1 flex"
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
      @input="handleSearchChange"
      :class="showSearch ? 'w-[14rem]' : 'w-0'"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import IconRoundSearch from "~icons/ic/round-search";
import { useRouter } from "vue-router";

export default {
  setup() {
    const searchInput = ref(null);
    const showSearch = ref(false);
    const debounceTimeout = ref(null);
    const router = useRouter();

    const handleSearchClick = () => {
      showSearch.value = true;

      searchInput.value.focus();
    };

    const handleSearchChange = (e) => {
      const keyword = e.target.value;

      if (debounceTimeout.value) {
        clearTimeout(debounceTimeout.value);
      }

      debounceTimeout.value = setTimeout(() => {
        showSearch.value = false;
        router.push({ path: "/search", query: { q: keyword } });
      }, 500);
    };

    return {
      handleSearchClick,
      handleSearchChange,
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
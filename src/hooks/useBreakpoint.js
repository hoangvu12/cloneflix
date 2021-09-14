import { ref, computed } from "vue";
import { BREAKPOINTS } from "../constants";

const useBreakpoint = () => {
  const screenWidth = ref(window.innerWidth);

  return computed(() => {
    const breakpoint = Object.keys(BREAKPOINTS)
      .sort((a, b) => b - a)
      .find((breakpoint) => screenWidth.value >= breakpoint);

    return BREAKPOINTS[breakpoint];
  });
};

export default useBreakpoint;

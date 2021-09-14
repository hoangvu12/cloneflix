import { ref, computed } from "vue";
import { BREAKPOINTS } from "../constants";

const useBreakpoint = () => {
  const screenWidth = ref(window.screen.width);

  return computed(() => {
    const breakpoint = Object.keys(BREAKPOINTS)
      .sort((a, b) => b - a)
      .find((breakpoint) => screenWidth >= breakpoint);

    return BREAKPOINTS[breakpoint];
  });
};

export default useBreakpoint;

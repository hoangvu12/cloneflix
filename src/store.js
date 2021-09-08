import { reactive, readonly } from "vue";

const state = reactive({
  isModalActive: false,
});

const setModalActive = function (isActive) {
  state.isModalActive = isActive;
};

export default { state: readonly(state), setModalActive };

import { reactive, readonly } from "vue";

const initialState = reactive({
  isModalActive: false,
  scrollTop: 0,
  modalData: null,
});

export const setModalActive = function (isActive) {
  // Keep scrollTop
  if (isActive) {
    const scrollTop = document.documentElement.scrollTop;

    initialState.scrollTop = scrollTop;
  }

  initialState.isModalActive = isActive;
};

export const setModalData = function (data) {
  initialState.modalData = data;
};

export const state = readonly(initialState);

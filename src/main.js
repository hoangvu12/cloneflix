import { createApp, h } from "vue";
import VueLazyload from "@jambonn/vue-lazyload";
import { ObserveVisibility } from "vue-observe-visibility";

import App from "./App.vue";
import router from "./pages";
import store from "./store";

import "./index.css";

import error from "./assets/error.png";
import loading from "./assets/loading.png";

createApp({
  provide: {
    store,
  },
  render: () => h(App),
})
  .directive("observe-visibility", {
    beforeMount: (el, binding, vnode) => {
      vnode.context = binding.instance;
      ObserveVisibility.bind(el, binding, vnode);
    },
    update: ObserveVisibility.update,
    unmounted: ObserveVisibility.unbind,
  })
  .use(router)
  .use(VueLazyload, {
    observer: true,
    preLoad: 1.3,
    error,
    // loading,
    attempt: 1,
  })
  .mount("#app");

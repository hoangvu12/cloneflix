import { createApp, h } from "vue";
import VueLazyload from "@jambonn/vue-lazyload";

import App from "./App.vue";
import router from "./pages";
import store from "./store";

import "./index.css";

import error from "./assets/error.png";

createApp({
  provide: {
    store,
  },
  render: () => h(App),
})
  .use(router)
  .use(VueLazyload, {
    observer: true,
    preLoad: 1.3,
    error,
    attempt: 1,
  })
  .mount("#app");

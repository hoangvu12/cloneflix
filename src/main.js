import { createApp, h } from "vue";
import VueLazyload from "@jambonn/vue-lazyload";

import App from "./App.vue";
import router from "./pages";
import store from "./store";

import "./index.css";

import loadingImage from "./assets/loading.png";
import errorImage from "./assets/error.png";

createApp({
  provide: {
    store,
  },
  render: () => h(App),
})
  .use(router)
  .use(VueLazyload, {
    preLoad: 1.3,
    loading: loadingImage,
    error: errorImage,
    attempt: 1,
  })
  .mount("#app");

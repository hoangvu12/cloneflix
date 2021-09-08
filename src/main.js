import { createApp, h } from "vue";

import App from "./App.vue";
import router from "./pages";
import store from "./store";

import "./index.css";

createApp({
  provide: {
    store,
  },
  render: () => h(App),
})
  .use(router)
  .mount("#app");

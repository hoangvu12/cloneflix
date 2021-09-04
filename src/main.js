import { createApp } from "vue";

import App from "./App.vue";
import router from "./pages";
import "./index.css";

createApp(App).use(router).mount("#app");

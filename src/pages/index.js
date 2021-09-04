import { createRouter, createWebHashHistory } from "vue-router";

const HomePage = () => import("./HomePage/index.vue");

const routes = [
  { path: "/", component: HomePage, name: "Home", props: { isHeader: true } },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

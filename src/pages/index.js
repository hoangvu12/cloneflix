import { createRouter, createWebHashHistory } from "vue-router";

const HomePage = () => import("./HomePage/index.vue");
const InfoPage = () => import("./InfoPage/index.vue");

const routes = [
  {
    path: "/",
    component: HomePage,
    name: "Home",
    children: [
      {
        path: "/info",
        component: InfoPage,
        name: "Info",
        props: { isHeader: false },
      },
    ],
    props: { isHeader: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, __, savedPosition) {
    if (to.query.scrollTop) {
      return { left: 0, top: to.query.scrollTop };
    }

    if (savedPosition) {
      return savedPosition;
    }

    return { left: 0, top: 0 };
  },
});

export default router;

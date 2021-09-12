import { createRouter, createWebHashHistory } from "vue-router";

const BrowsePage = () => import("./BrowsePage/index.vue");
const SearchPage = () => import("./SearchPage/index.vue");

const routes = [
  {
    path: "/",
    component: BrowsePage,
    name: "Home",
    props: { isHeader: true },
  },
  {
    path: "/browse/tv",
    component: BrowsePage,
    name: "TV Shows",
    props: { isHeader: true },
  },
  {
    path: "/browse/movies",
    component: BrowsePage,
    name: "Movies",
    props: { isHeader: true },
  },
  {
    path: "/browse/popular",
    component: BrowsePage,
    name: "New & Popular",
    props: { isHeader: true },
  },
  {
    path: "/search",
    component: SearchPage,
    name: "Search",
    props: { isHeader: false },
  },
  { path: "/:pathMatch(.*)*", redirect: "/" },
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
